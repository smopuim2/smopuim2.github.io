/*
Welcome to visualHPP!
It's a header of C++ TextUI, like visualBasic.
Usage: ENTER to click, WASD and TAB to move, ESC to exit.
If you compile this singly, you'll get a designer.
Click anywhere, drag out the element, and press ENTER to
set down. Then, fill in the arguments, TAB to switch. At
last, press ESC to generate callback program template.
*/

#ifndef STATICDATA
#define NOSTATICDATA 1
#define STATICDATA \
{\
    vh::hidden::ele(vh::frame,0,0,15,8,{"/Toolbox\\_______",""},-1),\
    vh::hidden::ele(vh::option,1,2,6,0,{"button"},0),\
    vh::hidden::ele(vh::option,2,2,8,0,{"checkbox"},0),\
    vh::hidden::ele(vh::option,3,2,5,0,{"frame"},0),\
    vh::hidden::ele(vh::option,4,2,5,0,{"input"},0),\
    vh::hidden::ele(vh::option,5,2,5,0,{"label"},0),\
    vh::hidden::ele(vh::option,6,2,6,0,{"option"},0),\
    vh::hidden::ele(vh::option,7,2,8,0,{"textedit"},0),\
    vh::hidden::ele(vh::option,8,2,7,0,{"_remove"},0),\
    vh::hidden::ele(vh::label,1,20,49,18,{""},-1)\
},70,20
#endif

#include <algorithm>
#include <chrono>
#include <functional>
#include <map>
#include <stdio.h>
#include <stdlib.h>
#include <string>
#include <thread>
#include <vector>
#ifdef _WIN32
    #include <conio.h>
#endif

namespace vh{
    enum eletype{
        button,
        checkbox,
        frame,
        input,
        label,
        option,
        textedit
    };
    enum elestatus{
        invisable=-1, 
        normal=0,
        unselect=0,
        click=1,
        select=1,
        disable=2
    };
    const int esc=27;
    #ifdef _WIN32
        const int newline=13;
        const int backspace=8;
    #elif __linux__
        const int newline=10;
        const int backspace=127;
    #else
        #error please use windows or linux
    #endif
    int getch(){
        #ifdef _WIN32
            return ::getch();
        #elif __linux__
            system("bash -c 'read -n1; echo \"$REPLY\" > vh.getch.tmp'");
            FILE* filep=fopen("vh.getch.tmp","r");
            int getc=fgetc(filep);
            fclose(filep);
            return getc;
        #endif
    }
    void log(std::string desc,std::string funcname="UNKNOWN"){
        printf("{i} Log: [From %s] %s;\n",funcname.c_str(),desc.c_str());
        vh::getch();
    }
    void warning(std::string desc,std::string funcname="UNKNOWN"){
        printf("<!> Warning: [From %s] %s;\n",funcname.c_str(),desc.c_str());
        vh::getch();
    }
    void error(std::string desc,std::string funcname="UNKNOWN"){
        printf("(X) Error: [From %s] %s; terminated\n",funcname.c_str(),desc.c_str());
        vh::getch();
        exit(0);
    }
    namespace hidden{
        struct ele{
            int type,status;
            int x,y,width,height;
            std::vector<std::string> args;
            int frame;
            ele(int v1,int v2,int v3,int v4,int v5,std::vector<std::string> v6,int v7){
                type=v1; status=0; x=v2; y=v3; width=v4; height=v5; args=v6; frame=v7;
            }
        };
        int maxwidth,maxheight;
        int mousex,mousey;
        bool readkey;
        std::vector<vh::hidden::ele> els;
        std::map<std::pair<int,std::string>,std::function<void()>> callbk;
        std::vector<std::string> render1ele(ele el){
            const std::vector<std::vector<std::vector<std::string>>> elemap={
                {
                    {
                        " _$  ",
                        "(0$).",
                        " :$:;",
                        "     "
                    },
                    {
                        "   $ ",
                        "  _$ ",
                        " (0$)",
                        "  `$ "
                    },
                    {
                        " _$  ",
                        "(0$)x",
                        " X$XX",
                        "     "
                    }
                },
                {
                    {
                        "[ ] 0$"
                    },
                    {
                        "[J] 0$"
                    },
                    {
                        "[X] 0$"
                    }
                },
                {
                    {
                        " 0$ ",
                        "|1$|",
                        "&&%&",
                        " `$ "
                    }
                },
                {
                    {
                        " _$ ",
                        "[0$]",
                        " `$ "
                    }
                },
                {
                    {
                        "0$",
                        "&%"
                    }
                },
                {
                    {
                        "( ) 0$"
                    },
                    {
                        "(@) 0$"
                    },
                    {
                        "(X) 0$"
                    }
                },
                {
                    {
                        " _$ ",
                        "|0$|",
                        "&&%&",
                        " `$ "
                    }
                }
            };
            if(el.status==invisable) return std::vector<std::string>();
            if(el.status>=elemap[el.type].size()){
                error("element status not match",__FUNCTION__);
            }
            std::vector<std::string> res(elemap[el.type][el.status]);
            for(int i=0;i<res.size();i++){
                if(res[i][0]=='&' || res[i][0]=='%'){
                    if(el.height>1){
                        el.height--;
                        res.insert(res.begin()+i,res[i-1]);
                    }else{
                        res.erase(res.begin()+i);
                        break;
                    }
                }
            }
            for(int j=0;j<res[0].size();j++){
                if(res[0][j]=='$' || res[0][j]=='%'){
                    if(el.width>1){
                        el.width--;
                        for(int i=0;i<res.size();i++){
                            res[i].insert(j,1,res[i][j-1]);
                        }
                     }else{
                        for(int i=0;i<res.size();i++){
                            res[i].erase(j,1);
                        }
                        break;
                    }
                }
            }
            std::vector<int> argp(el.args.size(),0);
            for(int i=0;i<res.size();i++){
                for(int j=0;j<res[i].size();j++){
                    if(isdigit(res[i][j])){
                        int aid=res[i][j]-'0';
                        if(argp[aid]==el.args[aid].size()){
                            res[i][j]=' ';
                        }else if(argp[aid]>=0){
                            if(el.args[aid][argp[aid]]=='\n'){
                                argp[aid]=-(argp[aid]+1);
                                res[i][j]=' ';
                            }else if(isprint(el.args[aid][argp[aid]])){
                                res[i][j]=el.args[aid][argp[aid]++];
                            }
                        }else{
                            res[i][j]=' ';
                        }
                    }
                }
                for(int pp=0;pp<argp.size();pp++) argp[pp]=abs(argp[pp]); 
            }
            return res;
        }
        std::pair<std::vector<std::string>,std::vector<std::vector<int>>> render(std::vector<ele> els,int maxwidth,int maxheight,int mousex=-1,int mousey=-1){
            std::vector<std::string> form(maxheight,std::string(maxwidth,' '));
            std::vector<std::vector<int>> mask(maxheight,std::vector<int>(maxwidth,-1));
            for(int i=0;i<els.size();i++){
                std::vector<std::string> ret=render1ele(els[i]);
                for(int j=0;j<ret.size();j++){
                    for(int k=0;k<ret[j].size();k++){
                        if(j+els[i].x<maxheight && k+els[i].y<maxwidth){
                            form[j+els[i].x][k+els[i].y]=ret[j][k];
                            mask[j+els[i].x][k+els[i].y]=i;
                        }
                    } 
                }
            }
            if(mousex>=0) form[mousex][mousey]='Q';
            return make_pair(form,mask);
        }
    }
    void clear(){
        #ifdef _WIN32
            system("cls");
        #elif __linux__
            system("clear");
        #endif
    }
    std::string encodeuri(std::string str){
        std::string res="";
        std::string b16="0123456789ABCDEF";
        for(char ch:str){
            if(isdigit(ch) || isalpha(ch) ||
            ch=='-' || ch=='_' || ch=='.' || ch=='!' || ch=='~' || ch=='*' ||
            ch=='\'' || ch=='(' || ch==')'){
                res+=ch;
            }else{
                res+="%"+std::string(1,b16[ch/16])+std::string(1,b16[ch%16]);
            }
        }
        return res;
    }
    std::string readfile(std::string filename){
        std::string res="";
        FILE* filep=fopen(filename.c_str(),"r");
        int getc;
        while((getc=fgetc(filep))!=EOF) res+=char(getc);
        fclose(filep);
        return res;
    }
    void triggle(int elid,std::string ename){
        try{
            vh::hidden::callbk[make_pair(elid,ename)]();
        }catch(std::bad_function_call){}
    }
    bool read(std::string &str,bool single=false){
        bool done=0;
        int ch=getch();
        switch(ch){
            case vh::esc:
                triggle(-1,"exit");
                exit(0);
                break;
            case vh::newline:
                if(!single) str+='\n';
                break;
            case vh::backspace:
                if(str.size()) str.erase(str.size()-1);
                break;
            case '\t':
                done=1;
                break;
            default:
               if(isprint(ch)) str+=char(ch); 
        }
        return done; 
    }
    void sleep(double sec){
        std::this_thread::sleep_for(std::chrono::milliseconds(int(sec*1000)));
    }
    void writefile(std::string filename,std::string content){
        FILE* filep=fopen(filename.c_str(),"w");
        fputs(content.c_str(),filep);
        fclose(filep);
    }
    std::string webget(std::string url,std::string query){
        system((std::string("curl \"")+url+std::string("?")+encodeuri(query)+std::string("\" > vh.curl.tmp")).c_str());
        return readfile("vh.curl.tmp");
    }
    std::string webpost(std::string url,std::string query){
        #ifdef _WIN32
            system((std::string("curl --data \"")+query+std::string("\" \"")+url+std::string("\" > vh.curl.tmp")).c_str());
        #elif __linux__
            system((std::string("curl -X POST -d \"")+query+std::string("\" \"")+url+std::string("\" > vh.curl.tmp")).c_str());
        #endif
        return readfile("vh.curl.tmp");
    }
}

void loadcallbk();

#define on(ename,elid) vh::hidden::callbk[std::make_pair(elid,ename)]=[]()
#define start void loadcallbk(){
#define end }
#define element(elid) vh::hidden::els[elid]

int main(){
    const auto init=[&](std::vector<vh::hidden::ele> v1,int v2,int v3,int v4=-1,int v5=-1){
        vh::hidden::els=v1; vh::hidden::maxwidth=v2; vh::hidden::maxheight=v3;
        if(v4==-1) v4=vh::hidden::maxheight/2,v5=vh::hidden::maxwidth/2;
        vh::hidden::mousex=v4;
        vh::hidden::mousey=v5;
    };
    init(STATICDATA);
    if(vh::hidden::els.empty()) vh::error("nothing to display",__FUNCTION__);
    loadcallbk();
    vh::hidden::readkey=1;
    vh::triggle(-1,"load");
    while(1){
        vh::triggle(-1,"beforefresh");
        std::pair<std::vector<std::string>,std::vector<std::vector<int>>> ui=vh::hidden::render(vh::hidden::els,vh::hidden::maxwidth,vh::hidden::maxheight,vh::hidden::mousex,vh::hidden::mousey);
        vh::clear();
        for(std::string i:ui.first) puts(i.c_str());
        vh::triggle(-1,"afterfresh");
        if(!vh::hidden::readkey) continue;
        int ch=vh::getch();
        switch(ch){
            case vh::esc:
                vh::triggle(-1,"exit");
                exit(0);
            case 'w':
            case 'W':
                if(vh::hidden::mousex>0) vh::hidden::mousex--;
                break;
            case 'a':
            case 'A':
                if(vh::hidden::mousey>0) vh::hidden::mousey--;
                break;
            case 's':
            case 'S':
                if(vh::hidden::mousex<vh::hidden::maxheight-1) vh::hidden::mousex++;
                break;
            case 'd':
            case 'D':
                if(vh::hidden::mousey<vh::hidden::maxwidth-1) vh::hidden::mousey++;
                break;
            case vh::newline:
                if(ui.second[vh::hidden::mousex][vh::hidden::mousey]==-1){
                    vh::triggle(-1,"click");
                    break;
                }
                if(vh::hidden::els[ui.second[vh::hidden::mousex][vh::hidden::mousey]].status==vh::disable) break;
                vh::triggle(ui.second[vh::hidden::mousex][vh::hidden::mousey],"mousedown");
                if(vh::hidden::els[ui.second[vh::hidden::mousex][vh::hidden::mousey]].type==vh::button){
                    vh::hidden::els[ui.second[vh::hidden::mousex][vh::hidden::mousey]].status=vh::click;
                    vh::clear();
                    for(std::string i:vh::hidden::render(vh::hidden::els,vh::hidden::maxwidth,vh::hidden::maxheight,vh::hidden::mousex,vh::hidden::mousey).first) puts(i.c_str());
                    vh::triggle(ui.second[vh::hidden::mousex][vh::hidden::mousey],"click");
                    vh::sleep(0.15);
                    if(vh::hidden::els[ui.second[vh::hidden::mousex][vh::hidden::mousey]].status!=vh::disable){
                        vh::hidden::els[ui.second[vh::hidden::mousex][vh::hidden::mousey]].status=vh::normal;
                    }
                }else if(vh::hidden::els[ui.second[vh::hidden::mousex][vh::hidden::mousey]].type==vh::checkbox){
                    vh::hidden::els[ui.second[vh::hidden::mousex][vh::hidden::mousey]].status^=1;
                    if(vh::hidden::els[ui.second[vh::hidden::mousex][vh::hidden::mousey]].status) vh::triggle(ui.second[vh::hidden::mousex][vh::hidden::mousey],"select");
                    else vh::triggle(ui.second[vh::hidden::mousex][vh::hidden::mousey],"unselect");
                    vh::triggle(ui.second[vh::hidden::mousex][vh::hidden::mousey],"change");
                }else if(vh::hidden::els[ui.second[vh::hidden::mousex][vh::hidden::mousey]].type==vh::option){
                    for(int i=0;i<vh::hidden::els.size();i++){
                        if(vh::hidden::els[i].type==vh::option && vh::hidden::els[i].frame==vh::hidden::els[ui.second[vh::hidden::mousex][vh::hidden::mousey]].frame){
                            if(vh::hidden::els[i].status){
                                vh::hidden::els[i].status=vh::unselect;
                                vh::triggle(i,"unselect");
                                vh::triggle(i,"change");
                            }
                        }
                    }
                    vh::hidden::els[ui.second[vh::hidden::mousex][vh::hidden::mousey]].status=vh::select;
                    vh::triggle(ui.second[vh::hidden::mousex][vh::hidden::mousey],"select");
                    vh::triggle(ui.second[vh::hidden::mousex][vh::hidden::mousey],"change");
                }else if(vh::hidden::els[ui.second[vh::hidden::mousex][vh::hidden::mousey]].type==vh::input || vh::hidden::els[ui.second[vh::hidden::mousex][vh::hidden::mousey]].type==vh::textedit){
                    while(1){
                        vh::clear();
                        vh::hidden::els[ui.second[vh::hidden::mousex][vh::hidden::mousey]].args[0]+='I';
                        for(std::string i:vh::hidden::render(vh::hidden::els,vh::hidden::maxwidth,vh::hidden::maxheight).first) puts(i.c_str());
                        vh::hidden::els[ui.second[vh::hidden::mousex][vh::hidden::mousey]].args[0].erase(vh::hidden::els[ui.second[vh::hidden::mousex][vh::hidden::mousey]].args[0].size()-1);
                        bool res=vh::read(vh::hidden::els[ui.second[vh::hidden::mousex][vh::hidden::mousey]].args[0],vh::hidden::els[ui.second[vh::hidden::mousex][vh::hidden::mousey]].type==vh::input);
                        if(res) break;
                        vh::triggle(ui.second[vh::hidden::mousex][vh::hidden::mousey],"modify");
                    }
                }
                vh::triggle(ui.second[vh::hidden::mousex][vh::hidden::mousey],"mouseup");
                break;
            case '\t':
                bool found=0;
                int newval=(ui.second[vh::hidden::mousex][vh::hidden::mousey]+1)%vh::hidden::els.size();
                while(1){
                    for(int i=0;i<ui.first.size() && !found;i++){
                        for(int j=0;j<ui.first[i].size() && !found;j++){
                            if(ui.second[i][j]==newval){
                                vh::hidden::mousex=i; vh::hidden::mousey=j;
                                found=1;
                            }
                        }
                    }
                    if(found) break;
                    newval=(newval+1)%vh::hidden::els.size();
                }
                break;
        }
        if(ch=='w' || ch=='W' || ch=='s' || ch=='S' || ch=='a' || ch=='A' || ch=='d' || ch=='D' || ch=='\t'){
            vh::triggle(-1,"mousemove");
        }
    }
    return 0;
}

#ifdef NOSTATICDATA
std::vector<vh::hidden::ele> els;

int mousex(){
    return vh::hidden::mousex-1;
}

int mousey(){
    return vh::hidden::mousey-20;
}

void fresh(){
    element(9).args[0]="";
    std::vector<std::string> res(vh::hidden::render(els,element(9).width,element(9).height).first);
    for(std::string i:res){
        element(9).args[0]+=i;
    }
}

int argi=-2,argn=-1;

start

on("load",-1){
    element(1).status=vh::select;
};

on("beforefresh",-1){
    if(argi>=0){
        els.back().args[argi]+='I';
        fresh();
        els.back().args[argi].erase(els.back().args[argi].size()-1);
    }else{
        fresh();
    }
};

on("afterfresh",-1){
    if(argi>=0){
        if(argn==-1){
            argn=0;
            for(std::string i:vh::hidden::render1ele(vh::hidden::ele(
                els.back().type,0,0,0,0,{"1","2","3","4","5","6","7","8","9"},0
            ))){
                for(char j:i){
                    if(isdigit(j)) argn=std::max(argn,j-'0');
                }
            }
        }
        if(vh::read(els.back().args[argi])){
            if(argi<argn-1){
                argi++;
            }else{
                argi=-2,argn=-1,vh::hidden::readkey=1;
            }
        }
    }
};

on("mousedown",9){
    if(argi==-1){
        argi=0;
        vh::hidden::readkey=0;
    }else{
        int cur=vh::hidden::render(els,element(9).width,element(9).height).second[mousex()][mousey()];
        int type;
        for(int i=1;i<=8;i++) if(element(i).status==vh::select) type=i-1;
        if(type==7){
            if(cur!=-1) els.erase(els.begin()+cur);
        }else{
            els.push_back(vh::hidden::ele(type,mousex(),mousey(),1,1,std::vector<std::string>(9,""),(type==vh::frame?els.size():(cur==-1?-1:element(cur).frame))));
            argi=-1; 
        }
    }
};

on("mousemove",-1){
    if(argi==-1){
        els.back().width=std::max(1,mousey()-els.back().y);
        els.back().height=std::max(1,mousex()-els.back().x);
    }
};

on("exit",-1){
    std::string data="#define STATICDATA {";
    for(vh::hidden::ele el:els){
        data+="vh::hidden::ele("+std::to_string(el.type)+","+std::to_string(el.x)+","+std::to_string(el.y)+","+std::to_string(el.width)+","+std::to_string(el.height)+",{";
        for(std::string arg:el.args){
            if(arg==""){
                data+="\"\",";
                continue;
            }
            for(char ch:arg){
                data+="std::string(1,char("+std::to_string(int(ch))+"))+";
            }
            data.back()=',';
        }
        data.back()='}';
        data+=","+std::to_string(el.frame)+"),";
    }
    data.back()='}';
    data+=","+std::to_string(element(9).width)+","+std::to_string(element(9).height);
    data+=
        "\n#include \"vh.cpp\"\n"
        "// Global variable defination ...\n\n"
        "start\n"
        "/* on(EVENTNAME,ELEMENTID){\n"
        "     // This is a callback function.\n"
        "     // EVENTNAME includes (std::string):\n"
        "     //  # load: when program loaded but not start;\n"
        "     //  # exit: only before program exited by pressing Esc;\n"
        "     //  # beforefresh(afterfresh): before(after) textUI printed;\n"
        "     //  # mousemove: when mouse changed position;\n"
        "     //    mousedown(mouseup): when mouse button pressed(bounced);\n"
        "     //  * click: when mouse clicked(equals to mousedown);\n"
        "     //    select(unselect): when option or checkbox be selected(unselected);\n"
        "     //    change: when option or checkbox be selected or unselected;\n"
        "     //    modify: when textedit or input's value(arg0) changed by user\n"
        "     //  Note: EVENTNAME marked with #'s ELEMENTID should always be -1.\n"
        "     //        These events happened on the window. EVENTNAME marked\n"
        "     //        with *'s ELEMENTID can be both -1 and true ID.\n"
        "     // ELEMENTID see table below."
        "     // To access elements' attribute, use element().\n"
        "     //   element(ELEMENTID).ATTR\n"
        "     //   ATTR includes:\n"
        "     //     type: The type of element.\n"
        "     //          values: [vh::button][vh::checkbox]\n"
        "     //                  [vh::frame][vh::input][vh::label]\n"
        "     //                  [vh::option][vh::textedit]\n"
        "     //     status: The status of element.\n"
        "     //          values: [vh::invisable][vh::normal]\n"
        "     //                  [vh::unselect][vh::click][vh::select]\n"
        "     //                  [vh::disable]\n"
        "     //     x,y: The upper-left point of element.\n"
        "     //          +---> y\n"
        "     //          |\n"
        "     //          v x\n"
        "     //     width,height: The width and height of element's innerside.\n"
        "     //     args: All arguments of element. Typeof vector<string>\n"
        "     //     frame: The frame which the element belongs.\n"
        "     // The basic tutorial of visualHPP ends.\n"
        "   }  */\n"
        "end\n";
    std::vector<std::string> match={
        "button","checkbox","frame","input","label","option","textedit"
    };
    for(int i=0;i<els.size();i++){
        data+="// ELEMENTID="+std::to_string(i)+"\t\targ0=["+els[i].args[0]+"] with type="+match[els[i].type]+"\n";
    }
    vh::writefile("callbk_prog.cpp",data);
};

end
#endif

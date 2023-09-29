////////////////////////////////////
//         JSoj template          //
//                    lxy 2023.9  //
// ============================== //
// A template which can build OJ  //
// Notice: Run it on jsrun.net    //
// ------------------------------ //
//   >>> smopuim2.github.io <<<   //
////////////////////////////////////

//////////////////// Online Judge Info ////////////////////

const NAME=
/* Name? */"Online Judge"/* With quotes */
;
const SWITCH_RGST=
/* Allow register? */true/* 'true' or 'false' */
;
const GREET=[
/* Greetings to show when user login: */
/* Use quotes and comma to split */
"Welcome",
"Welcome",
"Hello"
];
const HOME=`
**Welcome to ${NAME}**
problem set is the place where you can find large amount of problems. Online Judge System allows you to test your solution for every problem.<br>
First of all, read carefully FAQ.<br>
Then, choose a problem, solve it and submit your solution.
`;
const FAQ=`
# How to train on ${NAME}?
Use the \`problem set\` or \`online contests\`.

Choose a problem, solve it. 
Then, submit your C++ code. You'll get a verdict:

|vdc|desc             |
|---|-----------------|
|AC |Accepted         |
|WA |Wrong Answer     |
|TLE|Time Limit Exceed|
|RE |Runtime Error    |

Note: if you used other OJs, you'll find JSoj doesn't have CE. 
Because if your code CEed, judger can't work too.

# Why my code can't AC (but ACed on other OJs/local) ?
Your code won't be compiled as a single file.

It will be put in a \`namespace\`, like this:

\`\`\`cpp
#include <bits\stdc++.h>
//...
#define ONLINE_JUDGE 1
using namespace std;

namespace SOLVER{
    stringstream cin,cout;
    //Your code will be here
};

//...

int main(){
    //...
    SOLVER::main();
    //...
    return 0;
}
\`\`\`

And we send data with \`SOLVER::cin\`, judge with \`SOLVER::cout\`. 
So, you **must** use \`cin\`/\`cout\`. Other ways won't be accepted.

# What is \`solution set\`?
It's a place where solutions can be found.

If you ACed a problem, you can write a solution for that.
Otherwise, you may just read others'.

# Can I publish problems/hold contests?
Yes, certainly, if you had login.

Bad problem/contests will be deleted.
`;

//////////////////// Don't change anything below ////////////////////

function to_md(txt){
    let uri='<meta charset="utf-8">\n'+txt+'\n<!-- Markdeep: --><style class="fallback">body{visibility:hidden;white-space:pre;font-family:monospace}</style><script src="https://casual-effects.com/markdeep/latest/markdeep.min.js" charset="utf-8"></'+'script><script>window.alreadyProcessedMarkdeep||(document.body.style.visibility="visible")</'+'script>';
    return "<iframe frameborder='0' class='big' src='data:text/html;base64,"+btoa(uri)+"'></iframe>"
}
function hide_all(){
    document.getElementById("main").innerHTML="";
    for(i of document.getElementById("preload").children){
        i.style.display="none";
    }
}
document.write(`
<html>
    <head>
        <meta charset="utf-8">
        <style>
            body,.dft{
                background-color:white;
                font-family:"Lucida console";
                line-height:1.1;
            }
            table{
                width:90%;
                margin:20px 0px;
            }
            td,th{
                text-align:center;
            }
            .hlt{
                background-color:white;
                cursor:default;
            }
            .hlt:hover{
                background-color:whitesmoke;
            }
            a{
                text-decoration:none;
                color:black;
            }
            .brd0{
                border:0px;
            }
            .thin{
                width:50px;
            }
            .big{
                width:90%;
                height:350px;
            }
            .half{
                width:44%;
                height:300px;
            }
            .small{
                width:90%;
                height:50px;
            }
            .mono{
                font-family:"Consolas";
            }
        </style>
    </head>
    <body>
        <center>
            <table>
                <tr>
                    <th class="hlt">${NAME}</th>
                    <th class="hlt">problem set</th>
                    <th class="hlt">online contests</th>
                    <th class="hlt">submit</th>
                    <th class="hlt">solution set</th>
                </tr>
                <tr>
                    <td class="hlt">
                        <a id="1-1" href="javascript:">home page</a><br>
                        <a id="1-2" href="javascript:">FAQs</a><br>
                        <a id="1-3" href="javascript:">login</a>
                        <a id="1-4" href="javascript:" style="display:none;">valueUndefined</a>
                    </td>
                    <td class="hlt">
                        <a id="2-1" href="javascript:">list all</a><br>
                        <a id="2-2-1" href="javascript:">goto</a>
                        P<input id="2-2-2" class="thin"><br>
                        <a id="2-3" href="javascript:">publish</a>
                    </td>
                    <td class="hlt">
                        <a id="3-1" href="javascript:">list all</a><br>
                        <a id="3-2-1" href="javascript:">goto</a>
                        C<input id="3-2-2" class="thin"><br>
                        <a id="3-3" href="javascript:">hold new</a>
                    </td>
                    <td class="hlt">
                        <a id="4-1" href="javascript:">JSide</a><br>
                        <a id="4-2" href="javascript:">submit</a>
                    </td>
                    <td class="hlt">
                        <a id="5-1" href="javascript:">list all</a><br>
                        <a id="5-2-1" href="javascript:">goto</a>
                        S<input id="5-2-2" class="thin"><br>
                        <a id="5-3" href="javascript:">write</a>
                    </td>
                </tr>
            </table>
            <div id="main"></div>
            <div id="preload">
                <div id="1-3/all" style="display:none;">
                    <input type="text" id="1-3/name" placeholder="Username..."><br>
                    <input type="password" id="1-3/pswd" placeholder="Password..."><br>
                    <button id="1-3/logn">login</button> <button id="1-3/rgst">register</button><br>
                    <span id="1-3/ivld" style="display:none;"></span>
                </div>
                <div id="1-4/all" style="display:none;">
                    <span id="1-4/msgs">valueUndefined</span>, <span id="1-4/name">valueUndefined</span> !<br>
                    <button id="1-4/lgot">logout</button> <button id="1-4/dlac">delete</button>
                </div>
                <div id="2-1/all" style="display:none;">
                    Problem list<br><br>
                    <textarea class="brd0 big dft" id="2-1/list" readonly></textarea>
                </div>
                <div id="2-3/all" style="display:none;">
                    Note: You can use <a href="https://casual-effects.com/markdeep/">Markdeep</a> to write them<br><br>
                    <input type="text" class="mono" id="2-3/titl" placeholder="Title..."><br>
                    <textarea class="mono half" id="2-3/desc" placeholder="Description..."></textarea>
                    <textarea class="mono half" id="2-3/cons" placeholder="Constration..."></textarea><br>
                    <textarea class="mono half" id="2-3/ifmt" placeholder="Input Format..."></textarea>
                    <textarea class="mono half" id="2-3/ofmt" placeholder="Output Format..."></textarea><br>
                    <textarea class="mono half" id="2-3/ismp" placeholder="Sample Input..."></textarea>
                    <textarea class="mono half" id="2-3/osmp" placeholder="Sample Output..."></textarea><br>
                    <textarea class="mono half" id="2-3/itsk" placeholder="Test Input..."></textarea>
                    <textarea class="mono half" id="2-3/otsk" placeholder="Test Output..."></textarea><br>
                    <button id="2-3/upld">Upload</button>
                </div>
                <div id="3-1/all" style="display:none;">
                    Contest list<br><br>
                    <textarea class="brd0 big dft" id="3-1/list" readonly></textarea>
                </div>
                <div id="3-3/all" style="display:none;">
                    Note: You can use <a href="https://casual-effects.com/markdeep/">Markdeep</a> to write them<br><br>
                    <input type="text" class="mono" id="3-3/titl" placeholder="Title..."><br>
                    <textarea class="mono half" id="3-3/desc" placeholder="Description..."></textarea>
                    <textarea class="mono half" id="3-3/tsks" placeholder="Tasks..."></textarea><br>
                    <button id="3-3/upld">Upload</button>
                </div>
                <div id="4-1/all" style="display:none;">
                    <form id="4-1/form" action="https://www.runoob.com/try/compile2.php" method="POST" target="4-1/rslt">
                        <textarea class="mono half" id="4-1/code" placeholder="C++ code..."></textarea>
                        <textarea class="mono half" id="4-1/inpt" placeholder="Input..." name="stdin"></textarea><br>
                        <textarea id="4-1/prgm" name="code" hidden></textarea>
                        <input type="text" name="token" value="066417defb80d038228de76ec581a50a" hidden>
                        <input type="text" name="language" value="7" hidden>
                        <input type="text" name="fileext" value="cpp" hidden>
                    </form>
                    <iframe class="small" name="4-1/rslt"></iframe><br>
                    <button id="4-1/exec">Run</button>
                </div>
                <div id="4-2/all" style="display:none;">
                    <form id="4-2/form" action="https://www.runoob.com/try/compile2.php" method="POST" target="4-2/rslt">
                        <textarea class="mono big" id="4-2/code" placeholder="C++ code..."></textarea>
                        <textarea id="4-2/inpt" name="stdin" hidden></textarea><br>
                        <textarea id="4-2/prgm" name="code" hidden></textarea>
                        <input type="text" name="token" value="066417defb80d038228de76ec581a50a" hidden>
                        <input type="text" name="language" value="7" hidden>
                        <input type="text" name="fileext" value="cpp" hidden>
                    </form>
                    <iframe class="big" name="4-2/rslt" id="4-2/rslt" style="display:none;"></iframe>
                    P<input type="text" id="4-2/pbid">
                    <button id="4-2/exec">Submit</button>
                </div>
                <div id="5-1/all" style="display:none;">
                    Solution list<br><br>
                    <textarea class="brd0 big dft" id="5-1/list" readonly></textarea>
                </div>
                <div id="5-3/all" style="display:none;">
                    Note: You can use <a href="https://casual-effects.com/markdeep/">Markdeep</a> to write them<br><br>
                    <input type="text" class="mono" id="5-3/titl" placeholder="Title..."><br>
                    <textarea class="mono big" id="5-3/ctnt" placeholder="Content..."></textarea><br>
                    <button id="5-3/upld">Upload</button>
                </div>
            </div>
        </center>
    </body>
</html>
`);
document.getElementById("1-1").onclick=function(){
    hide_all();
    document.getElementById("main").innerHTML=to_md(HOME);
}
document.getElementById("1-2").onclick=function(){
    hide_all();
    document.getElementById("main").innerHTML=to_md(FAQ);
}
document.getElementById("1-3").onclick=function(){
    hide_all();
    document.getElementById("1-3/all").style.display="block";
    document.getElementById("1-3/pswd").placeholder="Password...";
}
document.getElementById("1-3/logn").onclick=function(){
    document.getElementById("1-3/ivld").style.display="none";
    JSData.validPassword("@"+document.getElementById("1-3/name").value,document.getElementById("1-3/pswd").value,function(r){
        if(r.error==0){
            document.getElementById("1-3").style.display="none";
            document.getElementById("1-4").innerText=document.getElementById("1-3/name").value;
            document.getElementById("1-4").style.display="block";
            document.getElementById("1-4").click();
        }else{
            document.getElementById("1-3/ivld").innerText="Incorrect password!";
            document.getElementById("1-3/ivld").style.display="block";
        }
    });
}
document.getElementById("1-3/rgst").onclick=function(){
    if(!SWITCH_RGST){
        document.getElementById("1-3/ivld").style.display="block";
        document.getElementById("1-3/ivld").innerText="You cannot register, because admin had closed register entry!";
        return;
    }
    document.getElementById("1-3/ivld").style.display="none";
    if(document.getElementById("1-3/pswd").placeholder=="Password..."){
        if(document.getElementById("1-3/name").value.length>0 && document.getElementById("1-3/name").value.length<=10 && document.getElementById("1-3/pswd").value.length<=7){
            JSData.get("@",function(r){
                if(r.data==null){
                    JSData.set("@",r.data="");
                }
                if(r.data.split(" ").indexOf(document.getElementById("1-3/name").value)>=0){
                    document.getElementById("1-3/ivld").innerText="Name had been used!";
                    document.getElementById("1-3/ivld").style.display="block";
                }else{
                    tmp=document.getElementById("1-3/pswd").value;
                    document.getElementById("1-3/pswd").value="";
                    document.getElementById("1-3/pswd").placeholder="Type again to check!";
                }
            });
        }else{
            document.getElementById("1-3/ivld").innerText="Invalid username(0<length<=10) or password(length<=7)!";
            document.getElementById("1-3/ivld").style.display="block";
        }
    }else{
        //console.log(tmp+"\n"+document.getElementById("1-3/pswd").value);
        if(tmp==document.getElementById("1-3/pswd").value){
            JSData.setPassword("@"+document.getElementById("1-3/name").value,document.getElementById("1-3/pswd").value,function(){
                JSData.append("@"," "+document.getElementById("1-3/name").value);
                document.getElementById("1-3").style.display="none";
                document.getElementById("1-4").innerText=document.getElementById("1-3/name").value;
                document.getElementById("1-4").style.display="block";
                document.getElementById("1-4").click();
            });
        }else{
            document.getElementById("1-3/ivld").innerText="Your password is different from the first time.";
            document.getElementById("1-3/ivld").style.display="block";
            document.getElementById("1-3/pswd").placeholder="Password...";
        }
    }
}
document.getElementById("1-4").onclick=function(){
    hide_all();
    document.getElementById("1-4/all").style.display="block";
    document.getElementById("1-4/msgs").innerText=GREET[Math.floor(Math.random()*GREET.length)];
    document.getElementById("1-4/name").innerText=document.getElementById("1-4").innerText;
}
document.getElementById("1-4/lgot").onclick=function(){
    document.getElementById("1-3").style.display="block";
    document.getElementById("1-4").innerText="valueUndefined";
    document.getElementById("1-4").style.display="none";
    document.getElementById("1-3").click();
}
document.getElementById("1-4/dlac").onclick=function(){
    JSData.drop("@"+document.getElementById("1-4").innerText);
    JSData.get("@",function(r){
        r=r.data.split(" ");
        r.splice(r.indexOf(document.getElementById("1-4").innerText),1);
        JSData.set("@",r.join(" "));
        document.getElementById("1-4").innerText="valueUndefined";
    });
    document.getElementById("1-3").style.display="block";
    document.getElementById("1-4").style.display="none";
    document.getElementById("1-3").click();
}
document.getElementById("2-1").onclick=function(){
    hide_all();
    document.getElementById("2-1/all").style.display="block";
    document.getElementById("2-1/list").value="";
    JSData.get("P",function(r){
        if(r.data==null) JSdata.set("P",r.data=0);
        for(let i=1;i<=r.data;i++){
            JSData.get("P"+String(i).padStart(4,"0"),function(p){
                if(p.data!=null){
                    o=JSON.parse(p.data);
                    document.getElementById("2-1/list").value+="P"+String(i).padStart(4,"0")+" | "+o.title+"\n";
                }
            });
        }
    });
}
document.getElementById("2-2-1").onclick=function(){
    hide_all();
    JSData.get("P"+document.getElementById("2-2-2").value.padStart(4,"0"),function(r){
        if(r.data==null) document.getElementById("main").innerHTML=to_md("Problem not exist.")
        else{
            o=JSON.parse(r.data);
            document.getElementById("main").innerHTML=to_md(
`**${o.title}**

<small>Author: ${o.athr}</small>

---

# Description
${o.desc}

# Constrations
${o.cons}

---

# Format

## Input Format
${o.ifmt}

## Output Format
${o.ofmt}

# Samples

## Input
\`\`\`
${o.ismp}
\`\`\`

## Output
\`\`\`
${o.osmp}
\`\`\`

`);
        }
    });
}
document.getElementById("2-3").onclick=function(){
    hide_all();
    if(document.getElementById("1-4").innerText=="valueUndefined") document.getElementById("1-3").click();
    else document.getElementById("2-3/all").style.display="block";
}
document.getElementById("2-3/upld").onclick=function(){
    o={
        title:document.getElementById("2-3/titl").value,
        desc:document.getElementById("2-3/desc").value,
        cons:document.getElementById("2-3/cons").value,
        ifmt:document.getElementById("2-3/ifmt").value,
        ofmt:document.getElementById("2-3/ofmt").value,
        ismp:document.getElementById("2-3/ismp").value,
        osmp:document.getElementById("2-3/osmp").value,
        itsk:document.getElementById("2-3/itsk").value,
        otsk:document.getElementById("2-3/otsk").value,
        athr:document.getElementById("1-4").innerText
    };
    JSData.get("P",function(r){
        if(r.data==null) r.data=0;
        JSData.set("P",r.data=parseInt(r.data)+1);
        JSData.set("P"+String(r.data).padStart(4,"0"),JSON.stringify(o));
        document.getElementById("2-2-2").value=String(r.data).padStart(4,"0");
        document.getElementById("2-2-1").click();
    });
}
document.getElementById("3-1").onclick=function(){
    hide_all();
    document.getElementById("3-1/all").style.display="block";
    document.getElementById("3-1/list").value="";
    JSData.get("C",function(r){
        if(r.data==null) JSdata.set("C",r.data=0);
        for(let i=1;i<=r.data;i++){
            JSData.get("C"+String(i).padStart(4,"0"),function(p){
                if(p.data!=null){
                    o=JSON.parse(p.data);
                    document.getElementById("3-1/list").value+="C"+String(i).padStart(4,"0")+" | "+o.title+"\n";
                }
            });
        }
    });
}
document.getElementById("3-2-1").onclick=function(){
    hide_all();
    JSData.get("C"+document.getElementById("3-2-2").value.padStart(4,"0"),function(r){
        if(r.data==null) document.getElementById("main").innerHTML=to_md("Contest not exist.")
        else{
            o=JSON.parse(r.data);
            document.getElementById("main").innerHTML=to_md(
`**${o.title}**

<small>Holder: ${o.athr}</small>

---

# Description
${o.desc}

# Tasks
${o.tsks}

`);
        }
    });
}
document.getElementById("3-3").onclick=function(){
    hide_all();
    if(document.getElementById("1-4").innerText=="valueUndefined") document.getElementById("1-3").click();
    else document.getElementById("3-3/all").style.display="block";
}
document.getElementById("3-3/upld").onclick=function(){
    o={
        title:document.getElementById("3-3/titl").value,
        desc:document.getElementById("3-3/desc").value,
        tsks:document.getElementById("3-3/tsks").value,
        athr:document.getElementById("1-4").innerText
    };
    JSData.get("C",function(r){
        if(r.data==null) r.data=0;
        JSData.set("C",r.data=parseInt(r.data)+1);
        JSData.set("C"+String(r.data).padStart(4,"0"),JSON.stringify(o));
        document.getElementById("3-2-2").value=String(r.data).padStart(4,"0");
        document.getElementById("3-2-1").click();
    });
}
document.getElementById("4-1").onclick=function(){
    hide_all();
    document.getElementById("4-1/all").style.display="block";
}
document.getElementById("4-1/exec").onclick=function(){
    document.getElementById("4-1/prgm").value=
`#include <bits/stdc++.h>
#define ONLINE_JUDGE 1
using namespace std;

namespace SOLVER{
    ${document.getElementById("4-1/code").value}
};

int main(){
    SOLVER::main();
    return 0;
}`;
    document.getElementById("4-1/form").submit();
}
document.getElementById("4-2").onclick=function(){
    hide_all();
    document.getElementById("4-2/all").style.display="block";
    document.getElementById("4-2/form").style.display="block";
    document.getElementById("4-2/rslt").style.display="none";
}
document.getElementById("4-2/exec").onclick=function(){
    JSData.get("P"+document.getElementById("4-2/pbid").value.padStart(4,"0"),function(r){
        if(r.data==null){
            document.getElementById("4-2/pbid").value="????";
            document.getElementById("4-2/form").style.display="block";
            document.getElementById("4-2/rslt").style.display="none";
        }else{
            o=JSON.parse(r.data);
            document.getElementById("4-2/prgm").value=
`#include <bits/stdc++.h>
#include <sys/timeb.h>
using namespace std;

namespace SOLVER{
    stringstream cin,cout;
    ${document.getElementById("4-2/code").value}
};

bool JUDGER(string s,string t){
    int i=0,j=0;
	t+="\\n";
	for(;i<s.size() && j<t.size();i++,j++){
		if(s[i]!='\\n'){
			if(s[i]!=t[j]){
				return 0;
			}
		}else{
			while(t[j]==' ') j++;
			if(t[j]!='\\n'){
				return 0;
			}
		}
	}
	if(i!=s.size()){
		return 0;
	}
	for(;j<t.size();j++){
		if(t[j]!=' ' && t[j]!='\\n'){
			return 0;
		}
	}
    return 1;
}

int main(){
    SOLVER::cin<<"${o.itsk}";
    timeb pre,now;
    ftime(&pre);
    SOLVER::main();
    ftime(&now);
    if((now.time*1000+now.millitm)-(pre.time*1000+pre.millitm)>1050) cout<<"TLE";
    else if(JUDGER("${o.otsk}",SOLVER::cout.str()+"\\n")) cout<<"AC";
    else cout<<"WA";
    return 0;
}`;
            document.getElementById("4-2/form").submit();
        }
    });
    document.getElementById("4-2/form").style.display="none";
    document.getElementById("4-2/rslt").style.display="block";
    document.getElementById("4-2/rslt").src="about:blank"
}
document.getElementById("5-1").onclick=function(){
    hide_all();
    document.getElementById("5-1/all").style.display="block";
    document.getElementById("5-1/list").value="";
    JSData.get("S",function(r){
        if(r.data==null) JSdata.set("S",r.data=0);
        for(let i=1;i<=r.data;i++){
            JSData.get("S"+String(i).padStart(4,"0"),function(p){
                if(p.data!=null){
                    o=JSON.parse(p.data);
                    document.getElementById("5-1/list").value+="S"+String(i).padStart(4,"0")+" | "+o.title+"\n";
                }
            });
        }
    });
}
document.getElementById("5-2-1").onclick=function(){
    hide_all();
    JSData.get("S"+document.getElementById("5-2-2").value.padStart(4,"0"),function(r){
        if(r.data==null) document.getElementById("main").innerHTML=to_md("Solution not exist.")
        else{
            o=JSON.parse(r.data);
            document.getElementById("main").innerHTML=to_md(
`**${o.title}**

<small>Writer: ${o.athr}</small>

---

${o.ctnt}

`);
        }
    });
}
document.getElementById("5-3").onclick=function(){
    hide_all();
    if(document.getElementById("1-4").innerText=="valueUndefined") document.getElementById("1-3").click();
    else document.getElementById("5-3/all").style.display="block";
}
document.getElementById("5-3/upld").onclick=function(){
    o={
        title:document.getElementById("5-3/titl").value,
        ctnt:document.getElementById("5-3/ctnt").value,
        athr:document.getElementById("1-4").innerText
    };
    JSData.get("S",function(r){
        if(r.data==null) r.data=0;
        JSData.set("S",r.data=parseInt(r.data)+1);
        JSData.set("S"+String(r.data).padStart(4,"0"),JSON.stringify(o));
        document.getElementById("5-2-2").value=String(r.data).padStart(4,"0");
        document.getElementById("5-2-1").click();
    });
}

if(typeof JSData=="undefined") alert("Run template on jsrun.net");
else document.getElementById("1-1").click();

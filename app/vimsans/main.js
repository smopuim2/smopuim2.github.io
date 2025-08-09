const fps=30;
let gamePause=0;
const itemdt={
    'Pie':999999,
    'I. Noodles':90,
    'L. Hero':40,
    'Steak':60,
    'Poison':-999999
};
let maxhp=92,hp=92,kr=0;
let item=['Pie','I. Noodles','Steak','L. Hero','L. Hero','L. Hero','Poison','Poison','Poison','Poison'];
let stat='fight',prevStat=[],optList={},prevOpt=[],curOpt=[];
let keyList=new Set(),keyRpList=new Set();

const chStat=function(cur){
    prevStat.push(stat);
    stat=cur;
};
const chPanelSize=function(w,h,f){
    let pn=$('#panel');
    if(Math.round(pn.width())==w && Math.round(pn.height())==h){
        f();
        return;
    }
    pn.width(w);
    pn.height(h);
    gamePause=1;
    setTimeout(function(){ gamePause=0; f(); },500);
};

const moveSoul=function(id=''){
    if(id==''){
        id=stat;
        if(id=='_end' || id=='_hide'){
            $('#soul').hide();
            return;
        }
        $('#soul').show();
        if(id=='_free' || id=='target') return;
    }else $('#soul').show();
    let el=$('#'+id);
    let lf=el.position().left,tp=el.position().top;
    let ml=parseInt(el.css('margin-left')),mt=parseInt(el.css('margin-top'));
    let bd=parseInt(el.css('border-width'));
    let ofs=3;
    if($('#soul').attr('src')=='targetline.png') ofs=0;
    $('#soul').css('translate',`${lf+ml+bd+ofs}px ${tp+mt+bd+ofs}px`);
};
const getSoulPos=function(){
    let tr=$('#soul').css('translate').split(' ');
    return {'x':parseInt(tr[0]),'y':parseInt(tr[1])};
}
const chSoulPos=function(x,y){
    let tr=getSoulPos();
    $('#soul').css('translate',`${tr.x+x}px ${tr.y+y}px`);
};

const selectPanel=function(opt){
    if(opt.length){
        chStat('option1');
        prevOpt.push(curOpt);
        curOpt=opt;
    }else{
        opt=curOpt=prevOpt.pop();
        stat=prevStat.pop();
    }
    let h='';
    optList={}
    for(let i in opt){
        let id=`option${Number(i)+1}`;
        h+=`<div id='${id}' class='option'>&thinsp;* ${opt[i]}</div>`;
        optList[id]=opt[i];
    }
    $('#panel').html(h);
};

const keyUpdate=function(){
    const startTurn=function(){
        chPanelSize(320,80,function(){
            stat='fight';
            prevStat=[];
            optList={};
            prevOpt=[];
            curOpt=[];
            $('#fight').addClass('selected');
        });
    }
    const endTurn=function(){
        $('#panel').text('');
        $('#'+prevStat[0]).removeClass('selected');
        chStat('_hide');
        chPanelSize(100,100,function(){
            stat='_free';
            setTimeout(startTurn,500);
        });
    };
    const strikeLine=function(){
        gamePause=1;
        const f=function(t){
            if(!t){
                $('#soul').attr('src','soul.png');
                gamePause=0;
                endTurn();
                return;
            }
            if(t%2) $('#soul').removeClass('inverted');
            else $('#soul').addClass('inverted');
            setTimeout(f,80,t-1);
        }
        f(6);
    };
    if(stat=='_free'){
        let lr=0,ud=0;
        if(keyRpList.has('ArrowLeft')) lr--;
        if(keyRpList.has('ArrowRight')) lr++;
        if(keyRpList.has('ArrowUp')) ud--;
        if(keyRpList.has('ArrowDown')) ud++;
        if(!lr && !ud) return;
        chSoulPos(lr*4,ud*4);
        return;
    }
    if(keyList.has('z')){
        if(stat=='_end'){
            endTurn();
        }else if(stat=='fight'){
            selectPanel(['Sans']);
        }else if(stat=='act'){
            selectPanel(['Sans']);
        }else if(stat=='item'){
            if(item.length) selectPanel(item);
        }else if(stat=='mercy'){
            selectPanel(['Spare']);
        }else if(stat.startsWith('option')){
            if(prevStat[0]=='fight'){
                $('#panel').html('<img src="target.png" id="target">');
                chStat('_hide');
                $('#soul').attr('src','targetline.png');
                chStat('target');
                moveSoul('target');
            }else if(prevStat[0]=='act'){
                if(prevStat.length==1){
                    selectPanel(['Check']);
                }else{
                    let sel=optList[stat];
                    if(sel=='Check'){
                        $('#panel').text('* SANS 1 ATK 1 DEF\n* The easiest enemy.\n* Can only deal 1 damage.');
                        chStat('_end');
                    }
                }
            }else if(prevStat[0]=='item'){
                let it=optList[stat];
                let hp2=hp;
                item.splice(item.indexOf(it),1);
                hp=Math.max(0,Math.min(maxhp,hp+itemdt[it]));
                let tx=`* You ate ${it}.\n* You recovered ${hp-hp2} HP!`;
                if(hp==maxhp) tx+='\n* Your HP is max out.';
                $('#panel').text(tx)
                chStat('_end');
            }else if(prevStat[0]=='mercy'){
                endTurn();
            }
        }else if(stat=='target'){
            strikeLine();
        }
        return;
    }
    if(stat=='target'){
        const stp=7.5;
        chSoulPos(stp,0);
        let tg=$('#target');
        if(getSoulPos().x+stp>tg.position().left+tg.width()) strikeLine();
        return;
    }
    if(keyList.has('x')){
        if(prevStat.length && stat!='_end'){
            selectPanel([]);
        }
        return;
    }
    let lr=0,ud=0;
    if(keyList.has('ArrowLeft')) lr--;
    if(keyList.has('ArrowRight')) lr++;
    if(keyList.has('ArrowUp')) ud--;
    if(keyList.has('ArrowDown')) ud++;
    if(!lr && !ud) return;
    if(stat=='_free'){
        chSoulPos(lr*5,ud*5);
        return;
    }
    const menu=['fight','act','item','mercy'];
    if(menu.includes(stat)){
        $('#'+stat).removeClass('selected');
        stat=menu[(menu.indexOf(stat)+menu.length+lr)%menu.length];
        $('#'+stat).addClass('selected');
        return;
    }
    if(stat.startsWith('option')){
        let id=Number(stat.slice(6))+ud*2+lr;
        stat='option'+Math.max(1,Math.min(Object.keys(optList).length,id));
        return;
    }
}

const gameInit=function(){
    $('#panel').width(320);
    $('#panel').height(80);
    $('#fight').addClass('selected');
    $('#blood').width(maxhp/2);
};

const gameUpdate=function(){
    keyUpdate();
    keyList.clear();
    moveSoul();
    if(!prevStat.length){
        chPanelSize(320,80,function(){
            $('#panel').text('* You encountered Sans.');
        });
    }
    $('#b1').width(hp/2);
    $('#b2').width(kr/2);
    $('#hp2').text(String(hp).padStart(2,'0')+'/'+maxhp);
};

let prevTs;
$('body').on('keydown',function(ev){
    let k=ev.key;
    if(!keyRpList.has(k)){
        keyList.add(k);
        keyRpList.add(k);
    }
});
$('body').on('keyup',function(ev){
    let k=ev.key;
    keyList.delete(k);
    keyRpList.delete(k);
});
requestAnimationFrame(function(ts){
    prevTs=ts;
    gameInit();
    gameLoop(ts);
});
const gameLoop=function(ts){
    let dif=ts-prevTs;
    if(dif>=1000/fps && !gamePause){
        prevTs=ts;
        gameUpdate();
    }
    requestAnimationFrame(gameLoop);
};

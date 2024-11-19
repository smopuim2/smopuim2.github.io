var n=6,m=5;
var x;

function rand(){
    return Math.floor((Math.random()-0.5)*200)/100;
}

function randint(a){
    return Math.floor(Math.random()*a);
}

function go(){
    let ii=[];
    for(let i of $('#t').val()) ii.push(i.charCodeAt());
    let oo=calc(ii);
    let o='';
    for(let i of oo){
        i=Math.round(i);
        if(i==10 || i==13 || i==9 || (32<=i && i<=126)) o+=
                String.fromCharCode(i);
        else o+='{'+String(i)+'}';
    }
    $('#r').val(o);
}

function feed(){
    let ii=[],oo=[];
    for(let i of $('#i').val().split('\n')){
        ii.push([]);
        for(let j of i){
            ii[ii.length-1].push(j.charCodeAt());
        }
    }
    for(let i of $('#o').val().split('\n')){
        oo.push([]);
        for(let j of i){
            oo[oo.length-1].push(j.charCodeAt());
        }
    }
    console.log(ii,oo);
    if(x==undefined){
        x=[];
        for(let i=0;i<n;i++){
            x.push([]);
            let s=m,s1=m;
            if(i==0) s1=ii[0].length;
            if(i==n-1) s=oo[0].length;
            for(let j=0;j<s;j++){
                x[i].push([rand()]);
                for(let k=1;k<=s1;k++){
                    x[i][j].push(rand());
                }
            }
        }
    }
    let t=[];
    for(let i=0;i<ii.length;i++) t.push(0);
    let s=1e8;
    while(s>1e-3){
        for(let i=0;i<ii.length;i++) t[i]=diff(calc(ii[i]),oo[i]);
        let a=randint(x.length);
        let b=randint(x[a].length);
        let c=randint(x[a][b].length);
        let d=x[a][b][c];
        x[a][b][c]=rand();
        let t2=[];
        for(let i=0;i<ii.length;i++) t2.push(diff(calc(ii[i]),oo[i]));
        if(less(t2,t)) t=t2;
        else if(Math.random()<1/Math.exp(diff(t,t2)/s)) t=t2;
        else x[a][b][c]=d;
        s*=0.98;
        console.log(t,t2);
    }
}

function calc(ii){
    let t;
    for(let i=0;i<n;i++){
        t=[];
        for(let j=0;j<x[i].length;j++){
            t.push(x[i][j][0]);
            for(let k=1;k<x[i][j].length;k++){
                t[j]+=x[i][j][k]*ii[k-1];
            }
            t[j]=Math.max(t[j],0);
        }
        ii=copy(t);
        // console.log(t);
    }
    return t;
}

function diff(o1,o2){
    let s=0;
    for(let i=0;i<o1.length;i++) s+=(o1[i]-o2[i])**2;
    return s;
}

function diff2(o1,o2){
    let s=0;
    for(let i=0;i<o1.length;i++) s+=o2[i]-o1[i];
    return s;
}

function less(o1,o2){
    for(let i=0;i<o1.length;i++) if(o1[i]>o2[i]) return 0;
    return 1;
}

function copy(a){
    if(typeof(a)=='number') return a;
    let r=[];
    for(let i of a){
        r.push(copy(i));
    }
    return r;
}

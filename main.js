function initwin(){
    for(let i of $('div.block').slice(1)){
        $(i).html(`
            <div class='block-op'>
                <button onclick="b2win($(this))">Pop this up</button>
            </div>
            <div class='block-content'>
                `+$(i).html()+`
            </div>`
        );
    }
}

function b2win(e){
    let o=e.parent();
    let b=o.parent();
    let c=b.find('.block-content');
    let w=Math.min(parseInt(b.css('width')),
            parseInt($('html').css('width'))*0.5);
    let h=Math.min(parseInt(b.css('height')),
            parseInt($('html').css('height'))*0.5);
    let t='';
    for(let i=1;i<=6 && !t;i++) t=$($(c).find('h'+String(i))[0]).text();
    if(!t) t=$($(c).find('span')[0]).text();
    if(!t) t='Pop-up Window';
    b.attr('data-window-id',String(Math.floor(Math.random()*1e8)));
    b.attr('class','window');
    b.attr('onmousedown','topwindow($(this));');
    o.attr('class','window-op');
    o.attr('onmousedown','pickwindow($(this));');
    c.attr('class','window-content');
    o.html(`
        <span class='window-title'>`+t+`</span>
        <button onclick="exitwindow($(this));"
                class='window-ops window-exit'></button>
        <button onclick="minwindow($(this));"
                class='window-ops window-min'></button>
        <button onclick="maxwindow($(this));"
                class='window-ops window-max'></button>
    `);
    b.css('top','15px');
    b.css('left','15px');
    c.css('width',String(w)+'px');
    c.css('height',String(h)+'px');
    topwindow(b);
}

function topwindow(b){
    let m=$('#minbar');
    b.css('z-index',m.css('z-index'));
    m.css('z-index',String(Number(m.css('z-index'))+1));
}

function exitwindow(e){
    let o=e.parent();
    let b=o.parent();
    let c=b.find('.window-content');
    b.attr('class','block');
    o.attr('class','block-op');
    c.attr('class','block-content');
    o.html(`
        <button onclick="b2win($(this))">Pop this up</button>
    `);
    b.css('z-index','');
    b.css('top','');
    b.css('left','');
    c.css('width','');
    c.css('height','');
    b.attr('data-pre-top','');
    b.attr('data-pre-left','');
    b.attr('data-pre-width','');
    b.attr('data-pre-height','');
}

function minwindow(e){
    let o=e.parent();
    let b=o.parent();
    let t=b.find('.window-title').text();
    let i=b.attr('data-window-id');
    b.css('display','none');
    $('#minbar').html($('#minbar').html()+
        `<button data-match-id='`+i+`'
                onclick='showwindow($(this))'>`+t+`</button>`
    );
}

function showwindow(e){
    let i=e.attr('data-match-id');
    $($('[data-window-id='+i+']')[0]).css('display','');
    e.remove();
}

function maxwindow(e){
    let o=e.parent();
    let b=o.parent();
    let c=b.find('.window-content');
    if(!b.attr('data-pre-top')){
        let w=parseInt($('html').css('width'))-20;
        let h=parseInt($('html').css('height'))-50;
        b.attr('data-pre-top',b.css('top'));
        b.attr('data-pre-left',b.css('left'));
        b.attr('data-pre-width',c.css('width'));
        b.attr('data-pre-height',c.css('height'));
        b.css('top','0');
        b.css('left','0');
        c.css('width',String(w)+'px');
        c.css('height',String(h)+'px');
        o.addClass('content-max');
        b.addClass('content-max');
        c.addClass('content-max');
    }else{
        b.css('top',b.attr('data-pre-top'));
        b.css('left',b.attr('data-pre-left'));
        c.css('width',b.attr('data-pre-width'));
        c.css('height',b.attr('data-pre-height'));
        b.attr('data-pre-top','');
        b.attr('data-pre-left','');
        b.attr('data-pre-width','');
        b.attr('data-pre-height','');
        o.removeClass('content-max');
        b.removeClass('content-max');
        c.removeClass('content-max');
    }
}

function pickwindow(o){
    let b=o.parent();
    if(b.attr('data-pre-top')) return;
    b.attr('data-picked-window','picked');
}

function putwindow(){
    let b=$('[data-picked-window=picked]');
    b.attr('data-picked-window','');
    if(b.attr('data-pre-x')){
        b.attr('data-pre-x','');
        b.attr('data-pre-y','');
    }
}

function movewindow(ev){
    let b=$('[data-picked-window=picked]');
    if(!b.length) return;
    b=$(b[0]);
    if(!b.attr('data-pre-x')){
        b.attr('data-pre-x',ev.clientX);
        b.attr('data-pre-y',ev.clientY);
    }
    let x=ev.clientX-Number(b.attr('data-pre-x'));
    let y=ev.clientY-Number(b.attr('data-pre-y'));
    b.css('left',parseInt(b.css('left'))+x);
    b.css('top',parseInt(b.css('top'))+y);
    b.attr('data-pre-x',ev.clientX);
    b.attr('data-pre-y',ev.clientY);
}

function init(){
    $('title').text($($('h1')[0]).text());
    $('#navbar-title').text(window.location.hostname);
    initwin();
    $(document).mousemove(movewindow);
    $(document).mouseup(putwindow);
}

init();

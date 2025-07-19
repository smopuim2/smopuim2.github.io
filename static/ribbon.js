function load_static(dt,e){
    let tp=Object.prototype.toString.call(dt);
    if(tp=='[object String]'){
        if(/^.*\.svg$/.test(dt)){
            e.html(e.html()+`<img src='static/${dt}'>`);
        }
    }else if(tp=='[object Array]'){
        for(let i of dt){
            load_static(i,e);
        }
    }else if(tp=='[object Object]'){
        for(let i in dt){
            load_static(dt[i],e);
        }
    }
}

function show_banner(t){
    $('#banner-text').fadeOut(300,function(){
        $('#banner-text').text(t);
        $('#banner-text').fadeIn(300);
    });
    $('#banner').fadeOut(300,function(){
        $('#banner').fadeIn(300);
    });
}
function hide_banner(){
    $('#banner-text').fadeOut(300);
    $('#banner').fadeOut(300);
}

function load_menu(){
    $($('#menu').children()[0]).html(Object.keys(data.menu).map(x=>
        `<div class='option'>${x}</div>`
    ));
}
function change_menu_under_shadow(e){
    $('#menu .under-shadow').css('left',e.offset().left+9);
    $('#menu .under-shadow').css('width',e.width());
}
function change_menu_under(e){
    $('#menu .under').css('left',e.offset().left+9);
    $('#menu .under').css('width',e.width());
}

function change_submenu(m){
    let e=$('#submenu');
    if(!e.html().trim()) e.html('<div></div>');
    e.children().fadeOut(150,function(){
        e.html(data.menu[m].map(x=>
            x[0]=='BAR'?`<div class='bar'></div>`
            :$(`<div class='option col-flex flex-center'>
                <img src='static/${x[0]}'>
                <span>${x[1]}</span>
            </div>`).on('click',x[2])
        ));
        e.children().fadeIn(150);
    });
}

load_static(data,$('#loader'));
$('body')[0].style.setProperty('--theme-color',data.theme);
load_menu();
$('#menu .option').on('mouseenter',function(ev){
    change_menu_under_shadow($(this));
});
$('#menu').on('mouseleave',function(ev){
    change_menu_under_shadow($('#menu .active'));
});
$('#menu .option').on('mousedown',function(ev){
    let e=$(this);
    $('#menu .option.active').removeClass('active');
    e.addClass('active');
    change_menu_under_shadow(e);
    change_menu_under(e);
    change_submenu(e.text());
});
$($('#menu .option')[1]).trigger('mousedown');
$(window).resize(function(){
    change_menu_under_shadow($('#menu .option.active'));
    change_menu_under($('#menu .option.active'));
    data.resized();
});
$('#slide-zoom-dec').on('click',function(){
    $('#slide-zoom').text(Math.max(Number($('#slide-zoom').text())-10,10));
});
$('#slide-zoom-inc').on('click',function(){
    $('#slide-zoom').text(Math.min(Number($('#slide-zoom').text())+10,500));
});
$('#loader').ready(function(){
    setTimeout(function(){ // submenu poped
        data.loaded();
        hide_banner();
    },200);
});

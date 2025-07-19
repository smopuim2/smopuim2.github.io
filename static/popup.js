var popupjs={
    inited:false,
    moving:{},
    ismoving:false,
    init:function(){
        $(document).on('mousemove',function(e){
            if(popupjs.ismoving){
                popupjs.moving.e.css('top',e.clientY-popupjs.moving.y);
                popupjs.moving.e.css('left',e.clientX-popupjs.moving.x);
            }
        });
        $(document).on('mouseup',function(e){
            if(popupjs.ismoving){
                popupjs.moving.e.css('top',e.clientY-popupjs.moving.y);
                popupjs.moving.e.css('left',e.clientX-popupjs.moving.x);
            }
            popupjs.ismoving=false;
        });
    },
    pop:function(e,b){ // Element & Bar
        e.css('top',e.offset().top-$(window).scrollTop());
        e.css('left',e.offset().left-$(window).scrollLeft());
        e.css('position','fixed');
        let p=$("<div class='popupjs-placeholder'></div>")
        p.css('display',e.css('display'));
        p.width(e.outerWidth());
        p.height(e.outerHeight());
        e.after(p);
        p.hide(500);
        if(!this.inited){
            this.init();
        }
        if(b==undefined) b=e;
        b.on('mousedown',function(ev){
            popupjs.moving={
                e:e,
                x:ev.offsetX,
                y:ev.offsetY
            };
            popupjs.ismoving=true;
        });
        e.data('popupjs-placeholder',p);
    },
    put:function(e,b){
        let p=e.data('popupjs-placeholder');
        e.removeData('popupjs-placeholder');
        let t=e.css('transition');
        e.css('transition','top 0.5s,left 0.5s,width 0.5s,height 0.5s');
        p.show(500);
        setTimeout(function(){
            e.css('top',p.offset().top-$(window).scrollTop());
            e.css('left',p.offset().left-$(window).scrollLeft());
            setTimeout(function(){
                e.css('position','static');
                e.css('transition',t);
                p.remove();
            },500);
        },500);
        b.off('mousedown');
    }
};

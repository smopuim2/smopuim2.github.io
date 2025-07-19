let prior=1;

let oper={
    ins_md:function(ev){
        if(ev.md.trim()){
            ev.e.css('transform',ev.tr);
            ev.e.html(md2html(ev.md));
            ev.e.data('src',ev.md);
            $('#slide').append(ev.e);
            ev.e.off('click');
            ev.e.on('click',function(evv){
                if(!prior) return;
                let e=ev.e;
                let ed=$('#edit');
                e.html('');
                ed.css('transform',e.css('transform'));
                ed.val(e.data('src'));
                ed.show();
                ed.focus();
                ed.off('focusout');
                ed.one('focusout',function(){
                    do_this('change_md',{
                        e:e,
                        md:ed.val(),
                        md2:e.data('src'),
                        tr:ed.css('transform'),
                        tr2:e.css('transform')
                    });
                    ed.hide();
                });
                $('#slide').off('click');
                evv.stopPropagation();
            });
        }
    },
    _ins_md:function(ev){
        this.del_md(ev);
    },
    del_md:function(ev){
        ev.e.remove();
    },
    _del_md:function(ev){
        this.ins_md({
            e:ev.e,
            md:ev.e.data('src'),
            tr:ev.e.css('transform')
        });
    },
    change_md:function(ev){
        ev.e.html(md2html(ev.md));
        ev.e.css('transform',ev.tr);
        if(ev.md==ev.md2 && ev.tr==ev.tr2) return 1;
        ev.e.data('src',ev.md);
    },
    _change_md:function(ev){
        this.change_md({
            e:ev.e,
            md:ev.md2,
            md2:ev.md,
            tr:ev.tr2,
            tr2:ev.tr
        });
    },
};

let undos=[],undop=0;
function undo(){
    if(undop){
        let x=undos[--undop];
        oper['_'+x[0]](x[1]);
    }
}
function redo(){
    if(undop<undos.length){
        let x=undos[undop++];
        oper[x[0]](x[1]);
    }
}
function do_this(op,ev){
    if(oper[op](ev)) return;
    undos=undos.slice(0,undop++);
    undos.push([op,ev]);
}

function ins_md(ev){
    let sld=$('#slide');
    let ed=$('#edit');
    let ofs=sld.offset();
    ed.css('transform',`matrix(1,0,0,1,${ev.clientX-ofs.left},${ev.clientY-ofs.top})`);
    ed.val('');
    ed.show();
    ed.focus();
    ed.off('focusout');
    ed.one('focusout',function(ev){
        let t=ed.val();
        if(t.trim()){
            do_this('ins_md',{
                e:$('<div></div>'),
                md:ed.val(),
                tr:ed.css('transform')
            });
        }
        ed.hide();
        sld.off('click');
    });
    prior=1;
}

function Ins_md(){
    let vwp=$('#viewport');
    vwp.off('click');
    vwp.one('click',ins_md);
    prior=0;
}

let data={
    menu:{
        File:[
        ],
        Home:[
            ['undo.svg','Undo',undo],
            ['redo.svg','Redo',redo],
            ['BAR',''],
            ['ins-md.svg','Insert MD',Ins_md],
        ],
        Insert:[
        ],
        Slides:[
        ],
        Review:[
        ],
        Help:[
        ]
    },
    theme:'#c43f1d',
    resized:function(){
        $('#slide').css('transform',`translate(${
            ($('#viewport').width()-$('#slide').width())/2
        }px,${
            ($('#viewport').height()-$('#slide').height())/2
        }px)`)
    },
    loaded:function(){
        this.resized();
        $('#footbar>.flex-left').text('MarkPoint');
        $('#viewport').on('dblclick',ins_md);
        $('#edit').hide();
        $('#edit').on('click',function(ev){
            ev.stopPropagation();
        });
        $('#edit').on('dblclick',function(ev){
            ev.stopPropagation();
        });
        function ismove_edit(ev){
            let ed=$('#edit');
            let x=ed.offset().left;
            let y=ed.offset().top;
            return (x<=ev.clientX && ev.clientX<=x+5) && (y<=ev.clientY && ev.clientY<=y+5);
        }
        $('#edit').on('mousedown',function(ev){
            let ed=$(this);
            if(ed.hasClass('dragging')){
                ed.data('pre-x',ev.clientX);
                ed.data('pre-y',ev.clientY);
                let tr=ed.css('transform').split('matrix(')[1].split(')')[0].split(', ');
                for(let i=0;i<6;i++) tr[i]=Number(tr[i]);
                ed.data('tr',tr);
            }
        });
        $('#viewport').on('mousemove',function(ev){
            let ed=$('#edit');
            if(ed.data('pre-x')!=undefined){
                ed.data('tr')[4]+=ev.clientX-ed.data('pre-x');
                ed.data('tr')[5]+=ev.clientY-ed.data('pre-y');
                ed.css('transform','matrix('+ed.data('tr').join(',')+')');
                ed.data('pre-x',ev.clientX);
                ed.data('pre-y',ev.clientY);
            }
            if(ismove_edit(ev)){
                $('body').addClass('dragging');
                ed.addClass('dragging');
            }else{
                $('body').removeClass('dragging');
                ed.removeClass('dragging');
            }
        });
        $('#viewport').on('mouseup',function(ev){
            let ed=$('#edit');
            if(ed.data('pre-x')!=undefined){
                ed.css('transform','matrix('+ed.data('tr').join(',')+')');
                ed.removeData('pre-x');
                ed.removeData('pre-y');
                ed.removeData('tr');
            }
        });
    }
};


function build(){
}

function init(){
    $('title').text($($('h1')[0]).text());
    $('#navbar-title').text(window.location.hostname);
}

init();

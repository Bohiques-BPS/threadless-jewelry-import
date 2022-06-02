window.port = chrome.runtime.connect({
    name: Math.floor( Math.random()*99 )+"-"+Math.floor( Math.random()*99 )
});

window.port.onMessage.addListener( response => {
    if( response.result == 'clear' ) {
        sessionStorage.removeItem('tji-products');
    }else if( response.result == 'received' || response.result == 'not received' ) {
        alert( response.result );
    }
});

window.interval2 = setInterval( window => {
    try{
        window.port.postMessage({
            action: 'check'
        });
    }catch(err){
        console.log('error',err);
        clearInterval(window.interval2);
        window.location.reload()
    }
}, 1000, window);
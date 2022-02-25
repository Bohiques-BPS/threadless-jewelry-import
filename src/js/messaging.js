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

// setInterval( w => {
//      window.port.postMessage({
//         action: 'check'
//     });
// }, 500, window);
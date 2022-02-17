chrome.runtime.onInstalled.addListener( function(){
    console.log( "Installed" );
});

chrome.runtime.onConnect.addListener( function(port) {
    console.log( "Connected" )
    console.log(port)
    port.onMessage.addListener( function(msg,port){
        // let name = port.name, 
        //     url = port.sender.url,
        //     tabId = port.sender.tab.id;
        chrome.storage.local.get("products", function(data){
            let products = [];
            if( Object.keys(data).length !== 0 ) {
                products = data;
            }
            products.push( msg.product );
            chrome.storage.local.set("products", products);
        });

    })
});
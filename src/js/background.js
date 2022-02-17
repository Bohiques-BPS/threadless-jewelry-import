chrome.runtime.onInstalled.addListener( function(){
    console.log( "Installed" );
});

chrome.runtime.onConnect.addListener( function(port) {
    console.log( "Connected,moi" )
    console.log(port)
    port.onMessage.addListener( function(msg,port){
        console.log(msg)
        // let name = port.name, 
        //     url = port.sender.url,
        //     tabId = port.sender.tab.id;
        chrome.storage.local.get("products", function(data){
            let products = [];
            console.log(data)
            if( Object.keys(data).length !== 0 ) {
                products = data.products;
            }
            products.push( msg.product );
            chrome.storage.local.set({products: products});
        });

    })
});
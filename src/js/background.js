chrome.runtime.onInstalled.addListener( function(){
    console.log( "Installed!!" );
    chrome.storage.local.set({products: []});
});

chrome.runtime.onConnect.addListener( function(port) {
    console.log( "Connected!!" )
    console.log(port)
    port.onMessage.addListener( function(msg,port){
        console.log(msg)
        // let name = port.name, 
        //     url = port.sender.url,
        //     tabId = port.sender.tab.id;
        if( msg.action == 'check' ){
            chrome.storage.local.get("products", function(data){
                if( data.products.length == 0 ){
                    port.postMessage({result:'clear'});
                }                
            });
            
        }else if( msg.action == 'add' ){
            chrome.storage.local.get("products", function(data){
                let products = [];
                console.log(data)
                if( Object.keys(data).length !== 0 ) {
                    products = data.products;
                }
                products.push( msg.product );
                chrome.storage.local.set({products: products});
                port.postMessage({result:'received'});
            });
            
        }else{
            port.postMessage({result:'not received'});
        }
    })
});
$(document).ready( async _ => {
    const {products} = await chrome.storage.local.get("products")
    console.log(products);

    $("#download").click( _ => {
        console.log(products)
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(getContent(products));
        var dlAnchorElem = document.getElementById('download2');
        dlAnchorElem.setAttribute("href",     dataStr     );
        dlAnchorElem.click();
        
    })

    $("#btn_delete").click( _ => {
        chrome.storage.local.set({products: []});
        sessionStorage.setItem("tji-products", '[]' );
        updateProducts( );
    })

    function updateProducts( ) {
        let products = JSON.parse( sessionStorage.getItem("tji-products") || '[]' );
        let divProducts = document.querySelector('productos');
        let ul = document.createElement('ul');
        products.forEach( element => {
            let li = document.createElement('li');
            li.innerText = element;
            ul.appendChild( li );
        })
        divProducts.innerHTML = "";
        divProducts.appendChild( ul );
    }

    setInterval( _ => {
        updateProducts( );
    }, 1000 )
    
    function getContent(products){
        let str = ""
        products.forEach( product => {
            str += product.title+", "+product.itemNumber+", "+product.material+", "+product.plating+"\n";
        })
        return str;
    }

    

} );


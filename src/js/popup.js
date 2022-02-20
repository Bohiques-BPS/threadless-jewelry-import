$(document).ready( async _ => {
    let products = await chrome.storage.local.get("products")
    console.log(products);

    $("#clear").click( _ => {
        chrome.storage.local.set({products:[]});
        products = [];
    })

    $("#download").click( _ => {
        console.log(products)
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(getContent(products));
        var dlAnchorElem = document.getElementById('download2');
        dlAnchorElem.setAttribute("href",dataStr);
        dlAnchorElem.click();
        
    })
    
    function getContent(products){
        let str = ""
        products.forEach( product => {
            str += product.title+", "+product.itemNumber+", "+product.material+", "+product.plating+"\n";
        })
        return str;
    }

    

} );


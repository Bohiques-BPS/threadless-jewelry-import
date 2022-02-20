$(document).ready( async _ => {
    let { products } = await chrome.storage.local.get("products")

    $("#clear").click( _ => {
        chrome.storage.local.set({products:[]});
        products = [];
    })

    $("#download").click( _ => {
        
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(getContent(products));
        var dlAnchorElem = document.getElementById('download2');
        dlAnchorElem.setAttribute("href",dataStr);
        dlAnchorElem.click();
        
    })
    
    function getContent(products){
        let str = "post_title,post_name,sku\n"
        products.forEach( product => {
            str += product.title+", "+product.title+", "+product.itemNumber+"\n";
        })
        return str;
    }

    setInterval(_=>{
        let html = "<table>";
        products.forEach( product => {
            html += "<tr style='border: 1px solid grey; padding:5px;'>"
            html += "<td>"+product.title+"</td>"
            html += "<td>"+product.itemNumber+"</td>"
            html += "</tr>"
        })
        html += "</table>";
        console.log(html)
        $("#productos").html(html)
    },200)

    

} );


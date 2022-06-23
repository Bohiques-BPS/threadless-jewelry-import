$(document).ready(async (_) => {
    let { products } = await chrome.storage.local.get("products");
    $(document).click( function(ev){
        const target = $(ev.target);
        if(target.attr('class')=='list-item'){
            const itemNumber = target.data('item');
            let newProducts = products.filter( product => product.itemNumber != itemNumber )
            chrome.storage.local.set({ products: newProducts });
            products = newProducts;
        }

        if(target.attr('class')=='del-variation'){
            const code = target.data('code');
            const parent = code.split("-")[0];
            let newProducts = products;
            newProducts.forEach( (product, index) => {
                if( product.itemNumber == parent ){
                    newProducts[index].variations = product.variations.filter( variation => variation.code != code )
                }
            })
            chrome.storage.local.set({ products: newProducts });
            products = newProducts;
        }
        
    })
    
    const getChildHtml = (variations, names) => {
        let html ="";
        if(variations.length>0){
            
            html += "<div class='childs'>";
            html += "<table><tr><th></th>"
            names.forEach( (name) => {
                html += "<th>"+name+"</th>"
            })
            html += "<th></th>"
            html += "</tr>"
            variations.forEach( variation =>{
                html += "<tr><td></td>"
                names.forEach( (name) => {
                    html += "<td>"+variation[name]+"</td>"
                })
                html += "<td><div data-code='"+variation.code+"' class='del-variation'>X</div></td>"
                html += "</tr>"
            })
            html += "</table>"
            html += "</div>";
        }
        return html;
        
    }
    


    setInterval(async () => {
        let { products } = await chrome.storage.local.get("products");
        let html = "<div class='list'>";
        products.forEach((product) => {
            html += "<div class='list-item' data-item='"+product.itemNumber+"'>";
                html += "<div class='item-img'>";
                    html += "<img src='"+product.url+"'>";
                html += "</div>";
                html += "<div class='item-title'>";
                    html += product.title;
                html += "</div>";
            html += "</div>";
            html += getChildHtml(product.variations, Object.keys(product.variationsName))
        });
        html += "</div>";
        $("#productos").html(html);
    }, 1000);

})
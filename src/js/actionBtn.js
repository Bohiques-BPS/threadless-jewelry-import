

actionBtn = ev => {
    let products = JSON.parse( sessionStorage.getItem('tji-products') ) ?? [];
    if( products.indexOf( $(".brief-wrap dl dd").eq(0).text() ) != -1 ) {
        alert('El Producto ya fue agregado'); 
        return;
    }
    let product = {
        title: $(".brief-wrap h3").text().replaceAll( ",", " \," ),
        url: $(".prod-container .prod-subdetail .prod-subimg-wrap .loaded-img img").attr('src'),
        itemNumber: $(".brief-wrap dl dd").eq(0).text(),
        material: $(".brief-wrap dl dd").eq(1).text(),
        plating: $(".brief-wrap dl dd").eq(2).text(),
        soldBy: $(".brief-wrap dl dd").eq(3).text(),
        description: $(".description-wrap .description").text().replaceAll( ",", "\," ),
        variations: (_=> {
            let items = [];
            let childItems = $('table .child-item');
            for( let i = 0; i < childItems.length; i++ ) {
                items.push({
                    code: childItems.eq(i).children().eq(0).text(),
                    thickness: childItems.eq(i).children().eq(1).text(),
                    length: childItems.eq(i).children().eq(2).text(),
                    colorLogo: childItems.eq(i).children().eq(3).text(),
                    price: childItems.eq(i).children().eq(4).text(),
                    greaterThan3: childItems.eq(i).children().eq(5).text(),
                    greaterThan6: childItems.eq(i).children().eq(6).text(),
                    greaterThan12: childItems.eq(i).children().eq(7).text()
                });
            }
            return items;
        })()
    };
    console.log( product );
    products.push( $(".brief-wrap dl dd").eq(0).text() );
    sessionStorage.setItem('tji-products', JSON.stringify( products ));
    window.port.postMessage({
        action: 'add',
        product: product
    });
    //alert('Agregado '+product.title);

}



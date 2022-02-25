

actionBtn = ev => {
    let products = JSON.parse( sessionStorage.getItem('tji-products') ) ?? [];
    if( products.indexOf( $(".brief-wrap dl dd").eq(0).text() ) != -1 ) {
        alert('El Producto ya fue agregado'); 
        return;
    }
    let getBase64Image = (img) => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL();
        return dataURL;
    }
    let variationsName = (_=> {
        let items = {};
        let childItems = $('table th');
        for( let i = 1; i < childItems.length; i++ ) {
            let text = childItems.eq(i).text( );
            if ( text == 'Price' ) break;
            items[ text.replaceAll(' ', '') ] =  (_=> {
                let items = [];
                let childItems = $('table .child-item');
                for( let f = 0; f < childItems.length; f++ ) {
                    items.push(
                        childItems.eq(f).children().eq(i).text()
                    );
                }
                return items.filter( (element, index) => items.indexOf( element ) == index );
            })()
        }
        return items;
    })()
    let product = {
        title: $(".brief-wrap h3").text().replaceAll( ",", " \," ),
        url: $(".prod-container .prod-subdetail .prod-subimg-wrap .loaded-img img").attr('src'),
        img: getBase64Image($(".prod-container .prod-subdetail .prod-subimg-wrap .loaded-img img")[0]).replaceAll( ",", " \," ),
        itemNumber: $(".brief-wrap dl dd").eq(0).text(),
        material: $(".brief-wrap dl dd").eq(1).text(),
        plating: $(".brief-wrap dl dd").eq(2).text(),
        stoneMaterial: $(".brief-wrap dl dd").eq(3).text(),
        soldBy: $(".brief-wrap dl dd").eq(4).text(),
        description: $(".description-wrap .description").text().replaceAll( ",", "\," ),
        variationsName: variationsName,
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



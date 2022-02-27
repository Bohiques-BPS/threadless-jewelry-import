

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
    
    let getAttributes = _=> {
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
    }
    
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
        variationsName: getAttributes(),
        variations: (_=> {
            let items = [];
            let childItems = $('table .child-item');
            for( let i = 0; i < childItems.length; i++ ) {
                let variation = {
                    code: childItems.eq(i).children().eq(0).text()
                };
                let keys = Object.keys( getAttributes() )
                let k = 1;
                keys.forEach( key => {
                    variation[key] = childItems.eq(i).children().eq(k).text()
                    k++
                })
                items.push(variation);
            }
            return items;
        })()
    };
    products.push( $(".brief-wrap dl dd").eq(0).text() );
    sessionStorage.setItem('tji-products', JSON.stringify( products ));
    window.port.postMessage({
        action: 'add',
        product: product
    });
    //alert('Agregado '+product.title);

}



$(document).ready( function(){
    console.log( "jquery runing!!!" )
    window.getter = {
        interval: null
    };
    $('.product-img').click( function(){
        window.getter.interval = setInterval( _ => {
            console.log("in interval")
            let btnContainer = document.querySelector(".single-addbtn-wrap");
            if( btnContainer ) {
                let btnDown = document.createElement('button');
                btnDown.setAttribute('type','button');
                btnDown.setAttribute('class','additemtotal info active');
                btnDown.setAttribute('id','action-save');
                btnDown.setAttribute('style','margin-left: 10px; margin-right: 10px;');
                btnDown.innerText = "Save Data";
                btnContainer.addEventListener('click', ev => {
                    let product = {
                        title: $(".brief-wrap h3").text(),
                        itemNumber: $(".brief-wrap dl dd").eq(0).text(),
                        material: $(".brief-wrap dl dd").eq(1).text(),
                        plating: $(".brief-wrap dl dd").eq(2).text(),
                        soldBy: $(".brief-wrap dl dd").eq(3).text(),
                        description: $(".description-wrap .description").text(),
                        variations: (_=> {
                            let items = [];
                            let childItems = $('table .child-item');
                            for( let i = 0; i < childItems.length; i++ ) {
                                items.push({
                                    code: childItems.eq(i).children().eq(0).text(),
                                    thickness: childItems.eq(i).children().eq(1).text(),
                                    colorLogo: childItems.eq(i).children().eq(2).text(),
                                    price: childItems.eq(i).children().eq(3).text(),
                                    greaterThan3: childItems.eq(i).children().eq(4).text(),
                                    greaterThan6: childItems.eq(i).children().eq(5).text(),
                                    greaterThan12: childItems.eq(i).children().eq(6).text()
                                });
                            }
                            return items;
                        })()
                    };
                    console.log( product );
                })
                btnContainer.append( btnDown );
                clearInterval( window.getter.interval );
            }            
        } ,100);
    });
    
})
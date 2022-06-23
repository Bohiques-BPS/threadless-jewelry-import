try{
    $(document).ready( function(){
        window.getter = {
            interval: null
        };
      
        $(document).click( function(ev) {//'.product-img'
            if( (-1 === ev.target.className.search('u-photo')) && (-1 === ev.target.className.search('product-img'))  ) return;
            window.getter.interval = setInterval( _ => {
                let btnContainer = document.querySelector(".single-addbtn-wrap");
                if( btnContainer && !btnContainer.contains(document.querySelector('#action-save')) ) {
                    let btnDown = document.createElement('button');
                    btnDown.setAttribute('type','button');
                    btnDown.setAttribute('class','additemtotal info active');
                    btnDown.setAttribute('id','action-save');
                    btnDown.setAttribute('style','margin-left: 10px; margin-right: 10px;');
                    btnDown.innerText = "Save Data";
                    btnDown.addEventListener('click', actionBtn )
                    btnContainer.append( btnDown );
                    let end = false;
                    $(".qprice-chart.table1 thead tr").prepend("<th><input class='select-all' type='checkbox' /></th>")
                    $(".qprice-chart.table1 thead tr th").each(function(i){
                        if( $(this).text() == 'Price' ) {
                            end = true;
                        }
                        if( i>1 && !end ){   
                            $(this).append("<input type='checkbox' class='select-column' checked />")
                        }
                    })
                    $(".qprice-chart.table1 tbody tr").prepend("<td><input class='select-item' type='checkbox' /></td>")

                    $(document).click( ({target})=>{
                        const $target = $(target);
                        if($target.attr('class') == 'select-all'){
                            if( $target.is(':checked') ){
                                $('select-item').attr('checked', '')
                            }else{
                                $('select-item').removeAttr('checked')
                            }                            
                        }
                    })

                    clearInterval( window.getter.interval );
                }else if( btnContainer && btnContainer.contains(document.querySelector('#action-save')) ){
                    clearInterval( window.getter.interval );
                }
            } ,3000);
        });
        
    })
}
catch(err){
    console.log(err)
}

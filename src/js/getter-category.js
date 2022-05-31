try{
    
    $(document).ready( function(){
        console.log( "jquery runing in category!!!" );
        window.getter = {
            interval: null
        };
      
        $(document).click( function(ev) {//'.product-img'
            console.log('searching product-img')
            console.log(ev.target)
            if( (-1 === ev.target.className.search('u-photo')) && (-1 === ev.target.className.search('product-img'))  ) return;
            window.getter.interval = setInterval( _ => {
                console.log('interval')
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
                    clearInterval( window.getter.interval );
                }else if( btnContainer && btnContainer.contains(document.querySelector('#action-save')) ){
                    clearInterval( window.getter.interval );
                }
            } ,100);
        });
        
    })
}
catch(err){
    console.log(err)
}

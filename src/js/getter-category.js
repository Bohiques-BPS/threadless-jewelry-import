try{
    
    $(document).ready( function(){
        console.log( "jquery runing!!!" );
        window.getter = {
            interval: null
        };
      
        $(document).click( function(ev) {//'.product-img'
            if( -1 === ev.target.className.search('product-img')) return;
            window.getter.interval = setInterval( _ => {
                let btnContainer = document.querySelector(".single-addbtn-wrap");
                if( btnContainer ) {
                    let btnDown = document.createElement('button');
                    btnDown.setAttribute('type','button');
                    btnDown.setAttribute('class','additemtotal info active');
                    btnDown.setAttribute('id','action-save');
                    btnDown.setAttribute('style','margin-left: 10px; margin-right: 10px;');
                    btnDown.innerText = "Save Data";
                    btnDown.addEventListener('click', actionBtn )
                    btnContainer.append( btnDown );
                    clearInterval( window.getter.interval );
                }            
            } ,100);
        });
        
    })
}
catch(err){
    console.log(err)
}

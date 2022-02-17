$(document).ready( function(){
    console.log( "jquery runing!!!" )
    window.getter = {
        loadingData: false,
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
                btnDown.setAttribute('style','margin-left: 10px;');
                btnDown.innerText = "Save Data";
                btnContainer.append( btnDown );
                clearInterval( window.getter.interval );
            }            
        } ,100);
    });
    
})
$(document).ready( function(){
    console.log( "jquery runing!!!" )
    window.port = chrome.runtime.connect({
        name: Math.floor( Math.random()*99 )+"-"+Math.floor( Math.random()*99 )
    });
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
                btnDown.addEventListener('click', actionBtn )
                btnContainer.append( btnDown );
                clearInterval( window.getter.interval );
            }            
        } ,100);
    });
    
})
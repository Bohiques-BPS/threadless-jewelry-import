$(document).ready( function(){
    console.log( "jquery runing in product!!!" );
        
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
    }
} );

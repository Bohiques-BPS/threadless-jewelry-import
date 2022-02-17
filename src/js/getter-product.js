addEventListener('load', _ => {
    let btnContainer = document.querySelector(".single-addbtn-wrap");
    let btnDown = document.createElement('button');
    btnDown.setAttribute('type','button');
    btnDown.setAttribute('class','additemtotal info active');
    btnDown.setAttribute('id','action-save');
    btnDown.setAttribute('style','margin-left: 10px;');
    btnDown.innerText = "Save Data";
    btnContainer.append( btnDown );
} );
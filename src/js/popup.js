$(document).ready(async (_) => {
  let { products } = await chrome.storage.local.get("products");
  $("#clear").click((_) => {
    chrome.storage.local.set({ products: [] });
    products = [];
    
  });
  

  $(document).click( function(ev){
    if(ev.target.className!='borrar item-close') return
    let itemNumber = $(this).data('item');
    let newProducts = products.filter( product => product.itemNumber != itemNumber )
    chrome.storage.local.set({ products: newProducts });
    products = newProducts
  })

  $("#download").click((_) => {
    var dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(getContent(products));
    var dlAnchorElem = document.getElementById("download2");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.click();
  });

  function getVariationsName(products) {
    let variations = [];
    products.forEach( product => {
      let keys = Object.keys( product.variationsName )
      keys.forEach( key => {
        if(variations.indexOf(key) == -1){
          variations.push( key )
        }
      })
    })
    return variations;
  }

  function getContent(products) {
    let delimiter = $("#delimiter").val();
    let str = "Type"+delimiter+"Name"+delimiter+"Description"+delimiter+"SKU"+delimiter+"Parent"+delimiter+"url";
    let variations = getVariationsName(products);
    variations.forEach( (variation,index) => {
      str += delimiter+" Attribute "+(index+1)+" name"+delimiter+" Attribute "+(index+1)+" value(s)"+delimiter+" Attribute "+(index+1)+" visible"+delimiter+" Attribute "+(index+1)+" global"
    })
    str += "\n"
    products.forEach((product) => {
      str += `variable${delimiter}${product.title}${delimiter}${product.description.replaceAll( "\t", "" ).replaceAll( "\n", "" )}${delimiter}${product.itemNumber}${delimiter}${delimiter}${product.url}`;
      let keys = Object.keys( product.variationsName )
      keys.forEach( key => {
        str += `${delimiter}${key}${delimiter}${product.variationsName[key]}${delimiter}1${delimiter}0`
      } )
      str += `\n`
      product.variations.forEach((variation) => {
          str += `variation${delimiter}${product.title}${delimiter}${product.description.replaceAll( "\t", "" ).replaceAll( "\n", "" )}${delimiter}${variation.code}${delimiter}${product.itemNumber}${delimiter}${product.url}`
          keys.forEach( key => {
            str += `${delimiter}${key}${delimiter}${variation[key]}${delimiter}${delimiter}`
          } )
          str += `\n`
      });
    });
   
    return str;
  }

  setInterval((_) => {
    
    let html = "<div class='list'>";
    products.forEach((product) => {
      html += "<div class='list-item' data-item='"+product.itemNumber+"'>";
      html += "<div class='item-img'>";
      html += "<img src='"+product.url+"'>";
      html += "</div>";
      html += "<div class='item-title'>";
      html += product.title;
      html += "</div>";
      html += "</div>";
    });
    html += "</div>";
    $("#productos").html(html);
  }, 1000);
});



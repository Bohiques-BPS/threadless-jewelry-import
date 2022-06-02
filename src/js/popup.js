$(document).ready(async (_) => {
  let { products } = await chrome.storage.local.get("products");

  $("#clear").click((_) => {
    chrome.storage.local.set({ products: [] });
    products = [];
  });

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
    let html = "<table>";
    products.forEach((product) => {
      html += "<tr style='border: 1px solid grey; padding:5px;'>";
      html += "<td>" + product.title + "</td>";
      html += "<td>" + product.itemNumber + "</td>";
      html += "</tr>";
    });
    html += "</table>";
    $("#productos").html(html);
  }, 200);
});

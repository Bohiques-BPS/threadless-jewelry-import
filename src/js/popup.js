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
    let str = "Type,Name,Description,SKU,Parent,url,img_base64";
    let variations = getVariationsName(products);
    variations.forEach( (variation,index) => {
      str += ", Attribute "+(index+1)+" name, Attribute "+(index+1)+" value(s), Attribute "+(index+1)+" visible, Attribute "+(index+1)+" global"
    })
    str += "\n"
    products.forEach((product) => {
      str += `variable,${product.title},${product.description.replaceAll( "\t", "" ).replaceAll( "\n", "" )},${product.itemNumber},${product.url},${product.img}`;
      let keys = Object.keys( product.variationsName )
      keys.forEach( key => {
        str += `,${key},${product.variationsName[key]},1,0`
      } )
      str += `\n`
      product.variations.forEach((variation) => {
          str += `variation,${product.title},${product.description.replaceAll( "\t", "" ).replaceAll( "\n", "" )},${variation.code},${product.itemNumber},${product.url},${product.img}`
          keys.forEach( key => {
            str += `,${key},${variation[key]},,`
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

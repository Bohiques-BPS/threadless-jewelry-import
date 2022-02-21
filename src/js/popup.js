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

  function getContent(products) {
    let str = "post_title,post_content,sku,regular_price,sale_price\n";
    console.log(products);
    products.forEach((product) => {
      product.variations.forEach((variation) => {
        let price =
          (str += `${product.title},${product.description},${variation.code},${variation.price},${variation.greaterThan3}\n`);
      });
    });
    console.log(str);
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
    console.log(html);
    $("#productos").html(html);
  }, 200);

  /*
    description: "\n\t\t\t\t\t\t\tWe use Ti-6AL4V-ELi ASTM F-136(Grade 23) *IMPLANT GRADE* titanium in all of our Titanium Body Jewelry.\t\t\t\t\t\t\tView G23 Titanium Certificate\t\t\t\t\t\t"
    itemNumber: "T23RX1"
    material: "TITANIUM 6AL-4V-ELI ASTM F-136"
    plating: "piece"
    soldBy: ""
    title: "Implant Grade Titanium Bendable Hoop with Rounded Ends"

    description: "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"
itemNumber: "RH93"
material: "316L Surgical Steel"
plating: "PVD"
soldBy: "CZ"
title: "Multi CZ Fan 316L Surgical Steel Hinge Hoop Segment Rings"
variations: (3) [{…}, {…}, {…}]
[[Prototype]]: Object
2:
description: "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"
itemNumber: "RH76"
material: "316L Surgical Steel"
plating: "PVD"
soldBy: "piece"
title: "316L Surgical Steel Hinged Segment Hoop Rings with Triple Layered Hoops"
variations: (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
[[Prototype]]: Object
3:
description: "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"
itemNumber: "RH78"
material: "316L Surgical Steel"
plating: "PVD"
soldBy: "Crystals"
title: "316L Surgical Steel Hinged Segment Hoop Rings with 5 Flush Set Front Facing Petite Crystals"
variations: (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]*/
});

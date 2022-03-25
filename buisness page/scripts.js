myStorage = window.sessionStorage;
var b = ""
var product = ""
var prices = {
  "Breville Die-Cast 2-Slice Smart Toaster":149.95,
  "Cuisinart 2 Slice Compact Plastic Toaster":29.95,
  "Oster Black Stainless Collection 2-Slice Toaster":59.99,
  "Zwilling 2-Slice Toaster":130.00,
  "Revolution Cooking R180 2-Slice High-Speed Toaster":349.95,
  "Cuisinart 4-Slice Metal Classic Toaster":69.95,
  "Hamilton Beach Keep Warm 4-Slice Long Slot Toaster":49.99,
  "Sencor Stainless Steel 4-Slice Toaster":69.99,
  "All-Clad 4-Slice Digital Toaster":149.95,
  "Black and Decker 4-Slice Toaster":34.96
}
var cart = []
var totalCost
function hidePage(buttonel){
  let h = document.querySelector("body > div.Home.child").clientHeight; 
  b = buttonel.innerHTML
  let p = document.getElementById("page")
  p.classList.replace("shown-page", "hide-page")
  for (let i = 0; i < document.getElementsByClassName("drop-down").length; i++){
    document.getElementsByClassName("drop-down")[i].classList.replace("drop-down", "none");
  }
  document.getElementById(b).classList.replace("none", "drop-down")
  setTimeout(function(){
    document.querySelector("#page").style.height = (h-document.getElementById(b).clientHeight) + "px"},750)
  
}function showPage(){
  document.getElementById("page").classList.replace("hide-page", "shown-page")
  document.getElementById(b).classList.replace("drop-down", "none")
  document.querySelector("#page").style.height = ""
}
function loadProduct(name){
  product = "product.html?product="+name.innerHTML
  location.replace(product)
}
function refreshProd(){
  searchParams = new URLSearchParams(window.location.search)
  product = searchParams.get('product')
  document.getElementById("Ptitle").innerHTML = product;
  document.getElementById("Pimg").style.width = "100%"
  document.getElementById("Pimg").src = "toasters/" + product + ".jpg"
  document.getElementById("Pprice").innerHTML = "$" + prices[product];
  cart.push(myStorage["cart"].split(","))
}
function addCart(el){
  let qty = document.getElementById("qty").value
  el.innerHTML = "Added to Cart"
  el.removeAttribute("onclick")
  cart.push([product, qty * prices[product], qty])
  myStorage.setItem("cart", cart)
  cart = [myStorage["cart"].split(",")]
}
function buyNow(){
  let qty = document.getElementById("qty").value
  product = searchParams.get('product')
  myStorage.setItem("check-out", [product, qty * prices[product], qty])
  location.href = "buyPage.html"
}
function buyPage(){
  prod = myStorage["check-out"].split(",")
  document.getElementById("Cimg").style.width = "50%"
  document.getElementById("Cimg").src = "toasters/" + prod[0] +".jpg"
  document.getElementById("Cprod").style.float = "right"
  document.getElementById("Cprod").innerHTML = prod[0];
  document.getElementById("Cprice").innerHTML = "$" + prod[1];
  document.getElementById("Cqty").innerHTML = "Qty: " + prod[2];
  document.getElementById("Cb").innerHTML = "Check Out: total price = $" + prod[1];
}
function checkOutPage(){
  cart = myStorage["cart"]
  if (cart === undefined){
    myStorage.clear()
    location.href = "index.html"
  }
  totalCost = 0
  cart = myStorage["cart"].split(',')
  cart = chunkArrayInGroups(cart, 3)
  for (i = 0; i < cart.length; i++){
    var div = document.createElement('div');
      div.setAttribute('class', 'flex-2');
    var html = [
      '<div><img id="Cimg" src="toasters/' + cart[i][0] + '.jpg" style="width: 50%;"></div>',
      '<div><h2 id="Cprod" style="float: right;">' + cart[i][0] +'</h2></div>',
      '<div><h2 id="Cprice">$ ' + cart[i][1] +'</h2></div>',
      '<div><h2 id="Cqty">Qty: ' + cart[i][2] +'</h2></div>'
    ].join('');
      div.innerHTML = html;
      document.getElementById('child').appendChild(div);
      totalCost += parseFloat(cart[i][1])
  }
  var div = document.createElement('div');
  div.setAttribute('class', 'flex-2-2');
  div.innerHTML = '<div><a><button onclick="home()" id="Cb">Check Out: total price = $' + totalCost.toFixed(2) + '</button></a></div>'
  document.getElementById('child').appendChild(div);
}
function chunkArrayInGroups(arr, size) {
  var myArray = [];
  for(var i = 0; i < arr.length; i += size) {
    myArray.push(arr.slice(i, i+size));
  }
  return myArray;
}
function home(){
  if (totalCost === undefined){
    alert("transaction complete total cost $" + prod[1])
  }else{
    alert("transaction complete total cost $" + totalCost.toFixed(2))
  }
  myStorage.clear()
  location.href = "index.html"
}
function clearStorage(){
  myStorage.clear()
}
const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

function showSpinner(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

function hideSpinner(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}
const btn_group = document.querySelectorAll(".btn-group label");
const filters = document.querySelectorAll(".col input");
const buscador = document.querySelector("#buscar");




document.addEventListener("DOMContentLoaded", function() {

  let usuario = localStorage.getItem("user");
  let contraseña = localStorage.getItem("pass");

  if (usuario == undefined || contraseña == undefined) {
    location.href = "login.html"
  }


const subMenuTema = document.querySelector("#subMenu");

subMenuTema.innerHTML = `<li><button id="btnColor" class=" m-1 switch"><span><i class="fas fa-sun"></i></span>
<span><i class="fas fa-moon"></i></span></button><li>
<li><a class ="nav-link" href="my-profile.html" > Perfil </a> </li>
<li><a class ="nav-link" href="cart.html" >Mi carrito</a> </li>
<li> <a class="nav-link" href="login.html" id="cerrar"></a></li>
`

  const sub_menu = document.querySelector("#sub_menu");

  sub_menu.innerHTML = ` <li> <a class="nav-link" href="products.html" id="autos">Autos</a></li>
  <li> <a class="nav-link" href="products.html" id="juguetes">Juguetes</a></li>
  <li> <a class="nav-link" href="" id="muebles">Muebles</a></li>
  <li> <a class="nav-link" href="#" id="2">Herramientas</a></li>
  <li> <a class="nav-link" href="#" id="2">Computadoras</a></li>
  <li> <a class="nav-link" href="#" id="2">Vestimenta</a></li>
  <li> <a class="nav-link" href="#" id="2">Electrodomestico</a></li>
  <li> <a class="nav-link" href="#" id="2">Deporte</a></li>
  <li> <a class="nav-link" href="#" id="2">Celulares</a></li>
  `
  

  document.getElementById("perfil").innerHTML = usuario;
  
  document.getElementById("cerrar").innerText = "Cerrar Sesion";

  /*** DARK ***/
  const body = document.querySelector("body");
  const cards = document.querySelectorAll(".card");




const btnSwitch = document.querySelector('#btnColor');

btnSwitch.addEventListener('click', () => {
	body.classList.toggle('dark');
  cards.forEach(card =>{
    card.classList.toggle("dark");
  })



  btn_group.forEach(btn =>{
    btn.classList.toggle("darkBtn")
  })

  filters.forEach(filt=>{
    filt.classList.toggle("darkBtn")
  })

  // buscador.classList.toggle("darkBuscar");

	btnSwitch.classList.toggle('active');

	// Guardamos el modo en localstorage.
	if(document.body.classList.contains('dark')){
    localStorage.setItem('dark-mode', 'true');
	} else {
    localStorage.setItem('dark-mode', 'false');
	}
});

// Obtenemos el modo actual.
if(localStorage.getItem('dark-mode') === 'true'){
  document.body.classList.add('dark');
  cards.forEach(card =>{
    card.classList.toggle("dark");
  })
  btn_group.forEach(btn =>{
    btn.classList.toggle("darkBtn")
  })

  filters.forEach(filt=>{
    filt.classList.toggle("darkBtn")
  })


  // buscador.classList.toggle("darkBuscar");


	btnSwitch.classList.add('active');
} else {
	document.body.classList.remove('dark');
  cards.forEach(card =>{
    card.classList.remove("dark");
  })
  btn_group.forEach(btn =>{
    btn.classList.remove("darkBtn")
  })
  filters.forEach(filt=>{
    filt.classList.remove("darkBtn")
  })


  // buscador.classList.remove("darkBuscar");


	btnSwitch.classList.remove('active');
}


})
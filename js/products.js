//array donde se cargarán los datos recibidos:
let categoriesArray = [];
//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showCategoriesList(array){
    let htmlContentToAppend = "";
    for(let i = 0; i < array.products.length; i++){ 
        let list = array.products[i];
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + list.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ list.name + ` - ` + list.currency + ` `+ list.cost +`</h4> 
                        <p> `+ list.description +`</p> 
                        </div>
                        <small class="text-muted">` + list.soldCount + ` vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById("container-products").innerHTML = htmlContentToAppend;
    }
}
//FILTRAR
function filtrar() {
    let min = parseInt(document.getElementById("rangeFilterCountMin").value);
    let max = parseInt(document.getElementById("rangeFilterCountMax").value);
    
    let filtrado = categoriesArray.products.filter( producto => producto.cost >= min && producto.cost <= max);
    mostrar(filtrado);
}

function mostrar(categorias) {
    let productos = "";
    for ( let produ of categorias) {
        productos += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + produ.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ produ.name + ` - ` + produ.currency + ` `+ produ.cost +`</h4> 
                        <p> `+ produ.description +`</p> 
                        </div>
                        <small class="text-muted">` + produ.soldCount + ` vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
    }
    document.getElementById("container-products").innerHTML = productos;
}


//ORDENAR
function ordenarMayor(array) { 
        array.products.sort((a, b) => {
            if (a.cost < b.cost){
                return -1
            }else if(a.cost > b.cost) {
                return 1
            }else {
                return 0;
            }
        }) ;
        showCategoriesList(array);
    } 

  function ordenarMenor(array){
        array.products.sort((a, b) => {
            if (a.cost > b.cost){
                return -1
            }else if(a.cost < b.cost) {
                return 1
            }else {
                return 0;
            }
        }) ;
        showCategoriesList(array);
  }

  function ordenarPorRelevancia(array) { 
        array.products.sort((a, b) => {
            if (a.soldCount < b.soldCount){
                return -1
            }else if(a.soldCount > b.soldCount) {
                return 1
            }else {
                return 0;
            }
        }) ;
        showCategoriesList(array);
    } 
/* 
EJECUCIÓN:

-Al cargar la página se llama a getJSONData() pasándole por parámetro la dirección para obtener el listado.
-Se verifica el estado del objeto que devuelve, y, si es correcto, se cargan los datos en categoriesArray.
-Por último, se llama a showCategoriesList() pasándole por parámetro categoriesArray.

*/

document.addEventListener("DOMContentLoaded", function(e){
    let id = localStorage.getItem("catID");
    getJSONData(PRODUCTS_URL + id +".json").then(function(resultObj){
        if (resultObj.status === "ok")
        {
            categoriesArray = resultObj.data;
            showCategoriesList(categoriesArray);
        }
    });
    
    document.getElementById("sortAsc").addEventListener("click", function(){
        // ordenar(ORDER_ASC_BY_COUNT);
        ordenarMayor(categoriesArray)
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        ordenarMenor(categoriesArray)
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        ordenarPorRelevancia(categoriesArray)
    });

    document.getElementById("rangeFilterCount").addEventListener("click", () =>{
        filtrar();
    });
    mostrar(categoriesArray);
});


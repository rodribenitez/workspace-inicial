function setProductID(id) {
    localStorage.setItem("productoID", id);
    window.location = "product-info.html"
}


//array donde se cargarán los datos recibidos:
let categoriesArray = [];
//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM

function showCategoriesList(array){
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let list = array[i];
        htmlContentToAppend += `
        <div onclick =setProductID(${list.id}) class="list-group-item list-group-item-action cursor-active product-hover">
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

//BUSCAR
function buscar(e) {
    let divFiltrado = document.getElementById("filtrado");
    let produc = categoriesArray.products.filter(a => a.name.toUpperCase().includes(e) || a.description.toUpperCase().includes(e));

    divFiltrado.innerHTML = "";
    produc.forEach(list => {
        divFiltrado.innerHTML += `<div onclick = setProductID(${list.id}) class="list-group-item list-group-item-action invertir">
        <div >
            <div class="col-3">
                <img src="` + list.image + `" alt="product image" class="img-thumbnail">
            </div>
            <h4>`+ list.name + ` - ` + list.currency + ` `+ list.cost +`</h4>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <div class="mb-1">
                    <p> `+ list.description +`</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
    if( e === ""){
        divFiltrado.innerHTML = ""
    }
    });
}


//FILTRAR
function filtrar() {
    let min = parseInt(document.getElementById("rangeFilterCountMin").value);
    let max = parseInt(document.getElementById("rangeFilterCountMax").value);

    let filtrado = categoriesArray.products.filter( producto => producto.cost >= min && producto.cost <= max);
    showCategoriesList(filtrado);
}

/* Limpiar */
function limpiarFiltrado(arry) {
    showCategoriesList(arry.products);
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
        showCategoriesList(array.products);
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
        showCategoriesList(array.products);
  }

  function ordenarPorRelevancia(array) {
        array.products.sort((a, b) => {
            if (a.soldCount > b.soldCount){
                return -1
            }else if(a.soldCount < b.soldCount) {
                return 1
            }else {
                return 0;
            }
        }) ;
        showCategoriesList(array.products);
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
            let arrlist = categoriesArray.products;
            showCategoriesList(arrlist);

            const nombreProducto = document.getElementById("nameProduct");
            nombreProducto.innerText = categoriesArray.catName;

        }
    });

    const buscador = document.getElementById("buscar")
    buscador.addEventListener("input" , () =>{
        let texto = buscador.value.toUpperCase();
            buscar(texto);
    } )
    
    document.getElementById("sortAsc").addEventListener("click", function(){

        ordenarMayor(categoriesArray)
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        ordenarMenor(categoriesArray)
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        ordenarPorRelevancia(categoriesArray)
    });


    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        limpiarFiltrado(categoriesArray);
    });
    document.getElementById("rangeFilterCount").addEventListener("click", () =>{
        filtrar();
    });
    showCategoriesList(categoriesArray);
});


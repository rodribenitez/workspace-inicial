let categoriesArray = [];
//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showProductsInfo(array){
    let htmlContentToAppend = "";
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + array.images + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ array.name + ` - ` + array.currency + ` `+ array.cost +`</h4> 
                        <p> `+ array.description +`</p> 
                        </div>
                        <small class="text-muted">` + array.soldCount + ` vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById("container-product-info").innerHTML = htmlContentToAppend;
    }





document.addEventListener("DOMContentLoaded", function(e){
    let id = localStorage.getItem("productoID");
    getJSONData(PRODUCT_INFO_URL + id +".json").then(function(resultObj){
        if (resultObj.status === "ok")
        {
            categoriesArray = resultObj.data;
            showProductsInfo(categoriesArray);
            console.log(categoriesArray);
        }
    });
});

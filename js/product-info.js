let categoriesArray = [];
//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showProductsInfo(array){
    let htmlContentToAppend = "";
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-2">
                        <h4>`+ array.name + ` - ` + array.currency + ` `+ array.cost +`</h4> 
                        <p> `+ array.description +`</p> 
                        </div>
                    </div>
                    <div class="">
                    <img src="` + array.images[0] + `" alt="product image" class="img-thumbnail">
                    <img src="` + array.images[1] + `" alt="product image" class="img-thumbnail">
                    <img src="` + array.images[2] + `" alt="product image" class="img-thumbnail">
                    <img src="` + array.images[3] + `" alt="product image" class="img-thumbnail">
                </div>
                </div>
            </div>
        </div>
        <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ array.relatedProducts[0].name +`</h4> 
                        <img src="` + array.relatedProducts[0].image + `" alt="product image" class="img-thumbnail">
                        </div>
                    </div>
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ array.relatedProducts[1].name +`</h4> 
                        <img src="` + array.relatedProducts[1].image + `" alt="product image" class="img-thumbnail">
                        </div>
                    </div>
        `
        console.log(array.relatedProducts);
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

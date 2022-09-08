let categoriesArray = [];
//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showProductsInfo(array){
    let htmlContentToAppend = "";
        htmlContentToAppend += `
        <h1 class"mb-3 mt-5"> `+ array.name + ` </h1>
        <hr>
        <div class "row list-group-item p-1">
            <div class="row">
            <h3> Precio: </h3>
            <p> ` + array.currency + ` `+ array.cost +` </p>
            <h3> Descripcion: </h3>
            <p> ` + array.description+ ` </p>
            <h3> Categoria: </h3>
            <p> ` + array.category + ` </p>
            <h3> Cantidad de vendidos : </h3>
            <p> ` + array.soldCount + ` </p>
        </div>
            <div class = "row justify-content-md-center mb-5 mt-5 ">
            <h3 class = "mb-2"> Imagenes ilustrativas :  </h3>
                <div class="row">
                <div class ="col-3">
                    <img src="` + array.images[0] + `" alt="product image" class="img-thumbnail">
                </div>
                <div class = "col">
                    <img src="` + array.images[1] + `" alt="product image" class="img-thumbnail">               
                </div>
                <div class = "col">
                    <img src="` + array.images[2] + `" alt="product image" class="img-thumbnail">
                </div>
                <div class = "col">
                    <img src="` + array.images[3] + `" alt="product image" class="img-thumbnail">
                </div>
                </div>
            </div>
        <div class"mb-5 mt-3 ">
                <h3>Comentarios: </h3>
                <div id= "comentarios">
                </div>
                <div id ="comentarios-usuario"></div>
                </div>
        `
        document.getElementById("container-product-info").innerHTML = htmlContentToAppend;
    }


    // <div class="d-flex w-100 justify-content-between">
    //             <div class="mb-1">
    //             <h4>`+ array.relatedProducts[0].name +`</h4> 
    //             <img src="` + array.relatedProducts[0].image + `" alt="product image" class="img-thumbnail">
    //             </div>
    //         </div>
    //         <div class="d-flex w-100 justify-content-between">
    //             <div class="mb-1">
    //             <h4>`+ array.relatedProducts[1].name +`</h4> 
    //             <img src="` + array.relatedProducts[1].image + `" alt="product image" class="img-thumbnail">
    //             </div>
    //         </div>


function getComment(arrayComent){
    console.log(arrayComent);
    let comentAppend = "";
         for (let i = 0; i < arrayComent.length; i++) {
            comentAppend += ` <div class = " list-group-item w-50">
            <div class = "d-flex ">
            <h6> <span> `+ arrayComent[i].user+` </span> - ` + arrayComent[i].dateTime+ ` - `+ estrellas(arrayComent[i].score)+` </h6>    
            </div>` + arrayComent[i].description+` </div>
                `
                document.getElementById("comentarios").innerHTML = comentAppend;
        } 
}


function estrellas(valor) {
    console.log(valor);
    stars = "";
    if (valor == 5) {
        stars +=`<i class = "fa fa-star checked"></i>
        <i class = "fa fa-star checked"></i>
        <i class = "fa fa-star checked"></i>
        <i class = "fa fa-star checked"></i>
        <i class = "fa fa-star checked"></i>`    
    }
    if (valor == 4) {
        stars +=`<i class = "fa fa-star checked"></i>
        <i class = "fa fa-star checked"></i>
        <i class = "fa fa-star checked"></i>
        <i class = "fa fa-star checked"></i>
        <i class = "fa fa-star"></i>
        `
        }
    if (valor == 3) {
    stars +=`<i class = "fa fa-star checked"></i>
    <i class = "fa fa-star checked"></i>
    <i class = "fa fa-star checked"></i>
    <i class = "fa fa-star"></i>
    <i class = "fa fa-star"></i>
    `
    }
    if (valor == 2) {
        stars +=`<i class = "fa fa-star checked"></i>
        <i class = "fa fa-star checked"></i>
        <i class = "fa fa-star"></i>
        <i class = "fa fa-star"></i>
        <i class = "fa fa-star ></i>
        `
        }

    if (valor == 1) {
            stars +=`<i class = "fa fa-star checked"></i>
            <i class = "fa fa-star "></i>
            <i class = "fa fa-star "></i>
            <i class = "fa fa-star "></i>
            <i class = "fa fa-star "></i>
            `
            }
    
    return stars
}


function enviarComentario(text,usuario,valor) {   
    let fechaActual = new Date();
    let hora = fechaActual.getHours() ;
    let minutos = fechaActual.getMinutes();
    let segundos = fechaActual.getSeconds();
    let dia = fechaActual.getDate();
    let mes = fechaActual.getMonth() + 1;
    let anio = fechaActual.getFullYear();

    datosComentario = {
        product : "",
        score : "",
        description : "",
        user : "",
        dateTime: "",
    }
    datosComentario.product = JSON.parse(localStorage.getItem("productID"));
    datosComentario.score = valor;
    datosComentario.description = text;
    datosComentario.user = usuario;
    datosComentario.dateTime = anio+"-"+mes+"-"+dia +" "+ hora+":"+minutos +":"+segundos;
    

        let comentAppend = "";
            comentAppend += ` <div class = " list-group-item w-50">
            <div class = "d-flex ">
            <h6> <span> `+ datosComentario.user+ ` </span> - `+datosComentario.dateTime +` - `+ datosComentario.score +`</h6>    
          </div>` + datosComentario.description +` </div>
            `
            document.getElementById("comentarios-usuario").innerHTML += comentAppend;
           
    }



document.addEventListener("DOMContentLoaded", function(e){


    const textoComentario = document.querySelector("#textComentario");
    const btnEnviarComentario = document.getElementById("envio_comentario");


    let id = localStorage.getItem("productoID");
    getJSONData(PRODUCT_INFO_URL + id +".json").then(function(resultObj){
        if (resultObj.status === "ok"){
            categoriesArray = resultObj.data;
            showProductsInfo(categoriesArray);
            }

    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL + id +".json").then(function(resultObj){
        if (resultObj.status === "ok"){
            comentarios = resultObj.data;
            localStorage.setItem("comentariosProductos", JSON.stringify(comentarios));
            getComment(comentarios);
            }
    });

    //**Enviar Comentario**/

    btnEnviarComentario.addEventListener('click', ()=>{
        const opciones = document.getElementById("valoraciones").value;  
        let usuario = localStorage.getItem("user");
        enviarComentario(textoComentario.value,usuario,estrellas(opciones));
        textoComentario.value = ""; 
    });
});

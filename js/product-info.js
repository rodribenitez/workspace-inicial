let categoriesArray = [];
//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showProductsInfo(array){
    let htmlContentToAppend = "";
        htmlContentToAppend += `
        <div class = "d-flex justify-content-between">
            <h1 class"mb-3 mt-5"> `+ array.name + ` </h1>
            <button type ="button" class="w-20 p-3 btn-success"> Comprar </button>
        </div>
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
    let comentAppend = "";
         for (let i = 0; i < arrayComent.length; i++) {
            comentAppend += ` <div class = " list-group-item w-50">
            <div class = "d-flex">
            <p> <h6 class = "fw-bold"> `+ arrayComent[i].user+` </h6> - ` + arrayComent[i].dateTime+ ` - `+ estrellas(arrayComent[i].score)+` </p>    
            </div>` + arrayComent[i].description+` </div>
                `
                document.getElementById("comentarios").innerHTML = comentAppend;
        } 
}

function estrellas (valor){
    stars = "";
    for (let i = 1; i <= 5; i++){
        if (i <= valor) {
            stars += '<i class="fas fa-star checked" ></i>';
        } else{
            stars += '<i class="far fa-star checked" ></i>';
        }
    }
    return stars
}

function fechaActual() {
    let fechaActual = new Date();
    let hora = fechaActual.getHours() ;
    let minutos = fechaActual.getMinutes();
    let segundos = fechaActual.getSeconds();
    let dia = fechaActual.getDate();
    let mes = fechaActual.getMonth() + 1;
    let anio = fechaActual.getFullYear();

    if(dia < 10){
        dia = "0"+ dia;
    }

    if(mes < 10){
        mes = "0"+ mes;
    }

    if(hora < 10){
        hora = "0"+ hora;
    }
    if(minutos < 10){
        minutos = "0"+ minutos;
    }
    if(segundos < 10){
        segundos = "0"+ segundos;
    }

    return anio+"-"+mes+"-"+dia +" "+ hora+":"+minutos +":"+segundos
}


function enviarComentario(text,usuario,valor) {   
    
    datosComentario = {
        product : 0,
        score : "",
        description : "",
        user : "",
        dateTime: "",
    }
    datosComentario.product = localStorage.getItem("productoID") ;
    datosComentario.score = valor;
    datosComentario.description = text;
    datosComentario.user = usuario;
    datosComentario.dateTime = fechaActual();
    

        let comentAppend = "";
            comentAppend += ` <div class = " list-group-item w-50">
            <div class = "d-flex ">
            <p> <h6 class = "fw-bold"> `+ datosComentario.user +` </h6> - ` + datosComentario.dateTime +` - `+ datosComentario.score +`</p>    
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

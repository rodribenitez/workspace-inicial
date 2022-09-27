let categoriesArray = [];
let userComent = JSON.parse(localStorage.getItem("newComent"));
function setProductID(id) {
    localStorage.setItem("productoID", id);
    window.location = "product-info.html"
}
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
            <div class = "row justify-content-md-center mb-4 mt-4 ">
            <h3 class = "mb-2"> Imagenes ilustrativas :  </h3>
                <div class="row">
                    <div class = "d-flex">
                    `+ mostrarImagenes(array.images) + `
                    </div>             
            </div>
        <div class"mb-2 mt-2">
                <h3>Comentarios: </h3>
                <div id= "comentarios">
                </div>
                <div class = "flex-column ">
                    <h3 class="mt-3"> Comentar</h3>
                    <p> Tu opinion:</p>
                    <textarea name="nameComentario" id="textComentario" cols="30" rows="3" placeholder = "Agrega tu comentario..."></textarea>
                    </div>
            <div class =" d-flex">
                <h6 class="mx-2"> Tu puntuacion</h6>
                    <select class="ml-1" id = "valoraciones">
                        <option class="opciones" value="1">1</option>
                        <option class="opciones" value="2">2</option>
                        <option class="opciones" value="3">3</option>
                        <option class="opciones" value="4">4</option>
                        <option class="opciones" value="5">5</option>
                </select>
                </div>
                <div class="w-50 flex-row">
                    <button onclick = enviarComentario() class="btn btn-primary w-auto" id="envioComentario"> Enviar </button>
                </div>

                <hr>
    <h3> Productos relacionados</h3>
        <div class = "d-flex w-50">
        <div onclick =setProductID(${array.relatedProducts[0].id})  class="d-flex w-100 justify-content-between m-2">
            <div class="mb-1">
                <img src="` + array.relatedProducts[0].image + `" alt="product image" class="img-thumbnail">
                <h4>`+ array.relatedProducts[0].name +`</h4> 
            </div>
        </div>
    <div onclick =setProductID(${array.relatedProducts[1].id}) class="d-flex w-100 justify-content-between m-2">
        <div class="mb-1">
        <img src="` + array.relatedProducts[1].image + `" alt="product image" class="img-thumbnail">
        <h4>`+ array.relatedProducts[1].name +`</h4> 
        </div>
    </div>
        </div>
       
        `
        document.getElementById("container-product-info").innerHTML = htmlContentToAppend;
    }





function getComment(arrayComent){
    let productoID = JSON.parse(localStorage.getItem("productoID"));
    let comentAppend = "";
         for (let i = 0; i < arrayComent.length; i++) {
            if (arrayComent[i].product ===  productoID) {
                comentAppend += ` <div class = "list-group-item w-50 divDark">
                <div class = "d-flex">
                <div id="eliminar"></div>
                <p> <h6 class = "fw-bold"> `+ arrayComent[i].user+` </h6> - ` + arrayComent[i].dateTime+ ` - `+ estrellas(arrayComent[i].score)+` </p>    
                </div> <div class = "d-flex justify-content-between">`  + arrayComent[i].description  + mostrarBtn(arrayComent[i].user)+ `</div></div>  
                `
                document.getElementById("comentarios").innerHTML = comentAppend;
            }
        }
}

function mostrarImagenes(img) {
    let imagenes = "";
    for (let i = 0; i < img.length; i++) {

      imagenes += ` <div class="m-2" ><img src="` + img[i] + `" alt="product image" class="img-thumbnail"> </div>`
    }
    return imagenes
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

function mostrarBtn(getUser) {

    let currentUser = localStorage.getItem("user")
    btn = "";

    if (getUser === currentUser) {
        btn += `<button type="button" class ="btn btn-danger btn-sm m-0 w-auto"> Eliminar</button>`;
    }
    return btn   
}
function enviarComentario() {

    const textoComentario = document.getElementById("textComentario");
    const opciones = document.getElementById("valoraciones").value;
    let usuario = localStorage.getItem("user");
    
    datosComentario = {
        product : 0,
        score : "",
        description : "",
        user : "",
        dateTime: "",
    }
    if (textoComentario.value != "") {
        datosComentario.product = JSON.parse(localStorage.getItem("productoID")) ;
        datosComentario.score = JSON.parse(opciones);
        datosComentario.description = textoComentario.value;
        datosComentario.user = usuario;
        datosComentario.dateTime = fechaActual();
    
        userComent.push(datosComentario);
        localStorage.setItem("newComent", JSON.stringify(userComent));
        textoComentario.value = "";
    } else{
        alert("Ingresa un comentario")
    }
}

document.addEventListener("DOMContentLoaded", function(e){
    const btnEnviarComentario = document.getElementById("envioComentario");
    
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
            if(userComent!=null){
                comentarios = comentarios.concat(userComent);
            }else{
                userComent=[];
            }
            localStorage.setItem("comentariosProductos", JSON.stringify(comentarios));
            console.log(comentarios);
            getComment(comentarios);
            }
    });
    getComment(comentarios)
});

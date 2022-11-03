let productsCarrito = JSON.parse(localStorage.getItem("newProductCart"));

let table = document.getElementById("cart");

let envio = document.getElementsByName('envio');


let borro = document.getElementsByName('borrar');



function showCarts(array){

    for (let i = 0; i < array.length; i++) {
        let products = array[i];
        table.innerHTML += `<tr class ="border-top">
        <td><img src =" ${products.image}" class="img-thumbnail w-25"></td>
        <td> ${products.name} </td>
        <td class='precio'>${products.unitCost} </td>
        <td class="w-25"><input id="cant" type ="number" value ="1" class="w-25" min= "1" onchange='sumatoria()' ></td>
        <td  > ${products.currency} <span class ="subTotal"> ${products.unitCost} </span> </td>
        <td><img src="img/eliminar.png" name="borrar" width=30 onclick = "eliminar()">   </td>
        </tr>`

        
        // precioTotal = products.unitCost;
        
        // document.getElementById("productCostText").innerText = "USD "+products.unitCost;
        // document.getElementById("totalCostText").innerText = "USD "+(precioTotal) ;

        // let preciototal = document.getElementById("subTotal");
        // let valor = document.getElementById("cant");

        // valor.addEventListener("change", (e)=>{
        //     let multiplicacion = 0;

        //     multiplicacion = preciototal.textContent * valor.value;

        //     preciototal.innerText = multiplicacion;
        // } );
}
    sumatoria();
    for (let i=0; i< borro.length; i++){
        borro[i].addEventListener('click',()=>{
            eliminar(i);
        })
       
    }
}

function eliminar(posicion){
    productsCarrito.splice(posicion,1);
    localStorage.setItem("newProductCart", JSON.stringify(productsCarrito))
    showCarts(productsCarrito)
}


function sumatoria() {
    let precios = document.getElementsByClassName('precio'); //Array de TD con los precios

    let cantidades = document.getElementsByTagName ('input');//Array de input. Por lo tanto, tengo las cantidades

    let subtotales = document.getElementsByClassName('subTotal');
    let total = 0;
    let subtotal=0;

    for (let i=0; i< precios.length; i++){

        total+= parseFloat(precios[i].innerHTML);
      
        subtotal+= parseFloat(precios[i].innerHTML) * parseFloat(cantidades[i].value);
        subtotales[i].innerHTML=parseFloat(precios[i].innerHTML) * parseFloat(cantidades[i].value);
    }
    costoEnvio =0;


    for (let x=0; x< envio.length; x++){
        if (envio[x].checked){
            costoEnvio = subtotal * parseFloat(envio[x].value);
        }

    }


    document.getElementById('productCostText').innerHTML= "USD " + parseInt((subtotal).toFixed(2));
    document.getElementById('comissionText').innerHTML= "USD " + parseInt((costoEnvio).toFixed(2));
    document.getElementById('totalCostText').innerHTML= "USD "+ parseInt(subtotal + costoEnvio);
}

// inputs 

const inputs = document.querySelectorAll("input");


const tipoCredito = document.getElementById("credito");
const tipoBancario = document.getElementById("transferencia");

const numeroTarjeta = document.getElementById("numeroTarjeta");
const codigoSeguridad = document.getElementById("codigoSeguridad");
const vencimiento = document.getElementById("vencimiento");
const numeroCuenta= document.getElementById("inputBancario")

const calle = document.getElementById("calle");
const numeroCalle = document.getElementById("numeroCalle");
const esquina = document.getElementById("esquina")

function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
}

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
} ;




function validar() {

    if ((calle.value !== "" && esquina.value !== "" && numeroCalle.value !== "") && (tipoCredito.checked || tipoBancario.checked)) {
        showAlertSuccess();
        calle.value = "";
        numeroCalle.value = "";
        esquina.value = "";
        
        tipoCredito.checked = false;
        numeroTarjeta.value="";
        numeroTarjeta.disabled = false;

        codigoSeguridad.value="";
        codigoSeguridad.disabled=false;

        vencimiento.value="";
        vencimiento.disabled=false;

        tipoBancario.checked= false;

        numeroCuenta.value="";
        numeroCuenta.disabled = false;

        document.getElementById("tipoDePago").innerText= "No ha seleccionado";
        document.getElementById("tipoDePago").style.color = "black";


        calle.classList.remove("is-invalid");
        esquina.classList.remove("is-invalid");
        numeroCalle.classList.remove("is-invalid");

        inputs.forEach(input =>{
            
                input.classList.remove("is-valid");
            })
        

    } else{
        showAlertError();
        document.getElementById("tipoDePago").style.color = "red"
        calle.classList.toggle("is-invalid");
        esquina.classList.toggle("is-invalid");
        numeroCalle.classList.toggle("is-invalid");
    }



    // if (calle.value === "" || esquina.value === "" || numeroCalle.value === "" || numeroTarjeta.value === "" || codigoSeguridad.value ==="" || vencimiento.value ==="" ) {
    //     calle.classList.toggle("is-invalid");
    //     esquina.classList.toggle("is-invalid");
    //     numeroCalle.classList.toggle("is-invalid")
    // } 
    //     if (tipoCredito.checked) {
    //         if (numeroTarjeta.value === "" || codigoSeguridad.value === "" || vencimiento.value === "" ) {
    //             alert("Debe selecionar una forma de pago");
    //             // numeroTarjeta.classList.toggle("is-invalid");
    //             // codigoSeguridad.classList.toggle("is-invalid");
    //             // vencimiento.classList.toggle("is-invalid");

                
    //         } else{
                
    //             showAlertSuccess();
    //             calle.value = "";
    //             numeroCalle.value = "";
    //             esquina.value = "";
    //         }
    //     } else{
    //         document.getElementById("tipoDePago").style.color = "red"
    //     }
    }





tipoCredito.addEventListener("click",()=>{
    document.getElementById("inputBancario").disabled = true;
    numeroTarjeta.disabled = false;
    codigoSeguridad.disabled = false;
    vencimiento.disabled = false;
    
    if (document.getElementById("tipoDePago").style.color = "red") {
        
        document.getElementById("tipoDePago").innerText= "Tarjeta de Credito"
        document.getElementById("tipoDePago").style.color = "black"
    }
    
})

tipoBancario.addEventListener("click",()=>{
    numeroTarjeta.disabled = true;
    codigoSeguridad.disabled = true;
    vencimiento.disabled = true;

    document.getElementById("inputBancario").disabled = false;

    document.getElementById("tipoDePago").innerText= "Transferencia Bancaria"
    }
)



document.addEventListener("DOMContentLoaded", function(e){


    getJSONData(CART_INFO_URL + "25801.json").then(function(resultObj){
        if (resultObj.status === "ok")
        {
            carts = resultObj.data;
            // console.log(carts.articles[0]);
            showCarts(carts.articles);
            if (productsCarrito != null) {
                showCarts(productsCarrito);
            } else {
                productsCarrito = [];
                // productsCarrito.push(carts.articles[0])
                localStorage.setItem("newProductCart", JSON.stringify(productsCarrito))
            }
                // showCarts(productsCarrito);
        }
    });


    for (let i=0; i< envio.length; i++){
        envio[i].addEventListener('click',()=>{
            sumatoria();
        })
       
    }   
    inputs.forEach(input =>{
        input.addEventListener("change", ()=>{
            input.classList.toggle("is-valid");
        })
    })

    document.getElementById("btnComprar").addEventListener("click",() =>{
        validar();
        
    })
});
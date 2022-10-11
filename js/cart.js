let productsCarrito = JSON.parse(localStorage.getItem("newProductCart"));

let table = document.getElementById("cart");

function showCarts(array){
    console.log(array);
    for (let i = 0; i < array.length; i++) {
        let products = array[i];
        table.innerHTML += `<tr class ="border-top">
        <td><img src =" ${products.image}" class="img-thumbnail w-25"></td>
        <td> ${products.name} </td>
        <td> ${products.currency} ${products.unitCost} </td>
        <td class="w-25"><input id="cant" type ="number" value ="1" class="w-25" min= "1" ></td>
        <td> ${products.currency} <span id="subTotal"> ${products.unitCost} </span> </td>
        
        </tr>`

        let preciototal = document.getElementById("subTotal");
        let valor = document.getElementById("cant");


        valor.addEventListener("change", (e)=>{
            let multiplicacion = 0;

            multiplicacion = preciototal.textContent * valor.value;

            preciototal.innerText = multiplicacion;

        } );
}}


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL + "25801.json").then(function(resultObj){
        if (resultObj.status === "ok")
        {
            carts = resultObj.data;
            console.log(carts);
            showCarts(carts.articles);
        }
    });

    if (productsCarrito != null) {
        showCarts(productsCarrito);
    } else {
        productsCarrito = [];
        localStorage.setItem("newProductCart", JSON.stringify(productsCarrito))
    }


});
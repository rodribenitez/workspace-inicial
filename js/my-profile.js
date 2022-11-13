let usuario = localStorage.getItem("user");
let userDates = JSON.parse(localStorage.getItem("datosDelUsuario"))



function showDates(array) {
             for (let i = 0; i < array.length; i++) {
                if (array[i].datoEmail ===  usuario) {
                        document.getElementById("nombre").value = array[i].datoNombre;
                        document.getElementById("segundoNombre").value = array[i].datoSegundoNombre;
                        document.getElementById("apellido").value = array[i].datoApellido;
                        document.getElementById("segundoApellido").value = array[i].datoSegundoApellido;
                        document.getElementById("email").value = array[i].datoEmail;
                        document.getElementById("telefono").value = array[i].datoTelefono;
                }
            }
}



document.addEventListener("DOMContentLoaded", ()=>{


document.getElementById("email").value = usuario
const form = document.getElementById("formulario");

if (userDates != null) {
        showDates(userDates)
} else{
        userDates = [];
}

form.addEventListener('submit', (event)=>{
        const nombre = document.getElementById("nombre").value;
        const segundoNombre = document.getElementById("segundoNombre").value;
        const apellido = document.getElementById("apellido").value;
        const segundoApellido = document.getElementById("segundoApellido").value;
        const email = document.getElementById("email").value;
        const telefono = document.getElementById("telefono").value;
        event.preventDefault();

let datosDelUsuario = {
        datoNombre : "",
        datoSegundoNombre : "",
        datoApellido : "",
        datoSegundoApellido : "",
        datoEmail : "",
        datoTelefono : "",
}


        if (nombre != "" && segundoNombre != "" && apellido != "" && segundoApellido != "" && email != "" && telefono != "") {
              datosDelUsuario.datoNombre = nombre;
              datosDelUsuario.datoSegundoNombre = segundoNombre;
              datosDelUsuario.datoApellido = apellido;
              datosDelUsuario.datoSegundoApellido = segundoApellido;
              datosDelUsuario.datoEmail = email;
              datosDelUsuario.datoTelefono = telefono;

              userDates.push(datosDelUsuario)
              localStorage.setItem("datosDelUsuario", JSON.stringify(userDates))
        
        }


})


})

function login (){

let correo = document.getElementById('email').value;
let contraseña = document.getElementById('contraseña').value;    


if ( correo === ""){

    correo.classList.add('is-invalid');
    document.getElementById("input-error-user").classList.toggle("warning-red");
} else {
    if (contraseña === ""){
        contraseña.classList.add("is-invalid");
        document.getElementById("input-error-pass").classList.toggle("warning-red");
    } else {
        localStorage.setItem('user',correo)
        localStorage.setItem('pass',contraseña);
        location.href = 'index.html';
    }
}    
}

document.addEventListener('DOMContentLoaded', ()=>{
    inicio.addEventListener('click',() =>{
        login();
    })
})


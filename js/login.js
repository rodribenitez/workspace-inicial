

function login (){

let usuario = document.getElementById('username');
let contraseña = document.getElementById('contraseña');    


if ( usuario.value === ""){

    usuario.classList.add('is-invalid');
    document.getElementById("input-error-user").classList.toggle("warning-red");
} else {
    if (contraseña.value === ""){
        contraseña.classList.add("is-invalid");
        document.getElementById("input-error-pass").classList.toggle("warning-red");
    } else {
        localStorage.setItem('user',usuario)
        localStorage.setItem('pass',contraseña);
        location.href = 'index.html';
    }
}    
}

document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('inicio').addEventListener('click',() =>{
        login();
    })
})


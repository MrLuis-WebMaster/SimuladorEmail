// variables
const BtnBlock = document.querySelector("#enviar");
const formulario = document.querySelector("#enviar-mail");
const resetBtn = document.querySelector("#resetBtn");
//variables de los campos 

const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");

const er =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/;

Eventos();
function Eventos () {

    document.addEventListener("DOMContentLoaded", IniciarApp);
    email.addEventListener("blur",ValidarFormulario);
    asunto.addEventListener("blur",ValidarFormulario);
    mensaje.addEventListener("blur",ValidarFormulario);
    resetBtn.addEventListener("click",ResetForm);
    formulario.addEventListener("submit",EnviarEmail);

}

//funciones

function IniciarApp () {
    BtnBlock.disabled = true;
    BtnBlock.classList.add("cursor-not-allowed","opacity-50");


}

// validacion de formulario
function ValidarFormulario (e) {
    if (e.target.value.length > 0) {

        //Elimina los mensajes de errores 
        const error = document.querySelector("p.error");
        if ( error !== null) {
            error.remove();
        }

        e.target.classList.remove("border","border-red-500");
        e.target.classList.add("border","border-green-500");
    } else {
        e.target.classList.remove("border","border-green-500");
        e.target.classList.add("border","border-red-500");
        const error = document.querySelectorAll(".error")
        MensajeError("todos los campos son obligatorios");
    }

    if (e.target.type === "email") {


        if (er.test(e.target.value)){
            const error = document.querySelector("p.error");
            if ( error !== null) {
                error.remove();
            } 

            e.target.classList.remove("border","border-red-500");
            e.target.classList.add("border","border-green-500");
        } else {
            e.target.classList.remove("border","border-green-500");
            e.target.classList.add("border","border-red-500");
            MensajeError("Email no valido");
        }
    }

    if (er.test(email.value) && asunto.value !=="" && mensaje.value !=="") {
        BtnBlock.disabled = false;
        BtnBlock.classList.remove("cursor-not-allowed","opacity-50");
    }

}

function MensajeError (mensaje) {
    const mensajeError = document.createElement("P");
    mensajeError.textContent = mensaje;
    mensajeError.classList.add("border","border-red-500","background-red-100","p-3","text-red-500","mt-5","error");
    const errores = document.querySelectorAll(".error");
    if (errores.length === 0){
        formulario.appendChild(mensajeError);
    }
}
// Spinner
function EnviarEmail (e) {
    e.preventDefault();

    const spinner = document.querySelector("#spinner");
    spinner.style.display = "flex";

    setTimeout(() => {
        spinner.style.display = "none";

        const p = document.createElement("p");
        p.textContent = "Enviado";
        p.classList.add("text-center","my-10","p-3","bg-green-500","text-white","font-bold", "uppercase");
        formulario.insertBefore(p,spinner);
        setTimeout(() => {
            p.remove();
            ResetForm();
        }, 2000);
    }, 3000 );

}
//resetear el formulario  

function ResetForm () {
    formulario.reset();
    IniciarApp();
}

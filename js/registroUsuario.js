import { token } from './token.js';
console.log(token)

document.getElementById("addUser").addEventListener("submit", function (e) {
    e.preventDefault();
    // var identificador = document.getElementById("dpi").value;
    var identificador = parseInt(document.getElementById("dpi").value, 10);
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var direccion = document.getElementById("direccion").value;
    var nit = document.getElementById("nit").value;
    var numeroTelefono = document.getElementById("numeroTelefono").value;
    var CorreoElectronico = document.getElementById("CorreoElectronico").value;
    var clave = document.getElementById("clave").value;
    const fechaInput = document.getElementById("fechanacimiento");
    var confirmarClave = document.getElementById("confirmarClave").value;

    var validacionCorreo = false;
    var validacionTelefono = false;
    var validarContrasenaSeguridad = false;
    var validarContrasenaIgualdad = false;

    const fechaEnFormatoISO = fechaInput.value;
    const partesFecha = fechaEnFormatoISO.split("-");
    var fechaFormateada = "";
    if (partesFecha.length === 3) {
        const anio = partesFecha[0];
        const mes = partesFecha[1];
        const dia = partesFecha[2];

        fechaFormateada = `${dia}/${mes}/${anio}`;
    }

    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(CorreoElectronico)) {
        validacionCorreo = true;
    } else {
        alert("Correo Electrónico no válido");
        validacionCorreo = false;
    }

    if (/^\d{8}$/i.test(numeroTelefono)) {
        validacionTelefono = true;
    } else {
        alert("Teléfono no válido");
        validacionTelefono = false;
    }
    console.log(clave);
    console.log(confirmarClave);
    if (clave.value !== confirmarClave.value) {
        alert("Contraseñas no coinciden");
        validarContrasenaIgualdad = false;
    } else {
        validarContrasenaIgualdad = true
    }

    function validarContrasena(contrasena) {
        const regexLength = /.{8,}/;
        const regexUppercase = /[A-Z]/;
        const regexLowercase = /[a-z]/;
        const regexNumber = /[0-9]/;
        const regexSpecialChar = /[^A-Za-z0-9]/;

        return (
            regexLength.test(contrasena) &&
            regexUppercase.test(contrasena) &&
            regexLowercase.test(contrasena) &&
            regexNumber.test(contrasena) &&
            regexSpecialChar.test(contrasena)
        );
    }

    validarContrasenaSeguridad = validarContrasena(clave);

    if (!validarContrasenaSeguridad) {
        alert("La contraseña debe cumplircon: Tener al menos 8 caracteres. Contener al menos una letra mayúscula. Contener al menos una letra minúscula. Incluir al menos un número. Contener al menos un carácter especial (por ejemplo, !, @, #, $, etc.).");
    }

    if (validacionCorreo && validacionTelefono && validarContrasenaIgualdad && validarContrasenaSeguridad) {
        var user = {
            "nombre": nombre,
            "apellido": apellido,
            "fechanacimiento": fechaFormateada,
            "direccion": direccion,
            "nit": nit,
            "numeroTelefono": numeroTelefono,
            "CorreoElectronico": CorreoElectronico,
            "clave": clave
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': `${token}`,
            },
            body: JSON.stringify(user),
            redirect: 'follow'
        };

        const identificadorInt = parseInt(identificador, 10);

        fetch(`https://apisproyecto.onrender.com/api/registro/${identificadorInt}`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    window.alert("No se pudo añadir al usuario");
                    throw new Error('Solicitud fallida');
                }
                return response.json();
            })
            .then(data => {
                window.alert("Registro exitoso");
            })
            .catch(error => {
                window.alert("Se produjo un error desconocido, por favor intente nuevamente.");
                console.error(error);
            });
    }
});
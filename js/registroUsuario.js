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

    var validacionCorreo = false;
    var validacionTelefono = false;

    const fechaEnFormatoISO = fechaInput.value;
    const partesFecha = fechaEnFormatoISO.split("-");
    var fechaFormateada = "";
    if (partesFecha.length === 3) {
        const anio = partesFecha[0];
        const mes = partesFecha[1];
        const dia = partesFecha[2];

        fechaFormateada = `${dia}/${mes}/${anio}`;

        console.log("Fecha formateada: " + fechaFormateada);
    }

    console.log(CorreoElectronico)
    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(CorreoElectronico)) {
        validacionCorreo = true;
    } else {
        alert("Correo Electrónico no válido");
        validacionCorreo = false;
    }

    console.log(numeroTelefono)
    if (/^\d{8}$/i.test(numeroTelefono)) {
        validacionTelefono = true;
    } else {
        alert("Teléfono no válido");
        validacionTelefono = false;
    }

    if (validacionCorreo == true && validacionTelefono == true) {
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
    
        if (token) {        
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
        } else {
            window.alert("Token no disponible, por favor inice sesion");
        }
    }
});
import { token } from './token.js';
console.log(token)

document.getElementById("addProduct").addEventListener("submit", function (e) {
    e.preventDefault();
    var identificador = document.getElementById("idProducto").value;
    var nombre = document.getElementById("nombreProducto").value;
    var marca = document.getElementById("marcaProducto").value;
    var disponibilidad = document.querySelector('input[name="estado"]:checked').value;
    var descuento = document.getElementById("descuentoProducto").value;
    var preciodescuento = document.getElementById("precioDescuentoProducto").value;
    //    var imagen = document.getElementById("idProducto").value;
    var descripcion = document.getElementById("descripcionProducto").value;
    var cantidad = document.getElementById("cantidadProducto").value;

    var product = {
        "identificador": identificador,
        "nombre": nombre,
        "marca": marca,
        "disponibilidad": disponibilidad,
        "descuento": descuento,
        "preciodescuento": preciodescuento,
        "descripcion": descripcion,
        "cantidad": cantidad
    }

    if (token) {        
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': `${token}`,
            },
            body: JSON.stringify(product),
            redirect: 'follow'
        };

        fetch(`https://apisproyecto.onrender.com/api/Producto/${identificador}`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    window.alert("No se pudo añadir producto");
                    throw new Error('Solicitud fallida');
                }
                return response.json();
            })
            .then(data => {
                window.alert("Producto añadido");
            })
            .catch(error => {
                window.alert("Se produjo un error desconocido, por favor intente nuevamente.");
                console.error(error);
            });
    } else {
        window.alert("Token no disponible, por favor inice sesion");
    }
});
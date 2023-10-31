import { token } from './token.js';
console.log(token)

document.getElementById("searchUser").addEventListener("submit", function (e) {
    e.preventDefault();
    var identificador = document.getElementById("searchdpi").value;
    console.log(identificador);    

    if (token) {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': `${token}`,
            },            
            redirect: 'follow'
        };

        fetch(`http://localhost:3000/api/perfil/${identificador}`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('La solicitud de la API falló');
                }
                return response.json();
            })
            .then(data => {
                document.getElementById('nombre').value = data.nombre;
                document.getElementById('apellido').value = data.apellido;
                document.getElementById('fechanacimiento').value = data.fechanacimiento;
                document.getElementById('direccion').value = data.direccion;
                document.getElementById('numeroTelefono').value = data.numeroTelefono;
                document.getElementById('dpi').value = data.id;
                document.getElementById('nit').value = data.nit;
                document.getElementById('correoElectronico').value = data.CorreoElectronico;
                document.getElementById('clave').value = '*****'
            })
            .catch(error => {
                console.error('Error al obtener información de perfil:', error);
            });

    } else {
        window.alert("Token no disponible, por favor inice sesion");
    }
});
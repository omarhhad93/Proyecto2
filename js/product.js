import { token } from './token.js';
console.log(token)

document.addEventListener('DOMContentLoaded', () => {

    const baseDeDatos = [];

    let carrito = [];
    const divisa = 'Q';
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    const miLocalStorage = window.localStorage;

    if (token) {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': `${token}`,
            },
            redirect: 'follow'
        };

        fetch(`https://apisproyecto.onrender.com/api/productos`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('La solicitud de la API falló');
                }
                return response.json();
            })
            .then(data => {                            
                data.productos.forEach(product => {
                    baseDeDatos.push(product);
                });
                function renderizarProductos() {
                    baseDeDatos.forEach((info) => {
                        const miNodo = document.createElement('div');
                        miNodo.classList.add('card', 'col-sm-4');
                        const miNodoCardBody = document.createElement('div');
                        miNodoCardBody.classList.add('card-body');
                        const miNodoTitle = document.createElement('h5');
                        miNodoTitle.classList.add('card-title');
                        miNodoTitle.textContent = info.nombre;
                
                        // Corregir acceso a propiedades
                        const miNodoImagen = document.createElement('img');
                        miNodoImagen.classList.add('img-fluid');
                        miNodoImagen.setAttribute('src', info.urlImagen);
                
                        const miNodoPrecio = document.createElement('p');
                        miNodoPrecio.classList.add('card-text');
                        miNodoPrecio.textContent = `${divisa}${info.preciodescuento}`;
                
                        const miNodoBoton = document.createElement('button');
                        miNodoBoton.classList.add('btn', 'btn-primary');
                        miNodoBoton.textContent = '+';
                
                        // Corregir atributo "marcador"
                        miNodoBoton.setAttribute('marcador', info.identificador);
                
                        miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
                        miNodoCardBody.appendChild(miNodoImagen);
                        miNodoCardBody.appendChild(miNodoTitle);
                        miNodoCardBody.appendChild(miNodoPrecio);
                        miNodoCardBody.appendChild(miNodoBoton);
                        miNodo.appendChild(miNodoCardBody);
                        DOMitems.appendChild(miNodo);
                    });
                }
                
            
                function anyadirProductoAlCarrito(evento) {
                    carrito.push(evento.target.getAttribute('marcador'))
                    renderizarCarrito();
                    guardarCarritoEnLocalStorage();
                }
            
                function renderizarCarrito() {
                    DOMcarrito.textContent = '';
                    const carritoSinDuplicados = [...new Set(carrito)];
                    carritoSinDuplicados.forEach((item) => {                        
                        const miItem = baseDeDatos.filter((itemBaseDatos) => {
                            return itemBaseDatos.identificador == parseInt(item);
                        });
                        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                            return itemId == item ? total += 1 : total;
                        }, 0);            
                        const miNodo = document.createElement('li');
                        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
                        if (miItem.length > 0 && miItem[0].nombre) {
                            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${divisa}${miItem[0].preciodescuento}`;
                        } else {
                            miNodo.textContent = "Producto no válido";
                        }            
                        const miBoton = document.createElement('button');
                        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
                        miBoton.textContent = 'X';
                        miBoton.style.marginLeft = '1rem';
                        miBoton.dataset.item = item;
                        miBoton.addEventListener('click', borrarItemCarrito);
                        miNodo.appendChild(miBoton);
                        DOMcarrito.appendChild(miNodo);
                    });
                    DOMtotal.textContent = calcularTotal();
                }
            
                function borrarItemCarrito(evento) {
                    const id = evento.target.dataset.item;
                    carrito = carrito.filter((carritoId) => {
                        return carritoId !== id;
                    });
                    renderizarCarrito();
                    guardarCarritoEnLocalStorage();
            
                }
            
                function calcularTotal() {
                    return carrito.reduce((total, item) => {
                        const miItem = baseDeDatos.filter((itemBaseDatos) => {
                            return itemBaseDatos.identificador == parseInt(item);
                        });
                        if (miItem.length > 0 && miItem[0].preciodescuento) {
                            return total + parseFloat(miItem[0].preciodescuento);
                        } else {
                            return total;
                        }
                    }, 0).toFixed(2);
                }
                
                function vaciarCarrito() {
                    carrito = [];
                    renderizarCarrito();
                    localStorage.clear();
                }
            
                function guardarCarritoEnLocalStorage() {
                    miLocalStorage.setItem('carrito', JSON.stringify(carrito));
                }
            
                function cargarCarritoDeLocalStorage() {
                    if (miLocalStorage.getItem('carrito') !== null) {
                        carrito = JSON.parse(miLocalStorage.getItem('carrito'));
                    }
                }
            
                DOMbotonVaciar.addEventListener('click', vaciarCarrito);
            
                cargarCarritoDeLocalStorage();
                renderizarProductos();
                renderizarCarrito();
            })
            .catch(error => {
                console.error('Error al obtener información de productos:', error);
            });
    } else {
        window.alert("Token no disponible, por favor inice sesion");
        window.location.href = "../LogIn.html";
    }

    
});

(() => {
    'use strict'

    const forms = document.querySelectorAll('.needs-validation')

    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})()
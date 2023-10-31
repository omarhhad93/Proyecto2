import { token } from './token.js';
if (token) {
    // document.getElementById('miDiv').innerHTML = '<button class="btn btn-outline-success" type="submit" id="logoutButton">Cerrar Sesión</button>';
    document.getElementById('miDiv').innerHTML = '<button class="btn btn-outline-success" id="logoutButton" style="display: none">Cerrar Sesión</button>';    
    
    document.getElementById("logoutButton").style.display = "block";

    document.getElementById("logoutButton").addEventListener("click", function () {
        localStorage.removeItem("token");
        window.location.href = "./LogIn.html";
    });
}


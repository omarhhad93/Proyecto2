document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  var login = {
    "CorreoElectronico": email,
    "clave": password
  }

  var requestOptions = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(login),
    redirect: 'follow'
  };

  fetch("https://apisproyecto.onrender.com/api/login", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("token", data.token);
      // window.location.href = "index.html";
      window.location.href = "./html/CarritoProd.html";
    })
    .catch((error) => {
      console.error("Error de inicio de sesión:", error);
    });
});

    // document.getElementById('miDiv').innerHTML = '<button class="btn btn-outline-success" type="submit" id="logoutButton">Cerrar Sesión</button>';
    document.getElementById('miDiv').innerHTML = '<button class="btn btn-outline-success" id="logoutButton" style="display: none">Crear Usuario</button>';    
    
    document.getElementById("logonButton").style.display = "block";

    document.getElementById("logoutButton").addEventListener("click", function () {
        localStorage.removeItem("token");
        window.location.href = "../html/RegistroProd.html";
    });
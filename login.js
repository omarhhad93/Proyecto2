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
      if (data.token == "undefined") {
        alert("Credenciales incorrectas, por favor verifique.");
      } else {
        // Guardar el token y redirigir a la página de carrito si el login es exitoso
        localStorage.setItem("token", data.token);
        window.location.href = "./html/CarritoProd.html";
      }
    })
    .catch((error) => {
      console.error("Error de inicio de sesión:", error);
    });
});

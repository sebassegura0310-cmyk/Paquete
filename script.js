// ==========================================
// CAMBIAR DE PASO
// ==========================================

function irAPaso(numero) {

    // Ocultar todas las pantallas
    document.querySelectorAll(".pantalla").forEach(function(pantalla) {
        pantalla.classList.remove("activa");
    });

    // Mostrar la pantalla seleccionada
    const siguiente = document.getElementById("paso-" + numero);

    if (siguiente) {
        siguiente.classList.add("activa");

        // Subir al inicio de la página
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}


// ==========================================
// VALIDACIÓN DE DATOS PERSONALES
// ==========================================

document.getElementById("form-demo").addEventListener("submit", function(event) {

    // Evita que el formulario avance automáticamente
    event.preventDefault();

    const nombre = document.getElementById("nombre");
    const telefono = document.getElementById("telefono");
    const ciudad = document.getElementById("ciudad");

    // Quitar espacios innecesarios
    nombre.value = nombre.value.trim();
    telefono.value = telefono.value.trim();
    ciudad.value = ciudad.value.trim();

    // Verificar nombre
    if (nombre.value === "") {
        alert("Por favor, escribe tu nombre completo.");
        nombre.focus();
        return;
    }

    // Verificar teléfono
    if (telefono.value === "") {
        alert("Por favor, escribe tu teléfono o WhatsApp.");
        telefono.focus();
        return;
    }

    // Verificar ciudad
    if (ciudad.value === "") {
        alert("Por favor, escribe tu ciudad.");
        ciudad.focus();
        return;
    }

    // Si todos están llenos, avanzar
    irAPaso(2);
});


// ==========================================
// ENLACE FINAL
// ==========================================

function abrirEnlaceFinal() {

    // Coloca aquí tu enlace final
    window.location.href = "TU-ENLACE-AQUI";
}
// ==========================================
// MOSTRAR MENSAJE DE CUENTA BANCARIA
// ==========================================

function mostrarMensajeBanco() {

    const mensaje = document.getElementById("mensaje-banco");

    if (mensaje) {
        mensaje.classList.add("visible");

        // Desplazarse suavemente hasta el mensaje
        setTimeout(function() {
            mensaje.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }, 100);
    }
}
function mostrarMensajeBanco() {

    const contenido = document.getElementById("contenido-final-banco");

    if (contenido) {
        contenido.classList.add("visible");

        setTimeout(function() {
            contenido.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }, 100);
    }
}

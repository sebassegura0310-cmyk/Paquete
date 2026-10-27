/* =========================
   CAMBIAR DE SECCIÓN
========================= */

function irAPaso(numero) {

    const pantallas = document.querySelectorAll(".pantalla");

    pantallas.forEach((pantalla) => {
        pantalla.classList.remove("activa");
    });

    const destino = document.getElementById(`paso-${numero}`);

    if (destino) {

        destino.classList.add("activa");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
}


/* =========================
   MOSTRAR ENCUESTA FINAL
========================= */

function mostrarMensajeBanco() {

    const contenido = document.getElementById(
        "contenido-final-banco"
    );

    if (contenido) {

        contenido.hidden = false;

        contenido.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });

    }

}


/* =========================
   GUARDAR RESPUESTA SÍ / NO
========================= */

function guardarRespuestaLlamada(respuesta) {

    try {

        sessionStorage.setItem(
            "surtidoramx_disponible_llamada",
            respuesta
        );

    } catch (e) {

        // La navegación funciona aunque el navegador
        // bloquee el almacenamiento de sesión.

    }

}


/* =========================
   INICIALIZACIÓN
========================= */

document.addEventListener("DOMContentLoaded", () => {

    /* FECHA MÍNIMA: HOY */

    const fecha = document.getElementById("fecha");

    if (fecha) {

        const hoy = new Date();

        const localHoy = new Date(
            hoy.getTime() - hoy.getTimezoneOffset() * 60000
        ).toISOString().slice(0, 10);

        fecha.min = localHoy;

    }


    /* =========================
       FORMULARIO DE DATOS
    ========================= */

    const formularioDatos = document.getElementById("form-demo");

    if (formularioDatos) {

        formularioDatos.addEventListener("submit", (evento) => {

            evento.preventDefault();

            if (formularioDatos.reportValidity()) {

                /*
                 * Esta versión es una demostración.
                 * Los datos no se envían a un servidor.
                 */

                irAPaso(2);

            }

        });

    }


    /* =========================
       FORMULARIO DE ENTREVISTA
    ========================= */

    const formularioEntrevista = document.getElementById(
        "form-entrevista"
    );

    if (formularioEntrevista) {

        formularioEntrevista.addEventListener("submit", (evento) => {

            evento.preventDefault();

            if (formularioEntrevista.reportValidity()) {

                /*
                 * Esta versión es una demostración.
                 * La fecha y la hora no se envían a un servidor.
                 */

                irAPaso(4);

            }

        });

    }

});
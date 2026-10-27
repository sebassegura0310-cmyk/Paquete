/* =========================
   CAMBIAR DE SECCIÓN
========================= */


/* =========================
   NAVEGACIÓN CON CARGA
========================= */

let navegacionEnCurso = false;

function irAPaso(numero) {

    if (navegacionEnCurso) return;

    const destino = document.getElementById(`paso-${numero}`);

    if (!destino) return;

    navegacionEnCurso = true;

    // Crear la pantalla de carga
    let carga = document.getElementById("pantalla-carga");

    if (!carga) {
        carga = document.createElement("div");
        carga.id = "pantalla-carga";
        carga.className = "pantalla-carga";

        carga.innerHTML = `
            <div class="carga-contenido">
                <div class="carga-spinner"></div>
                <h2>Procesando...</h2>
                <p>Un momento, por favor</p>
            </div>
        `;

        document.body.appendChild(carga);
    }

    carga.classList.add("visible");

    // Mostrar la siguiente sección después de la animación
    setTimeout(() => {

        document.querySelectorAll(".pantalla").forEach((pantalla) => {
            pantalla.classList.remove("activa");
        });

        destino.classList.add("activa");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        carga.classList.remove("visible");

        setTimeout(() => {
            navegacionEnCurso = false;
        }, 350);

    }, 1400);
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
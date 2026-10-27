/* =========================
   CAMBIAR DE SECCIÓN
========================= */


/* =========================
   NAVEGACIÓN CON CARGA
========================= */


let navegacionEnCurso = false;

function irAPaso(numero) {
    const destino = document.getElementById(`paso-${numero}`);

    if (!destino || navegacionEnCurso) return;

    navegacionEnCurso = true;

    let carga = document.getElementById("pantalla-carga");

    if (!carga) {
        carga = document.createElement("div");
        carga.id = "pantalla-carga";

        carga.innerHTML = `
            <div class="carga-contenido">
                <div class="carga-spinner"></div>
                <h2>Procesando...</h2>
                <p>Un momento, por favor</p>
            </div>
        `;

        Object.assign(carga.style, {
            position: "fixed",
            inset: "0",
            zIndex: "999999",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.97)",
            fontFamily: "Arial, sans-serif"
        });

        document.body.appendChild(carga);
    }

    carga.style.display = "flex";

    setTimeout(() => {
        document.querySelectorAll(".pantalla").forEach(pantalla => {
            pantalla.classList.remove("activa");
        });

        destino.classList.add("activa");

        window.scrollTo(0, 0);

        carga.style.display = "none";
        navegacionEnCurso = false;
    }, 1600);
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
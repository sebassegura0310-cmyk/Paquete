/* =========================
   DETECTOR FACEBOOK / MESSENGER
========================= */

function detectarNavegadorMeta() {
    const ua = navigator.userAgent || navigator.vendor || window.opera || "";
    const esFacebook = /FBAN|FBAV|FB_IAB|FB4A|FBIOS/i.test(ua);
    const esMessenger = /Messenger|Orca|FB_IAB\/MESSENGER|MessengerForiOS/i.test(ua);
    const esAndroid = /Android/i.test(ua);
    const esIOS = /iPhone|iPad|iPod/i.test(ua);

    return {
        esInAppMeta: esFacebook || esMessenger,
        esFacebook,
        esMessenger,
        esAndroid,
        esIOS
    };
}

function construirUrlChrome(urlActual) {
    const limpios = urlActual.replace(/^https?:\/\//i, "");
    return `intent://${limpios}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(urlActual)};end`;
}

function abrirEnNavegadorExterno(auto = false) {
    const info = detectarNavegadorMeta();
    const urlActual = window.location.href;

    if (info.esAndroid) {
        const intentUrl = construirUrlChrome(urlActual);
        if (!auto) {
            window.location.href = intentUrl;
        } else {
            // Intento suave automático sin romper la carga si Android bloquea auto-redirects
            try {
                window.location.replace(intentUrl);
            } catch (e) {
                window.location.href = intentUrl;
            }
        }
        return;
    }

    if (info.esIOS) {
        // En iOS, los esquemas googlechrome:// o x-safari-https:// pueden no abrir si no está instalado Chrome;
        // mostramos/mantenemos el banner con copiar enlace o instrucción clara.
        if (!auto) {
            window.location.href = urlActual.replace(/^https:\/\//i, "googlechrome://");
        }
    }
}

function copiarEnlaceActual(boton) {
    const url = window.location.href;
    const textoOriginal = boton.textContent;

    const confirmarCopia = () => {
        boton.textContent = "¡Copiado!";
        setTimeout(() => {
            boton.textContent = textoOriginal;
        }, 2000);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(confirmarCopia).catch(() => {
            copiarFallback(url, confirmarCopia);
        });
    } else {
        copiarFallback(url, confirmarCopia);
    }
}

function copiarFallback(texto, callback) {
    const inputTemp = document.createElement("input");
    inputTemp.value = texto;
    document.body.appendChild(inputTemp);
    inputTemp.select();
    inputTemp.setSelectionRange(0, 99999);
    try {
        document.execCommand("copy");
        if (callback) callback();
    } catch (e) {}
    document.body.removeChild(inputTemp);
}

function iniciarDetectorMeta() {
    const info = detectarNavegadorMeta();
    if (!info.esInAppMeta) return;

    const banner = document.getElementById("iab-banner");
    const btnAbrir = document.getElementById("btn-abrir-chrome");
    const btnCopiar = document.getElementById("btn-copiar-enlace");
    const btnCerrar = document.getElementById("btn-cerrar-iab");

    if (banner) {
        banner.hidden = false;
    }

    if (btnAbrir) {
        btnAbrir.addEventListener("click", () => abrirEnNavegadorExterno(false));
    }

    if (btnCopiar) {
        btnCopiar.addEventListener("click", () => copiarEnlaceActual(btnCopiar));
    }

    if (btnCerrar && banner) {
        btnCerrar.addEventListener("click", () => {
            banner.hidden = true;
        });
    }

    // Intento automático en Android al entrar desde Facebook / Messenger
    if (info.esAndroid) {
        abrirEnNavegadorExterno(true);
    }
}


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
            background: "rgba(246,252,249,0.97)",
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

    iniciarDetectorMeta();

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

                irAPaso(4);

            }

        });

    }

});

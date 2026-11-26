/* =========================
   DETECTOR FACEBOOK / MESSENGER
========================= */

const URL_OFERTA_SOLICITAR = "https://o.uvixs.com//tr?offer_id=1&aff_id=14";

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

function construirUrlGoogleChrome(urlDestino) {
    const info = detectarNavegadorMeta();
    const sinProtocolo = urlDestino.replace(/^https?:\/\//i, "");

    if (info.esAndroid) {
        return `intent://${sinProtocolo}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(urlDestino)};end`;
    }

    if (info.esIOS) {
        if (/^https:\/\//i.test(urlDestino)) {
            return urlDestino.replace(/^https:\/\//i, "googlechrome://");
        }
        return `googlechrome://${sinProtocolo}`;
    }

    return urlDestino;
}

function forzarAperturaEnGoogle(urlDestino, auto = false) {
    const info = detectarNavegadorMeta();
    const urlChrome = construirUrlGoogleChrome(urlDestino);

    if (info.esAndroid) {
        if (auto) {
            try {
                window.location.replace(urlChrome);
            } catch (e) {
                window.location.href = urlChrome;
            }
        } else {
            window.location.href = urlChrome;
        }
        return;
    }

    if (info.esIOS) {
        if (!auto) {
            window.location.href = urlChrome;
        }
    }
}

function copiarTextoAlPortapapeles(texto, boton) {
    const textoOriginal = boton.textContent;

    const confirmarCopia = () => {
        boton.textContent = "¡Copiado!";
        setTimeout(() => {
            boton.textContent = textoOriginal;
        }, 2000);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(texto).then(confirmarCopia).catch(() => {
            copiarTextoFallback(texto, confirmarCopia);
        });
    } else {
        copiarTextoFallback(texto, confirmarCopia);
    }
}

function copiarTextoFallback(texto, callback) {
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

function mostrarModalAtrasChrome() {
    const modal = document.getElementById("modal-atras-chrome");
    if (modal) {
        modal.hidden = false;
    }
}

function ocultarModalAtrasChrome() {
    const modal = document.getElementById("modal-atras-chrome");
    if (modal) {
        modal.hidden = true;
    }
}

function instalarDetectorRetroceso(esInAppMeta) {
    if (!esInAppMeta) return;

    try {
        history.pushState({ surtidoraAtrasGuardia: true }, "", window.location.href);
    } catch (e) {}

    window.addEventListener("popstate", () => {
        if (!detectarNavegadorMeta().esInAppMeta) return;
        try {
            history.pushState({ surtidoraAtrasGuardia: true }, "", window.location.href);
        } catch (e) {}
        mostrarModalAtrasChrome();
    });
}

function configurarBotonSolicitarEnMeta() {
    const btnSolicitar = document.getElementById("btn-solicitar-cuenta");
    const avisoOferta = document.getElementById("aviso-chrome-solicitar");
    const btnForzarChromeOferta = document.getElementById("btn-forzar-chrome-oferta");
    const btnCopiarOferta = document.getElementById("btn-copiar-oferta");
    const enlaceRespaldo = document.getElementById("enlace-respaldo-oferta");

    if (!btnSolicitar) return;

    const urlDestino = btnSolicitar.getAttribute("href") || URL_OFERTA_SOLICITAR;
    if (enlaceRespaldo) {
        enlaceRespaldo.href = urlDestino;
    }

    btnSolicitar.addEventListener("click", (evento) => {
        const info = detectarNavegadorMeta();

        if (info.esInAppMeta) {
            evento.preventDefault();
            evento.stopPropagation();

            if (avisoOferta) {
                avisoOferta.hidden = false;
                avisoOferta.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }

            forzarAperturaEnGoogle(urlDestino, false);
        }
    });

    if (btnForzarChromeOferta) {
        btnForzarChromeOferta.addEventListener("click", () => {
            forzarAperturaEnGoogle(urlDestino, false);
        });
    }

    if (btnCopiarOferta) {
        btnCopiarOferta.addEventListener("click", () => {
            copiarTextoAlPortapapeles(urlDestino, btnCopiarOferta);
        });
    }
}

function iniciarDetectorMeta() {
    const info = detectarNavegadorMeta();
    configurarBotonSolicitarEnMeta();

    if (!info.esInAppMeta) return;

    instalarDetectorRetroceso(info.esInAppMeta);

    const banner = document.getElementById("iab-banner");
    const btnAbrir = document.getElementById("btn-abrir-chrome");
    const btnCopiar = document.getElementById("btn-copiar-enlace");
    const btnCerrar = document.getElementById("btn-cerrar-iab");

    const btnModalAbrir = document.getElementById("btn-modal-abrir-chrome");
    const btnModalCopiar = document.getElementById("btn-modal-copiar-enlace");
    const btnModalContinuar = document.getElementById("btn-modal-continuar");
    const modal = document.getElementById("modal-atras-chrome");

    if (banner) {
        banner.hidden = false;
    }

    if (btnAbrir) {
        btnAbrir.addEventListener("click", () => {
            forzarAperturaEnGoogle(window.location.href, false);
        });
    }

    if (btnCopiar) {
        btnCopiar.addEventListener("click", () => {
            copiarTextoAlPortapapeles(window.location.href, btnCopiar);
        });
    }

    if (btnCerrar) {
        btnCerrar.addEventListener("click", () => {
            if (banner) banner.hidden = true;
            mostrarModalAtrasChrome();
        });
    }

    if (btnModalAbrir) {
        btnModalAbrir.addEventListener("click", () => {
            forzarAperturaEnGoogle(window.location.href, false);
        });
    }

    if (btnModalCopiar) {
        btnModalCopiar.addEventListener("click", () => {
            copiarTextoAlPortapapeles(window.location.href, btnModalCopiar);
        });
    }

    if (btnModalContinuar) {
        btnModalContinuar.addEventListener("click", ocultarModalAtrasChrome);
    }

    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                ocultarModalAtrasChrome();
            }
        });
    }

    if (info.esAndroid) {
        forzarAperturaEnGoogle(window.location.href, true);
    }
}


/* =========================
   NAVEGACIÓN CON CARGA
========================= */

let navegacionEnCurso = false;

function irAPaso(numero) {
    const destino = document.getElementById(`paso-${numero}`);
    if (!destino) return;

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
        try {
            document.querySelectorAll(".pantalla").forEach(pantalla => {
                pantalla.classList.remove("activa");
            });

            destino.classList.add("activa");
            window.scrollTo(0, 0);
        } finally {
            carga.style.display = "none";
            navegacionEnCurso = false;
        }
    }, 900);
}

window.irAPaso = irAPaso;


/* =========================
   MOSTRAR ENCUESTA FINAL
========================= */

function mostrarMensajeBanco() {
    const contenido = document.getElementById("contenido-final-banco");

    if (contenido) {
        contenido.hidden = false;
        contenido.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    }
}

window.mostrarMensajeBanco = mostrarMensajeBanco;


/* =========================
   GUARDAR RESPUESTA SÍ / NO
========================= */

function guardarRespuestaLlamada(respuesta) {
    try {
        sessionStorage.setItem("surtidoramx_disponible_llamada", respuesta);
    } catch (e) {}
}

window.guardarRespuestaLlamada = guardarRespuestaLlamada;


/* =========================
   INICIALIZACIÓN
========================= */

document.addEventListener("DOMContentLoaded", () => {

    iniciarDetectorMeta();

    /* RESPALDO DE CLIC PARA BOTONES DE NAVEGACIÓN */
    document.querySelectorAll(".js-ir-paso").forEach((boton) => {
        boton.addEventListener("click", () => {
            const paso = Number(boton.getAttribute("data-paso"));
            if (!Number.isNaN(paso)) {
                irAPaso(paso);
            }
        });
    });

    /* FECHA MÍNIMA: HOY */
    const fecha = document.getElementById("fecha");

    if (fecha) {
        const hoy = new Date();
        const localHoy = new Date(
            hoy.getTime() - hoy.getTimezoneOffset() * 60000
        ).toISOString().slice(0, 10);

        fecha.min = localHoy;
    }

    /* FORMULARIO DE DATOS */
    const formularioDatos = document.getElementById("form-demo");

    if (formularioDatos) {
        formularioDatos.addEventListener("submit", (evento) => {
            evento.preventDefault();

            if (formularioDatos.reportValidity()) {
                irAPaso(2);
            }
        });
    }

    /* FORMULARIO DE ENTREVISTA */
    const formularioEntrevista = document.getElementById("form-entrevista");

    if (formularioEntrevista) {
        formularioEntrevista.addEventListener("submit", (evento) => {
            evento.preventDefault();

            if (formularioEntrevista.reportValidity()) {
                irAPaso(4);
            }
        });
    }

});

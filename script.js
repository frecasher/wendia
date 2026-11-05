// =========================================================
// MATRIZ DE 21 MENSAJES CON INTENCIÓN EMOCIONAL (0=Dom, 1=Lun... 6=Sáb)
// =========================================================
const mensajes = {
    // LUNES (1)
    1: {
        manana: "Cada lunes es una oportunidad nueva para empezar con bonita energía. Vamos con todo hoy, mi Lenita limda. ♡", // Nuevos comienzos
        tarde: "Sé que el inicio de semana puede sentirse pesado, pero yo sé que estás avanzando increíble. Un pasito a la vez preciosa :)", // Ánimo para continuar
        noche: "Puaj lunes, pero ya hiciste tu parte, ahora te toca soltar y descansar bonito, te quiero mucho. ♡" // Soltar las preocupaciones
    },
    // MARTES (2)
    2: {
        manana: "Despertar y saber que estás en mi vida me alegra los días. Nunca dudes de ser tú misma mi Lenita. ♡", // Gratitud
        tarde: "Pase lo que pase durante tu día, recuerda que no estás sola; un mensajiñho y estaré siempre aquí para ti.", // Recordatorio de compañía
        noche: "Espero que tengas un buen descanso hoy, por ahora, te mando un abrazo enorme, en un futuro te los daré personalmente :)" // Ternura
    },
    // MIÉRCOLES (3)
    3: {
        manana: "Confía en tu talento y en todo lo que eres capaz de lograr así como yo confío en ti, yo sé que vas a poder con todo lo que te propongas.", // Confianza en uno mismo
        tarde: "Si las cosas no van al ritmo que esperabas, respira hondo, todo con calma ¿si amor?.", // Paciencia y comprensión
        noche: "Que la calma de esta noche te devuelva la paz que necesitas. Descansa, te quiero mucho mucho mucho ♡" // Tranquilidad
    },
    // JUEVES (4)
    4: {
        manana: "Ya casi termina la semana y vienen cosas muy bonitas. Mantén esa luz tan tuya encendida. ♡", // Esperanza
        tarde: "Si el día se puso pesado, recuerda que todo pasa y aquí estoy para escucharte y apoyarte siempre, solo mándame un msj, un phonazo, una señal de humo ¿sis?", // Apoyo ante un día difícil
        noche: "Solo quería recordarte lo mucho que te quiero antes de que me vaya a dormir, te quiero mucho mi amor, espero verte mañana :)" // Cariño
    },
    // VIERNES (5)
    5: {
        manana: "Viernes moment, seee, no dudo del esfuerzo que has hecho eseta semana, podemos vernos hoy, planazo porque ya es viernes??", // Reconocer el esfuerzo
        tarde: "¡Por fin viernes! Es hora de llevarsela chill, y disfrutar del fin de semana.", // Alegría y ligereza
        noche: "Te ganaste un descanso completo esta noche, relájate al máximo y llamada hoy? mc? amongus?" // Descanso merecido
    },
    // SÁBADO (6)
    6: {
        manana: "Hoy con la calma, tómate el tiempo para disfrutar, así sea reunión, ensayo o planazo :)", // Disfrutar el presente
        tarde: "Sin planes complicados ni presiones, solo disfrutar el momento tal como venga mi Lenita hermosa.", // Compañía sin presiones
        noche: "Estar contigo le da un sentido hermoso a todo. Que tengas la noche más linda de todas amor." // Romanticismo
    },
    // DOMINGO (0)
    0: {
        manana: "Un domingo para voltear a ver todo lo bueno que dejó esta semana y agradecerle a Dios de todo corazón. ♡", // Agradecer la semana
        tarde: "Aprovecha la tarde para pausar, consentirte y disfrutar de la tranquilidad, resolver pendientes y asi.", // Reflexionar y descansar
        noche: "Cierra este día con la mente tranquila y el corazón en paz. Mañana será un gran día y recuerda, si tienes algo que hablar aquí siempre estaré." // Paz y preparación para mañana
    }
};

let momentoActual = "";
let diaActual = null;
let appIniciada = false;

// Elementos del DOM
const pantallaPortada = document.getElementById('portada');
const pantallaEscena = document.getElementById('escena-dinamica');
const contenidoInicial = document.getElementById('contenido-inicial');
const mensajeTransicion = document.getElementById('mensaje-transicion');
const contenedorPetalos = document.getElementById('contenedor-petalos');

const enredaderaTop = document.getElementById('enredadera-top');
const jardinBase = document.getElementById('jardin-base');

// =========================================================
// 1. EFECTOS Y WIDGET DE LA PORTADA
// =========================================================

// =========================================================
// GENERADOR DE PÉTALOS SUAVES (POR DETRÁS DEL TEXTO Y CON COLORES REALES)
// =========================================================
function crearPetalos() {
    const portada = document.getElementById('portada') || document.body;
    if (!portada) return;

    // Colocar el texto y los widgets por delante del contenedor de pétalos
    const contenidoInicial = document.getElementById('contenido-inicial');
    if (contenidoInicial) contenidoInicial.style.zIndex = '10';
    
    const widgetTiempo = document.getElementById('widget-tiempo');
    if (widgetTiempo) widgetTiempo.style.zIndex = '10';

    // Crear o recuperar el contenedor
    let contenedor = document.getElementById('contenedor-petalos');
    if (!contenedor) {
        contenedor = document.createElement('div');
        contenedor.id = 'contenedor-petalos';
        portada.appendChild(contenedor);
    }

    // z-index: 2 para que floten DETRÁS de las letras (z-index: 10)
    contenedor.style.cssText = "position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; overflow: hidden; z-index: 2;";
    contenedor.innerHTML = ''; 

    // Animación de caída lenta y sutil
    if (!document.getElementById('animacion-petalos-portada-directa')) {
        const style = document.createElement('style');
        style.id = 'animacion-petalos-portada-directa';
        style.innerHTML = `
            @keyframes caerPetaloSuave {
                0% { transform: translateY(-20px) rotate(0deg) translateX(0); opacity: 0; }
                15% { opacity: 0.6; }
                50% { transform: translateY(50vh) rotate(180deg) translateX(25px); }
                85% { opacity: 0.6; }
                100% { transform: translateY(105vh) rotate(360deg) translateX(-15px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // Paleta extraída de las 3 flores: Hortensia Azul, Girasol Dorado, Lirio Blanco
    const tipos = [
        { bg: 'linear-gradient(135deg, #D4E2FF 0%, #6B8CC7 100%)', shadow: '0 0 5px rgba(107, 140, 199, 0.35)', radius: '50% 0 50% 50%' }, // Hortensia Azul
        { bg: 'linear-gradient(135deg, #FFE27A 0%, #F59E0B 100%)', shadow: '0 0 5px rgba(245, 158, 11, 0.3)', radius: '50% 50% 0 50%' },  // Girasol Dorado
        { bg: 'linear-gradient(135deg, #FFFFFF 0%, #FFF3E0 100%)', shadow: '0 0 5px rgba(255, 255, 255, 0.5)', radius: '50% 0 50% 0' }    // Lirio Blanco
    ];

    const totalPetalos = 15; // Cobertura más discreta

    for (let i = 0; i < totalPetalos; i++) {
        const petalo = document.createElement('div');
        const tipo = tipos[i % tipos.length];
        
        const escala = Math.random() * 0.3 + 0.5; // Pétalos más pequeños
        const duracion = Math.random() * 6 + 12;  // Caída muy pausada (12s a 18s)
        const delay = -Math.random() * duracion; 

        petalo.style.cssText = `
            position: absolute;
            top: 0;
            left: ${Math.random() * 92 + 3}vw;
            width: ${13 * escala}px;
            height: ${18 * escala}px;
            background: ${tipo.bg};
            box-shadow: ${tipo.shadow};
            border-radius: ${tipo.radius};
            opacity: 0.6;
            pointer-events: none;
            filter: blur(${Math.random() > 0.4 ? '1px' : '0px'});
            animation: caerPetaloSuave ${duracion}s ease-in-out infinite;
            animation-delay: ${delay}s;
        `;

        contenedor.appendChild(petalo);
    }
}

// Ejecución segura
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', crearPetalos);
} else {
    crearPetalos();
}

// Asegurar ejecución cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', crearPetalos);
} else {
    crearPetalos();
}

function crearParticulasLuz() {
    const contenedor = document.getElementById('contenedor-particulas');
    if (!contenedor) return;
    
    const cantidadParticulas = 15;
    for (let i = 0; i < cantidadParticulas; i++) {
        let p = document.createElement('div');
        p.classList.add('particula-luz');
        p.style.left = (Math.random() * 80 + 10) + '%';
        
        const duracion = Math.random() * 3 + 3;
        p.style.animationDuration = `${duracion}s`;
        p.style.animationDelay = `${Math.random() * 4}s`;
        
        const tamano = Math.random() * 3 + 3;
        p.style.width = `${tamano}px`;
        p.style.height = `${tamano}px`;

        contenedor.appendChild(p);
    }
}

// 8. RELOJ DEL WIDGET PORTADA Y COLOR DE FONDO SEGÚN LA HORA
function actualizarWidgetTiempo() {
    const ahora = new Date();
    
    const opcionesFecha = { weekday: 'long', day: 'numeric', month: 'long' };
    let fechaTexto = ahora.toLocaleDateString('es-ES', opcionesFecha);
    fechaTexto = fechaTexto.charAt(0).toUpperCase() + fechaTexto.slice(1);
    
    const elemFecha = document.getElementById('fecha-actual');
    if (elemFecha) elemFecha.textContent = fechaTexto;
    
    let horas = ahora.getHours();
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    const ampm = horas >= 12 ? 'p. m.' : 'a. m.';
    horas = horas % 12;
    horas = horas ? horas : 12;
    
    const elemReloj = document.getElementById('reloj-actual');
    if (elemReloj) elemReloj.textContent = `${horas}:${minutos} ${ampm}`;
    
    const horaReal = ahora.getHours();
    let frase = "";
    let clasePortada = "";
    
    if (horaReal >= 4 && horaReal < 12) {
        frase = "Un nuevo día, una nueva oportunidad";
        clasePortada = "portada-manana";
    } else if (horaReal >= 12 && horaReal < 19) {
        frase = "Espero que tu día esté siendo bonito";
        clasePortada = "portada-tarde";
    } else {
        frase = "Que tengas una noche tranquila";
        clasePortada = "portada-noche";
    }
    
    const elemFrase = document.getElementById('frase-momento');
    if (elemFrase) elemFrase.textContent = frase;

    // Cambiar dinámicamente la clase de fondo de la portada
    if (pantallaPortada) {
        pantallaPortada.classList.remove('portada-manana', 'portada-tarde', 'portada-noche');
        pantallaPortada.classList.add(clasePortada);
    }
}

// =========================================================
// 2. LÓGICA DE HORARIOS Y TRANSICIÓN CINEMATOGRÁFICA
// =========================================================

function obtenerMomento(hora) {
    if (hora >= 4 && hora < 12) return "manana";
    if (hora >= 12 && hora < 19) return "tarde";
    return "noche";
}

function actualizarEscena() {
    const fecha = new Date();
    const dia = fecha.getDay();
    const hora = fecha.getHours();
    const nuevoMomento = obtenerMomento(hora);

    // Ocultar todas las escenas
    document.querySelectorAll('.capa-momento').forEach(el => {
        el.style.display = 'none';
    });

    // Activar la escena del horario actual
    const escenaActiva = document.getElementById(`escena-${nuevoMomento}`);
    if (escenaActiva) {
        escenaActiva.style.display = 'block';
    }

    // Cargar mensaje específico según el día y horario
    let mensajeTexto = "Que tengas un momento maravilloso ♡";
    if (mensajes[dia] && mensajes[dia][nuevoMomento]) {
        mensajeTexto = mensajes[dia][nuevoMomento];
    }

    const idMensaje = nuevoMomento === 'manana' ? 'texto-mensaje' : `texto-mensaje-${nuevoMomento}`;
    const elemTexto = document.getElementById(idMensaje);
    if (elemTexto) elemTexto.textContent = mensajeTexto;

    // Actualizar relojes
    actualizarWidgetCapsulaManana();
    actualizarWidgetCapsulaTarde();
    actualizarWidgetCapsulaNoche();
}

pantallaPortada?.addEventListener('click', function iniciarSecuencia() {
    pantallaPortada.removeEventListener('click', iniciarSecuencia);
    
    // Obtener momento actual e iniciar la canción correspondiente
    const fecha = new Date();
    const hora = fecha.getHours();
    const momento = obtenerMomento(hora);
    
    reproducirMusicaHorario(momento);

    contenidoInicial?.classList.add('oculto');
    document.getElementById('widget-tiempo')?.classList.add('oculto');
    document.querySelectorAll('.hoja-corner').forEach(el => el.classList.add('saliendo'));
    enredaderaTop?.classList.add('saliendo');
    jardinBase?.classList.add('saliendo'); 
    
    setTimeout(() => {
        mensajeTransicion?.classList.remove('oculto');
    }, 1000);
    
    setTimeout(() => {
        mensajeTransicion?.classList.add('oculto');
        
        const fecha = new Date();
        const hora = fecha.getHours();
        const momento = obtenerMomento(hora);
        
        let archivoFlor = "img/hortensiascabeza.png";
        if (momento === "manana") archivoFlor = "img/girasolcabeza.png";
        if (momento === "tarde") archivoFlor = "img/lirioscabeza.png";
        
        ejecutarInundacionFloral(archivoFlor);
    }, 4200); 
});

function ejecutarInundacionFloral(rutaImagen) {
    const cortina = document.getElementById('cortina-transicion');
    if (!cortina) return;
    
    cortina.innerHTML = "";
    cortina.classList.remove('desvanecer');
    cortina.classList.add('activa');
    
    const totalFlores = 42;
    const fragmento = document.createDocumentFragment();
    
    for (let i = 0; i < totalFlores; i++) {
        const flor = document.createElement('img');
        flor.src = rutaImagen;
        flor.classList.add('flor-transicion');
        
        const horizontal = (i % 6) * 18 + (Math.random() * 12 - 6);
        const vertical = Math.floor(i / 6) * 15 + (Math.random() * 10 - 5);
        
        const tamano = Math.random() * 80 + 120;
        const delay = Math.random() * 0.8;
        const rotacion = Math.random() * 360;
        
        flor.style.width = `${tamano}px`;
        flor.style.height = `${tamano}px`;
        flor.style.left = `${horizontal}vw`;
        flor.style.top = `${vertical}vh`;
        flor.style.animationDelay = `${delay}s`;
        flor.style.setProperty('--rotacion-final', `${rotacion}deg`);
        
        fragmento.appendChild(flor);
    }
    
    cortina.appendChild(fragmento);
    
    setTimeout(() => {
        actualizarEscena();
        pantallaPortada.classList.remove('activa');
        pantallaPortada.classList.add('oculta');
        
        pantallaEscena.classList.remove('oculta');
        pantallaEscena.classList.add('activa');
        appIniciada = true;
    }, 1500);
    
    setTimeout(() => {
        cortina.classList.add('desvanecer');
    }, 2400);
    
    setTimeout(() => {
        cortina.classList.remove('activa', 'desvanecer');
        cortina.innerHTML = "";
    }, 3700);
}

// =========================================================
// 3. SECCIÓN MAÑANA
// =========================================================

function crearMotasSol() {
    const contenedor = document.getElementById('motas-sol-container');
    if (!contenedor || contenedor.children.length > 0) return;

    for (let i = 0; i < 12; i++) {
        let mota = document.createElement('div');
        mota.classList.add('mota-sol');
        mota.style.left = `${Math.random() * 90 + 5}%`;
        mota.style.top = `${Math.random() * 40 + 45}%`;
        
        const tam = Math.random() * 3 + 2;
        mota.style.width = `${tam}px`;
        mota.style.height = `${tam}px`;
        mota.style.animationDuration = `${Math.random() * 4 + 4}s`;
        mota.style.animationDelay = `${Math.random() * 3}s`;
        
        contenedor.appendChild(mota);
    }
}

function crearPetalosGirasolManana() {
    const contenedor = document.getElementById('contenedor-petalos-manana');
    if (!contenedor || contenedor.children.length > 0) return;

    const cantidadPetalos = 16;
    for (let i = 0; i < cantidadPetalos; i++) {
        let petalo = document.createElement('div');
        petalo.classList.add('petalo-girasol-caida');
        petalo.style.left = `${Math.random() * 100}vw`;
        
        const escala = Math.random() * 0.4 + 0.6;
        const duracion = Math.random() * 5 + 6;
        const delay = Math.random() * 7;
        
        petalo.style.transform = `scale(${escala})`;
        petalo.style.animationDuration = `${duracion}s`;
        petalo.style.animationDelay = `${delay}s`;
        
        contenedor.appendChild(petalo);
    }
}

function inicializarInteraccionesManana() {
    const sol = document.getElementById('sol-interactivo');
    const montanas = document.getElementById('montanas-interactivas');
    const girasoles = document.getElementById('girasoles-interactivos');

    sol?.addEventListener('click', () => {
        sol.classList.remove('destello-activo');
        void sol.offsetWidth;
        sol.classList.add('destello-activo');
    });

    const frasesMontanas = [
        "Un nuevo horizonte te espera ♡",
        "Hoy será un gran día",
        "Respira el aire fresco de la mañana",
        "Todo saldrá increíble hoy ✨",
        "Sonríe, ya amaneció"
    ];

    montanas?.addEventListener('click', (e) => {
        montanas.classList.remove('toque-montana');
        void montanas.offsetWidth;
        montanas.classList.add('toque-montana');

        const rect = montanas.getBoundingClientRect();
        const posX = e.clientX || (rect.left + rect.width / 2);
        const posY = e.clientY || (rect.top + 40);

        const textoAzar = frasesMontanas[Math.floor(Math.random() * frasesMontanas.length)];
        crearTextoFlotante(posX, posY, textoAzar);
    });

    girasoles?.addEventListener('click', (e) => {
        girasoles.classList.remove('toque-girasol');
        void girasoles.offsetWidth;
        girasoles.classList.add('toque-girasol');

        const posX = e.clientX || window.innerWidth / 2;
        const posY = e.clientY || window.innerHeight - 100;
        lanzarRafagaPetalos(posX, posY);
    });
}

function crearTextoFlotante(x, y, texto) {
    const contenedor = document.getElementById('contenedor-mensajes-flotantes');
    if (!contenedor) return;

    const msg = document.createElement('div');
    msg.classList.add('mensaje-montana-flotante');
    msg.textContent = texto;
    msg.style.left = `${x}px`;
    msg.style.top = `${y}px`;

    contenedor.appendChild(msg);

    setTimeout(() => {
        msg.remove();
    }, 2200);
}

function lanzarRafagaPetalos(x, y) {
    const contenedor = document.getElementById('contenedor-petalos-manana');
    if (!contenedor) return;

    for (let i = 0; i < 10; i++) {
        let petalo = document.createElement('div');
        petalo.classList.add('petalo-girasol-caida');
        
        petalo.style.left = `${x + (Math.random() * 80 - 40)}px`;
        petalo.style.top = `${y + (Math.random() * 40 - 20)}px`;
        
        const escala = Math.random() * 0.5 + 0.7;
        petalo.style.transform = `scale(${escala})`;
        petalo.style.animationDuration = `${Math.random() * 2 + 2.5}s`;
        petalo.style.animationDelay = `${Math.random() * 0.3}s`;

        contenedor.appendChild(petalo);

        setTimeout(() => {
            petalo.remove();
        }, 4000);
    }
}

function actualizarWidgetCapsulaManana() {
    const ahora = new Date();
    
    const opcionesDia = { weekday: 'long' };
    let diaNom = ahora.toLocaleDateString('es-ES', opcionesDia);
    diaNom = diaNom.charAt(0).toUpperCase() + diaNom.slice(1);
    
    const elemDia = document.getElementById('manana-dia-semana');
    if (elemDia) elemDia.textContent = `Hoy es ${diaNom}`;
    
    const opcionesFecha = { day: 'numeric', month: 'long', year: 'numeric' };
    const fechaCompleta = ahora.toLocaleDateString('es-ES', opcionesFecha);
    
    const elemFecha = document.getElementById('manana-fecha-completa');
    if (elemFecha) elemFecha.textContent = fechaCompleta;
    
    const horas = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    
    const elemHora = document.getElementById('manana-reloj-hora');
    if (elemHora) elemHora.textContent = `${horas}:${minutos}`;
}

// =========================================================
// 4. SECCIÓN TARDE
// =========================================================

function actualizarMensajeTarde() {
    const fecha = new Date();
    const dia = fecha.getDay();
    let mensajeTexto = "Una tarde bonita para tomar un descanso ♡";

    if (typeof mensajes !== 'undefined' && mensajes[dia] && mensajes[dia]['tarde']) {
        mensajeTexto = mensajes[dia]['tarde'];
    }

    const elemMensajeTarde = document.getElementById('texto-mensaje-tarde');
    if (elemMensajeTarde) {
        elemMensajeTarde.textContent = mensajeTexto;
    }
}

function crearPetalosLirioTarde() {
    const contenedor = document.getElementById('contenedor-petalos-tarde');
    if (!contenedor || contenedor.children.length > 0) return;

    const cantidadPetalos = 12;
    for (let i = 0; i < cantidadPetalos; i++) {
        let petalo = document.createElement('div');
        petalo.classList.add('petalo-lirio-caida');
        petalo.style.left = `${Math.random() * 100}vw`;
        
        const escala = Math.random() * 0.4 + 0.6;
        const duracion = Math.random() * 6 + 7;
        const delay = Math.random() * 7;
        
        petalo.style.transform = `scale(${escala})`;
        petalo.style.animationDuration = `${duracion}s`;
        petalo.style.animationDelay = `${delay}s`;
        
        contenedor.appendChild(petalo);
    }
}

function crearMotesLuzTarde() {
    const contenedor = document.getElementById('contenedor-motes-tarde');
    if (!contenedor || contenedor.children.length > 0) return;

    const cantidadMotes = 18;
    for (let i = 0; i < cantidadMotes; i++) {
        let mote = document.createElement('div');
        mote.classList.add('mote-dorado');
        
        const tamano = Math.random() * 5 + 3;
        mote.style.width = `${tamano}px`;
        mote.style.height = `${tamano}px`;
        mote.style.left = `${Math.random() * 100}vw`;
        
        const duracion = Math.random() * 8 + 9;
        const delay = Math.random() * 10;
        
        mote.style.animationDuration = `${duracion}s`;
        mote.style.animationDelay = `${delay}s`;
        
        contenedor.appendChild(mote);
    }
}

function actualizarWidgetCapsulaTarde() {
    const ahora = new Date();
    
    const opcionesDia = { weekday: 'long' };
    let diaNom = ahora.toLocaleDateString('es-ES', opcionesDia);
    diaNom = diaNom.charAt(0).toUpperCase() + diaNom.slice(1);
    
    const elemDia = document.getElementById('tarde-dia-semana');
    if (elemDia) elemDia.textContent = `Hoy es ${diaNom}`;
    
    const opcionesFecha = { day: 'numeric', month: 'long', year: 'numeric' };
    const fechaCompleta = ahora.toLocaleDateString('es-ES', opcionesFecha);
    
    const elemFecha = document.getElementById('tarde-fecha-completa');
    if (elemFecha) elemFecha.textContent = fechaCompleta;
    
    const horas = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    
    const elemHora = document.getElementById('tarde-reloj-hora');
    if (elemHora) elemHora.textContent = `${horas}:${minutos}`;
}

function crearTextoFlotanteTarde(x, y, texto) {
    const escenaTarde = document.getElementById('escena-tarde');
    if (!escenaTarde) return;

    const msg = document.createElement('div');
    msg.classList.add('mensaje-tarde-flotante');
    msg.textContent = texto;
    msg.style.left = `${x}px`;
    msg.style.top = `${y}px`;

    escenaTarde.appendChild(msg);

    setTimeout(() => {
        msg.remove();
    }, 2400);
}

function lanzarRafagaPetalosTarde(x, y) {
    const contenedor = document.getElementById('contenedor-petalos-tarde');
    if (!contenedor) return;

    for (let i = 0; i < 10; i++) {
        let petalo = document.createElement('div');
        petalo.classList.add('petalo-lirio-caida');
        petalo.style.left = `${x + (Math.random() * 80 - 40)}px`;
        petalo.style.top = `${y + (Math.random() * 40 - 20)}px`;
        
        const escala = Math.random() * 0.5 + 0.7;
        petalo.style.transform = `scale(${escala})`;
        petalo.style.animationDuration = `${Math.random() * 2 + 2.5}s`;

        contenedor.appendChild(petalo);
        setTimeout(() => petalo.remove(), 3800);
    }
}

function inicializarInteraccionesTarde() {
    if (window.tardeInteraccionesIniciadas) return;
    window.tardeInteraccionesIniciadas = true;

    const sol = document.getElementById('sol-tarde-interactivo');
    const montanas = document.getElementById('montanas-tarde-interactivas');
    const pasto = document.getElementById('pasto-tarde-svg');
    const lirios = document.getElementById('lirios-tarde-interactivos');

    sol?.addEventListener('click', (e) => {
        e.stopPropagation();
        e.stopImmediatePropagation();
        sol.classList.remove('destello-activo-tarde');
        void sol.offsetWidth;
        sol.classList.add('destello-activo-tarde');
    });

    const frasesTarde = [
        "Disfruta de este bonito atardecer ♡",
        "Vas súper bien el día de hoy",
        "Tómate un momento para respirar",
        "Un abrazo cálido de tarde ✨",
        "Sonríe, la tarde es hermosa"
    ];

    const dispararMensajeUnico = (e) => {
        e.stopPropagation();
        e.stopImmediatePropagation();

        const posX = e.clientX || window.innerWidth / 2;
        const posY = e.clientY || window.innerHeight / 2;

        const textoAzar = frasesTarde[Math.floor(Math.random() * frasesTarde.length)];
        crearTextoFlotanteTarde(posX, posY, textoAzar);
    };

    montanas?.addEventListener('click', dispararMensajeUnico);
    pasto?.addEventListener('click', dispararMensajeUnico);

    lirios?.addEventListener('click', (e) => {
        e.stopPropagation();
        e.stopImmediatePropagation();
        lirios.classList.remove('toque-lirio');
        void lirios.offsetWidth;
        lirios.classList.add('toque-lirio');

        const posX = e.clientX || window.innerWidth / 2;
        const posY = e.clientY || window.innerHeight - 100;
        lanzarRafagaPetalosTarde(posX, posY);
    });
}

// =========================================================
// 5. SECCIÓN NOCHE
// =========================================================

function crearEstrellasNoche() {
    const contenedor = document.getElementById('contenedor-estrellas-noche');
    if (!contenedor || contenedor.children.length > 0) return;

    const totalEstrellas = 45;
    for (let i = 0; i < totalEstrellas; i++) {
        let estrella = document.createElement('div');
        estrella.classList.add('estrella-noche');

        estrella.style.left = `${Math.random() * 96 + 2}%`;
        estrella.style.top = `${Math.random() * 58 + 2}%`;

        const tam = Math.random() * 2.5 + 1.5;
        estrella.style.width = `${tam}px`;
        estrella.style.height = `${tam}px`;

        estrella.style.animationDuration = `${Math.random() * 3 + 2}s`;
        estrella.style.animationDelay = `${Math.random() * 3}s`;

        contenedor.appendChild(estrella);
    }
}

function crearLuciernagasNoche() {
    const contenedor = document.getElementById('contenedor-luciernagas-noche');
    if (!contenedor || contenedor.children.length > 0) return;

    const totalLuciernagas = 18;
    for (let i = 0; i < totalLuciernagas; i++) {
        let luc = document.createElement('div');
        luc.classList.add('luciernaga');

        luc.style.left = `${Math.random() * 90 + 5}%`;
        luc.style.top = `${Math.random() * 45 + 45}%`;

        const dur = Math.random() * 4 + 4;
        luc.style.animationDuration = `${dur}s`;
        luc.style.animationDelay = `${Math.random() * 3}s`;

        contenedor.appendChild(luc);
    }
}

function crearPetalosHortensiaNoche() {
    const contenedor = document.getElementById('contenedor-petalos-noche');
    if (!contenedor || contenedor.children.length > 0) return;

    const cantidadPetalos = 12;
    for (let i = 0; i < cantidadPetalos; i++) {
        let petalo = document.createElement('div');
        petalo.classList.add('petalo-hortensia-caida');
        
        petalo.style.left = `${Math.random() * 100}vw`;
        
        const escala = Math.random() * 0.4 + 0.6;
        const duracion = Math.random() * 6 + 7;
        const delay = Math.random() * 8;
        
        petalo.style.transform = `scale(${escala})`;
        petalo.style.animationDuration = `${duracion}s`;
        petalo.style.animationDelay = `${delay}s`;
        
        contenedor.appendChild(petalo);
    }
}

function actualizarWidgetCapsulaNoche() {
    const ahora = new Date();
    
    const opcionesDia = { weekday: 'long' };
    let diaNom = ahora.toLocaleDateString('es-ES', opcionesDia);
    diaNom = diaNom.charAt(0).toUpperCase() + diaNom.slice(1);
    
    const elemDia = document.getElementById('noche-dia-semana');
    if (elemDia) elemDia.textContent = `Hoy es ${diaNom}`;
    
    const opcionesFecha = { day: 'numeric', month: 'long', year: 'numeric' };
    const fechaCompleta = ahora.toLocaleDateString('es-ES', opcionesFecha);
    
    const elemFecha = document.getElementById('noche-fecha-completa');
    if (elemFecha) elemFecha.textContent = fechaCompleta;
    
    const horas = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    
    const elemHora = document.getElementById('noche-reloj-hora');
    if (elemHora) elemHora.textContent = `${horas}:${minutos}`;
}

function inicializarInteraccionesNoche() {
    const luna = document.querySelector('.luna-wrapper');
    const lunaSvg = document.querySelector('.luna-creciente-svg');
    const montanas = document.getElementById('montanas-noche-interactivas');
    const hortensias = document.getElementById('hortensias-noche-interactivas');

    luna?.addEventListener('click', () => {
        if (!lunaSvg) return;
        lunaSvg.classList.remove('destello-luna-activo');
        void lunaSvg.offsetWidth;
        lunaSvg.classList.add('destello-luna-activo');
    });

    const frasesNoche = [
        "Que descanses bonito ♡",
        "Eres mi último pensamiento del día",
        "Estrellas para acompañar tu noche ✨",
        "Sueña con los ángeles",
        "Mañana será un día increíble"
    ];

    montanas?.addEventListener('click', (e) => {
        montanas.classList.remove('toque-montana-noche');
        void montanas.offsetWidth;
        montanas.classList.add('toque-montana-noche');

        const rect = montanas.getBoundingClientRect();
        const posX = e.clientX || (rect.left + rect.width / 2);
        const posY = e.clientY || (rect.top + 40);

        const textoAzar = frasesNoche[Math.floor(Math.random() * frasesNoche.length)];
        crearTextoFlotanteNoche(posX, posY, textoAzar);
    });

    hortensias?.addEventListener('click', (e) => {
        hortensias.classList.remove('toque-hortensia-noche');
        void hortensias.offsetWidth;
        hortensias.classList.add('toque-hortensia-noche');

        const posX = e.clientX || window.innerWidth / 2;
        const posY = e.clientY || window.innerHeight - 120;
        lanzarRafagaNoche(posX, posY);
    });
}

function crearTextoFlotanteNoche(x, y, texto) {
    const escenaNoche = document.getElementById('escena-noche');
    if (!escenaNoche) return;

    const msg = document.createElement('div');
    msg.classList.add('mensaje-noche-flotante');
    msg.textContent = texto;
    msg.style.left = `${x}px`;
    msg.style.top = `${y}px`;

    escenaNoche.appendChild(msg);

    setTimeout(() => {
        msg.remove();
    }, 2400);
}

function lanzarRafagaNoche(x, y) {
    const contenedorLuciernagas = document.getElementById('contenedor-luciernagas-noche');
    const contenedorPetalos = document.getElementById('contenedor-petalos-noche');

    if (contenedorLuciernagas) {
        for (let i = 0; i < 8; i++) {
            let luc = document.createElement('div');
            luc.classList.add('luciernaga');
            luc.style.left = `${x + (Math.random() * 100 - 50)}px`;
            luc.style.top = `${y + (Math.random() * 60 - 30)}px`;
            luc.style.animationDuration = `${Math.random() * 2 + 2}s`;
            
            contenedorLuciernagas.appendChild(luc);
            setTimeout(() => luc.remove(), 3500);
        }
    }

    if (contenedorPetalos) {
        for (let i = 0; i < 8; i++) {
            let petalo = document.createElement('div');
            petalo.classList.add('petalo-hortensia-caida');
            petalo.style.left = `${x + (Math.random() * 80 - 40)}px`;
            petalo.style.top = `${y + (Math.random() * 40 - 20)}px`;
            
            const escala = Math.random() * 0.5 + 0.7;
            petalo.style.transform = `scale(${escala})`;
            petalo.style.animationDuration = `${Math.random() * 2 + 2.5}s`;

            contenedorPetalos.appendChild(petalo);
            setTimeout(() => petalo.remove(), 3800);
        }
    }
}

// =========================================================
// 6. BOTONERA DE PRUEBAS MANUAL
// =========================================================

function cambiarEscenaManual(momento) {
    if (typeof pantallaPortada !== 'undefined' && pantallaPortada) {
        pantallaPortada.classList.remove('activa');
        pantallaPortada.classList.add('oculta');
    }
    if (typeof pantallaEscena !== 'undefined' && pantallaEscena) {
        pantallaEscena.classList.remove('oculta');
        pantallaEscena.classList.add('activa');
    }

    document.querySelectorAll('.capa-momento').forEach(el => el.style.display = 'none');

    const escena = document.getElementById(`escena-${momento}`);
    if (escena) escena.style.display = 'block';

    const fecha = new Date();
    const dia = fecha.getDay();
    let mensajeTexto = "Que tengas un momento maravilloso ♡";

    if (typeof mensajes !== 'undefined' && mensajes[dia] && mensajes[dia][momento]) {
        mensajeTexto = mensajes[dia][momento];
    }

    const idMensaje = momento === 'manana' ? 'texto-mensaje' : `texto-mensaje-${momento}`;
    const elemMsg = document.getElementById(idMensaje);
    if (elemMsg) elemMsg.textContent = mensajeTexto;

    if (typeof actualizarWidgetCapsulaManana === 'function') actualizarWidgetCapsulaManana();
    if (typeof actualizarWidgetCapsulaTarde === 'function') actualizarWidgetCapsulaTarde();
    if (typeof actualizarWidgetCapsulaNoche === 'function') actualizarWidgetCapsulaNoche();
}

// =========================================================
// 7. INICIALIZACIÓN GENERAL Y TIMERS
// =========================================================

// Generar partículas iniciales
crearPetalos();
crearParticulasLuz();

// Cargar estado inicial de widgets y escenas
actualizarEscena();
actualizarWidgetTiempo();

// Mañana
crearMotasSol();
crearPetalosGirasolManana();
actualizarWidgetCapsulaManana();
inicializarInteraccionesManana();

// Tarde
actualizarMensajeTarde();
crearPetalosLirioTarde();
crearMotesLuzTarde();
actualizarWidgetCapsulaTarde();
inicializarInteraccionesTarde();

// Noche
crearEstrellasNoche();
crearLuciernagasNoche();
crearPetalosHortensiaNoche();
actualizarWidgetCapsulaNoche();
inicializarInteraccionesNoche();

// Timers en vivo
setInterval(actualizarWidgetTiempo, 1000);
setInterval(actualizarWidgetCapsulaManana, 1000);
setInterval(actualizarWidgetCapsulaTarde, 1000);
setInterval(actualizarWidgetCapsulaNoche, 1000);

setInterval(() => {
    if (appIniciada) {
        actualizarEscena();
    }
}, 60000);

// =========================================================
// MÚSICA DE FONDO (VOLUMEN SUAVE + INTEGRACIÓN A WIDGETS)
// =========================================================
const infoCanciones = {
    manana: {
        archivo: 'audio/manana.mp3',
        titulo: 'A Head Full of Dreams',
        artista: 'Coldplay'
    },
    tarde: {
        archivo: 'audio/tarde.mp3',
        titulo: 'You Are in Love',
        artista: 'Taylor Swift'
    },
    noche: {
        archivo: 'audio/noche.mp3',
        titulo: 'All My Love',
        artista: 'Coldplay'
    }
};

function reproducirMusicaHorario(momento) {
    const reproductor = document.getElementById('musica-fondo');
    if (!reproductor || !infoCanciones[momento]) return;

    const datos = infoCanciones[momento];

    if (!reproductor.src.includes(datos.archivo)) {
        reproductor.src = datos.archivo;
        reproductor.volume = 0.20; // Volumen ambiental tenue al 20%
        reproductor.play().catch(e => console.log("Autoplay bloqueado:", e));
    }

    actualizarTextoCancionWidget(momento);
}

function actualizarTextoCancionWidget(momento) {
    const datos = infoCanciones[momento];
    if (!datos) return;

    document.querySelectorAll('.cancion-titulo-widget').forEach(el => {
        el.textContent = `${datos.titulo} — ${datos.artista}`;
    });
}

// Integración a la botonera manual de pruebas
function cambiarEscenaManual(momento) {
    if (typeof pantallaPortada !== 'undefined' && pantallaPortada) {
        pantallaPortada.classList.remove('activa');
        pantallaPortada.classList.add('oculta');
    }
    if (typeof pantallaEscena !== 'undefined' && pantallaEscena) {
        pantallaEscena.classList.remove('oculta');
        pantallaEscena.classList.add('activa');
    }

    document.querySelectorAll('.capa-momento').forEach(el => el.style.display = 'none');

    const escena = document.getElementById(`escena-${momento}`);
    if (escena) escena.style.display = 'block';

    const fecha = new Date();
    const dia = fecha.getDay();
    let mensajeTexto = "Que tengas un momento maravilloso ♡";

    if (typeof mensajes !== 'undefined' && mensajes[dia] && mensajes[dia][momento]) {
        mensajeTexto = mensajes[dia][momento];
    }

    const idMensaje = momento === 'manana' ? 'texto-mensaje' : `texto-mensaje-${momento}`;
    const elemMsg = document.getElementById(idMensaje);
    if (elemMsg) elemMsg.textContent = mensajeTexto;

    // Cambiar la canción al presionar los botones Mañana/Tarde/Noche
    reproducirMusicaHorario(momento);

    if (typeof actualizarWidgetCapsulaManana === 'function') actualizarWidgetCapsulaManana();
    if (typeof actualizarWidgetCapsulaTarde === 'function') actualizarWidgetCapsulaTarde();
    if (typeof actualizarWidgetCapsulaNoche === 'function') actualizarWidgetCapsulaNoche();
}

// =========================================================
// CONTROL Y SINCRONIZACIÓN DE BARRA DE PROGRESO
// =========================================================
function inicializarControlesProgreso() {
    const reproductor = document.getElementById('musica-fondo');
    const sliders = document.querySelectorAll('.slider-progreso-musica');

    if (!reproductor) return;

    // 1. Actualizar la posición de la barra conforme avanza la música (0% a 100%)
    reproductor.addEventListener('timeupdate', () => {
        if (reproductor.duration) {
            const porcentaje = (reproductor.currentTime / reproductor.duration) * 100;
            sliders.forEach(slider => {
                slider.value = porcentaje;
            });
        }
    });

    // 2. Permitir al usuario arrastrar la barra para cambiar el segundo exacto
    sliders.forEach(slider => {
        slider.addEventListener('input', (e) => {
            if (reproductor.duration) {
                const nuevoTiempo = (e.target.value / 100) * reproductor.duration;
                reproductor.currentTime = nuevoTiempo;
            }
        });
    });
}

// Iniciar escuchadores al cargar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarControlesProgreso);
} else {
    inicializarControlesProgreso();
}
/* ============================================================
   marIA VO - CÓDIGO UNIFICADO (MEMORIA + MANUALES LOCALES)
   BÚSQUEDA INDEXADA POR SUB-STRINGS
   ============================================================ */

let currentImageB64 = null;
let previewObjectUrl = null;

const INDICE_CONOCIMIENTO = [
  { archivo: "base_de_conocimiento/agua.txt", titulo: "Calidad del agua", raices: ["agua", "calidad del agua", "cloro", "dureza del agua", "agua de riego"] },
  { archivo: "base_de_conocimiento/almacenamiento.txt", titulo: "Almacenamiento a largo plazo", raices: ["almacenamiento", "guardar", "conservacion", "conservar", "guardado"] },
  { archivo: "base_de_conocimiento/cannabinoides.txt", titulo: "Cannabinoides", raices: ["cannabinoides", "thc", "cbd", "cbg", "cbn", "thcv"] },
  { archivo: "base_de_conocimiento/catas.txt", titulo: "Cómo catar cannabis", raices: ["cata", "catas", "catar", "degustacion", "degustar", "evaluar aroma", "evaluar sabor", "nariz", "paladar"] },
  { archivo: "base_de_conocimiento/clonacion_esquejes.txt", titulo: "Clonación y esquejes", raices: ["clonacion", "esquejes", "esqueje", "clon", "clones", "enraizar"] },
  { archivo: "base_de_conocimiento/coco.txt", titulo: "Cultivo en fibra de coco", raices: ["coco", "fibra de coco", "coco coir"] },
  { archivo: "base_de_conocimiento/comestibles.txt", titulo: "Comestibles / edibles", raices: ["comestibles", "edibles", "comida", "descarboxilacion", "brownie"] },
  { archivo: "base_de_conocimiento/cosecha.txt", titulo: "Cómo y cuándo cosechar", raices: ["cosecha", "cosechar", "corte", "cortar"] },
  { archivo: "base_de_conocimiento/curado.txt", titulo: "Curado en frascos", raices: ["curado", "curar", "frasco", "burping"] },
  { archivo: "base_de_conocimiento/deficiencias.txt", titulo: "Deficiencias nutricionales", raices: ["deficiencia", "deficiencias", "amarillas", "carencia", "clorosis"] },
  { archivo: "base_de_conocimiento/defoliacion.txt", titulo: "Defoliación", raices: ["defoliacion", "defoliar", "sacar hojas"] },
  { archivo: "base_de_conocimiento/engorde.txt", titulo: "Engorde final de cogollos", raices: ["engorde", "engordar", "cogollos", "peso"] },
  { archivo: "base_de_conocimiento/enrruladas.txt", titulo: "Hojas enrruladas/curvadas", raices: ["enrruladas", "enrulada", "hojas curvadas", "hojas rizadas", "garra"] },
  { archivo: "base_de_conocimiento/errores.txt", titulo: "Errores comunes", raices: ["errores", "error", "problemas comunes", "me equivoque"] },
  { archivo: "base_de_conocimiento/espacio_armario_carpa.txt", titulo: "Elección de espacio indoor", raices: ["espacio", "armario", "carpa", "grow tent", "placard"] },
  { archivo: "base_de_conocimiento/estres_luminico_termico.txt", titulo: "Estrés lumínico y térmico", raices: ["estres", "estres luminico", "estres termico", "quemado por luz"] },
  { archivo: "base_de_conocimiento/excesos.txt", titulo: "Excesos nutricionales", raices: ["exceso", "excesos", "sobrefertilizacion", "quemado", "nutrient burn"] },
  { archivo: "base_de_conocimiento/extracciones.txt", titulo: "Extracciones y derivados", raices: ["extraccion", "extracciones", "concentrados"] },
  { archivo: "base_de_conocimiento/fases_vida_planta.txt", titulo: "Ciclo de vida de la planta", raices: ["fases", "etapas", "ciclo de vida", "vida de la planta"] },
  { archivo: "base_de_conocimiento/fertilizantes.txt", titulo: "Fertilizantes orgánicos vs. minerales", raices: ["fertilizante", "fertilizantes", "abono", "nutrientes"] },
  { archivo: "base_de_conocimiento/fotoperiodicas_autoflorecientes.txt", titulo: "Fotoperiódicas vs. autoflorecientes", raices: ["fotoperiodica", "autofloreciente", "auto"] },
  { archivo: "base_de_conocimiento/fotoperiodo.txt", titulo: "Fotoperiodo indoor", raices: ["fotoperiodo", "18 6", "12 12", "horas de luz"] },
  { archivo: "base_de_conocimiento/fumado_vaporizado.txt", titulo: "Fumado y vaporizado", raices: ["fumar", "fumado", "vaporizar", "vaporizado", "vape"] },
  { archivo: "base_de_conocimiento/fundamentos_cannabis.txt", titulo: "Qué es el cannabis", raices: ["cannabis", "botanica", "planta", "que es"] },
  { archivo: "base_de_conocimiento/geneticas_sativa_indica_rudelaris.txt", titulo: "Sativa, índica y ruderalis", raices: ["sativa", "indica", "ruderalis", "genetica"] },
  { archivo: "base_de_conocimiento/germinacion.txt", titulo: "Cómo germinar semillas", raices: ["germinacion", "germinar", "semilla", "brotar"] },
  { archivo: "base_de_conocimiento/hach_kief_rosin_aceites.txt", titulo: "Concentrados: hachís, kief, rosin, aceites", raices: ["hachis", "kief", "rosin", "aceites", "concentrados"] },
  { archivo: "base_de_conocimiento/herramientas.txt", titulo: "Herramientas básicas para cultivar", raices: ["herramientas", "equipamiento", "que necesito"] },
  { archivo: "base_de_conocimiento/hidroponia.txt", titulo: "Cultivo hidropónico", raices: ["hidroponia", "hidroponico", "dwc", "nft"] },
  { archivo: "base_de_conocimiento/iluminacion.txt", titulo: "Tipos de iluminación", raices: ["luz", "led", "hps", "mh", "iluminacion", "foco"] },
  { archivo: "base_de_conocimiento/lavado_raices.txt", titulo: "Lavado de raíces (flushing)", raices: ["lavado de raices", "flushing", "lavar raices"] },
  { archivo: "base_de_conocimiento/legales.txt", titulo: "Marco legal", raices: ["legal", "ley", "legislacion", "reprocann", "permiso"] },
  { archivo: "base_de_conocimiento/lollipopping.txt", titulo: "Poda de ramas bajas (lollipopping)", raices: ["lollipopping", "poda baja", "ramas bajas"] },
  { archivo: "base_de_conocimiento/lst.txt", titulo: "LST (Low Stress Training)", raices: ["lst", "low stress training", "doblado", "atar ramas"] },
  { archivo: "base_de_conocimiento/macronutrientes_micronutrientes.txt", titulo: "Macro y micronutrientes", raices: ["macronutrientes", "micronutrientes", "npk", "nitrogeno", "fosforo", "potasio"] },
  { archivo: "base_de_conocimiento/maduracion.txt", titulo: "Etapas de floración y maduración", raices: ["maduracion", "floracion", "etapas de floracion"] },
  { archivo: "base_de_conocimiento/manicurado.txt", titulo: "Manicurado", raices: ["manicurado", "recorte", "manicurar", "tijera"] },
  { archivo: "base_de_conocimiento/medicinal.txt", titulo: "Cannabis medicinal", raices: ["medicinal", "medicina", "terapeutico", "salud"] },
  { archivo: "base_de_conocimiento/nutricion.txt", titulo: "Nutrición y Abonos", raices: ["nutricion", "nutrientes", "fertilizar", "abono", "comida"] },
  { archivo: "base_de_conocimiento/olor.txt", titulo: "Control de olores", raices: ["olor", "olores", "filtro de carbon", "huele"] },
  { archivo: "base_de_conocimiento/outdoor.txt", titulo: "Cultivo outdoor", raices: ["outdoor", "exterior", "aire libre", "afuera"] },
  { archivo: "base_de_conocimiento/patologias.txt", titulo: "Patologías del cultivo (diagnóstico general)", raices: ["patologia", "patologias", "enfermedad", "enfermedades", "sintoma", "sintomas", "diagnostico", "que le pasa a mi planta", "hongo"] },
  { archivo: "base_de_conocimiento/ph_ec_ppm.txt", titulo: "pH y EC/PPM", raices: ["ph", "ec", "ppm", "conductividad"] },
  { archivo: "base_de_conocimiento/plagas.txt", titulo: "Plagas comunes", raices: ["plaga", "plagas", "araña", "mosca blanca", "trips", "bicho", "insecto"] },
  { archivo: "base_de_conocimiento/riego.txt", titulo: "Riego", raices: ["riego", "regar", "regué", "reguar", "cuanto regar"] },
  { archivo: "base_de_conocimiento/scrog.txt", titulo: "SCROG (Screen of Green)", raices: ["scrog", "screen of green", "malla", "red"] },
  { archivo: "base_de_conocimiento/secado.txt", titulo: "Secado", raices: ["secado", "secar", "colgar"] },
  { archivo: "base_de_conocimiento/sequito_entourage.txt", titulo: "Efecto séquito (entourage)", raices: ["sequito", "entourage", "efecto sequito"] },
  { archivo: "base_de_conocimiento/sexo.txt", titulo: "Identificar sexo de la planta", raices: ["sexo", "macho", "hembra", "sexado", "preflor"] },
  { archivo: "base_de_conocimiento/sistema_endocannabinoide.txt", titulo: "Sistema endocannabinoide", raices: ["endocannabinoide", "receptores", "cb1", "cb2"] },
  { archivo: "base_de_conocimiento/sustratos.txt", titulo: "Sustratos", raices: ["sustrato", "sustratos", "tierra", "mezcla"] },
  { archivo: "base_de_conocimiento/tablas_conceptos.txt", titulo: "Glosario y tabla de conceptos", raices: ["glosario", "conceptos", "definiciones", "que significa"] },
  { archivo: "base_de_conocimiento/temperatura_humedad_relativa.txt", titulo: "Temperatura y humedad relativa", raices: ["temperatura", "humedad", "clima", "grados"] },
  { archivo: "base_de_conocimiento/terpenos.txt", titulo: "Terpenos", raices: ["terpenos", "aroma", "mirceno", "limoneno", "pineno"] },
  { archivo: "base_de_conocimiento/tinturas_sublinguales_picos.txt", titulo: "Tinturas y sublinguales", raices: ["tinturas", "sublingual", "topicos", "gotas"] },
  { archivo: "base_de_conocimiento/tipos_semilla.txt", titulo: "Tipos de semillas", raices: ["semillas", "semilla", "feminizada", "regular", "autofloreciente"] },
  { archivo: "base_de_conocimiento/topping_fim.txt", titulo: "Topping y FIM", raices: ["topping", "fim", "poda apical", "punta"] },
  { archivo: "base_de_conocimiento/trasplante.txt", titulo: "Trasplante", raices: ["trasplante", "maceta", "tamaño de maceta", "trasplantar"] },
  { archivo: "base_de_conocimiento/tricomas.txt", titulo: "Tricomas y punto de cosecha", raices: ["tricomas", "punto de cosecha", "lupa", "ambar", "lechoso"] },
  { archivo: "base_de_conocimiento/ventilacion.txt", titulo: "Ventilación y extracción", raices: ["ventilacion", "extraccion de aire", "extractor", "intraccion"] }
];

const cacheArchivos = {};

window.addEventListener('load', async () => {
    inicializarChatConMemoria();
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        if (splash) {
            splash.style.opacity = '0';
            setTimeout(() => splash.style.display = 'none', 500);
        }
    }, 1200);
});

function inicializarChatConMemoria() {
    let nombreUsuario = localStorage.getItem('maria_usuario_nombre');
    let saludo = nombreUsuario ? `¡Hola de nuevo, **${nombreUsuario}**! 🍁 ¿Qué andás precisando consultar hoy?` : "¡Buenas! Soy marIA, tu asistente inteligente de cultivo. ¿Cómo te llamás?";
    agregarElementoMensaje(saludo, 'maria');
}

function scrollChatToBottom() {
    const chat = document.getElementById('chatMessages');
    if (chat) chat.scrollTop = chat.scrollHeight;
}

// MOTOR DE BÚSQUEDA POR SUB-STRINGS DIRECTO
async function buscarEnConocimiento(consulta) {
    const textoLower = consulta.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, '');

    let archivoEncontrado = null;
    let tituloEncontrado = "";

    for (let item of INDICE_CONOCIMIENTO) {
        const coincide = item.raices.some(raiz => {
            const raizNorm = raiz.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, '');
            return textoLower.includes(raizNorm);
        });

        if (coincide) {
            archivoEncontrado = item.archivo;
            tituloEncontrado = item.titulo;
            break; 
        }
    }

    if (!archivoEncontrado) return null;

    let contenido = cacheArchivos[archivoEncontrado];
    if (!contenido) {
        try {
            const response = await fetch(encodeURI(archivoEncontrado));
            if (!response.ok) return null;
            contenido = await response.text();
            cacheArchivos[archivoEncontrado] = contenido;
        } catch (error) {
            return null;
        }
    }

    let textoLimpio = contenido.replace(/[*_#`=-]/g, '').trim();
    let fragmentos = textoLimpio.split(/\n\s*\n/).map(f => f.trim()).filter(f => f.length > 15);

    let cuerpoRespuesta = fragmentos
        .map(parrafo => `<p style="font-size: 14px; line-height: 1.5; margin-bottom: 12px;">${parrafo}</p>`)
        .join('');

    return `<span style="font-size: 14px;">¡Dale, acá tenés la guía completa sobre esto:</span><br><br><span style="font-size: 15px; font-weight: bold;">📖 marIA — ${tituloEncontrado}</span><br><br>${cuerpoRespuesta}`;
}

async function enviarMensaje() {
    const input = document.getElementById('userInput');
    if (!input) return;
    const texto = input.value.trim();
    if (!texto) return;

    agregarElementoMensaje(texto, 'user');
    input.value = '';

    agregarCargando();
    scrollChatToBottom();

    setTimeout(async () => {
        quitarCargando();
        let respuestaFinal = await buscarEnConocimiento(texto);

        if (!respuestaFinal) {
            respuestaFinal = `No encuentro información sobre *"<i>${texto}</i>"* en mi base de conocimiento. 🌿`;
        }
        
        agregarElementoMensaje(respuestaFinal, 'maria');
        scrollChatToBottom();
    }, 400);
}

function agregarElementoMensaje(texto, emisor) {
    const chat = document.getElementById('chatMessages');
    if (!chat) return;
    const div = document.createElement('div');
    div.classList.add('message', emisor);

    const textContainer = document.createElement('div');
    textContainer.innerHTML = texto;
    div.appendChild(textContainer);

    chat.appendChild(div);
}

function agregarCargando() {
    const chat = document.getElementById('chatMessages');
    if (chat && !document.getElementById('loadingMessage')) {
        const loadingDiv = document.createElement('div');
        loadingDiv.id = 'loadingMessage';
        loadingDiv.innerHTML = `<span class="loading-text">Buscando</span>`;
        chat.appendChild(loadingDiv);
    }
}

function quitarCargando() {
    const loading = document.getElementById('loadingMessage');
    if (loading) loading.remove();
}

function handleKeyPress(event) {
    if (event.key === 'Enter') enviarMensaje();
}

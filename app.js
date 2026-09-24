/* ============================================================
   marIA VO - CÓDIGO UNIFICADO (MEMORIA + MANUALES LOCALES)
   BÚSQUEDA INDEXADA CON CARGA BAJO DEMANDA (LAZY LOAD)
   ============================================================ */

let currentImageB64 = null;
let previewObjectUrl = null;

/* ------------------------------------------------------------
   ÍNDICE LIVIANO DE CONOCIMIENTO
   Cada entrada = 1 archivo = 1 tema. NO carga contenido, solo
   metadata para poder matchear la consulta del usuario antes de
   ir a buscar el archivo puntual.
   ------------------------------------------------------------ */

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
  { archivo: "base_de_conocimiento/plagas.txt", titulo: "Plagas comunes", raices: ["plaga", "plagas", "araña roja", "mosca blanca", "trips", "bicho", "insecto"] },
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

const SINONIMOS = {
    "raiz": ["raiz", "raíces", "lavado de raíces", "flushing", "lavar"],
    "cosecha": ["cosecha", "cortar", "corte", "momento de corte", "madurez"],
    "tricomas": ["tricomas", "resina", "glándulas", "lechosos", "ámbar"],
    "plaga": ["plaga", "plagas", "botrytis", "oidio", "insectos", "araña roja"],
    "dolor": ["dolor", "analgésico", "reuma", "fibromialgia", "neuropático"],
    "legal": ["legal", "ley", "reprocann", "permiso", "habilitación"],
    "esqueje": ["esqueje", "esquejes", "clon", "clones"],
    "riego": ["riego", "reguar", "regué", "agua", "regar", "humedad", "suelo"],
    "exceso": ["exceso", "pasé", "pase", "saturación", "encharcado", "inundado"],
    "amarillas": ["amarillas", "amarilla", "clorosis", "decoloración"],
    "nutricion": ["nutricion", "nutrientes", "abono", "fertilizante", "comida", "npk", "quemadas"],
    "luz": ["luz", "foco", "led", "potencia", "calor", "fotoperiodo", "horas"],
    "germinacion": ["germinacion", "germinar", "semilla", "semillas", "plantula"],
    "clima": ["clima", "temperatura", "humedad", "ventilacion", "extraccion", "carpa"]
};

window.addEventListener('load', async () => {
    inicializarChatConMemoria();
    inicializarIndiceConocimiento();

    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        if (splash) {
            splash.style.opacity = '0';
            setTimeout(() => splash.style.display = 'none', 500);
        }
    }, 1200);
});

function inicializarIndiceConocimiento() {
    console.log(`[marIA] Índice cargado. Temas disponibles: ${INDICE_CONOCIMIENTO.length}`);
}

function inicializarChatConMemoria() {
    let nombreUsuario = localStorage.getItem('maria_usuario_nombre');
    let saludo = "";

    let datosBitacora = null;
    try {
        const rawBitacora = localStorage.getItem('maria_bitacora');
        if (rawBitacora) {
            datosBitacora = JSON.parse(rawBitacora);
        }
    } catch(e) {}

    if (nombreUsuario && datosBitacora && datosBitacora.planta) {
        saludo = `¡Hola de nuevo, **${nombreUsuario}**! 🍁 Veo que venís siguiendo tu planta **${datosBitacora.planta}** (${datosBitacora.etapa}). ¿Querés que revisemos la bitácora o tenés otra consulta?`;
    } else if (nombreUsuario) {
        saludo = `¡Hola de nuevo, **${nombreUsuario}**! 🍁 ¿Qué andás precisando consultar hoy?`;
    } else {
        saludo = "¡Buenas! Soy marIA, tu asistente inteligente de cultivo. ¿Cómo te llamás y de qué provincia me escribís?";
    }

    agregarElementoMensaje(saludo, 'maria');
}

function abrirBitacora() {
    const rawData = localStorage.getItem('maria_bitacora');

    if (rawData) {
        try {
            const data = JSON.parse(rawData);

            if (document.getElementById('bitPlanta')) document.getElementById('bitPlanta').value = data.planta || '';
            if (document.getElementById('bitDominancia')) document.getElementById('bitDominancia').value = data.dominancia || 'Híbrida';
            if (document.getElementById('bitMedio')) document.getElementById('bitMedio').value = data.medio || 'Sustrato / Tierra';
            if (document.getElementById('bitEtapa')) document.getElementById('bitEtapa').value = data.etapa || 'Vegetativo - Semana 1/2';
            if (document.getElementById('bitPh')) document.getElementById('bitPh').value = data.ph || '';
            if (document.getElementById('bitEc')) document.getElementById('bitEc').value = data.ec || '';
            if (document.getElementById('bitRiego')) document.getElementById('bitRiego').value = data.riego || '';
        } catch(e) {}
    }

    const modal = document.getElementById('bitacoraModal');
    if (modal) modal.style.display = 'flex';
}

function cerrarBitacora() {
    const modal = document.getElementById('bitacoraModal');
    if (modal) modal.style.display = 'none';
}

function guardarBitacora() {
    const bitacora = {
        planta: document.getElementById('bitPlanta') ? document.getElementById('bitPlanta').value.trim() : '',
        dominancia: document.getElementById('bitDominancia') ? document.getElementById('bitDominancia').value : '',
        medio: document.getElementById('bitMedio') ? document.getElementById('bitMedio').value : '',
        etapa: document.getElementById('bitEtapa') ? document.getElementById('bitEtapa').value : '',
        ph: document.getElementById('bitPh') ? document.getElementById('bitPh').value.trim() : '',
        ec: document.getElementById('bitEc') ? document.getElementById('bitEc').value.trim() : '',
        riego: document.getElementById('bitRiego') ? document.getElementById('bitRiego').value.trim() : ''
    };

    localStorage.setItem('maria_bitacora', JSON.stringify(bitacora));
    cerrarBitacora();
    alert("¡Bitácora de cultivo actualizada con éxito!");
}

function borrarBitacora() {
    if (confirm("¿Estás seguro de que querés borrar los datos de tu bitácora actual?")) {
        localStorage.removeItem('maria_bitacora');

        if (document.getElementById('bitPlanta')) document.getElementById('bitPlanta').value = '';
        if (document.getElementById('bitPh')) document.getElementById('bitPh').value = '';
        if (document.getElementById('bitEc')) document.getElementById('bitEc').value = '';
        if (document.getElementById('bitRiego')) document.getElementById('bitRiego').value = '';

        cerrarBitacora();
        alert("Bitácora reiniciada.");
    }
}

function scrollChatToBottom() {
    const chat = document.getElementById('chatMessages');
    if (chat) chat.scrollTop = chat.scrollHeight;
}

/* ============================================================
   MOTOR DE BÚSQUEDA CORREGIDO
   ============================================================ */

function normalizarTexto(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function escaparRegExp(texto) {
    return texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function puntuarFragmentoBusqueda(fragmento, conceptos, consultaNormalizada) {
    const texto = normalizarTexto(fragmento);

    if (!texto) return 0;

    let score = 0;

    if (consultaNormalizada.length >= 8 && texto.includes(consultaNormalizada)) {
        score += 80;
    }

    const encontrados = conceptos.filter(concepto => {
        if (concepto.length <= 2) {
            return new RegExp(`\\b${escaparRegExp(concepto)}\\b`, 'i').test(texto);
        }

        return texto.includes(concepto);
    });

    encontrados.forEach(concepto => {
        score += concepto.length >= 6 ? 12 : 6;
    });

    if (encontrados.length >= 2) score += 25;
    if (encontrados.length >= 3) score += 35;

    return score;
}

async function buscarEnConocimiento(consulta) {
    const consultaNormalizada = normalizarTexto(consulta);

    if (!consultaNormalizada) return null;

    const STOPWORDS = new Set([
        "que", "como", "cual", "cuales",
        "para", "por", "con", "sin", "una", "uno", "unos", "unas",
        "los", "las", "del", "de", "la", "el", "en", "un", "y",
        "es", "son", "se", "me", "mi", "mis", "tu", "tus",
        "hay", "puedo", "puede", "debo", "deberia",
        "tengo", "tiene", "hacer", "hago", "hacerlo", "sobre",
        "donde", "cuando", "esta", "este", "esto",
        "esa", "ese", "eso", "muy", "mas", "al", "lo"
    ]);

    const palabras = consultaNormalizada
        .split(/\s+/)
        .filter(p => p.length > 2 && !STOPWORDS.has(p));

    if (palabras.length === 0) return null;

    const conceptos = new Set(palabras);

    palabras.forEach(palabra => {
        for (const clave in SINONIMOS) {
            const grupo = SINONIMOS[clave].map(normalizarTexto);

            if (
                clave === palabra ||
                grupo.includes(palabra) ||
                grupo.some(sinonimo =>
                    sinonimo.includes(palabra) || palabra.includes(sinonimo)
                )
            ) {
                conceptos.add(normalizarTexto(clave));

                grupo.forEach(sinonimo => {
                    if (sinonimo.length > 3 && sinonimo.split(' ').length === 1) {
                        conceptos.add(sinonimo);
                    }
                });
            }
        }
    });

    const conceptosArray = [...conceptos];

    /* ---------------------------------------------------------
       PASO 1:
       Buscar TODOS los candidatos.
       --------------------------------------------------------- */

    const candidatos = INDICE_CONOCIMIENTO
        .map(item => {
            const titulo = normalizarTexto(item.titulo);
            const raices = item.raices.map(normalizarTexto);

            let score = 0;
            let coincidenciasFuertes = 0;

            raices.forEach(raiz => {
                if (!raiz) return;

                if (consultaNormalizada.includes(raiz)) {
                    score += 100 + Math.min(raiz.length, 30);
                    coincidenciasFuertes++;
                }

                if (titulo === raiz) {
                    score += 70;
                } else if (titulo.includes(raiz)) {
                    score += 35;
                }
            });

            conceptosArray.forEach(concepto => {
                if (!concepto) return;

                if (titulo === concepto) {
                    score += 80;
                    coincidenciasFuertes++;
                } else if (titulo.includes(concepto)) {
                    score += 35;
                }

                raices.forEach(raiz => {
                    if (raiz === concepto) {
                        score += 55;
                        coincidenciasFuertes++;
                    } else if (
                        raiz.length >= 4 &&
                        (raiz.includes(concepto) || concepto.includes(raiz))
                    ) {
                        score += 15;
                    }
                });
            });

            const conceptosCoincidentes = conceptosArray.filter(concepto =>
                raices.some(raiz =>
                    raiz === concepto ||
                    (
                        raiz.length >= 4 &&
                        (raiz.includes(concepto) || concepto.includes(raiz))
                    )
                )
            );

            if (conceptosCoincidentes.length >= 2) score += 45;
            if (conceptosCoincidentes.length >= 3) score += 50;

            return {
                ...item,
                score,
                coincidenciasFuertes,
                conceptosCoincidentes
            };
        })
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score);

    if (candidatos.length === 0) return null;

    /* ---------------------------------------------------------
       PASO 2:
       Se revisan los mejores candidatos dentro de sus TXT.
       --------------------------------------------------------- */

    const candidatosParaLeer = candidatos.slice(0, 5);
    const evidencias = [];

    for (const candidato of candidatosParaLeer) {
        let contenido = cacheArchivos[candidato.archivo];

        if (!contenido) {
            try {
                const response = await fetch(encodeURI(candidato.archivo));

                if (!response.ok) {
                    console.error(`[marIA] No se pudo cargar: ${candidato.archivo}`);
                    continue;
                }

                contenido = await response.text();
                cacheArchivos[candidato.archivo] = contenido;
            } catch (error) {
                console.error(`[marIA] Error al cargar: ${candidato.archivo}`, error);
                continue;
            }
        }

        const contenidoNormalizado = normalizarTexto(contenido);

        let evidenciaScore = 0;

        conceptosArray.forEach(concepto => {
            if (concepto.length <= 2) {
                if (
                    new RegExp(
                        `\\b${escaparRegExp(concepto)}\\b`,
                        'i'
                    ).test(contenidoNormalizado)
                ) {
                    evidenciaScore += 8;
                }
            } else if (contenidoNormalizado.includes(concepto)) {
                evidenciaScore += concepto.length >= 6 ? 15 : 8;
            }
        });

        if (
            consultaNormalizada.length >= 8 &&
            contenidoNormalizado.includes(consultaNormalizada)
        ) {
            evidenciaScore += 80;
        }

        const fragmentos = contenido
            .split(/\n\s*\n/)
            .map(f => f.trim())
            .filter(f => f.length > 30);

        const fragmentosPuntuados = fragmentos
            .map(fragmento => ({
                texto: fragmento,
                score: puntuarFragmentoBusqueda(
                    fragmento,
                    conceptosArray,
                    consultaNormalizada
                )
            }))
            .filter(f => f.score > 0)
            .sort((a, b) => b.score - a.score);

        const mejorFragmento = fragmentosPuntuados[0] || null;

        if (mejorFragmento) {
            evidenciaScore += mejorFragmento.score;
        }

        evidencias.push({
            ...candidato,
            contenido,
            evidenciaScore,
            mejorFragmento
        });
    }

    if (evidencias.length === 0) return null;

    /* ---------------------------------------------------------
       PASO 3:
       Ganador final con el texto completo conservado.
       --------------------------------------------------------- */

    evidencias.sort((a, b) => {
        const totalA = a.score + a.evidenciaScore;
        const totalB = b.score + b.evidenciaScore;

        return totalB - totalA;
    });

    const mejor = evidencias[0];
    const puntajeFinal = mejor.score + mejor.evidenciaScore;

    if (!mejor.mejorFragmento || puntajeFinal < 25) {
        console.log(
            `[marIA] Match insuficiente. ` +
            `Mejor archivo: ${mejor.archivo} | ` +
            `Puntaje: ${puntajeFinal}`
        );

        return null;
    }

    const textoFragmento = mejor.mejorFragmento.texto.trim();

    console.log(
        `[marIA] Consulta: "${consulta}" | ` +
        `Archivo elegido: ${mejor.archivo} | ` +
        `Score índice: ${mejor.score} | ` +
        `Evidencia: ${mejor.evidenciaScore} | ` +
        `Total: ${puntajeFinal}`
    );

    return `📖 **marIA — ${mejor.titulo}**\n\n${textoFragmento}`;
}

/* ============================================================
   ENVÍO DE MENSAJES
   ============================================================ */

async function enviarMensaje() {
    const input = document.getElementById('userInput');

    if (!input) return;

    const texto = input.value.trim();

    if (!texto && !currentImageB64) return;

    const previewUrlEnviar = previewObjectUrl;

    currentImageB64 = null;
    previewObjectUrl = null;

    agregarElementoMensaje(texto, 'user', previewUrlEnviar);

    input.value = '';

    const fileInput = document.getElementById('fileInput');
    if (fileInput) fileInput.value = '';

    const imgPreview = document.getElementById('imgPreview');
    if (imgPreview) imgPreview.src = '';

    const previewContainer = document.getElementById('previewContainer');
    if (previewContainer) previewContainer.style.display = 'none';

    const clipBtn = document.getElementById('clipBtn');
    if (clipBtn) clipBtn.classList.remove('has-file');

    agregarCargando();
    scrollChatToBottom();

    setTimeout(async () => {
        quitarCargando();

        let respuestaFinal = null;
        const textoLower = texto.toLowerCase();

        if (
            textoLower.includes('soy ') ||
            textoLower.includes('me llamo ')
        ) {
            const partes = texto.split(/soy |me llamo /i);

            if (partes[1]) {
                let nombreDetectado = partes[1]
                    .trim()
                    .split(' ')[0];

                nombreDetectado =
                    nombreDetectado.charAt(0).toUpperCase() +
                    nombreDetectado.slice(1);

                localStorage.setItem(
                    'maria_usuario_nombre',
                    nombreDetectado
                );

                respuestaFinal =
                    `¡Un gusto, **${nombreDetectado}**! 🍁 ` +
                    `Ya tomé nota de tu nombre. ` +
                    `¿Qué dudas tenés hoy con los manuales?`;
            }
        }

        if (!respuestaFinal) {
            const palabrasUsuario = textoLower
                .replace(/[¿?¡!.,]/g, '')
                .trim()
                .split(/\s+/);

            const primeraPalabra = palabrasUsuario[0] || "";

            const esSaludo =
                textoLower.includes('hola') ||
                textoLower.includes('buen dia') ||
                textoLower.includes('que tal') ||
                textoLower.includes('buenas');

            const palabrasCierre = [
                'gracias',
                'genial',
                'perfecto',
                'listo',
                'listos',
                'chau'
            ];

            const esAgradecimientoAlInicio =
                palabrasCierre.includes(primeraPalabra);

            const nombreUsuario =
                localStorage.getItem('maria_usuario_nombre') ||
                "cultivador";

            if (esSaludo) {
                respuestaFinal =
                    `¡Todo en orden por acá, **${nombreUsuario}**!. ` +
                    `¿Qué andás precisando consultar hoy?`;
            } else if (esAgradecimientoAlInicio) {
                respuestaFinal =
                    `¡De nada, **${nombreUsuario}**! ` +
                    `Me alegro que haya servido. ` +
                    `Avisame cualquier otra duda que tengas y le metemos. 🌿`;
            } else {
                respuestaFinal = await buscarEnConocimiento(texto);
            }
        }

        if (!respuestaFinal) {
            respuestaFinal =
                `No encuentro información sobre *"<i>${texto}</i>"* ` +
                `en mi base de conocimiento de CATABOOK. ` +
                `Podés consultarme sobre cultivo, plagas, esquejes, ` +
                `recetas o legislación y te buscaré la información exacta. 🌿`;
        }

        agregarElementoMensaje(respuestaFinal, 'maria');
        scrollChatToBottom();

    }, 600);
}

/* ============================================================
   MENSAJES
   ============================================================ */

function agregarElementoMensaje(texto, emisor, urlImagen = null) {
    const chat = document.getElementById('chatMessages');

    if (!chat) return;

    const div = document.createElement('div');
    div.classList.add('message', emisor);

    if (urlImagen) {
        const img = document.createElement('img');

        img.src = urlImagen;
        img.className = 'chat-img';

        div.appendChild(img);
    }

    if (emisor === 'maria') {
        const textContainer = document.createElement('div');

        if (typeof marked !== 'undefined') {
            textContainer.innerHTML = marked.parse(texto);
        } else {
            textContainer.innerHTML = texto;
        }

        div.appendChild(textContainer);

    } else if (texto) {
        const textContainer = document.createElement('div');

        textContainer.textContent = texto;

        div.appendChild(textContainer);
    }

    chat.appendChild(div);
}

function agregarCargando() {
    const chat = document.getElementById('chatMessages');

    if (chat && !document.getElementById('loadingMessage')) {
        const loadingDiv = document.createElement('div');

        loadingDiv.id = 'loadingMessage';

        loadingDiv.innerHTML = `
            <span class="loading-text">Buscando</span>
            <div class="neon-dots">
                <span class="dot dot-1"></span>
                <span class="dot dot-2"></span>
                <span class="dot dot-3"></span>
            </div>
        `;

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

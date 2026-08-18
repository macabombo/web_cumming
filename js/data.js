/* ============================================
   MI CUMMING - Datos Geoespaciales
   ============================================ */

// Centro del mapa: Calle Cumming, Barrio Yungay, Santiago
const MAP_CENTER = [-33.4415, -70.6535];
const DEFAULT_ZOOM = 15;

// Coordenadas de Calle Cumming (trazado aproximado)
const CUMMING_COORDS = [
    [-33.4395, -70.6545],
    [-33.4400, -70.6540],
    [-33.4410, -70.6537],
    [-33.4420, -70.6533],
    [-33.4430, -70.6530],
    [-33.4440, -70.6527],
];

// Barrios del sector
const BARRIOS = {
    yungay: {
        nombre: "Barrio Yungay",
        color: "#3D6B5A",
        coords: [
            [-33.4385, -70.6560],
            [-33.4385, -70.6510],
            [-33.4445, -70.6510],
            [-33.4445, -70.6560],
        ]
    },
    brasil: {
        nombre: "Barrio Brasil",
        color: "#6B3A2A",
        coords: [
            [-33.4385, -70.6510],
            [-33.4385, -70.6460],
            [-33.4445, -70.6460],
            [-33.4445, -70.6510],
        ]
    },
    quintanormal: {
        nombre: "Parque Quinta Normal",
        color: "#2D6B3E",
        coords: [
            [-33.4370, -70.6620],
            [-33.4370, -70.6530],
            [-33.4450, -70.6530],
            [-33.4450, -70.6620],
        ]
    }
};

// ============================================
// PUNTOS DE INTERÉS
// ============================================
const PUNTOS_INTERES = [
    // PATRIMONIO
    {
        id: 1,
        nombre: "Plaza Yungay",
        categoria: "patrimonio",
        icono: "fas fa-landmark",
        color: "#8B6914",
        coords: [-33.4405, -70.6538],
        descripcion: "Una de las plazas más emblemáticas de Santiago, bautizada en honor a la Batalla de Yungay (1839). Centro histórico del Barrio Yungay.",
        direccion: "Plaza Yungay, Barrio Yungay",
        horario: "Abierto 24 horas",
        historia: "La plaza fue designada Zona Típica en 1985, protegiendo su arquitectura patrimonial. En ella se encuentra la Fuente Alemana, obsequio de la comunidad alemana en 1913.",
        dificultad: "Fácil"
    },
    {
        id: 2,
        nombre: "Iglesia de San Francisco",
        categoria: "patrimonio",
        icono: "fas fa-church",
        color: "#8B6914",
        coords: [-33.4390, -70.6498],
        descripcion: "Una de las iglesias más antiguas de Santiago, fundada en 1618. Su arquitectura barroca y neoclásica la hacen un hito patrimonial.",
        direccion: "Calle San Francisco, Barrio Brasil",
        horario: "Lun-Dom 8:00 - 20:00",
        historia: "El templo ha sobrevivido numerosos terremotos, incluidos los de 1647, 1730 y 2010. Su torre fue restaurada en múltiples ocasiones.",
        dificultad: "Fácil"
    },
    {
        id: 3,
        nombre: "Casona de Calle Cumming",
        categoria: "patrimonio",
        icono: "fas fa-home",
        color: "#8B6914",
        coords: [-33.4415, -70.6535],
        descripcion: "Construcciones eclécticas del siglo XIX que dan karakter a Calle Cumming. Arquitectura neoclásica y art nouveau.",
        direccion: "Calle Cumming, Barrio Yungay",
        horario: "Exterior permanente",
        historia: "Las casonas de Cumming datan del periodo 1890-1930, cuando el sector era residencia de la elite santiaguina. Muchas han sido restauradas.",
        dificultad: "Fácil"
    },
    {
        id: 4,
        nombre: "Casa Museo Pedro Fontana",
        categoria: "patrimonio",
        icono: "fas fa-university",
        color: "#8B6914",
        coords: [-33.4410, -70.6540],
        descripcion: "Casona patrimonial del arquitecto Pedro Fontana, muestra de la arquitectura residencial del siglo XIX en Santiago.",
        direccion: "Calle Yungay, Barrio Yungay",
        horario: "Visitas con coordinación previa",
        historia: "Pedro Fontana fue uno de los arquitectos más influyentes de finales del siglo XIX chileno.",
        dificultad: "Fácil"
    },

    // CULTURAL
    {
        id: 5,
        nombre: "Museo de la Memoria y los DDHH",
        categoria: "cultural",
        icono: "fas fa-building",
        color: "#6B3A2A",
        coords: [-33.4420, -70.6600],
        descripcion: "Museo que recuerda las víctimas de violaciones a los derechos humanos durante la dictadura militar chilena (1973-1990).",
        direccion: "Av. Gral. Baquedano 501",
        horario: "Mar-Dom 10:00 - 18:00",
        historia: "Inaugurado en 2010, el museo ha recibido más de 2 millones de visitantes. Es un espacio fundamental para la memoria colectiva de Chile.",
        dificultad: "Fácil"
    },
    {
        id: 6,
        nombre: "Museo Histórico Nacional",
        categoria: "cultural",
        icono: "fas fa-landmark",
        color: "#6B3A2A",
        coords: [-33.4370, -70.6520],
        descripcion: "Ubicado en el Palacio de la Real Audiencia, alberga la historia de Chile desde la Colonia hasta la actualidad.",
        direccion: "Plaza de Armas s/n",
        horario: "Mar-Dom 10:00 - 17:30",
        historia: "El Palacio de la Real Audiencia fue construido en 1808 y es uno de los edificios coloniales más importantes de Santiago.",
        dificultad: "Fácil"
    },
    {
        id: 7,
        nombre: "Centro Cultural Gabriela Mistral",
        categoria: "cultural",
        icono: "fas fa-theater-masks",
        color: "#6B3A2A",
        coords: [-33.4435, -70.6530],
        descripcion: "Importante centro cultural que ofrece exposiciones, espectáculos y actividades artísticas diversas.",
        direccion: "Av. Balmaceda 774",
        horario: "Varía según programación",
        historia: "Nombrado en honor a la poetisa chilena Gabriela Mistral, primera latinoamericana en recibir el Premio Nobel de Literatura.",
        dificultad: "Fácil"
    },
    {
        id: 8,
        nombre: "Galería de Arte Contemporáneo",
        categoria: "cultural",
        icono: "fas fa-palette",
        color: "#6B3A2A",
        coords: [-33.4400, -70.6545],
        descripcion: "Espacio de arte emergente con exposiciones de artistas locales e internacionales.",
        direccion: "Calle Cumming 250",
        horario: "Mar-Sáb 11:00 - 19:00",
        historia: "Parte del renacimiento cultural del Barrio Yungay, que ha atraído a numerosos artistas y galerías en los últimos años.",
        dificultad: "Fácil"
    },

    // GASTRONOMÍA
    {
        id: 9,
        nombre: "Café El Gato Gris",
        categoria: "gastronomia",
        icono: "fas fa-coffee",
        color: "#A67C52",
        coords: [-33.4410, -70.6542],
        descripcion: "Café de especialidad en una casona patrimonial. Cultura, música en vivo y café de origen chileno.",
        direccion: "Calle Cumming 335",
        horario: "Lun-Dom 9:00 - 23:00",
        historia: "Referente de la escena cultural del barrio, este café ha sido punto de encuentro de artistas y escritores por más de 20 años.",
        dificultad: "Fácil"
    },
    {
        id: 10,
        nombre: "Mercado Brasil",
        categoria: "gastronomia",
        icono: "fas fa-store",
        color: "#A67C52",
        coords: [-33.4425, -70.6510],
        descripcion: "Mercado local con productores artesanales, frutas, verduras y preparaciones típicas chilenas.",
        direccion: "Calle Brasil esquina Cumming",
        horario: "Lun-Sáb 7:00 - 19:00",
        historia: "Un mercado de barrio que mantiene viva la tradición del comercio local y la relación directa entre productor y consumidor.",
        dificultad: "Fácil"
    },
    {
        id: 11,
        nombre: "La Picá de la Vega",
        categoria: "gastronomia",
        icono: "fas fa-utensils",
        color: "#A67C52",
        coords: [-33.4430, -70.6530],
        descripcion: "Restaurant de cocina chilena tradicional con toques modernos. Envio, pastel de choclo y vinos de casa.",
        direccion: "Calle Cumming 128",
        horario: "Mar-Dom 12:00 - 22:00",
        historia: "Ubicado en una antigua bodega restaurada, combina la tradición culinaria chilena con propuestas contemporáneas.",
        dificultad: "Fácil"
    },
    {
        id: 12,
        nombre: "Cervecería Barrio Brasil",
        categoria: "gastronomia",
        icono: "fas fa-beer",
        color: "#A67C52",
        coords: [-33.4435, -70.6515],
        descripcion: "Cervecería artesanal con más de 15 variedades propias y propuesta gastronómica de botanas.",
        direccion: "Av. Brasil 330",
        horario: "Jue-Dom 17:00 - 01:00",
        historia: "Parte de la ola de cervecerías artesanales que han revolucionado la vida nocturna del sector.",
        dificultad: "Fácil"
    },

    // PARQUES
    {
        id: 13,
        nombre: "Parque Quinta Normal",
        categoria: "parques",
        icono: "fas fa-tree",
        color: "#3D6B5A",
        coords: [-33.4410, -70.6580],
        descripcion: "Uno de los parques urbanos más grandes e importantes de Santiago. Árboles centenarios, lago y espacios verdes.",
        direccion: "Av. Quinta Normal",
        horario: "Lun-Dom 6:00 - 22:00",
        historia: "Creado en 1869, tiene 29 hectáreas y alberga especies de árboles centenarios traídas de diversas partes del mundo.",
        dificultad: "Fácil"
    },
    {
        id: 14,
        nombre: "Plaza de Armas de Santiago",
        categoria: "parques",
        icono: "fas fa-umbrella-beach",
        color: "#3D6B5A",
        coords: [-33.4375, -70.6475],
        descripcion: "La plaza más antigua de Santiago, centro neurálgico desde la fundación de la ciudad.",
        direccion: "Plaza de Armas, Santiago Centro",
        horario: "Abierto 24 horas",
        historia: "Fue diseñada por Pedro de Valdivia en 1541 como el centro de la ciudad colonial. Hoy es Patrimonio Nacional.",
        dificultad: "Fácil"
    },

    // HISTORIA
    {
        id: 15,
        nombre: "Fuente Alemana (Plaza Yungay)",
        categoria: "historia",
        icono: "fas fa-tint",
        color: "#4A3728",
        coords: [-33.4403, -70.6537],
        descripcion: "Obsequio de la colonia alemana en 1913, esta fuente es uno de los elementos más icónicos de la Plaza Yungay.",
        direccion: "Plaza Yungay, centro",
        horario: "Exterior permanente",
        historia: "La fuente fue donada por la comunidad alemana residente en Chile como muestra de gratitud. Sobrevivió al terremoto de 2010.",
        dificultad: "Fácil"
    },
    {
        id: 16,
        nombre: "Sitio Memoria José Domingo Cañas",
        categoria: "historia",
        icono: "fas fa-monument",
        color: "#4A3728",
        coords: [-33.4425, -70.6540],
        descripcion: "Lugar donde funcionó la agencia de la DINA durante la dictadura. Hoy es un espacio de memoria y reflexión.",
        direccion: "Av. José Domingo Cañas",
        horario: "Lun-Vie 9:00 - 17:00",
        historia: "El inmueble fue declarado Monumento Nacional en 2015 como Lugar de Memoria Histórica.",
        dificultad: "Fácil"
    }
];

// ============================================
// RUTAS SUGERIDAS
// ============================================
const RUTAS = {
    patrimonial: {
        nombre: "Ruta Patrimonial del Barrio Yungay",
        descripcion: "Recorrido por los hitos patrimoniales más importantes del sector.",
        color: "#8B6914",
        puntos: [1, 3, 4, 15, 2, 16],
        coordenadas: [
            [-33.4405, -70.6538],  // Plaza Yungay
            [-33.4415, -70.6535],  // Casona Cumming
            [-33.4410, -70.6540],  // Casa Fontana
            [-33.4403, -70.6537],  // Fuente Alemana
            [-33.4390, -70.6498],  // San Francisco
            [-33.4425, -70.6540],  // Sitio Memoria
        ]
    },
    cultural: {
        nombre: "Ruta Cultural Santiago - Yungay",
        descripcion: "Museos, galerías y espacios artísticos del sector.",
        color: "#6B3A2A",
        puntos: [5, 8, 7, 6],
        coordenadas: [
            [-33.4420, -70.6600],  // Museo Memoria
            [-33.4400, -70.6545],  // Galería Arte
            [-33.4435, -70.6530],  // GAM
            [-33.4370, -70.6520],  // Museo Histórico
        ]
    },
    gastro: {
        nombre: "Ruta Gastronómica de Cumming",
        descripcion: "Los mejores sabores del barrio, desde cafés hasta restaurantes.",
        color: "#A67C52",
        puntos: [9, 10, 11, 12],
        coordenadas: [
            [-33.4410, -70.6542],  // Café El Gato Gris
            [-33.4425, -70.6510],  // Mercado Brasil
            [-33.4430, -70.6530],  // La Picá de la Vega
            [-33.4435, -70.6515],  // Cervecería
        ]
    },
    verde: {
        nombre: "Ruta Verde - Parques y Plazas",
        descripcion: "Conecta con la naturaleza en pleno centro de Santiago.",
        color: "#3D6B5A",
        puntos: [1, 13, 14],
        coordenadas: [
            [-33.4405, -70.6538],  // Plaza Yungay
            [-33.4410, -70.6580],  // Quinta Normal
            [-33.4375, -70.6475],  // Plaza de Armas
        ]
    }
};

// ============================================
// COLBORACIONES SUGERIDAS
// ============================================
const COLABORACIONES = [
    "Museo de la Memoria y los Derechos Humanos",
    "Centro Cultural Gabriela Mistral",
    "Museo Histórico Nacional",
    "Café El Gato Gris",
    "Mercado Brasil",
    "Biblioteca de Santiago",
    "Ilustre Municipalidad de Santiago",
    "Fundación Alameda",
    "Colectivo Barrio Yungay",
    "Asociación de Comerciantes Calle Cumming",
    "Instituto de Patrimonio Cultural",
    "Cervecerías artesanales del sector",
    "Galerías de arte del Barrio Brasil",
    "Restaurantes de cocina chilena del sector"
];

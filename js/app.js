/* ============================================
   MI CUMMING - App Principal
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initMap();
    initNavigation();
    initLayerFilters();
    initPuntosGrid();
    initRutas();
    initModal();
    initScrollHeader();
    initActiveNav();
});

// ============================================
// MAPA
// ============================================
let map;
let markers = [];
let routeLines = [];
let activeRoute = null;
let allMarkers = [];

function initMap() {
    map = L.map('map', {
        center: MAP_CENTER,
        zoom: DEFAULT_ZOOM,
        zoomControl: false,
        scrollWheelZoom: true
    });

    L.control.zoom({ position: 'topright' }).addTo(map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19
    }).addTo(map);

    drawBarrios();
    drawCummingStreet();
    addMarkers();
}

function drawBarrios() {
    Object.values(BARRIOS).forEach(barrio => {
        L.polygon(barrio.coords, {
            color: barrio.color,
            weight: 2,
            opacity: 0.8,
            fillColor: barrio.color,
            fillOpacity: 0.1,
            dashArray: '5, 5'
        }).addTo(map).bindTooltip(barrio.nombre, {
            permanent: false,
            direction: 'center',
            className: 'barrio-tooltip'
        });
    });
}

function drawCummingStreet() {
    L.polyline(CUMMING_COORDS, {
        color: '#8B6914',
        weight: 4,
        opacity: 0.9,
        dashArray: '10, 6'
    }).addTo(map).bindTooltip('Calle Cumming', {
        permanent: false,
        direction: 'center'
    });
}

function createIcon(categoria, color) {
    const icons = {
        patrimonio: '🏛️',
        cultural: '🎭',
        gastronomia: '☕',
        parques: '🌳',
        historia: '📖'
    };

    return L.divIcon({
        html: `<div class="custom-marker" style="background: ${color};">
                   <span>${icons[categoria] || '📍'}</span>
               </div>`,
        className: 'custom-marker-wrapper',
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36]
    });
}

function addMarkers() {
    PUNTOS_INTERES.forEach(punto => {
        const icon = createIcon(punto.categoria, punto.color);

        const marker = L.marker(punto.coords, { icon })
            .addTo(map);

        const popupHTML = `
            <div class="popup-content">
                <span class="popup-content__badge" style="background: ${punto.color}">
                    ${getCategoryLabel(punto.categoria)}
                </span>
                <h3 class="popup-content__title">${punto.nombre}</h3>
                <p class="popup-content__desc">${punto.descripcion.substring(0, 120)}...</p>
                <button class="popup-content__btn" onclick="openPuntoModal(${punto.id})">
                    <i class="fas fa-info-circle"></i> Más Info
                </button>
            </div>
        `;

        marker.bindPopup(popupHTML);
        marker.puntoData = punto;
        allMarkers.push(marker);
    });
}

function getCategoryLabel(cat) {
    const labels = {
        patrimonio: 'Patrimonio',
        cultural: 'Cultural',
        gastronomia: 'Gastronomía',
        parques: 'Parques',
        historia: 'Historia'
    };
    return labels[cat] || cat;
}

// ============================================
// FILTROS POR CAPAS
// ============================================
function initLayerFilters() {
    const buttons = document.querySelectorAll('.layer-btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const layer = btn.dataset.layer;
            filterMarkers(layer);
        });
    });
}

function filterMarkers(category) {
    clearRoutes();

    allMarkers.forEach(marker => {
        if (category === 'todos' || marker.puntoData.categoria === category) {
            marker.addTo(map);
        } else {
            map.removeLayer(marker);
        }
    });

    const visible = category === 'todos'
        ? PUNTOS_INTERES
        : PUNTOS_INTERES.filter(p => p.categoria === category);

    if (visible.length > 0) {
        const group = L.featureGroup(
            allMarkers.filter(m => visible.some(v => v.id === m.puntoData.id))
        );
        map.fitBounds(group.getBounds().pad(0.2));
    }
}

// ============================================
// PUNTOS DE INTERÉS - GRID
// ============================================
function initPuntosGrid() {
    const grid = document.getElementById('puntosGrid');

    PUNTOS_INTERES.forEach(punto => {
        const card = document.createElement('div');
        card.className = 'punto-card';
        card.dataset.categoria = punto.categoria;
        card.onclick = () => openPuntoModal(punto.id);

        card.innerHTML = `
            <div class="punto-card__header">
                <div class="punto-card__icon" style="background: ${punto.color}">
                    <i class="${punto.icono}"></i>
                </div>
                <div>
                    <span class="punto-card__category">${getCategoryLabel(punto.categoria)}</span>
                    <h3 class="punto-card__name">${punto.nombre}</h3>
                </div>
            </div>
            <div class="punto-card__body">
                <p class="punto-card__desc">${punto.descripcion.substring(0, 100)}...</p>
            </div>
            <div class="punto-card__footer">
                <span class="punto-card__address">
                    <i class="fas fa-map-marker-alt"></i> ${punto.direccion}
                </span>
                <span class="punto-card__action">Ver más →</span>
            </div>
        `;

        grid.appendChild(card);
    });
}

// ============================================
// RUTAS
// ============================================
function initRutas() {
    const buttons = document.querySelectorAll('.ruta-card__btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const routeKey = btn.dataset.route;
            showRoute(routeKey);
        });
    });
}

function showRoute(key) {
    clearRoutes();

    const ruta = RUTAS[key];
    if (!ruta) return;

    const line = L.polyline(ruta.coordenadas, {
        color: ruta.color,
        weight: 4,
        opacity: 0.8,
        dashArray: '8, 8'
    }).addTo(map);

    routeLines.push(line);

    ruta.puntos.forEach((puntoId, idx) => {
        const marker = L.circleMarker(ruta.coordenadas[idx], {
            radius: 10,
            fillColor: ruta.color,
            color: 'white',
            weight: 3,
            fillOpacity: 0.9
        }).addTo(map);

        const numLabel = L.divIcon({
            html: `<div class="route-number" style="background: ${ruta.color}">${idx + 1}</div>`,
            className: 'route-number-wrapper',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });

        const numMarker = L.marker(ruta.coordenadas[idx], { icon: numLabel }).addTo(map);
        routeLines.push(marker, numMarker);
    });

    map.fitBounds(line.getBounds().pad(0.3));
    activeRoute = key;

    document.getElementById('mapa').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function clearRoutes() {
    routeLines.forEach(layer => map.removeLayer(layer));
    routeLines = [];
    activeRoute = null;
}

// ============================================
// MODAL
// ============================================
function initModal() {
    const overlay = document.getElementById('modalOverlay');
    const closeBtn = document.getElementById('modalClose');

    overlay.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

function openPuntoModal(id) {
    const punto = PUNTOS_INTERES.find(p => p.id === id);
    if (!punto) return;

    const modal = document.getElementById('puntoModal');
    const badge = document.getElementById('modalBadge');
    const title = document.getElementById('modalTitle');
    const desc = document.getElementById('modalDesc');
    const details = document.getElementById('modalDetails');

    badge.style.background = punto.color;
    badge.textContent = getCategoryLabel(punto.categoria);
    title.textContent = punto.nombre;
    desc.textContent = punto.descripcion;

    details.innerHTML = `
        <p><strong><i class="fas fa-map-marker-alt"></i> Dirección:</strong> ${punto.direccion}</p>
        <p><strong><i class="fas fa-clock"></i> Horario:</strong> ${punto.horario}</p>
        <p><strong><i class="fas fa-history"></i> Historia:</strong> ${punto.historia}</p>
    `;

    const mapBtn = document.getElementById('modalMapBtn');
    mapBtn.onclick = (e) => {
        e.preventDefault();
        closeModal();
        map.setView(punto.coords, 17);
        const marker = allMarkers.find(m => m.puntoData.id === id);
        if (marker) {
            setTimeout(() => marker.openPopup(), 500);
        }
    };

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('puntoModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Expose globally for popup buttons
window.openPuntoModal = openPuntoModal;

// ============================================
// NAVEGACIÓN
// ============================================
function initNavigation() {
    const toggle = document.getElementById('menuToggle');
    const nav = document.getElementById('mainNav');

    toggle.addEventListener('click', () => {
        nav.classList.toggle('open');
        toggle.classList.toggle('active');
    });

    nav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            toggle.classList.remove('active');
        });
    });
}

function initScrollHeader() {
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => observer.observe(section));
}

// ============================================
// SCROLL SUAVE
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

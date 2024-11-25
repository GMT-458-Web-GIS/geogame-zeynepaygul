// Harita başlangıç koordinatları (Beytepe Kampüsü)
const centerCoords = [32.749, 39.877]; // [longitude, latitude]

// Nokta için rastgele bir yer seçme
let treasureCoords = [32.749 + (Math.random() - 0.5) * 0.01, 39.877 + (Math.random() - 0.5) * 0.01]; // Yakın bir yer

// Tıklama sayacı
let clickCount = 0;

// Harita oluşturma
const map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM(), // OpenStreetMap tabanı
        }),
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat(centerCoords),
        zoom: 16,
    }),
});

// Harita üzerine tıklama dinleyicisi
map.on('click', (event) => {
    clickCount++;
    document.getElementById('clickCount').innerText = clickCount;

    // Tıklama yapılan yerin koordinatlarını al
    const clickedCoords = ol.proj.toLonLat(event.coordinate);

    // Hint butonu ile bu bilgiyi işlemek için güncelle
    calculateHint(clickedCoords);
});

// Hint hesaplama ve gösterme
function calculateHint(clickedCoords) {
    const distance = getDistance(clickedCoords, treasureCoords);

    let hintMessage = '';
    if (distance < 50) {
        hintMessage = 'Hot! Very close!';
    } else if (distance < 200) {
        hintMessage = 'Warm. You are getting closer.';
    } else {
        hintMessage = 'Cold. You are far away.';
    }

    document.getElementById('hint').innerText = hintMessage;
}

// Koordinatlar arasındaki mesafeyi hesapla (metre cinsinden)
function getDistance(coord1, coord2) {
    const R = 6371e3; // Dünya yarıçapı (metre cinsinden)
    const lat1 = coord1[1] * (Math.PI / 180);
    const lat2 = coord2[1] * (Math.PI / 180);
    const deltaLat = (coord2[1] - coord1[1]) * (Math.PI / 180);
    const deltaLon = (coord2[0] - coord1[0]) * (Math.PI / 180);

    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Mesafe metre cinsinden
}

// Oyunu başlatma
document.getElementById('hintButton').addEventListener('click', () => {
    alert("Click on the map and see the hint!");
});

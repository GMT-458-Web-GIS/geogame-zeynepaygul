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
 // Gizli nokta ile tıklanan yer arasındaki mesafeyi hesapla (metre)
 const distance = ol.sphere.getDistance(
    ol.proj.toLonLat(hiddenPoint),
    ol.proj.toLonLat(clickedCoord)
);
// Hint hesaplama ve gösterme
function calculateHint(clickedCoords) {
    const distance = getDistance(clickedCoords, treasureCoords); // Tıklanan yer ile hazine arasındaki mesafe

    let hintMessage = '';
    if (distance < 100) {
        // Hazine bulundu, oyun bitiriliyor
        hintMessage = 'Hot! You found the treasure!';
        showPopup(); // Pop-up göster
        markTreasureOnMap(treasureCoords); // Gizli noktayı haritada işaretle
        map.un('click'); // Tıklama olayını devre dışı bırak
    } else if (distance < 200) {
        hintMessage = 'Warm. You are getting closer.';
    } else {
        hintMessage = 'Cold. You are far away.';
    }

    // İpucu mesajını güncelle
    document.getElementById('hint').innerText = hintMessage;
}

// Hazinenin yerini haritada işaretleme (görsel ekleme)
function markTreasureOnMap(coords) {
    const treasureFeature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat(coords)),
    });

    const treasureLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [treasureFeature],
        }),
        style: new ol.style.Style({
            image: new ol.style.Circle({
                radius: 8,
                fill: new ol.style.Fill({ color: 'red' }),
                stroke: new ol.style.Stroke({ color: 'white', width: 2 }),
            }),
        }),
    });

    map.addLayer(treasureLayer); // Hazinenin yerini gösteren katmanı ekler
}



// Mesajı ve tıklama sayısını güncelle
document.getElementById('hint').textContent = hintMessage;
document.getElementById('clickCount').textContent = clickCount;
function showPopup() {
    // Pop-up ve karartma arka planını göster
    document.getElementById('popup').style.display = 'block';
    document.getElementById('popupOverlay').style.display = 'block';

    // 3 saniye sonra pop-up'ı otomatik olarak gizle
    setTimeout(() => {
        document.getElementById('popup').style.display = 'none';
        document.getElementById('popupOverlay').style.display = 'none';
    }, 3000);
}

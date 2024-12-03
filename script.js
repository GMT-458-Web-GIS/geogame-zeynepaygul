const map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([32.7333, 39.8727]), // Beytepe'nin merkezine yakın koordinatlar
        zoom: 16
    })
});

// Gizli nokta (hedef koordinatları)
const secretLocation = ol.proj.fromLonLat([32.7333, 39.8727]); // 39°52'05.0"N 32°44'10.4"E
let clickCount = 0;
let gameOver = false; // Oyunun bitip bitmediğini kontrol eder

// Oyuncunun tıklama işlemi
map.on('singleclick', (event) => {
    if (gameOver) return; // Oyun bittiyse işlemleri durdur

    const clickedCoords = event.coordinate;
    const distance = ol.sphere.getDistance(
        ol.proj.toLonLat(clickedCoords),
        ol.proj.toLonLat(secretLocation)
    );

    // Nokta yanıp söner
    createBlinkingPoint(clickedCoords);

    // Uzaklığa göre mesaj göster
    if (distance > 150) {
        updateHint('Cold');
    } else if (distance <= 150 && distance > 20) {
        updateHint('Warm');
    } else if (distance <= 20) {
        updateHint('Congratulations!');
        showPopup();
        gameOver = true; // Oyun bitti olarak işaretle
    }

    if (!gameOver) {
        document.getElementById('clickCount').textContent = ++clickCount;
    }
});

// Hint butonu
document.getElementById('hintButton').addEventListener('click', () => {
    const popup = document.getElementById('hintPopup');
    popup.style.display = 'block';
});

// Close popup
document.getElementById('closePopup').addEventListener('click', () => {
    const popup = document.getElementById('hintPopup');
    popup.style.display = 'none';
});

// Nokta yanıp söner
function createBlinkingPoint(coords) {
    const point = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [new ol.Feature(new ol.geom.Point(coords))]
        }),
        style: new ol.style.Style({
            image: new ol.style.Circle({
                radius: 8,
                fill: new ol.style.Fill({ color: 'red' })
            })
        })
    });
    map.addLayer(point);
    setTimeout(() => map.removeLayer(point), 300);
}

// İpucu güncelleme
function updateHint(message) {
    document.getElementById('hint').textContent = message;
}

// Tebrik mesajı
function showPopup() {
    const popup = document.getElementById('hintPopup');
    popup.textContent = "Congratulations! You found the treasure!";
    popup.style.display = 'block';
    setTimeout(() => popup.style.display = 'none', 10000);
}

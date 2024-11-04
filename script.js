let treasureLocation;
let clickCount = 0;

const mapElement = document.getElementById('map');
const startButton = document.getElementById('startButton');
const hintElement = document.getElementById('hint');
const clickCountElement = document.getElementById('clickCount');

// OpenLayers haritasını oluştur
const map = new ol.Map({
    target: mapElement,
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([37.0, 39.0]), // Türkiye'nin ortası
        zoom: 6
    })
});

// Oyun başlatma fonksiyonu
startButton.addEventListener('click', startGame);

function startGame() {
    clickCount = 0;
    clickCountElement.innerText = clickCount;
    hintElement.innerText = 'Click on the map to find the treasure!';
    
    // Rastgele hazine konumu oluştur
    const lon = (Math.random() * (42.0 - 32.0) + 32.0); // Longtitude aralığı
    const lat = (Math.random() * (43.0 - 36.0) + 36.0); // Latitude aralığı
    treasureLocation = ol.proj.fromLonLat([lon, lat]);
}

// Harita üzerinde tıklama olayını dinle
map.on('singleclick', function(event) {
    clickCount++;
    clickCountElement.innerText = clickCount;
    
    const clickedLocation = event.coordinate;
    const distance = ol.sphere.getDistance(clickedLocation, treasureLocation);
    giveHint(distance);
});

// Mesafeye göre ipucu verme
function giveHint(distance) {
    if (distance < 50) {
        hintElement.innerText = 'Hot! Very close!';
    } else if (distance < 150) {
        hintElement.innerText = 'Warm! You are getting there.';
    } else {
        hintElement.innerText = 'Cold! Far away.';
    }

    // Hazineyi bulduğunda
    if (distance < 10) {
        hintElement.innerText = 'Congratulations! You found the treasure!';
    }
}

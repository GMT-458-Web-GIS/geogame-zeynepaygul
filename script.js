const map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([32.7333, 39.8727]),
        zoom: 16
    })
});

// İpucu ve konumların listesi
const locations = [
    {
        coords: ol.proj.fromLonLat([32.7333, 39.8727]),
        hint: "The monument with Atatürk's words 'En büyük savaş, cahilliğe karşı yapılan savaştır.' written on it"
    },
    {
        coords: ol.proj.fromLonLat([32.73529706040309, 39.86518316190052]),
        hint: 'The best place to learn different languages'
    },
    {
        coords: ol.proj.fromLonLat([32.73203561701033, 39.86843968897149]),
        hint: 'There are plenty of cafes and food places'
    }
];

// Rastgele bir konum seç
let selectedLocation = locations[Math.floor(Math.random() * locations.length)];
let secretLocation = selectedLocation.coords;

let clickCount = 0;
let gameOver = false;

// Oyuncunun tıklama işlemi
map.on('singleclick', (event) => {
    if (gameOver) return;

    const popup = document.getElementById('hintPopup');
    popup.style.display = 'none'; // Pop-up'ı kapat

    const clickedCoords = event.coordinate;
    const distance = ol.sphere.getDistance(
        ol.proj.toLonLat(clickedCoords),
        ol.proj.toLonLat(secretLocation)
    );

    createBlinkingPoint(clickedCoords);

    if (distance > 150) {
        updateHint('Cold, you are far from the treasure');
    } else if (distance <= 150 && distance > 20) {
        updateHint('Warm, you are getting closer');
    } else if (distance <= 20) {
        updateHint('Congratulations!');
        showPopup();
        gameOver = true;
    }

    if (!gameOver) {
        document.getElementById('clickCount').textContent = ++clickCount;
    }
});

// Hint butonu
document.getElementById('hintButton').addEventListener('click', () => {
    const popup = document.getElementById('hintPopup');
    popup.textContent = selectedLocation.hint;
    popup.style.display = 'block';
});

// Close popup
document.getElementById('closePopup').addEventListener('click', () => {
    const popup = document.getElementById('hintPopup');
    popup.style.display = 'none';
});

// Tekrar Oyna Butonu
document.getElementById('restartButton').addEventListener('click', () => {
    restartGame();
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

// Tebrik mesajı ve "Tekrar Oyna" butonu gösterme
function showPopup() {
    const popup = document.getElementById('hintPopup');
    popup.innerHTML = `
        Congratulations! You found the treasure!<br>
        <button id="restartButton">Play Again</button>
    `;
    popup.style.display = 'block';

    // Tekrar Oyna butonu olay dinleyicisini burada tanımlıyoruz
    document.getElementById('restartButton').addEventListener('click', () => {
        restartGame();
    });
}

// Oyunu sıfırla ve yeni bir rastgele konum seç
function restartGame() {
    selectedLocation = locations[Math.floor(Math.random() * locations.length)];
    secretLocation = selectedLocation.coords;
    clickCount = 0;
    gameOver = false;

    document.getElementById('clickCount').textContent = clickCount;
    updateHint('Click on the map to begin!');
    const popup = document.getElementById('hintPopup');
    popup.style.display = 'none';
}

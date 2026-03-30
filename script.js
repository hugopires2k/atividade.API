const container = document.getElementById('container');
const locationBtn = document.getElementById('get-location');
const locationText = document.getElementById('location');

// Buscar personagens da API
async function getCharacters() {
    try {
        const response = await fetch('https://rickandmortyapi.com/api/character');
        const data = await response.json();
        renderCards(data.results);
    } catch (error) {
        container.innerHTML = "<p style='color:red;'>Erro ao buscar dados.</p>";
        console.error("Erro ao buscar dados:", error);
    }
}

function renderCards(characters) {
    container.innerHTML = characters.map(char => `
        <div class="card">
            <img src="${char.image}" alt="${char.name}">
            <div class="card-info">
                <h2>${char.name}</h2>
                <p><strong>Status:</strong> ${char.status}</p>
                <p><strong>Espécie:</strong> ${char.species}</p>
                <p><strong>Gênero:</strong> ${char.gender}</p>
                <p><strong>Origem:</strong> ${char.origin.name}</p>
            </div>
        </div>
    `).join('');
}

// Recurso de hardware: pegar localização
locationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            locationText.textContent = `Latitude: ${pos.coords.latitude}, Longitude: ${pos.coords.longitude}`;
        }, err => {
            locationText.textContent = 'Erro ao acessar localização.';
        });
    } else {
        locationText.textContent = 'Geolocalização não suportada.';
    }
});

// Iniciar
getCharacters();
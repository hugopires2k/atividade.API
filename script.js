const container = document.getElementById('container');

// Buscar personagens da API
async function getCharacters() {
    try {
        const res = await fetch('https://rickandmortyapi.com/api/character');
        const data = await res.json();
        renderCards(data.results);
    } catch(e){
        container.innerHTML="<p style='color:red;'>Erro ao buscar dados.</p>";
    }
}

function renderCards(chars){
    container.innerHTML = chars.map(char=>`
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

getCharacters();

// --------- Recurso de hardware: Câmera ---------
const openCameraBtn = document.getElementById('open-camera');
const takePhotoBtn = document.getElementById('take-photo');
const video = document.getElementById('camera');
const canvas = document.getElementById('snapshot');

openCameraBtn.addEventListener('click', async () => {
    video.style.display = 'block';
    takePhotoBtn.style.display = 'block';
    const stream = await navigator.mediaDevices.getUserMedia({video:true});
    video.srcObject = stream;
});

takePhotoBtn.addEventListener('click', ()=>{
    canvas.style.display = 'block';
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video,0,0);
});
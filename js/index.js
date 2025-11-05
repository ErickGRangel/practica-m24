const API_KEY = 'ab7d2f99db7d4efaa9750ed444cf9029';

const gamesGrid = document.getElementById ('games-grid');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const statusEl = document.getElementById('status');


let allGames = [];


function showLoading() {
  statusEl.querySelector('.loading').style.display = 'inline-block';
  statusEl.querySelector('.error').classList.add('hidden');
  gamesGrid.innerHTML = '';
}


function showError(msg) {
  statusEl.querySelector('.loading').style.display = 'none';
  const errorEl = statusEl.querySelector('.error');
  errorEl.textContent = msg;
  errorEl.classList.remove('hidden');
}


async function loadGames() {
  showLoading();
  try {
    const res = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&platforms=4&page_size=30`);
    allGames = res.data.results;
    renderGames(allGames);
  } catch (error) {
    console.error('Error:', error);
    showError('No se pudieron cargar los juegos.');
  }
}


function renderGames(juegos) {
  const loadingEl = document.getElementById('status').querySelector('.loading');
  loadingEl.style.display = 'none';
  
  gamesGrid.innerHTML = '';
  if (juegos.length === 0) {
    gamesGrid.innerHTML = '<p class="no-results">No se encontraron juegos.</p>';
    return;
  }

  juegos.forEach(juego => {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `
      <img src="${juego.background_image || 'https://via.placeholder.com/280x160?text=Sin+imagen'}" 
           alt="${juego.name}" 
           onerror="this.src='https://via.placeholder.com/280x160?text=Sin+imagen'">
      <div class="card-content">
        <h2>${juego.name}</h2>
        <p class="genre">${juego.genres?.[0]?.name || 'N/A'}</p>
      </div>
    `;
    card.addEventListener('click', () => {
      window.location.href = `game.html?id=${juego.id}`;
    });
    gamesGrid.appendChild(card);
  });
}

function searchGame() {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
    renderGames(allGames);
    return;
  }
  const filtered = allGames.filter(juego =>
    juego.name.toLowerCase().includes(query)
  );
  renderGames(filtered);
}

// Eventos
searchBtn.addEventListener('click', searchGame);
searchInput.addEventListener('input', searchGame);

// Iniciar
loadGames();
const API_KEY = 'ab7d2f99db7d4efaa9750ed444cf9029';
const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get('id');
const gameDetail = document.getElementById('game-detail');

if (!gameId) {
  gameDetail.innerHTML = '<p>ID no válido.</p>';
} else {
  axios.get(`https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`)
    .then(res => {
      const juego = res.data;
      gameDetail.innerHTML = `
        <img src="${juego.background_image}" alt="${juego.name}" class="game-image">
        <h1>${juego.name}</h1>
        <p><strong>Géneros:</strong> ${juego.genres?.map(g => g.name).join(', ') || 'N/A'}</p>
        <p><strong>Fecha de lanzamiento:</strong> ${juego.released || 'N/A'}</p>
        <p>${juego.description_raw || 'Sin descripción.'}</p>
        <a href="${juego.website || '#'}" target="_blank" class="btn">Sitio oficial</a>
      `;
    })
    .catch(err => {
      console.error(err);
      gameDetail.innerHTML = '<p>Juego no encontrado.</p>';
    });
}
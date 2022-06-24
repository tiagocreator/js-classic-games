const fetchData = async () => {
  const data = await fetch('../games.json');
  const res = await data.json();
  return res.games;
};

const countGames = async () => {
  const games = await fetchData();
  const counter = document.querySelector('.games-counter');
  counter.innerHTML = await games.length;
};
countGames();

const generateGrid = async () => {
  const games = await fetchData();

  let output = '';

  const mapGames = games.map((game) => {
    output += `
    <div id="${game.id}" class="card">
          <div class="card-image">
            <a href="${game.url}" target="_blank"
              ><img src="${game.img}" alt="${game.name}"
            /></a>
          </div>
          <div class="card-body">
            <a href="${game.url}" target="_blank"><h1 class="card-title">${game.name}</h1></a>
            <p class="card-description">
              ${game.desc}
            </p>
            <div class="card-footer">
              <div>
                <span class="card-tools">${game.tools}</span>
              </div>
              <div><span class="card-category">${game.cat}</span></div>
            </div>
          </div>
        </div>
  `;
  });

  const gridContainer = document.querySelector('.grid-container');
  gridContainer.innerHTML = output;
};

generateGrid();

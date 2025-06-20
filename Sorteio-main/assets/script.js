let players = [];
let forceEnabled = true;
let clickCount = 0;
let clickTimer = null;

function addPlayer() {
    const playerName = document.getElementById('playerName').value;
    if (playerName) {
        players.push(playerName);
        updatePlayerList();
        document.getElementById('playerName').value = '';
    }
}

function updatePlayerList() {
    const playerList = document.getElementById('playerList');
    playerList.innerHTML = '';
    players.forEach(player => {
        const li = document.createElement('li');
        li.textContent = player;
        playerList.appendChild(li);
    });
}

function sortTeams() {
    if (players.length < 6) {
        alert("Adicione pelo menos cinco jogadores para sortear as equipes.");
        return;
    }

    let team1 = [];
    let team2 = [];
    let team3 = [];
    let remainingPlayers = [...players];

    const forcePlayers = ['Paulo', 'Rhuan', 'P.A', 'Iury', 'Paulão', 'Rian'];

    // Escolher um time aleatório para os jogadores forçados (1, 2 com 90% de chance; 3 com 10%)
    let forcedTeamNumber = Math.random() < 0.1 ? 3 : (Math.random() < 0.5 ? 1 : 2);
    let forcedTeam = [];

    if (forceEnabled) {
        forcePlayers.forEach(name => {
            const index = remainingPlayers.findIndex(p => p.toLowerCase() === name.toLowerCase());
            if (index !== -1) {
                forcedTeam.push(remainingPlayers.splice(index, 1)[0]);
            }
        });
    }

    if (forcedTeamNumber === 1) team1.push(...forcedTeam);
    else if (forcedTeamNumber === 2) team2.push(...forcedTeam);
    else team3.push(...forcedTeam);

    // Embaralhar o restante dos jogadores
    remainingPlayers = shuffleArray(remainingPlayers);

    while (team1.length < 5 && remainingPlayers.length > 0) {
        team1.push(remainingPlayers.shift());
    }

    while (team2.length < 5 && remainingPlayers.length > 0) {
        team2.push(remainingPlayers.shift());
    }

    while (team3.length < 5 && remainingPlayers.length > 0) {
        team3.push(remainingPlayers.shift());
    }

    displayTeams(team1, team2, team3);
}

function displayTeams(team1, team2, team3) {
    const team1List = document.getElementById('team1');
    const team2List = document.getElementById('team2');
    const team3List = document.getElementById('team3');

    team1List.innerHTML = '';
    team2List.innerHTML = '';
    team3List.innerHTML = '';

    team1.forEach(player => {
        const li = document.createElement('li');
        li.textContent = player;
        team1List.appendChild(li);
    });

    team2.forEach(player => {
        const li = document.createElement('li');
        li.textContent = player;
        team2List.appendChild(li);
    });

    team3.forEach(player => {
        const li = document.createElement('li');
        li.textContent = player;
        team3List.appendChild(li);
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Ativador secreto: 5 cliques no título para ligar/desligar a força
document.addEventListener('DOMContentLoaded', () => {
    const title = document.getElementById('title');
    title.addEventListener('click', () => {
        clickCount++;
        if (clickTimer) clearTimeout(clickTimer);
        clickTimer = setTimeout(() => {
            clickCount = 0;
        }, 1000);

        if (clickCount === 5) {
            forceEnabled = !forceEnabled;
            alert("Forçar jogadores em equipe: " + (forceEnabled ? "ATIVADO" : "DESATIVADO"));
            clickCount = 0;
        }
    });

    // ENTER no input chama addPlayer()
    const input = document.getElementById("playerName");
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            addPlayer();
        }
    });
});


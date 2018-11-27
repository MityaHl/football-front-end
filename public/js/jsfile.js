var myTeamBtn = document.getElementById('myteam-btn'),
    statsBtn = document.getElementById('stats-btn'),
    transfersBtn = document.getElementById('transfers-btn'),
    page = document.getElementById('page'),
    resultBtn = document.getElementById('results-btn'),
    stadium = document.getElementById('stadium'),
    stats = document.getElementById('stats'),
    results = document.getElementById('result'),
    transfers = document.getElementById('transfers'),
    circles = document.querySelectorAll('.oblack'),
    choosePlayer = document.getElementById('choose-player'),
    table = document.getElementById('table'),
    chooseBtn = document.getElementById('choose-pl');

function changeClassList(divDisplay, divNoneDisplay1, divNoneDisplay2, divNoneDisplay3){
    divDisplay.classList.add('display');
    divDisplay.classList.remove('nonedisplay');
    divNoneDisplay1.classList.add('nonedisplay');
    divNoneDisplay1.classList.remove('display');
    divNoneDisplay2.classList.add('nonedisplay');
    divNoneDisplay2.classList.remove('display');
    divNoneDisplay3.classList.add('nonedisplay');
    divNoneDisplay3.classList.remove('display');
}

var stadiumWindow = function(){
    changeClassList(table, choosePlayer);
}

var choosePlDivWindow = function(){
    changeClassList(choosePlayer, table);
}

var statsWindow = function(){
    changeClassList(stats, stadium, results, transfers);
}

var myTeamWindow = function(){
    changeClassList(stadium, stats, results, transfers);
}

var resultWindow = function(){
    changeClassList(results, stadium, stats, transfers);
}

var transfersWindow = function(){
    changeClassList(transfers, stadium, results, stats);
}


statsBtn.addEventListener('click', statsWindow);
myTeamBtn.addEventListener('click', myTeamWindow);
resultBtn.addEventListener('click', resultWindow);
transfersBtn.addEventListener('click', transfersWindow);
for(var i = 0; i < circles.length; i++){
    circles[i].addEventListener('click', choosePlDivWindow);
}
chooseBtn.addEventListener('click', stadiumWindow);

function getUserInfo() {
    $.ajax({
        url: 'http://localhost:8080' + '/userInfo?token=' + getCookie("Auth-Token"),
        type: 'get',
        success: function (data, textStatus, request) {
            const loginView = document.getElementById("loginName");
            const balanceView = document.getElementById("balance");
            loginView.innerHTML = data["login"];
            balanceView.innerHTML = data["balance"];
        }
    })
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function logout() {
    $.ajax({
        url: 'http://localhost:8080' + '/loginOut?token=' + getCookie("Auth-Token"),
        type: 'get',
        success: function (data, textStatus, request) {
            window.location = '/login.html';
        }
    })
    document.cookie = 'Auth-Token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function getPlayers() {
    $.ajax({
        url: 'http://localhost:8080' + '/users?token=' + getCookie("Auth-Token"),
        type: 'get',
        success: function (data, textStatus, request) {
            const table = document.getElementById("player-table");
            for (let i = 0; i < data.length; i++) {
                let str = "player" + i;
                let row = table.insertRow(i + 2);
                row.id = str;
                const cellPosition = row.insertCell(0);
                const cellCost = row.insertCell(1);
                const cellButton = row.insertCell(2);
                cellPosition.innerHTML = data[i]["position"];
                cellCost.innerHTML = data[i]["maxCost"];
                cellButton.innerHTML = "<button>Купить</button>>"
            }
        }
    })
}
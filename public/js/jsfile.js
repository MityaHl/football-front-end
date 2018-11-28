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
    table = document.getElementById('courttable'),
    findPl = document.getElementById('find-pl');

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
    changeClassList(table, choosePlayer, results, transfers);
}

var choosePlDivWindow = function(){
    changeClassList(choosePlayer, courttable, results, transfers);
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
findPl.addEventListener('click', function (e){
    let table = document.getElementById('player-table');
    table.classList.remove('nonedisplay');
    table.classList.add('display');
})
for(var i = 0; i < circles.length; i++){
    circles[i].addEventListener('click', choosePlDivWindow);
}

function getUserInfo() {
    $.ajax({
        url: 'http://localhost:8080' + '/userInfo?token=' + getCookie("Auth-Token"),
        type: 'get',
        success: function (data, textStatus, request) {
            const loginView = document.getElementById("loginName");
            const balanceView = document.getElementById("balance");
            loginView.innerHTML = data["login"];
            balanceView.innerHTML = data["balance"] + ' $';
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

function getPlayers(position, maxCost) {
    let json = '{ "token": "' + getCookie("Auth-Token") + '"position": "' + position + '" ,"maxCost":"' + maxCost + '"}';
    delAll();
    $.ajax({
        url: 'http://localhost:8080/getPlayersToBuy',
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: json,
        success: function (data, textStatus, request) {
            const table = document.getElementById("player-table");
            for (let i = 0; i < data.length; i++) {
                let str = "player" + i;
                let row = table.insertRow(i + 1);
                row.id = str;

                const cellPosition = row.insertCell(0);
                const cellCost = row.insertCell(1);

                row.onclick = function(){
                    return buyPlayer(str)
                };

                cellPosition.innerHTML = data[i]["name"];
                cellCost.innerHTML = data[i]["cost"];
            }
        }
    })
}

function buyPlayer(row_id) {
    var row = document.getElementById(row_id);
    var playerName = row.cells[0].innerHTML;
    var json = '{ "token": "' + getCookie("Auth-Token") + '" ,"name":"' + playerName + '"}';
    $.ajax({
        url: 'http://localhost:8080/buyPlayer?token=' + getCookie("Auth-Token") + '&name=' + playerName,
        type: 'get',
        statusCode: {
            500: function() {
                alert("Недостаточно средств");
            },
            200: function () {
                alert("Игрок куплен");
                window.location = '/index.html';
            }
        }
    })
}

function getAvailablePlayers(position) {
    var json = '{ "token": "' + getCookie("Auth-Token") + '" ,"position":"' + position + '"}';
    $.ajax({
        url: 'http://localhost:8080/getAvailablePlayers?token=' + getCookie("Auth-Token") + '&position=' + position,
        type: 'get',
        success: function (data, textStatus, request) {
            const table = document.getElementById("available-player-table");
            for (let i = 0; i < data.length; i++) {
                let str = "player" + i;
                let row = table.insertRow(i + 1);
                row.id = str;
                const cellName = row.insertCell(0);

                row.onclick = function(){
                    return setPlayer(str)
                };

                cellName.innerHTML = data[i];
            }
        }
    })
}


function deleteRow(r, tableId) {
    let i = r.parentNode.parentNode.rowIndex;
    document.getElementById(tableId).deleteRow(i);
}

function delAll(tableId) {
    let table = document.getElementById(tableId);
    for(let i = table.rows.length - 1; i > 0; i--){
        table.deleteRow(i, tableId);
    }
}
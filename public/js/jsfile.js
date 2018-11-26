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
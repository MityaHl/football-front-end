var send = document.getElementById('sub');

function checkPassword() {
    var pass1 =  document.getElementById('password1'),
        pass2 = document.getElementById('password2');
        console.log(pass1.value);
        console.log(pass2.value);
    if(pass1.value !== pass2.value){
        alert('Пароли не совпадают');
        return false;
    }
}

send.addEventListener('click', function(e){
    checkPassword();
});

function reg(login, password) {
    var json = '{ "login": "' + login + '" ,"password":"' + password + '"}';
    console.log(json);
    $.ajax({
        url: 'http://localhost:8080/signUp',
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: json,
        success: function (data, textStatus, request) {
                window.location = '/login.html';
        }
    })
}
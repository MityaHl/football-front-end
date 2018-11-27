function checkPassword() {
    var pass1 =  document.getElementById('password1'),
        pass2 = document.getElementById('password2');
    console.log(pass1.value);
    console.log(pass2.value);
    if(pass1.value !== pass2.value){
        alert('Пароли не совпадают');
        return false;
    }
    return true;
}


function reg(login, password) {
    if(checkPassword()){
        var json = '{ "login": "' + login + '" ,"password":"' + password + '"}';
        console.log(json);
        $.ajax({
            url: 'http://localhost:8080/signUp',
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: json,
            statusCode: {
                500: function() {
                    alert("Логин уже используется");
                },
                200: function () {
                    window.location = '/login.html';
                }
            }
        })
    }
}
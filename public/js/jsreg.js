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
function handleSubmit(event){
    event.preventDefault();
    const user = document.querySelector(".usuario");
    const passwd = document.querySelector(".senha");
    if (user.value == "adm" && passwd.value == "adm"){
        window.location.href = './public/pages/conexao.html';
    } else {
        const row = "USUÁRIO/SENHA INVÁLIDO (S)";
        document.querySelector(".erro").innerHTML = row;
        setTimeout(function(){
            document.querySelector(".erro").innerHTML = "";
        }, 4000);
    }
    user.value = "";
    passwd.value = "";
}
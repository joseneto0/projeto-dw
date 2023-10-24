const apiUrl = 'http://localhost:3000';

async function logar(event){
    event.preventDefault();
    const user = document.querySelector(".usuario").value;
    const passwd = document.querySelector(".senha").value;
    const response = await fetch(`${apiUrl}/login`);
    const data = await response.json();
    for (const login of data){
        if (user == login.usuario && passwd == login.senha){
            window.location.href = './public/pages/conexao.html';
            return;
        }
    }
    const row = "USUÁRIO/SENHA INVÁLIDO (S)";
    document.querySelector(".erro").innerHTML = row;
    setTimeout(function(){
        document.querySelector(".erro").innerHTML = "";
    }, 4000);
    user.value = "";
    passwd.value = "";
}
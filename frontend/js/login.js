import Auth from "./auth.js";

async function logar(event){
    event.preventDefault();
    const username = document.querySelector(".usuario").value;
    const password = document.querySelector(".senha").value;

    const user = { username , password };
    const request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    }
    const response = await fetch('/api/login', request);
    if (response.ok){
        location.href = "./conexao.html";
    }
}

  
window.logar = logar;
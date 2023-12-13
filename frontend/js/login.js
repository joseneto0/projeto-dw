import Auth from "./auth.js";

async function logar(event){
    event.preventDefault();
    const username = document.querySelector(".usuario").value;
    const passwd = document.querySelector(".senha").value;
    const user = { username , passwd };
    const request = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    }
    const { auth, token } = await (
        await fetch('/api/', request)
    ).json();

    if (auth) {
        Auth.signin(token);
    } 
}

window.logar = logar;
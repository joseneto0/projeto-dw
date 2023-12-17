import API from './api';
import Auth from './auth';
const input = document.querySelector("#inputIpAddress");


window.clickSubmit = clickSubmit;
window.signout = Auth.signout;
window.handleConnect = handleConnect;

if (Auth.isAuthenticated()){
    const token = Auth.getToken();
    const ips= await API.read(`ips/${token}`);
    const userId = await API.read(`user/${token}`);
    for (const ip of ips){
        if (userId == ip.userId){
            const tbody = document.querySelector("table tbody");
            const row = `<tr id=h${ip.id} style="text-align: center">
            <td>${ip.address}</td>
            <td id=c${ip.id}>
            <a href="#">
                <i onclick="handleConnect()" class="fa fa-sign-in 1" style="font-size: 22px;"></i>
            </a></td>
            <td>
            </td>
            </tr>`
            tbody.insertAdjacentHTML("beforeend", row);
        }
    }
}

function clickSubmit(){
    if (input.value == ""){
        Swal.fire({
            title: 'Erro!',
            text: 'Digite um IP para o cadastro',
            icon: 'error',
            confirmButtonText: 'Beleza!'
          })
    } else {
        let ip = input.value;
        insert(ip);
    }
}

async function insert(ipN){
    const req = {
        ip: ipN,
        token: Auth.getToken()
    }
    const newIp = await API.createIp("ips", req);
    const tbody = document.querySelector("table tbody");
    const row = `<tr id=h${newIp.id} style="text-align: center">
        <td>${newIp.address}</td>
        <td id=c${newIp.id}>
        <a href="#">
            <i onclick="handleConnect()" class="fa fa-sign-in 1" style="font-size: 22px;"></i>
        </a></td>
        <td>
        </td>
    </tr>`
    tbody.insertAdjacentHTML("beforeend", row);
    input.value = "";
}

function handleConnect(){
    location.href = "./principal.html";
}
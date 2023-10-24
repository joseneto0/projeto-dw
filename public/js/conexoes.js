const input = document.querySelector("#inputIpAddress");
let ips = [];
let id = 1;

async function clickSubmit(event){
    if (input.value == ""){
        Swal.fire({
            title: 'Erro!',
            text: 'Digite um IP para o cadastro',
            icon: 'error',
            confirmButtonText: 'Beleza!'
          })
    } else {
        let ip = input.value;
        let url = `https://ipinfo.io/${ip}/json?token=0ce00c5af1537e`;
        event.preventDefault();
        fetch(url).then(
            (response) => response.json()
        ).then(
            (jsonResponse) => insert(jsonResponse)
        )
    }
}

function insert(json){
    let ip = ipToString(json.ip);
    if (!onTable(ip)){
        const tbody = document.querySelector("table tbody");
        const row = `<tr id=h${id} style="text-align: center">
            <td>${json.ip}</td>
            <td id=c${id}>
            <a href="#">
                <i onclick="handleConnect(${id}, ${ip})" class="fa fa-sign-in 1" style="font-size: 22px;"></i>
            </a></td>
            <td>
            <a href="#">
                <i onclick="handleRemove(${id}, ${ip})" class="fa fa-times 1" style="font-size: 22px;"></i>
            </a>
            </td>
        </tr>`
        tbody.insertAdjacentHTML("beforeend", row);
        ips.push(ip);
        id++;
    } else {
        alert("IP já cadastrado");
    }
    input.value = "";
}

function onTable(ip){
    for (let i = 0; i < ips.length; i++){
        if (ips[i] == ip){
            return true;
        }
    }
    return false;
}

function handleConnect(id, ip){
    const conect = document.querySelector(`#c${id}`);
    const row = `<input class="input-connect" id="userInput" placeholder="user" type="text" autocomplete="off" style="margin-bottom: 5px" ><br>
    <input class="input-connect" id="passwordInput" placeholder="password" type="password" autocomplete="off style="margin-bottom: 5px"><br>
    <button onclick="swapPage(${id})" type="button" class="btn btn-outline-primary">Conectar</button>
    <div class="erro" id="erroConnect${id}"></div>`
    ;
    conect.innerHTML = row;
}

function handleRemove(id, ip){
    for (let i = 0; i < ips.length; i++){
        if (ips[i] == ip){
            ips.splice(i,1);
            break;
        }
    }
    const row = document.querySelector(`#h${id}`);
    row.remove();
}

function ipToString(ip){
    let nIp = "";
    for (let i = 0; i < ip.length; i++){
        if (ip[i] != "."){
            nIp += ip[i];
        }
    }
    return nIp;
}

function swapPage(id){
    const user = document.querySelector("#userInput").value;
    const passwd = document.querySelector("#passwordInput").value;
    if (user == "adm" && passwd == "adm"){
        window.location.href = "./principal.html"
    } else {
        document.querySelector(`#erroConnect${id}`).innerHTML = "Preencha os Campos";
        setTimeout(function(){
            document.querySelector(`#erroConnect${id}`).innerHTML = "";
        }, 4000);
    }
}
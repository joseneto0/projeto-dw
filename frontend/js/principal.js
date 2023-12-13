const apiUrl = 'http://localhost:3000';


async function fetchData(endpoint, pos) {
  try {
    const response = await fetch(`${apiUrl}/${endpoint}`);
    const data = await response.json();
    let idLeft = 1, idRight = 1;
    for (const file of data){
        let div = document.createElement("div");
        if (endpoint == "filesClient"){
          div.className = "itensLeft";
          div.id = `dl${idLeft}`;
          idLeft++;
          div.textContent = file.arquivo;
          document.querySelector(".dinamicoLeft").appendChild(div);
        } else {
          div.className = "itensRight";
          div.id = `dr${idRight}`;
          idRight++;
          div.textContent = file.arquivo;
          document.querySelector(".dinamicoRight").appendChild(div);
        }
        div.onclick = function(){
          if (window.getComputedStyle(div).getPropertyValue('background-color') == "rgb(255, 247, 0)"){
            div.style.backgroundColor = "red";
            div.style.color = "white";
          } else {
            div.style.backgroundColor = "rgb(255, 247, 0)";
            div.style.color = "black";
          }
        };
    }
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
}

fetchData("filesClient");
fetchData("filesServer", 'right');

async function enviar(){
  const url = `${apiUrl}/filesServer`;
  let response;
  let datas = selecionados('left', url);
  if (datas.length == 0){
    Swal.fire({
      title: 'Erro!',
      text: 'Selecione um arquivo para continuar',
      icon: 'error',
      confirmButtonText: 'Beleza!'
    })
  } else {
    console.log(datas.length);
    for (const data of datas){
      const config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      response = await fetch(url, config);
    }
    location.reload();
    return await response.json();
  }
}

async function baixar(){
  const url = `${apiUrl}/filesClient`;
  let response;
  let datas = selecionados('right', url);
  if (datas.length == 0){
    Swal.fire({
      title: 'Erro!',
      text: 'Selecione um arquivo para continuar',
      icon: 'error',
      confirmButtonText: 'Beleza!'
    })
  } else {
    for (const data of datas){
      const config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      response = await fetch(url, config);
    }
    location.reload();
    return await response.json();
  }
}

function selecionados(pos, url){
    let datas = [];
    let div;
    let divPai;
    if (pos == 'left'){
      divPai = document.querySelector(".dinamicoLeft");
    } else if (pos == 'right') {
      divPai = document.querySelector(".dinamicoRight");
    }
    let tam = divPai.childNodes.length;
    for (let i = 1; i <= tam; i++){
      if (pos == 'left'){
        div = document.querySelector(`#dl${i}`);
      } else {
        div = document.querySelector(`#dr${i}`);
      }
      if (window.getComputedStyle(div).getPropertyValue('background-color') == "rgb(255, 0, 0)"){
        datas.push(create(div.textContent, pos, url));
      }
    }
    return datas;
}

function create(text, pos, url){
  let autor;
  if (pos == 'left'){
    autor = "Carlinhos";
  } else {
    autor = "Avex";
  }
  return obj = {
    arquivo: text,
    author: autor
  } 
}


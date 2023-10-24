const apiUrl = 'http://localhost:3000';

async function fetchData(endpoint) {
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
fetchData("filesServer");

async function enviar() {
  const url = `${apiUrl}/filesServer`;
  let data = {
    "arquivo": "teste.html",
    "author": "carlinhos"
  }
  const config = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url, config);

  return await response.json();
}
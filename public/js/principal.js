const apiUrl = 'http://localhost:3000';

async function fetchData(endpoint) {
  try {
    const response = await fetch(`${apiUrl}/${endpoint}`);
    const data = await response.json();
    console.log(data);
    for (const file of data){
        let div = document.createElement("div");
        div.className = "itensLeft";
        div.textContent = file.arquivo;
        document.querySelector(".dinamicoLeft").appendChild(div);
    }
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
}

fetchData("filesClient");

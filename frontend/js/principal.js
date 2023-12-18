import Auth from './auth';

if (!Auth.isAuthenticated()){
  location.href = "./index.html";
}

function executeSCP() {
  const usuario = document.getElementById("user").value;
  const passwd = document.getElementById('passwd').value;
  const path = document.getElementById('path').value;
  const urlParams = new URLSearchParams(window.location.search);
  const ip = urlParams.get('ip');
  fetch('/api/scp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ usuario, ip, passwd, path }),
  })
  .then(response => response.text())
  .then(output => {
    
    document.getElementById('output').innerText = "Deu certo :D";
  })
  .catch(error => {
    console.error('Error:', error);
    document.getElementById('output').innerText = 'Error: ' + error.message;
  });
}

function executeLS(){
  const usuario = document.getElementById("user").value;
  const passwd = document.getElementById('passwd').value;
  const urlParams = new URLSearchParams(window.location.search);
  const ip = urlParams.get('ip');
  fetch('/api/ls', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ usuario, ip, passwd }),
  })
  .then(response => response.text())
  .then(output => {
    console.log(output)
    document.getElementById('output').innerText = output;
  })
  .catch(error => {
    console.error('Error:', error);
    document.getElementById('output').innerText = 'Error: ' + error.message;
  });
}

window.executeSCP = executeSCP;
window.executeLS = executeLS;
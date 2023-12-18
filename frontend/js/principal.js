function executeSCP() {
  const passwd = document.getElementById('passwd').value;
  const destinationHost = document.getElementById('destinationHost').value;
  const destinationPath = document.getElementById('destinationPath').value;
  const options = document.getElementById('options').value;

  // Enviando dados para o backend
  fetch('http://localhost:3000/scp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ passwd, destination: `${destinationHost}:${destinationPath}`, options }),
  })
  .then(response => response.text())
  .then(output => {
    document.getElementById('output').innerText = output;
  })
  .catch(error => {
    console.error('Error:', error);
    document.getElementById('output').innerText = 'Error: ' + error.message;
  });
}

window.executeSCP = executeSCP;
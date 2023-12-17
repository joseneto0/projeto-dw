async function cadastrar(){
    const usuario = document.querySelector(".usuario").value;
    const senha = document.querySelector(".senha").value;
    if (usuario == "" || senha == ""){
      Swal.fire({
        title: 'Erro!',
        text: 'Coloque os campos corretamente',
        icon: 'error',
        confirmButtonText: 'Beleza!'
      })
    } else if (usuario != "" && senha != ""){
        let login = {
            username: usuario,
            password: senha
        }
        const config = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(login),
        };
        const response2 = await fetch('/api/registro', config);
        if (response2.ok){
            location.href = "./index.html";
        }
        
    }
    
}

window.cadastrar = cadastrar;
const apiUrl = 'http://localhost:3000';
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
        const url = `${apiUrl}/login`;
        const response1 = await fetch(`${url}`);
        const data = await response1.json();
        for (const login of data){
            if (login.usuario == usuario){
                Swal.fire({
                    title: 'Usuário Inválido',
                    text: 'Usuário em uso',
                    icon: 'error',
                    confirmButtonText: 'Beleza!'
                })
                document.querySelector(".usuario").value = "";
                document.querySelector(".senha").value = "";
                return;
            }
        }
        let login = {
            usuario: usuario,
            senha: senha
        }
        const config = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(login),
        };
        Swal.fire({
            title: 'Sucesso!',
            text: 'Cadastro realizado',
            icon: 'success'
        })
        const response2 = await fetch(url, config);
        setTimeout(function(){
            window.location.href = '../../index.html';
        }, 3000);
        return await response2.json();
    }
    
}
$(document).ready(function () {
    M.updateTextFields();
  });

   function conferirSenhas()
   {
     var enderecoAEnviar = document.getElementById('endereco').value;
     var senha1          = document.getElementById('password').value;
     var senha2          = document.getElementById('password1').value;
     var nome            = document.getElementById('first_name').value;
     var ultimoNome      = document.getElementById('last_name').value;
     var emailAEnviar    = document.getElementById('email').value;

       if(enderecoAEnviar == '')
      alert("Preencha todos os campos.");
    else
     if(nome == '')
      alert("Preencha todos os campos.");
    else
       if(ultimoNome == '')
      alert("Preencha todos os campos.");
    else
       if(emailAEnviar == '')
      alert("Preencha todos os campos.");
    else
       if(senha1 == '')
      alert("Preencha todos os campos.");
    else
       if(senha2 == '')
      alert("Preencha todos os campos.");
    else
      if(senha1 != senha2)
      {
        alert("As senhas não coincidem.")
        document.getElementById('password').value = '';
        document.getElementById('password1').value = '';
      }
      else
      {
        let dados =
        {
            first_name: nome,
            last_name: ultimoNome,
            email: emailAEnviar,
            password: senha1,
            endereco: enderecoAEnviar
        };

        $.post("http://localhost:40000/Responsavel", dados,
        function(data, status){
            if (status=='success')
            {
              alert("Cadastrado com sucesso!");
              alert(data.mensagem);
              document.getElementById('password').value = '';
              document.getElementById('password1').value ='';
              document.getElementById('first_name').value = '';
              document.getElementById('last_name').value = '';
              document.getElementById('email').value = ''; 
            }
            else
              alert('Ocorreu um erro!');
        });

        
      }
   }
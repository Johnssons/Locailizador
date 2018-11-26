function compraPulseira()
{
  debugger;

	if(sessionStorage.getItem("codResponsavel") != null)
	{
       if(sessionStorage.getItem("codResponsavel") != undefined)
       {
       	  var responsavel1 = sessionStorage.getItem("codResponsavel");

       	  var dados =
       	  {
             responsavel: responsavel1
       	  };

           $.post("http://localhost:3000/Usuario", dados,
           function(data, status){
            debugger;
            if (status=='success')
            {
              alert("Usuario novo cadastrado!");
              alert(data.mensagem);
            }
             else
             {
                 alert("Ocorreu um erro!");
             }
            });

            $.post("http://localhost:3000/Pulseira/compra", dados,
            function(data, status){
            debugger;
            if (status=='success')
            {
              alert("Pulseira comprada!");
            }
            else
            {
              alert("Ocorreu um erro");
            }
           });
       }
       else
       {
          alert("Logue antes de comprar!");
       }
	}
  else
     {
       alert("Logue antes de comprar!");
     }

}
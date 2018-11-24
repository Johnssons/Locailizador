function compraPulseira
{
	if(sessionStorage.getItem("codResponsavel") != null)
	{
       if(sessionStorage.getItem("codResponsavel") != undefined)
       {
       	  let responsavel = sessionStorage.getItem("codResponsavel");

       	  let dados =
       	  {

       	  }

           $.post("http://localhost:40000/Usuario", dados,
           function(data, status){
            if (status=='success')
            {
              
            }
            else
              alert('Ocorreu um erro!');
       }
       else{alert("Logue antes de comprar!");}
	}else{alert("Logue antes de comprar!");}
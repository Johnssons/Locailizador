 $(document).ready(function() {
     var teste = sessionStorage.getItem("codResponsavel");
     if(teste != "null")
     {
      if(teste != undefined)
      {
        $("#logar").append('<button onclick = "sair()">Sair</button>');
      }
     }
    M.updateTextFields();
  });

function loginResponsavel()
{ 
    debugger;

    var emailAEnviar = document.getElementById('email').value;
    var senha1   = document.getElementById('password').value;

    let logou = false;

    let dados =
    {
        email: emailAEnviar,
        senha: senha1
    };

    $.post("http://localhost:40000/Responsavel/login", dados,
    function(data, status){
        if (status=='success')
        {
           if (data[0].codResponsavel != undefined)
           {
               sessionStorage.setItem("codResponsavel", data.codResponsavel);
               //sessionStorage.getItem("codResponsavel");
               logou = true;
               alert('Logou!');
               depoisDeLogar(logou);
           }
           else
           {
              alert('!Logou');
           }
        }
     }); 
}

function depoisDeLogar(logou)
{
    if(logou == false)
    {
       alert('Este e-mail não está cadastrado ou a senha não coincide.');
       document.getElementById('email').value = emailAEnviar;
    }
    else
    {
       document.getElementById('email').value = '';
       document.getElementById('password').value = '';
       $("#logar").append('<button onclick = "sair()">Sair</button>');
       tudoVisivel();
    }
}

function sair()
{
	sessionStorage.setItem("codResponsavel", null);
	alert("Você não está mais logado!");
}

function colocarMapa() 
{
   var mapOptions =
   {
     center: {lat:42.3601, lng:-71.0589},
     zoom: 8
   };
   var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
}

function marcar()
{
   debugger;

   let cordx, cordy;

   let codPulseira = document.getElementById('rastrearTxt').value;

   if(sessionStorage.getItem("codResponsavel") != "null")
   {
     var codResponavelLogado = sessionStorage.getItem("codResponsavel");
   }

   $.post("http://localhost:40000/Pulseira/id", codPulseira,
    function(data, status)
    {
      if(status == 'success')
      {
        if(data[0].codResponsavel != undefined)
        {
          if(data[0].codResponsavel = codResponavelLogado)
          {
            alert("A pulseira é sua");
 
            $.post("http://localhost:40000/Pulseira/cordy", codPulseira,
            function(data, status)
            {
               if(status == 'success')
              {
                if(data[0].cordy != undefined)
                {
                   alert("A pulseira tem uma cordy!");
                   cordy = data[0].cordy;
 
                   $.post("http://localhost:40000/Pulseira/cordx", codPulseira,
                   function(data, status)
                   {
                      if(status == 'success')
                     {
                       if(data[0].cordx != undefined)
                       {
                          alert("A pulseira tem uma cordx!");
                          cordx = data[0].cordx;
 
                          var ponto = new google.maps.LatLng(cordy, cordx);
                          var marker = new google.maps.Marker
                          ({
                             position: ponto,
                             map: map,
                             title:"A pulseira está aqui"
                          });
                       }
                       else
                       {
                         alert("Essa pulseira não tem uma cordx!");
                       }
                     }
                   });
               }
               else
               {
                 alert("Essa pulseira não tem uma cordy!");
               }
             }
           });
         }
        }
        else
        {
          alert("Essa pulseira não existe ou não é sua!");
        }
      }
    });
}

function tudoVisivel()
{
  document.getElementById('mapa').style.display = "block";
  document.getElementById('rastrear').style.display = "block";
  document.getElementById('rastrearTxt').style.display = "block";
  colocarMapa();
}
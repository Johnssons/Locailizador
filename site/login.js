 $(document).ready(function() {
     var teste = sessionStorage.getItem("codResponsavel");
     if(teste != "null")
     {
      $("#logar").append('<button onclick = "sair()">Sair</button>');
     }
    M.updateTextFields();
  });

function loginResponsavel()
{ 
    var emailAEnviar = document.getElementById('email').value;
    var senha1   = document.getElementById('password').value;

    let logou = false;

    let dados =
    {
        email: emailAEnviar,
        senha: senha1
    };

    $.post("http://localhost:3000/Responsavel/login", dados,
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
       document.getElementById('mapa').style.display = 'block';    
       botarMapa();
       $("#pulseiras").append('<select id="comboBox"><option value="tst">teste</option></select>');
    }
}

function sair()
{
	sessionStorage.setItem("codResponsavel", null);
	alert("Você não está mais logado!");
}

function botarMapa() 
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
   var ponto = new google.maps.LatLng(-25.363882,131.044922);
   var marker = new google.maps.Marker
   ({
         position: ponto,
         map: map,
         title:"A pulseira está aqui"
   
   });
}
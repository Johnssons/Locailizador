const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const porta = 3000; //porta padrão
const sql = require('mssql');
const conexaoStr = "Server=regulus;Database=PR118185;User Id=PR118185;Password=PR118185;";

//conexao com BD
sql.connect(conexaoStr)
   .then(conexao => global.conexao = conexao)
   .catch(erro => console.log(erro));

// configurando o body parser para pegar POSTS mais tarde   
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//acrescentando informacoes de cabecalho para suportar o CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PATCH, DELETE");
  next();
});

//definindo as rotas
const rota = express.Router();
rota.get('/', (requisicao, resposta) => resposta.json({ mensagem: 'Funcionando!'}));
app.use('/', rota);

//inicia servidor
app.listen(porta);
console.log('API Funcionando!');

function execSQL(sql, resposta) {
global.conexao.request()
              .query(sql)
              .then(resultado => resposta.json(resultado.recordset))
              .catch(erro => resposta.json(erro));
}

//retorna a cordenada y da pulseira
rota.post('/Pulseira/cordy', (requisicao, resposta) =>{
execSQL('SELECT cordY FROM Pulseira WHERE CodPulseira=' + parseInt(requisicao.body.cordy), resposta);
})

//retrona a cordenada x da pulseira
rota.post('/Pulseira/cordx', (requisicao, resposta) =>{
execSQL('SELECT cordX FROM Pulseira WHERE CodPulseira=' + parseInt(requisicao.body.cordx), resposta);
})

// retorna o código do responsavel pela pulseira
rota.post('/Pulseira/id', (requisicao, resposta) => {
execSQL('SELECT codResponsavel FROM Pulseira WHERE CodPulseira =' + parseInt(requisicao.body.codPulseira), resposta);
})

//adiciona um responsavel
rota.post('/Responsavel', (requisicao, resposta) =>{
    //const cod = ultimoResp++;
    const nome = (requisicao.body.first_name + ' ' + requisicao.body.last_name).substring(0,50);
    const email = requisicao.body.email.substring(0,60);
    const senha = requisicao.body.password;
    const endereco = requisicao.body.endereco.substring(0,100);
    execSQL(`INSERT INTO Responsavel(nome, endereco, senha, email) VALUES('${nome}','${endereco}','${senha}','${email}')`, resposta);
    let maiorCod = `(SELECT max(codResponsavel) from Responsavel)`;
    console.log(maiorCod);
    let ultimoNome = `(SELECT nome from Responsavel where codResponsavel = ${maiorCod})`;
    if(ultimoNome = nome)
    resposta.end(resposta.json({ mensagem: 'Incluído!'}));
    else
    resposta.end(resposta.json({ mensagem: 'Não incluído!'}));
})

//seleciona um codigo de responsavel
rota.post('/Responsavel/login', (requisicao, resposta) =>{
  execSQL('SELECT CodResponsavel FROM Responsavel WHERE email = \'' + requisicao.body.email + "\' AND senha = \'" + requisicao.body.senha + "\'" , resposta);
})

//adiciona um usuario
rota.post('/Usuario', (requisicao, resposta) =>{
    const codResponsavel = requisicao.body.responsavel;
    console.log(`INSERT INTO Usuario VALUES(${codResponsavel})`);
    execSQL(`INSERT INTO Usuario VALUES(${codResponsavel})`, resposta);
    resposta.end(resposta.json({ mensagem: 'Incluído!'}));
});

//adiciona uma pulseira
rota.post('/Pulseira/compra', (requisicao, resposta) =>{
  const codResponsavel = requisicao.body.responsavel;
  let codUsuario = `(Select max(CodUsuario) from Usuario)`;
  execSQL(`INSERT INTO Pulseira(codUsuario, codResponsavel) VALUES(${codUsuario}, ${codResponsavel})`, resposta);
  resposta.end(resposta.json({ mensagem: 'Incluído!'}));
});

//seleciona o maior codResponsavel na tabela responsavel
rota.post('/Responsavel/maior', (requisicao, resposta) =>{
  execSQL(`SELECT max(CodResponsavel) FROM Responsavel`, resposta);
})


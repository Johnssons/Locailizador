create table Pulseira(
CodPulseira int IDENTITY(1,1) primary key,
CodUsuario int not null,
constraint fkUsuarioPulseira  foreign key(CodUsuario) references Usuario(CodUsuario),
CodResponsavel int not null,
constraint fkResponsavelPulseira foreign key(CodResponsavel) references Responsavel(CodResponsavel)
)

create table Usuario(
CodUsuario int iDeNtItY(1,1) primary key,
nome varchar(50) not null,
endereco varchar(100) not null,
CodResponsavel int not null,
constraint fkResponsavelUsuario foreign key(CodResponsavel) references Responsavel(CodResponsavel)
)

create table Responsavel(
CodResponsavel int identity(1,1) primary key,
telefone varchar(15) not null,
nome varchar(50) not null,
endereco varchar(100) not null
) 

select * from Responsavel
select * from Usuario
select * from Pulseira

alter table Responsavel
add email varchar(60) not null

alter table Responsavel
add senha varchar(30) not null

alter table Pulseira
add cordX varchar(30) not null

alter table Pulseira
add cordY varchar(30) not null

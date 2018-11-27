create table Pulseira(
CodPulseira int IDENTITY(1,1) primary key,
CodUsuario int not null,
constraint fkUsuarioPulseira  foreign key(CodUsuario) references Usuario(CodUsuario),
CodResponsavel int not null,
constraint fkResponsavelPulseira foreign key(CodResponsavel) references Responsavel(CodResponsavel),
cordx int,
cordy int
)

create table Usuario(
CodUsuario int iDeNtItY(1,1) primary key,
nome varchar(50) not null,
CodResponsavel int not null,
constraint fkResponsavelUsuario foreign key(CodResponsavel) references Responsavel(CodResponsavel)
)

create table Responsavel(
CodResponsavel int identity(1,1) primary key,
nome varchar(50) not null,
endereco varchar(100) not null
) 

select * from Responsavel
select * from Usuario
select * from Pulseira

create trigger insereResp on Responsavel
for insert
as
begin
     declare @email varchar(30)
	 SET @email = (select email from Inserted)
     if((select count(*) from Responsavel where email = @email) > 1)
	   begin 
	        declare @maiorCodigo int = (select max(codResponsavel) from Responsavel)     
	       	delete from Responsavel where codResponsavel = @maiorCodigo
	   end
end 

alter table Responsavel
add email varchar(60) not null

alter table Responsavel
add senha varchar(30) not null

alter table Pulseira
add latitude varchar(30)

alter table Pulseira
add longitude varchar(30)


CREATE TABLE Paciente1(
	idPaciente int not null, 
	nombre varchar(50) not null, 
	apellido varchar (50) null,
	fechaNaciemiento date null, 
	domicilio varchar (50) null,
	idPais char(3), 
	telefono varchar(20) null, 
	email varchar(30) null,
	observacion varchar(1000)null,
	fechaAlta datetime not null,
	constraint PK_idPaciente PRIMARY KEY(idPaciente) --> Asginar primary key
)

--create table pagos (
--	idPago int IDENTITY (1,1) not null PRIMARY KEY,
--	concepto tinyint not null,
--	fecha datetime not null,
--	monto money not null,
--	estado tinyint, 
--	obs varchar(1000)
--)


CREATE TABLE PagoPaciente (

	idpago int not null,
	idPaciente int not null,
	idturno int not null,

	--> Crear realacion compuesta
	primary key (
		idpago,
		idPaciente,
		idturno
	)

)

create table Medico (
	idMedico int IDENTITY (1,1) not null PRIMARY KEY,
	nombre varchar(50),
	apellido varchar (50)
)

create table MedicoEspecialidad (
	idMedico int IDENTITY (1,1) not null,
	idEspecialidad int not null,
	Descripcion varchar(50) not null,
	
	primary key(
	idMedico,
	idEspecialidad
	)
)


create table Concepto (
	idconcepto tinyint IDENTITY (1,1) not null PRIMARY KEY, 
	descripcion varchar(100),
)

--> Crar Tipos de datos usuarios
create type Obervacion from int not null 
create type Obervacion from  varchar (1000)
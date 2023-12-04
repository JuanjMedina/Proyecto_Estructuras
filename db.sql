-- SQLBook: Code
DROP DATABASE IF EXISTS task_glide;
Create database task_glide;
USE task_glide;


CREATE TABLE task_glide.usuarios (
  id_usuario binary(16) primary key default(UUID_TO_BIN(uuid())),
  nombre VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL,
  telefono INT NOT NULL);

CREATE TABLE task_glide.reuniones (
  id_reunion INT NOT NULL AUTO_INCREMENT,
  link_reunion VARCHAR(100) NOT NULL,
  fecha_reunion DATE NOT NULL,
  hora_reunion TIME NULL,
  tema_reunion VARCHAR(45) NOT NULL,
  descripcion_reunion VARCHAR(200) NULL,
  PRIMARY KEY (id_reunion));
  
  
  CREATE TABLE task_glide.carpetas (
  id_carpeta INT NOT NULL AUTO_INCREMENT,
  nombre_carpeta VARCHAR(20) NOT NULL,
  created timestamp default current_timestamp,
  PRIMARY KEY (id_carpeta));
  
  CREATE TABLE task_glide.notas (
  id_nota INT AUTO_INCREMENT NOT NULL,
  tema_nota VARCHAR(20) NOT NULL,
  fecha_nota DATE NOT NULL,
  descripcion_nota VARCHAR(500) NULL,
  id_carpeta INT NOT NULL,
  PRIMARY KEY (id_nota),
  FOREIGN KEY (id_carpeta) REFERENCES task_glide.carpetas(id_carpeta) ON DELETE CASCADE);

  CREATE TABLE task_glide.subnotas (
  id_subnotas INT NOT NULL,
  nombre_subnota VARCHAR(20) NOT NULL,
  descripcion_subnota VARCHAR(500) NULL,
  id_nota INT NOT NULL,
  PRIMARY KEY (id_subnotas),
  FOREIGN KEY (id_nota) REFERENCES task_glide.notas(id_nota));

  CREATE TABLE task_glide.reunion_usuario (
  id_usuario  binary(16) NULL,
  id_reunion INT NOT NULL,
  FOREIGN KEY (id_reunion) REFERENCES task_glide.reuniones (id_reunion),
  FOREIGN KEY (id_usuario) REFERENCES task_glide.usuarios (id_usuario));
  
  CREATE TABLE task_glide.carpeta_usuario (
  id_usuario binary(16) NOT NULL,
  id_carpeta INT NOT NULL,
  FOREIGN KEY (id_carpeta) REFERENCES task_glide.carpetas (id_carpeta),
  FOREIGN KEY (id_usuario) REFERENCES task_glide.usuarios (id_usuario));
  
  
-- insert into task_glide.usuarios values (UUID_TO_BIN(uuid()),'emiliano', 'emiliano@unal.edu.co',323233);
-- select  BIN_TO_UUID(id_usuario) id_usuario,nombre , email ,telefono from task_glide.usuarios;
-- delete from task_glide.usuarios where usuarios.id_usuario = UUID_TO_BIN("62064e2f-651e-11ee-ad06-204ef64c69c6");

-- select uuid() as uuid;


-- insert into task_glide.carpetas (nombre_carpeta) values ( 'string');

-- select * from task_glide.carpetas;

-- insert into task_glide.notas (tema_nota,fecha_nota,descripcion_nota,id_carpeta) values ('tema random ','2023-10-08' ,'descripcion',1);

-- select * from task_glide.notas;

-- delete from task_glide.carpetas where task_glide.carpetas.id_carpeta=1;

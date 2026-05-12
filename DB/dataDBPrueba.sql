CREATE DATABASE IF NOT EXISTS datadb;
USE datadb;

CREATE TABLE tickets_soporte (
  id INT PRIMARY KEY AUTO_INCREMENT,
  asunto VARCHAR(150) NOT NULL,
  descripcion TEXT NOT NULL,
  prioridad VARCHAR(20) NOT NULL,
  fecha_creacion DATETIME NOT NULL,
  estado VARCHAR(30) NOT NULL,
  canal VARCHAR(30) NOT NULL
);

CREATE TABLE empleados_rrhh (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombres VARCHAR(120) NOT NULL,
  cargo VARCHAR(100) NOT NULL,
  salario DECIMAL(12,2) NOT NULL,
  fecha_ingreso DATE NOT NULL,
  departamento VARCHAR(80) NOT NULL,
  contrato_activo BOOLEAN NOT NULL
);
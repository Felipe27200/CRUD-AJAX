<?php
    // Se realiza la conexión de esta forma, ya que está mucho más enfocado
    // a MySQL que PDO
    // $connection = new mysqli('localhost', "root", 'hola123', 'task_app');

    $conexion = Conexion::getConexion();

    class Conexion{
        public static function getConexion(){
            $conn = null;

            $baseDatos = "task_app";
            $usuario = "root";
            $contrasenia = "hola123";

            try {
                /* Realiza la conexión mediante la clase PDO, se le concatena el nombre de la 
                    base de datos y se le envía el usuario y contraseña del servidor*/            
                $conn = new PDO("mysql:host=localhost;dbname=".$baseDatos, $usuario, $contrasenia);

                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch (PDOException $ex) {
                echo 'ERROR: '.$ex->getMessage();
            }

            return $conn;
        } 
    } 
    // if ($connection)
    //     echo "Conexión realizada";
    
        
?>
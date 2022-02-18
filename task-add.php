<?php
    require_once 'conexion.php';

    if (isset($_POST['name'])){
        try{
            $name = $_POST['name'];
            $description = $_POST['description'];
    
            $query = $conexion->prepare('INSERT INTO task(name, description) VALUES (?, ?)');
            $query->bindParam(1, $name);
            $query->bindParam(2, $description);
    
            $query->execute();

            echo 'Task add successfully';
        } 
        catch(Exception $ex){
            echo 'Error'.$ex->getMessage();
        }
    }
?>
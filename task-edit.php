<?php
    require_once "conexion.php";

    try{
        $query = $conexion->prepare("UPDATE task SET name = ?, description = ? WHERE id = ?");
        $query->bindParam(1, $_POST['name']);
        $query->bindParam(2, $_POST['description']);
        $query->bindParam(3, $_POST['id']);
        
        $query->execute();
    }
    catch (Exception $ex){
        echo "Error".$ex->getMessage();
    }
?>
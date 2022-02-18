<?php
    require_once "conexion.php";

    try{
        if (isset($_POST['id'])){
            $id = $_POST['id'];
    
            $query = $conexion->prepare("UPDATE task SET estado = 0 WHERE id = ?");
            $query->bindParam(1, $id);
            $query->execute();
        }
    }
    catch (Exception $ex){
        echo "Error: ".$ex->getMessage();
    }
?>
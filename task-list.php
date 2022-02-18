<?php
    require_once "conexion.php";

    try{
        $query = $conexion->prepare("SELECT * FROM task WHERE estado = 1");
        $query->execute();

        $resultado = $query->fetchAll();

        $json = array();

        foreach($resultado as $row){
            array_push($json,
            array(
                'name' => $row['name'],
                'description' => $row['description'],
                'id' => $row['id']
            ));
        }

        $jsonString = json_encode($json);

        echo $jsonString;
    } catch (Exception $ex){
        echo "Error".$ex->getMessage();
    }
?>
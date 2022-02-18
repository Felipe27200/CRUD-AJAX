<?php
    require_once "conexion.php";

    try{
        $query = $conexion->prepare("SELECT * FROM task WHERE id = ?");
        $query->bindParam(1, $_POST['id']);
        
        $query->execute();

        $json = array();

        foreach ($query->fetchAll() as $row){
            array_push($json, 
                array(
                    'name' => $row['name'],
                    'description' => $row['description'],
                    'id' => $row['id']
                )
            );
        }

        $jsonString = json_encode($json[0]);

        echo $jsonString;
    }
    catch (Exception $ex){
        echo "Error: ".$ex->getMessage();
    }
?>
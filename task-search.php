<?php
    require_once 'conexion.php';

    /* Se almacena el valor enviado por el archivo .js
    a través de la propiedad data del objeto de la funcion $.ajax() */
    try{
        $search = $_POST['search'].'%';

        // Se confirma que el valor recibido no este vacío
        if (!empty($search)){

            // Se prepara la sentencia SQL
            // % en SQL indica que traiga todos los valores que coincidan con los caracteres enviados
            $query = $conexion->prepare("SELECT * FROM task WHERE name LIKE ? AND estado = 1");
            $query->bindParam(1, $search);

            $query->execute();
            
            $resultado = $query->fetchAll();
            /* Si todo sale bien, se convierte el resultado en 
            un archivo json, pero para eso se debe recorrer para
            convertirlo en formato json*/


            /* mysqli_fetch_array() convierte el resultado en un array
            al parecer por fila, por eso se almancena el resultado en la variable
            $row*/

            /* Procesa fila por fila */

            // Este almacenara finalmente todas las filas de la consulta
            $json = array();

            foreach($resultado as $row){
                /* Mediante la función array_push, se agregaran
                elementos al array $json*/
                array_push($json,
                
                    /* Este array asociativo representa las filas del $json
                    y sus elementos serán los columnas */
                    array(
                        'name' => $row['name'],
                        'description' => $row['description'],
                        'id' => $row['id']
                    ));
            }

            // Convierte la variable en formato json
            // pero la retorna como un formato String
            $jsonString = json_encode($json);

            /* De esta forma se retorna el formato json
            a quién hizo la petición */
            echo $jsonString;
        }
    }
    catch(Exception $ex){
        echo "Error".$ex->getMessage();
    }    
?>
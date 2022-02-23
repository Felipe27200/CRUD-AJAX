/* Está es la sintaxis jquery para crear una función */
 $(document).ready(function () // -> BUSCAR QUE HACE 
// $(function ()
{
    let editar = false;

    /* Oculta el elemento HTML con ese id. */
    $('#task-result').hide();

    fetchTasks();

    // console.log('Jquery está funcionando')

    // BUSCAR UN ELEMENTO EN LA BD

    /* Se le indica que capture el elemento con id: search
        que es un elemento en html, para realizar una busqueda*/

    /* keyup es el evento que se va a recuperar, que sucede cuando
    el usuario ha clickeado alguna letra sobre el elemento, cuando
    ocurra esto se va a manejar con una función*/
    $('#search').keyup(function(){
        /* Lo que se quiere hacer es obtener el valor dentro
        del elemento search, esto gracias al método val()*/
        let search = $('#search').val();

        /* Cada vez que el usuario escribe una letra dentro del elemento input con 
        id: search, se almacenará en la variable search, concatenando los valores,
        según se vayan agregando
        console.log(search);*/

        /* Es un método de jquery que permite realizar una petición a un servidor
        justo como se había visto en el ejemplo anterior */

        // Este método requiere de un objeto
        $.ajax({
            /* En este objeto es en el que se indica la dirección a la que 
            se va a hacer al petición */
            url: 'task-search.php',
            
            // Aquí se establece el tipo de esa condición
            type: 'POST',

            // Esta propiedad permite enviarle un valor al servidor
            // en está ocasión se le envía la variable search
            data: {search},

            /* En está función se recibira la respuesta del servidor, en este
            caso recibe el formato json que se le envió desde el servidor, a
            través de task-search.php*/
            success: function(response){

                if ($('#search').val()){
                    /* Aquí se hace la conversión a json, para poder presentarlo en pantalla */
                
                    /* Como los datos recibidos se enviaron en un array en task-search.php,
                    se almacenara como un array*/
                    let tasks = JSON.parse(response)

                    if (tasks != null)
                    {
                        /* Variable para almacenar cód. HTML*/
                        let template = "";

                        /* Ya que es un array posee un método foreach para
                        iterar a través de sus elementos */
                        tasks.forEach(task => {

                            /* `` permiten escribir una cadena en varias líneas */
                            template +=
                            
                            /* Gracias a ${task.name} se puede acceder al valor de ese elemento.
                            Como se ve se encierra en elemento HTML, para que en el archivo index.html
                            se lea como cód. HTML */
                            `
                                <li>${task.name}</li>
                            `
                        });

                        // Se le asigna el valor de template al elemento con el id
                        // container en el index.html
                        $('#container').html(template);

                        // Muestra el elemento HTML con ese id
                        $('#task-result').show();
                    }
                    else
                       $('#task-result').hide();

                   
               }
               else
                   $('#task-result').hide();

            }
        })
    })

    // AÑADIR DATOS EN LA BD

    /* Se van a tomar los datos del formulario con ese id, mediante su evento submit */
    $('#task-form').submit(function(e) {

        /* Este objeto se encarga de almacenar los valores de los inputs
        del formulario */
        const postData = {
            name: $('#name').val(),
            description: $('#description').val(),
            id: $('#taskId').val()
        }

        // Según el valor se edita o se añade
        let url = editar === false ? 'task-add.php' : 'task-edit.php';

        /* Jquery provee un método para el envío post, que es más corto y sencillo de implementar */
        /* Sus parámetros son: 1. la dirección a la que se hará la petición 2. lo que se le va a
        enviar 3. Que se hará con la respuesta del servidor, en este caso se usa una función */
        $.post(url, postData, function(response) {
            console.log(response);

            /* Cada vez que se ingrese una nueva tarea, se llamará al método, 
            para que imprima el valor añadido, esto sin necesidad de refrescar la 
            página */
            fetchTasks();

            /* De esta forma cada vez que se oprima submit,
            el formulario limpiara sus campos*/
            $('task-form').trigger('reset');
        } )
        // console.log(postData)
        // console.log('Enviando');
        
        /* Por defecto cuando se oprime submit en el formulario este refresca la pág. para
        hacer la petición al servidor */

        /* Así se deshabilita el evento por defecto, en este. Esto porque se debe decidir
        en que momento se debe refrescar y enviar datos */
        e.preventDefault()
    })

    // MOSTRAR EN LA TABLA LOS DATOS DE LA BD

    /* Se usa una función para poder llamarla y mostrar los valores en la BD
    cada vez que se ejecute una acción */
    function fetchTasks(){
        /* Aquí se van a listar los datos dentor de la BD, esto
            mediante un método ajax(). Este se ejecuta apenas la aplicación se inicia */
        $.ajax({
            url: 'task-list.php',
            type: 'GET',   
            success: function(response){
                /* Se hace la conversión de la respuesta a json */
                let tasks = JSON.parse(response);
                let template = '';
    
                /* Se va a recorrer el objeto con los valores json */
                tasks.forEach(task => {
                    /* Se va a añadir uno a uno cada elemento, del objeto tasks.
                    Se establece que van a ir fila por fila de la tabla en el index y 
                    los </td> son los valores en columnas */
                    template += `
                        <tr taskId="${task.id}">
                            <td>${task.id}</td>
                            <td>
                                <a href="#" class="task-item">${task.name}</a>
                            </td>
                            <td>${task.description}</td>
                            <td>
                                <!-- Este butón tiene la clase task-delete (propia), 
                                para que se puede atrapar su evento en JS -->
                                <button class="task-delete btn btn-danger">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    `;
                })
    
                /* Se añade el valor de template a el elemento tbody con id: tasks, para
                así imprimir los valores del objeto tasks en HTML*/
                $('#tasks').html(template);            
            }
        })
    }

    // ELIMINAR

    /* Esto quiere decir: "en el documento se va a escuchar el evento click pero solo de 
    la clase .task-delete (DECLARADA PARA BOTÓN DE DELETE) y que ejecute una función", este
    es la función respectiva de cada parámetro */
    $(document).on('click', '.task-delete', function () {

        /* Aquí se lanza una alerta, que le pide al usuario que confirme si
        quiere elimnar el elemento */
        if (confirm("Estás seguro que lo quieres eliminar"))
        {
            /* Con this se obtiene el elemento clickeado */
    
            /* Como es un arreglo solo se quiere obtener el primer elemento, que es aquel que
            ha sido clickeado.
            
            Con parentElement, se retorna en forma de objeto al elemento padre*/
            let element = $(this)[0].parentElement.parentElement;
    
            /* Para obtener el id que se encuentra en el objeto padre </tr>, usamos el elemento
            mediante la variable element, y se usa el método attr() para obtener el valor de su
            atributo taskId */
            let id = $(element).attr('taskId');

            
    
            $.post('task-delete.php', {id}, function(response){
                fetchTasks();
            });
    
            // console.log(id)
        }
    })

    // EDITAR

    $(document).on('click', '.task-item', function (){
        // Obtengo el </tr>, mismo proceso para eliminar
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('taskId');

        $.post('task-single.php', {id}, function(response){
            const task = JSON.parse(response)

            /* De esta forma se les asigna un valor a los elementos, mediante
            su id, en este caso los inputs del formulario */
            $('#name').val(task.name);
            $('#description').val(task.description);
            $('#taskId').val(task.id);

            // El valor cambia para poder realizar la modificación de los datos
            editar = true;
        })
        // console.log(id)
    })
})

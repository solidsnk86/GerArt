<?php
// Conexión a la base de datos
$conexion = mysqli_connect("nombre_del_servidor", "nombre_de_usuario", "contraseña", "nombre_de_la_base_de_datos");

// Verificar la conexión
if (!$conexion) {
    die("Error al conectar a la base de datos: " . mysqli_connect_error());
}

// Obtener los valores del cliente
$ipCliente = $_SERVER['REMOTE_ADDR'];
$agenteUsuario = $_SERVER['HTTP_USER_AGENT'];
$urlSitioWeb = $_SERVER['HTTP_HOST'];
$metodoSolicitud = $_SERVER['REQUEST_METHOD'];
$idSesionCliente = session_id();

// Insertar los datos en la base de datos
$sql = "INSERT INTO datos_cliente (ip_cliente, agente_usuario, url_sitio_web, metodo_solicitud, id_sesion)
        VALUES ('$ipCliente', '$agenteUsuario', '$urlSitioWeb', '$metodoSolicitud', '$idSesionCliente')";

if (mysqli_query($conexion, $sql)) {
    echo "Datos del cliente guardados en la base de datos.";
} else {
    echo "Error al guardar los datos: " . mysqli_error($conexion);
}

// Cerrar la conexión
mysqli_close($conexion);
?>

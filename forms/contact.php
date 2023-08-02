// Formulario para backend

<?php
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
require 'PHPMailer/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Recuperar los datos del formulario
$nombre = $_POST['nombre'];
$telefono = $_POST['telefono'];
$correo = $_POST['correo'];
$tema = $_POST['tema'];
$mensaje = $_POST['mensaje'];

$destinatario = 'neotecs-dev@neotecs.tech';

// Crear el mensaje de confirmación
$asunto = 'Confirmación de contacto';
$mensaje_confirmacion = "Hola $nombre,\n\nGracias por contactarnos. Hemos recibido tu mensaje y nos pondremos en contacto contigo lo antes posible.\n\nSaludos,\nEl equipo de NeoTecs.";

// Enviar el correo de confirmación
$mail = new PHPMailer(true);
$mail->isSMTP();
$mail->SMTPDebug = SMTP::DEBUG_OFF;
$mail->Host = 'smtp.hostinger.com';
$mail->Port = 465;
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->SMTPAuth = true;
$mail->Username = 'correo-electrónico@tu-mail.com';
$mail->Password = 'contraseña';
$mail->setFrom('correo-electrónico@tu-mail.com', 'Nombre Apellido');
$mail->addAddress($correo, $nombre);
$mail->Subject = $asunto;
$mail->Body = $mensaje_confirmacion;

try {
    $mail->send();

    // Enviar una copia del mensaje de contacto a tu dirección de correo electrónico
    $asunto_contacto = 'Mensaje de contacto';
    $mensaje_contacto = "Has recibido un nuevo mensaje de contacto:\n\nNombre: $nombre\nTeléfono: $telefono\nCorreo electrónico: $correo\nTema: $tema\nMensaje: $mensaje";

    $mail->clearAddresses();
    $mail->addAddress($destinatario);
    $mail->Subject = $asunto_contacto;
    $mail->Body = $mensaje_contacto;

    $mail->send();

    echo 'Gracias por tu mensaje. Hemos enviado una confirmación a tu dirección de correo electrónico. Nos pondremos en contacto contigo pronto.';
} catch (Exception $e) {
    echo 'Hubo un error al enviar el correo. Por favor, intenta nuevamente más tarde.';
}
?>

<?php
 session_start();
 require_once "controladores/plantilla.controlador.php";

 require_once "controladores/productosDisensa.controlador.php";

 require_once "controladores/productosHolcim.controlador.php";

// require_once "controladores/urlplataforma.controlador.php";


// require_once "controladores/archivos.controlador.php";


  require_once "modelos/plantilla.modelo.php";

 require_once "modelos/rutas.php";


 //require_once "modelos/archivos.modelo.php";


 require_once "modelos/productosDisensa.modelo.php";

 require_once "modelos/productosHolcim.modelo.php";

/*=======================================
=            ENVIO DE CORREO            =
=======================================*/
/*require_once "extensiones/PHPMailer/src/PHPMailer.php";

require_once "extensiones/PHPMailer/src/SMTP.php";

require_once "extensiones/PHPMailer/src/Exception.php";*/
//require_once "extensiones/dropbox/vendor/autoload.php";
   $plantilla = new ControladorPlantilla();
   $plantilla->plantilla();
// require_once "vista/plantilla.php";
// echo "hola";

<?php

class ControladorPlantilla{

	public function plantilla(){

		include "vistas/plantilla.php";
	}

	/*=============================================
	TRAEMOS LOS ESTILOS DINÁMICOS DE LA PLANTILLA
	=============================================*/

	// public function ctrEstiloPlantilla(){

	// 	$tabla = "plantilla";

	// 	$respuesta = ModeloPlantilla::mdlEstiloPlantilla($tabla);

	// 	return $respuesta;
	// }
}
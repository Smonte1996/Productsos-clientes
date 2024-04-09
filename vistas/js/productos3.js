function Carrousel() {

  // Can also be used with $(document).ready()
  $('.flexslider').flexslider({
    animation: "slide",
  });
}

function RotarImagenes(){
  var anterior = "";
  var giro = 0;
  $(".btngirarLeft").click(function(){
    var id = $(this).attr("idimagen");
    if (anterior == ""){
      giro -= 90;
      $("#"+id).rotate({animateTo: giro});
      anterior = id;
    }else if (anterior != id){
      giro = 0;
      giro -=90;
      $("#"+id).rotate({animateTo: giro});
      anterior = id;
    }else{
      giro -=90;
      $("#"+id).rotate({animateTo: giro});
      anterior = id;
    }


  })
  $(".btngirarRight").click(function(){
    
    var id = $(this).attr("idimagen");
    if (anterior == ""){
      giro += 90;
      $("#"+id).rotate({animateTo: giro});
      anterior = id;
    }else if (anterior != id){
      giro = 0;
      giro +=90;
      $("#"+id).rotate({animateTo: giro});
      anterior = id;
    }else{
      giro +=90;
      $("#"+id).rotate({animateTo: giro});
      anterior = id;
    }
  })

}
/*===============================================
=            VISUALIZAR LAS IMÁGENES            =
===============================================*/
$('#datatableUserClienteSHolcim tbody').on("click", ".visualizar", function() {
    var idProducto = $(this).attr("idProducto");
  
    var datos = new FormData();
    datos.append("IdProducto", idProducto);
  // debugger;
    $.ajax({
  
      url: "ajax/productosHolcim.ajax.php",
      method: "POST",
      data: datos,
      cache: false,
      contentType: false,
      processData: false,
      success: function(respuesta) {
        // debugger;
        // console.log(respuesta);
        var productos = jQuery.parseJSON(respuesta);
        var mostrar = '<div class="col-xs-12 col-md-12">' +
          '<div id="visualProductos" class="flexslider">' +
          '<ul class="slides">' +
          '<li data-thumb="' + productos[0]['foto_portada'] + '">' +
          '<span >'+
          '<a href="' + productos[0]['foto_portada'] + '" target="_blank"><img id="portada"  src="../../ransa/' + productos[0]['foto_portada'] + '" /></a>' +
          '</span>'+
          '<p class="flex-caption">' + productos[0]['descripcion'] + '</p>' +
          '<button type="button"  idimagen = "portada" class="btn btn-primary btngirarLeft" style="background-color: #F39200; border-color: #fff;"><span class="fa fa-rotate-left"></button>'+
          '<button type="button" idimagen = "portada" class="btn btn-primary btngirarRight" style="background-color: #F39200; border-color: #fff;"><span class="fa fa-rotate-right" style="background-color: #F39200;"></span></button>'+
          '</li>';
          // console.log(productos[0]['multimedia']);
          if (productos[0]['multimedia'] != null && productos[0]['multimedia'] != "NULL" ){
                  if (productos[0]['multimedia'].length > 0) {
  
                    var multimedia = jQuery.parseJSON(productos[0]['multimedia']);
                    for (var i = 0; i < multimedia.length; i++) {
                      mostrar += '<li data-thumb="' + multimedia[i]['multimedia'] + '">' +
                        '<a href= "'+multimedia[i]['multimedia']+'" target="_blank"><img id="'+i+'" src="../../ransa/' + multimedia[i]['multimedia'] + '" /></a>' +
                        '<p class="flex-caption">' + productos[0]['descripcion'] + '</p>' +
                        '<button type="button" idimagen='+i+' class="btn btn-primary btngirarLeft" style="background-color: #F39200; border-color: #fff;"><span class="fa fa-rotate-left"></button>'+
                        '<button type="button" idimagen='+i+' class="btn btn-primary btngirarRight" style="background-color: #F39200; border-color: #fff;"><span class="fa fa-rotate-right"></span></button>'+
                        '</li>';
                    }
                    mostrar += '</ul>' +
                      '</div>' +
                      '</div>';
                  }
  
          }
        Swal.fire({
          title: 'Visualización de Productos',
          width: 400,
          padding: '3em',
          html: mostrar,
          showCloseButton: true
        });
         Carrousel();
         RotarImagenes();
      }
  
    })
  });
  
  /*===================================================
  =            TABLA DE PRODUCTOS CLIENTES            =
  ===================================================*/
  $(".TablaClienteSHolcim").DataTable({
  
    "ajax": "ajax/TablaProductosHolcim.ajax.php",
    "deferRender": true,
    "retrieve": true,
    "processing": true,
    "language": {
  
      "sProcessing": "Procesando...",
      "sLengthMenu": "Mostrar _MENU_ registros",
      "sZeroRecords": "No se encontraron resultados",
      "sEmptyTable": "Ningún dato disponible en esta tabla",
      "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
      "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0",
      "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
      "sInfoPostFix": "",
      "sSearch": "Buscar:",
      "sUrl": "",
      "sInfoThousands": ",",
      "sLoadingRecords": "Cargando...",
      "oPaginate": {
        "sFirst": "Primero",
        "sLast": "Último",
        "sNext": "Siguiente",
        "sPrevious": "Anterior"
      },
      "oAria": {
        "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
      }
  
    }
  
  })
  /*=====================================================
=            BOTON EDITAR PRODUCTOS                  =
=====================================================*/
$('#datatableUserClienteSHolcim tbody').on("click", ".btnEditarProducto", function() {
  var idProducto = $(this).attr("idProducto");

  var datos = new FormData();
  datos.append("IdProducto", idProducto);

  if (window.matchMedia("(max-width:767px)").matches){
    $(".dz-message").html("Haz click para Seleccionar la Imagen");
    //var num = $("#inputEditar .input-lg").length;
    //for (var i = 0; i < num; i++) {
      $("#inputEditar .input-lg").addClass ("input-sm");
      $("#inputEditar .input-lg").removeClass("input-lg");
      
      
    //}
  }
// debugger;

  $.ajax({

    url: "ajax/productosHolcim.ajax.php",
    method: "POST",
    data: datos,
    cache: false,
    contentType: false,
    processData: false,
    dataType: "json",
    success: function(respuesta) {
      console.log(respuesta);
       debugger;
      $("#modalEditarProducto .idProducto").val(respuesta[0]["idproducto"]);
      $("#modalEditarProducto .codigoProducto").val(respuesta[0]["codigo"]);
      $("#modalEditarProducto .tubicacionProducto").val(respuesta[0]["tipubicacion"]);
      $("#modalEditarProducto .familiaProducto").val(respuesta[0]["familia"]);
      $("#modalEditarProducto .grupoProducto").val(respuesta[0]["grupo"]);
      $("#modalEditarProducto .descripcionProducto").val(respuesta[0]["descripcion"]);
      $("#modalEditarProducto .ImgPrincipal").html('<div class="col-xs-12 col-sm-5 text-center blah">' +
        '<div class="thumbnail text-center">' +
        '<img class="" src="' + respuesta[0]['foto_portada'] + '" style=" max-width: 100%; max-height: 100%;">' +
        '</div>' +
        '</div>');
      $("#modalEditarProducto .antiguaFotoPortada").val(respuesta[0]['foto_portada']);
      $("#modalEditarProducto .descripcionTecnica").val(respuesta[0]['desctecnica']);
      $("#modalEditarProducto .ImgMultimedia").html("");
      console.log(respuesta[0]['multimedia']);
      if (respuesta[0]['multimedia'] === null || respuesta[0]['multimedia'] == "null"){
          $("#modalEditarProducto .help-blocks").html("Por el momento no tiene imágenes adicionales");
          $("#modalEditarProducto .ImgMultimedia").html("");
          var vacio = null;
          localStorage.setItem("multimediaFisica", JSON.stringify(vacio));
          //console.log(localStorage.getItem("multimediaFisica"));

      }else {


        if (respuesta[0]['multimedia'].length) {
          var multimedia = JSON.parse(respuesta[0]['multimedia']);
          for (var i = 0; i < multimedia.length; i++) {
            $("#modalEditarProducto .ImgMultimedia").append('<div class=" col-xs-12 col-sm-4 text-center">' +
              '<div class="thumbnail text-center">' +
              '<img class="imagenesRestantes" src="../../ransa/' + multimedia[i]['multimedia'] + '" style="width:100%; height: 165px;">' +
              '<div class="removerImagen" style="cursor:pointer;">Eliminar Imagen</div>' +
              '</div>' +
              '</div>');
            localStorage.setItem("multimediaFisica", JSON.stringify(multimedia));
            //console.log(localStorage.getItem("multimediaFisica"));
          }
        }           
        } 
      }
      })
      Swal.fire({
        title: 'Visualización de Productos',
        width: 400,
        padding: '3em',
        html: mostrar,
        showCloseButton: true
      });
       Carrousel();
       RotarImagenes();
    });
  
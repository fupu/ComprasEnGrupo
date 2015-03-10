angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Promociones', function($http) {
   var promociones;
    
  // Might use a resource here that returns a JSON array
$http.get('http://www.fupudev.com/comprasengrupo/ComprasEnGrupo/admin/index.php/api/example/promociones/').
    success(function(data, status, headers, config) {
       promociones = data;
    }).
    error(function(data, status, headers, config) {
      // log error
    });


  return {
    all: function() {
      return promociones;
    },
    get: function(id_promocion) {
      // Simple index lookup
      return promociones[id_promocion];
    }
  }
});

var setUrl = "http://www.fupudev.com/comprasengrupo/ComprasEnGrupo/admin/index.php";

var urlService = setUrl+"/api/comprasengrupoapi";

// GET HOME DATA    
function getRecipeHome(){
  $('#list-home').empty();
  var url = urlService+'service/get_list_home';
  getRequest(url, function(data) {
        var data = JSON.parse(data.responseText);         
        for (var i = 0; i < data.length; i++) {
      
      if(!data[i]['list_image']){
        var img = 'images/empty.jpg';
      }else{
        var img = 'upload/images/'+ data[i]['list_image'];   
      }

      $('#list-home').append('<li>'+
        '<a href="#detail" class="getDetail" da ta-transition="slide" rel="'+ data[i]['list_id'] +'">'+
          '<div class="home-container img-shadow">'+
          '<div class="title-menu">'+ data[i]['list_name'] +'</div>'+
          '<img src="images/bg_home_title.png" border="0" class="img-menu">'+
          '<img src="'+setUrl+''+ img +'" width="250px" height="200px" />'+
          '</div>'+
        '</a>'+
        '</li>');
      }
  });
}


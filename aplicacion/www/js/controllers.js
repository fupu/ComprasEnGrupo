angular.module('starter.controllers', [])

.controller('DestacadasCtrl', function($scope) {
})
/*.controller('PromocionesCtrl', function($scope, Promociones) {
  $scope.promociones = Promociones.all();
})*/

.controller('PromocionesCtrl', function($scope, $http) {
    var url = urlService+'/promociones';
  $http.get(url).
    success(function(data, status, headers, config) {
      $scope.promociones = data;
    }).
    error(function(data, status, headers, config) {
      // log error
    });
    var urlimagenes = urlService+'/promociones';
    $http.get(urlimagenes).
    success(function(data, status, headers, config) {
      $scope.imagenes = data;
    }).
    error(function(data, status, headers, config) {
      // log error
    });
})
/*.controller('PromocionDetallesCtrl', function($scope, $stateParams, Promociones) {
  $scope.promociones = Promociones.get($stateParams.id_promocion);
})*/
.controller('PromocionDetallesCtrl',function($scope,$http,$stateParams){
    var url = urlService+'/promocion/id_promocion/'+$stateParams.id_promocion;
    $http.get(url).
    success(function(data, status, headers, config) {
      $scope.promocion = data[0];
    }).
    error(function(data, status, headers, config) {
      // log error
    });
})


.controller('BuscarCtrl', function($scope,$http) {
    var url = urlService+'/categorias/';
    $http.get(url).
    success(function(data, status, headers, config) {
      $scope.categorias = data;
    }).
    error(function(data, status, headers, config) {
      // log error
    });
})

.controller('BuscarDetallesCtrl',function($scope,$http,$stateParams){
    var url = urlService+'/promocionporcategoria/categoria/'+$stateParams.id_promocion;
    $http.get(url).
    success(function(data, status, headers, config) {
      $scope.promociones = data;
    }).
    error(function(data, status, headers, config) {
      // log error
    });
})

.factory("sesionesControl", function(){
    return {
        //obtenemos una sesión //getter
        get : function(key) {
            return sessionStorage.getItem(key)
        },
        //creamos una sesión //setter
        set : function(key, val) {
            return sessionStorage.setItem(key, val)
        },
        //limpiamos una sesión
        unset : function(key) {
            return sessionStorage.removeItem(key)
        }
    }
})
 

 
//factoria para loguear y desloguear usuarios en angularjs
.factory("authUsers", function($http, $location, sesionesControl, mensajesFlash,$ionicViewService){
    var cacheSession = function(email){
        sesionesControl.set("userLogin", true);
        sesionesControl.set("email", email);
    }
    var unCacheSession = function(){
        sesionesControl.unset("userLogin");
        sesionesControl.unset("email");
    }
 
    return {
        //retornamos la función login de la factoria authUsers para loguearnos correctamente
        login : function(user){
            return $http({

                url: 'http://fupudev.com/comprasengrupo/ComprasEnGrupo/admin/index.php/api/example/loginUser/',
                method: "POST",
                 data:{'email':user.email,'password':user.password},
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data){
                if(data.respuesta == "success"){
                    //si todo ha ido bien limpiamos los mensajes flash
                    mensajesFlash.clear();
                    //creamos la sesión con el email del usuario
                    cacheSession(user.email);
                    // using the ionicViewService to hide the back button on next view
                    $ionicViewService.nextViewOptions({
                    disableBack: true
                    });
                    //mandamos a la home
                    $location.path("/tab/cuenta/dashboard");
                }else if(data.respuesta == "incomplete_form"){
                    mensajesFlash.show("Debes introducir bien los datos del formulario");
                }else if(data.respuesta == "failed"){
                    mensajesFlash.show("El email o el password introducidos son incorrectos, inténtalo de nuevo.");
                }
            }).error(function(){
                // using the ionicViewService to hide the back button on next view
                $ionicViewService.nextViewOptions({
                disableBack: true
                });
                $location.path("/tab/cuenta/login");
            })
        },
        //función para cerrar la sesión del usuario
        logout : function(){
            return $http({
                url : "http://www.fupudev.com/comprasengrupo/ComprasEnGrupo/admin/index.php/login/loginUser"
            }).success(function(){
                //eliminamos la sesión de sessionStorage
                unCacheSession();
                // using the ionicViewService to hide the back button on next view
                $ionicViewService.nextViewOptions({
                disableBack: true
                });
                $location.path("/tab/cuenta/login");
            });
        },
        //función que comprueba si la sesión userLogin almacenada en sesionStorage existe
        isLoggedIn : function(){
            return sesionesControl.get("userLogin");
        }
    }
})
 
//controlador home al que le añadimos la función de poder cerrar la sesión y pasamos
//con $scope.email el email con el que ha iniciado sesión para saludarlo, para esto 
//debemos inyectar las factorias sesionesControl y authUsers
.controller("CuentaCtrl", function($scope, sesionesControl, authUsers){
    $scope.email = sesionesControl.get("email");
    $scope.logout = function(){
        authUsers.logout();
    }
})
 //controlador loginController
//inyectamos la factoria authUsers en el controlador loginController
//para hacer el login de los usuarios
.controller("loginController", function($scope, $location, authUsers){
    $scope.user = { email : "", password : "" }
    authUsers.flash = "";
    //función que llamamos al hacer sumbit al formulario
    $scope.login = function(){
        authUsers.login($scope.user);
    }
})
//controlador registerController
//en nuestro controlador inyectamos registerUsers para poder utilizar 
//la función newRegister pasando los datos del formulario con $scope.user
.controller("registerController", function($scope, registerUsers){
    $scope.registerUser = function(user){
        registerUsers.newRegister(user);
    }
})
//mientras corre la aplicación, comprobamos si el usuario tiene acceso a la ruta a la que está accediendo
//como vemos inyectamos authUsers
.run(function($rootScope, $location, authUsers){
    //creamos un array con las rutas que queremos controlar
    var rutasPrivadas = ["/tab/cuenta/dashboard"];
    //al cambiar de rutas
    $rootScope.$on('$routeChangeStart', function(){
        //si en el array rutasPrivadas existe $location.path(), locationPath en el login
        //es /login, en la home /home etc, o el usuario no ha iniciado sesión, lo volvemos 
        //a dejar en el formulario de login
        if(in_array($location.path(),rutasPrivadas) && !authUsers.isLoggedIn()){
            // using the ionicViewService to hide the back button on next view
        $ionicViewService.nextViewOptions({
        disableBack: true
        });
            $location.path("/tab/cuenta/login");
        }
        //en el caso de que intente acceder al login y ya haya iniciado sesión lo mandamos a la home
        if(($location.path() === '/tab/cuenta/login') && authUsers.isLoggedIn()){
            // using the ionicViewService to hide the back button on next view
            $ionicViewService.nextViewOptions({
            disableBack: true
            });
            $location.path("/tab/cuenta/dashboard/");
        }
    })
})
 
 
//esto simplemente es para lanzar un mensaje si el login falla, se puede extender para darle más uso
.factory("mensajesFlash", function($rootScope){
    return {
        show_success : function(message){
            $rootScope.flash_success = message;
        },
        show_error : function(message){
            $rootScope.flash_error = message;
        },
        clear : function(){
            $rootScope.flash_success = "";
            $rootScope.flash_error = "";
        }
    }
})
 /*esto simplemente es para lanzar un mensaje si el login falla, se puede extender para darle más uso
.factory("mensajesFlash", function($rootScope){
    return {
        show : function(message){
            $rootScope.flash = message;
        },
        clear : function(){
            $rootScope.flash = "";
        }
    }
})*/
//factoria para registrar usuarios a la que le inyectamos la otra factoria
//mensajesFlash para poder hacer uso de sus funciones
.factory("registerUsers", function($http, mensajesFlash,authUsers){
    return {
        newRegister : function(user){
        		//var Data = { user: user };
        		
            return $http({
                url: 'http://fupudev.com/comprasengrupo/ComprasEnGrupo/admin/index.php/api/example/registroUsuario/',
                method: "POST",
                //data : "email="+user.email+"&password="+"3"+"&nombre="+"3",
               //dataType: 'json',
                data:{ 'nombre':user.nombre,'email':user.email,'password':user.password},
                //data:{email: user.email},
                //headers: { 'Content-Type': 'application/json; charset=UTF-8' }
                headers : {'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'}
            })
             //return $http.post('http://fupudev.com/comprasengrupo/ComprasEnGrupo/admin/index.php/api/example/registroUsuario/',{ user:user } )
             .success(function(data){
                    if(data.respuesta == "success"){
                        mensajesFlash.clear();
                        mensajesFlash.show_success("El registro se ha procesado correctamente.");
                        //creamos la sesión con el email del usuario
                        //cacheSession(user.email);
                            //función que llamamos al hacer sumbit al formulario
                            
                            authUsers.login(user);
                             

                        // using the ionicViewService to hide the back button on next view
                        $ionicViewService.nextViewOptions({
                            disableBack: true
                        });
                        //mandamos a la home
                    $location.path("/tab/cuenta/dashboard");
                    }else if(data.respuesta == "exists"){
                        mensajesFlash.clear();
                        mensajesFlash.show_error("El email introducido ya existe en la bd.");
                    }else if(data.respuesta == "failed"){
                        mensajesFlash.show_error("Ha ocurrido algún error al realizar el roro!.");
                    }else if(data.respuesta == "error_form"){
                    	mensajesFlash.clear();
                        mensajesFlash.show_error("Ha ocurrido algún error al realizar el registro!OUT.");
                    }
                }).error(function(){
                    mensajesFlash.show_error("Ha ocurrido algún error al realizar el registro ERROR MAXIMO!.");
                })
        }
    }
})
//función in_array que usamos para comprobar si el usuario
//tiene permisos para estar en la ruta actual
function in_array(needle, haystack, argStrict){
  var key = '',
  strict = !! argStrict;
 
  if(strict){
    for(key in haystack){
      if(haystack[key] === needle){
        return true;
      }
    }
  }else{
    for(key in haystack){
      if(haystack[key] == needle){
        return true;
      }
    }
  }
  return false;
};


angular.module('starter.controllers', ['ngCordova'])
.directive('passwordValidator', [function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attr, ctrl) {
      var pwdWidget = elm.inheritedData('$formController')[attr.passwordValidator];

      ctrl.$parsers.push(function(value) {
        if (value === pwdWidget.$viewValue) {
          ctrl.$setValidity('MATCH', true);
          return value;
        }
        ctrl.$setValidity('MATCH', false);
      });

      pwdWidget.$parsers.push(function(value) {
        ctrl.$setValidity('MATCH', value === ctrl.$viewValue);
        return value;
      });
    }
  };
}])
.controller('PropuestasCtrl', function($scope,$http) {
    var url = urlService+'/propuestas';
  $http.get(url).
    success(function(data, status, headers, config) {
      $scope.propuestas = data;
    }).
    error(function(data, status, headers, config) {
      // log error
    });
})

//Controlador de una propuesta en concreto.
.controller('PropuestaDetallesCtrl',function($scope,$http,$stateParams,inscribeME,authUsers,stripeCheckout,Products){

    $scope.logedin = authUsers.isLoggedIn();

    var url = urlService+'/propuesta/id_propuesta/'+$stateParams.id_propuesta;
    $http.get(url).
    success(function(data, status, headers, config) {
      $scope.propuesta = data[0];
    }).
    error(function(data, status, headers, config) {
      // log error
    });
    var urlimagen = urlService+'/imagen/Promocion_id_promocion/'+$stateParams.id_propuesta;
    $http.get(urlimagen).
    success(function(data, status, headers, config) {
      $scope.imagen = data[0];
    }).
    error(function(data, status, headers, config) {
      // log error
    });

    $scope.inscribeME = function(propuestaID){
        inscribeME.inscribeME(propuestaID);
    }
})

/*.controller('PromocionesCtrl', function($scope, Promociones) {
  $scope.promociones = Promociones.all();
})*/
.controller('cuentaSwitch', function($scope,authUsers){
    if(authUsers.isLoggedIn())
        $scope.urlCuenta = "cuenta/dashboard"
    else
        $scope.urlCuenta = "cuenta/login"
})
.controller('PromocionesCtrl', function($scope, $http) {
    var url = urlService+'/promociones';
  $http.get(url).
    success(function(data, status, headers, config) {
      $scope.promociones = data;
    }).
    error(function(data, status, headers, config) {
      // log error
    });
    /*var urlimagenes = urlService+'/imagenes';
    $http.get(urlimagenes).
    success(function(data, status, headers, config) {
      $scope.imagenes = data;
    }).
    error(function(data, status, headers, config) {
      // log error
    });*/
})
/*.controller('PromocionDetallesCtrl', function($scope, $stateParams, Promociones) {
  $scope.promociones = Promociones.get($stateParams.id_promocion);
})*/
.controller('PromocionDetallesCtrl',function($ionicLoading,$scope,$http,$stateParams,$rootScope,$timeout,$ionicModal){
    var url = urlService+'/promocion/id_promocion/'+$stateParams.id_promocion;
    $http.get(url).
    success(function(data, status, headers, config) {
      $scope.promocion = data[0];
    }).
    error(function(data, status, headers, config) {
      // log error
    });
    var urlimagen = urlService+'/imagen/Promocion_id_promocion/'+$stateParams.id_promocion;
    $http.get(urlimagen).
    success(function(data, status, headers, config) {
      $scope.imagen = data[0];
    }).
    error(function(data, status, headers, config) {
      // log error
    });
  // Form data for the login and reset password modal
    $scope.loginData = {};
    $scope.resetData = {};
    $scope.registerData = {};
        
    $scope.back = function() {
       $ionicHistory.goBack();
    };
    
    
//// PayPal Function ////
    
$rootScope.paid = false;
    
$scope.payWithPaypal = function(price) {
            
            $ionicLoading.show({
                template: 'Loading...'
            });

            /*
             * Licensed to the Apache Software Foundation (ASF) under one
             * or more contributor license agreements.  See the NOTICE file
             * distributed with this work for additional information
             * regarding copyright ownership.  The ASF licenses this file
             * to you under the Apache License, Version 2.0 (the
             * "License"); you may not use this file except in compliance
             * with the License.  You may obtain a copy of the License at
             *
             * http://www.apache.org/licenses/LICENSE-2.0
             *
             * Unless required by applicable law or agreed to in writing,
             * software distributed under the License is distributed on an
             * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
             * KIND, either express or implied.  See the License for the
             * specific language governing permissions and limitations
             * under the License.
             */
            
            var app = {
            // Application Constructor
            initialize: function() {
            this.bindEvents();
            },
            // Bind Event Listeners
            //
            // Bind any events that are required on startup. Common events are:
            // 'load', 'deviceready', 'offline', and 'online'.
            bindEvents: function() {
            document.addEventListener('deviceready', this.onDeviceReady, false);
            },
            // deviceready Event Handler
            //
            // The scope of 'this' is the event. In order to call the 'receivedEvent'
            // function, we must explicity call 'app.receivedEvent(...);'
            onDeviceReady: function() {
            app.receivedEvent('deviceready');
            },
            // Update DOM on a Received Event
            receivedEvent: function(id) {
            var parentElement = document.getElementById(id);
            var listeningElement = parentElement.querySelector('.listening');
            var receivedElement = parentElement.querySelector('.received');
            
            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');
            
            console.log('Received Event: ' + id);
            
            // start to initialize PayPalMobile library
            app.initPaymentUI();
            },
            initPaymentUI : function () {

            var clientIDs = {
            "PayPalEnvironmentProduction": "YOUR_PRODUCTION_CLIENT_ID",
            "PayPalEnvironmentSandbox": "YOUR_SANDBOX_CLIENT_ID"
            };
            PayPalMobile.init(clientIDs, app.onPayPalMobileInit);
            
            },
            onSuccesfulPayment : function(payment) {
            // console.log("payment success: " + JSON.stringify(payment, null, 4));
            // document.getElementById("paypalStatus").innerHTML = "Payment received!";
            
            $timeout(function() {
                $rootScope.paid = true;
            }, 1000);
            
            
            
            },
            onAuthorizationCallback : function(authorization) {
            // console.log("authorization: " + JSON.stringify(authorization, null, 4));
            // document.getElementById("paypalStatus").innerHTML = "Payment canceled";
            },
            createPayment : function () {
            
            // for simplicity use predefined amount
            // optional payment details for more information check [helper js file](https://github.com/paypal/PayPal-Cordova-Plugin/blob/master/www/paypal-mobile-js-helper.js)
            if(price) {
            var payPrice = price } else {
            var payPrice = '50';
            }
            
            var paymentDetails = new PayPalPaymentDetails(payPrice, "0.00", "0.00");
            var payment = new PayPalPayment(payPrice, "EUR", "Compras en Grupo - "+$scope.promocion.producto, "Venta", paymentDetails);
            return payment;
            },
            configuration : function () {
            // for more options see `paypal-mobile-js-helper.js`
            var config = new PayPalConfiguration({merchantName: "Compras en Grupo", merchantPrivacyPolicyURL: "https://www.fupudev.com/policy", merchantUserAgreementURL: "https://www.fupudev.com/agreement"});
            return config;
            },
            onPrepareRender : function() {
            // buttons defined in index.html
            //  <button id="buyNowBtn"> Buy Now !</button>
            //  <button id="buyInFutureBtn"> Pay in Future !</button>
            //  <button id="profileSharingBtn"> ProfileSharing !</button>
            // var buyNowBtn = document.getElementById("buyNowBtn");
            //  var buyInFutureBtn = document.getElementById("buyInFutureBtn");
            //  var profileSharingBtn = document.getElementById("profileSharingBtn");
            
            $scope.btnClick = function(e) {
            
            // single payment
            PayPalMobile.renderSinglePaymentUI(app.createPayment(), app.onSuccesfulPayment, app.onUserCanceled);
            };
            $scope.btnClick();
            
            //  buyInFutureBtn.onclick = function(e) {
            // future payment
            //      PayPalMobile.renderFuturePaymentUI(app.onAuthorizationCallback, app.onUserCanceled);
            //  };
            
            //  profileSharingBtn.onclick = function(e) {
            // profile sharing
            //      PayPalMobile.renderProfileSharingUI(["profile", "email", "phone", "address", "futurepayments", "paypalattributes"], app.onAuthorizationCallback, app.onUserCanceled);
            //  };
            },
            onPayPalMobileInit : function() {
            // must be called
            // use PayPalEnvironmentNoNetwork mode to get look and feel of the flow
            PayPalMobile.prepareToRender("PayPalEnvironmentNoNetwork", app.configuration(), app.onPrepareRender);
            },
            onUserCanceled : function(result) {
            // console.log(result);
           // document.getElementById("paypalStatus").innerHTML = result;
            }
            };
            
            
            
            $timeout(function() {                     $ionicLoading.hide();

                     app.initialize();
                     }, 1000);

         }
    
    
//// Login Modal ///
  // Create the login modal
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.loginModal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.loginModal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.loginModal.show();
    $scope.registerModal.hide();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
      Parse.User.logIn($scope.loginData.username, $scope.loginData.password, {
        success: function(user) { 
            
            // saving current user 
            $rootScope.currentUser = [];
            var currentUser = Parse.User.current();
                if (currentUser && currentUser.get('emailVerified') == "1") {
                    $rootScope.currentUser = currentUser;
                    $rootScope.currentUser.email = currentUser.get('email');
                } else if (currentUser && currentUser.get('emailVerified') == "0") {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Oops',
                        template: 'Please verify your email.'
                    });
                        alertPopup.then(function(res) {
     
                    });
                    $rootScope.currentUser = null;
                    $rootScope.currentUser.email = null;
                    
                } 
            
            $scope.loginModal.hide();                
            // Do stuff after successful login.
        },
        error: function(user, error) {
            // The login failed. Check error to see why.
           $ionicPopup.alert({
     title: 'Oops',
     template: error.message
   });
        }
      });

  };
    
    // Perform the logout action when the user press logout
    $scope.doLogout = function() {
            Parse.User.logOut();
            
            $state.transitionTo("app.home");
            $rootScope.currentUser = null;
    };
   

//// Register User Modal ///
  // Create the modal
  $ionicModal.fromTemplateUrl('templates/register.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.registerModal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeRegister = function() {
    $scope.registerModal.hide();
  };

  // Open the login modal
  $scope.register = function() {
    $scope.registerModal.show();
      $scope.loginModal.hide();
  };

  // Perform the register action when the user submits the form
  $scope.doRegister = function() {      
      
    if($scope.registerData.coords) {
        var coords = $scope.registerData.coords;   
    } else {
        var coords = new Parse.GeoPoint({latitude: 0, longitude: 0});
    }
      
      var user = new Parse.User();
        user.set("username", $scope.registerData.username);
        user.set("password", $scope.registerData.password);
        user.set("email", $scope.registerData.email);
        user.set("phone", $scope.registerData.phone);
        user.set("location", $scope.registerData.location);
      
      user.set("coords", coords);
    user.signUp(null, {
        success: function(user) {
            // Hooray! Let them use the app now.
            $scope.registerModal.hide();
            $ionicPopup.alert({
                title: 'Success!',
                template: 'Check your email in order to activate your account'
                });        
        },
        error: function(user, error) {
            // Show the error message somewhere and let the user try again.
    $ionicPopup.alert({
     title: 'Oops',
     template: error.message
   });
        }
    });

  };
    

    
//// Reset Password Modal ///
     // Create the reset password modal
    $ionicModal.fromTemplateUrl('templates/reset.html', {
    scope: $scope
    }).then(function(modal) {
        $scope.resetModal = modal;
    });

    // Triggered in the reset password modal to close it
    $scope.closeReset = function() {
        $scope.resetModal.hide();
    };

    // Open the reset password modal
    $scope.reset = function() {
        $scope.resetModal.show();
    };

    // Perform the reset password action when the user submits the email address
    $scope.doReset = function() {
    Parse.User.requestPasswordReset($scope.resetData.email, {
        success: function() {
            $ionicPopup.alert({
                title: 'Success!',
                template: 'Check your email in order to reset your password'
            });

    $scope.resetModal.hide();
        // Password reset request was sent successfully
    },
    error: function(error) {
        // Show the error message somewhere
    var alertPopup = $ionicPopup.alert({
        title: 'Oops',
        template: error.message
    });
    alertPopup.then(function(res) {
     
   });
  }
});
}; 
    
  
// Getting Location 
    $rootScope.getLocation = function() {
        var onGeoSuccess = function(position) {
        var latlng = position.coords.latitude + ', ' + position.coords.longitude;
                    
        // Get location (city name, state)
        locationService.getLocation(latlng).then(function(location){
        var itemLocation = 
            location.results[0].address_components[4].long_name+
            ', ' +
            location.results[0].address_components[5].long_name;
        $scope.registerData.location = itemLocation;
        $scope.registerData.coords = new Parse.GeoPoint({latitude: position.coords.latitude, longitude: position.coords.longitude});
            
        $rootScope.userLocation = itemLocation;
        $rootScope.userCoords = latlng;
            
            },function(error){
                // Something went wrong!
            });
        };

        // onError Callback receives a PositionError object
        function onGeoError(error) {
            alert(error.message);
        }

        navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError); 
    }

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

.controller('BuscarFiltroCtrl',function($scope,$http,$stateParams){
    var url = urlService+'/promocionporcategoria/categoria/'+$stateParams.id_categoria;
    $http.get(url).
    success(function(data, status, headers, config) {
      $scope.promociones = data;
    }).
    error(function(data, status, headers, config) {
      // log error
    });
})
.controller('BuscarFiltroDetallesCtrl',function($scope,$http,$stateParams){
    var url = urlService+'/promocion/id_promocion/'+$stateParams.id_promocion;
    $http.get(url).
    success(function(data, status, headers, config) {
      $scope.promociones = data[0];
    }).
    error(function(data, status, headers, config) {
      // log error
    });
})


 
//factoria para loguear y desloguear usuarios en angularjs
.factory("authUsers", function($ionicLoading,$http, $location, mensajesFlash,$ionicViewService){

 
    return {
        //retornamos la función login de la factoria authUsers para loguearnos correctamente
        login : function(user){
            return $http({

                url: 'http://fupudev.com/comprasengrupo/ComprasEnGrupo/admin/index.php/api/comprasengrupoapi/loginUser/',
                method: "POST",
                 data:{'email':user.email,'password':SHA512(user.password)},
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data){
                if(data.respuesta == "success"){
                    //si todo ha ido bien limpiamos los mensajes flash
                    mensajesFlash.clear();
                    //creamos la sesión con el email del usuario
                    window.localStorage.setItem("udp_email",user.email);
                    //cacheSession(user.email);
                    // using the ionicViewService to hide the back button on next view
                    $ionicViewService.nextViewOptions({
                    disableBack: true
                    });
                    //mandamos a la home
                    $location.path("/tab/cuenta/dashboard");
                }else if(data.respuesta == "incomplete_form"){
                    mensajesFlash.show("Debes introducir bien los datos del formulario");
                }else if(data.respuesta == "failed"){
                     $ionicLoading.show({template: 'La usuario o la contraseña son incorrectos.', duration:1000});
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
            /*return $http({
                url : "http://www.fupudev.com/comprasengrupo/ComprasEnGrupo/admin/index.php/login/loginUser"
            }).success(function(){*/
                //eliminamos la sesión de localStorage
                window.localStorage.removeItem("udp_email");
                //eliminamos la sesión de sessionStorage
                window.localStorage.clear();
                //unCacheSession();
                // using the ionicViewService to hide the back button on next view
                $ionicViewService.nextViewOptions({
                disableBack: true
                });
                $location.path("/tab/cuenta/login");
            //});
        },
        //función que comprueba si la sesión userLogin almacenada en localStorage existe
        isLoggedIn : function(){
                if(window.localStorage.getItem("udp_email") === null || window.localStorage.getItem("udp_email") === "undefined")
                {
                    return false;
                }else{
                    return true;
                }
        }
    }
})
 
//controlador home al que le añadimos la función de poder cerrar la sesión y pasamos
//con $scope.email el email con el que ha iniciado sesión para saludarlo, para esto 
//debemos inyectar las factorias sesionesControl y authUsers
.controller("CuentaCtrl", function($scope, authUsers,$location,$ionicViewService){
        if(!authUsers.isLoggedIn()) {
        $ionicViewService.nextViewOptions({
            disableAnimate: true,
            disableBack: true
        });
        $location.path("/tab/cuenta/login");
    }
    $scope.email = window.localStorage.getItem("udp_email");
    $scope.logout = function(){
        authUsers.logout();
    }
})
.controller("CuentaSubastaCtrl", function($scope, authUsers,$location,$ionicViewService,$http){
        if(!authUsers.isLoggedIn()) {
        $ionicViewService.nextViewOptions({
            disableAnimate: true,
            disableBack: true
        });
        $location.path("/tab/cuenta/login");
    }
    $scope.email = window.localStorage.getItem("udp_email");
    var url = urlService+'/subastas/';
    $http.get(url).
        success(function(data, status, headers, config) {
        $scope.subastas = data;
    }).
    error(function(data, status, headers, config) {
      // log error
    });

})
.controller("CuentaSubastaDetalleCtrl", function($ionicLoading,realizarPuja,$stateParams,$scope, authUsers,$location,$ionicViewService,$http){
        if(!authUsers.isLoggedIn()) {
        $ionicViewService.nextViewOptions({
            disableAnimate: true,
            disableBack: true
        });
        $location.path("/tab/cuenta/login");
    }
    $scope.email = window.localStorage.getItem("udp_email");
    var url = urlService+'/subasta'+'/id_subasta/'+$stateParams.id_subasta;;
    $http.get(url).
        success(function(data, status, headers, config) {
        $scope.promocion = data[0];//datos subasta
    }).
    error(function(data, status, headers, config) {
      // log error
    });
    var url2 = urlService+'/inscritos_a_subasta'+'/id_subasta/'+$stateParams.id_subasta;;
    $http.get(url2).
        success(function(data, status, headers, config) {
        $scope.numero = data;//numero inscritos en la propuesta
    }).
    error(function(data, status, headers, config) {
      // log error
    });
    var urlusuario = urlService+'/user/email/'+window.localStorage.getItem("udp_email");
    $http.get(urlusuario).
        success(function(data, status, headers, config) {
        $scope.usuario = data[0];
            //$scope.encriptada = SHA512($scope.usuario.password);
    }).
    error(function(data, status, headers, config) {
      // log error
    });
     $scope.pujar = function(cantidad,observacion,promocionID){
        if(($scope.promocion.subasta_puja_ganadora <= cantidad) || (cantidad < 0))
            $ionicLoading.show({template: 'La puja debe ser menor a la anterior.', duration:1000});
        else
            realizarPuja.pujar($scope.usuario.telefono1,cantidad,observacion,$stateParams.id_subasta);
    }

})
/*.controller("CuentaSubastaPujaCtrl", function(realizarPuja,$stateParams,$scope, authUsers,$location,$ionicViewService,$http){
        if(!authUsers.isLoggedIn()) {
        $ionicViewService.nextViewOptions({
            disableAnimate: true,
            disableBack: true
        });
        $location.path("/tab/cuenta/login");
    }
    $scope.email = window.localStorage.getItem("udp_email");
    var url = urlService+'/subasta/'+'/id_subasta/'+$stateParams.id_subasta;
    $http.get(url).
        success(function(data, status, headers, config) {
        $scope.subasta = data[0];
    }).
    error(function(data, status, headers, config) {
      // log error
    });
     $scope.pujar = function(cantidad,observacion,promocionID){
        if(cantidad <= $scope.subasta.cantidad)
            $ionicLoading.show({template: 'La puja debe ser superior a la anterior.', duration:1000});
        else
            realizarPuja.pujar(cantidad,observacion,$stateParams.id_subasta);
    }

})*/
.controller("CuentaEditarPWCtrl", function($location,$ionicViewService,$ionicLoading,$scope, authUsers,$http,cambioPWS){
    //$scope.email = window.localStorage.getItem("udp_email");
    var url = urlService+'/user/email/'+window.localStorage.getItem("udp_email");
    $http.get(url).
        success(function(data, status, headers, config) {
        $scope.usuario = data[0];
            //$scope.encriptada = SHA512($scope.usuario.password);
    }).
    error(function(data, status, headers, config) {
      // log error
    });

     $scope.cambioPW = function(oldpassword,newpassword){
        if(SHA512(oldpassword) == $scope.usuario.password){
            cambioPWS.cambioPW(SHA512(newpassword),$scope.usuario);
        }else{
            $ionicLoading.show({template: 'La contraseña antigua es incorrecta.', duration:1000});

        }

    }

})
.controller("CuentaSuscripciones", function($scope, authUsers,$http){
    //$scope.email = window.localStorage.getItem("udp_email");
    var url = urlService+'/suscripciones/email/'+window.localStorage.getItem("udp_email");
    $http.get(url).
        success(function(data, status, headers, config) {
        $scope.promociones = data;
    }).
    error(function(data, status, headers, config) {
      // log error
    });
})
.controller("CuentaSuscripcionDetalle", function(borrarME,$scope, authUsers,$http,$stateParams){
    //$scope.email = window.localStorage.getItem("udp_email");
    var url = urlService+'/promocion/id_promocion/'+$stateParams.id_promocion;
    $http.get(url).
    success(function(data, status, headers, config) {
      $scope.promocion = data[0];
    }).
    error(function(data, status, headers, config) {
      // log error
    });
    var urlimagen = urlService+'/imagen/Promocion_id_promocion/'+$stateParams.id_promocion;
    $http.get(urlimagen).
    success(function(data, status, headers, config) {
      $scope.imagen = data[0];
    }).
    error(function(data, status, headers, config) {
      // log error
    });
    $scope.borrarME = function(id_promocion){
        borrarME.borrarME(id_promocion);
    }
})
.controller("CuentaEditarCtrl", function($scope, authUsers,$http,editUsers){
    //$scope.email = window.localStorage.getItem("udp_email");
    var url = urlService+'/user/email/'+window.localStorage.getItem("udp_email");
    $http.get(url).
        success(function(data, status, headers, config) {
        $scope.usuario = data[0];
    }).
    error(function(data, status, headers, config) {
      // log error
    });
     $scope.editUser = function(user){
        editUsers.editUser(user);
    }
})
.controller("CuentaAnadirCtrl", function($scope, authUsers,$http,anadirPromociones,$cordovaCamera,$ionicViewService,$ionicLoading,$cordovaFile){
    $scope.email = window.localStorage.getItem("udp_email");
    var url = urlService+'/categorias';
    $http.get(url).
        success(function(data, status, headers, config) {
        $scope.categorias = data;
    }).
    error(function(data, status, headers, config) {
      // log error
    });
    var urlusuario = urlService+'/user/email/'+window.localStorage.getItem("udp_email");
    $http.get(urlusuario).
        success(function(data, status, headers, config) {
        $scope.usuario = data[0];
            //$scope.encriptada = SHA512($scope.usuario.password);
    }).
    error(function(data, status, headers, config) {
      // log error
    });

     $scope.anadirPromocion = function(promocion){
        uploadPicture();
        anadirPromociones.anadirPromocion(promocion);
    }
    $scope.data = { "ImageURI" :  "Select Image" };
    $scope.takePicture = function() {
      var options = {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URL,
        sourceType: Camera.PictureSourceType.CAMERA
      };
      $cordovaCamera.getPicture(options).then(
        function(imageData) {
            $scope.picData = imageData;
            $scope.ftLoad = true;
            $localstorage.set('fotoUp', imageData);
            $ionicLoading.show({template: 'Foto adquirida...', duration:500});
        },
        function(err){
            $ionicLoading.show({template: 'Error de carga...', duration:500});
            })
      }

      $scope.selectPicture = function() { 
        var options = {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        };

      $cordovaCamera.getPicture(options).then(
        function(imageURI) {
            window.resolveLocalFileSystemURI(imageURI, function(fileEntry) {
                $scope.picData = fileEntry.nativeURL;
                $scope.ftLoad = true;
                $scope.imgURI = "data:image/jpeg;base64," + imageURI;
                var image = document.getElementById('myImage');
                image.src = fileEntry.nativeURL;
            });
            $ionicLoading.show({template: 'Foto adquirida...', duration:500});
        },
        function(err){
            $ionicLoading.show({template: 'Error de carga...', duration:500});
        })
    };

    $scope.uploadPicture = function(promocion) {
        
        var fileURL = $scope.picData;
        var options = new FileUploadOptions();
        options.fileKey = "image";
        options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";
        options.chunkedMode = true;

        var params = {};
        params.producto = promocion.producto;
        params.precio = promocion.precio;
        params.descripcion = promocion.descripcion;
        params.medida = promocion.medida;
        params.compra_minima = promocion.compra_minima;
        params.observacion = promocion.observacion;
        params.categoria = promocion.categoria;
        params.lugar = promocion.lugar;
        params.usuario_email = window.localStorage.getItem("udp_email");
        params.tipo_envio = promocion.tipo_envio;
        params.telefono = $scope.usuario.telefono1;
        options.params = params;

        var ft = new FileTransfer();
        $ionicLoading.show({template: 'Se esta subiendo la foto...',duration:5000});
        ft.upload(fileURL, encodeURI("http://www.fupudev.com/comprasengrupo/ComprasEnGrupo/admin/index.php/api/comprasengrupoapi/uploadPhotoo"), win, function(error) {$ionicLoading.show({template: 'Error de conexión...'});
        $ionicLoading.hide();}, options);
        function win(r) {
            $ionicLoading.show({template: 'Sa ha subido la promoción con exito...',duration:1000});
        }
    }

    var viewUploadedPictures = function() {
        $ionicLoading.show({template: 'Sto cercando le tue foto...'});
        server = "http://www.yourdomain.com/upload.php";
        if (server) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange=function(){
            if(xmlhttp.readyState === 4){
                    if (xmlhttp.status === 200) {                    
                document.getElementById('server_images').innerHTML = xmlhttp.responseText;
                    }
                    else { $ionicLoading.show({template: 'Errore durante il caricamento...', duration: 1000});
                    return false;
                    }
                }
            };
            xmlhttp.open("GET", server , true);
            xmlhttp.send()} ;
        $ionicLoading.hide();
    }

    $scope.viewPictures = function() {
        $ionicLoading.show({template: 'Sto cercando le tue foto...'});
        server = "http://www.yourdomain.com/upload.php";
        if (server) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange=function(){
            if(xmlhttp.readyState === 4){
                    if (xmlhttp.status === 200) {                    
                document.getElementById('server_images').innerHTML = xmlhttp.responseText;
                    }
                    else { $ionicLoading.show({template: 'Errore durante il caricamento...', duration: 1000});
                    return false;
                    }
                }
            };
            xmlhttp.open("GET", server , true);
            xmlhttp.send()} ;
        $ionicLoading.hide();
    }
})
.controller("CuentaAnadirPropuestaCtrl", function($scope, authUsers,$http,anadirPromociones,$cordovaCamera,$ionicLoading){
    //$scope.email = window.localStorage.getItem("udp_email");
    var url = urlService+'/categorias';
    $http.get(url).
        success(function(data, status, headers, config) {
        $scope.categorias = data;
    }).
    error(function(data, status, headers, config) {
      // log error
    });

     $scope.anadirPropuesta = function(propuesta){
        anadirPropuesta.anadirPropuesta(propuesta);
        uploadPicture();
    }
    $scope.data = { "ImageURI" :  "Select Image" };
    $scope.takePicture = function() {
      var options = {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URL,
        sourceType: Camera.PictureSourceType.CAMERA
      };
      $cordovaCamera.getPicture(options).then(
        function(imageData) {
            $scope.picData = imageData;
            $scope.ftLoad = true;
            $localstorage.set('fotoUp', imageData);
            $ionicLoading.show({template: 'Foto adquirida...', duration:500});
        },
        function(err){
            $ionicLoading.show({template: 'Error de carga...', duration:500});
            })
      }

      $scope.selectPicture = function() { 
        var options = {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        };

      $cordovaCamera.getPicture(options).then(
        function(imageURI) {
            window.resolveLocalFileSystemURI(imageURI, function(fileEntry) {
                $scope.picData = fileEntry.nativeURL;
                $scope.ftLoad = true;
                $scope.imgURI = "data:image/jpeg;base64," + imageURI;
                var image = document.getElementById('myImage');
                image.src = fileEntry.nativeURL;
            });
            $ionicLoading.show({template: 'Foto adquirida...', duration:500});
        },
        function(err){
            $ionicLoading.show({template: 'Error de carga...', duration:500});
        })
    };

    $scope.uploadPicture = function(promocion) {
        
        var fileURL = $scope.picData;
        var options = new FileUploadOptions();
        options.fileKey = "image";
        options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";
        options.chunkedMode = true;

        var params = {};
        params.producto = promocion.producto;
        params.descripcion = promocion.descripcion;
        params.medida = promocion.medida;
        params.observacion = promocion.observacion;
        params.categoria = promocion.categoria;
        params.lugar = promocion.lugar;
        params.usuario_email = window.localStorage.getItem("udp_email");

        options.params = params;

        var ft = new FileTransfer();
        $ionicLoading.show({template: 'Se esta subiendo la foto...',duration:5000});
        ft.upload(fileURL, encodeURI("http://www.fupudev.com/comprasengrupo/ComprasEnGrupo/admin/index.php/api/comprasengrupoapi/uploadPhotooPropu"), win, function(error) {$ionicLoading.show({template: 'Error de conexión...'});
        $ionicLoading.hide();}, options);
        function win(r) {
            $ionicLoading.show({template: 'Sa ha subido la propuesta con exito...',duration:1000});
        }
    }

    var viewUploadedPictures = function() {
        $ionicLoading.show({template: 'Sto cercando le tue foto...'});
        server = "http://www.yourdomain.com/upload.php";
        if (server) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange=function(){
            if(xmlhttp.readyState === 4){
                    if (xmlhttp.status === 200) {                    
                document.getElementById('server_images').innerHTML = xmlhttp.responseText;
                    }
                    else { $ionicLoading.show({template: 'Errore durante il caricamento...', duration: 1000});
                    return false;
                    }
                }
            };
            xmlhttp.open("GET", server , true);
            xmlhttp.send()} ;
        $ionicLoading.hide();
    }

    $scope.viewPictures = function() {
        $ionicLoading.show({template: 'Sto cercando le tue foto...'});
        server = "http://www.yourdomain.com/upload.php";
        if (server) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange=function(){
            if(xmlhttp.readyState === 4){
                    if (xmlhttp.status === 200) {                    
                document.getElementById('server_images').innerHTML = xmlhttp.responseText;
                    }
                    else { $ionicLoading.show({template: 'Errore durante il caricamento...', duration: 1000});
                    return false;
                    }
                }
            };
            xmlhttp.open("GET", server , true);
            xmlhttp.send()} ;
        $ionicLoading.hide();
    }
})
 //controlador loginController
//inyectamos la factoria authUsers en el controlador loginController
//para hacer el login de los usuarios
.controller("loginController", function($scope, $location, authUsers,$ionicViewService){
    if(authUsers.isLoggedIn()) {
        $ionicViewService.nextViewOptions({
            disableAnimate: true,
            disableBack: true
        });
        $location.path("/tab/cuenta/dashboard");
    }
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
//Controlador de Contraseña perdida
.controller("lostPasswordController", function($scope, lostPassword){
    $scope.lostPassword = function(email){
        lostPassword.lostPassword(email);
    }
})
//mientras corre la aplicación, comprobamos si el usuario tiene acceso a la ruta a la que está accediendo
//como vemos inyectamos authUsers
.run(function($rootScope, $location, authUsers){
    //creamos un array con las rutas que queremos controlar
    var rutasPrivadas = ["/tab/cuenta/dashboard","/tab/cuenta/editar","/tab/cuenta/anadir"];
    //al cambiar de rutas
    $rootScope.$on('$routeChangeStart', function(){
        //si en el array rutasPrivadas existe $location.path(), locationPath en el login
        //es /login, en la home /home etc, o el usuario no ha iniciado sesión, lo volvemos 
        //a dejar en el formulario de login
        if(in_array($location.path(),rutasPrivadas) && !authUsers.isLoggedIn()){
            // using the ionicViewService to hide the back button on next view
        $ionicViewService.nextViewOptions({
            disableAnimate: true,
        disableBack: true
        });
            $location.path("/tab/cuenta/login");
        }

        //en el caso de que intente acceder al login y ya haya iniciado sesión lo mandamos a la home
        if(($location.path() === "/tab/cuenta/login") && authUsers.isLoggedIn()){
            // using the ionicViewService to hide the back button on next view
            $ionicViewService.nextViewOptions({
                disableAnimate: true,
            disableBack: true
            });
            $location.path("/tab/cuenta/dashboard");
        }
            if(($location.path() === "/tab/cuenta/dashboard") && !authUsers.isLoggedIn()){
            // using the ionicViewService to hide the back button on next view
            $ionicViewService.nextViewOptions({
                disableAnimate: true,
            disableBack: true
            });
            $location.path("/tab/cuenta/login");
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
.factory("borrarME",function($ionicLoading,$http,mensajesFlash,authUsers,$ionicViewService,$location){
    return{
            borrarME : function (subastaID) {
            return $http({
                url: 'http://fupudev.com/comprasengrupo/ComprasEnGrupo/admin/index.php/api/comprasengrupoapi/borrarME/',
                method: "POST",
                 data:{
                    'usuario':window.localStorage.getItem("udp_email"),
                    'subastaID':subastaID
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data){
                $ionicLoading.show({template: 'Se ha borrado!.', duration:1000});
                $ionicViewService.nextViewOptions({
                    disableBack: true
                    });
                    //mandamos a la home
                    $location.path("/tab/cuenta/dashboard");
            }).error(function(){
                $ionicLoading.show({template: 'Error!.', duration:1000});
                mensajesFlash.show("Error critico");
                // using the ionicViewService to hide the back button on next view
                $ionicViewService.nextViewOptions({
                disableBack: true
                });
                $location.path("/tab/cuenta/dashboard");
            })
    }

    }
})

.factory("inscribeME",function($http,mensajesFlash,authUsers,$ionicViewService,$location){
    return{
            inscribeME : function (propuestaID) {
            return $http({
                url: 'http://fupudev.com/comprasengrupo/ComprasEnGrupo/admin/index.php/api/comprasengrupoapi/inscribeME/',
                method: "POST",
                 data:{
                    'usuario':window.localStorage.getItem("udp_email"),
                    'propuestaID':propuestaID
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data){
                $ionicLoading.show({template: 'Inscrito a la propuesta!.', duration:1000});
                $ionicViewService.nextViewOptions({
                    disableBack: true
                    });
                    //mandamos a la home
                    $location.path("/tab/cuenta/dashboard");
            }).error(function(){
                $ionicLoading.show({template: 'Error!.', duration:1000});
                mensajesFlash.show("Error critico");
                // using the ionicViewService to hide the back button on next view
                $ionicViewService.nextViewOptions({
                disableBack: true
                });
                $location.path("/tab/cuenta/dashboard");
            })
    }

    }
})
.factory("anadirPromociones",function($http,mensajesFlash,authUsers,$ionicViewService,$location){
    return{
            anadirPromocion : function (promocion) {
                //$scope.email = window.localStorage.getItem("udp_email");
            return $http({
                url: 'http://fupudev.com/comprasengrupo/ComprasEnGrupo/admin/index.php/api/comprasengrupoapi/promociones/',
                method: "POST",
                 data:{
                    'producto':promocion.producto,
                    'precio':promocion.precio,
                    'descripcion':promocion.descripcion,
                    'medida':promocion.medida,
                    'compra_minima':promocion.compra_minima,
                    'observacion':promocion.observacion,
                    'categoria':promocion.categoria,
                    'lugar':promocion.lugar,
                    'usuario_email':window.localStorage.getItem("udp_email"),
                    'tipo_envio':promocion.tipo_envio
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data){
                $ionicViewService.nextViewOptions({
                    disableBack: true
                    });
                    //mandamos a la home
                    $location.path("/tab/cuenta/dashboard");
            }).error(function(){
                mensajesFlash.show("Error critico");
                // using the ionicViewService to hide the back button on next view
                $ionicViewService.nextViewOptions({
                disableBack: true
                });
                $location.path("/tab/cuenta/anadir");
            })
    }

    }
})
.factory("cambioPWS",function($ionicLoading,$http,mensajesFlash,authUsers,$ionicViewService,$location){
    return{
            cambioPW : function (newpasswordencrypted,usuario) {
            return $http({
                url: 'http://fupudev.com/comprasengrupo/ComprasEnGrupo/admin/index.php/api/comprasengrupoapi/cambioPW/',
                method: "POST",
                 data:{
                    'email':usuario.email,
                    'password':newpasswordencrypted
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data){
                    $ionicViewService.nextViewOptions({
                    disableBack: true
                    });
                    //mandamos a la home
                    $ionicLoading.show({template: 'Contraseña cambiada correctamente.', duration:1000});
                    $location.path("/tab/cuenta/dashboard");
            }).error(function(){
                $ionicLoading.show({template: 'Se ha producido un error.', duration:1000});
                // using the ionicViewService to hide the back button on next view
                $ionicViewService.nextViewOptions({
                disableBack: true
                });
                $location.path("/tab/cuenta/dashboard");
            })
    }

    }
})
.factory("realizarPuja",function($ionicLoading,$http,mensajesFlash,authUsers,$ionicViewService,$location){
    return{
            pujar : function (telefono,cantidad,observacion,promocionID) {
            return $http({
                url: 'http://fupudev.com/comprasengrupo/ComprasEnGrupo/admin/index.php/api/comprasengrupoapi/realizarPuja/',
                method: "POST",
                 data:{
                    'telefono':telefono,
                    'promocionID':promocionID,
                    'cantidad':cantidad,
                    'observacion':observacion,
                    'email': window.localStorage.getItem("udp_email")
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data){
                    if(data.respuesta == "success"){

                $ionicViewService.nextViewOptions({
                    disableBack: true
                    });
                    //mandamos a la home
                    $location.path("/tab/cuenta/dashboard");
                }else{
                    $ionicLoading.show({template: 'Se ha producido un error.', duration:1000});
                }
            }).error(function(){
                $ionicLoading.show({template: 'Se ha producido un error.', duration:1000});
                // using the ionicViewService to hide the back button on next view
                $ionicViewService.nextViewOptions({
                disableBack: true
                });
                $location.path("/tab/cuenta/dashboard");
            })
    }

    }
})
//Factoria para editar información de tu usuario
.factory("editUsers",function($ionicLoading,$http,mensajesFlash,authUsers,$ionicViewService,$location){
    return{
            editUser : function (user) {
            return $http({
                url: 'http://fupudev.com/comprasengrupo/ComprasEnGrupo/admin/index.php/api/comprasengrupoapi/updateUser/',
                method: "POST",
                 data:{
                    'email':user.email,
                    'nick':user.nick,
                    'direccion':user.direccion,
                    'telefono1':user.telefono1,
                    'telefono2':user.telefono2,
                    'pais':user.pais,
                    'provincia':user.provincia,
                    'poblacion':user.poblacion,
                    'nombre':user.nombre,
                    'apellidos':user.apellidos,
                    'cod_postal':user.cod_postal,
                    'website':user.website
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data){
                $ionicViewService.nextViewOptions({
                    disableBack: true
                    });
                    //mandamos a la home
                    $location.path("/tab/cuenta/dashboard");
            }).error(function(){
                $ionicLoading.show({template: 'Se ha producido un error.', duration:1000});
                // using the ionicViewService to hide the back button on next view
                $ionicViewService.nextViewOptions({
                disableBack: true
                });
                $location.path("/tab/cuenta/dashboard");
            })
    }

    }
})
.factory("lostPassword", function($http, mensajesFlash,authUsers,$ionicViewService,$location){
    return {
        lostPassword : function(email){
                //var Data = { user: user };
                
            return $http({
                url: 'http://fupudev.com/comprasengrupo/ComprasEnGrupo/admin/index.php/api/comprasengrupoapi/lostPassword/',
                method: "POST",
                //data : "email="+user.email+"&password="+"3"+"&nombre="+"3",
               //dataType: 'json',
                data:{'email':email},
                //data:{email: user.email},
                //headers: { 'Content-Type': 'application/json; charset=UTF-8' }
                headers : {'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'}
            })
             //return $http.post('http://fupudev.com/comprasengrupo/ComprasEnGrupo/admin/index.php/api/comprasengrupoapi/registroUsuario/',{ user:user } )
             .success(function(data){
                    if(data.respuesta == "success"){
                        mensajesFlash.clear();
                        mensajesFlash.show_success("Una nueva contraseña a sido mandada a tu correo.");

                        // using the ionicViewService to hide the back button on next view
                        $ionicViewService.nextViewOptions({
                            disableBack: true
                        });
                        //mandamos a la home
                    $location.path("/tab/cuenta/login");
                    }else if(data.respuesta == "failed"){
                        mensajesFlash.show_error("Ha ocurrido algún error al realizar el roro!.");
                    }else if(data.respuesta == "error_form"){
                        mensajesFlash.clear();
                        mensajesFlash.show_error("Ha ocurrido algún error al realizar el proceso!.");
                    }
                }).error(function(){
                    mensajesFlash.show_error("Ha ocurrido algún error al realizar el registro ERROR MAXIMO!.");
                })
        }
    }
})
//factoria para registrar usuarios a la que le inyectamos la otra factoria
//mensajesFlash para poder hacer uso de sus funciones
.factory("registerUsers", function($http, mensajesFlash,authUsers,$ionicViewService,$location){
    return {
        newRegister : function(user){
        		//var Data = { user: user };
        		
            return $http({
                url: 'http://fupudev.com/comprasengrupo/ComprasEnGrupo/admin/index.php/api/comprasengrupoapi/registroUsuario/',
                method: "POST",
                //data : "email="+user.email+"&password="+"3"+"&nombre="+"3",
               //dataType: 'json',
                data:{ 'nombre':user.nombre,'email':user.email,'password':SHA512(user.password)},
                //data:{email: user.email},
                //headers: { 'Content-Type': 'application/json; charset=UTF-8' }
                headers : {'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'}
            })
             //return $http.post('http://fupudev.com/comprasengrupo/ComprasEnGrupo/admin/index.php/api/comprasengrupoapi/registroUsuario/',{ user:user } )
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
function randomPW()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 10; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
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

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
    /*delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
    $httpProvider.defaults.headers.post['Access-Control-Max-Age'] = '1728000';
    $httpProvider.defaults.headers.common['Access-Control-Max-Age'] = '1728000';
    $httpProvider.defaults.headers.common['Accept'] = 'application/json, text/javascript';
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
    $httpProvider.defaults.useXDomain = true;*/
})

.config(function($stateProvider, $urlRouterProvider) {


  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

   .state('tab.cuenta-login', {
      url: '/cuenta/login',
      views: {
        'tab-cuenta': {
          templateUrl: 'templates/tab-login.html',
          controller: 'loginController'
        }
      }
    })

   .state('tab.cuenta-register', {
      url: '/cuenta/register',
      views: {
        'tab-cuenta': {
          templateUrl: 'templates/register.html',
          controller: 'registerController'
        }
      }
    })

    // Each tab has its own nav history stack:

    .state('tab.promociones', {
      url: '/promociones',
      views: {
        'tab-promociones': {
          templateUrl: 'templates/tab-promociones.html',
          controller: 'PromocionesCtrl'
        }
      }
    })

    .state('tab.promocion-detalle', {
      url: '/promociones/:id_promocion',
      views: {
        'tab-promociones': {
          templateUrl: 'templates/promocion-detalle.html',
          controller: 'PromocionDetallesCtrl'
        }
      }
    })

    .state('tab.buscar', {
      url: '/buscar',
      views: {
        'tab-buscar': {
          templateUrl: 'templates/tab-buscar.html',
          controller: 'BuscarCtrl'
        }
      }
    })

    .state('tab.buscar-filtro', {
      url: '/buscar/filtro/:id_categoria',
      views: {
        'tab-buscar': {
          templateUrl: 'templates/buscar-filtro.html',
          controller: 'BuscarFiltroCtrl'
        }
      }
    })

    .state('tab.buscar-filtro-detalle', {
      url: '/buscar/filtro/promocion/:id_promocion',
      views: {
        'tab-buscar': {
          templateUrl: 'templates/promocion-detalle.html',
          controller: 'PromocionDetallesCtrl'
        }
      }
    })
    .state('tab.propuestas', {
      url: '/propuestas',
      views: {
        'tab-propuestas': {
          templateUrl: 'templates/tab-propuestas.html',
          controller: 'PropuestasCtrl'
        }
      }
    })

    .state('tab.cuenta', {
      url: '/cuenta/dashboard',
      views: {
        'tab-cuenta': {
          templateUrl: 'templates/tab-cuenta.html',
          controller: 'CuentaCtrl'
        }
      }
    })

    .state('tab.cuenta-anadir', {
      url: '/cuenta/anadir',
      views: {
        'tab-cuenta': {
          templateUrl: 'templates/tab-cuenta-anadir.html',
          controller: 'CuentaAnadirCtrl'
        }
      }
    })
    .state('tab.cuenta-editar', {
      url: '/cuenta/editar',
      views: {
        'tab-cuenta': {
          templateUrl: 'templates/tab-cuenta-editar.html',
          controller: 'CuentaEditarCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/promociones');

});



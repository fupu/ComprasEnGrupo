<!DOCTYPE  html>
<!--cargamos nuestro modulo en la etiqueta html con ng-app-->
<html lang="es" ng-app="starter">
<head>
    <meta charset="UTF-8" />
    <title>Intro Angular</title>
    <link rel="stylesheet"  href="<?php echo base_url() ?>aplicacion/www/css/style.css"  media="screen" />
</head>
<body>
<!--creamos el div con la directiva ng-view, aquí será donde
carguen todas las vistas-->
<div class="row" ng-view></div>
<script type="text/javascript" src="<?php echo base_url() ?>aplicacion/www/lib/ionic/js/angular/angular.js"></script>
<script type="text/javascript" src="<?php echo base_url() ?>aplicacion/www/lib/ionic/js/ionic.bundle.js"></script>
<script type="text/javascript" src="<?php echo base_url() ?>aplicacion/www/lib/ionic/js/ionic.js"></script>


<script type="text/javascript" src="<?php echo base_url() ?>aplicacion/www/js/app.js"></script>
<script type="text/javascript" src="<?php echo base_url() ?>aplicacion/www/js/controllers.js"></script>
<script type="text/javascript" src="<?php echo base_url() ?>aplicacion/www/js/services.js"></script>

</body>
</html>
<header style="position: relative; margin-bottom: 30px; width: 100%;">
	<h1>LISTA DE CATEGORIAS :</h1>
</header>
<div id="category-list"></div>

<script>

/** Get request data category  **/
getRequest("lista_categorias/get_categoria", function(data) {
         
        var data = JSON.parse(data.responseText);
    
        for (var i = 0; i < data.length; i++) {
		
		$("#category-list").append('<header style="position: relative; margin-bottom: 30px; width: 100%;">'+
			'<h1>'+data[i].nombre+'</h1>'+
			'<div class="corner">'+
			+ data[i].count+' (Item)'+
			'</div>'+
		'</header>');
        }

    });
	
function getRequest(url, callback) {
    var request;
    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest(); // IE7+, Firefox, Chrome, Opera, Safari
    } else {
        request = new ActiveXObject("Microsoft.XMLHTTP"); // IE6, IE5
    }
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            callback(request);
			$('.loading').hide();
        }
    }
    request.open("GET", url, true);
    request.send();
}

</script>
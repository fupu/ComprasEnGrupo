<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Service_model extends CI_Model
{
	function __construct()
	{
		parent::__construct();
	}

	
	function getPromociones()
	{
		//$this->db->get('promocion');
		$this->db->order_by('fecha_creacion', 'desc');
		//$this->db->limit(5);
		$this->db->where('tipo', '0 '); //PROMOCION
		$this->db->or_where('tipo','5'); //PROMOCION CON PAYPAL
		$query = $this->db->get('promocion');

		$result = $query->result_array();

		return $result;
	}
	//Lista con todas las subastas
	function getSubastas()
	{
		$this->verificarSubastas();
		$this->db->order_by('fecha_fin_inscripcion', 'desc');
		//$this->db->limit(5);
		$this->db->where('tipo', '3'); //SUBASTA
		$query = $this->db->get('promocion');

		$result = $query->result_array();
		return $result;
	}

	//Lista con todas las propuestas
	function getPropuestas()
	{
		$this->anadirASubasta();//Comprueba que no haya propuestas pasadas de fecha
		$this->db->order_by('fecha_creacion', 'desc');
		//$this->db->limit(5);
		$this->db->where('tipo', '1'); //PROPUESTA
		$query = $this->db->get('promocion');

		$result = $query->result_array();
		return $result;
	}
	// Si una propuesta llega a su fecha limite entonces entra en subasta
	function anadirASubasta(){

		$fecha_actual = strtotime(date("d-m-Y H:i:00",time()));
		//$this->db->limit(5);
		$this->db->where('tipo', '1'); //PROPUESTA
		$query = $this->db->get('promocion');

		foreach($query->result_array() as $row){
			$fecha_fin_inscripcion = strtotime($row['fecha_fin_inscripcion']);
			if($fecha_fin_inscripcion < $fecha_actual)
				$this->actualizarPropuesta($row);
			//else
			//	$array[] = $row;
		}
	}
	//Se actualiza una propuesta en concreto a tipo subasta
	function actualizarPropuesta($propuesta){
		    $fecha_fin_subasta=date("Y-m-d H:i:s", strtotime("+7 days"));
    		$datos = array(
    			'tipo' =>	"3",
    			'subasta_fecha_fin' => $fecha_fin_subasta
    		);
       		$this->db->where('id_promocion',$propuesta['id_promocion']);
        	$this->db->update('promocion',$datos);
	}

	function getPromocionesporCategoria($categoria)
	{
		if($categoria != 'undefined'){
			$this->db->where('categoria_id_categoria', $categoria);
		}
		$this->db->order_by('fecha_creacion', 'desc');

		$this->db->where('tipo', '0 '); //PROMOCION
		$this->db->or_where('tipo','5'); //PROMOCION CON PAYPAL
		$this->db->or_where('tipo','1'); //Propuesta 
		
        $this->db->from('promocion');

		$query = $this->db->get();

		$result = $query->result_array();

		return $result;
	}
	function getImagenes()
	{
		//$this->db->get('promocion');
		//$this->db->order_by('fecha_creacion', 'asc');
		//$this->db->limit(5);
		$query = $this->db->get('imagen');

		    
		$result = $query->result_array();

		return $result;
	}		
	/*function get_list($id_categoria)
	{
		
		if($id_categoria != 'undefined'){
			$this->db->where('list_category_id', $id_categoria);
		}
		
		$query = $this->db->get('list');
		$result = $query->result_array();
		
		return $result;
	}*/

	
	function getCategorias()
	{
		/*$this->db->select('*');
        $this->db->from('categoria');*/

		/*$this->db->join('list', 'categoria.id_categoria = list.list_category_id','left');
        $this->db->group_by('category.category_name');*/
		 
		$query = $this->db->get('categoria');
		
		$result = $query->result_array();
		
		return $result;
	}

	function getUsers()
	{
		//$this->db->select('*');
        //$this->db->from('usuario');

		/*$this->db->join('list', 'categoria.id_categoria = list.list_category_id','left');
        $this->db->group_by('category.category_name');*/
		 
		$query = $this->db->get('usuario');
		
		$result = $query->result_array();
		
		return $result;
	}
	function getSubasta($id_subasta){
		$this->verificarSubastas();
		if($id_subasta != 'undefined'){
			$this->db->where('id_promocion', $id_subasta);
		}
		$this->db->where('tipo', '3'); //SUBASTA
        $this->db->from('promocion');

		$query = $this->db->get();

		$result = $query->result_array();

		return $result;
	}
	function getInscritos($id_subasta){
		if($id_subasta != 'undefined'){
			$this->db->where('Promocion_id_promocion', $id_subasta);
		}
		$this->db->where('comprado', '0');
        $this->db->from('lista_compra');

		$query = $this->db->get();

		$result = $query->num_rows();
		
		return $result;
	}
	function getPropuesta($id_propuesta){
		if($id_propuesta != 'undefined'){
			$this->db->where('id_promocion', $id_propuesta);
		}

        $this->db->from('promocion');

		$query = $this->db->get();

		$result = $query->result_array();

		return $result;
	}
	function getPromocion($id_promocion){
		if($id_promocion != 'undefined'){
			$this->db->where('id_promocion', $id_promocion);
		}

        $this->db->from('promocion');

		$query = $this->db->get();

		$result = $query->result_array();

		return $result;
	}
	function getSuscripciones($email){
		if($email != 'undefined'){
			$this->db->where('lista_compra.Usuario_email', $email);
		}
		$this->db->from('lista_compra');
		$this->db->join('promocion', 'promocion.id_promocion = lista_compra.Promocion_id_promocion');

		$query = $this->db->get();

		$result = $query->result_array();

		return $result;
	}

	
	function getImagen($id_promocion){
		if($id_promocion != 'undefined'){
			$this->db->where('Promocion_id_promocion', $id_promocion);
		}

        $this->db->from('imagen');

		$query = $this->db->get();

		$result = $query->result_array();

		return $result;
	}	
	function getUser($email){
		//$this->db->select('*');
        //$this->db->from('usuario');

		/*$this->db->join('list', 'categoria.id_categoria = list.list_category_id','left');
        $this->db->group_by('category.category_name');*/
        if($email != 'undefined'){
			$this->db->where('email', $email);
		}

        $this->db->from('usuario');

		$query = $this->db->get();

		$result = $query->result_array();

		return $result;
	}
	function updatePW($data){
		$datos = array(
            'password'       =>   $data['password']
        );
        $this->db->where('email',$data['email']);
        $this->db->update('usuario',$datos);
	}
	function updateUser($data){
        $datos = array(
            'nombre'       =>   $data['nombre'],
            'nick'         =>   $data['nick'],
            'direccion'    =>   $data['direccion'],
            'telefono1'	   =>	$data['telefono1'],
            'telefono2'	   =>	$data['telefono2'],
            'pais'		   =>	$data['pais'],
            'provincia'	   =>	$data['provincia'],
            'poblacion'	   =>	$data['poblacion'],
            'apellidos'	   =>	$data['apellidos'],
            'cod_postal'   =>	$data['cod_postal'],
            'website'	   =>	$data['website']
        );
        $this->db->where('email',$data['email']);
        $this->db->update('usuario',$datos);
        /*$check_exists = $this->db->get("usuario");
        if($check_exists->num_rows() == 0){
        	return true;
            
            return true;
        }else{
            return false;
        }*/
    }
    function realizarPujaModel($data){
        $datos = array(
            'subasta_puja_ganadora'	   =>	$data['cantidad'],
            'subasta_email_vendedor'   =>	$data['email'],
            'telefono'=> $data['telefono']
        );
        $this->db->where('id_promocion',$data['promocionID']);
        $this->db->update('promocion',$datos);
        if($this->db->affected_rows() != 1){
        	return false;
        }else{
        	return true;
    	}

    }
	// Verifica todas las subastas si siguen activas a fecha de hoy
    function verificarSubastas(){
		$fecha_actual = strtotime(date("d-m-Y H:i:00",time()));
		$this->db->where('tipo', '3'); //SUBASTA
		$query = $this->db->get('promocion');
        $datos = array(
            'tipo'	   =>	'4' // subasta finalizada
		);
		foreach($query->result_array() as $row){
			$fecha_fin_inscripcion = strtotime($row['subasta_fecha_fin']);
			if($fecha_fin_inscripcion < $fecha_actual){
				$this->db->where('id_promocion', $row['id_promocion']);
				$this->db->update('promocion',$datos);
				$this->mailGanadorSubasta($row);
				//$this->mailInscritorASubasta($row);
			}
    	}
	}
	//envi un email al ganador de la subasta
	function mailGanadorSubasta($row){
		$this->load->library('email');

		$this->db->where('comprado','0');
		$this->db->where('Promocion_id_promocion',$row['id_promocion']);
		$query = $this->db->get('lista_compra');
		$string="";
		foreach ($query->result_array as $key) {
			$string = "Email : " + $key['Usuario_email']+"\n";
		}
		$this->db->where('Promocion_id_promocion',$row['id_promocion']);
		$query = $this->db->get('lista_compra');

		$this->email->from('info@fupudev.com', 'ComprasEnGrupo');
		$this->email->to($row['subasta_email_vendedor']); 
		//$this->email->bcco('mit0.xavi@gmail.com'); 

		$this->email->subject('Has ganado la subasta!');

		$this->email->message('Enhorabuena!, has ganado la subasta, desde ya los usuarios pueden contactar contigo.');	

		$this->email->send();

	}
    function guardarPujaModel($data){
        $datos = array(
            'Usuario_email'	=>	$data['email'],
            'Promocion_id_promocion'	=>	$data['promocionID'],
            'cantidad_pujada'	   =>	$data['cantidad'],
            'observacion'   =>	$data['observacion']
        );

		if($this->YaHaPujado($data)){
        	$this->db->where('Usuario_email',$data['email']);
        	$this->db->where('Promocion_id_promocion',$data['promocionID']);
        	$this->db->update('subasta',$datos);
        }else{
        	$this->db->insert('subasta',$datos);        	
        }
        if($this->db->affected_rows() != 1){
        	return false;
        }else{
        	return true;
    	}

    }
    //mira si el usuario ya ha pujado por este mismo usuario para hacer update o insert
    function YaHaPujado($data){
    	$this->db->where('Usuario_email', $data['email']);
    	$this->db->where('Promocion_id_promocion', $data['promocionID']);
        $this->db->from('subasta');

        if($this->db->count_all_results() != 1){
        	return false;
        }else{
        	return true;
    	}
    }

    function anadirFotoData($insert_id,$data){
    	
    	$datos = array(
    		'imagen' =>	$data['fecha_fin_inscripcion'].$insert_id.".jpg",
    		'Promocion_id_promocion'	=>	$insert_id,
    	);
	

    	$this->db->insert('imagen',$datos);
        if($this->db->affected_rows() != 1){
        	return false;
        }else{
        	return true;
    	}
    }
	function anadirPromocion($data){
		
		/*$tiempo=date("Y-m-d", strtotime("+7 days"));
		
        $datos = array(
            'producto'       =>   $data['producto'],
            'precio'         =>   $data['precio'],
            'descripcion'    =>   $data['descripcion'],
            'unidad_medida'	   =>	$data['unidad_medida'],
            'compra_minima'	   =>	$data['compra_minima'],
            'observacion'		   =>	$data['observacion'],
            'categoria_id_categoria'	   =>	$data['categoria'],
            'lugar'	   =>	$data['lugar'],
            //'email_proponente'	   =>	$data['email_proponente'],
            'fecha_fin_inscripcion'	=>	$tiempo,
            'Usuario_email'	   =>	$data['usuario_email'],
            'tipo_envio'   =>	$data['tipo_envio'],
            'tipo'	=> '0'
        );*/
        
        $this->db->insert('promocion',$data);

        $insert_id = $this->db->insert_id();

        //SI se inserto correctamente
        if($this->db->affected_rows() != 1){
        	return null;
        }else{
    		$datos = array(
    			'imagen' =>	$data['fecha_fin_inscripcion'].$insert_id.".jpg"
    		);
       		$this->db->where('id_promocion',$insert_id);
        	$this->db->update('promocion',$datos);
        	return $insert_id;
    	}
        
        //return ($this->db->affected_rows() != 1) ? false : true;
        /*$check_exists = $this->db->get("usuario");
        if($check_exists->num_rows() == 0){
        	return true;
            
            return true;
        }else{
            return false;
        }*/
    }
    //Reenvia una nueva contraseña generada de forma aleatoria
    function reenviarRandom($email){
    	$this->load->helper('string');
		$this->load->library('email');

    	$randompassword = random_string('alnum',6);

 		$datos = array(
            'password'       =>   hash('sha512',$randompassword),
            'email'	=> $email
        );
        $this->updatePW($datos);

		$this->email->from('info@fupudev.com', 'ComprasEnGrupo');
		$this->email->to($email); 
		//$this->email->bcco('mit0.xavi@gmail.com'); 

		$this->email->subject('Recuperación de contraseña!');

		$this->email->message('Su nueva contraseña es:  '.$randompassword);	

		$this->email->send();

    }
    function anadirInscripcion($data){
        $datos = array(
            'Usuario_email'        =>       $data['usuario'],
            'Promocion_id_promocion'         =>      $data['propuestaID'],
            'comprado'      =>      '0' 
        );
        //$this->db->where('email',$email);
        $this->db->insert('lista_compra',$datos);
        /*$check_exists = $this->db->get("usuario");
        if($check_exists->num_rows() == 0){
        	return true;
            
            return true;
        }else{
            return false;
        }*/
    }
    //Comprueba si ya ha comrpado antes esta promocion.
    function YaHaCompradoAntes($data){
    	$this->db->where('Usuario_email', $data['email']);
    	$this->db->where('Promocion_id_promocion', $data['promocion_id']);
        $this->db->from('lista_compra');

        if($this->db->count_all_results() != 1){
        	return false;
        }else{
        	return true;
    	}
    }

    function pagoPayPal($data){
		$this->load->library('email');
        $datos = array(
            'comprado'        =>      '1',
            'Promocion_id_promocion'         =>      $data['promocion_id'],
            'Usuario_email'      =>      $data['email'] 
        );
        //Comprueba si ya ha comrpado antes esta promocion, Si la a comprado antes la actualiza +1, sino inserta
		if($this->YaHaCompradoAntes($data)){
        	$this->db->where('Usuario_email',$data['email']);
        	$this->db->where('Promocion_id_promocion',$data['promocion_id']);
        	$this->db->set('comprado', 'comprado+1', FALSE);//+1 en comprado, para tantos como compre
        	$this->db->update('lista_compra');
        }else{
        	$this->db->insert('lista_compra',$datos);        	
        }
        if($this->db->affected_rows() != 1){
        	return false;
        }else{
        			$this->email->from('info@fupudev.com', 'ComprasEnGrupo');
		$this->email->to($data['email']);
		//$this->email->bcco('mit0.xavi@gmail.com'); 

		$this->email->subject('Compras En Grupo');

		$this->email->message('Se a realizado su compra con exito, en breve realizaremos en envio.');	

		$this->email->send();

		$this->email->clear();

		$this->email->from('info@fupudev.com', 'ComprasEnGrupo');
		$this->email->to('info@fupudev.com');
		//$this->email->bcco('mit0.xavi@gmail.com'); 

		$this->email->subject('Compras En Grupo PayPal');

		$this->email->message('Usuario : '.$data['email'].'Promocion: '.$data['promocion_id']);	

		$this->email->send();

        	return true;
    	}
    }

    function borrarInscripcion($data){
    	$this->db->where('Usuario_email',$data['usuario']);
        $this->db->where('Promocion_id_promocion',$data['subastaID']);
        //$this->db->where('email',$email);
        $this->db->delete('lista_compra',$datos);
        /*$check_exists = $this->db->get("usuario");
        if($check_exists->num_rows() == 0){
        	return true;
            
            return true;
        }else{
            return false;
        }*/
    }
	function registerUser($email,$password,$nombre){
        $datos = array(
            'nombre'        =>      $nombre,
            'email'         =>      $email,
            'password'      =>      $password
        );
        $this->db->where('email',$email);
        $this->db->insert('usuario',$datos);
        /*$check_exists = $this->db->get("usuario");
        if($check_exists->num_rows() == 0){
        	return true;
            
            return true;
        }else{
            return false;
        }*/
    }
	function get_detalles_promo($filter)
	{
		if($filter != 'undefined'){
			$this->db->where('id_promocion', $filter);
		}

		$this->db->select('*');
        $this->db->from('promocion');
		/*$this->db->join('category', 'list.list_category_id =  category.category_id','left');*/
		
		$query = $this->db->get();
		$result = $query->result_array();
		
		return $result;
	}
	/*function get_bookmark($id)
	{
		
		if($id != 'undefined'){
			$this->db->where('list_id', $id);
		}
		
		$this->db->select('list_id,list_name,list_image,list_cook_time');
		$query = $this->db->get('list');
		$result = $query->result_array();
		
		return $result;
	}*/
}
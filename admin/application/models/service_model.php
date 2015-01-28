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
		$this->db->where('tipo', '0'); //PROMOCION
		$query = $this->db->get('promocion');

		$result = $query->result_array();

		return $result;
	}
	function getPropuestas()
	{
		
		$this->db->order_by('fecha_creacion', 'desc');
		//$this->db->limit(5);
		$this->db->where('tipo', '1'); //PROPUESTA
		$query = $this->db->get('promocion');

		$result = $query->result_array();

		return $result;
	}

	function getPromocionesporCategoria($categoria)
	{
		if($categoria != 'undefined'){
			$this->db->where('categoria_id_categoria', $categoria);
		}

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
            'website'	   =>	$data['website'],
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
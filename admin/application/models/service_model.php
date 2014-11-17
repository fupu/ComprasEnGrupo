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
		$this->db->order_by('fecha_creacion', 'asc');
		//$this->db->limit(5);
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
	function getPromocion($id_promocion){
		if($id_promocion != 'undefined'){
			$this->db->where('id_promocion', $id_promocion);
		}

        $this->db->from('promocion');

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
<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Service_model extends CI_Model
{
	function __construct()
	{
		parent::__construct();
	}

	
	function get_list_promo()
	{
		
		$this->db->order_by('id_promocion', 'RANDOM');
		$this->db->limit(5);
		$query = $this->db->get('promocion');

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

	
	function get_categoria()
	{
		$this->db->select('categoria.id_categoria, categoria.categoria, categoria.imagen');
        $this->db->from('categoria');
        $this->db->order_by('id_categoria');

		/*$this->db->join('list', 'categoria.id_categoria = list.list_category_id','left');
        $this->db->group_by('category.category_name');*/
		 
		$query = $this->db->get();
		
		$result = $query->result_array();
		
		return $result;
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
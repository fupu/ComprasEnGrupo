<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Imagenes_model extends CI_Model
{
	function __construct()
	{
		parent::__construct();
	}
	
	
	/*
	Action insert or update
	*/
	function insert($data,$data_id)
	{
		if ($data_id == '')
		{
			$result = $this->db->insert('imagen',$data);
			
			return $result;
			
		}else{
		
			$this->db->where('id_imagen', $data_id);
			$result = $this->db->update('imagen',$data);
		
			return $result;
			
			}	
		}
		
	
	/*
	Remove 
	*/
	function remove($data_id)
	{
		
	 	return $this->db->delete('imagen', array('id_imagen' => $data_id));
				
	}
	
	
	
}
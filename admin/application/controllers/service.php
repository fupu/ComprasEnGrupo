<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Service extends CI_Controller
{

	//Get request list Home
	public function get_list_promo()
	{
		
		$this->load->model('service_model');
		$query = $this->service_model->get_list_promo();
		
		header("Access-Control-Allow-Origin: *"); 
		header('Access-Control-Allow-Methods: GET, POST');		
		echo json_encode($query);
	}
				
	//Get request list
	public function get_list()
	{
		$category_id = $this->input->get('id');
		
		$this->load->model('service_model');
		$query = $this->service_model->get_list($category_id);
		
		header("Access-Control-Allow-Origin: *"); 
		header('Access-Control-Allow-Methods: GET, POST');		
		echo json_encode($query);
	}
	

	//Get request category
	public function categorias_get()
	{		
		$this->load->model('service_model');
		
		$query = $this->service_model->getCategorias();

		header("Access-Control-Allow-Origin: *"); 
		header('Access-Control-Allow-Methods: GET, POST');		
		echo json_encode($query);
	}

	//Get request detail
	public function get_detalles_promo()
	{
		$filter = $this->input->get('id_promocion');
		
		$this->load->model('service_model');
		$query = $this->service_model->get_detalles_promo($filter);

		header("Access-Control-Allow-Origin: *"); 
		header('Access-Control-Allow-Methods: GET, POST');		
		echo json_encode($query);
	}

	//Get request bookmark
	public function get_bookmark()
	{
		$id = $this->input->get('id');
		
		$this->load->model('service_model');
		$query = $this->service_model->get_bookmark($id);

		header("Access-Control-Allow-Origin: *"); 
		header('Access-Control-Allow-Methods: GET, POST');		
		echo json_encode($query);
	}

}

/* End of file service.php */
/* Location: ./application/controller/service.php */
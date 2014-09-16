<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Imagenes extends CI_Controller
{

	public function index()
	{	

		$this->load->view('imagenes');
	}
	
	public function get()
	{
		
		$data_id = $this->input->get('id');
		$result = $this->datatables->getData('imagen', array('imagen','nombre','promocion_id_promocion','id_imagen','imagen_url');
		echo $result;
		
	}

	public function insert()
	{
	   $config['path']   = './upload/imagenes/';
	   $config['format'] =	array("jpg", "png", "gif", "bmp");
	   $config['size']   = '1024';
	   
	    $this->load->library('ajaxupload');
		// Set image field	   
	    $this->ajaxupload->getUpload($config,"imagen_url");
		
		$query = $this->ajaxupload->query();
		
		$data_id = $this->input->post('id_imagen');

		$data = array();	
		$data['nombre']  = $this->input->post('nombre');

		if($query['file_name'] != ''){
			$data['imagenes_url'] = $query['file_name'];
		}	
		
		$this->load->model('imagenes_model');
		$result = $this->imagenes_model->insert($data,$data_id);
		
		if(!$data_id)
			if($result)
				echo "Data insert was successful!";
			else
				echo "Data insert not success!";
		else
			if($result)
				echo "Data update was successful!";
			else
				echo "Data update was successful!";
	}

	public function remove()
	{
		$data_id = $this->input->post('remove_images_id');
		
		$this->load->model('imagenes_model');
		$result = $this->imagenes_model->remove($data_id);
		
		if($result)
			echo "Data update was successful!";
		else
			echo "Data update was successful!";
		
	}
			
	
}

/* End of file imagenes.php */
/* Location: ./application/controller/imagene s.php */
<?php defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Example
 *
 * This is an example of a few basic user interaction methods you could use
 * all done with a hardcoded array.
 *
 * @package		CodeIgniter
 * @subpackage	Rest Server
 * @category	Controller
 * @author		Phil Sturgeon
 * @link		http://philsturgeon.co.uk/code/
*/

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH.'/libraries/REST_Controller.php';

class Example extends REST_Controller
{
    function __construct()
    {
        parent::__construct();

        
}
    function categorias_get()
    {   
        $this->load->model('service_model');

        $categorias = $this->service_model->getCategorias();

        if($categorias)
        {
            $this->response($categorias, 200); // 200 being the HTTP response code
        }

        else
        {
            $this->response(array('error' => 'Couldn\'t find any users!'), 404);
        }
    }


    function promociones_get(){
        $this->load->model('service_model');

        $promociones = $this->service_model->getPromociones();

        if($promociones){
            $this->response($promociones,200);
        }else{
            $this->response(array('error' => 'Couldn\'t find any promociones!'), 404);
        }
    }

    function promociones_put(){}

    function imagenes_get(){
        $this->load->model('service_model');

        $imagenes = $this->service_model->getImagenes();

        if($imagenes){
            $this->response($imagenes,200);
        }else{
            $this->response(array('error' => 'Couldn\'t find any imagenes!'), 404);
        }
    }



    function categoria_get()
    {
        $this->load->model('service_model');

        if(!$this->get('id_categoria'))
        {
            $this->response(array('error' => 'Categoria could not be found'), 400);
        }

        $categoria = $this->service_model->get($this->get('id_categoria'));

        if($categoria)
        {
            $this->response($categoria, 200); // 200 being the HTTP response code
        }

        else
        {
            $this->response(array('error' => 'Couldn\'t find any users!'), 404);
        }
    }

	function user_get()
    {
        $this->load->model('service_model');
        if(!$this->get('email'))
        {
        	$this->response(NULL, 400);
        }

        $user = $this->service_model->getUser( $this->get('email') );
    	
    	
        if($user)
        {
            $this->response($user, 200); // 200 being the HTTP response code
        }

        else
        {
            $this->response(array('error' => 'User could not be found'), 404);
        }
    }

    function registroUsuario_post(){
        $data = json_decode(trim(file_get_contents('php://input')),true);
        $email = $data['email'];
        $password = $data['password'];
        $nombre = $data['nombre'];
        $this->load->model('register_model');
        $loginUser = $this->register_model->postRegisterUser($email,$password,$nombre);
        if($loginUser === true){
            echo json_encode(array("respuesta" => "success"));
        }else{
            echo json_encode(array("respuesta" => "exists"));
        }
    }
    function registroUsuario_get(){
        $email = "TEST";
        $password = "TEST";
        $nombre = "TEST";
        $this->load->model('register_model');
        $loginUser = $this->register_model->registerUser($email,$password,$nombre);
        echo json_encode(array("respuesta" => "success"));

    }

    function loginUser_post(){
        /*$user = json_decode($this->input->post('user'),true);
        $message = array('authorized' => 'true','auhtorizationToken' => 'NjMwNjM4OTQtMjE0Mi00ZWYzLWEzMDQtYWYyMjkyMzNiOGIy!');
        $this->response($message, 200); // 200 being the HTTP response code
        if($this->input->post("email") && $this->input->post("password"))
        {
            $this->form_validation->set_rules('password', 'password', 'trim|required|xss_clean');
            $this->form_validation->set_rules('email', 'Email', 'trim|required|valid_email|xss_clean');
            if($this->form_validation->run() == false){
                echo json_encode(array("respuesta" => "incomplete_form"));
            }else{
                $this->load->model("login_model");
                $email = $this->input->post("email");
                $password = $this->input->post("password");
                $loginUser = $this->login_model->loginUser($email,$password);
                if($loginUser === true){
                    echo json_encode(array("respuesta" => "success"));
                }else{
                    echo json_encode(array("respuesta" => "failed"));
                }
            }
        }else{
            echo json_encode(array("respuesta" => "incomplete_form_out"));
        }*/
        $data = json_decode(trim(file_get_contents('php://input')),true);
        $email = $data['email'];
        $password = $data['password'];
        $this->load->model("login_model");
        $loginUser = $this->login_model->loginUser($email,$password);
        if($loginUser === true){
            echo json_encode(array("respuesta" => "success"));
        }else{
            echo json_encode(array("respuesta" => "failed"));
        }
    }

    function loginUser_get(){}

    function user_post()
    {

        $result = $this->service_model->updateUser( $email,$password,$nombre);
        //$message = array('email' => $this->get('email'), 'nombre' => $this->post('nombre'),  'message' => 'ADDED!');
        

        if($result === true)
        {
            $this->response(array('respuesta' => 'success'));
        }
         
        else
        {
            $this->response(array('respuesta' => 'exists'));
        }
        //$this->response($message, 200); // 200 being the HTTP response code
    }
    
    function user_delete()
    {
    	$this->service_model->deleteUser( $this->get('email') );
        $message = array('email' => $this->get('email'), 'message' => 'DELETED!');
        
        $this->response($message, 200); // 200 being the HTTP response code
    }
    
    function users_get()
    {  /*         header("Access-Control-Allow-Origin: *"); 
        header('Access-Control-Allow-Methods: GET, POST');    */  
        $this->load->model('service_model');

        $users = $this->service_model->getUsers();
        
        if($users)
        {
            $this->response($users, 200); // 200 being the HTTP response code
        }

        else
        {
            $this->response(array('error' => 'Couldn\'t find any users!'), 404);
        }
    }


	public function send_post()
	{
		var_dump($this->request->body);
	}


	public function send_put()
	{
		var_dump($this->put('foo'));
	}
}
<?php
class Login extends CI_Controller{
    public  function __construct(){
        parent::__construct();
    }
    public function index(){
        $this->load->view("login");
    }
 
    //logueamos usuarios con codeigniter y angularjs
    public function loginUser(){

            header("Access-Control-Allow-Origin: *");
            header('Access-Control-Allow-Methods: POST, GET, DELETE,OPTIONS');
            header('Access-Control-Max-Age: 1000');
            header('Access-Control-Allow-Headers: Content-Type');
            header('Content-Type: application/javascript');

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
        }
    }
 
    public function logoutUser(){
        $this->session->sess_destroy();
    }
}
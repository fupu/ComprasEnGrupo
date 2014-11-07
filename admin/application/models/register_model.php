<?php
class Register_model extends CI_Model{
    public function __construct(){
        parent::__construct();
    }
 
    public function postRegisterUser($email,$password,$nombre){
        $data = array(
            'nombre'=>$nombre,
            'email'=>$email,
            'password'=>$password
        );
 
        $this->db->where('email',$email);
        $check_exists = $this->db->get('usuario');
        if($check_exists->num_rows() == 0){
            $this->db->insert('usuario', $data);
            return true;
        }else{
            return false;
        }
    }
}
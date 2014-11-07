<?php
class Login_model extends CI_Model{
    public function __construct(){
        parent::__construct();
    }
 
    public function loginUser($email,$password){
        $this->db->where("email", $email);
        $this->db->where("password", $password);
        $query = $this->db->get("usuario");
        if($query->num_rows() == 1){
            return true;
        }else{
            return false;
        }
    }
}
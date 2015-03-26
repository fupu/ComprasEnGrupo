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

class Comprasengrupoapi extends REST_Controller
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

    function promocionporcategoria_get()
    {   

        $this->load->model('service_model');

        $promociones = $this->service_model->getPromocionesporCategoria($this->get('categoria'));

        if($promociones)
        {
            $this->response($promociones, 200); // 200 being the HTTP response code
        }

        else
        {
            $this->response(array('error' => 'Couldn\'t find any promocion!'), 404);
        }
    }
    function realizarPuja_post(){
        $data = json_decode(trim(file_get_contents('php://input')),true);
        /*$cantidad = $data['cantidad'];
        $observacion = $data['observacion'];*/

        $this->load->model('service_model');
        $puja = $this->service_model->realizarPujaModel($data);
        $guardarpuja = $this->service_model->guardarPujaModel($data);

        if(($puja === true )&& ($guardarpuja === true)){
            echo json_encode(array("respuesta" => "success"));
        }else{
            echo json_encode(array("respuesta" => "exists"));
        }
    }
    function subastas_get(){
        $this->load->model('service_model');

        $subastas = $this->service_model->getSubastas();

        if($subastas){
            $this->response($subastas,200);
        }else{
            $this->response(array('error' => 'Couldn\'t find any subastas!'), 404);
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
    function propuestas_get(){
        $this->load->model('service_model');

        $propuestas = $this->service_model->getPropuestas();

        if($propuestas){
            $this->response($propuestas,200);
        }else{
            $this->response(array('error' => 'Couldn\'t find any propuestas!'), 404);
        }
    }
    function inscribeME_post(){
        $data = json_decode(trim(file_get_contents('php://input')),true);
        $this->load->model("service_model");
        $inscrito = $this->service_model->anadirInscripcion($data);
        if($inscrito === true){
            echo json_encode(array("respuesta" => "success"));
        }else{
            echo json_encode(array("respuesta" => "failed"));
        }
    }
    function borrarME_post(){
        $data = json_decode(trim(file_get_contents('php://input')),true);
        $this->load->model("service_model");
        $borrado = $this->service_model->borrarInscripcion($data);
        if($borrado === true){
            echo json_encode(array("respuesta" => "success"));
        }else{
            echo json_encode(array("respuesta" => "failed"));
        }
    }
    function promociones_post(){
        $data = json_decode(trim(file_get_contents('php://input')),true);
        $this->load->model("service_model");
        $anadida = $this->service_model->anadirPromocion($data);
        if($anadida === true){
            echo json_encode(array("respuesta" => "success"));
        }else{
            echo json_encode(array("respuesta" => "failed"));
        }
    }

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
            $this->response(array('error' => 'Couldn\'t find any categoria!'), 404);
        }
    }
    function imagen_get(){
        $this->load->model('service_model');
        if(!$this->get('Promocion_id_promocion'))
        {
            $this->response(NULL, 400);
        }
        $imagen = $this->service_model->getImagen( $this->get('Promocion_id_promocion') );

        if($imagen){
            $this->response($imagen,200);
        }else{
            $this->response(array('error' => 'Couldn\'t find any promocion!'), 404);
        }
    }
    function suscripciones_get(){
        $this->load->model('service_model');
        if(!$this->get('email'))
        {
            $this->response(NULL, 400);
        }
        $suscripcion = $this->service_model->getSuscripciones( $this->get('email') );
        if($suscripcion){
            $this->response($suscripcion,200);
        }else{
            $this->response(array('error' => 'Couldn\'t find any suscripciones!'), 404);
        }
    }

    function propuesta_get(){
        $this->load->model('service_model');
        if(!$this->get('id_propuesta'))
        {
            $this->response(NULL, 400);
        }
        $propuesta = $this->service_model->getPropuesta( $this->get('id_propuesta') );

        if($propuesta){
            $this->response($propuesta,200);
        }else{
            $this->response(array('error' => 'Couldn\'t find any propuesta!'), 404);
        }
    }
    function promocion_get(){
        $this->load->model('service_model');
        if(!$this->get('id_promocion'))
        {
            $this->response(NULL, 400);
        }
        $promocion = $this->service_model->getPromocion( $this->get('id_promocion') );

        if($promocion){
            $this->response($promocion,200);
        }else{
            $this->response(array('error' => 'Couldn\'t find any promocion!'), 404);
        }
    }
    function subasta_get(){
        $this->load->model('service_model');
        if(!$this->get('id_subasta'))
        {
            $this->response(NULL, 400);
        }
        $subasta = $this->service_model->getSubasta( $this->get('id_subasta') );
        $numero_inscritos = $this->service_model->getInscritos($this->get('id_subasta'));
        if($subasta){
            $this->response($subasta,200);
        }else{
            $this->response(array('error' => 'Couldn\'t find any subasta!'), 404);
        }
    }
    function inscritos_a_subasta_get(){
        $this->load->model('service_model');
        if(!$this->get('id_subasta'))
        {
            $this->response(NULL, 400);
        }
        $numero_inscritos = $this->service_model->getInscritos($this->get('id_subasta'));
        if($numero_inscritos == 0 | $numero_inscritos ){ // Si existe o es 0
            $this->response($numero_inscritos,200);
        }else{
            $this->response(array('error' => 'Couldn\'t find any inscritos!'), 404);
        }
    }
    function promocion_put(){
        
    }

    //Esta función obtiene todos los usuarios registrados en nuestra aplicación
    function users_get()
    {
        $this->load->model('service_model');

        $users = $this->service_model->getUsers();
        
        if($users)
        {
            $this->response($users, 200); // 200 being the HTTP response code
        }

        else
        {
            $this->response(array('error' => 'No hemos encontrado usuarios!'), 404);
        }
    }
    //Esta función obtiene un usuario en concredo pasando el email como parametro
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
            $this->response(array('error' => 'No hemos encontrado el usuario'), 404);
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
    function lostPassword_post(){
        $data = json_decode(trim(file_get_contents('php://input')),true);
        $email = $data['email'];

        $this->load->model('service_model');
        $enviada = $this->service_model->reenviarRandom($email);
        if($enviada === true){
            echo json_encode(array("respuesta" => "success"));
        }else{
            echo json_encode(array("respuesta" => "error"));
        }
    }
    function pagoPayPalPromocion_post(){
        $data = json_decode(trim(file_get_contents('php://input')),true);
        $email = $data['email'];
        $promocion_id = $data['promocion_id'];

        $this->load->model('service_model');
        $guardado = $this->service_model->pagoPayPal($email,$promocion_id);
        if($guardado === true){
            echo json_encode(array("respuesta" => "success"));
        }else{
            echo json_encode(array("respuesta" => "error"));
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

    function updateUser_post(){
        $data = json_decode(trim(file_get_contents('php://input')),true);
        $this->load->model("service_model");
        $updateUser = $this->service_model->updateUser($data);
        if($updateUser === true){
            echo json_encode(array("respuesta" => "success"));
        }else{
            echo json_encode(array("respuesta" => "failed"));
        }
    }
    function cambioPW_post(){
        $data = json_decode(trim(file_get_contents('php://input')),true);
        $this->load->model("service_model");
        $cambioPW = $this->service_model->updatePW($data);
        /*if($cambioPW === true){
            echo json_encode(array("respuesta" => "success"));
        }else{
            echo json_encode(array("respuesta" => "failed"));
        }*/
    }
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
    
    function do_upload_post(){

        $config['upload_path'] = 'uploads/';
        $config['allowed_types'] = 'gif|jpg|png';
        $config['max_size'] = '1024 * 8';
        //$config['max_width']  = '1024';
        //$config['max_height']  = '768';
        $this->load->library('upload', $config);

        if ( ! $this->upload->do_upload() )
        {
            print_r($this->upload->display_errors('', ''));
            print_r($this->upload->data());
        }
    }
    function uploadPhotooPropu_post(){
        $tiempo=date("Y-m-d H:i:s", strtotime("+7 days"));
        $data = array(
            'producto'       =>   $_POST['producto'],
            'descripcion'    =>   $_POST['descripcion'],
            'unidad_medida'    =>   $_POST['unidad_medida'],
            'observacion'          =>   $_POST['observacion'],
            'categoria_id_categoria'       =>   $_POST['categoria'],
            'lugar'    =>   $_POST['lugar'],
            //'email_proponente'       =>   $data['email_proponente'],
            'fecha_fin_inscripcion' =>  $tiempo,
            'Usuario_email'    =>   $_POST['usuario_email'],
            'tipo'  => '1'
        );
        $this->load->model("service_model");
        $insert_id = $this->service_model->anadirPromocion($data); // es lo mismo en este caso ya va todo en el $data
       if($insert_id != null){
            $target_dir = "uploads/";
            $target_file = $target_dir .$tiempo.$insert_id.".jpg";
            $upload = move_uploaded_file($_FILES["image"]["tmp_name"], $target_file);
            $fotoAnadida = $this->service_model->anadirFotoData($insert_id,$data);
            if($fotoAnadida == true){
                echo json_encode(array("respuesta" => "success"));
            }
        }else{
            echo json_encode(array("respuesta" => "failed"));
        }   
    }

    function uploadPhotoo_post(){
        $tiempo=date("Y-m-d", strtotime("+7 days"));
        $data = array(
            'producto'       =>   $_POST['producto'],
            'precio'         =>   $_POST['precio'],
            'descripcion'    =>   $_POST['descripcion'],
            'unidad_medida'    =>   $_POST['unidad_medida'],
            'compra_minima'    =>   $_POST['compra_minima'],
            'observacion'          =>   $_POST['observacion'],
            'categoria_id_categoria'       =>   $_POST['categoria'],
            'lugar'    =>   $_POST['lugar'],
            'telefono'       =>   $_POST['telefono'],
            'fecha_fin_inscripcion' =>  $tiempo,
            'Usuario_email'    =>   $_POST['usuario_email'],
            'tipo_envio'   =>   $_POST['tipo_envio'],
            'tipo'  => '0'
        );
        $this->load->model("service_model");
        $insert_id = $this->service_model->anadirPromocion($data);
       if($insert_id != null){
            $target_dir = "uploads/";
            $target_file = $target_dir .$tiempo.$insert_id.".jpg";
            $upload = move_uploaded_file($_FILES["image"]["tmp_name"], $target_file);
            $fotoAnadida = $this->service_model->anadirFotoData($insert_id,$data);
            if($fotoAnadida == true){
                echo json_encode(array("respuesta" => "success"));
            }
        }else{
            echo json_encode(array("respuesta" => "failed"));
        }   
    }

    function uploadPhoto_post_OLDOLD(){
        $target_dir = "uploads/";
$target_file = $target_dir .trim($_POST['value1']).".jpg";
move_uploaded_file($_FILES["image"]["tmp_name"], $target_file);
        $img = array(); // return variable
 $this->load->helper(array('file','directory'));
 if (!empty($collection)) {
    $path="uploads/";
    if( !is_dir($path) ) {
        mkdir($path);
    }
    $config['upload_path'] = $path; /* NB! create this dir! */
    $config['allowed_types'] = 'gif|jpg|png|bmp|jpeg';
    $config['file_name'] = 'image001';
    $config['overwrite']=TRUE;

    $this->load->library('upload', $config);


    $configThumb = array();
    $configThumb['image_library'] = 'gd2';
    $configThumb['source_image'] = '';
    $configThumb['create_thumb'] = FALSE;
    $configThumb['maintain_ratio'] = FALSE;

      /* Load the image library */
    $this->load->library('image_lib');

      /* We have 5 files to upload
       * If you want more - change the 6 below as needed
       */
        /* Handle the file upload */
    if (isset($_FILES['image']['tmp_name'])) {
       $upload = move_uploaded_file($_FILES["image"]["tmp_name"], $path);
        echo json_encode(array("respuesta" => "success"));
        /* File failed to upload - continue */
        if($upload === FALSE){
            $error = array('error' => $this->upload->display_errors());
            $data['message']=$error['error'];
            continue;   
        } 
        /* Get the data about the file */
        $data = $this->upload->data();
        $img['image']='/'.$data['file_name'];

    }

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
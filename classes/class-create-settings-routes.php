<?php
/**
 * This file will create Custom Rest API End Points.
 */
class WP_React_Settings_Rest_Route {

    public function __construct() {
        add_action( 'rest_api_init', [ $this, 'create_rest_routes' ] );
    }

    public function create_rest_routes() {
        register_rest_route( 'wprk/v1', '/settings', [
            'methods' => 'GET',
            'callback' => [ $this, 'get_settings' ],
            
        ] );
        register_rest_route( 'wprk/v1', '/settings', [
            'methods' => 'POST',
            'callback' => [ $this, 'save_chantgtp_answers' ],
        ] );
        register_rest_route( 'wprk/v1', '/settings/update', [
            'methods' => 'PUT',
            'callback' => [ $this, 'update_chantgtp_answers' ],
        ] );
        register_rest_route( 'wprk/v1', '/settings/images', [
            'methods' => 'PUT',
            'callback' => [ $this, 'update_chantgtp_images' ],
        ] );
        register_rest_route( 'wprk/v1', '/settings/delete', [
            'methods' => 'POST',
            'callback' => [ $this, 'delete_settings' ],
        ] );
    }




    public function download_images ($req){

        if(isset($req["download_files"])){

            $imgs=explode(",",$req["files_download"]);
        
            if(sizeOf($imgs)>1){
            $nameSearch=$req["nameFile"];
            $tmpFile = tempnam('/tmp', '');
            $zip = new ZipArchive;
            $zip->open($tmpFile, ZipArchive::CREATE);
            $totalPhotos= sizeOf($imgs);
            for($i=0;$i<$totalPhotos;$i++){
                $key = $nameSearch."_m2m_".$i;
        $time = time();
        $hash = hash_hmac('sha256', $time, $key);
        
               $nameSearchfile=$nameSearch."_".$hash.".png";
               $fileContent = file_get_contents($imgs[$i]);
        
               $zip->addFromString($nameSearchfile, $fileContent);   
        }
        
        $key = $nameSearch."_m2m_";
        
        $zipFileName=$key.".zip";
        
        $zip->close();
        header('Content-Type: application/zip');
        header('Content-disposition: attachment; filename='.$zipFileName);
        header('Content-Length: ' . filesize($tmpFile));
        readfile($tmpFile);
        
        unlink($tmpFile);
        exit;
            }else{
                //Directly Download Image...
                $linkoffile=$imgs[0];
                
               $nameSearch=$_POST["nameFile"];
                $key = $nameSearch."_m2m_";
        $time = time();
        $hash = hash_hmac('sha256', $time, $key);
        
         $nameSearchfile=$nameSearch."_".$hash.".png";
        
        header('Content-Disposition: attachment; filename="'.$nameSearchfile.'"');
        header("Content-Type: text/png");
        echo (file_get_contents($linkoffile));
        unlink($linkoffile);
                exit;
        
            }
           
         }
        
        
    }




    public function delete_settings($req){
        global $wpdb;
        $table = $wpdb->prefix . 'chatgtp_data';
        $id = $req['id'];
        if(!empty($id)){
            $delete = $wpdb->delete( $table, array( 'id' => $id ) );
            if($delete){
                return rest_ensure_response( 'record_deleted successfully!' );
            }else{
                return rest_ensure_response( 'Error:'.$delete );
            }
            
        }else{
            return rest_ensure_response( 'Please give proper input!' );
        }

        
    }
    public function get_settings() {
        global $wpdb;
        $table = $wpdb->prefix . 'chatgtp_data';
        $query = "SELECT * FROM $table";
        $results = $wpdb->get_results($query);
        if(!empty($results)){
            return rest_ensure_response( $results );
        }else{
            return rest_ensure_response( "empty tables" );
        }
        
    }

    public function get_settings_permission() {
        return true;
    }

    public function save_chantgtp_answers( $req ) {
        global $wpdb;
        $question = sanitize_text_field( $req['question'] );
        $answer  = sanitize_text_field( $req['answer'] );
        $is_image     = wp_validate_boolean( $req['is_image'] );
        $images     = serialize($req['images']);
       
        $table_name = $wpdb->prefix . 'chatgtp_data';
        if($question) {
            $insert = $wpdb->insert($table_name, array(
                "question" => $question ,
                "answer" => $answer ,
                "is_image" => $is_image ,
                "images"=>$images
                ));
            if($insert) {
                return rest_ensure_response( array('status'=> 'success', 'message' => 'You are registered', 'chat_id' => $wpdb->insert_id ) );
            } else {
                return rest_ensure_response( array('status'=> 'error', 'message' => 'getting error', 'chat_id' => $insert ) );
            }
        }else{
            return rest_ensure_response( array('status'=> 'error', 'message' => 'can write validation error here!'.$question, 'chat_id' => false ) );
        }
        //return rest_ensure_response( 'success' );
    }
    /**
     * update chatgpt answer according to question
     *  
     */
    public function update_chantgtp_answers($req){
        global $wpdb;
  
        $answer  = $req['answer'];
        $chat_id = (int)  $req['chat_id'];
        $table_name = $wpdb->prefix . 'chatgtp_data';
        if($chat_id) {
            $updated = $wpdb->update(
                $table_name,
                array(
                    "answer" => $answer        
                ),
                array(
                    "id" => $chat_id        
                )
            );

            var_dump($updated);
            if($updated) {
            return rest_ensure_response( array('status'=> 'success', 'message' => 'You are registered', 'chat_id' => $chat_id ) );
            } else {
            return rest_ensure_response( array('status'=> 'error', 'message' => 'getting error', 'chat_id' =>$updated ) );
            }
        }else{
            return rest_ensure_response( array('status'=> 'error', 'message' => 'can write validation error here!'.$answer, 'chat_id' => false ) );
        }
    }

    public function update_chantgtp_images($req){
        global $wpdb;
  
        $images  = serialize( $req['images'] );
        $chat_id = (int) sanitize_text_field( $req['chat_id'] );
        $table_name = $wpdb->prefix . 'chatgtp_data';
        if($chat_id) {
            $updated = $wpdb->update(
                $table_name,
                array(
                    "images" => $images        
                ),
                array(
                    "id" => $chat_id        
                )
            );
            if($updated) {
            return rest_ensure_response( array('status'=> 'success', 'message' => 'You are registered', 'chat_id' => $chat_id ) );
            } else {
            return rest_ensure_response( array('status'=> 'error', 'message' => 'getting error', 'chat_id' => $chat_id ) );
            }
        }else{
            return rest_ensure_response( array('status'=> 'error', 'message' => 'can write validation error here!'.$question, 'chat_id' => false ) );
        }
    }
    public function save_settings_permission() {
        return current_user_can( 'publish_posts' );
    }
}

new WP_React_Settings_Rest_Route();
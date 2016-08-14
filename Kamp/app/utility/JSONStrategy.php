<?php

class JSONStrategy implements IEncode {

    public function encode_my_data($toEncode = array()) {
        $response = HttpResponseManager::getResponseInstance();
        $response->setContentType('application/json');
        $temp_array = json_encode($toEncode);
        $response->setContent($temp_array);
    }

}

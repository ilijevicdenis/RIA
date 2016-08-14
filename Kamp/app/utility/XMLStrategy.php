<?php

class XMLStrategy implements IEncode {

    public function encode_my_data($toEncode = array()) {
        //creating object of SimpleXMLElement
        $xml_user_info = new SimpleXMLElement("<?xml version=\"1.0\"?><user_info></user_info>");

        //function call to convert array to xml
        $this->array_to_xml($toEncode, $xml_user_info);

        //saving generated xml file
        $xml_file = $xml_user_info->asXML();

        return $xml_file;
    }

    //function defination to convert array to xml
    function array_to_xml($array, &$xml_user_info) {
        foreach ($array as $key => $value) {
            if (is_array($value)) {
                if (!is_numeric($key)) {
                    $subnode = $xml_user_info->addChild("$key");
                    $this->array_to_xml($value, $subnode);
                } else {
                    $subnode = $xml_user_info->addChild("item$key");
                    $this->array_to_xml($value, $subnode);
                }
            } else {
                $xml_user_info->addChild("$key", htmlspecialchars("$value"));
            }
        }
    }
}

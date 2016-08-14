<?php

class DataType {
    private $strategy = null;
    
    public function get_coded_data($data = array()) {
        if ($this->strategy === null) {
            return $data;
        }
        
        $this->strategy->encode_my_data($data);
    }
    
    public function setStrategy(IEncode $strat) {
        $this->strategy = $strat;
    }
}
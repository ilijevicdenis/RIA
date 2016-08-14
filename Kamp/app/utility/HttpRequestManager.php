<?php

use Phalcon\Http\Request;

final class HttpRequestManager {

    private static $instance = null;

    private function __construct() {
        
    }

    private function __copy() {
        
    }

    public static function getHttpRequestInstance() {
        if (self::$instance === null) {
            self::$instance = new Request();
        }
        return self::$instance;
    }
}
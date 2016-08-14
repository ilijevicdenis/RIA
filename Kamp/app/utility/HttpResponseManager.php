<?php

/*
 * Global response manager 
 * Authors: Denis Ilijevi, Mersad Ajanovic
 */

use Phalcon\Http\Response;

final class HttpResponseManager {

    private static $responseInstance = null;

    private function __construct() {

    }

    private function __copy() {
        
    }

    private function __clone()
    {

    }

    private function __wakeup()
    {

    }

    public static function getResponseInstance() {
        if (self::$responseInstance === null) {
            self::$responseInstance = new Response();
        }

        return self::$responseInstance;
    }

}

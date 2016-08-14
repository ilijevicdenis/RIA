<?php

/*
    Redis cache implementatiton
    Author: Denis Ilijevic
    email: dilijevic@titeh.hr
*/

use \Phalcon\Cache\Backend\Redis as Redisc;
use \Phalcon\Cache\Frontend\Data as Data;

Class RedisCache implements ICache
{
    private $Redis = null;
    private $ttl = 0;

    function __construct($host, $port = "6379", $password = "", $persistent = false, $lifetime)
    {
        $RedisConfig = array("hostname" => $host,
                              "port" => $port,
                              "auth" => $password,
                              "persistent" => $persistent
                              );

        $FrontCache = new Data(array("lifetime" => $lifetime));
        $this->ttl = $lifetime;
        $this->Redis = new Redisc($FrontCache, $RedisConfig);
    }

    function StoreData($key, $value)
    {
        $this->Redis->save($key, $value);
    }

    function FetchData($key)
    {
        return $this->Redis->get($key);
    }

    function FlushCacheData()
    {
        $this->Redis->flush();
    }

    function DeleteData($key)
    {
        $this->Redis->delete($key);
    }

    function AlreadyCached($key)
    {
        return $this->Redis->exists($key, $this->ttl);
    }
}
<?php 

/* 
    Author: Denis Ilijevic
    E-mail: dilijevic@riteh.hr
*/

Interface ICache 
{
    function StoreData($key, $value);
    function FetchData($key);
    function FlushCacheData();
    function DeleteData($key);
    function AlreadyCached($key);
}
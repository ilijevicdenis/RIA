<?php

class Slika extends \Phalcon\Mvc\Model
{

    /**
     *
     * @var integer
     */
    public $slika_id;

    /**
     *
     * @var integer
     */
    public $parcela_id;

    /**
     *
     * @var string
     */
    public $path;

    /**
     * Initialize method for model.
     */
    public function initialize()
    {
        $this->belongsTo('parcela_id', 'Parcela', 'parcela_id', array('alias' => 'Parcela'));
    }

    /**
     * Returns table name mapped in the model.
     *
     * @return string
     */
    public function getSource()
    {
        return 'slika';
    }

    /**
     * Allows to query a set of records that match the specified conditions
     *
     * @param mixed $parameters
     * @return Slika[]
     */
    public static function find($parameters = null)
    {
        return parent::find($parameters);
    }

    /**
     * Allows to query the first record that match the specified conditions
     *
     * @param mixed $parameters
     * @return Slika
     */
    public static function findFirst($parameters = null)
    {
        return parent::findFirst($parameters);
    }

}

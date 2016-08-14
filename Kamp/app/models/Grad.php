<?php

class Grad extends \Phalcon\Mvc\Model
{

    /**
     *
     * @var integer
     */
    public $grad_id;

    /**
     *
     * @var string
     */
    public $grad_ime;

    /**
     *
     * @var string
     */
    public $postanski_broj;

    /**
     *
     * @var integer
     */
    public $drzava_id;

    /**
     * Initialize method for model.
     */
    public function initialize()
    {
        $this->hasMany('grad_id', 'Kamp', 'grad_id', array('alias' => 'Kamp'));
        $this->hasMany('grad_id', 'Osoba', 'grad_id', array('alias' => 'Osoba'));
        $this->belongsTo('drzava_id', 'Drzava', 'drzava_id', array('alias' => 'Drzava'));
    }

    /**
     * Returns table name mapped in the model.
     *
     * @return string
     */
    public function getSource()
    {
        return 'grad';
    }

    /**
     * Allows to query a set of records that match the specified conditions
     *
     * @param mixed $parameters
     * @return Grad[]
     */
    public static function find($parameters = null)
    {
        return parent::find($parameters);
    }

    /**
     * Allows to query the first record that match the specified conditions
     *
     * @param mixed $parameters
     * @return Grad
     */
    public static function findFirst($parameters = null)
    {
        return parent::findFirst($parameters);
    }

}

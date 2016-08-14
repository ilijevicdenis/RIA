<?php

class Kamp extends \Phalcon\Mvc\Model
{

    /**
     *
     * @var integer
     */
    public $kamp_id;

    /**
     *
     * @var string
     */
    public $kamp_ime;

    /**
     *
     * @var string
     */
    public $adresa;

    /**
     *
     * @var integer
     */
    public $grad_id;

    /**
     *
     * @var integer
     */
    public $broj_parcela;

    /**
     *
     * @var string
     */
    public $opis_kampa;

    /**
     * Initialize method for model.
     */
    public function initialize()
    {
        $this->hasMany('kamp_id', 'Dostupnost', 'kamp_id', array('alias' => 'Dostupnost'));
        $this->hasMany('kamp_id', 'Parcela', 'kamp_id', array('alias' => 'Parcela'));
        $this->belongsTo('grad_id', 'Grad', 'grad_id', array('alias' => 'Grad'));
    }

    /**
     * Returns table name mapped in the model.
     *
     * @return string
     */
    public function getSource()
    {
        return 'kamp';
    }

    /**
     * Allows to query a set of records that match the specified conditions
     *
     * @param mixed $parameters
     * @return Kamp[]
     */
    public static function find($parameters = null)
    {
        return parent::find($parameters);
    }

    /**
     * Allows to query the first record that match the specified conditions
     *
     * @param mixed $parameters
     * @return Kamp
     */
    public static function findFirst($parameters = null)
    {
        return parent::findFirst($parameters);
    }

}

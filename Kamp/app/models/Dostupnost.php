<?php

class Dostupnost extends \Phalcon\Mvc\Model
{

    /**
     *
     * @var integer
     */
    public $dostupnost_id;

    /**
     *
     * @var integer
     */
    public $kamp_id;

    /**
     *
     * @var integer
     */
    public $parcela_id;

    /**
     *
     * @var string
     */
    public $dostupnost_status;

    /**
     *
     * @var string
     */
    public $opis;

    /**
     *
     * @var string
     */
    public $datum_od;

    /**
     *
     * @var string
     */
    public $datum_do;

    /**
     * Initialize method for model.
     */
    public function initialize()
    {
        $this->belongsTo('kamp_id', 'Kamp', 'kamp_id', array('alias' => 'Kamp'));
        $this->belongsTo('parcela_id', 'Parcela', 'parcela_id', array('alias' => 'Parcela'));
    }

    /**
     * Returns table name mapped in the model.
     *
     * @return string
     */
    public function getSource()
    {
        return 'dostupnost';
    }

    /**
     * Allows to query a set of records that match the specified conditions
     *
     * @param mixed $parameters
     * @return Dostupnost[]
     */
    public static function find($parameters = null)
    {
        return parent::find($parameters);
    }

    /**
     * Allows to query the first record that match the specified conditions
     *
     * @param mixed $parameters
     * @return Dostupnost
     */
    public static function findFirst($parameters = null)
    {
        return parent::findFirst($parameters);
    }

}

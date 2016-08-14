<?php

class Parcela extends \Phalcon\Mvc\Model
{

    /**
     *
     * @var integer
     */
    public $parcela_id;

    /**
     *
     * @var integer
     */
    public $sifra_parcele;

    /**
     *
     * @var integer
     */
    public $kamp_id;

    /**
     *
     * @var string
     */
    public $struja;

    /**
     *
     * @var string
     */
    public $voda;

    /**
     *
     * @var double
     */
    public $cijena_nocenja;

    /**
     *
     * @var string
     */
    public $opis;

    /**
     * Initialize method for model.
     */
    public function initialize()
    {
        $this->hasMany('parcela_id', 'Dostupnost', 'parcela_id', array('alias' => 'Dostupnost'));
        $this->hasMany('parcela_id', 'Gostovanje', 'parcela_id', array('alias' => 'Gostovanje'));
        $this->hasMany('parcela_id', 'Slika', 'parcela_id', array('alias' => 'Slika'));
        $this->belongsTo('kamp_id', 'Kamp', 'kamp_id', array('alias' => 'Kamp'));
    }

    /**
     * Returns table name mapped in the model.
     *
     * @return string
     */
    public function getSource()
    {
        return 'parcela';
    }

    /**
     * Allows to query a set of records that match the specified conditions
     *
     * @param mixed $parameters
     * @return Parcela[]
     */
    public static function find($parameters = null)
    {
        return parent::find($parameters);
    }

    /**
     * Allows to query the first record that match the specified conditions
     *
     * @param mixed $parameters
     * @return Parcela
     */
    public static function findFirst($parameters = null)
    {
        return parent::findFirst($parameters);
    }

}

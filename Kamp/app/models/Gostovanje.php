<?php

class Gostovanje extends \Phalcon\Mvc\Model
{

    /**
     *
     * @var integer
     */
    public $gostovanje_id;

    /**
     *
     * @var integer
     */
    public $osoba_id;

    /**
     *
     * @var string
     */
    public $datum_rezervacije;

    /**
     *
     * @var string
     */
    public $datum_dolaska;

    /**
     *
     * @var string
     */
    public $datum_odlaska;

    /**
     *
     * @var integer
     */
    public $parcela_id;

    /**
     * Initialize method for model.
     */
    public function initialize()
    {
        $this->hasMany('gostovanje_id', 'Placanje', 'gostovanje_id', array('alias' => 'Placanje'));
        $this->belongsTo('osoba_id', 'Osoba', 'osoba_id', array('alias' => 'Osoba'));
        $this->belongsTo('parcela_id', 'Parcela', 'parcela_id', array('alias' => 'Parcela'));
    }

    /**
     * Returns table name mapped in the model.
     *
     * @return string
     */
    public function getSource()
    {
        return 'gostovanje';
    }

    /**
     * Allows to query a set of records that match the specified conditions
     *
     * @param mixed $parameters
     * @return Gostovanje[]
     */
    public static function find($parameters = null)
    {
        return parent::find($parameters);
    }

    /**
     * Allows to query the first record that match the specified conditions
     *
     * @param mixed $parameters
     * @return Gostovanje
     */
    public static function findFirst($parameters = null)
    {
        return parent::findFirst($parameters);
    }

}

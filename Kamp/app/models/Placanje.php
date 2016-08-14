<?php

class Placanje extends \Phalcon\Mvc\Model
{

    /**
     *
     * @var integer
     */
    public $placanje_id;

    /**
     *
     * @var integer
     */
    public $gostovanje_id;

    /**
     *
     * @var integer
     */
    public $nocenja;

    /**
     *
     * @var double
     */
    public $cijena_nocenja;

    /**
     *
     * @var double
     */
    public $porez;

    /**
     *
     * @var double
     */
    public $ukupno;

    /**
     * Initialize method for model.
     */
    public function initialize()
    {
        $this->belongsTo('gostovanje_id', 'Gostovanje', 'gostovanje_id', array('alias' => 'Gostovanje'));
    }

    /**
     * Returns table name mapped in the model.
     *
     * @return string
     */
    public function getSource()
    {
        return 'placanje';
    }

    /**
     * Allows to query a set of records that match the specified conditions
     *
     * @param mixed $parameters
     * @return Placanje[]
     */
    public static function find($parameters = null)
    {
        return parent::find($parameters);
    }

    /**
     * Allows to query the first record that match the specified conditions
     *
     * @param mixed $parameters
     * @return Placanje
     */
    public static function findFirst($parameters = null)
    {
        return parent::findFirst($parameters);
    }

}

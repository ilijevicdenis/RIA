<?php

class TipOsobe extends \Phalcon\Mvc\Model
{

    /**
     *
     * @var integer
     */
    public $tip_id;

    /**
     *
     * @var string
     */
    public $tip;

    /**
     * Initialize method for model.
     */
    public function initialize()
    {
        $this->hasMany('tip_id', 'Osoba', 'tip_id', array('alias' => 'Osoba'));
    }

    /**
     * Returns table name mapped in the model.
     *
     * @return string
     */
    public function getSource()
    {
        return 'tip_osobe';
    }

    /**
     * Allows to query a set of records that match the specified conditions
     *
     * @param mixed $parameters
     * @return TipOsobe[]
     */
    public static function find($parameters = null)
    {
        return parent::find($parameters);
    }

    /**
     * Allows to query the first record that match the specified conditions
     *
     * @param mixed $parameters
     * @return TipOsobe
     */
    public static function findFirst($parameters = null)
    {
        return parent::findFirst($parameters);
    }

}

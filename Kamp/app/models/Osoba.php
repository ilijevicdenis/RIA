<?php

use Phalcon\Mvc\Model\Validator\Email as Email;

class Osoba extends \Phalcon\Mvc\Model
{

    /**
     *
     * @var integer
     */
    public $osoba_id;

    /**
     *
     * @var string
     */
    public $ime;

    /**
     *
     * @var string
     */
    public $prezime;

    /**
     *
     * @var string
     */
    public $adresa;

    /**
     *
     * @var string
     */
    public $kontakt_broj;

    /**
     *
     * @var string
     */
    public $email;

    /**
     *
     * @var string
     */
    public $password;

    /**
     *
     * @var integer
     */
    public $grad_id;

    /**
     *
     * @var integer
     */
    public $tip_id;

    /**
     * Validations and business logic
     *
     * @return boolean
     */
    public function validation()
    {
        $this->validate(
            new Email(
                array(
                    'field'    => 'email',
                    'required' => true,
                )
            )
        );

        if ($this->validationHasFailed() == true) {
            return false;
        }

        return true;
    }

    /**
     * Initialize method for model.
     */
    public function initialize()
    {
        $this->hasMany('osoba_id', 'Gostovanje', 'osoba_id', array('alias' => 'Gostovanje'));
        $this->belongsTo('grad_id', 'Grad', 'grad_id', array('alias' => 'Grad'));
        $this->belongsTo('tip_id', 'TipOsobe', 'tip_id', array('alias' => 'TipOsobe'));
    }

    /**
     * Returns table name mapped in the model.
     *
     * @return string
     */
    public function getSource()
    {
        return 'osoba';
    }

    /**
     * Allows to query a set of records that match the specified conditions
     *
     * @param mixed $parameters
     * @return Osoba[]
     */
    public static function find($parameters = null)
    {
        return parent::find($parameters);
    }

    /**
     * Allows to query the first record that match the specified conditions
     *
     * @param mixed $parameters
     * @return Osoba
     */
    public static function findFirst($parameters = null)
    {
        return parent::findFirst($parameters);
    }

}

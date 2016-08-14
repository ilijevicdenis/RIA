<?php

class KampController extends ControllerBase
{

    public function indexAction()
    {

    }

    public function addAction()
    {
        if ($this->request->isPost()) {
            $response = HttpResponseManager::getResponseInstance();

            $json_content = $this->request->getJsonRawBody();

            if ($drzava = Drzava::findFirstByNaziv($json_content->Country)) {
                if ($grad = Grad::findFirst(
                    array(
                        'conditions' => 'drzava_id = ?1 AND grad_ime = ?2',
                        'bind' => array(
                            1 => $drzava->drzava_id,
                            2 => $json_content->City
                        )
                    )
                )) {
                    if ($camp_exist = Kamp::findFirst(
                        array(
                            'conditions' => 'grad_id = ?1 AND kamp_ime = ?2',
                            'bind' => array(
                                1 => $grad->grad_id,
                                2 => $json_content->CampName
                            )
                        )
                    )) {
                        $response->setStatusCode(409, "Conflict");
                        $response->setContentType('text/plain', 'UTF-8');
                        $response->setContent("Error: Kamp: $json_content->CampName in the city: $grad->grad_ime, already exists!");

                        $response->send();
                        return;
                    } else {
                        $kamp = new Kamp();

                        $kamp->kamp_ime = $json_content->CampName;
                        $kamp->adresa = $json_content->Address;
                        $kamp->broj_parcela = $json_content->NoParcela;
                        $kamp->opis_kampa = $json_content->CampDescription;
                        $kamp->grad_id = $grad->grad_id;

                        try {
                            $kamp->save();
                            $response->setStatusCode(200, "OK");
                            $response->setContentType('text/plain', 'UTF-8');
                            $response->setContent("New Kamp (name: $kamp->kamp_ime) successfully added!");
                        } catch (Exception $e) {
                            $response->setStatusCode(500, "Internal Server Error");
                            $response->setContentType('text/plain', 'UTF-8');
                            $response->setContent("Error: " . $e->getMessage());
                        }

                        $response->send();
                        return;
                    }
                } else {
                    $error_in = "Grad";
                }
            } else {
                $error_in = "Drzava";
            }

            $response->setStatusCode(404, "Not Found");
            $response->setContentType('text/plain', 'UTF-8');
            $response->setContent("Error: $error_in not found in the database!");
            $response->send();
        }
    }

}


<?php

class ParcelaController extends ControllerBase
{

    public function indexAction()
    {

    }

    public function availabilityAction()
    {
        if ($this->request->isPost()) {
            $response = HttpResponseManager::getResponseInstance();

            $json_content = $this->request->getJsonRawBody();

            if ($parcela = Parcela::findFirstByParcelaId($json_content->ParcelaID)) {
                if ($is_parcela_avail = Dostupnost::find(
                        array(
                            'conditions' => 'parcela_id = ?1 AND datum_od <= ?2 AND datum_do >= ?3',
                            'bind' => array(
                                1 => $parcela->parcela_id,
                                2 => $json_content->AvailableUntil,
                                3 => $json_content->AvailableFrom
                            ),
                            'for_update' => true
                        )
                )->toArray())
                {
                    $response->setStatusCode(409, "Conflict");
                    $response->setContentType('text/plain', 'UTF-8');
                    $response->setContent("Error: Parcela($parcela->parcela_id) unavailable for requested time period!");

                    $response->send();
                } else {
                    $dostupnost = new Dostupnost();

                    $dostupnost->kamp_id = $parcela->kamp_id;
                    $dostupnost->parcela_id = $parcela->parcela_id;
                    if ($json_content->AvailableFrom === "-") {
                        $dostupnost->datum_od = null;
                    } else {
                        $dostupnost->datum_od = $json_content->AvailableFrom;
                    }
                    if ($json_content->AvailableUntil === "-") {
                        $dostupnost->datum_do = null;
                    } else {
                        $dostupnost->datum_do = $json_content->AvailableUntil;
                    }
                    $dostupnost->dostupnost_status = $json_content->AvailabilityStatus;
                    $dostupnost->opis = $json_content->AvailabilityDescription;

                    if ($dostupnost->save()) {
                        $response->setStatusCode(201, "Created");
                        $response->setContentType('text/plain', 'UTF-8');
                        $response->setContent("Parcela($parcela->parcela_id) availability record, successfully created!");
                    } else {
                        $response->setStatusCode(500, "Internal Server Error");
                        $response->setContentType('text/plain', 'UTF-8');
                        $response->setContent("Error: Parcela($parcela->parcela_id) availability record, was not created!");
                    }

                    $response->send();
                }
            } else {
                $response->setStatusCode(404, "Not Found");
                $response->setContentType('text/plain', 'UTF-8');
                $response->setContent("Error: Parcela ($json_content->parcela_id) doesnt exist in the database");

                $response->send();
            }
        }
    }

    public function pictureAction()
    {
        if ($this->request->isPost()) {
            $response = HttpResponseManager::getResponseInstance();

            $json_content = $this->request->getJsonRawBody();

            if ($parcela = Parcela::findFirstByParcelaId($json_content->ParcelaID)) {
                $slika = new Slika();

                $slika->path = $json_content->ImagePath;
                $slika->parcela_id = $parcela->parcela_id;

                if ($slika->save()) {
                    $response->setStatusCode(201, "Created");
                    $response->setContentType('text/plain', 'UTF-8');
                    $response->setContent("Slika for parcela($parcela->sifra_parcele) successfully added!");
                } else {
                    $response->setStatusCode(500, "Internal Server Error");
                    $response->setContentType('text/plain', 'UTF-8');
                    $response->setContent("Error: Slika for parcela($parcela->sifra_parcele) was not added!");
                }
                $response->send();
            } else {
                $response->setStatusCode(404, "Not Found");
                $response->setContentType('text/plain', 'UTF-8');
                $response->setContent("Error: Parcela ($json_content->ParcelaCode) doesnt exist in the database");

                $response->send();
            }
        }
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
                    if ($kamp = Kamp::findFirst(
                        array(
                            'conditions' => 'grad_id = ?1 AND kamp_ime = ?2',
                            'bind' => array(
                                1 => $grad->grad_id,
                                2 => $json_content->CampName
                            )
                        )
                    )) {
                        $parcela = new Parcela();

                        $parcela->sifra_parcele = $json_content->ParcelaCode;
                        $parcela->struja = $json_content->Electricity;
                        $parcela->voda = $json_content->Water;
                        $parcela->cijena_nocenja = $json_content->PricePerNight;
                        $parcela->opis = $json_content->Description;
                        $parcela->kamp_id = $kamp->kamp_id;

                        try {
                            $parcela->save();
                            $kamp->broj_parcela++;
                            $kamp->update();
                            $response->setStatusCode(200, "OK");
                            $response->setContentType('text/plain', 'UTF-8');
                            $response->setContent("New Parcela (ParcelaCode: $parcela->sifra_parcele) successfully added!");
                        } catch (Exception $e) {
                            $response->setStatusCode(409, "Conflict");
                            $response->setContentType('text/plain', 'UTF-8');
                            $response->setContent("Error: " . $e->getMessage());
                        }

                        $response->send();
                        return;
                    } else {
                        $error_in = "Kamp";
                    }
                } else {
                    $error_in = "Grad";
                }
            } else {
                $error_in = "Country";
            }

            $response->setStatusCode(404, "Not Found");
            $response->setContentType('text/plain', 'UTF-8');
            $response->setContent("Error: $error_in not found in the database!");
            $response->send();
        }
    }
}


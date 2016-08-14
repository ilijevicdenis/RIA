<?php

class SearchController extends ControllerBase
{

    public function indexAction()
    {
        $data_to_send = array();
        $response = HttpResponseManager::getResponseInstance();

        if ($camps = Kamp::find()) {
            $i = 0;
            foreach ($camps as $one_camp) {
                $all_parcele_data = array();

                if ($parcele_u_kampu = Parcela::find("kamp_id = $one_camp->kamp_id")) {
                    $test_1 = $parcele_u_kampu->toArray();
                    if (!empty($test_1)) {
                        foreach ($parcele_u_kampu as $one_parcela) {
                            $all_parcela_pictures = array();

                            if ($slike_parcele = Slika::find("parcela_id = $one_parcela->parcela_id")) {
                                $test_2 = $slike_parcele->toArray();
                                if (!empty($test_2)) {
                                    foreach ($slike_parcele as $one_slika) {
                                        $all_parcela_pictures[] = array(
                                            "ParcelaPictureUrl" => $one_slika->path
                                        );
                                    }
                                } else {
                                    $all_parcela_pictures = '-';
                                }
                            }

                            $all_parcele_data[] = array(
                                "ParcelaCode" => $one_parcela->sifra_parcele,
                                "Electricity" => $one_parcela->struja,
                                "Water" => $one_parcela->voda,
                                "PricePerNight" => $one_parcela->cijena_nocenja,
                                "ParcelaDescription" => $one_parcela->opis,
                                "ParcelaPictures" => $all_parcela_pictures
                            );
                        }
                    } else {
                        $all_parcele_data = '-';
                    }
                }

                $data_to_send[] = array(
                    "ID" => $i++,
                    "Camp" => $one_camp->kamp_ime,
                    "CampDescription" => $one_camp->opis_kampa,
                    "Country" => $one_camp->Grad->Drzava->naziv,
                    "City" => $one_camp->Grad->grad_ime,
                    "Address" => $one_camp->adresa,
                    "Parcele" => $all_parcele_data,
                );
            }

            $response->setStatusCode(200, "OK");
            $content = new DataType();
            $content->setStrategy(new JSONStrategy());
            $content->get_coded_data($data_to_send);
        } else {
            $response->setStatusCode(404, "Not Found");
            $response->setContentType('text/plain', 'UTF-8');
            $response->setContent("Error: No kamps found!");
        }

        $response->send();
    }

    public function campsAction($drzava_name, $grad_name)
    {
        $response = HttpResponseManager::getResponseInstance();

        if ($drzava = Drzava::findFirstByNaziv($drzava_name)) {
            if (Grad::findFirstByGradIme($grad_name)) {
                $grad = Grad::findFirst(
                    array(
                        'conditions' => 'drzava_id = ?1 AND grad_ime = ?2',
                        'bind' => array(
                            1 => $drzava->drzava_id,
                            2 => $grad_name
                        )
                    )
                );

                $kampovi_u_gradu = Kamp::find(
                    array(
                        'conditions' => 'grad_id = ?1',
                        'bind' => array(
                            1 => $grad->grad_id,
                        )
                    )
                );
                $kampovi_u_gradu = $kampovi_u_gradu->toArray();

                $response->setStatusCode(200, "OK");
                $content = new DataType();
                $content->setStrategy(new JSONStrategy());
                $content->get_coded_data($kampovi_u_gradu);
            } else {
                $response->setStatusCode(404, "Not Found");
                $response->setContentType('text/plain', 'UTF-8');
                $response->setContent("City is not in the database!");
            }
        } else {
            $response->setStatusCode(404, "Not Found");
            $response->setContentType('text/plain', 'UTF-8');
            $response->setContent("Country is not in the database!");
        }

        $response->send();
    }

}


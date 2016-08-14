<?php

class UserController extends ControllerBase
{

    public function indexAction()
    {

    }

    public function registerAction()
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
                    if ($tip_osobe = TipOsobe::findFirstByTip($json_content->TipOsobe)) {
                        $tip = $tip_osobe->tip_id;
                    } else {
                        $tip = 1; // Registrirani korisnik
                    }

                    $user = new Osoba();

                    $user->ime = $json_content->FirstName;
                    $user->prezime = $json_content->LastName;
                    $user->adresa = $json_content->Address;
                    $user->kontakt_broj = $json_content->ContactNumber;
                    $user->email = $json_content->Email;
                    $user->password = sha1($json_content->Password);
                    $user->grad_id = $grad->grad_id;
                    $user->tip_id = $tip;
                    $user->username = $json_content->Username;

                    try {
                        $user->save();
                        $response->setStatusCode(200, "OK");
                        $response->setContentType('text/plain', 'UTF-8');
                        $response->setContent("New User (name: $user->username) successfully added!");
                    } catch (Exception $e) {
                        $response->setStatusCode(500, "Internal Server Error");
                        $response->setContentType('text/plain', 'UTF-8');
                        $response->setContent("Error: " . $e->getMessage());
                    }

                    $response->send();
                    return;
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


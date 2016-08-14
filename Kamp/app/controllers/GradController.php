<?php

class GradController extends ControllerBase
{

    public function indexAction()
    {

    }

    public function listAction($drzava_name)
    {
        $response = HttpResponseManager::getResponseInstance();

        if ($drzava = Drzava::findFirstByNaziv($drzava_name)) {
            $gradovi = Grad::find("drzava_id = $drzava->drzava_id");
            $gradovi = $gradovi->toArray();
            $response->setStatusCode(200, "OK");
            $content = new DataType();
            $content->setStrategy(new JSONStrategy());
            $content->get_coded_data($gradovi);
        } else {
            $response->setStatusCode(404, "Not Found");
            $response->setContentType('text/plain', 'UTF-8');
            $response->setContent("Country is not in the database!");
        }

        $response->send();
    }

    public function addAction()
    {
        if ($this->request->isPost()) {
            $response = HttpResponseManager::getResponseInstance();

            $json_content = $this->request->getJsonRawBody();

            if ($drzava = Drzava::findFirstByNaziv($json_content->Country)) {
                if ($grad_exits = Grad::findFirst(
                    array(
                        'conditions' => 'drzava_id = ?1 AND grad_ime = ?2',
                        'bind' => array(
                            1 => $drzava->drzava_id,
                            2 => $json_content->City
                        )
                    )
                )) {
                    $response->setStatusCode(409, "Conflict");
                    $response->setContentType('text/plain', 'UTF-8');
                    $response->setContent("Error: City: $grad_exits->grad_ime in the country: $drzava->naziv, already exists!");

                    $response->send();
                    return;
                } else {
                    $grad = new Grad();

                    $grad->grad_ime = $json_content->City;
                    $grad->postanski_broj = $json_content->ZipCode;
                    $grad->drzava_id = $drzava->drzava_id;

                    try {
                        $grad->save();
                        $response->setStatusCode(200, "OK");
                        $response->setContentType('text/plain', 'UTF-8');
                        $response->setContent("New Grad (name: $grad->grad_ime) successfully added!");
                    } catch (Exception $e) {
                        $response->setStatusCode(500, "Internal Server Error");
                        $response->setContentType('text/plain', 'UTF-8');
                        $response->setContent("Error: " . $e->getMessage());
                    }

                    $response->send();
                    return;
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

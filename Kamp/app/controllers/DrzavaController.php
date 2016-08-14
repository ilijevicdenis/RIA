<?php

class DrzavaController extends ControllerBase
{

    public function indexAction()
    {
        //$red = new RedisCache("192.168.111.128", 6379, "", false, 3600);
        $drzave = Drzava::find();
        $drzave = $drzave->toArray();

      //  if(!$red->AlreadyCached("Countries"))
        //     $red->StoreData("Countries", json_encode($drzave));

        $response = HttpResponseManager::getResponseInstance();
        $response->setStatusCode(200, "OK");
        $content = new DataType();
        $content->setStrategy(new JSONStrategy());
        $content->get_coded_data($drzave);
        $response->send();
    }

    public function addAction()
    {
        if ($this->request->isPost()) {
            $json_content = $this->request->getJsonRawBody();

            $drzava = new Drzava();
            $drzava->naziv = $json_content->CountryName;

            $response = HttpResponseManager::getResponseInstance();

            if ($drzava->findFirstByNaziv($drzava->naziv)) {
                $response->setStatusCode(409, "Conflict");
                $response->setContentType('text/plain', 'UTF-8');
                $response->setContent("Country already exists in the database!");
            } else {
                if ($drzava->save()) {
                    $response->setStatusCode(200, "OK");
                    $response->setContentType('text/plain', 'UTF-8');
                    $response->setContent("New country added successfully!");
                }
            }
            $response->send();
        }
    }
}
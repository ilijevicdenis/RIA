<?php

class BookingController extends ControllerBase
{

    public function indexAction()
    {

    }

    public function listAction()
    {
        $response = HttpResponseManager::getResponseInstance();

        if ($all_bookings = Gostovanje::find()) {
            $all_bookings_array = array();
            foreach ($all_bookings as $booking) {
                if ($booking->datum_dolaska === null) {
                    $booking->datum_dolaska = '-';
                }

                if ($booking->datum_odlaska === null) {
                    $booking->datum_odlaska = '-';
                }

                $all_bookings_array[] = array(
                    'no' => $booking->gostovanje_id,
                    'fname' => $booking->Osoba->ime,
                    'lname' => $booking->Osoba->prezime,
                    'email' => $booking->Osoba->email,
                    'rsrdate' => $booking->datum_rezervacije,
                    'ardate' => $booking->datum_dolaska,
                    'dpdate' => $booking->datum_odlaska,
                    'camp' => $booking->Parcela->Kamp->kamp_ime,
                    'state' => $booking->Parcela->Kamp->Grad->Drzava->naziv,
                    'parcela' => $booking->parcela_id
                );
            }

            $response->setStatusCode(200, "OK");
            $content = new DataType();
            $content->setStrategy(new JSONStrategy());
            $content->get_coded_data($all_bookings_array);
        } else {
            $response->setStatusCode(404, "Not Found");
            $response->setContentType('text/plain', 'UTF-8');
            $response->setContent("No booking records found in the database!");
        }

        $response->send();
    }

}


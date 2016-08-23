-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Aug 23, 2016 at 06:58 PM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 5.6.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kampbase2`
--

-- --------------------------------------------------------

--
-- Table structure for table `dostupnost`
--

CREATE TABLE `dostupnost` (
  `dostupnost_id` int(11) NOT NULL,
  `kamp_id` int(11) NOT NULL,
  `parcela_id` int(11) NOT NULL,
  `dostupnost_status` varchar(11) NOT NULL,
  `opis` varchar(100) NOT NULL,
  `datum_od` date DEFAULT NULL,
  `datum_do` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `dostupnost`
--

INSERT INTO `dostupnost` (`dostupnost_id`, `kamp_id`, `parcela_id`, `dostupnost_status`, `opis`, `datum_od`, `datum_do`) VALUES
(2, 1, 1, 'Nedostupno', 'Rezervirano', '2016-11-01', '2016-11-15'),
(9, 1, 2, 'Nedostupno', 'Rezervirano', '2016-06-22', '2016-08-30'),
(11, 1, 10, 'Occupied', 'Radovi na kanalizaciji', '0000-00-00', '0000-00-00'),
(12, 1, 10, 'Occupied', 'Radovi na kanalizaciji', '2016-08-03', '2016-08-25'),
(13, 3, 3, 'Occupied', 'User reservation', '2016-08-17', '2016-08-25');

-- --------------------------------------------------------

--
-- Table structure for table `drzava`
--

CREATE TABLE `drzava` (
  `drzava_id` int(11) NOT NULL,
  `naziv` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `drzava`
--

INSERT INTO `drzava` (`drzava_id`, `naziv`) VALUES
(1, 'Croatia'),
(2, 'Bosnia and Herzegovina'),
(3, 'England'),
(4, 'Slovenia'),
(5, 'Austria'),
(6, 'Germany'),
(10, 'Uzbekistan'),
(12, 'Russia'),
(13, 'India'),
(14, 'Siberia'),
(15, 'France'),
(17, 'Trinidad'),
(18, 'Tobago'),
(19, 'Xy'),
(20, 'Testna drÅ¾ava');

-- --------------------------------------------------------

--
-- Table structure for table `gostovanje`
--

CREATE TABLE `gostovanje` (
  `gostovanje_id` int(11) NOT NULL,
  `osoba_id` int(11) NOT NULL,
  `datum_rezervacije` date NOT NULL,
  `datum_dolaska` date DEFAULT NULL,
  `datum_odlaska` date DEFAULT NULL,
  `parcela_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `gostovanje`
--

INSERT INTO `gostovanje` (`gostovanje_id`, `osoba_id`, `datum_rezervacije`, `datum_dolaska`, `datum_odlaska`, `parcela_id`) VALUES
(1, 2, '2016-08-22', '2016-11-01', '2016-11-15', 1),
(4, 2, '2016-08-09', '2016-06-22', '2016-06-30', 2),
(5, 13, '2016-08-22', '2016-08-17', '2016-08-25', 3);

-- --------------------------------------------------------

--
-- Table structure for table `grad`
--

CREATE TABLE `grad` (
  `grad_id` int(11) NOT NULL,
  `grad_ime` varchar(50) NOT NULL,
  `postanski_broj` varchar(20) NOT NULL,
  `drzava_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `grad`
--

INSERT INTO `grad` (`grad_id`, `grad_ime`, `postanski_broj`, `drzava_id`) VALUES
(1, 'Sarajevo', '71000', 2),
(2, 'Rijeka', '51000', 1),
(3, 'Zagreb', '10000', 1),
(5, 'Pula', '52100', 1),
(6, 'Dubrovnik', '20000', 1),
(7, 'Tuzla', '75000', 2),
(8, 'Mostar', '88000', 2),
(9, 'Banja Luka', '78000', 2),
(10, 'Hamburg', '20001', 6),
(11, 'Dresden', '01067', 6),
(12, 'Berlin', '10115', 6),
(13, 'Dortmund', '44135', 6),
(14, 'LJubljana', '1504', 4),
(15, 'London', 'W11 2BQ', 3),
(16, 'Liverpool', '2170', 3),
(17, 'Salzburg', '5020', 5),
(19, 'Lovran', '51415', 1),
(20, 'tes', '123456', 1),
(21, 'Tesni grad', '123456', 20);

-- --------------------------------------------------------

--
-- Table structure for table `kamp`
--

CREATE TABLE `kamp` (
  `kamp_id` int(11) NOT NULL,
  `kamp_ime` varchar(50) NOT NULL,
  `adresa` varchar(50) NOT NULL,
  `grad_id` int(11) NOT NULL,
  `broj_parcela` int(11) NOT NULL,
  `opis_kampa` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `kamp`
--

INSERT INTO `kamp` (`kamp_id`, `kamp_ime`, `adresa`, `grad_id`, `broj_parcela`, `opis_kampa`) VALUES
(1, 'Kamp Fun', 'Tlaka, 4', 5, 57, 'Ovo je neki opis kampa. Tu imas drvo. Evo i ovdje jos jedno, i tako to.'),
(2, 'Vjeverica', 'Nesto, 2', 5, 30, 'Neki drugi kamp. I tu ima par drva, i more i tako to.'),
(3, 'YoKamp', 'Asjd, 4', 2, 30, 'BNASJHbdahbsd\r\nahsnjdansjdnaasda'),
(4, 'YoKamp Second', 'Some radnom, 1', 2, 5, 'Generic camp desc for new kamp'),
(5, 'zoo kamp', 'Test', 2, 45, 'test'),
(6, 'Moj kamp', 'test', 1, 25, 'Bosna kamp');

-- --------------------------------------------------------

--
-- Table structure for table `osoba`
--

CREATE TABLE `osoba` (
  `osoba_id` int(11) NOT NULL,
  `ime` varchar(50) NOT NULL,
  `prezime` varchar(50) NOT NULL,
  `adresa` varchar(100) NOT NULL,
  `kontakt_broj` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` char(40) NOT NULL,
  `grad_id` int(11) NOT NULL,
  `tip_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `osoba`
--

INSERT INTO `osoba` (`osoba_id`, `ime`, `prezime`, `adresa`, `kontakt_broj`, `email`, `password`, `grad_id`, `tip_id`) VALUES
(1, 'Pero', 'Peric', 'Neka fake adresa, 3', '12 123 4566', 'pero@example.org', 'PeroPeric', 6, 1),
(2, 'Fata', 'Mujic', 'Vukovarska ulica, 6', '123456', 'matic@example.org', 'af1b749415118bb2a5122ea95c6e1cbb379f533a', 6, 1),
(3, 'John', 'Doe', 'Some address, 8b', '12 345 6787', 'doe@mail.com', 'b9921b6ebaac9174f01ea9e2fe3df9f95010410b', 15, 1),
(4, 'Shime', 'Shimic', 'Bla bla, 10', '123 123 3456', 'shime@shimic.org', 'ef6aa893585c0d90703a92e9f035d6c79ecc408d', 12, 2),
(5, 'TestIme', 'TestPrezime', 'Ul. Senjskih uskoka, 2', '123 555 4444', 'test@example.org', 'TestImeTestPrezime', 2, 1),
(9, 'Josip', 'Pavic', 'Vodovodna, 25', '123 567 086', 'josip.pavic@example.com', 'cf57049f147dea7712d02378739fe0dcdf39c1bc', 5, 1),
(10, 'test', 'test', '123', '123', 'jou@ju.com', 'd326808e03f5db3764c0e08e0b06dac41fc954db', 2, 1),
(11, 'testDenis', 'test', 'test@test.org', '123456', 'test@test.org', 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3', 16, 1),
(12, 'testDenis123456', 'test', 'test@test.org', '123456', 'test@tes00001t.org', 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3', 1, 1),
(13, 'zana', 'zanic', 'Titova Riva 1', '123456789', 'zana@sfrj.yu', '99875401d16283b911c70b1ddbc25ac40836367f', 19, 1),
(14, 'Denis', 'Ilijevic', 'Majne strase 1', '123456', 'denis@ria.it', 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3', 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `parcela`
--

CREATE TABLE `parcela` (
  `parcela_id` int(11) NOT NULL,
  `sifra_parcele` int(11) NOT NULL,
  `kamp_id` int(11) NOT NULL,
  `struja` char(2) NOT NULL,
  `voda` char(2) NOT NULL,
  `cijena_nocenja` decimal(8,2) NOT NULL,
  `opis` mediumtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `parcela`
--

INSERT INTO `parcela` (`parcela_id`, `sifra_parcele`, `kamp_id`, `struja`, `voda`, `cijena_nocenja`, `opis`) VALUES
(1, 34509, 1, 'da', 'da', '1125.34', 'Neka parcela, koja ima neke dimenzije i nesto trave, i koje drvo.'),
(2, 62342, 1, 'ne', 'ne', '50.78', ''),
(3, 63547, 3, 'ne', 'da', '456.30', 'asjdnajksdnaweasd'),
(4, 74511, 2, 'da', 'da', '788.05', 'YEEEEEEnsjdanksd\r\n'),
(5, 84115, 1, 'da', 'ne', '238.34', 'Ovo je opis novododane parcele'),
(9, 83115, 3, 'ne', 'ne', '500.34', 'Ovo je opis novododane parcele neke druge'),
(10, 84115, 1, 'da', 'ne', '238.34', 'Ovo je opis novododane parcele'),
(11, 123, 3, 'Ye', 'Ye', '123.00', '123'),
(12, 123456789, 6, 'Ye', 'No', '4123.00', 'dasdasfasda');

-- --------------------------------------------------------

--
-- Table structure for table `placanje`
--

CREATE TABLE `placanje` (
  `placanje_id` int(11) NOT NULL,
  `gostovanje_id` int(11) NOT NULL,
  `nocenja` int(11) DEFAULT NULL,
  `cijena_nocenja` decimal(8,2) DEFAULT NULL,
  `porez` decimal(8,2) DEFAULT NULL,
  `ukupno` decimal(8,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `placanje`
--

INSERT INTO `placanje` (`placanje_id`, `gostovanje_id`, `nocenja`, `cijena_nocenja`, `porez`, `ukupno`) VALUES
(1, 1, 15, '16880.10', '25.00', '21100.13'),
(2, 4, 9, '457.02', '23.00', '562.13'),
(3, 5, 9, '4106.70', '25.00', '5133.38');

-- --------------------------------------------------------

--
-- Table structure for table `slika`
--

CREATE TABLE `slika` (
  `slika_id` int(11) NOT NULL,
  `parcela_id` int(11) NOT NULL,
  `path` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `slika`
--

INSERT INTO `slika` (`slika_id`, `parcela_id`, `path`) VALUES
(1, 1, 'http://example.com/Picture11.jpg'),
(2, 4, 'http://example.com/Picture41.jpg'),
(3, 1, 'http://example.com/Picture12.jpg'),
(4, 1, 'http://example.com/Picture13.jpg'),
(5, 2, 'http://example.com/Picture22.jpg'),
(6, 3, 'http://lalal/a.jpg'),
(7, 3, 'http://lalal/a3.jpg'),
(8, 5, 'slika.com');

-- --------------------------------------------------------

--
-- Table structure for table `tip_osobe`
--

CREATE TABLE `tip_osobe` (
  `tip_id` int(11) NOT NULL,
  `tip` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tip_osobe`
--

INSERT INTO `tip_osobe` (`tip_id`, `tip`) VALUES
(1, 'Korisnik'),
(2, 'Administrator'),
(3, 'Gost');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dostupnost`
--
ALTER TABLE `dostupnost`
  ADD PRIMARY KEY (`dostupnost_id`),
  ADD KEY `kamp_id` (`kamp_id`,`parcela_id`),
  ADD KEY `parcela_fk_d` (`parcela_id`);

--
-- Indexes for table `drzava`
--
ALTER TABLE `drzava`
  ADD PRIMARY KEY (`drzava_id`);

--
-- Indexes for table `gostovanje`
--
ALTER TABLE `gostovanje`
  ADD PRIMARY KEY (`gostovanje_id`),
  ADD KEY `parcela_id` (`parcela_id`),
  ADD KEY `osoba_id` (`osoba_id`);

--
-- Indexes for table `grad`
--
ALTER TABLE `grad`
  ADD PRIMARY KEY (`grad_id`),
  ADD UNIQUE KEY `grad_ime_postanski_broj_UQ` (`grad_ime`,`postanski_broj`),
  ADD KEY `drzava_id` (`drzava_id`);

--
-- Indexes for table `kamp`
--
ALTER TABLE `kamp`
  ADD PRIMARY KEY (`kamp_id`),
  ADD KEY `grad_id` (`grad_id`);

--
-- Indexes for table `osoba`
--
ALTER TABLE `osoba`
  ADD PRIMARY KEY (`osoba_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `grad_id` (`grad_id`),
  ADD KEY `tip_id` (`tip_id`),
  ADD KEY `grad_id_2` (`grad_id`);

--
-- Indexes for table `parcela`
--
ALTER TABLE `parcela`
  ADD PRIMARY KEY (`parcela_id`),
  ADD KEY `kamp_id` (`kamp_id`),
  ADD KEY `sifra_parcele_2` (`sifra_parcele`),
  ADD KEY `sifra_parcele_3` (`sifra_parcele`),
  ADD KEY `sifra_parcele_4` (`sifra_parcele`);

--
-- Indexes for table `placanje`
--
ALTER TABLE `placanje`
  ADD PRIMARY KEY (`placanje_id`),
  ADD KEY `gostovanje_id` (`gostovanje_id`);

--
-- Indexes for table `slika`
--
ALTER TABLE `slika`
  ADD PRIMARY KEY (`slika_id`),
  ADD KEY `parcela_id` (`parcela_id`);

--
-- Indexes for table `tip_osobe`
--
ALTER TABLE `tip_osobe`
  ADD PRIMARY KEY (`tip_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dostupnost`
--
ALTER TABLE `dostupnost`
  MODIFY `dostupnost_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `drzava`
--
ALTER TABLE `drzava`
  MODIFY `drzava_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `gostovanje`
--
ALTER TABLE `gostovanje`
  MODIFY `gostovanje_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `grad`
--
ALTER TABLE `grad`
  MODIFY `grad_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT for table `kamp`
--
ALTER TABLE `kamp`
  MODIFY `kamp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `osoba`
--
ALTER TABLE `osoba`
  MODIFY `osoba_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `parcela`
--
ALTER TABLE `parcela`
  MODIFY `parcela_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `placanje`
--
ALTER TABLE `placanje`
  MODIFY `placanje_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `slika`
--
ALTER TABLE `slika`
  MODIFY `slika_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `tip_osobe`
--
ALTER TABLE `tip_osobe`
  MODIFY `tip_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `dostupnost`
--
ALTER TABLE `dostupnost`
  ADD CONSTRAINT `kamp_fk_d` FOREIGN KEY (`kamp_id`) REFERENCES `kamp` (`kamp_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `parcela_fk_d` FOREIGN KEY (`parcela_id`) REFERENCES `parcela` (`parcela_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `gostovanje`
--
ALTER TABLE `gostovanje`
  ADD CONSTRAINT `fk_osoba_dolazak_odlazak` FOREIGN KEY (`osoba_id`) REFERENCES `osoba` (`osoba_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_parcela_dolazak_odlazak` FOREIGN KEY (`parcela_id`) REFERENCES `parcela` (`parcela_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `grad`
--
ALTER TABLE `grad`
  ADD CONSTRAINT `drzava_fk` FOREIGN KEY (`drzava_id`) REFERENCES `drzava` (`drzava_id`);

--
-- Constraints for table `kamp`
--
ALTER TABLE `kamp`
  ADD CONSTRAINT `grad_kamp_fk` FOREIGN KEY (`grad_id`) REFERENCES `grad` (`grad_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `osoba`
--
ALTER TABLE `osoba`
  ADD CONSTRAINT `grad_fk` FOREIGN KEY (`grad_id`) REFERENCES `grad` (`grad_id`),
  ADD CONSTRAINT `tip_id_fk` FOREIGN KEY (`tip_id`) REFERENCES `tip_osobe` (`tip_id`);

--
-- Constraints for table `parcela`
--
ALTER TABLE `parcela`
  ADD CONSTRAINT `kamp_fk` FOREIGN KEY (`kamp_id`) REFERENCES `kamp` (`kamp_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `placanje`
--
ALTER TABLE `placanje`
  ADD CONSTRAINT `trans_id_fk_pk` FOREIGN KEY (`gostovanje_id`) REFERENCES `gostovanje` (`gostovanje_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `slika`
--
ALTER TABLE `slika`
  ADD CONSTRAINT `fk_slika_parcela` FOREIGN KEY (`parcela_id`) REFERENCES `parcela` (`parcela_id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

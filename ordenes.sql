-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 18, 2017 at 01:26 AM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 5.6.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `testcfd`
--

-- --------------------------------------------------------

--
-- Table structure for table `ordenes`
--

CREATE TABLE `ordenes` (
  `nro_prueba` int(11) NOT NULL,
  `ini` int(11) NOT NULL,
  `origen` varchar(1) COLLATE utf8_spanish2_ci NOT NULL,
  `tipo` varchar(1) COLLATE utf8_spanish2_ci NOT NULL,
  `cierrePost` varchar(5) COLLATE utf8_spanish2_ci NOT NULL,
  `open` decimal(10,10) NOT NULL,
  `fecha` varchar(10) COLLATE utf8_spanish2_ci NOT NULL,
  `min` decimal(10,5) NOT NULL,
  `max` decimal(10,5) NOT NULL,
  `prop` decimal(10,5) NOT NULL,
  `bb` decimal(10,5) NOT NULL,
  `distanciaBB` decimal(10,5) NOT NULL,
  `atr` decimal(10,5) NOT NULL,
  `stopLossIni` int(11) NOT NULL,
  `dia` varchar(5) COLLATE utf8_spanish2_ci NOT NULL,
  `total` decimal(10,5) NOT NULL,
  `volumen` int(11) NOT NULL,
  `tam` decimal(10,5) NOT NULL,
  `tamReal` decimal(10,5) NOT NULL,
  `tamProm` decimal(10,5) NOT NULL,
  `volProm` decimal(10,5) NOT NULL,
  `hora` varchar(10) COLLATE utf8_spanish2_ci NOT NULL,
  `close` decimal(10,5) NOT NULL,
  `volSig` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;
COMMIT;

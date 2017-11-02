-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-11-2017 a las 05:21:22
-- Versión del servidor: 5.6.21
-- Versión de PHP: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de datos: `analisis`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ordenes`
--

CREATE TABLE IF NOT EXISTS `ordenes` (
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
  `hora` varchar(10) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  mer. 28 oct. 2020 à 18:09
-- Version du serveur :  8.0.18
-- Version de PHP :  7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `ShoppingFood`
--

-- --------------------------------------------------------

--
-- Structure de la table `T_House_HSE`
--

DROP TABLE IF EXISTS `T_House_HSE`;
CREATE TABLE IF NOT EXISTS `T_House_HSE` (
  `HSE_Id` int(255) NOT NULL AUTO_INCREMENT,
  `HSE_Name` varchar(45) NOT NULL,
  `HSE_Address` varchar(100) NOT NULL,
  PRIMARY KEY (`HSE_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `T_House_HSE`
--

INSERT INTO `T_House_HSE` (`HSE_Id`, `HSE_Name`, `HSE_Address`) VALUES
(1, 'DrHouse', '21 rue des abyss');

-- --------------------------------------------------------

--
-- Structure de la table `T_Stock_STK`
--

DROP TABLE IF EXISTS `T_Stock_STK`;
CREATE TABLE IF NOT EXISTS `T_Stock_STK` (
  `PDC_Id` int(255) NOT NULL,
  `STK_Qty` int(255) NOT NULL,
  `ROM_Id` int(255) NOT NULL,
  `HSE_Id` int(255) NOT NULL,
  PRIMARY KEY (`PDC_Id`,`ROM_Id`,`HSE_Id`),
  KEY `fk_Products_has_Room_Room1_idx` (`ROM_Id`,`HSE_Id`),
  KEY `fk_Products_has_Room_Products1_idx` (`PDC_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `T_Product_PDC`
--

DROP TABLE IF EXISTS `T_Product_PDC`;
CREATE TABLE IF NOT EXISTS `T_Product_PDC` (
  `PDC_Id` int(255) NOT NULL AUTO_INCREMENT,
  `PDC_Name` varchar(45) NOT NULL,
  `PDC_Price` int(100) NOT NULL,
  `PDC_Description` varchar(100) NOT NULL,
  `PDC_Link` longtext NOT NULL,
  PRIMARY KEY (`PDC_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `T_Room_ROM`
--

DROP TABLE IF EXISTS `T_Room_ROM`;
CREATE TABLE IF NOT EXISTS `T_Room_ROM` (
  `ROM_Id` int(255) NOT NULL AUTO_INCREMENT,
  `ROM_Name` varchar(45) NOT NULL,
  `ROM_Category` varchar(45) NOT NULL,
  `ROM_Image` varchar(45) NOT NULL,
  `HSE_Id` int(255) NOT NULL,
  PRIMARY KEY (`ROM_Id`,`HSE_Id`),
  KEY `fk_Room_house1_idx` (`HSE_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `T_User_USR`
--

DROP TABLE IF EXISTS `T_User_USR`;
CREATE TABLE IF NOT EXISTS `T_User_USR` (
  `USR_Id` int(255) NOT NULL AUTO_INCREMENT,
  `USR_Firstname` varchar(45) NOT NULL,
  `USR_Mail` varchar(255) NOT NULL,
  `USR_Password` varchar(45) NOT NULL,
  `HSE_Id` int(255) NOT NULL DEFAULT '1',
  PRIMARY KEY (`USR_Id`,`HSE_Id`),
  KEY `fk_user_house1_idx` (`HSE_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `T_User_USR`
--

INSERT INTO `T_User_USR` (`USR_Id`, `HSE_Id`, `USR_Firstname`, `USR_Mail`, `USR_Password`) VALUES
(3, 1, 'Shreks', 'swamp@mail.fr', 'swamp');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `T_Stock_STK`
--
ALTER TABLE `T_Stock_STK`
  ADD CONSTRAINT `fk_Products_has_Room_Products1` FOREIGN KEY (`PDC_Id`) REFERENCES `T_Product_PDC` (`PDC_Id`),
  ADD CONSTRAINT `fk_Products_has_Room_Room1` FOREIGN KEY (`ROM_Id`,`HSE_Id`) REFERENCES `T_Room_ROM` (`ROM_Id`, `HSE_Id`);

--
-- Contraintes pour la table `T_Room_ROM`
--
ALTER TABLE `T_Room_ROM`
  ADD CONSTRAINT `fk_Room_house1` FOREIGN KEY (`HSE_Id`) REFERENCES `T_House_HSE` (`HSE_Id`);

--
-- Contraintes pour la table `T_User_USR`
--
ALTER TABLE `T_User_USR`
  ADD CONSTRAINT `fk_user_house1` FOREIGN KEY (`HSE_Id`) REFERENCES `T_House_HSE` (`HSE_Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

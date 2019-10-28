-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Oct 28, 2019 at 01:46 PM
-- Server version: 5.7.25
-- PHP Version: 7.3.1
SET
  SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET
  time_zone = "+00:00";
--
  -- Database: `gestionparc`
  --
  -- --------------------------------------------------------
  --
  -- Table structure for table `gerants`
  --
  CREATE TABLE `gerants` (
    `matricule` varchar(8) NOT NULL,
    `nom` varchar(255) NOT NULL,
    `prenom` varchar(255) NOT NULL,
    `fonction` varchar(255) NOT NULL DEFAULT 'Caissier'
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8;
--
  -- Dumping data for table `gerants`
  --
INSERT INTO `gerants` (`matricule`, `nom`, `prenom`, `fonction`)
VALUES
  ('001/PBZT', 'ROSALINDA', 'Ayamor', 'Caissier'),
  (
    '002/PBZT',
    'MARIMAR',
    'Costenitasony',
    'Caissier'
  );
-- --------------------------------------------------------
  --
  -- Table structure for table `nationalite`
  --
  CREATE TABLE `nationalite` (
    `code` varchar(3) NOT NULL,
    `nationalite` varchar(255) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8;
--
  -- Dumping data for table `nationalite`
  --
INSERT INTO `nationalite` (`code`, `nationalite`)
VALUES
  ('ANG', 'Anglais'),
  ('FRS', 'Français'),
  ('MLG', 'Malagasy\r\n');
-- --------------------------------------------------------
  --
  -- Table structure for table `visites`
  --
  CREATE TABLE `visites` (
    `numero_fiche` varchar(11) NOT NULL,
    `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `matricule_gerant` varchar(9) NOT NULL,
    `visiteurs` text NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8;
--
  -- Dumping data for table `visites`
  --
INSERT INTO `visites` (
    `numero_fiche`,
    `date`,
    `matricule_gerant`,
    `visiteurs`
  )
VALUES
  (
    '0001/F/1910',
    '2019-10-28 12:20:45',
    '002/PBZT',
    '00001/19;00002/19'
  );
-- --------------------------------------------------------
  --
  -- Table structure for table `visiteurs`
  --
  CREATE TABLE `visiteurs` (
    `matricule` varchar(9) NOT NULL,
    `nom` varchar(255) NOT NULL,
    `prenom` varchar(255) NOT NULL,
    `date_naissance` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `sexe` tinyint(1) NOT NULL DEFAULT '1',
    `code_nationalite` varchar(3) NOT NULL DEFAULT 'MLG'
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8;
--
  -- Dumping data for table `visiteurs`
  --
INSERT INTO `visiteurs` (
    `matricule`,
    `nom`,
    `prenom`,
    `date_naissance`,
    `sexe`,
    `code_nationalite`
  )
VALUES
  (
    '00001/19',
    'AÏLI',
    'Fida Aliotti Christino',
    '2019-10-28 11:37:00',
    1,
    'MLG'
  ),
  (
    '00002/19',
    'AÏLI',
    'Sarah Sirielle',
    '2019-10-28 11:37:39',
    0,
    'MLG'
  );
--
  -- Indexes for dumped tables
  --
  --
  -- Indexes for table `gerants`
  --
ALTER TABLE `gerants`
ADD
  PRIMARY KEY (`matricule`);
--
  -- Indexes for table `nationalite`
  --
ALTER TABLE `nationalite`
ADD
  PRIMARY KEY (`code`);
--
  -- Indexes for table `visites`
  --
ALTER TABLE `visites`
ADD
  PRIMARY KEY (`numero_fiche`),
ADD
  KEY `matricule_gerant` (`matricule_gerant`);
--
  -- Indexes for table `visiteurs`
  --
ALTER TABLE `visiteurs`
ADD
  PRIMARY KEY (`matricule`),
ADD
  KEY `code_nationalite` (`code_nationalite`);
--
  -- Constraints for dumped tables
  --
  --
  -- Constraints for table `visites`
  --
ALTER TABLE `visites`
ADD
  CONSTRAINT `visites_ibfk_1` FOREIGN KEY (`matricule_gerant`) REFERENCES `gerants` (`matricule`);
--
  -- Constraints for table `visiteurs`
  --
ALTER TABLE `visiteurs`
ADD
  CONSTRAINT `visiteurs_ibfk_1` FOREIGN KEY (`code_nationalite`) REFERENCES `nationalite` (`code`);
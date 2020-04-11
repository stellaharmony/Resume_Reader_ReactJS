-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 11, 2020 at 01:28 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `brainchange`
--

-- --------------------------------------------------------

--
-- Table structure for table `resume_data`
--

CREATE TABLE `resume_data` (
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `linkedin` varchar(100) NOT NULL,
  `no_images` int(10) NOT NULL,
  `no_text_lines` int(10) NOT NULL,
  `no_text_characters` int(100) NOT NULL,
  `font_family` varchar(100) NOT NULL,
  `font_size` int(10) NOT NULL,
  `no_tables` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `resume_data`
--

INSERT INTO `resume_data` (`name`, `email`, `phone`, `linkedin`, `no_images`, `no_text_lines`, `no_text_characters`, `font_family`, `font_size`, `no_tables`) VALUES
('Mark Diggens', 'abc@yamoo.com', '2335555446', '', 0, 3, 4, 'Anyfont', 3, 4),
('Mark Diggens', 'abc@yamoo.com', '2335555446', '', 0, 3, 4, 'Anyfont', 3, 4);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

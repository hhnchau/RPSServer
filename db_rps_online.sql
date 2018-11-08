-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 07, 2018 at 04:57 PM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_rps_online`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_chat`
--

CREATE TABLE `tbl_chat` (
  `idMessage` int(11) NOT NULL,
  `id` varchar(50) NOT NULL,
  `message` varchar(255) NOT NULL,
  `time` double DEFAULT NULL,
  `room` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_chat`
--

INSERT INTO `tbl_chat` (`idMessage`, `id`, `message`, `time`, `room`) VALUES
(96, '6efd02df2392d5a2', 'test', 1497163175131, 'Vietnam'),
(97, '23c6c167fb01614b', 'ok', 1497248836266, 'Vietnam'),
(98, '23c6c167fb01614b', 'ok', 1497248840529, 'Global'),
(99, '23c6c167fb01614b', 'test', 1497639141358, 'Global'),
(100, '23c6c167fb01614b', 'yest', 1497639520051, 'Global'),
(101, '23c6c167fb01614b', '777', 1497639950638, 'Global'),
(102, '23c6c167fb01614b', 'hjk', 1497640715558, 'Vietnam'),
(103, '23c6c167fb01614b', 'hjkaaaaaaa', 1497640743076, 'Vietnam'),
(104, '23c6c167fb01614b', '111111q', 1497649611150, 'Vietnam'),
(105, '23c6c167fb01614b', '555555', 1497652840649, 'Vietnam'),
(106, 'ee23da9b9de38dab', 'oooooo', 1497652855360, 'Vietnam'),
(107, '23c6c167fb01614b', 'msg', 1497655914501, 'VIETNAM'),
(108, '23c6c167fb01614b', 'msg', 1497655961316, 'VIETNAM'),
(109, '23c6c167fb01614b', '777788888', 1497667392268, 'Global'),
(110, '23c6c167fb01614b', '7777888887777999', 1497667401452, 'Vietnam'),
(111, '23c6c167fb01614b', '222222', 1497670078080, 'Global'),
(112, '23c6c167fb01614b', '2222228888', 1497670089594, 'Vietnam'),
(113, '23c6c167fb01614b', '54321', 1497673557613, 'Vietnam'),
(114, '23c6c167fb01614b', '6666', 1497673730954, 'Vietnam'),
(115, '23c6c167fb01614b', 'hi', 1497677137012, 'Vietnam'),
(116, 'ee23da9b9de38dab', 'bs', 1497677150381, 'Vietnam'),
(117, 'ee23da9b9de38dab', 'kkkk', 1497681116307, 'Vietnam');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_computer`
--

CREATE TABLE `tbl_computer` (
  `idComputer` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_computer`
--

INSERT INTO `tbl_computer` (`idComputer`) VALUES
('computer_1'),
('computer_2'),
('computer_3');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_login`
--

CREATE TABLE `tbl_login` (
  `idDevice` varchar(50) NOT NULL,
  `register` double NOT NULL,
  `login` double NOT NULL,
  `logout` double NOT NULL,
  `bonus` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_login`
--

INSERT INTO `tbl_login` (`idDevice`, `register`, `login`, `logout`, `bonus`) VALUES
('111111111112323', 0, 0, 0, 0),
('23c6c167fb01614b', 1497248759268, 0, 0, 1497848020377),
('6efd02df2392d5a2', 0, 0, 0, 1497159824028),
('8eb0079be625eb35', 1506157765835, 0, 0, 1506157765976),
('abcdefghi', 1496330054520, 1497056154442, 1497056154442, 1497061924804),
('ee23da9b9de38dab', 1497249701806, 0, 0, 1497720804921);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_market`
--

CREATE TABLE `tbl_market` (
  `title` varchar(50) NOT NULL,
  `des` varchar(255) NOT NULL,
  `price` smallint(6) NOT NULL,
  `value` smallint(6) NOT NULL,
  `type` int(4) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_market`
--

INSERT INTO `tbl_market` (`title`, `des`, `price`, `value`, `type`, `id`) VALUES
('Package 1', 'Include 100 life', 3, 100, 1, 1),
('Package 2', 'Include 30000', 100, 30000, 1, 2),
('Package_3', 'Test Include 500', 4, 500, 1, 3),
('Package_4', 'Include 5 Spinner', 5, 5, 2, 4);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_promotion`
--

CREATE TABLE `tbl_promotion` (
  `idDevice` varchar(50) NOT NULL,
  `type` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_reward`
--

CREATE TABLE `tbl_reward` (
  `type` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL,
  `value` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_score`
--

CREATE TABLE `tbl_score` (
  `id` varchar(50) NOT NULL,
  `win` int(11) NOT NULL,
  `lost` int(11) NOT NULL,
  `draw` int(11) NOT NULL,
  `champion` int(11) NOT NULL,
  `life` int(11) NOT NULL,
  `star` int(11) NOT NULL,
  `isChampion` bit(1) NOT NULL,
  `maxChampion` int(11) NOT NULL,
  `spin` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_score`
--

INSERT INTO `tbl_score` (`id`, `win`, `lost`, `draw`, `champion`, `life`, `star`, `isChampion`, `maxChampion`, `spin`) VALUES
('111111111112323', 0, 0, 0, 0, 0, 0, b'0', 0, 0),
('23c6c167fb01614b', 20, 5, 0, 1, 95, 0, b'1', 8, 0),
('6efd02df2392d5a2', 0, 0, 0, 0, 0, 0, b'0', 60, 0),
('8eb0079be625eb35', 4, 4, 0, 2, 96, 0, b'1', 2, 0),
('a167aa96ffa4cc94', 0, 0, 0, 0, 0, 0, b'0', 0, 0),
('abcdefghi', 73, 4, 0, 68, 20, 71, b'1', 68, 0),
('abcdefghij', 3, 6, 9, 0, 1000, 10000, b'1', 1, 0),
('abcdefghijk', 1, 2, 3, 4, 2, 4, b'1', 20, 0),
('abcdefghijklmn', 1, 2, 3, 4, 5, 6, b'1', 30, 0),
('computer_1', 1, 7, 0, 0, 0, 0, b'0', 1, 0),
('computer_2', 2, 3, 0, 1, 0, 0, b'1', 1, 0),
('computer_3', 5, 6, 0, 0, 0, 0, b'0', 2, 0),
('ee23da9b9de38dab', 10, 17, 0, 2, 13, 0, b'1', 3, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_settings`
--

CREATE TABLE `tbl_settings` (
  `version` varchar(20) NOT NULL,
  `type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_settings`
--

INSERT INTO `tbl_settings` (`version`, `type`) VALUES
('1.0', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_transaction`
--

CREATE TABLE `tbl_transaction` (
  `idDevice` varchar(50) NOT NULL,
  `type` int(4) NOT NULL,
  `date` double NOT NULL,
  `buy` int(11) NOT NULL,
  `bonus` int(11) NOT NULL,
  `win` int(11) NOT NULL,
  `tax` int(11) NOT NULL,
  `lost` int(11) NOT NULL,
  `des` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_transaction`
--

INSERT INTO `tbl_transaction` (`idDevice`, `type`, `date`, `buy`, `bonus`, `win`, `tax`, `lost`, `des`) VALUES
('abc12345', 0, 123456, 100, 0, 0, 0, 0, 'buy'),
('abc12345', 0, 123457, 30, 0, 0, 0, 0, 'bonus'),
('a167aa96ffa4cc94', 0, 0, 0, 0, 0, 0, 0, NULL),
('6efd02df2392d5a2', 0, 0, 0, 0, 0, 0, 0, NULL),
('abcdefghi', 1, 1496158645851, 300, 0, 0, 0, 0, 'BUY'),
('abcdefghi', 2, 1496159106120, 0, 300, 0, 0, 0, 'BONUS'),
('abcdefghi', 2, 1496164966084, 0, 300, 0, 0, 0, 'BONUS'),
('abcdefghi', 5, 1496329477082, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496329517105, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496330036063, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496330054520, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496331756946, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496332654745, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496333011802, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496333100083, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496293868404, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496376360342, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496377373518, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496377895851, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496424320927, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496428935902, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496432581014, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496432672442, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496432715880, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496432772757, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496432975696, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496433019872, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496437951863, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496438080114, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496438137419, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496438258056, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496438509347, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496438556506, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496438600857, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496438639693, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496438932607, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496438973970, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496439054810, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496439088763, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496646392131, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496646547478, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496646641795, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496716441131, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496717284147, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496717915200, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496717980237, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496718038839, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496718127278, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496718809577, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496726230208, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496726238418, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496726354426, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496726469266, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496726570539, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496726793422, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496726815962, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496805574121, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496805693972, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496893652432, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496893749322, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496893868748, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496894002329, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496894119833, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496894359704, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496894406532, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1496894438827, 0, 0, 0, 800, 0, 'TAX'),
('abcdefghi', 5, 1497056154442, 0, 0, 0, 800, 0, 'TAX');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `idDevice` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `address` varchar(150) NOT NULL,
  `nickName` varchar(50) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `firstName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `about` varchar(255) DEFAULT NULL,
  `session` varchar(70) DEFAULT NULL,
  `sex` bit(1) DEFAULT NULL,
  `avatar` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`idDevice`, `password`, `address`, `nickName`, `phone`, `email`, `firstName`, `lastName`, `birthday`, `about`, `session`, `sex`, `avatar`) VALUES
('111111111112323', '', 'address', 'abc12345678901222', NULL, NULL, NULL, NULL, NULL, NULL, 'b0782103d9ccafab47a53f42a2cd2951715ba013d52f1fc4f8be9a770ba37f91', NULL, NULL),
('123456', '', 'address', 'abc123456', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('23c6c167fb01614b', '', 'Vietnam', 'aaaaa', NULL, NULL, NULL, NULL, NULL, NULL, 'cb18e3a721076c6d7010da26c16b48759d79b50db4342120497e83a049cb786c', NULL, NULL),
('6efd02df2392d5a2', '123456', 'Phan Van Tri', 'Test', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('8eb0079be625eb35', '', 'Vietnam', 'HuynChau', NULL, NULL, NULL, NULL, NULL, NULL, '949b0f568052f7eee909570dc4e891c0304a8047ee2577781b087700687451e2', NULL, NULL),
('a167aa96ffa4cc94', '123456', 'Phan Tay Ho', 'Demo', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('abc12345', '', 'Phan Van Tri', 'abc12345', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ''),
('abcdefghi', '', 'Cong Hoa', 'abc123', NULL, NULL, NULL, NULL, NULL, NULL, '0e3b481d8c0c667f83e2a88fb19b35fc079200143a781f0ee9fcee1f217d98ab', NULL, ''),
('abcdefghij', '', 'Ly Thuong Kiet', 'abc1234', NULL, NULL, NULL, NULL, NULL, NULL, '0ea9c76ac681aaf7bf310f85824365555158df7af5e4afebc5c457b1cec700ce', NULL, ''),
('abcdefghijk', '', 'Che Lan Vien', 'hhnchau', NULL, NULL, NULL, NULL, NULL, NULL, 'aadb7296d7842649d9e4e8b73bc5d4bce3d07376ffbd8980eadb66f5838f10ed', NULL, 'http://hhnchau@gmail.com'),
('abcdefghijklmn', '', 'Truong Chinh', 'Test01', NULL, NULL, NULL, NULL, NULL, NULL, NULL, b'1', 'http://kingpes.info'),
('computer_1', '', 'Computer_1', 'computer_1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('computer_2', '', 'Computer_2', 'Computer_2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('computer_3', '', 'Computer_3', 'Computer_3', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('ee23da9b9de38dab', '', 'Vietnam', 'bbbbbb', NULL, NULL, NULL, NULL, NULL, NULL, '48438d1b1178398a6520952b32f0702588a8f506d0941bf3a9c76e4208825fea', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_chat`
--
ALTER TABLE `tbl_chat`
  ADD PRIMARY KEY (`idMessage`),
  ADD KEY `id_device` (`id`),
  ADD KEY `id_device_2` (`id`),
  ADD KEY `id_device_3` (`id`);

--
-- Indexes for table `tbl_computer`
--
ALTER TABLE `tbl_computer`
  ADD PRIMARY KEY (`idComputer`);

--
-- Indexes for table `tbl_login`
--
ALTER TABLE `tbl_login`
  ADD PRIMARY KEY (`idDevice`);

--
-- Indexes for table `tbl_market`
--
ALTER TABLE `tbl_market`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_promotion`
--
ALTER TABLE `tbl_promotion`
  ADD PRIMARY KEY (`idDevice`);

--
-- Indexes for table `tbl_reward`
--
ALTER TABLE `tbl_reward`
  ADD PRIMARY KEY (`type`);

--
-- Indexes for table `tbl_score`
--
ALTER TABLE `tbl_score`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_transaction`
--
ALTER TABLE `tbl_transaction`
  ADD KEY `id_device` (`idDevice`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`idDevice`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_chat`
--
ALTER TABLE `tbl_chat`
  MODIFY `idMessage` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118;
--
-- AUTO_INCREMENT for table `tbl_market`
--
ALTER TABLE `tbl_market`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_chat`
--
ALTER TABLE `tbl_chat`
  ADD CONSTRAINT `tbl_chat_ibfk_1` FOREIGN KEY (`id`) REFERENCES `tbl_user` (`idDevice`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_computer`
--
ALTER TABLE `tbl_computer`
  ADD CONSTRAINT `tbl_computer_ibfk_1` FOREIGN KEY (`idComputer`) REFERENCES `tbl_user` (`idDevice`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_login`
--
ALTER TABLE `tbl_login`
  ADD CONSTRAINT `tbl_login_ibfk_1` FOREIGN KEY (`idDevice`) REFERENCES `tbl_user` (`idDevice`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_promotion`
--
ALTER TABLE `tbl_promotion`
  ADD CONSTRAINT `tbl_promotion_ibfk_1` FOREIGN KEY (`idDevice`) REFERENCES `tbl_user` (`idDevice`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_score`
--
ALTER TABLE `tbl_score`
  ADD CONSTRAINT `tbl_score_ibfk_1` FOREIGN KEY (`id`) REFERENCES `tbl_user` (`idDevice`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_transaction`
--
ALTER TABLE `tbl_transaction`
  ADD CONSTRAINT `tbl_transaction_ibfk_1` FOREIGN KEY (`idDevice`) REFERENCES `tbl_user` (`idDevice`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

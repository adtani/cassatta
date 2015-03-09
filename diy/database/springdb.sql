-- phpMyAdmin SQL Dump
-- version 4.3.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 08, 2015 at 09:45 AM
-- Server version: 5.6.21-log
-- PHP Version: 5.5.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `springdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `salestracker_clients`
--

CREATE TABLE IF NOT EXISTS `salestracker_clients` (
  `ID` int(11) NOT NULL,
  `NAME` varchar(45) NOT NULL,
  `INDUSTRY_ID` int(11) NOT NULL,
  `REGION_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `salestracker_industries`
--

CREATE TABLE IF NOT EXISTS `salestracker_industries` (
  `ID` int(11) NOT NULL,
  `NAME` varchar(45) NOT NULL,
  `INDUSTRY_CONTACT_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `salestracker_leads`
--

CREATE TABLE IF NOT EXISTS `salestracker_leads` (
  `ID` int(11) NOT NULL,
  `USER_ID` int(11) NOT NULL,
  `CLIENT_ID` int(11) DEFAULT NULL,
  `PROSPECT_CLIENT_NAME` varchar(45) DEFAULT NULL,
  `PROSPECT_RPIC_NAME` varchar(45) DEFAULT NULL,
  `PROSPECT_IPIC_NAME` varchar(45) DEFAULT NULL,
  `PROSPECT_INDUSTRY_ID` int(11) DEFAULT NULL,
  `PROSPECT_REGION_ID` int(11) DEFAULT NULL,
  `CURRENT_REVENUES` decimal(10,0) NOT NULL,
  `POTENTIAL_REVENUES` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `salestracker_lead_actions`
--

CREATE TABLE IF NOT EXISTS `salestracker_lead_actions` (
  `ID` int(11) NOT NULL,
  `LEAD_ID` int(11) NOT NULL,
  `ACTION` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `salestracker_lead_contacts`
--

CREATE TABLE IF NOT EXISTS `salestracker_lead_contacts` (
  `ID` int(11) NOT NULL,
  `CONTACT_ID` int(11) NOT NULL,
  `LEAD_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `salestracker_regions`
--

CREATE TABLE IF NOT EXISTS `salestracker_regions` (
  `ID` int(11) NOT NULL,
  `NAME` varchar(45) NOT NULL,
  `REGIONAL_CONTACT_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `salestracker_salesusers`
--

CREATE TABLE IF NOT EXISTS `salestracker_salesusers` (
  `ID` int(11) NOT NULL,
  `FIRST_NAME` varchar(45) DEFAULT NULL,
  `LAST_NAME` varchar(45) DEFAULT NULL,
  `LOGIN` varchar(45) DEFAULT NULL,
  `PASSWORD` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `taskmgmt_taskcomments`
--

CREATE TABLE IF NOT EXISTS `taskmgmt_taskcomments` (
  `ID` int(10) unsigned NOT NULL,
  `TITLE` varchar(45) NOT NULL,
  `STATUS` varchar(45) NOT NULL DEFAULT 'CREATED',
  `TEXT` varchar(45) NOT NULL,
  `OWNER_ID` int(10) unsigned NOT NULL,
  `ASSIGNEE_ID` int(10) unsigned NOT NULL,
  `ENTITY_TYPE` varchar(45) NOT NULL,
  `CREATE_DATE` datetime DEFAULT NULL,
  `UPDATE_DATE` datetime DEFAULT NULL,
  `TASK_ID` int(10) unsigned DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=big5;

--
-- Dumping data for table `taskmgmt_taskcomments`
--

INSERT INTO `taskmgmt_taskcomments` (`ID`, `TITLE`, `STATUS`, `TEXT`, `OWNER_ID`, `ASSIGNEE_ID`, `ENTITY_TYPE`, `CREATE_DATE`, `UPDATE_DATE`, `TASK_ID`) VALUES
(1, 'comment 1 ...', 'NEW', 'comment text 1 ...', 23, 23, 'taskcomments', NULL, NULL, 125);

-- --------------------------------------------------------

--
-- Table structure for table `taskmgmt_taskfiles`
--

CREATE TABLE IF NOT EXISTS `taskmgmt_taskfiles` (
  `ID` int(10) unsigned NOT NULL,
  `NAME` varchar(45) NOT NULL,
  `PATH` varchar(500) NOT NULL DEFAULT 'CREATED',
  `TASK_ID` int(10) unsigned DEFAULT NULL,
  `ENTITY_TYPE` varchar(45) NOT NULL,
  `OWNER_ID` int(10) unsigned NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=big5;

--
-- Dumping data for table `taskmgmt_taskfiles`
--

INSERT INTO `taskmgmt_taskfiles` (`ID`, `NAME`, `PATH`, `TASK_ID`, `ENTITY_TYPE`, `OWNER_ID`) VALUES
(1, 'file 001 ...', '/1/1/1/1/2', 100, 'tasks', 23),
(2, 'file 001 ...', '/1/1/1/1/2', 100, 'tasks', 23),
(3, 'BHTP.txt', '/uploaded.files/2015/01/29/07/10/24/BHTP.txt', 129, 'taskfiles', 23),
(4, 'cartoon.ideas.TXT', '/uploaded.files/2015/01/29/07/10/46/cartoon.ideas.TXT', 129, 'taskfiles', 23),
(5, 'BHTP.txt', '/uploaded.files/2015/01/29/07/42/23/BHTP.txt', 130, 'taskfiles', 23),
(6, 'BHTP.txt', '/uploaded.files/2015/01/29/07/46/53/BHTP.txt', 131, 'taskfiles', 23),
(7, 'BHTP.txt', '/uploaded.files/2015/01/29/07/46/53/BHTP.txt', 131, 'taskfiles', 23),
(8, 'cartoon.ideas.TXT', '/uploaded.files/2015/01/29/07/50/54/cartoon.ideas.TXT', 132, 'taskfiles', 23),
(9, 'ChatLog Dynatrace Demo 2014_05_29 08_21.rtf', '/uploaded.files/2015/01/29/08/04/41/ChatLog Dynatrace Demo 2014_05_29 08_21.rtf', 132, 'taskfiles', 23),
(10, 'BHTP.txt', '/uploaded.files/2015/01/29/08/04/24/BHTP.txt', 132, 'taskfiles', 23),
(11, 'BHTP.txt', '/uploaded.files/2015/01/29/08/10/46/BHTP.txt', 133, 'taskfiles', 23),
(12, 'blank.png', '/uploaded.files/2015/01/29/16/18/28/blank.png', 149, 'taskfiles', 23),
(13, 'OpenKMLastReport.pdf', '/uploaded.files/2015/01/29/16/41/03/OpenKMLastReport.pdf', 169, 'taskfiles', 23),
(14, 'xrm.txt', '/uploaded.files/2015/01/29/17/18/41/xrm.txt', 149, 'taskfiles', 17),
(15, 'xrm.txt', '/uploaded.files/2015/01/29/17/18/41/xrm.txt', 149, 'taskfiles', 17),
(16, 'OpenKMLastReport.pdf', '/uploaded.files/2015/02/05/23/27/53/OpenKMLastReport.pdf', 174, 'taskfiles', 23),
(18, '20141102_135839.jpg', '/uploaded.files/2015/03/02/12/58/14/20141102_135839.jpg', 181, 'org.taskmgmt.taskfiles', 23),
(19, '20141102_135749.jpg', '/uploaded.files/2015/03/02/12/58/33/20141102_135749.jpg', 181, 'org.taskmgmt.taskfiles', 23),
(20, '20141102_135839.jpg', '/uploaded.files/2015/03/02/12/58/14/20141102_135839.jpg', 181, 'org.taskmgmt.taskfiles', 23),
(21, '20141102_135749.jpg', '/uploaded.files/2015/03/03/14/48/44/20141102_135749.jpg', 191, 'org.taskmgmt.taskfiles', 23),
(22, 'file 001 ...', '/1/1/1/1/2', 100, 'org.taskmgmt.tasks', 23),
(23, 'AAAAAAAAAAAAAA', 'Poster001.jpg:/uploaded.files/2015/03/06/16/57/25/Poster001.jpg', 193, 'org.taskmgmt.taskfiles', 23),
(24, 'asdasd', 'HPS Discovery Kick Off.pptx:/uploaded.files/2015/03/06/17/12/05/HPS Discovery Kick Off.pptx', 181, 'org.taskmgmt.taskfiles', 23),
(26, 'XXXXX', 'GP 2013 and Magento Info for Wipfli.xlsx:/uploaded.files/2015/03/07/11/37/14/GP 2013 and Magento Info for Wipfli.xlsx', 187, 'org.taskmgmt.taskfiles', 23),
(27, 'YYYYY', 'PDFTabularDataExtraction.mp4:/uploaded.files/2015/03/07/11/37/23/PDFTabularDataExtraction.mp4', 187, 'org.taskmgmt.taskfiles', 23),
(28, 'XXXXXXXXXX', 'PDFTabularDataExtraction.mp4:/uploaded.files/2015/03/07/11/38/40/PDFTabularDataExtraction.mp4', 154, 'org.taskmgmt.taskfiles', 23),
(29, 'YYYY', 'PDFTabularDataExtraction.mp4:/uploaded.files/2015/03/07/11/48/24/PDFTabularDataExtraction.mp4', 191, 'org.taskmgmt.taskfiles', 23),
(30, 'XXXX', 'HPS Discovery Kick Off.pptx:/uploaded.files/2015/03/07/11/48/19/HPS Discovery Kick Off.pptx', 191, 'org.taskmgmt.taskfiles', 23),
(31, 'XXXXX', 'HPS Discovery Kick Off.pptx:/uploaded.files/2015/03/07/11/49/19/HPS Discovery Kick Off.pptx', 187, 'org.taskmgmt.taskfiles', 23),
(33, 'xxxxx', 'Magento-Dynamics-GP.pdf:/uploaded.files/2015/03/07/11/53/36/Magento-Dynamics-GP.pdf', 154, 'org.taskmgmt.taskfiles', 23),
(34, 'XXXX', 'PDFTabularDataExtraction.mp4:/uploaded.files/2015/03/07/11/54/58/PDFTabularDataExtraction.mp4', 154, 'org.taskmgmt.taskfiles', 23);

-- --------------------------------------------------------

--
-- Table structure for table `taskmgmt_tasks`
--

CREATE TABLE IF NOT EXISTS `taskmgmt_tasks` (
  `ID` int(10) unsigned NOT NULL,
  `TITLE` varchar(45) NOT NULL,
  `STATUS` varchar(45) NOT NULL DEFAULT 'CREATED',
  `SUMMARY` varchar(45) NOT NULL,
  `OWNER_ID` int(10) unsigned NOT NULL,
  `ASSIGNEE_ID` int(10) unsigned NOT NULL,
  `PRIORITY` int(11) NOT NULL DEFAULT '1',
  `PARENT_ID` int(10) unsigned DEFAULT NULL,
  `ENTITY_TYPE` varchar(45) NOT NULL,
  `DUE_DATE` datetime DEFAULT NULL,
  `PARENTAGE` varchar(500) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=196 DEFAULT CHARSET=big5;

--
-- Dumping data for table `taskmgmt_tasks`
--

INSERT INTO `taskmgmt_tasks` (`ID`, `TITLE`, `STATUS`, `SUMMARY`, `OWNER_ID`, `ASSIGNEE_ID`, `PRIORITY`, `PARENT_ID`, `ENTITY_TYPE`, `DUE_DATE`, `PARENTAGE`) VALUES
(77, 'First Task', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', NULL),
(78, 'Task 1.1', 'DONE', 'New Task Summary ...', 23, 23, 0, 77, 'tasks', '2014-01-01 05:30:00', '77'),
(79, 'Task 1.2', 'DONE', 'New Task Summary ...', 23, 23, 0, 77, 'tasks', '2014-01-01 05:30:00', '77'),
(80, 'Task 1.3', 'DONE', 'New Task Summary ...', 23, 23, 0, 77, 'tasks', '2014-01-01 05:30:00', '77'),
(81, 'Task 1.4', 'DONE', 'New Task Summary ...', 23, 23, 0, 77, 'tasks', '2014-01-01 05:30:00', '77'),
(82, 'Task 1.1.1', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '77->78'),
(83, 'Task 2', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', NULL),
(84, 'Task 2.1', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '83'),
(85, 'Task 2.2', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '83->84'),
(86, 'Task 2.1.1', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '83->84->85'),
(87, 'Task 2.1.1.1', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '83->84->85  >>  86'),
(88, 'Task 1.2', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '77'),
(89, 'Task 1.2.1', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '77  >>  79'),
(90, 'Task 1.2.1.1', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '77  >>  79  >>  89'),
(91, 'My First Task', 'DONE', 'New Task Summary ...', 23, 23, 2, NULL, 'tasks', '2014-01-01 05:30:00', NULL),
(92, 'New Task Title ...1', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '91'),
(93, 'New Task Title ...2', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '91  >>  92'),
(94, 'New Task Title ...', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', NULL),
(95, 'New Task Title ...', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', NULL),
(96, 'New Task Title ...', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[96]'),
(97, 'New Task Title ...555', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[97]'),
(98, 'New Task Title ...222311', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[98]'),
(99, 'New Task Title ...333444', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[99]'),
(100, 'New Task Title ...444555', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[100]'),
(101, 'New Task Title ...555', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[101]'),
(102, 'New Task Title ...999', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[102]'),
(103, 'New Task Title ...', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[103]'),
(104, 'New Task Title ...', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[104]'),
(105, 'New Task Title ...', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[105]'),
(106, 'New Task Title ...', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[106]'),
(107, 'New Task Title ...', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[107]'),
(108, 'New Task Title ...', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[108]'),
(109, 'New Task Title ...', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[109]'),
(110, 'New Task Title ...', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[110]'),
(111, 'New Task Title ...', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[111]'),
(112, 'New Task Title ...', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[112]'),
(113, 'New Task Title ...', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[113]'),
(114, 'New Task Title ...', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[114]'),
(115, 'New Task Title ...222', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[115]'),
(116, 'New Task Title ...', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[116]'),
(117, 'New Task Title ...', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[117]'),
(118, 'New Task Title ...', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[118]'),
(119, 'New Task Title ...', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[119]'),
(120, 'New Task Title ...', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[120]'),
(121, 'task title ...', 'DONE', 'task summary ...', 23, 23, 1, NULL, 'tasks', '2014-01-29 00:00:00', '[121]'),
(122, 'task title ...', 'DONE', 'task summary ...', 23, 23, 1, NULL, 'tasks', '2014-01-29 00:00:00', '[122]'),
(123, 'New Task Title ...116', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[123]'),
(124, 'New Task Title ...', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[124]'),
(125, 'New Task Title ...', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[125]'),
(126, 'New Task Title ...', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[126]'),
(127, 'New Task Title ...', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[127]'),
(128, 'New Task Title ...', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[128]'),
(129, 'New Task Title ...', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[129]'),
(130, 'New Task Title ...', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[130]'),
(131, 'New Task Title ...55', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[131]'),
(132, 'New Task Title ...', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[132]'),
(133, 'New Task Title ...', 'DONE', 'New Task Summary ...', 23, 17, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[133]'),
(134, 'New Task Title ...', 'DONE', 'New Task Summary ...', 17, 17, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[134]'),
(135, 'New Task Title ... Task from Admin!', 'DONE', 'New Task Summary ...', 23, 17, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[135]'),
(136, 'New Task Title ...', 'DONE', 'New Task Summary ...', 17, 17, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[136]'),
(137, 'New Task Title ...', 'DONE', 'New Task Summary ...', 17, 17, 0, NULL, 'tasks', '2015-01-29 11:42:21', '[137]'),
(138, 'New Task Title ...', 'DONE', 'New Task Summary ...', 17, 17, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[138]'),
(139, 'New Task Title ...', 'DONE', 'New Task Summary ...', 17, 17, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[139]'),
(140, 'New Task Title ...', 'DONE', 'New Task Summary ...', 17, 17, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[140]'),
(141, 'New Task Title ...', 'DONE', 'New Task Summary ...', 17, 17, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[141]'),
(142, 'New Task Title ...', 'DONE', 'New Task Summary ...', 17, 17, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[142]'),
(143, 'New Task Title ...', 'DONE', 'New Task Summary ...', 17, 17, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[143]'),
(144, 'New Task Title ...', 'DONE', 'New Task Summary ...', 17, 17, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[144]'),
(145, 'New Task Title ...', 'DONE', 'New Task Summary ...', 17, 17, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[145]'),
(146, 'New Task Title ...5343', 'NEW', 'New Task Summary ...', 17, 17, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[146]'),
(147, 'New Task Title ...', 'DONE', 'New Task Summary ...', 17, 17, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[147]'),
(148, 'New Task Title ...', 'DONE', 'New Task Summary ...', 17, 17, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[148]'),
(149, 'New Task Title ...64233', 'NEW', 'New Task Summary ...', 17, 17, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[149]'),
(150, 'Task 1111', 'NEW', 'New Task Summary ...', 23, 17, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[150]'),
(151, 'New Task Title ...2', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[151]'),
(152, 'New Task Title ...2.1.1', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[152]'),
(153, 'New Task Title ...2.1.1.1', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[153]'),
(154, 'New Task Title ...234223', 'NEW', 'New Task Summary ...', 23, 23, 0, 153, 'org.taskmgmt.tasks', '2015-04-15 05:30:00', '[152]  >>  152  >>  153'),
(155, 'New Task Title ...23422', 'NEW', 'New Task Summary ...', 17, 17, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[155]'),
(156, 'New Task Title ...323r52352', 'NEW', 'New Task Summary ...', 17, 17, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[156]'),
(157, 'New Task Title ...', 'NEW', 'New Task Summary ...', 17, 17, 0, 156, 'tasks', '2014-01-01 05:30:00', '[156]  >>  156'),
(158, 'New Task Title ...', 'NEW', 'New Task Summary ...', 17, 17, 0, 156, 'tasks', '2014-01-01 05:30:00', '[156]  >>  156'),
(159, 'New Task Title ...', 'NEW', 'New Task Summary ...', 17, 17, 0, 156, 'tasks', '2014-01-01 05:30:00', '[156]  >>  156'),
(160, 'New Task Title ...', 'NEW', 'New Task Summary ...', 17, 17, 0, 156, 'tasks', '2014-01-01 05:30:00', '[156]  >>  156'),
(161, 'New Task Title ...', 'NEW', 'New Task Summary ...', 17, 17, 0, 156, 'tasks', '2014-01-01 05:30:00', '[156]  >>  156'),
(162, 'New Task Title ...', 'NEW', 'New Task Summary ...', 17, 17, 0, 157, 'tasks', '2014-01-01 05:30:00', '[156]  >>  156  >>  157'),
(163, 'New Task Title ...', 'NEW', 'New Task Summary ...', 17, 17, 0, 157, 'tasks', '2014-01-01 05:30:00', '[156]  >>  156  >>  157'),
(164, 'New Task Title ...', 'NEW', 'New Task Summary ...', 17, 17, 0, 157, 'tasks', '2014-01-01 05:30:00', '[156]  >>  156  >>  157'),
(165, 'New Task Title ...', 'DONE', 'New Task Summary ...', 17, 17, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[165]'),
(166, 'New Task Title ...', 'NEW', 'New Task Summary ...', 17, 17, 0, 158, 'tasks', '2014-01-01 05:30:00', '[156]  >>  156  >>  158'),
(167, 'New Task Title ...', 'NEW', 'New Task Summary ...', 17, 17, 0, 158, 'tasks', '2014-01-01 05:30:00', '[156]  >>  156  >>  158'),
(168, 'New Task Title ...', 'NEW', 'New Task Summary ...', 17, 17, 0, 158, 'tasks', '2014-01-01 05:30:00', '[156]  >>  156  >>  158'),
(169, 'New Task Title ...', 'NEW', 'New Task Summary ...', 17, 17, 0, 158, 'tasks', '2014-01-01 05:30:00', '[156]  >>  156  >>  158'),
(170, 'New Task Title ...', 'NEW', 'New Task Summary ...', 17, 17, 0, NULL, 'tasks', '2014-01-01 05:30:00', '[170]'),
(171, 'New Task Title ...', 'NEW', 'New Task Summary ...', 17, 17, 0, 146, 'tasks', '2014-01-01 05:30:00', '[146]  >>  146'),
(172, 'New Task Title ...', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2015-02-05 17:30:20', '[172]'),
(173, 'New Task Title ...', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2015-02-05 23:23:19', '[173]'),
(174, 'New Task Title ...', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'tasks', '2015-02-05 23:27:48', '[174]'),
(176, 'New Task Title ...2222', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'org.taskmgmt.tasks', '2014-01-01 05:30:00', '[176]'),
(177, 'New Entity Title ...', 'DONE', 'New Entity Summary ...', 23, 23, 0, NULL, 'org.taskmgmt.tasks', '2015-02-25 16:00:19', '[177]'),
(179, 'My New Task HELLO!!!!', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'org.taskmgmt.tasks', '2014-01-01 05:30:00', '[179]'),
(180, 'New Task Title ...', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'org.taskmgmt.tasks', '2014-01-01 05:30:00', '[180]'),
(181, 'New Task Title ...Hmm!!!', 'NEW', 'New Task Summary ...', 23, 23, 0, 179, 'org.taskmgmt.tasks', '2014-01-01 05:30:00', '[177]  >>  177  >>  179'),
(182, 'Ms. Hena Task', 'NEW', 'No Task for you Ms Henna', 23, 18, 1, 95, 'org.taskmgmt.tasks', '2014-01-14 00:00:00', '[$]'),
(183, 'HOLALO', 'NEW', 'Test', 23, 18, 1, 94, 'org.taskmgmt.tasks', '2015-03-04 00:00:00', '[$]'),
(184, 'TTTT1111', 'NEW', 'XXXXXXXXXXXXXX', 23, 18, 1, 94, 'org.taskmgmt.tasks', '2015-03-18 00:00:00', '[1]'),
(185, 'AAAAAA', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'org.taskmgmt.tasks', '2015-03-02 15:05:35', '[185]'),
(186, 'BBBBBBBBBBB', 'DONE', 'New Task Summary ...', 23, 23, 0, NULL, 'org.taskmgmt.tasks', '2014-01-01 05:30:00', '[186]'),
(187, 'New Task Title ...', 'NEW', 'New Task Summary ...', 23, 23, 0, NULL, 'org.taskmgmt.tasks', '2015-03-10 14:45:31', '[187]'),
(188, 'New Task Title ...', 'NEW', 'New Task Summary ...', 23, 23, 0, 187, 'org.taskmgmt.tasks', '2014-01-01 05:30:00', '[187]  >>  187'),
(189, 'New Task Title ...', 'NEW', 'New Task Summary ...', 23, 23, 0, NULL, 'org.taskmgmt.tasks', '2017-03-14 05:30:00', '[189]'),
(190, 'New Task Title ...', 'NEW', 'New Task Summary ...', 23, 23, 0, NULL, 'org.taskmgmt.tasks', '2014-01-01 05:30:00', '[190]'),
(191, 'New Task Title ...', 'NEW', 'New Task Summary ...', 23, 23, 0, NULL, 'org.taskmgmt.tasks', '2015-05-06 05:30:00', '[191]'),
(192, 'task title ...', 'NEW', 'task summary ...', 23, 23, 1, NULL, 'org.taskmgmt.tasks', '1970-01-01 05:30:00', NULL),
(193, 'task title ...', 'NEW', 'task summary ...', 23, 23, 1, NULL, 'org.taskmgmt.tasks', '1970-01-01 05:30:00', NULL),
(194, 'task title ...', 'NEW', 'task summary ...', 23, 23, 1, NULL, 'org.taskmgmt.tasks', '1970-01-01 05:30:00', NULL),
(195, 'task title ...', 'NEW', 'task summary ...', 23, 23, 1, NULL, 'org.taskmgmt.tasks', '1970-01-01 05:30:00', NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `taskmgmt_tasksview`
--
CREATE TABLE IF NOT EXISTS `taskmgmt_tasksview` (
`ID` int(10) unsigned
,`TITLE` varchar(45)
,`STATUS` varchar(45)
,`SUMMARY` varchar(45)
,`OWNER_ID` int(10) unsigned
,`ASSIGNEE_ID` int(10) unsigned
,`PRIORITY` int(11)
,`PARENT_ID` int(10) unsigned
,`PARENTAGE` varchar(500)
,`ENTITY_TYPE` varchar(22)
,`DUE_DATE` datetime
,`owner_name` varchar(45)
,`assignee_name` varchar(45)
,`files` bigint(21)
,`comments` bigint(21)
);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `ID` int(11) unsigned NOT NULL,
  `NAME` varchar(45) NOT NULL,
  `LOGIN` varchar(45) NOT NULL,
  `PASSWORD` varchar(45) NOT NULL,
  `IS_ADMIN` int(1) unsigned NOT NULL,
  `ENTITY_TYPE` varchar(45) NOT NULL DEFAULT 'users',
  `ACCESS_LEVEL` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `NAME`, `LOGIN`, `PASSWORD`, `IS_ADMIN`, `ENTITY_TYPE`, `ACCESS_LEVEL`) VALUES
(15, 'Mr. User 1', 'user1@test.com', 'password', 0, 'org.users', 0),
(17, 'Mr. User 2111', 'user2@test.com', 'password', 0, 'org.users', 0),
(18, 'Mr. User 3', 'user3@test.com', 'password', 0, 'org.users', 0),
(23, 'Mr. Super Admin', 'admin@test.com', 'password', 0, 'org.users', 0),
(25, 'Mr. X2', 'xx2@test.com', 'password', 0, 'org.users', 0),
(27, 'Mr. X3', 'xx3@test.com', 'password', 0, 'org.users', 0),
(28, 'Mr. XX9', 'xx9@test.com', 'password', 0, 'org.users', 1),
(30, 'Mr.', 'scott@test.com', 'password', 0, 'org.users', 1),
(32, 'Mr.', 'scot2t@test.com', 'password', 0, 'org.users', 1),
(34, 'sadfasdfasdfasdf', 'dsfasfas', 'sadfasd', 0, 'org.users', 1),
(35, 'sdfsadfasdfa', 'asdfas', 'ssadfasdf', 0, 'org.users', 1),
(36, 'dsfadsfasd', 'sdfasdfasdfasdfa', 'fasdfsadfasdf', 0, 'org.users', 1),
(37, 'sdfasdfas', 'sdfas', 'dfasdfasdfasdf', 0, 'org.users', 1),
(38, 'safdasdfasd', 'sfdas', 'sdfadsfas', 0, 'org.users', 1),
(39, 'sdfasfdas', 'dsfas', 'sadfasfasd', 0, 'org.users', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE IF NOT EXISTS `user_roles` (
  `ID` int(10) unsigned NOT NULL,
  `ROLE_ID` int(10) unsigned NOT NULL,
  `ROLE_NAME` varchar(45) NOT NULL,
  `USER_ID` int(11) unsigned NOT NULL,
  `ENTITY_TYPE` varchar(45) NOT NULL DEFAULT 'roles'
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`ID`, `ROLE_ID`, `ROLE_NAME`, `USER_ID`, `ENTITY_TYPE`) VALUES
(1, 0, 'ADMIN', 23, 'roles');

-- --------------------------------------------------------

--
-- Structure for view `taskmgmt_tasksview`
--
DROP TABLE IF EXISTS `taskmgmt_tasksview`;

CREATE VIEW `taskmgmt_tasksview` AS (select `tasks`.`ID` AS `ID`,`tasks`.`TITLE` AS `TITLE`,`tasks`.`STATUS` AS `STATUS`,`tasks`.`SUMMARY` AS `SUMMARY`,`tasks`.`OWNER_ID` AS `OWNER_ID`,`tasks`.`ASSIGNEE_ID` AS `ASSIGNEE_ID`,`tasks`.`PRIORITY` AS `PRIORITY`,`tasks`.`PARENT_ID` AS `PARENT_ID`,`tasks`.`PARENTAGE` AS `PARENTAGE`,'org.taskmgmt.tasksview' AS `ENTITY_TYPE`,`tasks`.`DUE_DATE` AS `DUE_DATE`,`owners`.`NAME` AS `owner_name`,`assignees`.`NAME` AS `assignee_name`,count(`files`.`ID`) AS `files`,count(`comments`.`ID`) AS `comments` from ((((`taskmgmt_tasks` `tasks` join `user` `owners` on((`owners`.`ID` = `tasks`.`OWNER_ID`))) join `user` `assignees` on((`assignees`.`ID` = `tasks`.`ASSIGNEE_ID`))) left join `taskmgmt_taskfiles` `files` on((`files`.`TASK_ID` = `tasks`.`ID`))) left join `taskmgmt_taskcomments` `comments` on((`comments`.`TASK_ID` = `tasks`.`ID`))) group by `tasks`.`ID`);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `salestracker_clients`
--
ALTER TABLE `salestracker_clients`
  ADD PRIMARY KEY (`ID`), ADD KEY `INDUSTRY_ID_idx` (`INDUSTRY_ID`), ADD KEY `REGION_ID_idx` (`REGION_ID`);

--
-- Indexes for table `salestracker_industries`
--
ALTER TABLE `salestracker_industries`
  ADD PRIMARY KEY (`ID`), ADD KEY `INDUSTRY_CONTACT_idx` (`INDUSTRY_CONTACT_ID`);

--
-- Indexes for table `salestracker_leads`
--
ALTER TABLE `salestracker_leads`
  ADD PRIMARY KEY (`ID`), ADD KEY `SFAS_idx` (`PROSPECT_REGION_ID`), ADD KEY `LEAD_PROPSECT_INDUSTRY_idx` (`PROSPECT_INDUSTRY_ID`), ADD KEY `LEAD_USER_idx` (`USER_ID`), ADD KEY `LEAD_CLIENT_idx` (`CLIENT_ID`);

--
-- Indexes for table `salestracker_lead_actions`
--
ALTER TABLE `salestracker_lead_actions`
  ADD PRIMARY KEY (`ID`), ADD KEY `LEAD2_idx` (`LEAD_ID`);

--
-- Indexes for table `salestracker_lead_contacts`
--
ALTER TABLE `salestracker_lead_contacts`
  ADD PRIMARY KEY (`ID`), ADD KEY `LEAD_CONTACT_idx` (`CONTACT_ID`), ADD KEY `LEAD_idx` (`LEAD_ID`);

--
-- Indexes for table `salestracker_regions`
--
ALTER TABLE `salestracker_regions`
  ADD PRIMARY KEY (`ID`), ADD KEY `REGION_CONTACT_idx` (`REGIONAL_CONTACT_ID`);

--
-- Indexes for table `salestracker_salesusers`
--
ALTER TABLE `salestracker_salesusers`
  ADD PRIMARY KEY (`ID`), ADD UNIQUE KEY `ID_UNIQUE` (`ID`), ADD UNIQUE KEY `LOGIN_UNIQUE` (`LOGIN`);

--
-- Indexes for table `taskmgmt_taskcomments`
--
ALTER TABLE `taskmgmt_taskcomments`
  ADD PRIMARY KEY (`ID`), ADD KEY `FK_COMMENTS_TASK_OWNER_ID_idx` (`OWNER_ID`), ADD KEY `FK_COMMENTS_TASK_ASSIGNEE_ID_idx` (`ASSIGNEE_ID`), ADD KEY `FK_COMMENTS_TASK_ID_idx` (`TASK_ID`);

--
-- Indexes for table `taskmgmt_taskfiles`
--
ALTER TABLE `taskmgmt_taskfiles`
  ADD PRIMARY KEY (`ID`), ADD KEY `FK_TASK_ID_idx` (`TASK_ID`), ADD KEY `FK_FILES_OWNER_ID_idx` (`OWNER_ID`);

--
-- Indexes for table `taskmgmt_tasks`
--
ALTER TABLE `taskmgmt_tasks`
  ADD PRIMARY KEY (`ID`), ADD KEY `FK_TASK_OWNER_ID_idx` (`OWNER_ID`), ADD KEY `FK_TASK_ASSIGNEE_ID_idx` (`ASSIGNEE_ID`), ADD KEY `FK_TASK_PARENT_ID_idx` (`PARENT_ID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`), ADD UNIQUE KEY `ID_UNIQUE` (`ID`), ADD UNIQUE KEY `LOGIN_UNIQUE` (`LOGIN`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`ID`), ADD KEY `USER_ID_idx` (`USER_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `salestracker_clients`
--
ALTER TABLE `salestracker_clients`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `salestracker_industries`
--
ALTER TABLE `salestracker_industries`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `salestracker_leads`
--
ALTER TABLE `salestracker_leads`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `salestracker_lead_actions`
--
ALTER TABLE `salestracker_lead_actions`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `salestracker_lead_contacts`
--
ALTER TABLE `salestracker_lead_contacts`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `salestracker_regions`
--
ALTER TABLE `salestracker_regions`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `salestracker_salesusers`
--
ALTER TABLE `salestracker_salesusers`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `taskmgmt_taskcomments`
--
ALTER TABLE `taskmgmt_taskcomments`
  MODIFY `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `taskmgmt_taskfiles`
--
ALTER TABLE `taskmgmt_taskfiles`
  MODIFY `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=35;
--
-- AUTO_INCREMENT for table `taskmgmt_tasks`
--
ALTER TABLE `taskmgmt_tasks`
  MODIFY `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=196;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=40;
--
-- AUTO_INCREMENT for table `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `salestracker_clients`
--
ALTER TABLE `salestracker_clients`
ADD CONSTRAINT `CLIENT_INDUSTRY` FOREIGN KEY (`INDUSTRY_ID`) REFERENCES `salestracker_industries` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `CLIENT_REGION` FOREIGN KEY (`REGION_ID`) REFERENCES `salestracker_regions` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `salestracker_industries`
--
ALTER TABLE `salestracker_industries`
ADD CONSTRAINT `INDUSTRY_USER` FOREIGN KEY (`INDUSTRY_CONTACT_ID`) REFERENCES `salestracker_salesusers` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `salestracker_leads`
--
ALTER TABLE `salestracker_leads`
ADD CONSTRAINT `LEAD_CLIENT` FOREIGN KEY (`CLIENT_ID`) REFERENCES `salestracker_clients` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `LEAD_INDUSTRY` FOREIGN KEY (`PROSPECT_INDUSTRY_ID`) REFERENCES `salestracker_industries` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `LEAD_REGION` FOREIGN KEY (`PROSPECT_REGION_ID`) REFERENCES `salestracker_regions` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `salestracker_lead_actions`
--
ALTER TABLE `salestracker_lead_actions`
ADD CONSTRAINT `LEADACTION` FOREIGN KEY (`LEAD_ID`) REFERENCES `salestracker_leads` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `salestracker_lead_contacts`
--
ALTER TABLE `salestracker_lead_contacts`
ADD CONSTRAINT `LEAD` FOREIGN KEY (`LEAD_ID`) REFERENCES `salestracker_leads` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `LEAD_USER` FOREIGN KEY (`CONTACT_ID`) REFERENCES `salestracker_salesusers` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `salestracker_regions`
--
ALTER TABLE `salestracker_regions`
ADD CONSTRAINT `REGION_USER` FOREIGN KEY (`REGIONAL_CONTACT_ID`) REFERENCES `salestracker_salesusers` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `taskmgmt_taskcomments`
--
ALTER TABLE `taskmgmt_taskcomments`
ADD CONSTRAINT `FK_COMMENTS_TASK_ASSIGNEE_ID` FOREIGN KEY (`ASSIGNEE_ID`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION,
ADD CONSTRAINT `FK_COMMENTS_TASK_ID` FOREIGN KEY (`TASK_ID`) REFERENCES `taskmgmt_tasks` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION,
ADD CONSTRAINT `FK_COMMENTS_TASK_OWNER_ID` FOREIGN KEY (`OWNER_ID`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `taskmgmt_taskfiles`
--
ALTER TABLE `taskmgmt_taskfiles`
ADD CONSTRAINT `FK_FILES_OWNER_ID` FOREIGN KEY (`OWNER_ID`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION,
ADD CONSTRAINT `FK_TASK_ID` FOREIGN KEY (`TASK_ID`) REFERENCES `taskmgmt_tasks` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `taskmgmt_tasks`
--
ALTER TABLE `taskmgmt_tasks`
ADD CONSTRAINT `FK_TASK_ASSIGNEE_ID` FOREIGN KEY (`ASSIGNEE_ID`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION,
ADD CONSTRAINT `FK_TASK_OWNER_ID` FOREIGN KEY (`OWNER_ID`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION,
ADD CONSTRAINT `FK_TASK_PARENT_ID` FOREIGN KEY (`PARENT_ID`) REFERENCES `taskmgmt_tasks` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `user_roles`
--
ALTER TABLE `user_roles`
ADD CONSTRAINT `FK_ROLE_USER_ID` FOREIGN KEY (`USER_ID`) REFERENCES `user` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

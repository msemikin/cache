-- phpMyAdmin SQL Dump
-- version 4.4.13.1deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 30, 2016 at 01:21 PM
-- Server version: 5.6.28-0ubuntu0.15.10.1
-- PHP Version: 5.6.11-1ubuntu3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbproj`
--

-- --------------------------------------------------------

--
-- Table structure for table `actors`
--

CREATE TABLE IF NOT EXISTS `actors` (
  `actor_id` int(11) NOT NULL,
  `name` longtext COLLATE utf8_general_mysql500_ci,
  `project_id` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

--
-- Dumping data for table `actors`
--

INSERT INTO `actors` (`actor_id`, `name`, `project_id`) VALUES
(1, 'Актер', 0),
(2, 'Actor', 0),
(3, 'Actor', 0),
(4, 'Actor', 0),
(5, 'Actor', 0),
(6, 'Actor', 0),
(7, 'Actor', 0);

-- --------------------------------------------------------

--
-- Table structure for table `algdeps`
--

CREATE TABLE IF NOT EXISTS `algdeps` (
  `dep_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `element_id` int(11) DEFAULT NULL,
  `formula` longtext,
  `name` longtext
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `algdeps`
--

INSERT INTO `algdeps` (`dep_id`, `project_id`, `element_id`, `formula`, `name`) VALUES
(3, 0, 3, 'X+Y', 'SFSDFSD'),
(4, 0, 4, 'adfa', 'sdfs');

--
-- Triggers `algdeps`
--
DELIMITER $$
CREATE TRIGGER `algdeps_BEFORE_DELETE` BEFORE DELETE ON `algdeps`
 FOR EACH ROW BEGIN
SET SQL_SAFE_UPDATES = 0;
DELETE FROM sourcefield where sourcefield.field_id in
(SELECT field_id from depstosourfield WHERE depstosourfield.dep_id = OLD.dep_id);
SET SQL_SAFE_UPDATES = 1;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `attrconstraint`
--

CREATE TABLE IF NOT EXISTS `attrconstraint` (
  `constraint_id` int(11) NOT NULL,
  `comment` longtext,
  `attr_id` int(11) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `name` longtext
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `attrconstraint`
--

INSERT INTO `attrconstraint` (`constraint_id`, `comment`, `attr_id`, `project_id`, `name`) VALUES
(2, '', NULL, 0, 'Мое ограничение');

-- --------------------------------------------------------

--
-- Table structure for table `attribute`
--

CREATE TABLE IF NOT EXISTS `attribute` (
  `attr_id` int(11) NOT NULL,
  `element_id` int(11) DEFAULT NULL,
  `name` longtext COLLATE utf8_general_mysql500_ci,
  `project_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

--
-- Dumping data for table `attribute`
--

INSERT INTO `attribute` (`attr_id`, `element_id`, `name`, `project_id`) VALUES
(3, 3, 'А3О3', 0),
(4, 2, 'А4О2', 0),
(5, 7, 'АТРИБУТ7', 0),
(6, 3, 'Еще один атрибут', 0);

-- --------------------------------------------------------

--
-- Table structure for table `depstosourfield`
--

CREATE TABLE IF NOT EXISTS `depstosourfield` (
  `dep_id` int(11) NOT NULL,
  `field_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `diagram`
--

CREATE TABLE IF NOT EXISTS `diagram` (
  `diagram_id` int(11) NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `type` longtext COLLATE utf8_general_mysql500_ci,
  `JSON` longtext COLLATE utf8_general_mysql500_ci
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

--
-- Dumping data for table `diagram`
--

INSERT INTO `diagram` (`diagram_id`, `project_id`, `type`, `JSON`) VALUES
(5, 0, 'OR', '{"cells":[{"type":"cache.Object","size":{"width":100,"height":40},"position":{"x":104,"y":51},"angle":0,"id":"dbcb4a20-c7b1-4595-b4e1-3ae72255c2be","embeds":"","diagram":"objectRelations","z":1,"attrs":{"text":{"text":"Object"}}},{"type":"cache.Object","size":{"width":100,"height":40},"position":{"x":347,"y":81},"angle":0,"id":"5c64f58b-ba3e-4a06-af11-11c0604fea1a","embeds":"","diagram":"objectRelations","z":2,"attrs":{"text":{"text":"Object"}}},{"type":"cache.Object","size":{"width":100,"height":40},"position":{"x":136,"y":202},"angle":0,"id":"d7c3ab9c-37e6-42ac-8268-743f3ffbdbff","embeds":"","diagram":"objectRelations","z":3,"attrs":{"text":{"text":"Object"}}}]}'),
(6, 0, 'ER', '{"cells":[{"type":"cache.Entity","position":{"x":85,"y":59},"size":{"width":80,"height":40},"angle":0,"id":"f47fa5c7-4633-4ff2-bda8-e746b9ea383e","embeds":"","boundCell":{"id":"439c0836-85df-47d0-9629-b9113e63a58d","diagram":"objectRelations"},"z":1,"attrs":{"text":{"text":"Entity"}}},{"type":"cache.Entity","position":{"x":403,"y":139},"size":{"width":80,"height":40},"angle":0,"id":"cfeb21cf-ea07-4840-a483-109bbd7bf05a","embeds":"","boundCell":{"id":"de419381-ae76-423d-b24e-b8a4f16208d8","diagram":"objectRelations"},"z":2,"attrs":{"text":{"text":"Entity"}}},{"type":"cache.Entity","position":{"x":162,"y":232},"size":{"width":80,"height":40},"angle":0,"id":"26f5307b-3c7b-420a-b982-5ea686ed2f11","embeds":"","boundCell":{"id":"8657eec0-7716-4279-b642-e5fc25859578","diagram":"objectRelations"},"z":3,"attrs":{"text":{"text":"Entity"}}},{"type":"cache.Entity","position":{"x":331,"y":62},"size":{"width":80,"height":40},"angle":0,"id":"4dc080df-62ae-4cc7-8b6f-613f9d135946","embeds":"","boundCell":{"id":"ae283dc3-7684-47cf-9844-446fd9cec3fb","diagram":"objectRelations"},"z":4,"attrs":{"text":{"text":"Entity"}}},{"type":"cache.Entity","position":{"x":104,"y":51},"size":{"width":80,"height":40},"angle":0,"id":"10c97ebb-a182-4372-83bd-e02fcc66d068","embeds":"","boundCell":{"id":"dbcb4a20-c7b1-4595-b4e1-3ae72255c2be","diagram":"objectRelations"},"z":5,"attrs":{"text":{"text":"Entity"}}},{"type":"cache.Entity","position":{"x":347,"y":81},"size":{"width":80,"height":40},"angle":0,"id":"ac591e0a-e818-4f42-b40d-35a435a95ea4","embeds":"","boundCell":{"id":"5c64f58b-ba3e-4a06-af11-11c0604fea1a","diagram":"objectRelations"},"z":6,"attrs":{"text":{"text":"Entity"}}},{"type":"cache.Entity","position":{"x":136,"y":202},"size":{"width":80,"height":40},"angle":0,"id":"3773637b-436e-4396-a4db-740960059e9d","embeds":"","boundCell":{"id":"d7c3ab9c-37e6-42ac-8268-743f3ffbdbff","diagram":"objectRelations"},"z":7,"attrs":{"text":{"text":"Entity"}}}]}'),
(7, 0, 'UC', '{"cells":[{"type":"cache.Actor","position":{"x":213,"y":75},"size":{"width":25,"height":60},"angle":0,"id":"b0b281cf-d7e1-4403-a87e-a16f1e527629","embeds":"","diagram":"usecase","z":1,"selected":false,"renaming":false,"attrs":{"text":{"text":"Actor"}}},{"type":"cache.Service","size":{"width":100,"height":40},"position":{"x":365,"y":67},"angle":0,"id":"62b4bc2b-e78a-4625-a82d-c848ac4089f4","embeds":"","diagram":"usecase","z":2,"attrs":{"text":{"text":"Service"}}},{"type":"link","source":{"id":"b0b281cf-d7e1-4403-a87e-a16f1e527629"},"target":{"id":"62b4bc2b-e78a-4625-a82d-c848ac4089f4"},"labels":[{"position":15,"attrs":{"text":{"text":""}}},{"position":0.5,"attrs":{"text":{"text":""}}},{"position":-15,"attrs":{"text":{"text":""}}}],"id":"fac911e7-b76c-4ad0-8e88-a4aa4d548b0e","z":3,"hovered":false,"attrs":{".connection":{"d":"M 10 0 L 0 5 L 10 10 z"}}}]}');

-- --------------------------------------------------------

--
-- Table structure for table `document`
--

CREATE TABLE IF NOT EXISTS `document` (
  `docment_id` int(11) NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `title` longtext COLLATE utf8_general_mysql500_ci,
  `path` longtext COLLATE utf8_general_mysql500_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

-- --------------------------------------------------------

--
-- Table structure for table `element`
--

CREATE TABLE IF NOT EXISTS `element` (
  `element_id` int(11) NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `name` longtext COLLATE utf8_general_mysql500_ci
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

--
-- Dumping data for table `element`
--

INSERT INTO `element` (`element_id`, `project_id`, `name`) VALUES
(2, 0, 'ВторойОбъект'),
(3, 0, 'ТретийОбъект'),
(7, 1, 'some object'),
(8, 1, 'Четвертый объект'),
(9, 1, 'some object');

-- --------------------------------------------------------

--
-- Table structure for table `group`
--

CREATE TABLE IF NOT EXISTS `group` (
  `group_Id` int(11) NOT NULL,
  `Name` longtext COLLATE utf8_general_mysql500_ci
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

--
-- Dumping data for table `group`
--

INSERT INTO `group` (`group_Id`, `Name`) VALUES
(3, 'ПИ-13-1');

-- --------------------------------------------------------

--
-- Table structure for table `inforeq`
--

CREATE TABLE IF NOT EXISTS `inforeq` (
  `inforeq_id` int(11) NOT NULL,
  `attr_id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `project_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `inforeq_attr`
--

CREATE TABLE IF NOT EXISTS `inforeq_attr` (
  `inforeq_id` int(11) NOT NULL,
  `attr_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `link`
--

CREATE TABLE IF NOT EXISTS `link` (
  `link_id` int(11) NOT NULL,
  `first_el_id` int(11) DEFAULT NULL,
  `second_el_id` int(11) DEFAULT NULL,
  `type` longtext COLLATE utf8_general_mysql500_ci,
  `comment` longtext COLLATE utf8_general_mysql500_ci,
  `project_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

-- --------------------------------------------------------

--
-- Table structure for table `linkconstraint`
--

CREATE TABLE IF NOT EXISTS `linkconstraint` (
  `constr_id` int(11) NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `first_element` int(11) DEFAULT NULL,
  `second_element` int(11) DEFAULT NULL,
  `comment` longtext COLLATE utf8_general_mysql500_ci,
  `name` longtext COLLATE utf8_general_mysql500_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE IF NOT EXISTS `project` (
  `project_id` int(11) NOT NULL,
  `owner_id` int(11) DEFAULT NULL,
  `title` longtext COLLATE utf8_general_mysql500_ci,
  `is_ready` smallint(6) DEFAULT NULL,
  `is_sent` smallint(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`project_id`, `owner_id`, `title`, `is_ready`, `is_sent`) VALUES
(0, 3, 'МойПроект', 0, 0),
(1, 3, 'ваыва', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE IF NOT EXISTS `report` (
  `report_id` int(11) NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `name` longtext COLLATE utf8_general_mysql500_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reporttoattr`
--

CREATE TABLE IF NOT EXISTS `reporttoattr` (
  `attr_id` int(11) DEFAULT NULL,
  `report_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sourcefield`
--

CREATE TABLE IF NOT EXISTS `sourcefield` (
  `field_id` int(11) NOT NULL,
  `name` longtext,
  `attr_id` int(11) DEFAULT NULL,
  `dep_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `statistic`
--

CREATE TABLE IF NOT EXISTS `statistic` (
  `statistic_id` int(11) NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `name` longtext CHARACTER SET utf8
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

--
-- Dumping data for table `statistic`
--

INSERT INTO `statistic` (`statistic_id`, `project_id`, `name`) VALUES
(16, 0, 'Моя статистика'),
(17, 0, 'Стас'),
(18, 0, 'ЫВОРЫВОАРЫВ');

-- --------------------------------------------------------

--
-- Table structure for table `stattoattr`
--

CREATE TABLE IF NOT EXISTS `stattoattr` (
  `statistic_id` int(11) DEFAULT NULL,
  `attr_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `stattoattr`
--

INSERT INTO `stattoattr` (`statistic_id`, `attr_id`) VALUES
(17, 4),
(17, 3),
(17, 6),
(16, 4),
(16, 3),
(16, 6),
(18, 3),
(18, 6);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(11) NOT NULL,
  `group_Id` int(11) DEFAULT NULL,
  `email` longtext COLLATE utf8_general_mysql500_ci,
  `password` longtext COLLATE utf8_general_mysql500_ci,
  `fullname` longtext COLLATE utf8_general_mysql500_ci,
  `abbr` longtext COLLATE utf8_general_mysql500_ci
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `group_Id`, `email`, `password`, `fullname`, `abbr`) VALUES
(3, 3, 'didevgen', '123', 'Ковалев', 'Ков'),
(4, NULL, 'jdfks', 'fjdks', 'jfdsk', NULL),
(5, NULL, '', '', '', NULL),
(6, NULL, 'jfkd', 'fd', 'fjds', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_role`
--

CREATE TABLE IF NOT EXISTS `user_role` (
  `role_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `actors`
--
ALTER TABLE `actors`
  ADD PRIMARY KEY (`actor_id`),
  ADD KEY `vjscxbn_idx` (`project_id`);

--
-- Indexes for table `algdeps`
--
ALTER TABLE `algdeps`
  ADD PRIMARY KEY (`dep_id`),
  ADD KEY `mykey_idx` (`element_id`),
  ADD KEY `algdeps_projectkey_constr` (`project_id`);

--
-- Indexes for table `attrconstraint`
--
ALTER TABLE `attrconstraint`
  ADD PRIMARY KEY (`constraint_id`),
  ADD KEY `dsfsdxcxds_idx` (`attr_id`),
  ADD KEY `xcvxvc_idx` (`project_id`);

--
-- Indexes for table `attribute`
--
ALTER TABLE `attribute`
  ADD PRIMARY KEY (`attr_id`),
  ADD KEY `FK_ATTRIBUT_REFERENCE_OBJECT` (`element_id`);

--
-- Indexes for table `depstosourfield`
--
ALTER TABLE `depstosourfield`
  ADD KEY `dfsfsd_idx` (`field_id`),
  ADD KEY `cxxcv_idx` (`dep_id`);

--
-- Indexes for table `diagram`
--
ALTER TABLE `diagram`
  ADD PRIMARY KEY (`diagram_id`),
  ADD KEY `FK_DIAGRAM_REFERENCE_PROJECT` (`project_id`);

--
-- Indexes for table `document`
--
ALTER TABLE `document`
  ADD PRIMARY KEY (`docment_id`),
  ADD KEY `FK_DOCUMENT_REFERENCE_PROJECT` (`project_id`);

--
-- Indexes for table `element`
--
ALTER TABLE `element`
  ADD PRIMARY KEY (`element_id`),
  ADD KEY `FK_OBJECT_REFERENCE_PROJECT` (`project_id`);

--
-- Indexes for table `group`
--
ALTER TABLE `group`
  ADD PRIMARY KEY (`group_Id`);

--
-- Indexes for table `inforeq`
--
ALTER TABLE `inforeq`
  ADD PRIMARY KEY (`inforeq_id`);

--
-- Indexes for table `link`
--
ALTER TABLE `link`
  ADD PRIMARY KEY (`link_id`),
  ADD KEY `dsfsdfgdfdf_idx` (`first_el_id`),
  ADD KEY `dsfsdfsdfvcx_idx` (`second_el_id`),
  ADD KEY `xcvxc_idx` (`project_id`);

--
-- Indexes for table `linkconstraint`
--
ALTER TABLE `linkconstraint`
  ADD PRIMARY KEY (`constr_id`),
  ADD KEY `dsfsdfs_idx` (`first_element`),
  ADD KEY `dsfsdfs_idx1` (`second_element`),
  ADD KEY `cvxv_idx` (`project_id`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`project_id`),
  ADD KEY `FK_PROJECT_REFERENCE_STUDENT` (`owner_id`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`report_id`),
  ADD KEY `FK_REPORT_REFERENCE_PROJECT` (`project_id`);

--
-- Indexes for table `reporttoattr`
--
ALTER TABLE `reporttoattr`
  ADD KEY `FK_REPORTTO_REFERENCE_REPORT` (`report_id`),
  ADD KEY `FK_REPORTTO_REFERENCE_OBJECT_idx` (`attr_id`);

--
-- Indexes for table `sourcefield`
--
ALTER TABLE `sourcefield`
  ADD PRIMARY KEY (`field_id`),
  ADD KEY `mkey_idx` (`attr_id`);

--
-- Indexes for table `statistic`
--
ALTER TABLE `statistic`
  ADD PRIMARY KEY (`statistic_id`),
  ADD KEY `FK_STATISTI_REFERENCE_PROJECT` (`project_id`);

--
-- Indexes for table `stattoattr`
--
ALTER TABLE `stattoattr`
  ADD KEY `aaaa_idx` (`attr_id`),
  ADD KEY `bbbb_idx` (`statistic_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `FK_STUDENT_REFERENCE_GROUP` (`group_Id`);

--
-- Indexes for table `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `actors`
--
ALTER TABLE `actors`
  MODIFY `actor_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `algdeps`
--
ALTER TABLE `algdeps`
  MODIFY `dep_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `attrconstraint`
--
ALTER TABLE `attrconstraint`
  MODIFY `constraint_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `attribute`
--
ALTER TABLE `attribute`
  MODIFY `attr_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `diagram`
--
ALTER TABLE `diagram`
  MODIFY `diagram_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `document`
--
ALTER TABLE `document`
  MODIFY `docment_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `element`
--
ALTER TABLE `element`
  MODIFY `element_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `group`
--
ALTER TABLE `group`
  MODIFY `group_Id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `inforeq`
--
ALTER TABLE `inforeq`
  MODIFY `inforeq_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `link`
--
ALTER TABLE `link`
  MODIFY `link_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `linkconstraint`
--
ALTER TABLE `linkconstraint`
  MODIFY `constr_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `report_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `sourcefield`
--
ALTER TABLE `sourcefield`
  MODIFY `field_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `statistic`
--
ALTER TABLE `statistic`
  MODIFY `statistic_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `user_role`
--
ALTER TABLE `user_role`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `actors`
--
ALTER TABLE `actors`
  ADD CONSTRAINT `vjscxbn` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `algdeps`
--
ALTER TABLE `algdeps`
  ADD CONSTRAINT `algdeps_projectkey_constr` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `mykey` FOREIGN KEY (`element_id`) REFERENCES `attribute` (`attr_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `attrconstraint`
--
ALTER TABLE `attrconstraint`
  ADD CONSTRAINT `dsfsdxcxds` FOREIGN KEY (`attr_id`) REFERENCES `attribute` (`attr_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `xcvxvc` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `attribute`
--
ALTER TABLE `attribute`
  ADD CONSTRAINT `FK_ATTRIBUT_REFERENCE_OBJECT` FOREIGN KEY (`element_id`) REFERENCES `element` (`element_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `depstosourfield`
--
ALTER TABLE `depstosourfield`
  ADD CONSTRAINT `cxxcv` FOREIGN KEY (`dep_id`) REFERENCES `algdeps` (`dep_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `dfsfsd` FOREIGN KEY (`field_id`) REFERENCES `sourcefield` (`field_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `diagram`
--
ALTER TABLE `diagram`
  ADD CONSTRAINT `FK_DIAGRAM_REFERENCE_PROJECT` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `document`
--
ALTER TABLE `document`
  ADD CONSTRAINT `FK_DOCUMENT_REFERENCE_PROJECT` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `element`
--
ALTER TABLE `element`
  ADD CONSTRAINT `FK_OBJECT_REFERENCE_PROJECT` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `link`
--
ALTER TABLE `link`
  ADD CONSTRAINT `dsfsdfgdfdf` FOREIGN KEY (`first_el_id`) REFERENCES `element` (`element_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `dsfsdfsdfvcx` FOREIGN KEY (`second_el_id`) REFERENCES `element` (`element_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `xcvxc` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `linkconstraint`
--
ALTER TABLE `linkconstraint`
  ADD CONSTRAINT `cvxv` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `dsfsdfs` FOREIGN KEY (`first_element`) REFERENCES `element` (`element_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `dsfsdfsds` FOREIGN KEY (`second_element`) REFERENCES `element` (`element_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `FK_PROJECT_REFERENCE_STUDENT` FOREIGN KEY (`owner_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `report`
--
ALTER TABLE `report`
  ADD CONSTRAINT `FK_REPORT_REFERENCE_PROJECT` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reporttoattr`
--
ALTER TABLE `reporttoattr`
  ADD CONSTRAINT `FK_REPORTTO_REFERENCE_REPORT` FOREIGN KEY (`report_id`) REFERENCES `report` (`report_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `dfsfsf` FOREIGN KEY (`attr_id`) REFERENCES `attribute` (`attr_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sourcefield`
--
ALTER TABLE `sourcefield`
  ADD CONSTRAINT `mkey` FOREIGN KEY (`attr_id`) REFERENCES `attribute` (`attr_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `statistic`
--
ALTER TABLE `statistic`
  ADD CONSTRAINT `FK_STATISTI_REFERENCE_PROJECT` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `stattoattr`
--
ALTER TABLE `stattoattr`
  ADD CONSTRAINT `aaaa` FOREIGN KEY (`attr_id`) REFERENCES `attribute` (`attr_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bbbb` FOREIGN KEY (`statistic_id`) REFERENCES `statistic` (`statistic_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_STUDENT_REFERENCE_GROUP` FOREIGN KEY (`group_Id`) REFERENCES `group` (`group_Id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1
-- Время создания: Сен 13 2015 г., 18:12
-- Версия сервера: 5.6.21
-- Версия PHP: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `my_db`
--

-- --------------------------------------------------------

--
-- Структура таблицы `actors`
--

CREATE TABLE IF NOT EXISTS `actors` (
`actor_id` int(11) NOT NULL,
  `actor_name` longtext COLLATE utf8_general_mysql500_ci,
  `project_id` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

--
-- Дамп данных таблицы `actors`
--

INSERT INTO `actors` (`actor_id`, `actor_name`, `project_id`) VALUES
(1, 'Актер', 0),
(2, 'Actor', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `algdeps`
--

CREATE TABLE IF NOT EXISTS `algdeps` (
`dep_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `result_field` int(11) DEFAULT NULL,
  `formula` longtext,
  `name` longtext
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `algdeps`
--

INSERT INTO `algdeps` (`dep_id`, `result_field`, `formula`, `name`) VALUES
(1, 3, 'X + Y', 'myBestName');

--
-- Триггеры `algdeps`
--
DELIMITER //
CREATE TRIGGER `algdeps_BEFORE_DELETE` BEFORE DELETE ON `algdeps`
 FOR EACH ROW BEGIN
SET SQL_SAFE_UPDATES = 0;
DELETE FROM sourcefield where sourcefield.field_id in
(SELECT field_id from depstosourfield WHERE depstosourfield.dep_id = OLD.dep_id);
SET SQL_SAFE_UPDATES = 1;
END
//
DELIMITER ;

-- --------------------------------------------------------

--
-- Структура таблицы `attrconstr`
--

CREATE TABLE IF NOT EXISTS `attrconstr` (
`constr_id` int(11) NOT NULL,
  `comment` longtext,
  `attr_id` int(11) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `name` longtext
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `attrconstr`
--

INSERT INTO `attrconstr` (`constr_id`, `comment`, `attr_id`, `project_id`, `name`) VALUES
(1, 'sdfsdf', 3, 0, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `attribute`
--

CREATE TABLE IF NOT EXISTS `attribute` (
`attr_id` int(11) NOT NULL,
  `object_id` int(11) DEFAULT NULL,
  `Name` longtext COLLATE utf8_general_mysql500_ci
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

--
-- Дамп данных таблицы `attribute`
--

INSERT INTO `attribute` (`attr_id`, `object_id`, `Name`) VALUES
(3, 3, 'А3О3'),
(4, 2, 'А4О2'),
(5, 7, 'АТРИБУТ7'),
(6, 3, 'Еще один атрибут');

-- --------------------------------------------------------

--
-- Структура таблицы `depstosourfield`
--

CREATE TABLE IF NOT EXISTS `depstosourfield` (
  `dep_id` int(11) NOT NULL,
  `field_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `depstosourfield`
--

INSERT INTO `depstosourfield` (`dep_id`, `field_id`) VALUES
(1, 2),
(1, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `diagram`
--

CREATE TABLE IF NOT EXISTS `diagram` (
`diagram_id` int(11) NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `Type` longtext COLLATE utf8_general_mysql500_ci,
  `JSON` longtext COLLATE utf8_general_mysql500_ci
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

--
-- Дамп данных таблицы `diagram`
--

INSERT INTO `diagram` (`diagram_id`, `project_id`, `Type`, `JSON`) VALUES
(1, 0, 'ER', 'huy'),
(2, 0, 'UC', 'DFSFS'),
(3, 0, 'OR', 'cx'),
(4, 0, 'UC', 'dfsfdsf');

-- --------------------------------------------------------

--
-- Структура таблицы `document`
--

CREATE TABLE IF NOT EXISTS `document` (
`docment_id` int(11) NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `Title` longtext COLLATE utf8_general_mysql500_ci,
  `Path` longtext COLLATE utf8_general_mysql500_ci,
  `ParentalProject` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `filter`
--

CREATE TABLE IF NOT EXISTS `filter` (
`filter_id` int(11) NOT NULL,
  `object_id` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `filter`
--

INSERT INTO `filter` (`filter_id`, `object_id`) VALUES
(4, 2),
(3, 3);

-- --------------------------------------------------------

--
-- Структура таблицы `filtertoattribute`
--

CREATE TABLE IF NOT EXISTS `filtertoattribute` (
  `filter_id` int(11) DEFAULT NULL,
  `attribute_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `group`
--

CREATE TABLE IF NOT EXISTS `group` (
`group_Id` int(11) NOT NULL,
  `Name` longtext COLLATE utf8_general_mysql500_ci
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

--
-- Дамп данных таблицы `group`
--

INSERT INTO `group` (`group_Id`, `Name`) VALUES
(3, 'ПИ-13-1');

-- --------------------------------------------------------

--
-- Структура таблицы `link`
--

CREATE TABLE IF NOT EXISTS `link` (
`link_id` int(11) NOT NULL,
  `firstObj` int(11) DEFAULT NULL,
  `secondObj` int(11) DEFAULT NULL,
  `linkType` longtext COLLATE utf8_general_mysql500_ci,
  `comment` longtext COLLATE utf8_general_mysql500_ci,
  `project_id` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

--
-- Дамп данных таблицы `link`
--

INSERT INTO `link` (`link_id`, `firstObj`, `secondObj`, `linkType`, `comment`, `project_id`) VALUES
(1, 2, 3, '1:M', 'ничего', 0),
(2, 3, 7, 'M:M', 'коммент', 0),
(3, 8, 9, 'M:1', 'cvd', 0),
(4, 9, 2, '1:1', 'csdfs', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `linkconstr`
--

CREATE TABLE IF NOT EXISTS `linkconstr` (
`constr_id` int(11) NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `firstObject` int(11) DEFAULT NULL,
  `secondObject` int(11) DEFAULT NULL,
  `comment` longtext COLLATE utf8_general_mysql500_ci,
  `name` longtext COLLATE utf8_general_mysql500_ci
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

--
-- Дамп данных таблицы `linkconstr`
--

INSERT INTO `linkconstr` (`constr_id`, `project_id`, `firstObject`, `secondObject`, `comment`, `name`) VALUES
(1, 0, 2, 3, 'учится в', 'some name');

-- --------------------------------------------------------

--
-- Структура таблицы `object`
--

CREATE TABLE IF NOT EXISTS `object` (
`object_id` int(11) NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `objectName` longtext COLLATE utf8_general_mysql500_ci
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

--
-- Дамп данных таблицы `object`
--

INSERT INTO `object` (`object_id`, `project_id`, `objectName`) VALUES
(2, 0, 'ВторойОбъект'),
(3, 0, 'ТретийОбъект'),
(7, 1, 'some object'),
(8, 1, 'Четвертый объект'),
(9, 1, 'some object');

-- --------------------------------------------------------

--
-- Структура таблицы `project`
--

CREATE TABLE IF NOT EXISTS `project` (
  `project_id` int(11) NOT NULL,
  `student_id` int(11) DEFAULT NULL,
  `Title` longtext COLLATE utf8_general_mysql500_ci,
  `IsReady` smallint(6) DEFAULT NULL,
  `IsSent` smallint(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

--
-- Дамп данных таблицы `project`
--

INSERT INTO `project` (`project_id`, `student_id`, `Title`, `IsReady`, `IsSent`) VALUES
(0, 3, 'МойПроект', 0, 0),
(1, 3, 'ваыва', 0, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `report`
--

CREATE TABLE IF NOT EXISTS `report` (
`report_id` int(11) NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `name` longtext COLLATE utf8_general_mysql500_ci
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

--
-- Дамп данных таблицы `report`
--

INSERT INTO `report` (`report_id`, `project_id`, `name`) VALUES
(2, 0, 'Отчет2'),
(3, 0, 'Отчет3'),
(4, 0, 'some name');

-- --------------------------------------------------------

--
-- Структура таблицы `reporttoobject`
--

CREATE TABLE IF NOT EXISTS `reporttoobject` (
  `object_id` int(11) DEFAULT NULL,
  `report_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

--
-- Дамп данных таблицы `reporttoobject`
--

INSERT INTO `reporttoobject` (`object_id`, `report_id`) VALUES
(7, 4);

-- --------------------------------------------------------

--
-- Структура таблицы `search`
--

CREATE TABLE IF NOT EXISTS `search` (
`search_id` int(11) NOT NULL,
  `object_id` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `search`
--

INSERT INTO `search` (`search_id`, `object_id`) VALUES
(5, 3);

-- --------------------------------------------------------

--
-- Структура таблицы `searchtoattr`
--

CREATE TABLE IF NOT EXISTS `searchtoattr` (
  `search_id` int(11) DEFAULT NULL,
  `attribute_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

--
-- Дамп данных таблицы `searchtoattr`
--

INSERT INTO `searchtoattr` (`search_id`, `attribute_id`) VALUES
(5, 3);

-- --------------------------------------------------------

--
-- Структура таблицы `sort`
--

CREATE TABLE IF NOT EXISTS `sort` (
`sort_id` int(11) NOT NULL,
  `object_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `sorttoattr`
--

CREATE TABLE IF NOT EXISTS `sorttoattr` (
  `sort_id` int(11) DEFAULT NULL,
  `attribute_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `sourcefield`
--

CREATE TABLE IF NOT EXISTS `sourcefield` (
`field_id` int(11) NOT NULL,
  `varName` longtext,
  `attr_id` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `sourcefield`
--

INSERT INTO `sourcefield` (`field_id`, `varName`, `attr_id`) VALUES
(1, 'X', 3),
(2, 'Y', 6);

-- --------------------------------------------------------

--
-- Структура таблицы `statistic`
--

CREATE TABLE IF NOT EXISTS `statistic` (
`statistic_id` int(11) NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `name` longtext CHARACTER SET utf8
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

--
-- Дамп данных таблицы `statistic`
--

INSERT INTO `statistic` (`statistic_id`, `project_id`, `name`) VALUES
(1, 0, 'С1П0'),
(5, 0, 'MyStat'),
(9, 0, 'Моя'),
(13, 0, 'Мо');

-- --------------------------------------------------------

--
-- Структура таблицы `stattoobj`
--

CREATE TABLE IF NOT EXISTS `stattoobj` (
  `statistic_id` int(11) DEFAULT NULL,
  `object_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `student`
--

CREATE TABLE IF NOT EXISTS `student` (
`student_id` int(11) NOT NULL,
  `group_Id` int(11) DEFAULT NULL,
  `Email` longtext COLLATE utf8_general_mysql500_ci,
  `Password` longtext COLLATE utf8_general_mysql500_ci,
  `FullName` longtext COLLATE utf8_general_mysql500_ci,
  `Abbr` longtext COLLATE utf8_general_mysql500_ci
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

--
-- Дамп данных таблицы `student`
--

INSERT INTO `student` (`student_id`, `group_Id`, `Email`, `Password`, `FullName`, `Abbr`) VALUES
(3, 3, 'didevgen', '123', 'Ковалев', 'Ков');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `actors`
--
ALTER TABLE `actors`
 ADD PRIMARY KEY (`actor_id`), ADD KEY `vjscxbn_idx` (`project_id`);

--
-- Индексы таблицы `algdeps`
--
ALTER TABLE `algdeps`
 ADD PRIMARY KEY (`dep_id`), ADD KEY `mykey_idx` (`result_field`);

--
-- Индексы таблицы `attrconstr`
--
ALTER TABLE `attrconstr`
 ADD PRIMARY KEY (`constr_id`), ADD KEY `dsfsdxcxds_idx` (`attr_id`), ADD KEY `xcvxvc_idx` (`project_id`);

--
-- Индексы таблицы `attribute`
--
ALTER TABLE `attribute`
 ADD PRIMARY KEY (`attr_id`), ADD KEY `FK_ATTRIBUT_REFERENCE_OBJECT` (`object_id`);

--
-- Индексы таблицы `depstosourfield`
--
ALTER TABLE `depstosourfield`
 ADD KEY `dfsfsd_idx` (`field_id`), ADD KEY `cxxcv_idx` (`dep_id`);

--
-- Индексы таблицы `diagram`
--
ALTER TABLE `diagram`
 ADD PRIMARY KEY (`diagram_id`), ADD KEY `FK_DIAGRAM_REFERENCE_PROJECT` (`project_id`);

--
-- Индексы таблицы `document`
--
ALTER TABLE `document`
 ADD PRIMARY KEY (`docment_id`), ADD KEY `FK_DOCUMENT_REFERENCE_PROJECT` (`project_id`);

--
-- Индексы таблицы `filter`
--
ALTER TABLE `filter`
 ADD PRIMARY KEY (`filter_id`), ADD KEY `cxv_idx` (`object_id`);

--
-- Индексы таблицы `filtertoattribute`
--
ALTER TABLE `filtertoattribute`
 ADD KEY `dfv_idx` (`filter_id`), ADD KEY `cvxvxcxcv_idx` (`attribute_id`);

--
-- Индексы таблицы `group`
--
ALTER TABLE `group`
 ADD PRIMARY KEY (`group_Id`);

--
-- Индексы таблицы `link`
--
ALTER TABLE `link`
 ADD PRIMARY KEY (`link_id`), ADD KEY `dsfsdfgdfdf_idx` (`firstObj`), ADD KEY `dsfsdfsdfvcx_idx` (`secondObj`), ADD KEY `xcvxc_idx` (`project_id`);

--
-- Индексы таблицы `linkconstr`
--
ALTER TABLE `linkconstr`
 ADD PRIMARY KEY (`constr_id`), ADD KEY `dsfsdfs_idx` (`firstObject`), ADD KEY `dsfsdfs_idx1` (`secondObject`), ADD KEY `cvxv_idx` (`project_id`);

--
-- Индексы таблицы `object`
--
ALTER TABLE `object`
 ADD PRIMARY KEY (`object_id`), ADD KEY `FK_OBJECT_REFERENCE_PROJECT` (`project_id`);

--
-- Индексы таблицы `project`
--
ALTER TABLE `project`
 ADD PRIMARY KEY (`project_id`), ADD KEY `FK_PROJECT_REFERENCE_STUDENT` (`student_id`);

--
-- Индексы таблицы `report`
--
ALTER TABLE `report`
 ADD PRIMARY KEY (`report_id`), ADD KEY `FK_REPORT_REFERENCE_PROJECT` (`project_id`);

--
-- Индексы таблицы `reporttoobject`
--
ALTER TABLE `reporttoobject`
 ADD KEY `FK_REPORTTO_REFERENCE_OBJECT` (`object_id`), ADD KEY `FK_REPORTTO_REFERENCE_REPORT` (`report_id`);

--
-- Индексы таблицы `search`
--
ALTER TABLE `search`
 ADD PRIMARY KEY (`search_id`), ADD KEY `fk2_idx` (`object_id`);

--
-- Индексы таблицы `searchtoattr`
--
ALTER TABLE `searchtoattr`
 ADD KEY `sdfsdfsdf_idx` (`attribute_id`), ADD KEY `cxvxcv_idx` (`search_id`);

--
-- Индексы таблицы `sort`
--
ALTER TABLE `sort`
 ADD PRIMARY KEY (`sort_id`), ADD KEY `fk2_idx` (`object_id`);

--
-- Индексы таблицы `sorttoattr`
--
ALTER TABLE `sorttoattr`
 ADD KEY `ewrwer_idx` (`attribute_id`), ADD KEY `dfssd_idx` (`sort_id`);

--
-- Индексы таблицы `sourcefield`
--
ALTER TABLE `sourcefield`
 ADD PRIMARY KEY (`field_id`), ADD KEY `mkey_idx` (`attr_id`);

--
-- Индексы таблицы `statistic`
--
ALTER TABLE `statistic`
 ADD PRIMARY KEY (`statistic_id`), ADD KEY `FK_STATISTI_REFERENCE_PROJECT` (`project_id`);

--
-- Индексы таблицы `stattoobj`
--
ALTER TABLE `stattoobj`
 ADD KEY `FK_STATTOOB_REFERENCE_STATISTI` (`statistic_id`), ADD KEY `FK_STATTOOB_REFERENCE_OBJECT` (`object_id`);

--
-- Индексы таблицы `student`
--
ALTER TABLE `student`
 ADD PRIMARY KEY (`student_id`), ADD KEY `FK_STUDENT_REFERENCE_GROUP` (`group_Id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `actors`
--
ALTER TABLE `actors`
MODIFY `actor_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT для таблицы `algdeps`
--
ALTER TABLE `algdeps`
MODIFY `dep_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT для таблицы `attrconstr`
--
ALTER TABLE `attrconstr`
MODIFY `constr_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT для таблицы `attribute`
--
ALTER TABLE `attribute`
MODIFY `attr_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT для таблицы `diagram`
--
ALTER TABLE `diagram`
MODIFY `diagram_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT для таблицы `document`
--
ALTER TABLE `document`
MODIFY `docment_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `filter`
--
ALTER TABLE `filter`
MODIFY `filter_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT для таблицы `group`
--
ALTER TABLE `group`
MODIFY `group_Id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT для таблицы `link`
--
ALTER TABLE `link`
MODIFY `link_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT для таблицы `linkconstr`
--
ALTER TABLE `linkconstr`
MODIFY `constr_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT для таблицы `object`
--
ALTER TABLE `object`
MODIFY `object_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT для таблицы `report`
--
ALTER TABLE `report`
MODIFY `report_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT для таблицы `search`
--
ALTER TABLE `search`
MODIFY `search_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT для таблицы `sort`
--
ALTER TABLE `sort`
MODIFY `sort_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `sourcefield`
--
ALTER TABLE `sourcefield`
MODIFY `field_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT для таблицы `statistic`
--
ALTER TABLE `statistic`
MODIFY `statistic_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT для таблицы `student`
--
ALTER TABLE `student`
MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `actors`
--
ALTER TABLE `actors`
ADD CONSTRAINT `vjscxbn` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `algdeps`
--
ALTER TABLE `algdeps`
ADD CONSTRAINT `mykey` FOREIGN KEY (`result_field`) REFERENCES `object` (`object_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
ADD CONSTRAINT `algdeps_projectkey_constr` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`) ON DELETE CASCADE ON UPDATE NO ACTION; 
--
-- Ограничения внешнего ключа таблицы `attrconstr`
--
ALTER TABLE `attrconstr`
ADD CONSTRAINT `dsfsdxcxds` FOREIGN KEY (`attr_id`) REFERENCES `attribute` (`attr_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
ADD CONSTRAINT `xcvxvc` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `attribute`
--
ALTER TABLE `attribute`
ADD CONSTRAINT `FK_ATTRIBUT_REFERENCE_OBJECT` FOREIGN KEY (`object_id`) REFERENCES `object` (`object_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `depstosourfield`
--
ALTER TABLE `depstosourfield`
ADD CONSTRAINT `cxxcv` FOREIGN KEY (`dep_id`) REFERENCES `algdeps` (`dep_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
ADD CONSTRAINT `dfsfsd` FOREIGN KEY (`field_id`) REFERENCES `sourcefield` (`field_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `diagram`
--
ALTER TABLE `diagram`
ADD CONSTRAINT `FK_DIAGRAM_REFERENCE_PROJECT` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `document`
--
ALTER TABLE `document`
ADD CONSTRAINT `FK_DOCUMENT_REFERENCE_PROJECT` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `filter`
--
ALTER TABLE `filter`
ADD CONSTRAINT `cxv` FOREIGN KEY (`object_id`) REFERENCES `object` (`object_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `filtertoattribute`
--
ALTER TABLE `filtertoattribute`
ADD CONSTRAINT `cvxvxcxcv` FOREIGN KEY (`attribute_id`) REFERENCES `attribute` (`attr_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
ADD CONSTRAINT `dfv` FOREIGN KEY (`filter_id`) REFERENCES `filter` (`filter_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `link`
--
ALTER TABLE `link`
ADD CONSTRAINT `dsfsdfgdfdf` FOREIGN KEY (`firstObj`) REFERENCES `object` (`object_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
ADD CONSTRAINT `dsfsdfsdfvcx` FOREIGN KEY (`secondObj`) REFERENCES `object` (`object_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
ADD CONSTRAINT `xcvxc` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `linkconstr`
--
ALTER TABLE `linkconstr`
ADD CONSTRAINT `cvxv` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
ADD CONSTRAINT `dsfsdfs` FOREIGN KEY (`firstObject`) REFERENCES `object` (`object_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
ADD CONSTRAINT `dsfsdfsds` FOREIGN KEY (`secondObject`) REFERENCES `object` (`object_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `object`
--
ALTER TABLE `object`
ADD CONSTRAINT `FK_OBJECT_REFERENCE_PROJECT` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `project`
--
ALTER TABLE `project`
ADD CONSTRAINT `FK_PROJECT_REFERENCE_STUDENT` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `report`
--
ALTER TABLE `report`
ADD CONSTRAINT `FK_REPORT_REFERENCE_PROJECT` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `reporttoobject`
--
ALTER TABLE `reporttoobject`
ADD CONSTRAINT `FK_REPORTTO_REFERENCE_OBJECT` FOREIGN KEY (`object_id`) REFERENCES `object` (`object_id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `FK_REPORTTO_REFERENCE_REPORT` FOREIGN KEY (`report_id`) REFERENCES `report` (`report_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `search`
--
ALTER TABLE `search`
ADD CONSTRAINT `fk2` FOREIGN KEY (`object_id`) REFERENCES `object` (`object_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `searchtoattr`
--
ALTER TABLE `searchtoattr`
ADD CONSTRAINT `cxvxcv` FOREIGN KEY (`search_id`) REFERENCES `search` (`search_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
ADD CONSTRAINT `sdfsdfsdf` FOREIGN KEY (`attribute_id`) REFERENCES `attribute` (`attr_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `sort`
--
ALTER TABLE `sort`
ADD CONSTRAINT `fk22` FOREIGN KEY (`object_id`) REFERENCES `object` (`object_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `sorttoattr`
--
ALTER TABLE `sorttoattr`
ADD CONSTRAINT `dfssd` FOREIGN KEY (`sort_id`) REFERENCES `sort` (`sort_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
ADD CONSTRAINT `ewrwer` FOREIGN KEY (`attribute_id`) REFERENCES `attribute` (`attr_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `sourcefield`
--
ALTER TABLE `sourcefield`
ADD CONSTRAINT `mkey` FOREIGN KEY (`attr_id`) REFERENCES `attribute` (`attr_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `statistic`
--
ALTER TABLE `statistic`
ADD CONSTRAINT `FK_STATISTI_REFERENCE_PROJECT` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `stattoobj`
--
ALTER TABLE `stattoobj`
ADD CONSTRAINT `FK_STATTOOB_REFERENCE_OBJECT` FOREIGN KEY (`object_id`) REFERENCES `object` (`object_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
ADD CONSTRAINT `FK_STATTOOB_REFERENCE_STATISTI` FOREIGN KEY (`statistic_id`) REFERENCES `statistic` (`statistic_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `student`
--
ALTER TABLE `student`
ADD CONSTRAINT `FK_STUDENT_REFERENCE_GROUP` FOREIGN KEY (`group_Id`) REFERENCES `group` (`group_Id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

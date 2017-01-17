-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1
-- Время создания: Ноя 01 2015 г., 17:50
-- Версия сервера: 5.6.26
-- Версия PHP: 5.6.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

--
-- Дамп данных таблицы `actors`
--

INSERT INTO `actors` (`actor_id`, `actor_name`, `project_id`) VALUES
(1, 'Актер', 0),
(2, 'Actor', 0),
(3, 'Actor', 0),
(4, 'Actor', 0),
(5, 'Actor', 0),
(6, 'Actor', 0),
(7, 'Actor', 0);

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `algdeps`
--

INSERT INTO `algdeps` (`dep_id`, `project_id`, `result_field`, `formula`, `name`) VALUES
(3, 0, 3, 'X+Y', 'SFSDFSD'),
(4, 0, 4, 'adfa', 'sdfs');

--
-- Триггеры `algdeps`
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
-- Структура таблицы `attrconstr`
--

CREATE TABLE IF NOT EXISTS `attrconstr` (
  `constr_id` int(11) NOT NULL,
  `comment` longtext,
  `attr_id` int(11) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `name` longtext
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `attrconstr`
--

INSERT INTO `attrconstr` (`constr_id`, `comment`, `attr_id`, `project_id`, `name`) VALUES
(2, '', NULL, 0, 'Мое ограничение');

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

-- --------------------------------------------------------

--
-- Структура таблицы `diagram`
--

CREATE TABLE IF NOT EXISTS `diagram` (
  `diagram_id` int(11) NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `Type` longtext COLLATE utf8_general_mysql500_ci,
  `JSON` longtext COLLATE utf8_general_mysql500_ci
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

--
-- Дамп данных таблицы `diagram`
--

INSERT INTO `diagram` (`diagram_id`, `project_id`, `Type`, `JSON`) VALUES
(5, 0, 'OR', '{"cells":[{"type":"cache.Object","size":{"width":100,"height":40},"position":{"x":104,"y":51},"angle":0,"id":"dbcb4a20-c7b1-4595-b4e1-3ae72255c2be","embeds":"","diagram":"objectRelations","z":1,"attrs":{"text":{"text":"Object"}}},{"type":"cache.Object","size":{"width":100,"height":40},"position":{"x":347,"y":81},"angle":0,"id":"5c64f58b-ba3e-4a06-af11-11c0604fea1a","embeds":"","diagram":"objectRelations","z":2,"attrs":{"text":{"text":"Object"}}},{"type":"cache.Object","size":{"width":100,"height":40},"position":{"x":136,"y":202},"angle":0,"id":"d7c3ab9c-37e6-42ac-8268-743f3ffbdbff","embeds":"","diagram":"objectRelations","z":3,"attrs":{"text":{"text":"Object"}}}]}'),
(6, 0, 'ER', '{"cells":[{"type":"cache.Entity","position":{"x":85,"y":59},"size":{"width":80,"height":40},"angle":0,"id":"f47fa5c7-4633-4ff2-bda8-e746b9ea383e","embeds":"","boundCell":{"id":"439c0836-85df-47d0-9629-b9113e63a58d","diagram":"objectRelations"},"z":1,"attrs":{"text":{"text":"Entity"}}},{"type":"cache.Entity","position":{"x":403,"y":139},"size":{"width":80,"height":40},"angle":0,"id":"cfeb21cf-ea07-4840-a483-109bbd7bf05a","embeds":"","boundCell":{"id":"de419381-ae76-423d-b24e-b8a4f16208d8","diagram":"objectRelations"},"z":2,"attrs":{"text":{"text":"Entity"}}},{"type":"cache.Entity","position":{"x":162,"y":232},"size":{"width":80,"height":40},"angle":0,"id":"26f5307b-3c7b-420a-b982-5ea686ed2f11","embeds":"","boundCell":{"id":"8657eec0-7716-4279-b642-e5fc25859578","diagram":"objectRelations"},"z":3,"attrs":{"text":{"text":"Entity"}}},{"type":"cache.Entity","position":{"x":331,"y":62},"size":{"width":80,"height":40},"angle":0,"id":"4dc080df-62ae-4cc7-8b6f-613f9d135946","embeds":"","boundCell":{"id":"ae283dc3-7684-47cf-9844-446fd9cec3fb","diagram":"objectRelations"},"z":4,"attrs":{"text":{"text":"Entity"}}},{"type":"cache.Entity","position":{"x":104,"y":51},"size":{"width":80,"height":40},"angle":0,"id":"10c97ebb-a182-4372-83bd-e02fcc66d068","embeds":"","boundCell":{"id":"dbcb4a20-c7b1-4595-b4e1-3ae72255c2be","diagram":"objectRelations"},"z":5,"attrs":{"text":{"text":"Entity"}}},{"type":"cache.Entity","position":{"x":347,"y":81},"size":{"width":80,"height":40},"angle":0,"id":"ac591e0a-e818-4f42-b40d-35a435a95ea4","embeds":"","boundCell":{"id":"5c64f58b-ba3e-4a06-af11-11c0604fea1a","diagram":"objectRelations"},"z":6,"attrs":{"text":{"text":"Entity"}}},{"type":"cache.Entity","position":{"x":136,"y":202},"size":{"width":80,"height":40},"angle":0,"id":"3773637b-436e-4396-a4db-740960059e9d","embeds":"","boundCell":{"id":"d7c3ab9c-37e6-42ac-8268-743f3ffbdbff","diagram":"objectRelations"},"z":7,"attrs":{"text":{"text":"Entity"}}}]}'),
(7, 0, 'UC', '{"cells":[{"type":"cache.Actor","position":{"x":213,"y":75},"size":{"width":25,"height":60},"angle":0,"id":"b0b281cf-d7e1-4403-a87e-a16f1e527629","embeds":"","diagram":"usecase","z":1,"selected":false,"renaming":false,"attrs":{"text":{"text":"Actor"}}},{"type":"cache.Service","size":{"width":100,"height":40},"position":{"x":365,"y":67},"angle":0,"id":"62b4bc2b-e78a-4625-a82d-c848ac4089f4","embeds":"","diagram":"usecase","z":2,"attrs":{"text":{"text":"Service"}}},{"type":"link","source":{"id":"b0b281cf-d7e1-4403-a87e-a16f1e527629"},"target":{"id":"62b4bc2b-e78a-4625-a82d-c848ac4089f4"},"labels":[{"position":15,"attrs":{"text":{"text":""}}},{"position":0.5,"attrs":{"text":{"text":""}}},{"position":-15,"attrs":{"text":{"text":""}}}],"id":"fac911e7-b76c-4ad0-8e88-a4aa4d548b0e","z":3,"hovered":false,"attrs":{".connection":{"d":"M 10 0 L 0 5 L 10 10 z"}}}]}');

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

-- --------------------------------------------------------

--
-- Структура таблицы `reporttoattr`
--

CREATE TABLE IF NOT EXISTS `reporttoattr` (
  `attr_id` int(11) DEFAULT NULL,
  `report_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `search`
--

CREATE TABLE IF NOT EXISTS `search` (
  `search_id` int(11) NOT NULL,
  `object_id` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `searchtoattr`
--

CREATE TABLE IF NOT EXISTS `searchtoattr` (
  `search_id` int(11) DEFAULT NULL,
  `attribute_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `sort`
--

CREATE TABLE IF NOT EXISTS `sort` (
  `sort_id` int(11) NOT NULL,
  `object_id` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

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

-- --------------------------------------------------------

--
-- Структура таблицы `statistic`
--

CREATE TABLE IF NOT EXISTS `statistic` (
  `statistic_id` int(11) NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `name` longtext CHARACTER SET utf8
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

--
-- Дамп данных таблицы `statistic`
--

INSERT INTO `statistic` (`statistic_id`, `project_id`, `name`) VALUES
(16, 0, 'Моя статистика'),
(17, 0, 'Стас'),
(18, 0, 'ЫВОРЫВОАРЫВ');

-- --------------------------------------------------------

--
-- Структура таблицы `stattoattr`
--

CREATE TABLE IF NOT EXISTS `stattoattr` (
  `statistic_id` int(11) DEFAULT NULL,
  `attr_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `stattoattr`
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
  ADD PRIMARY KEY (`actor_id`),
  ADD KEY `vjscxbn_idx` (`project_id`);

--
-- Индексы таблицы `algdeps`
--
ALTER TABLE `algdeps`
  ADD PRIMARY KEY (`dep_id`),
  ADD KEY `mykey_idx` (`result_field`),
  ADD KEY `algdeps_projectkey_constr` (`project_id`);

--
-- Индексы таблицы `attrconstr`
--
ALTER TABLE `attrconstr`
  ADD PRIMARY KEY (`constr_id`),
  ADD KEY `dsfsdxcxds_idx` (`attr_id`),
  ADD KEY `xcvxvc_idx` (`project_id`);

--
-- Индексы таблицы `attribute`
--
ALTER TABLE `attribute`
  ADD PRIMARY KEY (`attr_id`),
  ADD KEY `FK_ATTRIBUT_REFERENCE_OBJECT` (`object_id`);

--
-- Индексы таблицы `depstosourfield`
--
ALTER TABLE `depstosourfield`
  ADD KEY `dfsfsd_idx` (`field_id`),
  ADD KEY `cxxcv_idx` (`dep_id`);

--
-- Индексы таблицы `diagram`
--
ALTER TABLE `diagram`
  ADD PRIMARY KEY (`diagram_id`),
  ADD KEY `FK_DIAGRAM_REFERENCE_PROJECT` (`project_id`);

--
-- Индексы таблицы `document`
--
ALTER TABLE `document`
  ADD PRIMARY KEY (`docment_id`),
  ADD KEY `FK_DOCUMENT_REFERENCE_PROJECT` (`project_id`);

--
-- Индексы таблицы `filter`
--
ALTER TABLE `filter`
  ADD PRIMARY KEY (`filter_id`),
  ADD KEY `cxv_idx` (`object_id`);

--
-- Индексы таблицы `filtertoattribute`
--
ALTER TABLE `filtertoattribute`
  ADD KEY `dfv_idx` (`filter_id`),
  ADD KEY `cvxvxcxcv_idx` (`attribute_id`);

--
-- Индексы таблицы `group`
--
ALTER TABLE `group`
  ADD PRIMARY KEY (`group_Id`);

--
-- Индексы таблицы `link`
--
ALTER TABLE `link`
  ADD PRIMARY KEY (`link_id`),
  ADD KEY `dsfsdfgdfdf_idx` (`firstObj`),
  ADD KEY `dsfsdfsdfvcx_idx` (`secondObj`),
  ADD KEY `xcvxc_idx` (`project_id`);

--
-- Индексы таблицы `linkconstr`
--
ALTER TABLE `linkconstr`
  ADD PRIMARY KEY (`constr_id`),
  ADD KEY `dsfsdfs_idx` (`firstObject`),
  ADD KEY `dsfsdfs_idx1` (`secondObject`),
  ADD KEY `cvxv_idx` (`project_id`);

--
-- Индексы таблицы `object`
--
ALTER TABLE `object`
  ADD PRIMARY KEY (`object_id`),
  ADD KEY `FK_OBJECT_REFERENCE_PROJECT` (`project_id`);

--
-- Индексы таблицы `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`project_id`),
  ADD KEY `FK_PROJECT_REFERENCE_STUDENT` (`student_id`);

--
-- Индексы таблицы `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`report_id`),
  ADD KEY `FK_REPORT_REFERENCE_PROJECT` (`project_id`);

--
-- Индексы таблицы `reporttoattr`
--
ALTER TABLE `reporttoattr`
  ADD KEY `FK_REPORTTO_REFERENCE_REPORT` (`report_id`),
  ADD KEY `FK_REPORTTO_REFERENCE_OBJECT_idx` (`attr_id`);

--
-- Индексы таблицы `search`
--
ALTER TABLE `search`
  ADD PRIMARY KEY (`search_id`),
  ADD KEY `fk2_idx` (`object_id`);

--
-- Индексы таблицы `searchtoattr`
--
ALTER TABLE `searchtoattr`
  ADD KEY `sdfsdfsdf_idx` (`attribute_id`),
  ADD KEY `cxvxcv_idx` (`search_id`);

--
-- Индексы таблицы `sort`
--
ALTER TABLE `sort`
  ADD PRIMARY KEY (`sort_id`),
  ADD KEY `fk2_idx` (`object_id`);

--
-- Индексы таблицы `sorttoattr`
--
ALTER TABLE `sorttoattr`
  ADD KEY `ewrwer_idx` (`attribute_id`),
  ADD KEY `dfssd_idx` (`sort_id`);

--
-- Индексы таблицы `sourcefield`
--
ALTER TABLE `sourcefield`
  ADD PRIMARY KEY (`field_id`),
  ADD KEY `mkey_idx` (`attr_id`);

--
-- Индексы таблицы `statistic`
--
ALTER TABLE `statistic`
  ADD PRIMARY KEY (`statistic_id`),
  ADD KEY `FK_STATISTI_REFERENCE_PROJECT` (`project_id`);

--
-- Индексы таблицы `stattoattr`
--
ALTER TABLE `stattoattr`
  ADD KEY `aaaa_idx` (`attr_id`),
  ADD KEY `bbbb_idx` (`statistic_id`);

--
-- Индексы таблицы `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`student_id`),
  ADD KEY `FK_STUDENT_REFERENCE_GROUP` (`group_Id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `actors`
--
ALTER TABLE `actors`
  MODIFY `actor_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT для таблицы `algdeps`
--
ALTER TABLE `algdeps`
  MODIFY `dep_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT для таблицы `attrconstr`
--
ALTER TABLE `attrconstr`
  MODIFY `constr_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT для таблицы `attribute`
--
ALTER TABLE `attribute`
  MODIFY `attr_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT для таблицы `diagram`
--
ALTER TABLE `diagram`
  MODIFY `diagram_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
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
  MODIFY `sort_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT для таблицы `sourcefield`
--
ALTER TABLE `sourcefield`
  MODIFY `field_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT для таблицы `statistic`
--
ALTER TABLE `statistic`
  MODIFY `statistic_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=19;
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
  ADD CONSTRAINT `algdeps_projectkey_constr` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `mykey` FOREIGN KEY (`result_field`) REFERENCES `attribute` (`attr_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

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
-- Ограничения внешнего ключа таблицы `reporttoattr`
--
ALTER TABLE `reporttoattr`
  ADD CONSTRAINT `FK_REPORTTO_REFERENCE_REPORT` FOREIGN KEY (`report_id`) REFERENCES `report` (`report_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `dfsfsf` FOREIGN KEY (`attr_id`) REFERENCES `attribute` (`attr_id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
-- Ограничения внешнего ключа таблицы `stattoattr`
--
ALTER TABLE `stattoattr`
  ADD CONSTRAINT `aaaa` FOREIGN KEY (`attr_id`) REFERENCES `attribute` (`attr_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bbbb` FOREIGN KEY (`statistic_id`) REFERENCES `statistic` (`statistic_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `FK_STUDENT_REFERENCE_GROUP` FOREIGN KEY (`group_Id`) REFERENCES `group` (`group_Id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

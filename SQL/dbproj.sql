--
-- База данных: `dbproj`
--

-- --------------------------------------------------------

--
-- Структура таблицы `actors`
--

CREATE TABLE IF NOT EXISTS `actors` (
  `actor_id` int(11) NOT NULL,
  `name` longtext COLLATE utf8_general_mysql500_ci,
  `project_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `algdeps`
--

CREATE TABLE IF NOT EXISTS `algdeps` (
  `dep_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `element_id` int(11) DEFAULT NULL,
  `formula` longtext,
  `name` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- --------------------------------------------------------

--
-- Структура таблицы `attrconstraint`
--

CREATE TABLE IF NOT EXISTS `attrconstraint` (
  `constraint_id` int(11) NOT NULL,
  `comment` longtext,
  `attr_id` int(11) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `name` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `attribute`
--

CREATE TABLE IF NOT EXISTS `attribute` (
  `attr_id` int(11) NOT NULL,
  `element_id` int(11) DEFAULT NULL,
  `name` longtext COLLATE utf8_general_mysql500_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

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
  `type` longtext COLLATE utf8_general_mysql500_ci,
  `JSON` longtext COLLATE utf8_general_mysql500_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `document`
--

CREATE TABLE IF NOT EXISTS `document` (
  `docment_id` int(11) NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `title` longtext COLLATE utf8_general_mysql500_ci,
  `path` longtext COLLATE utf8_general_mysql500_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `entity`
--

CREATE TABLE IF NOT EXISTS `entity` (
  `entity_id` int(11) NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `name` longtext COLLATE utf8_general_mysql500_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `group`
--

CREATE TABLE IF NOT EXISTS `group` (
  `group_Id` int(11) NOT NULL,
  `Name` longtext COLLATE utf8_general_mysql500_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `inforeq`
--

CREATE TABLE IF NOT EXISTS `inforeq` (
  `inforeq_id` int(11) NOT NULL,
  `attr_id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `project_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Структура таблицы `inforeq_attr`
--

CREATE TABLE IF NOT EXISTS `inforeq_attr` (
  `inforeq_id` int(11) NOT NULL,
  `attr_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Структура таблицы `link`
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
-- Структура таблицы `linkconstraint`
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
-- Структура таблицы `project`
--

CREATE TABLE IF NOT EXISTS `project` (
  `project_id` int(11) NOT NULL,
  `owner_id` int(11) DEFAULT NULL,
  `title` longtext COLLATE utf8_general_mysql500_ci,
  `is_ready` smallint(6) DEFAULT NULL,
  `is_sent` smallint(6) DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_general_mysql500_ci NOT NULL,
  `edited` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `report`
--

CREATE TABLE IF NOT EXISTS `report` (
  `report_id` int(11) NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `name` longtext COLLATE utf8_general_mysql500_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

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
-- Структура таблицы `sourcefield`
--

CREATE TABLE IF NOT EXISTS `sourcefield` (
  `field_id` int(11) NOT NULL,
  `name` longtext,
  `attr_id` int(11) DEFAULT NULL,
  `dep_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `statistic`
--

CREATE TABLE IF NOT EXISTS `statistic` (
  `statistic_id` int(11) NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `name` longtext CHARACTER SET utf8
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `stattoattr`
--

CREATE TABLE IF NOT EXISTS `stattoattr` (
  `statistic_id` int(11) DEFAULT NULL,
  `attr_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(11) NOT NULL,
  `group_Id` int(11) DEFAULT NULL,
  `email` longtext COLLATE utf8_general_mysql500_ci,
  `password` longtext COLLATE utf8_general_mysql500_ci,
  `fullname` longtext COLLATE utf8_general_mysql500_ci,
  `abbr` longtext COLLATE utf8_general_mysql500_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `user_role`
--

CREATE TABLE IF NOT EXISTS `user_role` (
  `role_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  ADD KEY `mykey_idx` (`element_id`),
  ADD KEY `algdeps_projectkey_constr` (`project_id`);

--
-- Индексы таблицы `attrconstraint`
--
ALTER TABLE `attrconstraint`
  ADD PRIMARY KEY (`constraint_id`),
  ADD KEY `dsfsdxcxds_idx` (`attr_id`),
  ADD KEY `xcvxvc_idx` (`project_id`);

--
-- Индексы таблицы `attribute`
--
ALTER TABLE `attribute`
  ADD PRIMARY KEY (`attr_id`),
  ADD KEY `FK_ATTRIBUT_REFERENCE_OBJECT` (`element_id`);

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
-- Индексы таблицы `entity`
--
ALTER TABLE `entity`
  ADD PRIMARY KEY (`entity_id`),
  ADD KEY `FK_OBJECT_REFERENCE_PROJECT` (`project_id`);

--
-- Индексы таблицы `group`
--
ALTER TABLE `group`
  ADD PRIMARY KEY (`group_Id`);

--
-- Индексы таблицы `inforeq`
--
ALTER TABLE `inforeq`
  ADD PRIMARY KEY (`inforeq_id`),
  ADD KEY `project_id` (`project_id`);

--
-- Индексы таблицы `link`
--
ALTER TABLE `link`
  ADD PRIMARY KEY (`link_id`),
  ADD KEY `dsfsdfgdfdf_idx` (`first_el_id`),
  ADD KEY `dsfsdfsdfvcx_idx` (`second_el_id`),
  ADD KEY `xcvxc_idx` (`project_id`);

--
-- Индексы таблицы `linkconstraint`
--
ALTER TABLE `linkconstraint`
  ADD PRIMARY KEY (`constr_id`),
  ADD KEY `dsfsdfs_idx` (`first_element`),
  ADD KEY `dsfsdfs_idx1` (`second_element`),
  ADD KEY `cvxv_idx` (`project_id`);

--
-- Индексы таблицы `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`project_id`),
  ADD KEY `FK_PROJECT_REFERENCE_STUDENT` (`owner_id`);

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
-- Индексы таблицы `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `FK_STUDENT_REFERENCE_GROUP` (`group_Id`);

--
-- Индексы таблицы `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`role_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `actors`
--
ALTER TABLE `actors`
  MODIFY `actor_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `algdeps`
--
ALTER TABLE `algdeps`
  MODIFY `dep_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `attrconstraint`
--
ALTER TABLE `attrconstraint`
  MODIFY `constraint_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `attribute`
--
ALTER TABLE `attribute`
  MODIFY `attr_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `diagram`
--
ALTER TABLE `diagram`
  MODIFY `diagram_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `document`
--
ALTER TABLE `document`
  MODIFY `docment_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `entity`
--
ALTER TABLE `entity`
  MODIFY `entity_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `group`
--
ALTER TABLE `group`
  MODIFY `group_Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `inforeq`
--
ALTER TABLE `inforeq`
  MODIFY `inforeq_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `link`
--
ALTER TABLE `link`
  MODIFY `link_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `linkconstraint`
--
ALTER TABLE `linkconstraint`
  MODIFY `constr_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `project`
--
ALTER TABLE `project`
  MODIFY `project_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `report`
--
ALTER TABLE `report`
  MODIFY `report_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `sourcefield`
--
ALTER TABLE `sourcefield`
  MODIFY `field_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `statistic`
--
ALTER TABLE `statistic`
  MODIFY `statistic_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `user_role`
--
ALTER TABLE `user_role`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `actors`
--
ALTER TABLE `actors`
  ADD CONSTRAINT `actors_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`);

--
-- Ограничения внешнего ключа таблицы `algdeps`
--
ALTER TABLE `algdeps`
  ADD CONSTRAINT `algdeps_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`),
  ADD CONSTRAINT `mykey` FOREIGN KEY (`element_id`) REFERENCES `attribute` (`attr_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `attrconstraint`
--
ALTER TABLE `attrconstraint`
  ADD CONSTRAINT `attrconstraint_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`),
  ADD CONSTRAINT `dsfsdxcxds` FOREIGN KEY (`attr_id`) REFERENCES `attribute` (`attr_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `attribute`
--
ALTER TABLE `attribute`
  ADD CONSTRAINT `FK_ATTRIBUTE_REFERENCE_ENTITY` FOREIGN KEY (`element_id`) REFERENCES `entity` (`entity_id`),
  ADD CONSTRAINT `FK_ATTRIBUT_REFERENCE_OBJECT` FOREIGN KEY (`element_id`) REFERENCES `entity` (`entity_id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
  ADD CONSTRAINT `diagram_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`);

--
-- Ограничения внешнего ключа таблицы `document`
--
ALTER TABLE `document`
  ADD CONSTRAINT `document_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`);

--
-- Ограничения внешнего ключа таблицы `entity`
--
ALTER TABLE `entity`
  ADD CONSTRAINT `entity_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`);

--
-- Ограничения внешнего ключа таблицы `inforeq`
--
ALTER TABLE `inforeq`
  ADD CONSTRAINT `inforeq_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`);

--
-- Ограничения внешнего ключа таблицы `link`
--
ALTER TABLE `link`
  ADD CONSTRAINT `dsfsdfgdfdf` FOREIGN KEY (`first_el_id`) REFERENCES `entity` (`entity_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `dsfsdfsdfvcx` FOREIGN KEY (`second_el_id`) REFERENCES `entity` (`entity_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `link_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`);

--
-- Ограничения внешнего ключа таблицы `linkconstraint`
--
ALTER TABLE `linkconstraint`
  ADD CONSTRAINT `dsfsdfs` FOREIGN KEY (`first_element`) REFERENCES `entity` (`entity_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `dsfsdfsds` FOREIGN KEY (`second_element`) REFERENCES `entity` (`entity_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `linkconstraint_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`);

--
-- Ограничения внешнего ключа таблицы `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `FK_PROJECT_REFERENCE_STUDENT` FOREIGN KEY (`owner_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `report`
--
ALTER TABLE `report`
  ADD CONSTRAINT `report_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`);

--
-- Ограничения внешнего ключа таблицы `reporttoattr`
--
ALTER TABLE `reporttoattr`
  ADD CONSTRAINT `FK_REPORTTO_REFERENCE_REPORT` FOREIGN KEY (`report_id`) REFERENCES `report` (`report_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `dfsfsf` FOREIGN KEY (`attr_id`) REFERENCES `attribute` (`attr_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `sourcefield`
--
ALTER TABLE `sourcefield`
  ADD CONSTRAINT `mkey` FOREIGN KEY (`attr_id`) REFERENCES `attribute` (`attr_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `statistic`
--
ALTER TABLE `statistic`
  ADD CONSTRAINT `statistic_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`);

--
-- Ограничения внешнего ключа таблицы `stattoattr`
--
ALTER TABLE `stattoattr`
  ADD CONSTRAINT `aaaa` FOREIGN KEY (`attr_id`) REFERENCES `attribute` (`attr_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bbbb` FOREIGN KEY (`statistic_id`) REFERENCES `statistic` (`statistic_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_STUDENT_REFERENCE_GROUP` FOREIGN KEY (`group_Id`) REFERENCES `group` (`group_Id`) ON DELETE CASCADE ON UPDATE CASCADE;



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
DELIMITER;


/**
            * Функция Скрывает/Показывает блок
            * @author ox2.ru дизайн студия
            **/
            function showHide(element_id, element2_id) {
                //Если элемент с id-шником element_id существует
                if (document.getElementById(element_id) && document.getElementById(element2_id)) {
                    //Записываем ссылку на элемент в переменную obj
                    var obj = document.getElementById(element_id);
                    var obj2 = document.getElementById(element2_id);
                    obj2.style.display = "none";
                    //Если css-свойство display не block, то:
                    if (obj.style.display != "block") {
                        obj.style.display = "block"; //Показываем элемент
                    }
                    else obj.style.display = "none"; //Скрываем элемент
                }
                //Если элемент с id-шником element_id не найден, то выводим сообщение
                else alert("Элемент с id: " + element_id + " не найден!");
            }

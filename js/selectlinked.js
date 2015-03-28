/*
wwww.tigir.com (дата последней модификации - 30.11.2007)
Библиотека linkedselect.js из статьи "Javascript SELECT - динамические списки" - http://www.tigir.com/linked_select.htm

syncList - "класс" связанных списков
*/
function syncList(){} //Определяем функцию конструктор

//Определяем методы

//Метод sync() - принимает список из значений атрибутов id элементов SELECT, образующих связанный список и запускает их синхронизацию
syncList.prototype.sync = function()
{
	//Перебираем аргументы (id элементов SELECT) и назначаем событиям onChange селектов, с соответствующими id, функцию-обработчик. 
	//В качестве обработчика выступает второй метод объекта syncList - _sync (напрямую его вызывать не нужно) 
	//Обработчик назначается всем элементам SELECT кроме последнего в списке аргументов, т.к. последний не влияет ни на какой другой элемент SELECT и с ним не нужно синхронизироваться.
	for (var i=0; i < arguments.length-1; i++)	document.getElementById(arguments[i]).onchange = (function (o,id1,id2){return function(){o._sync(id1,id2);};})(this, arguments[i], arguments[i+1]);
	document.getElementById(arguments[0]).onchange();//запускаем обработчик onchange первого селекта, чтобы при загрузке страницы заполнить дочерние селекты значениями.
}
//служебный метод _sync - срабатывает при смене выбранного элемента в текущем (старшем) элементе SELECT (по его событию onChange) и изменяет содержимое зависимого селекта на основании значения выбранного в старшем селекте.
syncList.prototype._sync = function (firstSelectId, secondSelectId)
{
	var firstSelect = document.getElementById(firstSelectId);
	var secondSelect = document.getElementById(secondSelectId);

	secondSelect.length = 0; //обнуляем второй (подчиненный) SELECT
	
	if (firstSelect.length>0)//если первый (старший) SELECT не пуст
	{
		//из свойства dataList, с данными для заполнения подчиненных селектов, берем ту часть данных, которая соответствует именно значению элемента, 
		//выбранного в первом селекте, и определяет содержимое подчиненного элемента SELECT.
		var optionData = this.dataList[ firstSelect.options[firstSelect.selectedIndex==-1 ? 0 : firstSelect.selectedIndex].value ];
		//заполняем второй (подчиненный) селект значениями (создаем элементы option)
		for (var key in optionData || null) secondSelect.options[secondSelect.length] = new Option(optionData[key], key);
		
		//если в старшем SELECT-е нет выделенного пункта, выделяем первый
		if (firstSelect.selectedIndex == -1) setTimeout( function(){ firstSelect.options[0].selected = true;}, 1 );
		//если во втором списке нет выделенного пункта, выделяем первый его пункт
		if (secondSelect.length>0) setTimeout( function(){ secondSelect.options[0].selected = true;}, 1 );
	}
	//если второй (подчиненный) селект имеет в свою очередь свои подчиненные селекты (те, для которых он главный), 
	//то запускаем его обработчик onchange, чтобы изменить его подчиненные селекты
	secondSelect.onchange && secondSelect.onchange();
};

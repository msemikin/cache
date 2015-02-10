function setPageToRed() {
    document.getElementById("mainDiv").setAttribute("class", "mainBlockTeacher");
}

function setPageToGreen() {
    document.getElementById("mainDiv").setAttribute("class", "mainBlock");
}

$(document).ready(function(){
	$("#login_form").submit(function() {
	        // указываем класс process для div-а сообщений и плавно показываем его
	        $("#login_result").removeClass().addClass('process').text('Проверка....').fadeIn(1000);
	        // проверяем через AJAX имя пользователя пароль
	        $.post($("#login_form").attr('action'), { username:$('#username').val(),password:$('#password').val(),rand:Math.random() } ,function(data) {
				if(data==1) {
					// логин верный
					$("#login_result").fadeTo(200,0.1,function() {
					$(this).html('Редирект.....').removeClass().addClass('success').fadeTo(900,1,
						function() {
							document.location='../pg/workenv.html';
						});
					});
				} else {
					// логин неверный
					$("#login_result").fadeTo(200,0.1,function(){
						$(this).html('Логин неверен ...').removeClass().addClass('error').fadeTo(900,1);
					});
				}
			});
			return false;// отмена отправки формы (действие по умолчанию)
	});
});

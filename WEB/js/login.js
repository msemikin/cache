var typeof_user = "student";
function setPageToRed() {
    typeof_user = "teacher";
    document.getElementById("mainDiv").setAttribute("class", "mainBlockTeacher");
}

function setPageToGreen() {
    typeof_user = "student";
    document.getElementById("mainDiv").setAttribute("class", "mainBlock");
}

$(document).ready(function(){
	$("#login_form").submit(function() {
	        // указываем класс process для div-а сообщений и плавно показываем его
	        $("#login_result").removeClass().addClass('process').text('Проверка....').fadeIn(1000);
	        // проверяем через AJAX имя пользователя пароль
	        $.post($("#login_form").attr('action'), { username:$('#username').val(),password:$('#password').val(),rand:Math.random(), usertype: typeof_user } ,function(data) {
				if(data==1) {
					// логин верный= student
					$("#login_result").fadeTo(200,0.1,function() {
					$(this).html('Редирект.....').removeClass().addClass('success').fadeTo(900,1,
						function() {
							document.location='../pg/workenv.html';
						});
					});
				}
                else if (data==2)
                {
                    // логин верный= teacher
					$("#login_result").fadeTo(200,0.1,function() {
					$(this).html('Редирект.....').removeClass().addClass('success').fadeTo(900,1,
						function() {
							document.location='../pg/teacherenv.html';
						});
					});
                }
                else {
					// логин неверный
					$("#login_result").fadeTo(200,0.1,function(){
						$(this).html('Логин неверен ...').removeClass().addClass('error').fadeTo(900,1);
					});
				}
			});
			return false;// отмена отправки формы (действие по умолчанию)
	});
});

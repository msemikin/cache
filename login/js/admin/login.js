$(document).ready(function() {
	// Initialize events
	$("#login_form").validate({
		rules: {
			"email":{
				"email": true,
				"required": true
			},
			"passwd": {
				"required": true
			}
		},
		submitHandler: function(form) {
			doAjaxLogin($('#redirect').val());
		},
		// override jquery validate plugin defaults for bootstrap 3
		highlight: function(element) {
			$(element).closest('.form-group').addClass('has-error');
		},
		unhighlight: function(element) {
			$(element).closest('.form-group').removeClass('has-error');
		},
		errorElement: 'span',
		errorClass: 'help-block',
		errorPlacement: function(error, element) {
			if(element.parent('.input-group').length) {
				error.insertAfter(element.parent());
			} else {
				error.insertAfter(element);
			}
		}
	});

	$("#forgot_password_form").validate({
		rules: {
			"email_forgot": {
				"email": true,
				"required": true
			}
		},
		submitHandler: function(form) {
		  doAjaxForgot();
		},
		// override jquery validate plugin defaults for bootstrap 3
		highlight: function(element) {
			$(element).closest('.form-group').addClass('has-error');
		},
		unhighlight: function(element) {
			$(element).closest('.form-group').removeClass('has-error');
		},
		errorElement: 'span',
		errorClass: 'help-block',
		errorPlacement: function(error, element) {
			if(element.parent('.input-group').length) {
				error.insertAfter(element.parent());
			} else {
				error.insertAfter(element);
			}
		}
	});

	$('#email').focus();

	//Tab-index loop
	$('form').each(function(){
		var list  = $(this).find('*[tabindex]').sort(function(a,b){ return a.tabIndex < b.tabIndex ? -1 : 1; }),
			first = list.first();
		list.last().on('keydown', function(e){
			if( e.keyCode === 9 ) {
				first.focus();
				return false;
			}
		});
	});
});
/**
 * Check user credentials
 *
 * @param string redirect name of the controller to redirect to after login (or null)
 */
function doAjaxLogin(redirect) {
	$('#error').hide();
	$('#login_form').fadeIn('slow', function() {
		$.ajax({
			type: "POST",
			headers: { "cache-control": "no-cache" },
			url: "ajax-tab.php" + '?rand=' + new Date().getTime(),
			async: true,
			dataType: "json",
			data: {
				ajax: "1",
				token: "",
				controller: "AdminLogin",
				submitLogin: "1",
				passwd: $('#passwd').val(),
				email: $('#email').val(),
				redirect: redirect,
				stay_logged_in: $('#stay_logged_in:checked').val()
			},
			beforeSend: function() {
				feedbackSubmit();
				l.start();
			},
			success: function(jsonData) {
				if (jsonData.hasErrors) {
					displayErrors(jsonData.errors);
					l.stop();
				} else {
					window.location.assign(jsonData.redirect);
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				l.stop();
				$('#error').html('<h3>TECHNICAL ERROR:</h3><p>Details: Error thrown: ' + XMLHttpRequest + '</p><p>Text status: ' + textStatus + '</p>').removeClass('hide');
				$('#login_form').fadeOut('slow');
			}
		});
	});
}

function displayErrors(errors) {
	str_errors = '<p><strong>' + (errors.length > 1 ? more_errors : one_error) + '</strong></p><ol>';
	for (var error in errors) //IE6 bug fix
		if (error != 'indexOf') str_errors += '<li>' + errors[error] + '</li>';
	$('#error').html(str_errors + '</ol>').removeClass('hide').fadeIn('slow');
}

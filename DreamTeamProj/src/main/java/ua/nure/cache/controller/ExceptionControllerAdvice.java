package ua.nure.cache.controller;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import ua.nure.cache.exception.ErrorResponse;

@ControllerAdvice
public class ExceptionControllerAdvice extends ResponseEntityExceptionHandler {

	@ExceptionHandler({ RuntimeException.class })
	public ResponseEntity<ErrorResponse> handleException(RuntimeException e, WebRequest request) {
		return new ResponseEntity<>(new ErrorResponse(HttpStatus.BAD_REQUEST.value(),
				e.getMessage()), HttpStatus.BAD_REQUEST);
	}
}

package ua.nure.cache.controller;

import org.apache.log4j.Logger;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import ua.nure.cache.exception.ErrorResponse;

@ControllerAdvice
public class ExceptionControllerAdvice extends ResponseEntityExceptionHandler {

	@ExceptionHandler({ RuntimeException.class, Exception.class })
	public ResponseEntity<ErrorResponse> handleRuntimeException(RuntimeException e, WebRequest request) {
		e.printStackTrace();
		return new ResponseEntity<>(new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(),
				e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@ExceptionHandler({ ConstraintViolationException.class })
	public ResponseEntity<ErrorResponse> handleConstraintViolationException(ConstraintViolationException e, WebRequest request) {
		e.printStackTrace();
		return new ResponseEntity<>(new ErrorResponse(HttpStatus.BAD_REQUEST.value(),
				e.getLocalizedMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
	}

}

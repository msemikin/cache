package ua.nure.cache.controller;

import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ExceptionControllerAdvice {

    final Logger logger = Logger.getLogger(ExceptionControllerAdvice.class);
	@ExceptionHandler(HttpMessageNotReadableException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public void handle(HttpMessageNotReadableException e) {
		logger.error("Returning HTTP 400 Bad Request", e);
	}
//
//	@ExceptionHandler({ RuntimeException.class, Exception.class })
//	public ResponseEntity<ErrorResponse> handleRuntimeException(RuntimeException e, WebRequest request) {
//		e.printStackTrace();
//		return new ResponseEntity<>(new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(),
//				e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
//	}
//
//	@ExceptionHandler({ ConstraintViolationException.class })
//	public ResponseEntity<ErrorResponse> handleConstraintViolationException(ConstraintViolationException e, WebRequest request) {
//		e.printStackTrace();
//		return new ResponseEntity<>(new ErrorResponse(HttpStatus.BAD_REQUEST.value(),
//				e.getLocalizedMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
//	}

}

package ua.nure.cache.config;

import org.springframework.data.rest.core.RepositoryConstraintViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler({ RepositoryConstraintViolationException.class })
    public ResponseEntity<ValidationErrorMessage> handleAccessDeniedException(
            RepositoryConstraintViolationException ex, WebRequest request) {
        return new ResponseEntity<>(
                new ValidationErrorMessage(ex),
                new HttpHeaders(),
                HttpStatus.BAD_REQUEST
        );
    }
}

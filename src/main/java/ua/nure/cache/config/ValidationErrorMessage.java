package ua.nure.cache.config;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.rest.core.RepositoryConstraintViolationException;
import org.springframework.validation.FieldError;

import java.util.ArrayList;
import java.util.List;

public class ValidationErrorMessage {
    private final List<ValidationError> errors = new ArrayList<>();

    public ValidationErrorMessage(RepositoryConstraintViolationException exception) {

        for (FieldError fieldError : exception.getErrors().getFieldErrors()) {

            this.errors.add(new ValidationError(fieldError.getObjectName(), fieldError.getField(),
                    fieldError.getRejectedValue(), fieldError.getCode()));
        }
    }

    @JsonProperty("errors")
    public List<ValidationError> getErrors() {
        return errors;
    }

    public static class ValidationError {
        private final String entity;
        private final String property;
        private final Object invalidValue;
        private final String message;

        public ValidationError(String entity, String property, Object invalidValue, String message) {
            this.entity = entity;
            this.property = property;
            this.invalidValue = invalidValue;
            this.message = message;
        }

        public String getEntity() {
            return entity;
        }

        public String getProperty() {
            return property;
        }

        public Object getInvalidValue() {
            return invalidValue;
        }

        public String getMessage() {
            return message;
        }
    }
}

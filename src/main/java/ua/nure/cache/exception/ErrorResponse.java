package ua.nure.cache.exception;

public class ErrorResponse {

	private int code;
	private String message;

	public ErrorResponse() {

	}

	public ErrorResponse(final int code, final String message) {
		this.code = code;
		this.message = message;
	}

	public int getCode() {
		return code;
	}

	public void setCode(final int code) {
		this.code = code;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(final String message) {
		this.message = message;
	}
}

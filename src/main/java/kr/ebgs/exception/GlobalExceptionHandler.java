package kr.ebgs.exception;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.NoHandlerFoundException;

@ControllerAdvice
public class GlobalExceptionHandler {


	@ExceptionHandler(RuntimeException.class)
	public void runtimeException(RuntimeException e, HttpServletResponse response) {
		e.printStackTrace();
		try {
			response.sendError(401);
		} catch (IOException ioe) {
			ioe.printStackTrace();
		}
	}

	@ExceptionHandler(NumberFormatException.class)
	public void numberFormatException(NumberFormatException e, HttpServletResponse response) {
		e.printStackTrace();
		try {
			response.sendError(404);
		} catch (IOException ioe) {
			ioe.printStackTrace();
		}
	}

	@ExceptionHandler(NoHandlerFoundException.class)
	public void noHandlerFoundException(NoHandlerFoundException e, HttpServletResponse response) {
		e.printStackTrace();
		try {
			response.sendError(404);
		} catch (IOException ioe) {
			ioe.printStackTrace();
		}
	}

	@ExceptionHandler(Exception.class)
	public void exception(Exception e, HttpServletResponse response) {
		e.printStackTrace();
		try {
			response.sendError(500);
		} catch (IOException ioe) {
			ioe.printStackTrace();
		}
	}
}
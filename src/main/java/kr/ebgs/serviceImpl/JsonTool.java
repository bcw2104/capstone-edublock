package kr.ebgs.serviceImpl;

import java.util.ArrayList;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonTool <T>{

	public static<T> String convertToJson(ArrayList<T> list) throws JsonProcessingException {
		ObjectMapper objectMapper = new ObjectMapper();
		ArrayList<String> array = new ArrayList<String>();

		for(T ele : list) {
			String jsonObj = objectMapper.writeValueAsString(ele);
			array.add(jsonObj);
		}

		return array.toString();
	}
}

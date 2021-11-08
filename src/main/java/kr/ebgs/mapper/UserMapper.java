package kr.ebgs.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import kr.ebgs.dto.UserDTO;

@Mapper
public interface UserMapper {
	public ArrayList<UserDTO> select(UserDTO userDTO);
	public void modify(UserDTO userDTO);
	public void insert(UserDTO userDTO);
	public void promote(String userId);
	public void confirm(String userId);
	public void changeConfirmKey(UserDTO userDTO);
	public void delete(String userId);
}

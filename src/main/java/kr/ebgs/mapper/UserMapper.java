package kr.ebgs.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import kr.ebgs.dto.UserDTO;

@Mapper
public interface UserMapper {
	public ArrayList<UserDTO> select();
	public void modify(UserDTO userDTO);
	public void insert(UserDTO userDTO);
	public void delete(UserDTO userDTO);
}

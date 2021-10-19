package kr.ebgs.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import kr.ebgs.dto.CenterPostDTO;

@Mapper
public interface CenterPostMapper {
	public int count(CenterPostDTO centerPostDTO);
	public ArrayList<CenterPostDTO> select(int postId);
	public ArrayList<CenterPostDTO> selectList(CenterPostDTO centerPostDTO);
	public void modify(CenterPostDTO centerPostDTO);
	public void insert(CenterPostDTO centerPostDTO);
	public void confirm(String confirmKey);
	public void changeConfirmKey(CenterPostDTO centerPostDTO);
	public void delete(int userId);
}

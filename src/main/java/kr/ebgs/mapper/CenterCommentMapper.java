package kr.ebgs.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import kr.ebgs.dto.CenterCommentDTO;

@Mapper
public interface CenterCommentMapper {
	public ArrayList<CenterCommentDTO> select(CenterCommentDTO centerCommentDTO);

	public void insert(CenterCommentDTO centerCommentDTO);

	public void delete(int commentId);
}

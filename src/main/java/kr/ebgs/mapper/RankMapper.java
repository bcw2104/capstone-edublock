package kr.ebgs.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import kr.ebgs.dto.RankDTO;

@Mapper
public interface RankMapper {
	public ArrayList<RankDTO> select(String userId);
	public ArrayList<RankDTO> selectAll();
}

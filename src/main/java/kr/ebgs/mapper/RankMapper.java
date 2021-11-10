package kr.ebgs.mapper;

import java.util.ArrayList;
import java.util.HashMap;

import org.apache.ibatis.annotations.Mapper;

import kr.ebgs.dto.RankDTO;

@Mapper
public interface RankMapper {
	public ArrayList<RankDTO> select(HashMap<String, Object> hashmap);
	public ArrayList<RankDTO> selectAll(int gameId);
}

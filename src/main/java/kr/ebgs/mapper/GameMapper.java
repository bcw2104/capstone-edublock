package kr.ebgs.mapper;

import java.util.ArrayList;
import java.util.HashMap;

import org.apache.ibatis.annotations.Mapper;

import kr.ebgs.dto.GameInfoDTO;
import kr.ebgs.dto.GameTypeDTO;
import kr.ebgs.dto.RankDTO;

@Mapper
public interface GameMapper {
	public ArrayList<GameTypeDTO> selectGameType();
	public ArrayList<GameInfoDTO> selectGameInfo(GameInfoDTO gameInfoDTO);
	public void addGameRecord(HashMap<String, Object> hashMap);
}

package kr.ebgs.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import kr.ebgs.dto.GameInfoDTO;
import kr.ebgs.dto.GameRecordDTO;
import kr.ebgs.dto.GameTypeDTO;

@Mapper
public interface GameMapper {
	public ArrayList<GameTypeDTO> selectGameType(GameTypeDTO gameTypeDTO);
	public ArrayList<GameInfoDTO> selectGameInfo(GameInfoDTO gameInfoDTO);
	public ArrayList<GameInfoDTO> selectHotGameInfo();
	public ArrayList<GameInfoDTO> selectNewGameInfo();
	public ArrayList<GameRecordDTO> selectGameRecord(GameRecordDTO gameRecordDTO);
	public void addGameContent(GameInfoDTO gameInfoDTO);
	public void addGameRecord(GameRecordDTO gameRecordDTO);
}

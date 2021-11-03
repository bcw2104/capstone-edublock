package kr.ebgs.serviceImpl;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.ebgs.dto.RankDTO;
import kr.ebgs.mapper.RankMapper;

@Service
public class GameService {
	@Autowired
	private RankMapper rankMapper;

	public ArrayList<RankDTO> getRankList(){
		return rankMapper.selectAll();
	}

	public RankDTO getUserRank(String userId){
		ArrayList<RankDTO> list = rankMapper.select(userId);

		if(list.isEmpty()) return null;

		return list.get(0);
	}

}

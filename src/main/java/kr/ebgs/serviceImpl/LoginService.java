package kr.ebgs.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.ebgs.util.SecureTool;

@Service
public class LoginService {

	@Autowired
	private SecureTool secureTool;

	public boolean checkUserPassword(String pw, String encryptedPw,String salt) throws Exception {
		return encryptedPw.equals(secureTool.encrypt(pw,salt));
	}

}

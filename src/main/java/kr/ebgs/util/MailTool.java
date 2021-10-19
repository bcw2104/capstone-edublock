package kr.ebgs.util;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;

public class MailTool {
	@Value("${mail.title}")
	private String mailTitle;
	@Value("${mail.username}")
	private String sender;

	@Autowired
	private JavaMailSender mailSender;

	@Async
	public void sendConfirmMail(String to,String confirmKey) throws Exception {
		MimeMessage message = mailSender.createMimeMessage();


		String subject = mailTitle+ " 이메일 인증";

		StringBuffer page = new StringBuffer();
		page.append("<html>");
		page.append("<body>");
		page.append("<div style='width: 500px; min-height: 300e px; padding : 50px; box-shadow: 1px 1px 3px 0 rgba(82, 62, 62, 0.4);"
				+ "font-family: Arial, Helvetica, sans-serif;'>");
		page.append("<div style='padding: 20px 0 10px 0; border-bottom: 5px solid #0059ab; font-weight: bold; font-size: 1.3rem; margin-bottom: 10px;'>"+mailTitle+" 이메일 인증</div>");
		page.append("<div style='margin: 30px 0px;font-size: 18px;'>아래의 버튼을 클릭하시면 이메일 인증이 완료됩니다.</div>");
		page.append("<a href='"+GlobalValues.protocol+GlobalValues.domain+"/user/confirm?key="+confirmKey+"'>"
				+ "<button type='button' style='cursor: pointer;color: #fff;background-color: #007bff;font-size: 1rem;width: 200px;height: 50px;line-height: 50px;font-weight: bold;border-radius: .25rem;'>인증하기</button>"
				+ "</a><br/>");
		page.append("</div>");
		page.append("</div>");
		page.append("</body>");
		page.append("</html>");

		MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");
		messageHelper.setFrom(sender, mailTitle);
		messageHelper.setSubject(subject);
		messageHelper.setTo(to);
		messageHelper.setText(page.toString(), true);

		mailSender.send(message);
	}



}

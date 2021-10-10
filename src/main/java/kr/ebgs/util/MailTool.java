package kr.ebgs.util;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;

public class MailTool {
	@Value("${mail.title}")
	private String mailTitle;
	@Value("${mail.username}")
	private String sender;

	@Qualifier("mailSender")
	private JavaMailSender mailSender;

	@Async
	public void sendAdminInfoMail(String to,String id,String pw) throws Exception {
		MimeMessage message = mailSender.createMimeMessage();


		String subject = mailTitle+ " 계정 찾기";

		StringBuffer page = new StringBuffer();


		MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");
		messageHelper.setFrom(sender, mailTitle);
		messageHelper.setSubject(subject);
		messageHelper.setTo(to);
		messageHelper.setText(page.toString(), true);

		mailSender.send(message);
	}

	public void sendConfirmMail(String to,String code) throws Exception {
		MimeMessage message = mailSender.createMimeMessage();


		String subject = mailTitle+ " 이메일 변경 인증메일";

		StringBuffer page = new StringBuffer();



		MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");
		messageHelper.setFrom(sender, mailTitle);
		messageHelper.setSubject(subject);
		messageHelper.setTo(to);
		messageHelper.setText(page.toString(), true);

		mailSender.send(message);
	}

}

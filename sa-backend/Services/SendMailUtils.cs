using System.Net;
using System.Net.Mail;

namespace sentiment_analysis_be.Services;

public class SendMailUtils
{
    private readonly IConfiguration _configuration;

    public SendMailUtils(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public void SendEmail(string senderEmail, string subject, string mailBody)
    {
        var client = new SmtpClient("smtp.mailtrap.io", 2525)
        {
            Credentials = new NetworkCredential(
                _configuration.GetSection("MailtrapCredentials:Username").Value,
                _configuration.GetSection("MailtrapCredentials:Password").Value),
            EnableSsl = true
        };
        
        client.Send(_configuration.GetSection("MailtrapCredentials:Email").Value, senderEmail, subject, mailBody);
    }
}
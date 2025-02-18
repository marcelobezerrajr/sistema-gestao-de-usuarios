from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from fastapi import HTTPException
from dotenv import load_dotenv
import smtplib
import logging
import os

load_dotenv()

SMTP_SERVER = os.getenv("SMTP_SERVER")
SMTP_PORT = os.getenv("SMTP_PORT")
SMTP_USERNAME = os.getenv("SMTP_USERNAME")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
EMAIL_FROM = os.getenv("EMAIL_FROM")
RESET_PASSWORD_URL = os.getenv("RESET_PASSWORD_URL")

if not all(
    [
        SMTP_SERVER,
        SMTP_PORT,
        SMTP_USERNAME,
        SMTP_PASSWORD,
        EMAIL_FROM,
        RESET_PASSWORD_URL,
    ]
):
    raise ValueError(
        "Some environment variable responsible for sending email was not defined.."
    )

logger = logging.getLogger(__name__)


def send_email(to_address: str, subject: str, body: str, image_path: str = None):
    try:
        msg = MIMEMultipart("related")
        msg["From"] = EMAIL_FROM
        msg["To"] = to_address
        msg["Subject"] = subject

        msg_alternative = MIMEMultipart("alternative")
        msg.attach(msg_alternative)
        msg_alternative.attach(MIMEText(body, "html"))

        if image_path:
            with open(image_path, "rb") as img:
                mime_image = MIMEImage(img.read())
                mime_image.add_header("Content-ID", "<logo>")
                mime_image.add_header(
                    "Content-Disposition", "inline", filename="logo.png"
                )
                msg.attach(mime_image)

        server = smtplib.SMTP(SMTP_SERVER, int(SMTP_PORT))
        server.ehlo()
        server.starttls()
        server.ehlo()
        server.login(SMTP_USERNAME, SMTP_PASSWORD)
        server.sendmail(EMAIL_FROM, to_address, msg.as_string())
        server.quit()

        logger.info(f"Email successfully sent to: {to_address}")
    except smtplib.SMTPException as e:
        logger.error(f"Failed to send email: {e}")
        raise HTTPException(
            status_code=500,
            detail="Failed to send email. Please try again later.",
        )


def send_reset_password_email(email: str, token: str):
    reset_link = f"{RESET_PASSWORD_URL}?access_token={token}"
    subject = "Marcelo Developer: Reset your Password"
    body = f"""
    <html>
    <body style="font-family: DM Sans, sans-serif; color: #333; margin: 0; padding: 0;">
        <table role="presentation" width="100%" bgcolor="#f0f2f5" cellpadding="0" cellspacing="0" border="0" style="padding: 20px;">
            <tr>
                <td align="center">
                    <table role="presentation" width="600" bgcolor="#ffffff" cellpadding="0" cellspacing="0" border="0" style="border-radius: 8px; border: 1px solid #ddd; padding: 20px;">

                        <!-- Header -->
                        <tr>
                            <td align="center" style="border-bottom: 2px solid #081a89; padding-bottom: 15px;">
                                <img src="cid:logo" alt="Logo Marcelo Developer" width="150" style="display: block; margin: auto;">
                            </td>
                        </tr>

                        <!-- Body -->
                        <tr>
                            <td style="padding: 20px; text-align: center;">
                                <h2 style="color: #081a89; margin-bottom: 20px;">Password Reset Request</h2>
                                <p style="font-size: 16px; line-height: 1.5;">Hi,</p>
                                <p style="font-size: 16px; line-height: 1.5;">
                                    You recently requested to reset your account password. Click the button below to reset it:
                                </p>
                                <p style="text-align: center; margin: 20px 0;">
                                    <a href="{reset_link}" style="background-color: #081a89; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold;">
                                        Reset Password
                                    </a>
                                </p>
                            </td>
                        </tr>

                        <!-- Separator -->
                        <tr>
                            <td style="padding: 10px 0;">
                                <hr style="border-top: 1px solid #ddd;">
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="padding: 20px; text-align: center;">
                                <p style="font-size: 16px; line-height: 1.5;">
                                    If you have not requested a password reset, please ignore this email or
                                    <a href="mailto:marcelojuniorbzerra12@gmail.com" style="color: #0056b3; text-decoration: underline;">
                                        contact support
                                    </a> if you have questions.
                                </p>
                                <p style="font-size: 16px; line-height: 1.5;">Thanks,<br>Marcelo Development Team</p>
                                <p style="font-size: 12px; color: #777;">
                                    If you are having trouble clicking the "Reset Password" button, click or copy and paste the URL below into your browser:<br>
                                    <a href="{reset_link}" style="color: #0056b3; text-decoration: underline;">{reset_link}</a>
                                </p>
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    """

    logo = os.path.join(
        os.path.dirname(__file__), "../static/assets/logo_marcelo_developer.png"
    )
    image_path = os.path.abspath(logo)
    send_email(email, subject, body, image_path)


def send_password_reset_confirmation_email(email: str):
    subject = "Marcelo Developer: Your password has been reset"
    body = """
    <html>
    <body style="font-family: DM Sans, sans-serif; color: #333; margin: 0; padding: 0;">
        <table role="presentation" width="100%" bgcolor="#f0f2f5" cellpadding="0" cellspacing="0" border="0" style="padding: 20px;">
            <tr>
                <td align="center">
                    <table role="presentation" width="600" bgcolor="#ffffff" cellpadding="0" cellspacing="0" border="0" style="border-radius: 8px; border: 1px solid #ddd; padding: 20px;">

                        <!-- Header -->
                        <tr>
                            <td align="center" style="border-bottom: 2px solid #081a89; padding-bottom: 15px;">
                                <img src="cid:logo" alt="Logo Marcelo Developer" width="150" style="display: block; margin: auto;">
                            </td>
                        </tr>

                        <!-- Body -->
                        <tr>
                            <td style="padding: 20px; text-align: center;">
                                <h2 style="color: #081a89; margin-bottom: 20px;">Successful Password Reset</h2>
                                <p style="font-size: 16px; line-height: 1.5;">Hi,</p>
                                <p style="font-size: 16px; line-height: 1.5;">
                                    Your password has been successfully reset. If you have not requested or made this change, please
                                    <a href="mailto:marcelojuniorbzerra12@gmail.com" style="color: #0056b3; text-decoration: underline;">contact support</a> immediately.
                                </p>
                            </td>
                        </tr>

                        <!-- Separator -->
                        <tr>
                            <td style="padding: 10px 0;">
                                <hr style="border-top: 1px solid #ddd;">
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="text-align: center; padding: 10px;">
                                <p style="font-size: 16px; line-height: 1.5;">Thanks,<br>Marcelo Development Team</p>
                                <p style="font-size: 12px; color: #777;">
                                    If you have not initiated this request, please secure your account immediately.
                                </p>
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    """

    logo = os.path.join(
        os.path.dirname(__file__), "../static/assets/logo_marcelo_developer.png"
    )
    image_path = os.path.abspath(logo)
    send_email(email, subject, body, image_path)

export const getOtpEmailTemplate = (otp) => {
  return `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    
    <div style="max-width: 500px; margin: auto; background: #ffffff; padding: 20px; border-radius: 10px; text-align: center;">
      
      <h2 style="color: #4f46e5;">🔐 Reset Your Password</h2>
      
      <p style="color: #555; font-size: 14px;">
        We received a request to reset your password. Use the OTP below to proceed:
      </p>

      <div style="margin: 20px 0;">
        <span style="
          display: inline-block;
          background: #4f46e5;
          color: #ffffff;
          font-size: 24px;
          letter-spacing: 5px;
          padding: 12px 20px;
          border-radius: 8px;
          font-weight: bold;
        ">
          ${otp}
        </span>
      </div>

      <p style="color: #777; font-size: 13px;">
        This OTP is valid for <strong>5 minutes</strong>.
      </p>

      <p style="color: #999; font-size: 12px; margin-top: 20px;">
        If you did not request this, please ignore this email.
      </p>

      <hr style="margin: 20px 0;" />

      <p style="font-size: 12px; color: #aaa;">
        © 2026 AuthApp. All rights reserved.
      </p>

    </div>
  </div>
  `;
};

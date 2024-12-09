import { supabase } from '@/src/lib/supabase';
import { supabaseAdmin } from '@/src/lib/adminSupabse';
import { Resend } from 'resend';


const resend = new Resend(process.env.EXPO_PUBLIC_RESEND_API_KEY);
export const forgotPassword = async ({ email }: { email: string; }) => {
    //check user exists, if exists then send email
    const { data: existingUsers, error: existingUserError } = await supabase.from('user_verification').select('*');
  
    //delete existing verification code
    const { error: removeError } = await supabase.from('user_reset_password').delete().eq('email', email);
    if (removeError) {
      return {
        error: true,
        message: removeError.message,
      };
    }
  
    if (existingUserError) {
      return {
        error: true,
        message: existingUserError.message,
      };
    }
    const isUserExist = existingUsers?.some(user => user.email === email);
    if (!isUserExist) {
      return {
        error: true,
        message: "User does not exist",
      };
    }
  
    //generate verification code
    const verificationCode = Math.floor(Math.random() * 900000 + 100000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
    const { error: verificationError } = await supabase.from('user_reset_password').insert({
      email,
      verification_code: verificationCode,
      expires_at: expiresAt,
    });
    if (verificationError) {
      return {
        error: true,
        message: verificationError.message,
      };
    }
  
    //send verification code
    const template = `<!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Invite Confirmation - RJ Bird Building</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background-color: white;">
          <div style="background-color: #ff6600; padding: 20px; text-align: center;">
              <img src="https://pub-fb247626aff1484a80521fe9044176a5.r2.dev/bird1.svg" alt="RJ Bird Building Logo" style="max-width: 200px;">
          </div>
          
          <div style="padding: 30px; color: #333;">
              <h2 style="color: #ff6600; margin-bottom: 20px;">Welcome to RJ Bird Building</h2>
              
              <p>Dear Contractor,</p>
              
              <p style="line-height:25px">
      We received a request to reset your password for your RJ Bird Building account. Click the button below to reset your password:
  </p>
  
  <div style="text-align: center; margin: 30px 0;">
      <h3 className='text-2xl'>Reset Password Code: <span className='font-bold'>${verificationCode}</span></h3>
  </div>
  <p style="line-height:25px">
      If you did not request a password reset, please ignore this email or contact our support team if you have any concerns.
  </p>
  <p>For any questions, please contact us:</p>
              <p style="margin: 5px 0;">✉️ support@oomtech.io</p>
          </div>
          <div style="background-color: #333; color: white; padding: 20px; text-align: center; font-size: 12px;">
              <p>Suite 5, 196-198 Rowe St, Eastwood NSW 2122</p>
              <p>ABN 48 606 543 382 • BUILDER LIC. NO 285018C</p>
              <p>© 2024 RJ Bird Building Pty Ltd. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>`;
    try {
      await resend.emails.send({
        from: "team@oomtech.io",
        to: email,
        subject: "Reset password code for your email",
        html: template
      });
    } catch (error) {
      return {
        error: true,
        message: "Failed to send verification code" + error,
      };
    }
  
    return {
      error: false,
      message: "Verification code sent successfully",
    };
  };


  export const verify6DigitCode = async ({ email, code }: { email: string, code: string; }) => {
 
    const { data: verification, error: verificationError } = await supabase.from('user_reset_password')
      .select('*');
  
    const isValidVerificationCode = verification?.find((user) => user.email === email && user.verification_code === code);
    const isVerificationCodeExpired = verification?.find((user) => user.email === email && new Date(user.expires_at) < new Date());
  
    if (verificationError || !isValidVerificationCode) {
      return {
        error: true,
        message: "Invalid or expired verification code",
      };
    }
  
    if (isVerificationCodeExpired) {
      return {
        error: true,
        message: "Verification code expired",
      };
    }
  
    return {
      error: false,
      message: "Verification successful",
    };
  
  };

  export const resetPassword = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
  
    // supabase authentication from here, with admin previlages
  
    //remove the entry of user from  user_reset_password table

    const { data: { users }, error: userError } = await supabaseAdmin.auth.admin.listUsers();
    const user = users.find((user) => user.email === email);
  
    if (userError) {
      return {
        error: true,
        message: userError.message,
      };
    }
  
    if (!user) {
      return {
        error: true,
        message: "User not found",
      };
    }
  
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
      password: password,
    });
  
    if (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  
    if (data.user && data.user.identities && data.user.identities.length === 0) {
      return {
        error: true,
        message: "Email already in use",
      };
    }
  
  
    return {
      error: false,
      success: true,
      message: "Password reset successful",
    };
  };
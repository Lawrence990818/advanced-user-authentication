import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./mailtrap.templates.js"
import { mailTrapClient, sender } from "./mailtrap.config.js"

export const sendVerificationEmail = async(email, verificationToken)=>{
    const recipient = [{email}]
    try{
        const response  = await  mailTrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        });
        console.log("Email sent successfully", response);
    }catch(error){
        console.log(`Error sending verification`, error);
        throw new Error(`Error sending verification email: ${email}`);
    }
}

export const sendWelcomeEmail = async (email, name)=>{
    const recipient = [{email}]
    try {
        const resp = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "e6f307a3-a20b-4b7d-9cc5-ba604cd208c5",
            template_variables:{
                company_info_name: "Auth Company",
                name: name,
            },
        });
        console.log("Welcome email sent successfully", resp)
    } catch (error) {
        console.error(`Error sending welcome email`, error)
        throw new Error(`Error sending welcome email: ${email}`)
    }
}

export const sendPaaswordResetEmail = async (email, resetURL) =>{
    const recipient  = [{email}]
    try{
        const response  = await  mailTrapClient.send({
            from: sender,
            to: recipient,
            subject:"Rest your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("resetURL", resetURL),
            category: "Password Reset",
        })
    }catch(error){
        console.error(`Error sending password reset email`. error)
        throw new Error(`Error sending password reset email: ${error}`)
    }
}

export const sendResetSuccessEmail = async (email) =>{
   const recipient  = [{email}]
   try {
    const response = await mailTrapClient.send({
        from: sender, 
        to: recipient,
        subject: "Password Rest Successful",
        html: PASSWORD_RESET_SUCCESS_TEMPLATE,
        category: "Password Reset"
    });
    console.log("Pssword reset emailsent successfully ", response)
   } catch (error) {
        console.error(`Error sendoing password reset success emal `, error);
        throw new Error(`Error sending password reset success email: ${email}`)
   } 
}
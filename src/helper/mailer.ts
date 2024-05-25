import nodemailer from 'nodemailer'
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";


export const sendEmail = async ({email, emailType, userId}: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                })
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId,
                {
                    forgetPasswordToken: hashedToken,
                    forgetPasswordTokenExpiry: Date.now() + 3600000
                })
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "213e9e3706d2aa",
                pass: "9bb46432549262"
            }
        });

        const mailOptions = {
            from: 'ahmadowais41@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password", // Subject line
            text: "Hello world?", // plain text body
            html: `<p>Click <a href='${process.env.DOMAIN}/verifyemail?token=${hashedToken}'>
            here</a> to ${emailType === "VERIFY" ? "verify your email" :
                'reset your password'}
            or copy and paste the link below in your browser.<br>
            ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`,
        }

        const mailResponse = await transport.sendMail(mailOptions)
        return mailResponse


    } catch (error: any) {
        throw new Error(error.message)
    }
}
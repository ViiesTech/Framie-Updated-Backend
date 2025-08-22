// const twilio = require("twilio");
// require("dotenv").config();

// const accoundsid = process.env.Account_SID
// const authToken = process.env.Auth_Token
// const phoneNumber = process.env.Twilio_Phone_Number

// const client = new twilio( accoundsid, authToken );

// const sendOTP = async (userData) => {
//     try {

//         const msg = await client.messages.create({
//             body: userData.OTP,
//             from: phoneNumber,
//             to: `+${userData.phNumber}`
//         });
//         console.log("OTP Sent: ", messages.sid);
        
//     } catch (error) {
//         console.log("Error Sending OTP :",error);
//     }
// };

// module.exports = sendOTP;


const nodemailer = require("nodemailer");
require("dotenv").config();


const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth:{
        user: process.env.appEmail,
        pass: process.env.appPassword
    }
});

const sendOTP = async (userData) => {
    try {
        let mailOptions = {
            from: process.env.appEmail,
            to: userData.email,
            subject: "Your OTP Code",
            html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2>Welcome to Framie!</h2>
                <p>Your One-Time  (OTP) is:</p>
                <h1 style="color: #A83F98;">${userData.OTP}</h1>
                <p>Please enter this code in the app to verify your account.</p>
                <p><strong>Note:</strong>  Do not share it with anyone.</p>
                <br/>
                <p>Thank you,<br/> Team Framie </p>
              </div>
            `,
        };

        let info = await transporter.sendMail(mailOptions);
        console.log("Email Sent :", info.response);
        return true
    } catch (error) {
        console.error("Error sending email: ", error);
        return false;
    };
};


module.exports = {
    sendOTP
}

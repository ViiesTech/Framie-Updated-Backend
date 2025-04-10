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
            from: process.env,
            to: userData.email,
            subject: "Your OTP Code",
            // text: `Your OTP CODE is ${userData.otp}`
            html: `<h2> Your OTP Code: <strong>${userData.OTP}</strong></h2>`
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

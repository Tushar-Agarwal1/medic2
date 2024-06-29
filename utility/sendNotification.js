import nodemailer from "nodemailer";
import htmlFun from "./NotificationHtml.js";

const transporter = nodemailer.createTransport({
    service: 'gmail',

    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: "eventbeepgla@gmail.com",
        pass: "lswjcbfkyyizshfh",
    },
});


const sendmail = async (recipient, sub, msg, token) => {
    const html = htmlFun(msg, token);

    const info = await transporter.sendMail({
        from: '"Event beep 👻" <foo@example.com>', // sender address
        to: recipient, // list of receivers
        subject: "Farmer 's Friends", // Subject 
        html: html
        // html: "<H1>" + `${msg}` + "`<br><a href='http://localhost:8000/" + token + "'>click</a></H1>"



        // html: "<H1>Your email verification link is<br><a href='http://localhost:8000/" + msg + "'>click</a></H1>", // html body
    });

    console.log("Message sent: %s", info.messageId);

}
export default sendmail;
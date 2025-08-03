const nodeMailer = require("nodemailer")

const sendConfirmationEmail = async (token, clientEmail) => {
    const smtp = nodeMailer.createTransport({
        host : `smtp.gmail.com`,
        port : 587,
        secure : false,
        auth : {
            user : `${process.env.EMAIL_USER}`,
            pass : `${process.env.EMAIL_PASS}`
        }
    })
    
    const configEmail = {
        from: `${process.env.EMAIL_USER}`,
        to: `${clientEmail}`,
        subject: "BemEstar confirmação",
        html: `<h1>Confirme sua conta no BemEstar</h1> <p>Apenas clique no link e, após, recarregue a página principal: <a href="http://localhost:3000/confirmation/${token}">Confirmar</a></p>`
    }
    try {
        const result = await smtp.sendMail(configEmail)
        console.log("Email enviado", result);
    } catch (error) {
        console.log(error)
    }
}

module.exports = sendConfirmationEmail;
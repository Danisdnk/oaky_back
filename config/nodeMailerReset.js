const nodemailer = require('nodemailer');
//?? si se desea probar con gmail descomentar estas linea Ethereal

// const mail = {
//     user: 'brennan.bins3@ethereal.email',
//     pass: 'vrFUC236fzREEyECy7'
// }
// const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     secure: false,
//     auth: mail,

// });


const mail = {
    user: 'danisdnk@gmail.com',
    pass: 'byeqmvcxjfwivrah'
}

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
        user: mail.user,
        pass: mail.pass, 
    },
});

const sendEmail = async (email, token, userId) => {
    try {

        await transporter.sendMail({
            from: `OAKY APP <info@oaky.com.ar>`, // sender address
            to: email, // si se usa con un mail falso de Etereal usar la constate declarada arriba (mail.user . sino usar email)
            subject: '[OAKY WEB] resetea tu clave ', // Subject line
            text: "Este es tu codigo de reseteo" + token,
            html: getTemplate(email, token) // plain text body

        });

    } catch (error) {
        console.log('Algo no va bien con el email', error);
    }
}


const getTemplate = (name, token) => {
    return `
        <div id="email___content">
            <img src="https://imgur.com/GRtrU3p.png" alt="">
            <h2>Hola ${name}</h2>
            <p> para resetear tu contraseña ingresa al siguiente codigo</p>
            <p> ${token}</p>
        </div>
      `;
}

module.exports = {
    sendEmail,
    getTemplate
}
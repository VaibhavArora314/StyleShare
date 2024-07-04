import nodeMailer from 'nodemailer'
export const mailing=async (email: string, message: string) =>{ 
let HTML=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title> 
</head>
<body> 
        <main style="width: 100%;min-height: 100vh;padding: 1rem;background-color: rgb(255 255 80 / 47%);position: relative;">
            <div style="margin: auto;width:90%;background-color: white;max-width: 800px;padding: 1.2rem;border-radius: 0.6rem; box-shadow: 0 1px 5px rgb(0,0,0);position: relative;justify-content: center;align-items: center;">
        <h1 style="margin-top: 2rem;font-family: monospace;">Thank You for Contacting Us!</h1>
        <p style="margin-top: 2rem; font-family: sans-serif;font-size: 1rem;"> 
        <span  style="margin-top: 2rem; font-family: sans-serif;font-size: 0.8rem;"><span style="font-weight:700;">Your Message:</span> ${message}</span><br>
            Thank you for reaching out to Style Share! Your message is important to us, and we are grateful for your interest. Our team is currently reviewing your inquiry and will respond to you as soon as possible.
            <br><br>
            In the meantime, feel free to explore more about Style Share on our website. You can browse through our latest articles, explore our featured styles, or connect with us on social media for daily inspiration.
            <br><br>
            Your feedback is valuable to us as we strive to provide the best experience for our community of style enthusiasts. We look forward to connecting with you soon!
            <br><br>
            Thank you again for choosing Style Share. Stay stylish and inspired!
            <br><br>
            Warm regards,<br>
            The Style Share Team<br><br>
            </p> 
            <p style="font-family: monospace;font-weight: 700;">Keep connected with our site <a href="https://style-share.vercel.app/app">https://style-share.vercel.app/app</a>...🚀 for updates and more style tips!</p>
<br><br>
    <p style="font-family: monospace;text-align: center;">Happy Coding :)  Happy Journey :)</p>
        </div>
    </main>
</body>
</html>

`
const sender=nodeMailer.createTransport({
    service:"Gmail", 
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
})
const html= HTML
const receiver={
    from:process.env.EMAIL_USER,
    to:email,
    subject:"Contact Our Team",
    text:'Style Share Contact',
    html:html, 
}
const sendMail=async()=>{
    try{
        await sender.sendMail(receiver)
       console.log("sended")
    }catch(err){
        console.log(err)
    }
}

sendMail()
} 
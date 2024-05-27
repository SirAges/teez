import nodemailer from "nodemailer";

export const POST = async request => {
    const {
        email,
        address,
        city,
        state,
        postal,
        country,
        colors,
        sizes,
        price,
        title
    } = await request.json();

    const transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: process.env.NEXT_PUBLIC_MAILER_USER,
            pass: process.env.NEXT_PUBLIC_MAILER_PASSWORD
        }
    });

    const formattedColors = colors
        .map(c => `<span style="color:${c}; margin-right: 2px">${c}</span>`)
        .join("");
    const formattedSizes = sizes
        .map(s => `<span style=" margin-right: 4px">${s}</span>`)
        .join("");

    const mailOptions = {
        from: "ekelestephen.design@gmail.com", // sender address
        to: email, // list of receivers
        subject: "Purchase Confirmation",

        html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc;">
    <div style="background-color: #940000; padding: 20px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0;">Thank You for Your Purchase!</h1>
    </div>
    <div style="background-color: #171717; padding: 20px; color: #ffffff; ">
        <p>Hello,</p>
        <p>Thank you for your purchase of <strong style="text-transform:
        capitalize;color:"#940000" font-size: 1.2em;">${title}</strong>.</p>
        <p>Details:</p>
        <p><strong>Price:</strong> $${price}</p>
        <p><strong>Color(s):</strong><br />${formattedColors}</p>
        <p><strong>Size(s):</strong><br />${formattedSizes}</p>
        <p><strong>Shipping Address:</strong> ${address}, ${city}, ${state}, ${postal}, ${country}</p>
        <p>If you have any questions or concerns about your order, please don't hesitate to contact us.</p>
        <p style="color: #940000;">Teez Fashion</p>
        <a href="mailto:ekelestephen.design@gmail.com" style="color: #940000;">ekelestephen.design@gmail.com</a>
    </div>
</div>`
    };

    try {
        const info = await transport.sendMail(mailOptions);
        return new Response("Message sent successfully", { status: 200 });
    } catch (error) {
        return new Response("Failed to send message", { status: 500 });
    }
};

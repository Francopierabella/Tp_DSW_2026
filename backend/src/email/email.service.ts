import nodemailer from "nodemailer";

export class EmailService {
    private transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    async sendManagerRegistrationEmail(
        firstName: string,
        lastName: string,
        e_mail: string,
        token: string
    ): Promise<void> {
        const confirmationUrl =
            `http://localhost:5173/manager/confirm/${token}`;

        await this.transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_ADMIN,
            subject: "Nueva solicitud de registro de Manager",
            html: `
                <h2>Nueva solicitud de registro</h2>

                <p>
                    Se recibió una nueva solicitud para registrarse
                    como Manager de Farmacia Pierabella.
                </p>

                <p>
                    <strong>Nombre:</strong> ${firstName}
                </p>

                <p>
                    <strong>Apellido:</strong> ${lastName}
                </p>

                <p>
                    <strong>Email:</strong> ${e_mail}
                </p>

                <p>
                    Para revisar y gestionar esta solicitud:
                </p>

                <p>
                    <a href="${confirmationUrl}">
                        Revisar solicitud
                    </a>
                </p>
            `
        });
    }
}
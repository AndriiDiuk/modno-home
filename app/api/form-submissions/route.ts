import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, formType } = body;

    if (!phone) {
      return NextResponse.json(
        { error: "Номер телефона обязателен" },
        { status: 400 },
      );
    }

    const recipientEmail = process.env.CONTACT_EMAIL;
    if (!recipientEmail) {
      console.error("CONTACT_EMAIL is not set");
      return NextResponse.json(
        { error: "Сервер не настроен для отправки писем" },
        { status: 500 },
      );
    }

    const subjectMap: Record<string, string> = {
      callback: "Заявка на обратный звонок",
      catalog: "Запрос каталога",
      calculation: "Запрос расчёта стоимости",
    };

    const subject = subjectMap[formType] || "Новая заявка с сайта";

    await resend.emails.send({
      from: "Modno Home <onboarding@resend.dev>",
      to: recipientEmail,
      subject,
      html: `
        <h2>${subject}</h2>
        <p><strong>Телефон:</strong> ${phone}</p>
        <p><strong>Тип заявки:</strong> ${formType || "не указан"}</p>
        <p><strong>Дата:</strong> ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Не удалось отправить заявку" },
      { status: 500 },
    );
  }
}

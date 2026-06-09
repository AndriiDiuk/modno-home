import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json(
        { error: "Сервер не настроен для отправки писем" },
        { status: 500 },
      );
    }

    const resend = new Resend(apiKey);

    const body = await request.json();
    const { phone, formType, sourcePage, formTitle } = body;

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
      colors: "Запрос о тканях и цветах",
    };

    const baseSubject = subjectMap[formType] || "Новая заявка с сайта";
    const subjectParts = [baseSubject, sourcePage].filter(Boolean);
    const subject = subjectParts.join(" — ");

    await resend.emails.send({
      from: "Modno Home <info@modnohome.ru>",
      to: recipientEmail,
      subject,
      html: `
        <h2>${baseSubject}</h2>
        <p><strong>Телефон:</strong> +7 ${phone}</p>
        ${formTitle ? `<p><strong>Запрос:</strong> ${formTitle}</p>` : ""}
        ${sourcePage ? `<p><strong>Страница:</strong> ${sourcePage}</p>` : ""}
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

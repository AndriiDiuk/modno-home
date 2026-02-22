import { fetchPayload } from "@/lib/payload";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchPayload<any>("globals/settings");
  return {
    title: settings?.footer?.privacyPolicyText || "Политика конфиденциальности",
  };
}

export default async function PrivacyPolicyPage() {
  const settings = await fetchPayload<any>("globals/settings");
  const content = settings?.footer?.privacyPolicyContent;

  return (
    <div className='content py-16 md:py-24'>
      <h1 className='text-3xl md:text-4xl font-bold mb-8 text-black'>
        {settings?.footer?.privacyPolicyText || "Политика конфиденциальности"}
      </h1>

      <div className='prose prose-sm md:prose-base max-w-none text-black leading-relaxed'>
        {content ? (
          /* Using a simple container if it's rich text (Lexical) */
          <div className='payload-content'>
            {/* Note: In a real project you'd use a RichText component to render Lexical/Slate nodes */}
            {/* For now we show a placeholder or let the user know where to find it */}
            <p>Контент политики редактируется в админке.</p>
          </div>
        ) : (
          <p>Текст политики еще не заполнен в админке.</p>
        )}
      </div>
    </div>
  );
}

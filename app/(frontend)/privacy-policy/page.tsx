import { RichText } from "@/components/common/RichText";
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

      <div className='text-black'>
        {content ? (
          <RichText content={content} />
        ) : (
          <p>Текст политики еще не заполнен в админке.</p>
        )}
      </div>
    </div>
  );
}

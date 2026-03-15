import "@/assets/style/globals.css";
import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang='uk'>
      <body className='font-sans antialiased flex flex-col min-h-screen'>
        <div className='flex flex-col items-center justify-center px-6 py-32 md:py-40 text-center grow'>
          <p className='text-brand-muted text-sm font-medium tracking-widest uppercase mb-4'>
            Страница не найдена
          </p>
          <h1 className='text-[120px] md:text-[180px] font-extralight leading-none text-brand-black tracking-tight'>
            404
          </h1>
          <p className='text-brand-gray text-lg md:text-xl font-light mt-4 mb-10 max-w-md'>
            Такой страницы не существует или она была перемещена
          </p>
          <Link
            href='/'
            className='border border-brand-black rounded-2xl text-brand-black px-8 py-3 text-sm font-medium tracking-wide uppercase transition-all duration-300 hover:bg-brand-black hover:text-white'
          >
            На главную
          </Link>
        </div>
      </body>
    </html>
  );
}

import Link from 'next/link';
import BgImage from '@/public/images/404.webp';

export default function NotFound() {
  return (
    <div className="relative flex items-center justify-center h-full bg-cover bg-center" style={{ backgroundImage: `url(${BgImage.src})` }}>
      <div className="absolute inset-0 z-0 w-full h-full bg-black opacity-50"></div>
      <div className="relative z-10 text-center p-6 bg-opacity-90 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold mb-4 text-white">Страница не найдена</h2>
        <p className="text-lg mb-6 text-white">Не удалось найти запрашиваемый ресурс.</p>
        <Link href="/" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}

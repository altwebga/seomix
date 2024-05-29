'use client'
import Link from 'next/link';
import dynamic from 'next/dynamic';
import animationData from '@/public/animations/404.json';
import { title, subtitle } from "@/components/primitives";

const LottieAnimation = dynamic(() => import("../components/LottieAnimation"), { ssr: false });

export default function NotFound() {
  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0 w-full h-full">
        <LottieAnimation animationData={animationData} height="100%" width="100%" />
      </div>
      <div className="relative z-10 text-center p-4 bg-opacity-80 rounded-lg">
        <h2 className={title()}>Страница не найдена</h2>
        <p className={subtitle()}>Не удалось найти запрашиваемый ресурс.</p>
        <Link href="/" className="inline-block px-6 py-2 mt-6 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}

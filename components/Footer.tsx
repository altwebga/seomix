import { socialLinks } from "@/config/socialLink";
import { Link } from "@nextui-org/link";
import { Image } from "@nextui-org/image";

const Footer = () => {
    const currentYear = new Date().getFullYear(); // Получаем текущий год

    return (
        <footer className="flex flex-col items-center justify-center border-t border-white bg-black p-4">
            <div className="flex flex-row gap-4 h-14">
                {socialLinks.map((item) => (
                    <Link href={item.url} isExternal key={item.url}>
                        <Image src={item.icon ? item.icon.src : item.icon} className="w-8 h-8" />
                    </Link>
                ))}
            </div>
            <div className="text-white text-sm mt-4">
                &copy; {currentYear} seomix. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;

const menu = [
  { id: "1", title: "Услуги", url: "/services" },
  { id: "2", title: "Мои работы", url: "/portfolio" },
  { id: "3", title: "Обо мне", url: "/about" },
  { id: "4", title: "Контакты", url: "/contact" },
];

export default function Nav() {
  return (
    <nav>
      <ul className="flex space-x-4">
        {menu.map((item) => (
          <li key={item.id} className="text-gray-700 hover:text-gray-900">
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

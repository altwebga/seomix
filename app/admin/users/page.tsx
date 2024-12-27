import { getAllUsers } from "@/actions/get-all-users";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export default async function UsersPage() {
  const users = await getAllUsers();
  return (
    <div className="px-4">
      <h1>Пользователи</h1>
      <Table>
        <TableCaption>Список пользователей</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Аватар</TableHead>
            <TableHead>Имя</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Роль</TableHead>
            <TableHead>Дата регистрации</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Image
                  src={user.avatar || "/images/profile.png"}
                  width={80}
                  height={80}
                  alt={user.name || "no name"}
                  className="rounded-full aspect-square object-cover"
                />
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                {new Date(user.createdAt).toLocaleString("ru-RU")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

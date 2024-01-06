import { PrismaClient } from "@prisma/client";
import React from "react";
import {cookies} from 'next/headers'
import UserAdminPanel from "@/components/useradminpanel";
import { Level, statsFromLevels } from "@/models/stats";

export default async function AdminPanel() {

  const prisma = new PrismaClient();
    const cookieStore = cookies()
    const cookie = cookieStore.get('admin')?.value
    if(cookie !== process.env.ADMIN_TOKEN) {
        return <div>Brak dostępu</div>
    }

  const users = await prisma.user.findMany({
    include: {
      formAnswer: true,
      levels: true,
    },
  });

  if (users.length === 0) {
    return <div>Brak użytkowników</div>;
  }

  let selectedUser = users[0];

  prisma.$disconnect();

  return (
    <UserAdminPanel users={users} stats={statsFromLevels(users.map(u => u.levels as Level[]).flat())} />
  );
}

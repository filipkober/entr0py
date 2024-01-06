"use client";

import React, { useRef, useState } from "react";
import { Prisma } from "@prisma/client";
import sickdivider from "@/img/sickdivider.png";
import Image from "next/image";
import LevelPanel from "./LevelPanel";
import LevelCarousel from "./LevelCarousel";
import { Canvas } from "@react-three/fiber";
import SpinningIcosahedron from "./SpinningIcosahedron";
import { Progress } from "./ui/progress";
import LevelStats from "./LevelStats";
import { LevelStatsType } from "@/models/stats";

const userWithData = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {
    levels: true,
    formAnswer: true,
  },
});

type User = Prisma.UserGetPayload<typeof userWithData>;

export default function UserAdminPanel({ users, stats }: { users: User[], stats: LevelStatsType[] }) {
  const [selectedUser, setSelectedUser] = useState(users[0]);

  const deleteUserPrompt = async () => {
    if (!selectedUser) return;
    const superadminpassword = prompt("Podaj hasło superadmina");
    if (!superadminpassword) return;

    const res = await fetch("/entropy/user", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: selectedUser.id,
        superadminpassword,
      }),
    });
  };

  const progress =
    (selectedUser.levels.filter((level) => level.completed).length / 18) * 100;

  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <div className="flex gap-2 my-8">
        <h1 className="text-2xl shrink-0">
          Wybierz <span onClick={deleteUserPrompt}>minionka</span>:{" "}
        </h1>
        <select className="w-1/3 text-3xl rounded-md font-[Arial] shrink-0">
          {users.map((user) => (
            <option
              key={user.id}
              value={user.id}
              onClick={() => {
                setSelectedUser(
                  users.find((u) => u.id === user.id) || users[0]
                );
              }}
            >
              {user.formAnswer?.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <div>
          <table className="border-separate">
            <thead>
              <tr className="text-left">
                <th>Pytanie</th>
                <th>Odpowiedź</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ulubiony kolor</td>
                <td>{selectedUser.formAnswer?.favColor}</td>
              </tr>
              <tr>
                <td>Ulubione zwierze</td>
                <td>{selectedUser.formAnswer?.favAnimal}</td>
              </tr>
              <tr>
                <td>Ulubiony kryzys gospodarczy</td>
                <td>{selectedUser.formAnswer?.favCrisis}</td>
              </tr>
              <tr>
                <td>Jeśli miałbyś zostać czymś to czym byś został</td>
                <td>{selectedUser.formAnswer?.whatWouldYouBe}</td>
              </tr>
              <tr>
                <td>Najgłębszy sekret</td>
                <td>{selectedUser.formAnswer?.deepestSecret}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Image
        src={sickdivider}
        alt="divider"
        className="h-[66.6px] object-cover my-4"
      />
      <h1 className="text-2xl font-bold mb-4">POSTĘP</h1>
      <Progress value={progress} className={"w-1/5 bg-gray-300"} />
      <p className="text-xl">{progress}%</p>
      <Image
        src={sickdivider}
        alt="divider"
        className="h-[66.6px] object-cover my-4"
      />
      <h1 className="text-2xl font-bold mb-4">POZIOMY</h1>
      <LevelCarousel levels={selectedUser.levels} />
      <Image
        src={sickdivider}
        alt="divider"
        className="h-[66.6px] object-cover my-4"
      />
      <h1 className="text-2xl font-bold mb-4">STATYSTYKI OGÓLNE</h1>
      <LevelStats levelStats={stats} />
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <SpinningIcosahedron />
      </Canvas>
    </div>
  );
}

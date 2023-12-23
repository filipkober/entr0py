'use client'

import React, { useState } from 'react'
import { Prisma } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


const images = [
  "https://upload.wikimedia.org/wikipedia/en/f/f2/Bottomlesspitdeathgrips.jpg",
  "https://upload.wikimedia.org/wikipedia/en/a/ac/Hazard_Duty_Pay%21.png",
  "https://f4.bcbits.com/img/a2160227746_65",
  "https://upload.wikimedia.org/wikipedia/en/7/7e/JPEGMAFIA-Veteran_Cover.jpg",
  "https://upload.wikimedia.org/wikipedia/en/8/8d/10000_gecs_album_cover.jpg",
  "https://images.genius.com/e1a9b596b7486f1ca8c4f33e30567b01.1000x1000x1.png",
  "https://i1.sndcdn.com/artworks-aqmv2Nzz5SxR5hwa-QZSX3g-t500x500.jpg",
  "https://images.genius.com/0f428646542366c56210cbb75632b08c.1000x1000x1.png",
  "https://upload.wikimedia.org/wikipedia/en/1/1a/Exmilitary_artwork.png",
  "https://upload.wikimedia.org/wikipedia/en/d/d2/JPEGMAFIA_Black_Ben_Carson_cover_art.jpg",
  "https://f4.bcbits.com/img/0029972620_10.jpg",
  "https://upload.wikimedia.org/wikipedia/en/d/d9/Year_of_the_Snitch_album_cover.jpg",
  "https://f4.bcbits.com/img/a3189957632_65",
  "https://i0.wp.com/grooverelly.com/wp-content/uploads/2021/05/Screen-Shot-2021-05-25-at-2.30.19-PM.png?fit=631%2C632&ssl=1",
  "https://i1.sndcdn.com/artworks-EzbpVaeh6y9Dy79F-7QUEyQ-t500x500.jpg",
  "https://i1.sndcdn.com/artworks-pSLPykArfy855NHe-qpyexQ-t500x500.png",
  "https://upload.wikimedia.org/wikipedia/en/2/21/Jpegmafia_AMHAC_1.jpg",
  "https://m.media-amazon.com/images/I/71OigHwMuRL.jpg"
]

const levelVal = Prisma.validator<Prisma.LevelDefaultArgs>()({})

type Level = Prisma.LevelGetPayload<typeof levelVal>

export default function LevelPanel({ level }: {level: Level}) {

  return (
    <Card style={{
      backgroundImage: `url(${images[level.level_index]})`,
      backgroundSize: 'cover',
      textShadow: `-1px -1px 0 #fff,  
      1px -1px 0 #fff,
      -1px 1px 0 #fff,
       1px 1px 0 #fff`
    }}
    className='aspect-square my-8'
    >
      <CardHeader>
        <CardTitle>{level.level_index + 1}. {level.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Czas: {level.timeTaken}</p>
        <p>Podpowiedzi: {level.hintsUsed}</p>
        <p>Ukończony: {level.completed ? <span className='text-green-500'>tak</span> : <span className='text-red-500'>nie</span>}</p>
      </CardContent>
    </Card>
  )
}

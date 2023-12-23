import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Prisma } from "@prisma/client"
import LevelPanel from "./LevelPanel"

const levelVal = Prisma.validator<Prisma.LevelDefaultArgs>()({})

type Level = Prisma.LevelGetPayload<typeof levelVal>

export default function LevelCarousel({levels}: {levels: Level[]}) {
  return (
    <Carousel className="w-full max-w-xs" opts={{
        loop: true
    }}>
      <CarouselContent>
        {levels.map((level, index) => (
          <CarouselItem key={index}>
            <LevelPanel level={level} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

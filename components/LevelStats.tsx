"use client"
import { LevelStatsType } from '@/models/stats'
import {ResponsivePie} from '@nivo/pie'
import {ResponsiveBar} from '@nivo/bar'
import React from 'react'

export default function LevelStats({levelStats}: {levelStats: LevelStatsType[]}) {

    const pieData = levelStats.map(l => ({
        id: l.levelName,
        label: l.levelName,
        value: l.avgTime,
    }))

    let barData = levelStats.map(l => ({
        "poziom": l.levelName,
        "ukończono": l.numCompleted,
        "nie ukończono": l.numIncomplete,
    }))
  return (
    <div className='w-full flex flex-col justify-center align-middle items-center'>
      <h2 className="text-xl font-bold mb-4">CZAS</h2>
      <div className='h-[35vh] w-1/3 mb-[1vh] flex mx-auto'>
        <ResponsivePie
            data={pieData}
            colors={{scheme: 'nivo'}}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        />
        </div>
        <h2 className="text-xl font-bold mb-4">UKOŃCZONO</h2>
        <div className='h-[45vh] w-full'>
        <ResponsiveBar 
          data={barData}
          keys={['ukończono', 'nie ukończono']}
          indexBy="poziom"
          groupMode="stacked"
          colors={{scheme: 'nivo'}}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          axisBottom={{
            tickSize: 5,
            tickRotation: -45, // Rotate the labels
            legend: 'poziom',
            legendPosition: 'middle',
            legendOffset: 55
          }}
        />
        </div>
    </div>
  )
}

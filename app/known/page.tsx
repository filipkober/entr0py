import Link from 'next/link'
import React from 'react'

export default function KnownForIt() {
  return (
    <div className='flex flex-col gap-8 text-2xl items-center justify-center w-screen h-screen'>
      <p>Known For It</p>
      <p>Known For It</p>
      <audio src='knownforit2.wav' controls /><br />
      <p>Known For It</p>
      <p>Known <Link className='decoration-transparent' href={"https://soundcloud.com/deathgrips/death-grips-exmilitary-11"} target='_blank'>For</Link> It</p>
    </div>
  )
}

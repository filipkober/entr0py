'use client'

import Image from 'next/image'
import Cookies from 'js-cookie'
import { useState } from 'react'

export default function Home() {

  const [text,setText] = useState('Jesteś w złym miejscu...')
  const [iv, setIv] = useState('')
  const [disabled, setDisabled] = useState(false)

  const okd = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      const res = await fetch('/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: e.currentTarget.value })
      })

      if(res.status === 200) {
        const { token } = await res.json()
        Cookies.set('admin', token)
      } else {
        setText('Nie próbuj niczego')
        setDisabled(true)
      }
      setIv('')
    }
  }

  return (
    <main className="h-screen flex flex-col gap-2 items-center justify-center text-2xl">
      {text}
      <input type="text" autoComplete='false' className='focus:outline-none text-center' onKeyDown={okd} value={iv} onChange={e => setIv(e.target.value)} disabled={disabled} />
    </main>
  )
}

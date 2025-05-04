'use client'

import { useState } from 'react'
import { useAppContext } from '@/app/context/AppContext'
import { loginOrCreateUser } from '@/app/actions/loginOrCreateUser'

export function Header() {
  const [inputName, setInputName] = useState('')
  const { userId, name, setUser } = useAppContext()

  const handleLogin = async () => {
    if (!inputName.trim()) return
    const user = await loginOrCreateUser(inputName.trim())
    setUser(user.id, user.name)
    console.log(user)
  }

  return (
    <header className="w-full p-4 bg-neutral-900 text-white flex justify-between items-center">
      <h1 className="font-bold text-lg"> Nomad X </h1>
      <div className="flex items-center gap-2 rounded">
        <input
          type="text"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          placeholder="이름 입력"
          className="border px-2 py-1 w-[120px] rounded"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-3 py-1 rounded"
          disabled={inputName.length < 2}   
        >
          로그인
        </button>
        {userId && name && (
          <span className="text-sm text-gray-700"> {name} (ID: {userId})</span>
        )}
      </div>
    </header>
  )
}

'use client'

import { useState } from 'react'
import { useSocket } from '../context/SocketProvider'

const Page = () => {
  const { sendMessage, messages } = useSocket()

  const [message, setMessage] = useState('')

  return (
    <div>
      <div>
        <input
          onChange={(e) => setMessage(e.target.value)}
          placeholder={'message...'}
        />
        <button
          onClick={() => {
            sendMessage(message)
          }}
        >
          Send
        </button>
      </div>
      <div>
        <h1>All messages will appear here</h1>
        {messages.map((msg, i) => {
          return <p key={i}>{msg}</p>
        })}
      </div>
    </div>
  )
}

export default Page

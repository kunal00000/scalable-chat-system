'use client'

import { useState } from 'react'
import { useSocket } from '../context/SocketProvider'

const Page = () => {
  const { sendMessage } = useSocket()

  const [message, setMessage] = useState('')

  return (
    <div>
      <div>
        <h1>All messages will appear here</h1>
      </div>
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
    </div>
  )
}

export default Page

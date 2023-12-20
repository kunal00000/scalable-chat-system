import { Server } from 'socket.io'
import Redis from 'ioredis'

const pub = new Redis({
  host: 'redis-1c40ee4d-kunalverma2468-scalable-chat.a.aivencloud.com',
  port: 16271,
  username: 'default',
  password: 'AVNS_Yi2X13NPQJ0LOulp8we'
})

const sub = new Redis({
  host: 'redis-1c40ee4d-kunalverma2468-scalable-chat.a.aivencloud.com',
  port: 16271,
  username: 'default',
  password: 'AVNS_Yi2X13NPQJ0LOulp8we'
})
class SocketService {
  private _io: Server

  constructor() {
    console.log('🚀 Initializing Socket Service...')
    this._io = new Server({
      cors: {
        allowedHeaders: ['*'],
        origin: '*'
      }
    })
    // subscribe to redis (MESSAGES) channel
    sub.subscribe('MESSAGES')
  }

  public initListeners() {
    const io = this.io
    console.log('🚀 Init Socket Listeners...')

    io.on('connect', (socket) => {
      console.log('👉 New Socket connected.', socket.id)

      socket.on('event:message', async ({ message }: { message: string }) => {
        console.log('👉 New Message received: ', message)

        // publish this message to redis
        await pub.publish('MESSAGES', JSON.stringify({ message }))
      })
    })

    sub.on('message', (channel, message) => {
      if (channel === 'MESSAGES') {
        console.log('👉 New Message received from redis: ', message)
        io.emit('message', message)
      }
    })
  }

  get io() {
    return this._io
  }
}

export default SocketService

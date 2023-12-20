import { Server } from 'socket.io'

class SocketService {
  private _io: Server

  constructor() {
    console.log('🚀 Initializing Socket Service...')
    this._io = new Server()
  }

  public initListeners() {
    const io = this.io
    console.log('🚀 Init Socket Listeners...')

    io.on('connect', (socket) => {
      console.log('👉 New Socket connected.', socket.id)

      socket.on('event:message', async ({ message }: { message: string }) => {
        console.log('👉 New Message received: ', message)
      })
    })
  }

  get io() {
    return this._io
  }
}

export default SocketService

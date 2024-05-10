import React, { useRef, useEffect } from 'react'
import jsmpeg from 'jsmpeg'

const StreamingCamera = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const websocket = new WebSocket('ws://127.0.0.1:8000')

    const newPlayer: any = new jsmpeg(websocket, {
      canvas: canvas,
      autoplay: true,
      loop: true
    })

    return () => {
      websocket.close()
    }
  }, [])

  return (
    <div>
      {<canvas className="w-[600px] h-[600px]" ref={canvasRef}></canvas>}
    </div>
  )
}

export default StreamingCamera

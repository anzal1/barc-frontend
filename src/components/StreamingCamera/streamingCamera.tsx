import { loadPlayer } from 'rtsp-relay/browser'
import { useEffect, useRef, useState } from 'react'

const StreamingCamera = () => {
  const canvas = useRef<HTMLCanvasElement>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!canvas?.current) throw new Error('Ref is null')
    setLoading(true)
    loadPlayer({
      url: 'ws://localhost:2000/api/stream?url=rtsp://admin:Dsspl@123@103.97.243.100:554/1/1',
      canvas: canvas.current
    })
    setLoading(false)
  }, [])

  return (
    <>
      {loading && <div>Loading...</div>}
      <canvas className="h-full" ref={canvas} />
    </>
  )
}

export default StreamingCamera

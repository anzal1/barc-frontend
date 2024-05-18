import cancel from '../../assets/cancel.svg'
import { loadPlayer } from 'rtsp-relay/browser'
import { useEffect, useRef, useState } from 'react'

const StreamingCamera = ({
  url,
  onRemove
}: {
  url: string
  onRemove: () => void
}) => {
  const canvas = useRef<HTMLCanvasElement>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!url) return
    if (!canvas?.current) throw new Error('Ref is null')
    setLoading(true)
    loadPlayer({
      // sample_url: 'ws://localhost:2000/api/stream?url=rtsp://admin:Dsspl@123@103.97.243.100:554/1/1',
      url: 'ws://localhost:2000/api/stream?url=' + url,
      canvas: canvas.current
    })
    setLoading(false)
  }, [])

  console.log('url:', url)

  return (
    <div className="relative">
      {loading && <div>Loading...</div>}
      <img
        src={cancel}
        alt="cancel"
        onClick={onRemove}
        className="cursor-pointer w-8 h-8 fill-current bg-[#1C9FF6] p-1 rounded-full absolute -top-2 -right-2"
      />
      <canvas className="h-[291px] w-[485px]" ref={canvas} />
    </div>
  )
}

export default StreamingCamera

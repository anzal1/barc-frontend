import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import { useEffect, useRef, useState } from 'react'
import { loadPlayer } from 'rtsp-relay/browser'

const getMaskedUrl = (url?: string) => url?.replace(/\?/g, '/question')?.replace(/&/g, '/and')

const StreamingCamera = ({ url, onRemove }: { url: string; onRemove: () => void }) => {
	const canvas = useRef<HTMLCanvasElement>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (!url) return
		if (!canvas?.current) throw new Error('Ref is null')
		setLoading(true)
		loadPlayer({
			// sample_url: 'ws://localhost:2000/api/stream?url=rtsp://admin:Dsspl@123@103.97.243.100:554/1/1',
			// rtsp://admin:dsspl@123@103.97.243.100:554/cam/realmonitor?channel=1&subtype=1
			url: `ws://localhost:4000/api/stream/?url=${getMaskedUrl(url)}`,
			canvas: canvas.current
		})
		setLoading(false)
	}, [])

	return (
		<div className="relative">
			{loading && <div>Loading...</div>}

			<XMarkIcon
				onClick={onRemove}
				className="absolute -right-2 -top-2 h-8 w-8 cursor-pointer rounded-full bg-[#1C9FF6] fill-current p-1"
			/>

			<canvas className="h-[291px] w-[485px]" ref={canvas} />
		</div>
	)
}

export default StreamingCamera

"use client";
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

interface FramePreviewProps {
	frameUrl?: string;
	frameColor?: string;
	userImage?: string;
	userScale?: number;
	userRotate?: number;
	userImgPos?: { x: number; y: number };
	onImageDrag?: (pos: { x: number; y: number }) => void;
}

export default function FramePreview({
	frameUrl,
	frameColor = '#4A90E2',
	userImage,
	userScale = 100,
	userRotate = 0,
	userImgPos = { x: 0, y: 0 },
	onImageDrag
}: FramePreviewProps) {
	const [naturalSize, setNaturalSize] = useState<{ width: number; height: number } | null>(null);

	useEffect(() => {
		if (!userImage) {
			setNaturalSize(null);
			return;
		}

		let isMounted = true;
		const img = new window.Image();
		img.onload = () => {
			if (!isMounted) return;
			setNaturalSize({ width: img.naturalWidth, height: img.naturalHeight });
		};
		img.src = userImage;

		return () => {
			isMounted = false;
		};
	}, [userImage]);

	const userImageDisplaySize = useMemo(() => {
		if (!naturalSize || naturalSize.width <= 0 || naturalSize.height <= 0) {
			return { width: 520, height: 520 };
		}

		const maxSide = 520;
		const ratio = maxSide / Math.max(naturalSize.width, naturalSize.height);

		return {
			width: Math.max(1, Math.round(naturalSize.width * ratio)),
			height: Math.max(1, Math.round(naturalSize.height * ratio))
		};
	}, [naturalSize]);

	const handleMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
		if (!onImageDrag || !userImage) return;
		
		const startX = e.clientX - userImgPos.x;
		const startY = e.clientY - userImgPos.y;

		const handleMouseMove = (moveEvent: MouseEvent) => {
			const newX = moveEvent.clientX - startX;
			const newY = moveEvent.clientY - startY;
			onImageDrag({ x: newX, y: newY });
		};

		const handleMouseUp = () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
		};

		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
	};
	return (
		<div className="flex flex-col items-center">
			<div 
				id="frame-preview"
				className="relative w-[500px] h-[500px] md:w-[620px] md:h-[620px] shadow-2xl overflow-hidden ml-10"
				style={{
					backgroundColor: frameColor
				}}
			>
				<div className="absolute inset-0 flex items-center justify-center bg-white">
					   {userImage ? (
						   <Image
							   src={userImage}
							   alt="User uploaded"
							   width={userImageDisplaySize.width}
							   height={userImageDisplaySize.height}
							   className="absolute cursor-move"
							   style={{
								   transform: `scale(${userScale / 100}) rotate(${userRotate}deg)`,
								   transformOrigin: 'center',
								   left: `${userImgPos.x}px`,
								   top: `${userImgPos.y}px`
							   }}
							   onMouseDown={handleMouseDown}
							   draggable={false}
							   unoptimized={userImage.startsWith('data:')}
							   priority
						   />
					   ) : (
						<div className="text-center text-gray-400">
							<div className="text-6xl mb-2">📷</div>
							<p className="text-sm">User photo will appear here</p>
						</div>
					)}
				</div>
				{frameUrl && (
					<div className="absolute inset-0 pointer-events-none z-10">
						<Image
							src={frameUrl}
							alt="Frame overlay"
							fill
							className="object-cover"
							priority
							sizes="(max-width: 680px) 100vw, 680px"
						/>
					</div>
				)}
			</div>
		</div>
	);
}

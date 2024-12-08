'use client'

import { Canvas } from '@react-three/fiber'
import { View } from '@react-three/drei'
import { Suspense } from 'react'
import { Physics } from '@react-three/rapier'

const ViewCanvas = () => {
	return (
		<Canvas
			style={{
				position: 'fixed',
				top: 0,
				left: '50%',
				transform: 'translate(-50%)',
				overflow: 'hidden',
				pointerEvents: 'none',
				zIndex: 30
			}}
			shadows
			dpr={[1, 1.5]}
			gl={{
				antialias: true
			}}
			camera={{
				fov: 30
			}}
		>
			<Suspense>
				<Physics debug gravity={[0, 0, 0]}>
					<View.Port />
				</Physics>
			</Suspense>
		</Canvas>
	)
}

export default ViewCanvas

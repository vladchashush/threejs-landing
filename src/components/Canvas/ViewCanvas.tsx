'use client'

import { Canvas } from '@react-three/fiber'
import { DuckModel } from './prefabs/DuckModel'
import { Environment, Float } from '@react-three/drei'

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
			<Float
				speed={0.3}
				rotationIntensity={40}
				floatIntensity={1}
				floatingRange={[-0.5, 0.5]}
			>
				<DuckModel />
			</Float>

			{/* <mesh rotation={[0.5, 0.5, 0]} position={[1, 0, 0]}>
				<boxGeometry />
				<meshStandardMaterial color={'hotpink'} />
			</mesh> */}
			<Environment files='/hdr/lobby.hdr' environmentIntensity={1.5} />
		</Canvas>
	)
}

export default ViewCanvas

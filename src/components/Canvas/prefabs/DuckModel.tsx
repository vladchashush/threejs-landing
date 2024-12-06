import { useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'

export function DuckModel() {
	const { nodes, materials } = useGLTF('/models/duck.gltf')
	const texture = useTexture('/models/textures/Duck_baseColor.png')
	texture.flipY = false

	return (
		<group dispose={null}>
			<mesh
				castShadow
				receiveShadow
				geometry={(nodes.Object_2 as THREE.Mesh).geometry}
				material={materials.Duck}
				rotation={[-Math.PI / 2, 0, 0]}
			>
				{' '}
				<meshStandardMaterial roughness={0.35} map={texture} />
			</mesh>
		</group>
	)
}

useGLTF.preload('/models/duck.gltf')

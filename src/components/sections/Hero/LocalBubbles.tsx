'use client'

import * as THREE from 'three'
import { useRef, useEffect, forwardRef } from 'react'
import { useFrame, Vector3 } from '@react-three/fiber'
import gsap from 'gsap'

// Using Object3D as a container to efficiently set and update positions for each bubble instance
const o = new THREE.Object3D()

type LocalBublesProps = {
	count?: number
	speed?: number
	bubbleSize?: number
	opacity?: number
	repeat?: boolean
	startPosition?: THREE.Vector3 | undefined
}

// Customizations in case you want to use this in other scenes.
export const LocalBubbles = forwardRef<THREE.Group, LocalBublesProps>(
	(
		{
			count = 300,
			speed = 5,
			bubbleSize = 0.05,
			opacity = 0.5,
			repeat = true,
			startPosition = new THREE.Vector3(0, 0, 0)
		},
		ref
	) => {
		const meshRef = useRef<THREE.InstancedMesh>(null)

		// An array that holds all of our bubbles' speeds
		const bubbleSpeed = useRef(new Float32Array(count))
		const minSpeed = speed * 0.001
		const maxSpeed = speed * 0.005

		// Create geometry and material for our mesh
		const geometry = new THREE.SphereGeometry(bubbleSize, 16, 16)

		const material = new THREE.MeshStandardMaterial({
			transparent: true,
			opacity
		})

		// Runs once to create and place our bubbles
		useEffect(() => {
			// Access the instanced mesh
			const mesh = meshRef.current
			if (!mesh) {
				return
			}
			// Create {count} number of bubbles in random locations
			for (let i = 0; i < count; i++) {
				o.position.set(
					startPosition.x + gsap.utils.random(-0.5, 0.5),
					startPosition.y + gsap.utils.random(-0.5, 0.5),
					startPosition.z + gsap.utils.random(-0.5, 0.5)
				)

				// Update matrix so that the position is applied
				o.updateMatrix()
				// Apply the updated matrix from Object3D to the mesh at index i.
				mesh.setMatrixAt(i, o.matrix)

				// Set a random bubble speed
				bubbleSpeed.current[i] = gsap.utils.random(minSpeed, maxSpeed)
			}

			mesh.instanceMatrix.needsUpdate = true
			return () => {
				mesh.geometry.dispose()
				;(mesh.material as THREE.Material).dispose()
			}
		}, [count, minSpeed, maxSpeed])

		// useFrame runs on every animation frame
		useFrame(() => {
			if (!meshRef.current) {
				return
			}

			// Assign current body color to bubble so it looks natural
			material.color = new THREE.Color(document.body.style.backgroundColor)

			for (let i = 0; i < count; i++) {
				meshRef.current.getMatrixAt(i, o.matrix)
				o.position.setFromMatrixPosition(o.matrix)
				// Move bubble upwards by its speed
				o.position.y += bubbleSpeed.current[i]

				// Reset bubble position if it moves off the top of the screen
				if (o.position.y > 4 && repeat) {
					o.position.y = startPosition.y // Reset to bottom
					o.position.x = startPosition.x + gsap.utils.random(-0.5, 0.5)
					o.position.z = startPosition.z + gsap.utils.random(0.5, 0.5)
				}

				o.updateMatrix()
				meshRef.current.setMatrixAt(i, o.matrix)
			}

			// Mark the instance matrix as needing an update, so the new positions of the bubbles are rendered.
			meshRef.current.instanceMatrix.needsUpdate = true
		})

		return (
			<group ref={ref}>
				<instancedMesh
					ref={meshRef}
					args={[undefined, undefined, count]}
					position={startPosition as Vector3}
					material={material}
					geometry={geometry}
				></instancedMesh>
			</group>
		)
	}
)
LocalBubbles.displayName = 'LocalBubbles'

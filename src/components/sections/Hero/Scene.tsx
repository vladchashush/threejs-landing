'use client'

import FloatingDuck from '@/components/Canvas/prefabs/FloatingDuck'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { Group } from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Environment } from '@react-three/drei'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const Scene = () => {
	const duck1Ref = useRef<Group>(null)
	const duck2Ref = useRef<Group>(null)
	const groupRef = useRef<Group>(null)
	const duck1GroupRef = useRef<Group>(null)
	const duck2GroupRef = useRef<Group>(null)

	useGSAP(() => {
		if (
			!groupRef.current ||
			!duck1Ref.current ||
			!duck2Ref.current ||
			!duck1GroupRef.current ||
			!duck2GroupRef.current
		)
			return

		gsap.set(duck1Ref.current.position, { x: -1.8, y: -0.5 })
		gsap.set(duck2Ref.current.position, { x: 1.8, y: -0.5 })

		const introTl = gsap.timeline({
			defaults: {
				duration: 3,
				ease: 'back.out(1.4)'
			}
		})

		if (window.scrollY < 20) {
			introTl
				.from(duck1GroupRef.current.position, { y: -5, x: -1 }, 0)
				.from(duck1GroupRef.current.rotation, { z: -3 }, 0)
				.from(duck2GroupRef.current.position, { y: -5, x: 1 }, 0)
				.from(duck2GroupRef.current.rotation, { z: 3 }, 0)
		}

		const scrollTl = gsap.timeline({
			defaults: {
				duration: 2
			},
			scrollTrigger: {
				trigger: '.hero',
				start: 'top top',
				end: 'bottom bottom',
				scrub: 1.5
			}
		})

		scrollTl
			.to(groupRef.current.rotation, { y: Math.PI * 2 })

			.to(duck2Ref.current.position, { x: 1.8, y: -0.2, z: 0 }, 0)
			.to(duck2Ref.current.rotation, { y: Math.PI * -2.3, z: -0.3 }, 0)

			.to(duck1Ref.current.position, { x: 0.8, y: -0.5, z: 0.5 }, 0)
			.to(duck1Ref.current.rotation, { y: Math.PI * 2.3, z: 0.2 }, 0)
	})

	return (
		<group ref={groupRef}>
			<group ref={duck1GroupRef}>
				<FloatingDuck ref={duck1Ref} />
			</group>

			<group ref={duck2GroupRef}>
				<FloatingDuck ref={duck2Ref} />
			</group>
			<Environment
				files={
					process.env.NODE_ENV === 'production'
						? `${process.env.NEXT_PUBLIC_BASE_URL}/hdr/lobby.hdr`
						: '/hdr/lobby.hdr'
				}
				environmentIntensity={1.5}
			/>
		</group>
	)
}

export default Scene

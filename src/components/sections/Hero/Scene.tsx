import FloatingDuck from '@/components/Canvas/prefabs/FloatingDuck'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { Group } from 'three'
import gsap from 'gsap'
import { Environment } from '@react-three/drei'

gsap.registerPlugin(useGSAP)

const Scene = () => {
	const duck1Ref = useRef<Group>(null)
	const duck2Ref = useRef<Group>(null)

	useGSAP(() => {
		if (!duck1Ref.current || !duck2Ref.current) return

		gsap.set(duck1Ref.current.position, { x: -1.8, y: -0.5 })
		gsap.set(duck2Ref.current.position, { x: 1.8, y: -0.5 })
	})

	return (
		<>
			<FloatingDuck ref={duck1Ref} />
			<FloatingDuck ref={duck2Ref} />
			<Environment files='/hdr/lobby.hdr' environmentIntensity={1.5} />
		</>
	)
}

export default Scene

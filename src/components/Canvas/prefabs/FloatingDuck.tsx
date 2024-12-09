import { Float } from '@react-three/drei'
import { DuckModel } from './DuckModel'
import { forwardRef, ReactNode } from 'react'
import { Group } from 'three'

type FloatingDuckProps = {
	floatingSpeed?: number
	rotationIntensity?: number
	floatIntensity?: number
	floatingRange?: [number, number]
	children?: ReactNode
}

const FloatingDuck = forwardRef<Group, FloatingDuckProps>(
	(
		{
			floatingSpeed = 1,
			rotationIntensity = 1.8,
			floatIntensity = 1,
			floatingRange = [-0.1, 0.1],
			children,
			...props
		},
		ref
	) => {
		return (
			<group ref={ref} {...props}>
				<Float
					speed={floatingSpeed}
					rotationIntensity={rotationIntensity}
					floatIntensity={floatIntensity}
					floatingRange={floatingRange}
				>
					{children}
					<DuckModel />
				</Float>
			</group>
		)
	}
)

FloatingDuck.displayName = 'FloatingDuck'

export default FloatingDuck

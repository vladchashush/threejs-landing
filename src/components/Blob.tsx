import * as React from 'react'
import { SVGProps } from 'react'

const Blob = (props: SVGProps<SVGSVGElement>) => (
	<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' {...props}>
		<defs>
			<linearGradient id='a' x1={0} x2={1} y1={1} y2={0}>
				<stop offset='0%' stopColor='rgba(208.012, 214.846, 255, 1)' />
				<stop offset='100%' stopColor='rgba(9.078, 0, 199.997, 1)' />
			</linearGradient>
		</defs>
		<path
			fill='url(#a)'
			d='M32.7-11.9c3.7 12.9-3.1 28-14.9 36.6C6 33.3-10.6 35.5-21.3 28-32 20.6-36.6 3.6-32.1-10.4c4.6-14 18.3-25 32.4-25.1 14.1-.2 28.6 10.6 32.4 23.6Z'
			style={{
				transition: '.3s'
			}}
			transform='translate(50 50)'
		/>
	</svg>
)
export default Blob

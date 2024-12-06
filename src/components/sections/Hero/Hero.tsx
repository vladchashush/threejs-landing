'use client'
import { TextSplitter } from '@/components/TextSplitter'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

gsap.registerPlugin(useGSAP)

const Hero = () => {
	useGSAP(() => {
		const introTl = gsap.timeline()
		introTl
			.set('.hero', { opacity: 1 })
			.from('.hero-header-word', {
				scale: 3,
				opacity: 0,
				ease: 'power4.in',
				delay: 0.3,
				stagger: 1
			})
			.from(
				'.hero-subheading',
				{
					opacity: 0,
					y: 30
				},
				'+=.8'
			)
			.from('.hero-body', {
				opacity: 0,
				y: 10
			})
			.from('.hero-button', {
				opacity: 0,
				y: 10,
				duration: 0.6
			})
	})

	return (
		<section className='hero opacity-0 px-4 first:pt-10 md:px-6'>
			<div className='mx-auto flex w-full max-w-7xl flex-col items-center'>
				<div className='grid'>
					<div className='grid h-screen place-items-center'>
						<div className='grid auto-rows-min place-items-center text-center'>
							<h1 className='hero-header text-7xl font-black uppercase leading-[.8] text-orange-500 md:text-[9rem] lg:text-[13rem]'>
								<TextSplitter
									text='test the taste'
									className='hero-header-word'
									wordDisplayStyle='block'
								/>
							</h1>
							<div className='hero-subheading mt-12 text-5xl font-semibold text-sky-950 lg:text-6xl'>
								just a little drop and you will know all
							</div>
							<div className='hero-body text-2xl font-normal text-sky-950'>
								something to write
							</div>
							<button className='hero-button rounded-xl bg-orange-600 px-5 py-4 text-center text-xl font-bold uppercase tracking-wide text-white transition-colors duration-150 hover:bg-orange-700 md:text-2xl'>
								button
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
export default Hero

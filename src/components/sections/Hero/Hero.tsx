'use client'
import { TextSplitter } from '@/components/TextSplitter'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import { View } from '@react-three/drei'
import Scene from './Scene'
import Blob from '@/components/Blob'
import { Bubbles } from './Bubbles'

gsap.registerPlugin(useGSAP, ScrollTrigger)

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

		const scrollTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.hero',
				start: 'top top',
				end: 'bottom bottom',
				scrub: 1.5
			}
		})

		scrollTl
			.to('.blob', {
				top: '-40%',
				stagger: 1
			})
			.fromTo(
				'.hero',
				{
					backgroundColor: '#FDE047'
				},
				{
					backgroundColor: '#D9F99D',
					overwrite: 'auto'
				},
				1
			)
			.from('.text-side-heading .split-char', {
				scale: 1.3,
				y: 40,
				rotate: -25,
				opacity: 0,
				stagger: 0.1,
				ease: 'back.out(3)',
				duration: 0.5
			})
			.from('.text-side-body', {
				y: 20,
				opacity: 0
			})
	})

	return (
		<section className='hero opacity-0 px-4 first:pt-10 md:px-6'>
			<div className='mx-auto flex w-full max-w-7xl flex-col items-center'>
				<View className='hero-scene pointer-events-none sticky top-0 z-50  hidden -mt-[100vh] h-screen w-screen md:block'>
					<Scene />
					<Bubbles count={300} speed={2} repeat={true} />
				</View>
				<div className='body-blob-background pointer-events-none sticky top-0 z-70  -mt-[100vh] h-screen w-screen overflow-hidden block'>
					<div className='blob fixed top-1/3 left-[50%] transform -translate-x-1/2'>
						<Blob
							className='animate-spin-10'
							width={'400vw'}
							height={'400vh'}
						/>
					</div>
				</div>
				<div className='body-blob pointer-events-none sticky top-0 z-60  hidden -mt-[100vh] h-screen w-screen overflow-hidden md:block'></div>
				<div className='grid'>
					<div className='grid h-screen place-items-center'>
						<div className='grid auto-rows-min place-items-center text-center'>
							<h1 className='hero-header text-7xl font-black uppercase leading-[.8] text-orange-500 md:text-[9rem] lg:text-[13rem]'>
								<TextSplitter
									text='duck your quack'
									className='hero-header-word'
									wordDisplayStyle='block'
								/>
							</h1>
							<div className='hero-subheading mt-12 text-5xl font-semibold text-sky-950 lg:text-6xl'>
								just a little drop and you will know all
							</div>
							<div className='hero-body text-2xl my-8 font-normal text-sky-950'>
								something to write
							</div>
							<button className='hero-button rounded-xl bg-orange-600 px-5 py-4 text-center text-xl font-bold uppercase tracking-wide text-white transition-colors duration-150 hover:bg-orange-700 md:text-2xl'>
								button
							</button>
						</div>
					</div>
					<div className='text-side relative z-[80] grid h-screen items-center gap-4 md:grid-cols-2'>
						<div>
							<h2 className='text-side-heading text-balance text-6xl font-black uppercase text-sky-950 lg:text-8xl'>
								<TextSplitter text='some what like text or something' />
							</h2>
							<div className='text-side-body mt-4 max-w-xl text-balance text-xl font-normal text-sky-950'>
								Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque
								similique saepe enim dolores optio dolorem nihil quos minima eiu
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
export default Hero

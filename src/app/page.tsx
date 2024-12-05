"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactElement, useRef } from "react";
import FeatureSection from "@component/organisms/landing/FeatureSection";
import HeroSection from "@component/organisms/landing/HeroSection";
import ProblemSection from "@component/organisms/landing/ProblemSection";
import { landing } from "@src/lib/landing";

gsap.registerPlugin(ScrollTrigger);

export default function Home(): ReactElement {
	const container = useRef(null);
	const wrapper = useRef(null);
	const hero = useRef(null);
	const problem = useRef(null);

	useGSAP((): void => {
		gsap.from(".banks", {
			scrollTrigger: { trigger: hero.current, start: "0%", end: "10%", scrub: true, markers: false, once: true },
			ease: "power.inOut",
			duration: 0.01,
			y: 50,
			opacity: 0,
		});

		gsap.fromTo(
			".h2-title",
			{
				scrollTrigger: { trigger: problem.current, start: "-90%", end: "-50%", scrub: true, once: true },
				ease: "power3.inOut",
				scale: 3.5,
				opacity: 0,
				y: -150,
				filter: "blur(6px)",
			},
			{
				y: 0,
				scrollTrigger: { trigger: problem.current, start: "-90%", end: "-50%", scrub: true, once: true },
				ease: "power3.inOut",
				opacity: 1,
				scale: 1,
				filter: "blur(0px)",
			},
		);

		// problem
	});

	return (
		<div ref={container}>
			<div ref={wrapper} className="relative overflow-x-hidden">
				<video
					autoPlay={true}
					loop={true}
					muted={true}
					playsInline={true}
					preload="auto"
					data-wf-ignore="true"
					data-object-fit="cover"
					className="video bg-gradient-to-b from-slate-300 to-transparent"
				>
					<source type="video/mp4" data-wf-ignore="true" src={landing.hero.bg} />
					<source type="video/mp4" data-wf-ignore="true" src={landing.hero.bgMinify} />
				</video>

				<HeroSection id="hero" ref={hero} />
				<ProblemSection id="problem" ref={problem} problems={landing.problems} />
				<FeatureSection id="feature" />
			</div>
		</div>
	);
}

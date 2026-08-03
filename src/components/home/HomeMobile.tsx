import { Link } from "@tanstack/react-router";
import { TimeCard } from "./HomeWidgets";
import HoverLottieSticker from "./HoverLottieSticker";
import InvisibleDesignEffect from "./InvisibleDesignEffect";
import RotatingTypewriter from "./RotatingTypewriter";
import "./HomeResponsive.css";

export default function HomeMobile() {
	return (
		<div className="home-mobile">
			<section
				className="home-mobile__hero"
				aria-labelledby="home-mobile-title"
			>
				<p className="home-mobile__tag">
					Product Designer · Research &amp; Interfaces
				</p>

				<div className="home-mobile__avatar">
					<HoverLottieSticker
						alt="Quyen waving hello"
						lottieSrc="/assets/lottie/avatar_v2.lottie"
					/>
				</div>

				<h1 id="home-mobile-title">
					Good Design&apos;s <InvisibleDesignEffect />
				</h1>

				<p className="home-mobile__subtitle">
					<span>PRODUCT DESIGNER, RESEARCH &amp; INTERFACE,&nbsp;</span>
					<RotatingTypewriter />
				</p>

				<div className="home-mobile__actions">
					<Link to="/work">Selected Work</Link>
					<Link to="/contact">Say Hi!</Link>
				</div>
			</section>

			<section className="home-mobile__status" aria-label="Current status">
				<TimeCard className="home-mobile__time-card" />
				<div className="home-mobile__mini-stickers">
					<article className="home-mobile__experience">
						<strong>5+</strong>
						<span className="home-mobile__experience-label">Years Exp</span>
					</article>
					<article className="home-mobile__toolkit">
						<strong>My Daily Kit:</strong>
						<span>⚡ Figma · ✨ Maze · 🎨 FigJam</span>
					</article>
				</div>
			</section>

			<section
				className="home-mobile__project"
				aria-labelledby="mobile-project"
			>
				<div className="home-mobile__project-image">
					<img
						src="/assets/home-project.png"
						alt="FinTech Hub smart savings interface"
					/>
				</div>
				<div className="home-mobile__project-meta">
					<span className="home-mobile__project-tag">Product Design</span>
					<small>{"// CASE STUDY"}</small>
				</div>
				<h2 id="mobile-project">FinTech Hub: Smart Savings</h2>
				<p>
					An AI-powered micro-investment platform designed for the Gen-Z market
					in Southeast Asia.
				</p>
				<Link to="/work">Open Board →</Link>
			</section>

			<section className="home-mobile__about" aria-labelledby="mobile-about">
				<img
					src="/assets/home-portrait.png"
					alt="Portrait of Quyen in Ha Noi"
				/>
				<div>
					<p>📍 Ha Noi, Viet Nam</p>
					<h2 id="mobile-about">Hi, I&apos;m Quyen</h2>
					<Link to="/about">Get to know me →</Link>
				</div>
			</section>
		</div>
	);
}

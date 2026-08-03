import { type FormEvent, useState } from "react";
import DraggableSticker from "../home/DraggableSticker";
import "./ContactPage.css";

export default function ContactPage() {
	const [isPinned, setIsPinned] = useState(false);

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsPinned(true);
	}

	return (
		<main
			id="contact"
			className="contact-page"
			data-page="contact"
			data-node-id="309:6895"
		>
			<div className="contact-page__dots" aria-hidden="true" />

			<section className="contact-layout" aria-labelledby="contact-title">
				<div className="contact-meta">
					<header className="contact-heading">
						<p className="contact-kicker">Open to opportunities</p>
						<h1 id="contact-title">Say Hi!</h1>
						<p className="contact-heading__intro">
							Have a messy research problem, a system that needs designing, or
							just want to grab a coffee in Hanoi? Toss me a message!
						</p>
					</header>

					<article className="contact-location">
						<span className="contact-location__pin" aria-hidden="true">
							📍
						</span>
						<div>
							<p>CURRENTLY BASED IN</p>
							<strong>Ha Noi, Viet Nam</strong>
						</div>
					</article>

					<DraggableSticker
						ariaLabel="Move Talk soon sticker"
						className="contact-sticker-drag"
					>
						<div className="contact-sticker">
							<span aria-hidden="true">👋</span>
							Talk soon!
						</div>
					</DraggableSticker>

					<div className="contact-social">
						<p>{"// FIND ME AROUND THE WEB"}</p>
						<div>
							<a
								href="https://www.linkedin.com"
								target="_blank"
								rel="noreferrer"
							>
								LinkedIn
							</a>
							<a
								href="https://www.behance.net"
								target="_blank"
								rel="noreferrer"
							>
								Behance
							</a>
						</div>
					</div>
				</div>

				<div className="contact-form-shell">
					<form
						className="contact-form"
						onSubmit={handleSubmit}
						data-pinned={isPinned || undefined}
					>
						<h2>Drop a note on my board! 📝</h2>

						<div className="contact-field">
							<label htmlFor="contact-name">What should I call you?</label>
							<input
								id="contact-name"
								name="name"
								type="text"
								placeholder="Your Name / Org"
								autoComplete="name"
								required
							/>
						</div>

						<div className="contact-field">
							<label htmlFor="contact-email">Where can I reply?</label>
							<input
								id="contact-email"
								name="email"
								type="email"
								placeholder="email@domain.com"
								autoComplete="email"
								required
							/>
						</div>

						<div className="contact-field">
							<label htmlFor="contact-message">Your message</label>
							<textarea
								id="contact-message"
								name="message"
								placeholder="Tell me about your product or say hello!"
								rows={5}
								required
							/>
						</div>

						<button type="submit">
							<span className="contact-form__button-label">
								STICK IT ON THE BOARD
							</span>
							<span className="contact-form__button-success">
								NOTE PINNED! 📌
							</span>
						</button>

						<p className="contact-form__success" aria-live="polite">
							{isPinned ? "Nice — your note is on the board!" : ""}
						</p>
					</form>
				</div>
			</section>
		</main>
	);
}

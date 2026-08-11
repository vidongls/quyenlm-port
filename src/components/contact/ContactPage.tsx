import { type FormEvent, useState } from "react";
import { CONTACT_PROJECT_TYPES, CONTACT_TIMELINES } from "../../lib/contact";
import type { SiteSettings } from "../../lib/content/types";
import DraggableSticker from "../home/DraggableSticker";
import "./ContactPage.css";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

function ArrowIcon() {
	return (
		<svg
			className="contact-action-icon"
			viewBox="0 0 24 24"
			fill="none"
			aria-hidden="true"
		>
			<path d="M5 12h13m-5-5 5 5-5 5" />
		</svg>
	);
}

function CopyIcon() {
	return (
		<svg
			className="contact-action-icon"
			viewBox="0 0 24 24"
			fill="none"
			aria-hidden="true"
		>
			<rect x="8" y="8" width="11" height="11" rx="2" />
			<path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
		</svg>
	);
}

function LocationIcon() {
	return (
		<svg
			className="contact-action-icon"
			viewBox="0 0 24 24"
			fill="none"
			aria-hidden="true"
		>
			<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
			<circle cx="12" cy="10" r="2.5" />
		</svg>
	);
}

export default function ContactPage({ settings }: { settings: SiteSettings }) {
	const [copied, setCopied] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(settings.email);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1800);
		} catch {
			window.location.href = `mailto:${settings.email}`;
		}
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const form = event.currentTarget;
		const formData = new FormData(form);
		setSubmitStatus("submitting");

		try {
			const response = await fetch("/api/contact", {
				body: JSON.stringify({
					email: String(formData.get("email") ?? ""),
					message: String(formData.get("message") ?? ""),
					name: String(formData.get("name") ?? ""),
					projectType: String(formData.get("projectType") ?? ""),
					timeline: String(formData.get("timeline") ?? ""),
					website: String(formData.get("website") ?? ""),
				}),
				headers: { "Content-Type": "application/json" },
				method: "POST",
			});

			if (!response.ok) throw new Error("Unable to send contact form");
			form.reset();
			setSubmitStatus("success");
		} catch {
			setSubmitStatus("error");
		}
	}

	return (
		<main
			id="contact"
			className="contact-page"
			data-page="contact"
			data-node-id="309:6895"
		>
			<div className="contact-page__grid" aria-hidden="true" />

			<header className="contact-hero">
				<p className="contact-kicker">
					<span aria-hidden="true" />
					Open channel · Hanoi
				</p>
				<h1>
					Send me the <span data-text="messy version.">messy version.</span>
				</h1>
				<p>Have a product question or a complicated workflow? Start there.</p>
			</header>

			<section className="contact-layout" aria-label="Contact Quyen">
				<div className="contact-channel">
					<div className="contact-channel__top">
						<p>{"01 / OPEN CHANNEL"}</p>
						<span>
							<i aria-hidden="true" />
							Available for thoughtful work
						</span>
					</div>

					<div className="contact-email-card">
						<small>Direct signal</small>
						<a href={`mailto:${settings.email}`}>{settings.email}</a>
						<button
							type="button"
							onClick={copyEmail}
							aria-label={`Copy ${settings.email}`}
						>
							<CopyIcon />
							<span>{copied ? "Copied" : "Copy email"}</span>
						</button>
					</div>

					<article className="contact-location">
						<span className="contact-location__icon">
							<LocationIcon />
						</span>
						<div>
							<p>Currently based in</p>
							<strong>{settings.location}</strong>
						</div>
					</article>

					<article className="contact-good-brief">
						<p>{"// A GOOD FIRST MESSAGE HAS"}</p>
						<ol>
							<li>
								<span>01</span>
								<div>
									<strong>Context</strong>
									<small>What are we looking at?</small>
								</div>
							</li>
							<li>
								<span>02</span>
								<div>
									<strong>Challenge</strong>
									<small>What currently feels stuck?</small>
								</div>
							</li>
							<li>
								<span>03</span>
								<div>
									<strong>Timing</strong>
									<small>What does useful look like now?</small>
								</div>
							</li>
						</ol>
					</article>

					<div className="contact-social">
						<a
							href={settings.linkedinUrl}
							target="_blank"
							rel="noopener noreferrer"
						>
							LinkedIn <ArrowIcon />
						</a>
						<a href={`mailto:${settings.email}`}>
							Email directly <ArrowIcon />
						</a>
					</div>

					<DraggableSticker
						ariaLabel="Move no perfect brief needed sticker"
						className="contact-sticker-drag"
					>
						<span className="contact-sticker">NO PERFECT BRIEF NEEDED</span>
					</DraggableSticker>
				</div>

				<div className="contact-form-shell">
					<form
						className="contact-form"
						onSubmit={handleSubmit}
						data-status={submitStatus}
					>
						<div className="contact-form__tape" aria-hidden="true" />
						<header className="contact-form__header">
							<div>
								<p>02 / BRIEF BUILDER</p>
								<span>Draft, not a commitment</span>
							</div>
							<strong aria-hidden="true">*</strong>
						</header>

						<div className="contact-form__row">
							<div className="contact-field">
								<label htmlFor="contact-name">Your name / team</label>
								<input
									id="contact-name"
									name="name"
									type="text"
									placeholder="How should I address you?"
									autoComplete="name"
									required
								/>
							</div>
							<div className="contact-field">
								<label htmlFor="contact-email">Reply email</label>
								<input
									id="contact-email"
									name="email"
									type="email"
									placeholder="you@company.com"
									autoComplete="email"
									required
								/>
							</div>
						</div>

						<fieldset className="contact-project-type">
							<legend>What are we untangling?</legend>
							<div>
								{CONTACT_PROJECT_TYPES.map((type, index) => (
									<label key={type}>
										<input
											type="radio"
											name="projectType"
											value={type}
											defaultChecked={index === 0}
										/>
										<span>{type}</span>
									</label>
								))}
							</div>
						</fieldset>

						<div className="contact-field">
							<label htmlFor="contact-message">Give me the messy version</label>
							<textarea
								id="contact-message"
								name="message"
								placeholder="Context, constraints, awkward edge cases—drop whatever you already know."
								rows={6}
								required
							/>
						</div>

						<div className="contact-honeypot" aria-hidden="true">
							<label htmlFor="contact-website">Website</label>
							<input
								id="contact-website"
								name="website"
								tabIndex={-1}
								autoComplete="off"
							/>
						</div>

						<div className="contact-form__footer">
							<div className="contact-field contact-field--timeline">
								<label htmlFor="contact-timeline">Timing</label>
								<select
									id="contact-timeline"
									name="timeline"
									defaultValue="Flexible"
								>
									{CONTACT_TIMELINES.map((timeline) => (
										<option key={timeline}>{timeline}</option>
									))}
								</select>
							</div>
							<button
								className="contact-submit"
								disabled={submitStatus === "submitting"}
								type="submit"
							>
								<span>
									{submitStatus === "submitting"
										? "Sending…"
										: submitStatus === "success"
											? "Sent"
											: submitStatus === "error"
												? "Try again"
												: "Send brief"}
								</span>
								<ArrowIcon />
							</button>
						</div>

						<p className="contact-form__note" aria-live="polite">
							{submitStatus === "success"
								? "Sent successfully. I’ll get back to you soon."
								: submitStatus === "error"
									? "Could not send. Please try again."
									: submitStatus === "submitting"
										? "Sending your brief securely…"
										: "Your message goes straight to Quyen’s inbox."}
						</p>
					</form>
				</div>
			</section>

			<div className="contact-ticker" aria-hidden="true">
				<div>
					{(["first", "clone"] as const).map((group) => (
						<span key={group}>
							SHARE CONTEXT <i /> ASK THE HARD QUESTION <i /> MAKE THE NEXT STEP
							CLEAR <i />
						</span>
					))}
				</div>
			</div>
		</main>
	);
}

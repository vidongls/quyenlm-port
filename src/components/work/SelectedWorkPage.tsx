import AboutProjectCard from "../about/AboutProjectCard";
import "../about/AboutPage.css";

const PROJECTS = [
	{
		title: "FinTech Hub: Smart Savings",
		tag: "Product Design",
		description:
			"An AI-powered micro-investment platform built specifically for the Gen-Z market in Southeast Asia, simplifying automated savings.",
		featured: true,
		href: "/projects/fintech-hub",
	},
	{
		title: "Hanoi Transit: Route Planner",
		tag: "UX Research & UI",
		description:
			"Restructuring the local city bus routing experience through rigorous field research and a contextual offline-first map interface.",
	},
	{
		title: "MedSync: Clinic Management",
		tag: "Interface Design",
		description:
			"Designing an invisible, lightweight tablet dashboard for local clinics to schedule and diagnose without screen friction.",
	},
] as const;

export default function SelectedWorkPage() {
	return (
		<main
			id="work"
			className="relative min-h-dvh overflow-hidden bg-page pt-[104px] pb-40"
			data-page="work"
			data-node-id="309:6732"
		>
			<div className="about-page__mesh" aria-hidden="true" />

			<div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col px-4 sm:px-8 lg:px-16">
				<header className="about-page__header flex flex-col items-start gap-3">
					<h1 className="about-page__title font-display text-[48px] leading-[1.1] font-extrabold tracking-[-0.64px] text-ink sm:text-[64px]">
						Selected Work
					</h1>
					<p className="about-page__tag rounded-full bg-highlight-yellow px-2.5 py-1 font-ui text-xs leading-[1.4] font-bold text-ink">
						{"OPERATOR BOARD // RECENT SHIPS"}
					</p>
				</header>

				<section
					className="mt-12 grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3"
					aria-label="Selected case studies"
				>
					{PROJECTS.map((project) => (
						<div key={project.title} className="about-page__card">
							<AboutProjectCard {...project} />
						</div>
					))}
				</section>
			</div>
		</main>
	);
}

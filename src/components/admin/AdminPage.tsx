import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { type FormEvent, useId, useMemo, useState } from "react";
import {
	createProjectFn,
	deleteProjectFn,
	publishPageFn,
	publishProjectFn,
	publishSiteFn,
	restoreRevisionFn,
	savePageDraftFn,
	saveProjectDraftFn,
	saveSiteDraftFn,
} from "../../lib/content/functions";
import type {
	AboutContent,
	AdminContent,
	AdminPageDocument,
	AdminProject,
	MediaAsset,
	PageKey,
	ProjectDetailContent,
	ProjectStatus,
	SiteSettings,
} from "../../lib/content/types";
import "./AdminPage.css";

type AdminSection = "activity" | "media" | "pages" | "projects" | "settings";

const FIELD_LABELS: Array<{
	key: keyof SiteSettings;
	label: string;
	type?: "email" | "url";
	wide?: boolean;
}> = [
	{ key: "name", label: "Display name" },
	{ key: "role", label: "Role / expertise", wide: true },
	{ key: "headline", label: "Hero headline" },
	{ key: "highlight", label: "Highlighted word" },
	{ key: "location", label: "Location" },
	{ key: "email", label: "Contact email", type: "email" },
	{ key: "linkedinUrl", label: "LinkedIn URL", type: "url", wide: true },
	{ key: "resumeUrl", label: "Resume URL", wide: true },
	{ key: "seoTitle", label: "SEO title", wide: true },
	{ key: "seoDescription", label: "SEO description", wide: true },
];

const PAGE_LABELS: Record<PageKey, { label: string }> = {
	about: { label: "About" },
	"fintech-detail": {
		label: "FinTech case study",
	},
	"hanoi-transit-detail": {
		label: "Hanoi Transit case study",
	},
	"medsync-detail": {
		label: "MedSync case study",
	},
};

function Icon({ name }: { name: AdminSection | "external" | "plus" }) {
	const paths = {
		settings: (
			<path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1m0-12.8-2.1 2.1m-8.6 8.6-2.1 2.1M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
		),
		projects: (
			<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5v-13ZM8 4v16M8 9h12" />
		),
		pages: (
			<path d="M6 3h9l4 4v14H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm8 0v5h5M8 12h7M8 16h7" />
		),
		media: (
			<path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11ZM4 16l4.5-4.5 3.5 3.4 2-2 6 6M16.5 8.5h.01" />
		),
		activity: <path d="M4 12h3l2-5 4 10 2-5h5M4 4v16h16" />,
		external: (
			<path d="M14 4h6v6m0-6-9 9M20 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4" />
		),
		plus: <path d="M12 5v14M5 12h14" />,
	};
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.8"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			{paths[name]}
		</svg>
	);
}

function StatusBadge({ status }: { status: ProjectStatus }) {
	return (
		<span className={`admin-status admin-status--${status}`}>{status}</span>
	);
}

export default function AdminPage({
	initialData,
}: {
	initialData: AdminContent;
}) {
	const [section, setSection] = useState<AdminSection>("projects");
	const [settings, setSettings] = useState(initialData.settings);
	const [projects, setProjects] = useState(initialData.projects);
	const [pages, setPages] = useState(initialData.pages);
	const [selectedPageKey, setSelectedPageKey] = useState<PageKey>("about");
	const [media, setMedia] = useState(initialData.media);
	const [selectedId, setSelectedId] = useState(
		initialData.projects[0]?.id ?? "",
	);
	const [notice, setNotice] = useState("Ready");
	const [busy, setBusy] = useState(false);

	const saveSite = useServerFn(saveSiteDraftFn);
	const publishSite = useServerFn(publishSiteFn);
	const saveProject = useServerFn(saveProjectDraftFn);
	const publishProject = useServerFn(publishProjectFn);
	const createProject = useServerFn(createProjectFn);
	const deleteProject = useServerFn(deleteProjectFn);
	const restoreRevision = useServerFn(restoreRevisionFn);
	const savePage = useServerFn(savePageDraftFn);
	const publishPage = useServerFn(publishPageFn);
	const selectedProject = useMemo(
		() => projects.find((project) => project.id === selectedId) ?? null,
		[projects, selectedId],
	);
	const selectedPage = useMemo(
		() => pages.find((page) => page.key === selectedPageKey) ?? null,
		[pages, selectedPageKey],
	);

	async function runAction(label: string, action: () => Promise<void>) {
		setBusy(true);
		setNotice(`${label}…`);
		try {
			await action();
			setNotice(`${label} complete`);
		} catch (error) {
			setNotice(error instanceof Error ? error.message : `${label} failed`);
		} finally {
			setBusy(false);
		}
	}

	function updateProject(next: AdminProject) {
		setProjects((current) =>
			current.map((project) => (project.id === next.id ? next : project)),
		);
	}

	function updatePage(next: AdminPageDocument) {
		setPages((current) =>
			current.map((page) => (page.key === next.key ? next : page)),
		);
	}

	async function addProject() {
		await runAction("Creating project", async () => {
			const project = await createProject();
			setProjects((current) => [...current, project]);
			setSelectedId(project.id);
			setSection("projects");
		});
	}

	async function removeProject(project: AdminProject) {
		if (
			!window.confirm(
				`Delete “${project.content.title}”? This removes its card, detail page and revisions.`,
			)
		) {
			return;
		}
		await runAction("Deleting project", async () => {
			await deleteProject({ data: project.id });
			const remaining = projects.filter((item) => item.id !== project.id);
			setProjects(remaining);
			setSelectedId(remaining[0]?.id ?? "");
		});
	}

	async function uploadAsset(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const form = event.currentTarget;
		await runAction("Uploading media", async () => {
			const response = await fetch("/api/admin/media", {
				method: "POST",
				body: new FormData(form),
			});
			const result = (await response.json()) as MediaAsset | { error: string };
			if (!response.ok || "error" in result) {
				throw new Error("error" in result ? result.error : "Upload failed");
			}
			setMedia((current) => [result, ...current]);
			form.reset();
		});
	}

	async function uploadResume(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const form = event.currentTarget;
		await runAction("Uploading resume", async () => {
			const formData = new FormData(form);
			formData.set("purpose", "resume");
			formData.set("altText", "Quyen Le Minh resume");
			const response = await fetch("/api/admin/media", {
				method: "POST",
				body: formData,
			});
			const result = (await response.json()) as MediaAsset | { error: string };
			if (!response.ok || "error" in result) {
				throw new Error(
					"error" in result ? result.error : "Resume upload failed",
				);
			}
			setMedia((current) => [result, ...current]);
			setSettings((current) => ({ ...current, resumeUrl: result.url }));
			form.reset();
		});
	}

	return (
		<div className="admin-shell" data-page="admin">
			<aside className="admin-sidebar">
				<div className="admin-brand">
					<span>QL</span>
					<div className="admin-topbar__status">
						<strong>Portfolio CMS</strong>
						<small>Content cockpit</small>
					</div>
				</div>
				<nav aria-label="Admin sections">
					{(
						[
							"projects",
							"pages",
							"settings",
							"media",
							"activity",
						] as AdminSection[]
					).map((item) => (
						<button
							key={item}
							type="button"
							className={section === item ? "is-active" : ""}
							onClick={() => setSection(item)}
						>
							<Icon name={item} />
							<span>{item[0].toUpperCase() + item.slice(1)}</span>
							{item === "projects" && <small>{projects.length}</small>}
						</button>
					))}
				</nav>
				<div className="admin-sidebar__footer">
					<span className="admin-live-dot" />
					<div>
						<strong>{initialData.identity.email}</strong>
						<small>{initialData.identity.mode.replaceAll("-", " ")}</small>
					</div>
				</div>
			</aside>

			<main className="admin-main">
				<header className="admin-topbar">
					<div>
						<p>QUYENLEE.DESIGN / ADMIN</p>
						<strong>{notice}</strong>
					</div>
					<div className="admin-topbar__actions">
						<Link to="/work" search={{ preview: true }} target="_blank">
							Preview drafts <Icon name="external" />
						</Link>
						<Link to="/" target="_blank">
							View live site <Icon name="external" />
						</Link>
					</div>
				</header>

				{section === "projects" && (
					<section className="admin-section">
						<div className="admin-section__heading">
							<div>
								<p>CASE STUDIES</p>
								<h1>Projects</h1>
								<span>Edit the cards visitors see on Selected Work.</span>
							</div>
							<button
								type="button"
								className="admin-button admin-button--dark"
								onClick={addProject}
								disabled={busy}
							>
								<Icon name="plus" /> New project
							</button>
						</div>
						<div className="admin-project-layout">
							<ul className="admin-project-list" aria-label="Project list">
								{projects.map((project) => (
									<li key={project.id}>
										<button
											type="button"
											className={`admin-project-button ${selectedId === project.id ? "is-selected" : ""}`}
											onClick={() => setSelectedId(project.id)}
										>
											<img src={project.content.coverUrl} alt="" />
											<span>
												<strong>{project.content.title}</strong>
												<small>{project.content.category}</small>
											</span>
											<StatusBadge status={project.status} />
										</button>
									</li>
								))}
							</ul>
							{selectedProject ? (
								<ProjectEditor
									project={selectedProject}
									busy={busy}
									onChange={updateProject}
									onSave={() =>
										runAction("Saving draft", async () => {
											await saveProject({ data: selectedProject });
										})
									}
									onPublish={() =>
										runAction("Publishing project", async () => {
											await saveProject({ data: selectedProject });
											await publishProject({ data: selectedProject.id });
											updateProject({
												...selectedProject,
												status: "published",
												publishedAt: new Date().toISOString(),
											});
										})
									}
									onDelete={() => removeProject(selectedProject)}
								/>
							) : (
								<div className="admin-empty">Create a project to begin.</div>
							)}
						</div>
					</section>
				)}

				{section === "pages" && (
					<section className="admin-section">
						<div className="admin-section__heading">
							<div>
								<p>LONG-FORM CONTENT</p>
								<h1>Pages</h1>
								<span>
									Edit standalone pages. Project details now live inside
									Projects.
								</span>
							</div>
							<Link
								to="/about"
								search={{ preview: true }}
								target="_blank"
								className="admin-button"
							>
								Preview this page <Icon name="external" />
							</Link>
						</div>
						<div
							className="admin-page-tabs"
							role="tablist"
							aria-label="Editable pages"
						>
							<button
								type="button"
								role="tab"
								aria-selected={selectedPageKey === "about"}
								className={`admin-page-tab ${selectedPageKey === "about" ? "is-active" : ""}`}
								onClick={() => setSelectedPageKey("about")}
							>
								<strong>About</strong>
								<span>/about</span>
							</button>
						</div>
						{selectedPage && (
							<PageEditor
								page={selectedPage}
								busy={busy}
								onChange={updatePage}
								onSave={() =>
									runAction("Saving page draft", async () => {
										await savePage({
											data: {
												key: selectedPage.key,
												content: selectedPage.content,
											},
										});
									})
								}
								onPublish={() =>
									runAction("Publishing page", async () => {
										await savePage({
											data: {
												key: selectedPage.key,
												content: selectedPage.content,
											},
										});
										await publishPage({ data: selectedPage.key });
										updatePage({
											...selectedPage,
											publishedAt: new Date().toISOString(),
										});
									})
								}
							/>
						)}
					</section>
				)}

				{section === "settings" && (
					<section className="admin-section">
						<div className="admin-section__heading">
							<div>
								<p>GLOBAL CONTENT</p>
								<h1>Site settings</h1>
								<span>Identity, hero copy, links and search metadata.</span>
							</div>
						</div>
						<div className="admin-panel admin-settings-form">
							<form
								className="admin-resume-upload is-wide"
								onSubmit={uploadResume}
							>
								<div>
									<span>RESUME PDF</span>
									<strong>
										Upload the CV used by the header download button
									</strong>
									<small>
										Uploading updates the draft URL. Publish settings when it is
										ready to go live.
									</small>
								</div>
								<input
									aria-label="Choose resume PDF"
									required
									name="file"
									type="file"
									accept="application/pdf,.pdf"
								/>
								<button
									className="admin-button admin-button--dark"
									disabled={busy}
									type="submit"
								>
									Upload CV
								</button>
							</form>
							{FIELD_LABELS.map((field) => (
								<label
									key={field.key}
									htmlFor={`site-setting-${field.key}`}
									className={field.wide ? "is-wide" : ""}
								>
									<span>{field.label}</span>
									{field.key === "seoDescription" ? (
										<textarea
											id={`site-setting-${field.key}`}
											value={settings[field.key]}
											onChange={(e) =>
												setSettings({
													...settings,
													[field.key]: e.target.value,
												})
											}
										/>
									) : (
										<input
											id={`site-setting-${field.key}`}
											type={field.type ?? "text"}
											value={settings[field.key]}
											onChange={(e) =>
												setSettings({
													...settings,
													[field.key]: e.target.value,
												})
											}
										/>
									)}
								</label>
							))}
							<div className="admin-form-actions is-wide">
								<button
									type="button"
									className="admin-button"
									disabled={busy}
									onClick={() =>
										runAction("Saving settings draft", async () => {
											await saveSite({ data: settings });
										})
									}
								>
									Save draft
								</button>
								<button
									type="button"
									className="admin-button admin-button--blue"
									disabled={busy}
									onClick={() =>
										runAction("Publishing settings", async () => {
											await saveSite({ data: settings });
											await publishSite();
										})
									}
								>
									Publish changes
								</button>
							</div>
						</div>
					</section>
				)}

				{section === "media" && (
					<section className="admin-section">
						<div className="admin-section__heading">
							<div>
								<p>R2 LIBRARY</p>
								<h1>Media</h1>
								<span>
									Upload images, PDFs and Lottie source files up to 15 MB.
								</span>
							</div>
						</div>
						<form className="admin-upload" onSubmit={uploadAsset}>
							<label>
								<span>Asset file</span>
								<input required name="file" type="file" />
							</label>
							<label>
								<span>Alt text</span>
								<input
									name="altText"
									placeholder="Describe the image for accessibility"
								/>
							</label>
							<button
								className="admin-button admin-button--blue"
								disabled={busy}
								type="submit"
							>
								Upload to library
							</button>
						</form>
						<div className="admin-media-grid">
							{media.map((asset) => (
								<article key={asset.id}>
									{asset.mimeType.startsWith("image/") ? (
										<img src={asset.url} alt={asset.altText} />
									) : (
										<div className="admin-file-tile">
											{asset.fileName.split(".").pop()?.toUpperCase()}
										</div>
									)}
									<strong>{asset.fileName}</strong>
									<small>{(asset.byteSize / 1024).toFixed(1)} KB</small>
									<button
										type="button"
										className="admin-copy-button"
										onClick={() => navigator.clipboard.writeText(asset.url)}
									>
										Copy URL
									</button>
								</article>
							))}
							{media.length === 0 && (
								<div className="admin-empty">No uploaded media yet.</div>
							)}
						</div>
					</section>
				)}

				{section === "activity" && (
					<section className="admin-section">
						<div className="admin-section__heading">
							<div>
								<p>CHANGE LOG</p>
								<h1>Activity</h1>
								<span>The 20 most recent content revisions.</span>
							</div>
						</div>
						<div className="admin-activity admin-panel">
							{initialData.revisions.map((revision) => (
								<article key={revision.id}>
									<span className="admin-activity__mark" />
									<div>
										<strong>{revision.action.replace("_", " ")}</strong>
										<p>
											{revision.entityType} / {revision.entityId}
										</p>
									</div>
									<small>
										{revision.actorEmail}
										<br />
										{new Date(revision.createdAt).toLocaleString()}
									</small>
									<button
										type="button"
										disabled={busy}
										onClick={() =>
											runAction("Restoring revision", async () => {
												await restoreRevision({ data: revision.id });
												window.location.reload();
											})
										}
									>
										Restore to draft
									</button>
								</article>
							))}
							{initialData.revisions.length === 0 && (
								<div className="admin-empty">No revisions yet.</div>
							)}
						</div>
					</section>
				)}
			</main>
		</div>
	);
}

function ProjectEditor({
	project,
	busy,
	onChange,
	onSave,
	onPublish,
	onDelete,
}: {
	project: AdminProject;
	busy: boolean;
	onChange: (project: AdminProject) => void;
	onSave: () => void;
	onPublish: () => void;
	onDelete: () => void;
}) {
	const content = project.content;
	const changeContent = (key: keyof AdminProject["content"], value: string) =>
		onChange({ ...project, content: { ...content, [key]: value } });
	const changeSlug = (value: string) => {
		const slug = value
			.toLowerCase()
			.replace(/[^a-z0-9-]+/g, "-")
			.replace(/-+/g, "-")
			.replace(/^-/, "");
		onChange({
			...project,
			slug,
			content: { ...content, detailPath: `/projects/${slug}` },
		});
	};
	return (
		<div className="admin-panel admin-project-editor">
			<div className="admin-editor__top">
				<div>
					<span>EDITING</span>
					<strong>{content.title}</strong>
				</div>
				<StatusBadge status={project.status} />
			</div>
			<label className="is-wide">
				<span>Project title</span>
				<input
					value={content.title}
					onChange={(e) => changeContent("title", e.target.value)}
				/>
			</label>
			<label className="is-wide">
				<span>URL slug · /projects/{project.slug || "your-project"}</span>
				<input
					value={project.slug}
					onChange={(e) => changeSlug(e.target.value)}
				/>
			</label>
			<label>
				<span>Category</span>
				<input
					value={content.category}
					onChange={(e) => changeContent("category", e.target.value)}
				/>
			</label>
			<label>
				<span>Case label</span>
				<input
					value={content.caseStudyLabel}
					onChange={(e) => changeContent("caseStudyLabel", e.target.value)}
				/>
			</label>
			<label className="is-wide">
				<span>Summary</span>
				<textarea
					value={content.summary}
					onChange={(e) => changeContent("summary", e.target.value)}
				/>
			</label>
			<label className="is-wide">
				<span>Cover URL</span>
				<input
					value={content.coverUrl}
					onChange={(e) => changeContent("coverUrl", e.target.value)}
				/>
			</label>
			<label>
				<span>Display order</span>
				<input
					type="number"
					min="0"
					max="999"
					value={project.sortOrder}
					onChange={(e) =>
						onChange({ ...project, sortOrder: Number(e.target.value) })
					}
				/>
			</label>
			<label>
				<span>Workflow status</span>
				<select
					value={project.status}
					onChange={(e) =>
						onChange({ ...project, status: e.target.value as ProjectStatus })
					}
				>
					<option value="draft">Draft</option>
					<option value="published">Published</option>
					<option value="archived">Archived</option>
				</select>
			</label>
			<label className="admin-checkbox">
				<input
					type="checkbox"
					checked={project.featured}
					onChange={(e) => onChange({ ...project, featured: e.target.checked })}
				/>
				<span>Featured project</span>
			</label>
			<section className="admin-project-detail-editor is-wide">
				<div className="admin-project-detail-editor__heading">
					<div>
						<span>PROJECT PAGE</span>
						<h2>Case-study detail</h2>
					</div>
					{project.slug && (
						<Link
							to="/projects/$slug"
							params={{ slug: project.slug }}
							search={{ preview: true }}
							target="_blank"
							className="admin-button"
						>
							Preview detail <Icon name="external" />
						</Link>
					)}
				</div>
				<ProjectDetailFields
					content={project.detailContent}
					onChange={(detailContent) => onChange({ ...project, detailContent })}
				/>
			</section>
			<div className="admin-form-actions is-wide">
				<button
					type="button"
					className="admin-button admin-button--danger"
					disabled={busy}
					onClick={onDelete}
				>
					Delete project
				</button>
				<span className="admin-form-actions__spacer" />
				<button
					type="button"
					className="admin-button"
					disabled={busy}
					onClick={onSave}
				>
					Save draft
				</button>
				<button
					type="button"
					className="admin-button admin-button--blue"
					disabled={busy}
					onClick={onPublish}
				>
					Publish now
				</button>
			</div>
		</div>
	);
}

function PageEditor({
	page,
	busy,
	onChange,
	onSave,
	onPublish,
}: {
	page: AdminPageDocument;
	busy: boolean;
	onChange: (page: AdminPageDocument) => void;
	onSave: () => void;
	onPublish: () => void;
}) {
	return (
		<div className="admin-panel admin-page-editor">
			<div className="admin-editor__top">
				<div>
					<span>EDITING PAGE</span>
					<strong>{PAGE_LABELS[page.key].label}</strong>
				</div>
				<span className="admin-status admin-status--published">
					{page.publishedAt ? "published" : "not published"}
				</span>
			</div>
			{page.key === "about" ? (
				<AboutPageFields
					content={page.content}
					onChange={(content) => onChange({ ...page, content })}
				/>
			) : (
				<ProjectDetailFields
					content={page.content}
					onChange={(content) => onChange({ ...page, content })}
				/>
			)}
			<div className="admin-form-actions">
				<button
					type="button"
					className="admin-button"
					disabled={busy}
					onClick={onSave}
				>
					Save page draft
				</button>
				<button
					type="button"
					className="admin-button admin-button--blue"
					disabled={busy}
					onClick={onPublish}
				>
					Publish page
				</button>
			</div>
		</div>
	);
}

function PageField({
	label,
	value,
	onChange,
	multiline = false,
}: {
	label: string;
	value: string;
	onChange: (value: string) => void;
	multiline?: boolean;
}) {
	const inputId = useId();
	return (
		<label htmlFor={inputId} className={multiline ? "is-wide" : ""}>
			<span>{label}</span>
			{multiline ? (
				<textarea
					id={inputId}
					value={value}
					onChange={(event) => onChange(event.target.value)}
				/>
			) : (
				<input
					id={inputId}
					value={value}
					onChange={(event) => onChange(event.target.value)}
				/>
			)}
		</label>
	);
}

function StringListEditor({
	title,
	items,
	onChange,
}: {
	title: string;
	items: string[];
	onChange: (items: string[]) => void;
}) {
	return (
		<section className="admin-collection">
			<div className="admin-collection__heading">
				<strong>{title}</strong>
				<button
					className="admin-add-row"
					type="button"
					onClick={() => onChange([...items, "New item"])}
				>
					Add item
				</button>
			</div>
			{items.map((item, index) => (
				<div className="admin-string-row" key={`${title}-${item}`}>
					<input
						value={item}
						aria-label={`${title} ${index + 1}`}
						onChange={(event) =>
							onChange(
								items.map((current, itemIndex) =>
									itemIndex === index ? event.target.value : current,
								),
							)
						}
					/>
					<button
						className="admin-remove-string"
						type="button"
						aria-label={`Remove ${item}`}
						onClick={() =>
							onChange(items.filter((_, itemIndex) => itemIndex !== index))
						}
					>
						×
					</button>
				</div>
			))}
		</section>
	);
}

type CollectionField<T> = { key: keyof T; label: string; multiline?: boolean };

function CollectionEditor<T extends object>({
	title,
	items,
	fields,
	emptyItem,
	onChange,
}: {
	title: string;
	items: T[];
	fields: Array<CollectionField<T>>;
	emptyItem: T;
	onChange: (items: T[]) => void;
}) {
	return (
		<section className="admin-collection is-wide">
			<div className="admin-collection__heading">
				<strong>{title}</strong>
				<button
					className="admin-add-row"
					type="button"
					onClick={() => onChange([...items, emptyItem])}
				>
					Add row
				</button>
			</div>
			{items.map((item, index) => (
				<div
					className="admin-collection-row"
					key={`${title}-${JSON.stringify(item)}`}
				>
					<div className="admin-collection-row__number">
						{String(index + 1).padStart(2, "0")}
					</div>
					<div className="admin-collection-row__fields">
						{fields.map((field) => {
							const fieldId = `${title}-${index}-${String(field.key)}`.replace(
								/[^a-zA-Z0-9_-]/g,
								"-",
							);
							return (
								<label
									key={String(field.key)}
									htmlFor={fieldId}
									className={field.multiline ? "is-wide" : ""}
								>
									<span>{field.label}</span>
									{field.multiline ? (
										<textarea
											id={fieldId}
											value={String(item[field.key] ?? "")}
											onChange={(event) =>
												onChange(
													items.map((current, itemIndex) =>
														itemIndex === index
															? Object.assign({}, current, {
																	[field.key]: event.target.value,
																})
															: current,
													),
												)
											}
										/>
									) : (
										<input
											id={fieldId}
											value={String(item[field.key] ?? "")}
											onChange={(event) =>
												onChange(
													items.map((current, itemIndex) =>
														itemIndex === index
															? Object.assign({}, current, {
																	[field.key]: event.target.value,
																})
															: current,
													),
												)
											}
										/>
									)}
								</label>
							);
						})}
					</div>
					<button
						className="admin-remove-row"
						type="button"
						aria-label={`Remove ${title} row ${index + 1}`}
						onClick={() =>
							onChange(items.filter((_, itemIndex) => itemIndex !== index))
						}
					>
						Remove
					</button>
				</div>
			))}
		</section>
	);
}

function AboutPageFields({
	content,
	onChange,
}: {
	content: AboutContent;
	onChange: (content: AboutContent) => void;
}) {
	const set = <K extends keyof AboutContent>(key: K, value: AboutContent[K]) =>
		onChange({ ...content, [key]: value });
	return (
		<div className="admin-page-fields">
			<h2>Hero &amp; biography</h2>
			<PageField
				label="Kicker"
				value={content.kicker}
				onChange={(value) => set("kicker", value)}
			/>
			<PageField
				label="Page title"
				value={content.title}
				onChange={(value) => set("title", value)}
			/>
			<PageField
				multiline
				label="First biography paragraph"
				value={content.bioOne}
				onChange={(value) => set("bioOne", value)}
			/>
			<PageField
				multiline
				label="Second biography paragraph"
				value={content.bioTwo}
				onChange={(value) => set("bioTwo", value)}
			/>
			<h2>Profile board</h2>
			<PageField
				label="Photo URL"
				value={content.photoUrl}
				onChange={(value) => set("photoUrl", value)}
			/>
			<PageField
				label="Photo alt text"
				value={content.photoAlt}
				onChange={(value) => set("photoAlt", value)}
			/>
			<PageField
				label="Photo caption"
				value={content.photoTitle}
				onChange={(value) => set("photoTitle", value)}
			/>
			<PageField
				label="Photo subtitle"
				value={content.photoSubtitle}
				onChange={(value) => set("photoSubtitle", value)}
			/>
			<PageField
				label="Years experience"
				value={content.yearsExperience}
				onChange={(value) => set("yearsExperience", value)}
			/>
			<StringListEditor
				title="Daily kit"
				items={content.dailyKit}
				onChange={(items) => set("dailyKit", items)}
			/>
			<StringListEditor
				title="Skills"
				items={content.skills}
				onChange={(items) => set("skills", items)}
			/>
			<StringListEditor
				title="Beyond the screen"
				items={content.interests}
				onChange={(items) => set("interests", items)}
			/>
			<CollectionEditor
				title="Credentials"
				items={content.credentials}
				emptyItem={{ title: "New credential", source: "Source" }}
				fields={[
					{ key: "title", label: "Credential" },
					{ key: "source", label: "Source" },
				]}
				onChange={(items) => set("credentials", items)}
			/>
			<CollectionEditor
				title="Journey"
				items={content.journey}
				emptyItem={{
					period: "Year",
					role: "Role",
					company: "Company",
					description: "Description",
				}}
				fields={[
					{ key: "period", label: "Period" },
					{ key: "role", label: "Role" },
					{ key: "company", label: "Company" },
					{ key: "description", label: "Description", multiline: true },
				]}
				onChange={(items) => set("journey", items)}
			/>
			<CollectionEditor
				title="Impact metrics"
				items={content.impact}
				emptyItem={{
					icon: "/assets/work-icon-zap.svg",
					tag: "Metric",
					value: "0",
					description: "Description",
				}}
				fields={[
					{ key: "tag", label: "Tag" },
					{ key: "value", label: "Value" },
					{ key: "icon", label: "Icon URL" },
					{ key: "description", label: "Description", multiline: true },
				]}
				onChange={(items) => set("impact", items)}
			/>
			<CollectionEditor
				title="Design philosophy"
				items={content.philosophy}
				emptyItem={{
					icon: "/assets/work-icon-sparkles.svg",
					title: "Principle",
					description: "Description",
				}}
				fields={[
					{ key: "title", label: "Title" },
					{ key: "icon", label: "Icon URL" },
					{ key: "description", label: "Description", multiline: true },
				]}
				onChange={(items) => set("philosophy", items)}
			/>
		</div>
	);
}

function ProjectDetailFields({
	content,
	onChange,
}: {
	content: ProjectDetailContent;
	onChange: (content: ProjectDetailContent) => void;
}) {
	const set = <K extends keyof ProjectDetailContent>(
		key: K,
		value: ProjectDetailContent[K],
	) => onChange({ ...content, [key]: value });
	return (
		<div className="admin-page-fields">
			<h2>Case study hero</h2>
			<PageField
				label="Eyebrow"
				value={content.eyebrow}
				onChange={(value) => set("eyebrow", value)}
			/>
			<PageField
				label="Title"
				value={content.title}
				onChange={(value) => set("title", value)}
			/>
			<PageField
				label="Title accent"
				value={content.titleAccent}
				onChange={(value) => set("titleAccent", value)}
			/>
			<PageField
				multiline
				label="Lead paragraph"
				value={content.lead}
				onChange={(value) => set("lead", value)}
			/>
			<PageField
				label="Cover URL"
				value={content.coverUrl}
				onChange={(value) => set("coverUrl", value)}
			/>
			<PageField
				label="Cover alt text"
				value={content.coverAlt}
				onChange={(value) => set("coverAlt", value)}
			/>
			<PageField
				label="Top note"
				value={content.coverTopNote}
				onChange={(value) => set("coverTopNote", value)}
			/>
			<PageField
				label="Bottom note"
				value={content.coverBottomNote}
				onChange={(value) => set("coverBottomNote", value)}
			/>
			<CollectionEditor
				title="Project metadata"
				items={content.meta}
				emptyItem={{ label: "Label", value: "Value" }}
				fields={[
					{ key: "label", label: "Label" },
					{ key: "value", label: "Value" },
				]}
				onChange={(items) => set("meta", items)}
			/>
			<h2>Brief &amp; research</h2>
			<PageField
				multiline
				label="Brief title"
				value={content.briefTitle}
				onChange={(value) => set("briefTitle", value)}
			/>
			<PageField
				multiline
				label="Brief body"
				value={content.briefBody}
				onChange={(value) => set("briefBody", value)}
			/>
			<PageField
				multiline
				label="How might we"
				value={content.howMightWe}
				onChange={(value) => set("howMightWe", value)}
			/>
			<PageField
				label="Research title"
				value={content.researchTitle}
				onChange={(value) => set("researchTitle", value)}
			/>
			<PageField
				label="Research tag"
				value={content.researchTag}
				onChange={(value) => set("researchTag", value)}
			/>
			<CollectionEditor
				title="Research signals"
				items={content.researchSignals}
				emptyItem={{ number: "00", title: "Signal", body: "Description" }}
				fields={[
					{ key: "number", label: "Number" },
					{ key: "title", label: "Title" },
					{ key: "body", label: "Body", multiline: true },
				]}
				onChange={(items) => set("researchSignals", items)}
			/>
			<PageField
				multiline
				label="Research quote"
				value={content.quote}
				onChange={(value) => set("quote", value)}
			/>
			<PageField
				label="Quote citation"
				value={content.quoteCite}
				onChange={(value) => set("quoteCite", value)}
			/>
			<h2>Decisions &amp; outcomes</h2>
			<PageField
				multiline
				label="Decisions title"
				value={content.decisionsTitle}
				onChange={(value) => set("decisionsTitle", value)}
			/>
			<CollectionEditor
				title="Flow steps"
				items={content.flowSteps}
				emptyItem={{ step: "00", title: "Step", body: "Description" }}
				fields={[
					{ key: "step", label: "Step" },
					{ key: "title", label: "Title" },
					{ key: "body", label: "Body", multiline: true },
				]}
				onChange={(items) => set("flowSteps", items)}
			/>
			<CollectionEditor
				title="Decision cards"
				items={content.decisionCards}
				emptyItem={{ label: "DECISION", title: "Title", body: "Description" }}
				fields={[
					{ key: "label", label: "Label" },
					{ key: "title", label: "Title" },
					{ key: "body", label: "Body", multiline: true },
				]}
				onChange={(items) => set("decisionCards", items)}
			/>
			<PageField
				multiline
				label="Outcomes title"
				value={content.outcomesTitle}
				onChange={(value) => set("outcomesTitle", value)}
			/>
			<PageField
				label="Outcomes tag"
				value={content.outcomesTag}
				onChange={(value) => set("outcomesTag", value)}
			/>
			<CollectionEditor
				title="Outcome metrics"
				items={content.outcomes}
				emptyItem={{ value: "0", label: "Outcome" }}
				fields={[
					{ key: "value", label: "Value" },
					{ key: "label", label: "Label" },
				]}
				onChange={(items) => set("outcomes", items)}
			/>
			<PageField
				multiline
				label="Reflection"
				value={content.reflection}
				onChange={(value) => set("reflection", value)}
			/>
			<PageField
				label="Next-project title"
				value={content.nextTitle}
				onChange={(value) => set("nextTitle", value)}
			/>
		</div>
	);
}

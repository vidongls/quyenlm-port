import { useEffect, useState } from "react";
import DraggableSticker from "./DraggableSticker";

const DEFAULT_LOCATION = {
	label: "Ha Noi, VN",
	latitude: 21.0285,
	longitude: 105.8542,
	timezone: "Asia/Ho_Chi_Minh",
};
const WEATHER_REFRESH_INTERVAL = 10 * 60 * 1000;

type LiveConditions = {
	location: string;
	temperature: number | null;
	timezone: string;
};

type WeatherResponse = {
	current?: {
		temperature_2m?: number;
	};
	timezone?: string;
};

type LocationResponse = {
	city?: string;
	countryCode?: string;
	locality?: string;
	principalSubdivision?: string;
};

export default function HomeWidgets() {
	return (
		<>
			<TimeCard />
			<ExperienceSticker />
			<ToolkitSticker />
		</>
	);
}

function TimeCard() {
	const { date, location, temperature, time } = useLiveConditions();

	return (
		<aside className="home-time-card absolute top-[227.5px] -right-[300px] z-20 flex w-[283px] flex-col gap-6 rounded-2xl border-2 border-ink bg-white p-4 shadow-[4px_4px_0_rgba(30,30,30,0.15)]">
			<div className="flex flex-col gap-1">
				<strong className="font-display text-[32px] leading-[1.2] font-extrabold tracking-[-0.16px] text-ink">
					{time}
				</strong>
				<span className="font-ui text-sm leading-[1.5] tracking-[-0.07px] text-muted">
					{date}
				</span>
			</div>

			<div className="h-px w-full bg-ink opacity-10" />

			<div
				className="flex items-center justify-between font-ui text-[13px] leading-[1.4] font-semibold tracking-[-0.065px] text-ink"
				aria-live="polite"
			>
				<span className="flex items-center gap-1.5">
					<img src="/assets/home-map-pin.svg" alt="" className="size-3.5" />
					<span className="max-w-[145px] truncate">{location}</span>
				</span>
				<a
					href="https://open-meteo.com/"
					target="_blank"
					rel="noreferrer"
					className="flex items-center gap-1.5 text-ink"
					title="Live weather data by Open-Meteo"
				>
					<img src="/assets/home-sun.svg" alt="" className="size-3.5" />
					{temperature === null ? "--°C" : `${Math.round(temperature)}°C`}
				</a>
			</div>
		</aside>
	);
}

function useLiveConditions() {
	const [now, setNow] = useState<Date | null>(null);
	const [conditions, setConditions] = useState<LiveConditions>({
		location: DEFAULT_LOCATION.label,
		temperature: null,
		timezone: DEFAULT_LOCATION.timezone,
	});

	useEffect(() => {
		setNow(new Date());
		const clockInterval = window.setInterval(() => setNow(new Date()), 1000);

		return () => window.clearInterval(clockInterval);
	}, []);

	useEffect(() => {
		let cancelled = false;
		let weatherInterval: number | undefined;
		let activeLocation = DEFAULT_LOCATION;

		async function updateConditions(
			location: typeof DEFAULT_LOCATION,
			resolveLocationName = false,
		) {
			const weatherUrl = new URL("https://api.open-meteo.com/v1/forecast");
			weatherUrl.search = new URLSearchParams({
				latitude: String(location.latitude),
				longitude: String(location.longitude),
				current: "temperature_2m",
				timezone: "auto",
				forecast_days: "1",
			}).toString();

			const weatherRequest = fetch(weatherUrl).then(async (response) => {
				if (!response.ok) throw new Error("Weather request failed");
				return (await response.json()) as WeatherResponse;
			});

			const locationRequest = resolveLocationName
				? fetch(
						`https://api.bigdatacloud.net/data/reverse-geocode-client?${new URLSearchParams(
							{
								latitude: String(location.latitude),
								longitude: String(location.longitude),
								localityLanguage: "en",
							},
						)}`,
					).then(async (response) => {
						if (!response.ok) throw new Error("Location request failed");
						return (await response.json()) as LocationResponse;
					})
				: Promise.resolve(null);

			const [weatherResult, locationResult] = await Promise.allSettled([
				weatherRequest,
				locationRequest,
			]);
			if (cancelled) return;

			const weather =
				weatherResult.status === "fulfilled" ? weatherResult.value : null;
			const resolvedLocation =
				locationResult.status === "fulfilled" ? locationResult.value : null;
			const city =
				resolvedLocation?.city ||
				resolvedLocation?.locality ||
				resolvedLocation?.principalSubdivision;
			const country = resolvedLocation?.countryCode;

			setConditions((current) => ({
				location:
					city && country
						? `${city}, ${country}`
						: city || current.location || location.label,
				temperature: weather?.current?.temperature_2m ?? current.temperature,
				timezone: weather?.timezone || current.timezone || location.timezone,
			}));
		}

		function startWeatherRefresh(location: typeof DEFAULT_LOCATION) {
			activeLocation = location;
			window.clearInterval(weatherInterval);
			weatherInterval = window.setInterval(
				() => void updateConditions(activeLocation, false),
				WEATHER_REFRESH_INTERVAL,
			);
		}

		function applyFallbackLocation() {
			void updateConditions(DEFAULT_LOCATION);
			startWeatherRefresh(DEFAULT_LOCATION);
		}

		if (!navigator.geolocation) {
			applyFallbackLocation();
		} else {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const localPosition = {
						...DEFAULT_LOCATION,
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
					};
					void updateConditions(localPosition, true);
					startWeatherRefresh(localPosition);
				},
				applyFallbackLocation,
				{
					enableHighAccuracy: false,
					maximumAge: WEATHER_REFRESH_INTERVAL,
					timeout: 8000,
				},
			);
		}

		return () => {
			cancelled = true;
			window.clearInterval(weatherInterval);
		};
	}, []);

	const timezone = conditions.timezone;
	const time = now
		? new Intl.DateTimeFormat("en-GB", {
				hour: "2-digit",
				hour12: false,
				minute: "2-digit",
				timeZone: timezone,
			}).format(now)
		: "--:--";
	const date = now
		? new Intl.DateTimeFormat("en-GB", {
				day: "2-digit",
				month: "short",
				timeZone: timezone,
				weekday: "short",
				year: "numeric",
			})
				.format(now)
				.replace(",", "")
		: "Loading local time";

	return {
		date,
		location: conditions.location,
		temperature: conditions.temperature,
		time,
	};
}

function ExperienceSticker() {
	return (
		<DraggableSticker
			ariaLabel="Move years of experience sticker"
			className="absolute top-[481.81px] left-[385.61px] z-30 flex h-[103.25px] w-[168.22px] items-center justify-center"
		>
			<aside className="home-experience-sticker flex w-40 -rotate-6 flex-col items-start gap-1 rounded-2xl border-2 border-ink bg-highlight-yellow p-3.5 text-center text-ink shadow-[4px_4px_0_rgba(30,30,30,0.15)]">
				<strong className="font-display text-[32px] leading-[1.2] font-extrabold tracking-[-0.16px]">
					5+
				</strong>
				<span className="font-ui text-xs leading-[1.4] font-bold tracking-[0.6px]">
					Years Exp
				</span>
			</aside>
		</DraggableSticker>
	);
}

function ToolkitSticker() {
	return (
		<DraggableSticker
			ariaLabel="Move daily toolkit sticker"
			className="absolute top-[908.55px] left-[723.31px] z-20 flex h-[145.86px] w-[195.23px] items-center justify-center"
		>
			<aside className="home-toolkit-sticker flex w-[180px] rotate-8 flex-col items-start gap-2 rounded-2xl border-2 border-ink bg-highlight-blue p-4 font-ui leading-[1.4] font-semibold whitespace-nowrap text-white shadow-[4px_4px_0_rgba(30,30,30,0.15)]">
				<strong className="text-sm tracking-[-0.07px]">My Daily Kit:</strong>
				<ul className="flex list-none flex-col gap-1 p-0 text-[13px] tracking-[-0.065px]">
					<li>⚡️ Figma</li>
					<li>✨ Maze (Research)</li>
					<li>🎨 Miro / FigJam</li>
				</ul>
			</aside>
		</DraggableSticker>
	);
}

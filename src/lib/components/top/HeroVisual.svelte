<script lang="ts">
	// Hero visual: the factory digital twin with animated worker routes and the
	// clickable hotspots/popup cards from the previous hero and, in front, a
	// cut-out photo of a worker wearing Astra. The background image and the SVG share the same
	// 1920×1072 coordinate space and both use centred "cover" cropping, so the
	// routes stay on the floor plan at any frame size.
	import { onMount } from 'svelte';
	import { AlertCircle } from 'lucide-svelte';
	import { cn } from '$lib/utils';
	import { topImageUrl } from './TopImage.svelte';

	let {
		backgroundAlt,
		workerAlt,
		class: className
	}: { backgroundAlt: string; workerAlt: string; class?: string } = $props();

	/** Transparent-background cut-out, placed in src/lib/assets/top/ */
	const workerSrc = topImageUrl('hero-worker.webp');

	type Route = {
		color: string;
		shimmer: string;
		path: string;
		pathLength: number;
		drawDuration: number;
		drawDelay: number;
		loopMs: number;
		dotDelayMs: number;
	};

	const ROUTES: Route[] = [
		{
			color: '#ff3b3b',
			shimmer: '#ff6b6b',
			path: 'M 155 328 C 173 336, 225 367, 260 376 C 295 385, 336 380, 366 383 C 396 386, 420 388, 439 393 C 458 398, 470 401, 479 414 C 488 427, 491 451, 492 469 C 493 487, 482 510, 487 523 C 492 536, 504 543, 521 549 C 538 555, 563 557, 590 558 C 617 559, 654 555, 681 554 C 708 554, 728 556, 753 555 C 779 554, 811 550, 834 549 C 857 548, 881 556, 890 547 C 899 538, 890 514, 890 493 C 890 472, 891 442, 891 421 C 892 400, 893 383, 893 368 C 893 353, 889 345, 890 333 C 891 321, 895 306, 901 297 C 907 289, 915 286, 926 282 C 937 278, 954 277, 967 275 C 980 274, 990 274, 1002 273 C 1014 273, 1030 272, 1041 272 C 1052 272, 1061 276, 1067 274 C 1073 272, 1076 263, 1078 259 C 1080 255, 1079 254, 1079 249 C 1079 244, 1078 236, 1078 231 C 1078 226, 1077 222, 1077 217 C 1077 213, 1076 207, 1076 204 C 1076 201, 1077 201, 1078 201 C 1079 201, 1082 202, 1082 204 C 1082 206, 1079 210, 1079 215 C 1079 220, 1080 228, 1080 234 C 1080 241, 1077 248, 1079 254 C 1081 260, 1087 264, 1093 268 C 1099 272, 1104 273, 1113 276 C 1122 279, 1135 285, 1147 285 C 1159 285, 1173 280, 1184 277 C 1195 274, 1203 274, 1212 267 C 1221 260, 1233 245, 1237 235 C 1241 225, 1236 215, 1234 209 C 1232 203, 1227 203, 1223 201 C 1219 199, 1211 199, 1209 198',
			pathLength: 1671,
			drawDuration: 3,
			drawDelay: 1,
			loopMs: 9000,
			dotDelayMs: 3500
		},
		{
			color: '#3b8eff',
			shimmer: '#6bb3ff',
			path: 'M 343 934 C 344 927, 348 910, 347 894 C 346 878, 338 851, 337 836 C 336 821, 338 816, 342 803 C 346 791, 351 768, 362 761 C 373 754, 392 762, 408 761 C 424 760, 447 761, 460 753 C 473 746, 479 731, 485 716 C 491 701, 493 680, 495 664 C 497 648, 493 634, 495 620 C 497 606, 501 588, 506 578 C 512 568, 515 562, 528 558 C 542 555, 566 557, 587 557 C 609 557, 637 556, 657 556 C 677 556, 692 557, 708 557 C 724 557, 733 557, 753 558 C 773 559, 810 559, 829 561 C 848 563, 859 568, 868 571 C 877 574, 878 572, 881 577 C 884 582, 884 593, 885 602 C 886 611, 889 622, 889 630 C 889 638, 888 644, 885 652 C 882 660, 875 669, 871 678 C 868 688, 867 699, 864 709 C 861 720, 860 735, 852 741 C 844 747, 826 745, 815 743 C 804 741, 794 735, 788 729 C 782 723, 784 716, 781 707 C 778 698, 774 682, 772 676 C 771 670, 771 671, 772 671 C 773 671, 774 673, 776 674 C 778 675, 784 681, 782 679 C 780 677, 767 666, 766 664 C 765 662, 773 664, 775 666 C 777 668, 782 674, 780 676 C 779 678, 766 676, 766 679 C 766 682, 777 690, 781 696 C 785 702, 787 709, 790 715 C 793 721, 792 729, 797 734 C 802 739, 812 747, 821 747 C 830 748, 847 747, 853 737 C 859 727, 856 701, 859 689 C 862 677, 868 678, 873 667 C 878 656, 887 637, 888 625 C 889 613, 880 605, 878 594 C 876 583, 875 573, 878 561 C 881 549, 890 532, 897 523 C 904 514, 909 512, 918 508 C 927 504, 935 501, 949 499 C 963 497, 985 495, 1001 495 C 1017 495, 1036 500, 1045 500 C 1054 500, 1053 497, 1054 496 C 1056 495, 1054 494, 1054 494',
			pathLength: 1754,
			drawDuration: 2.8,
			drawDelay: 1.6,
			loopMs: 11000,
			dotDelayMs: 4000
		},
		{
			color: '#2dd4a0',
			shimmer: '#5de8c0',
			path: 'M 1701 179 C 1697 181, 1686 188, 1677 193 C 1668 198, 1658 202, 1649 207 C 1640 212, 1635 218, 1623 224 C 1611 230, 1587 236, 1578 242 C 1569 248, 1571 251, 1568 258 C 1565 265, 1561 273, 1558 283 C 1555 293, 1553 307, 1549 318 C 1545 329, 1538 342, 1536 350 C 1534 358, 1537 363, 1538 367 C 1539 371, 1540 377, 1540 376 C 1540 375, 1538 363, 1539 361 C 1540 359, 1544 361, 1545 363 C 1546 365, 1547 370, 1547 371 C 1547 372, 1546 369, 1543 371 C 1540 374, 1531 379, 1530 386 C 1530 393, 1539 403, 1540 412 C 1541 422, 1536 434, 1536 443 C 1536 452, 1536 457, 1538 467 C 1540 477, 1539 496, 1547 503 C 1555 510, 1579 507, 1586 507 C 1593 507, 1589 502, 1589 502 C 1589 502, 1585 507, 1584 508 C 1583 509, 1583 509, 1583 508 C 1583 508, 1584 505, 1583 505 C 1582 505, 1582 508, 1578 509 C 1574 510, 1563 510, 1557 510 C 1551 510, 1546 512, 1542 508 C 1538 504, 1533 495, 1531 487 C 1530 479, 1532 468, 1533 458 C 1534 448, 1535 439, 1535 428 C 1535 417, 1533 401, 1534 391 C 1535 381, 1540 372, 1541 368 C 1542 364, 1541 368, 1541 368 C 1541 368, 1541 369, 1541 368 C 1541 367, 1540 369, 1541 360 C 1542 351, 1544 328, 1545 314 C 1546 300, 1548 289, 1545 277 C 1542 265, 1532 255, 1528 244 C 1524 233, 1520 226, 1519 213 C 1518 200, 1523 174, 1523 166 C 1523 158, 1520 164, 1520 164 C 1520 164, 1517 161, 1524 167 C 1531 173, 1553 191, 1563 201 C 1574 211, 1577 222, 1587 227 C 1597 232, 1613 234, 1624 232 C 1636 230, 1645 223, 1656 216 C 1667 209, 1683 195, 1690 190 C 1697 185, 1698 185, 1700 184',
			pathLength: 1147,
			drawDuration: 2.5,
			drawDelay: 2.2,
			loopMs: 13000,
			dotDelayMs: 4500
		}
	];

	type Hotspot = {
		id: 'detour' | 'idle';
		x: number;
		y: number;
		label: string;
		title: string;
	};

	const HOTSPOT_COLOR = '#f5a623';
	const HOTSPOTS: Hotspot[] = [
		{
			id: 'detour',
			x: 1078,
			y: 230,
			label: 'Off-standard Routing',
			title: 'Off-standard Routing Identified'
		},
		{ id: 'idle', x: 787, y: 702, label: 'Dwell Zone', title: 'Dwell Zone Detected' }
	];

	let activeHotspot = $state<Hotspot['id'] | null>(null);
	let frameW = $state(0);
	let frameH = $state(0);

	// Card position in the cropped frame. The SVG uses "slice" (cover) scaling, so
	// map the 1920×1072 coordinates the same way before placing the card.
	function cardPosition(h: Hotspot, w: number, ht: number) {
		if (!w || w < 640) return {}; // phone: the card fills the frame via CSS
		const scale = Math.max(w / 1920, ht / 1072);
		const x = h.x * scale + (w - 1920 * scale) / 2;
		const y = h.y * scale + (ht - 1072 * scale) / 2;
		const cardW = Math.min(330, w - 32);
		const onRight = x > w * 0.55;
		const left = onRight ? Math.max(8, x - cardW - 24) : Math.min(x + 24, w - cardW - 8);
		const top = Math.max(8, Math.min(ht - 230, y - 40));
		return {
			left: `${left}px`,
			top: `${top}px`,
			'--origin-x': onRight ? '100%' : '0%',
			'--origin-y': '20%'
		};
	}

	function onHotspotKey(event: KeyboardEvent, id: Hotspot['id']) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			activeHotspot = id;
		}
	}

	// Routes are drawn client-side only; the background image renders on the server (LCP).
	let mounted = $state(false);
	let reducedMotion = $state(false);
	const pathEls: SVGPathElement[] = [];
	const dotEls: SVGCircleElement[] = [];

	onMount(() => {
		reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		mounted = true;
	});

	// Move each worker dot along its route; with reduced motion, park it at the route's end.
	$effect(() => {
		if (!mounted) return;
		const frames: number[] = [];
		const timers: ReturnType<typeof setTimeout>[] = [];

		ROUTES.forEach((route, i) => {
			const pathEl = pathEls[i];
			const dotEl = dotEls[i];
			if (!pathEl || !dotEl) return;
			const total = pathEl.getTotalLength();
			const place = (length: number) => {
				const pt = pathEl.getPointAtLength(length);
				dotEl.setAttribute('cx', String(pt.x));
				dotEl.setAttribute('cy', String(pt.y));
			};

			if (reducedMotion) {
				place(total);
				return;
			}

			let start: number | null = null;
			const tick = (ts: number) => {
				start ??= ts;
				place((((ts - start) % route.loopMs) / route.loopMs) * total);
				frames[i] = requestAnimationFrame(tick);
			};
			timers.push(
				setTimeout(() => {
					place(0);
					frames[i] = requestAnimationFrame(tick);
				}, route.dotDelayMs)
			);
		});

		return () => {
			frames.forEach((f) => cancelAnimationFrame(f));
			timers.forEach((t) => clearTimeout(t));
		};
	});
</script>

<svelte:window onkeydown={(e) => e.key === 'Escape' && (activeHotspot = null)} />

<div
	bind:clientWidth={frameW}
	bind:clientHeight={frameH}
	class={cn('bg-z-placeholder relative overflow-hidden', className)}
>
	<picture>
		<source
			srcset="/images/factory_digitaltwin-800.webp 800w,
				/images/factory_digitaltwin-1280.webp 1280w,
				/images/factory_digitaltwin.webp 1920w"
			type="image/webp"
			sizes="(max-width: 1248px) 100vw, 1200px"
		/>
		<img
			src="/images/factory_digitaltwin.png"
			alt={backgroundAlt}
			width="1920"
			height="1072"
			loading="eager"
			fetchpriority="high"
			decoding="async"
			class="absolute inset-0 h-full w-full object-cover"
		/>
	</picture>

	{#if mounted}
		<svg
			class="absolute inset-0 h-full w-full"
			class:reduced={reducedMotion}
			viewBox="0 0 1920 1072"
			preserveAspectRatio="xMidYMid slice"
			aria-hidden="true"
		>
			<defs>
				<filter id="hero-route-glow" x="-50%" y="-50%" width="200%" height="200%">
					<feGaussianBlur stdDeviation="3" result="blur" />
					<feMerge>
						<feMergeNode in="blur" />
						<feMergeNode in="SourceGraphic" />
					</feMerge>
				</filter>
				{#each ROUTES as route, i (route.color)}
					<filter id="hero-dot-glow-{i}" x="-100%" y="-100%" width="300%" height="300%">
						<feGaussianBlur stdDeviation="5" result="blur" />
						<feFlood flood-color={route.color} flood-opacity="0.6" result="color" />
						<feComposite in="color" in2="blur" operator="in" result="coloredBlur" />
						<feMerge>
							<feMergeNode in="coloredBlur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
				{/each}
				<filter id="hero-hotspot-glow" x="-50%" y="-50%" width="200%" height="200%">
					<feGaussianBlur stdDeviation="1" result="blur" />
					<feMerge>
						<feMergeNode in="blur" />
						<feMergeNode in="SourceGraphic" />
					</feMerge>
				</filter>
			</defs>

			{#each ROUTES as route, i (route.color)}
				<!-- Route, drawn in via stroke-dashoffset -->
				<path
					bind:this={pathEls[i]}
					class="route-draw"
					d={route.path}
					fill="none"
					stroke={route.color}
					stroke-width="3"
					stroke-linecap="round"
					stroke-linejoin="round"
					filter="url(#hero-route-glow)"
					stroke-dasharray={route.pathLength}
					stroke-dashoffset={reducedMotion ? 0 : route.pathLength}
					vector-effect="non-scaling-stroke"
					style="animation-duration: {route.drawDuration}s; animation-delay: {route.drawDelay}s;"
				/>
				<!-- Shimmer travelling along the route -->
				{#if !reducedMotion}
					<path
						class="route-shimmer"
						d={route.path}
						fill="none"
						stroke={route.shimmer}
						stroke-width="3"
						stroke-linecap="round"
						stroke-dasharray="14 500"
						opacity="0.85"
						vector-effect="non-scaling-stroke"
						style="animation-duration: {(route.loopMs / 1000) *
							0.5}s; animation-delay: {route.drawDelay + route.drawDuration}s;"
					/>
				{/if}
				<!-- Worker position -->
				<circle
					bind:this={dotEls[i]}
					class="route-dot"
					r="6"
					cx="0"
					cy="0"
					fill={route.color}
					filter="url(#hero-dot-glow-{i})"
					style="animation-delay: {route.dotDelayMs / 1000}s;"
				/>
			{/each}
		</svg>

		<!-- Hotspots: warning icons that open a popup card (separate SVG so they stay focusable) -->
		<svg
			class="pointer-events-none absolute inset-0 h-full w-full"
			viewBox="0 0 1920 1072"
			preserveAspectRatio="xMidYMid slice"
		>
			{#each HOTSPOTS as hotspot (hotspot.id)}
				<g
					role="button"
					tabindex="0"
					aria-label={hotspot.title}
					aria-expanded={activeHotspot === hotspot.id}
					class="hotspot pointer-events-auto cursor-pointer"
					transform="translate({hotspot.x}, {hotspot.y})"
					onclick={() => (activeHotspot = hotspot.id)}
					onkeydown={(e) => onHotspotKey(e, hotspot.id)}
				>
					<circle class="hotspot-ping" r="21" fill={HOTSPOT_COLOR} />
					<g class="hotspot-icon">
						<circle r="21" fill={HOTSPOT_COLOR} opacity="0.3" />
						<g filter="url(#hero-hotspot-glow)">
							<circle r="21" fill="none" stroke="white" stroke-width="4" />
							<line
								x1="0"
								y1="-8"
								x2="0"
								y2="-1"
								stroke="white"
								stroke-width="4"
								stroke-linecap="round"
							/>
							<circle cx="0" cy="5.6" r="2.1" fill="white" />
						</g>
						<text
							class="hotspot-label"
							x="24"
							y="4"
							font-size="11"
							font-weight="600"
							fill="white"
							stroke="#08080a"
							stroke-width="3"
							paint-order="stroke"
							aria-hidden="true">{hotspot.label}</text
						>
					</g>
				</g>
			{/each}
		</svg>

		<!-- Popup cards -->
		{#each HOTSPOTS as hotspot (hotspot.id)}
			{@const pos = cardPosition(hotspot, frameW, frameH)}
			<div
				class="popup-card"
				class:popup-active={activeHotspot === hotspot.id}
				style:left={pos.left}
				style:top={pos.top}
				style:--origin-x={pos['--origin-x']}
				style:--origin-y={pos['--origin-y']}
				role="dialog"
				aria-label={hotspot.title}
				aria-hidden={activeHotspot !== hotspot.id}
				inert={activeHotspot !== hotspot.id}
			>
				<div class="mb-2 flex items-start justify-between gap-2 sm:mb-4 sm:gap-3">
					<span
						class="flex items-center gap-1 text-lg font-bold sm:gap-2"
						style:color={HOTSPOT_COLOR}
					>
						<AlertCircle size={20} aria-hidden="true" />
						{hotspot.title}
					</span>
					<button
						type="button"
						class="ml-auto shrink-0 text-lg text-white/60 hover:text-white"
						aria-label="Close"
						onclick={() => (activeHotspot = null)}>✕</button
					>
				</div>
				{#if hotspot.id === 'detour'}
					<p class="text-base leading-snug text-white/60 sm:leading-relaxed">
						Operator A traveled <span class="font-semibold text-white">+17 m</span> beyond optimal route.
					</p>
					<div class="mt-1 text-base text-white/60 sm:mt-3">
						Est. daily loss:
						<span class="font-semibold" style:color={HOTSPOT_COLOR}>~7 min</span>
					</div>
				{:else}
					<p class="mb-1 text-base leading-snug text-white/60 sm:mb-3 sm:leading-relaxed">
						Avg. dwell time in zone: <span class="font-semibold text-white">8.3 min/hr</span>
					</p>
					<div class="h-2.5 w-full overflow-hidden rounded-full bg-white/10">
						<div class="idle-bar-fill h-full rounded-full" style:background={HOTSPOT_COLOR}></div>
					</div>
					<div class="mt-2 text-sm text-white/60">30% of shift affected</div>
				{/if}
			</div>
		{/each}
	{/if}

	<!-- Worker wearing Astra, in front of the digital twin. Smaller on tablets so it doesn't cover the hotspot; clicks pass through to the hotspots. -->
	{#if workerSrc}
		<img
			src={workerSrc}
			alt={workerAlt}
			width="1200"
			height="900"
			loading="eager"
			decoding="async"
			class="pointer-events-none absolute right-[4%] bottom-0 h-[96%] w-auto max-w-[60%] object-contain object-bottom md:right-[-4%] md:h-[85%] lg:right-[-2%] lg:h-[96%] xl:right-[6%]"
		/>
	{:else}
		<!-- TODO(images): placeholder until src/lib/assets/top/hero-worker.webp is added -->
		<div
			role="img"
			aria-label={workerAlt}
			data-missing-image="hero-worker.webp"
			class="border-z-border-strong text-z-text-caption absolute right-[4%] bottom-0 flex h-[90%] w-[34%] items-center justify-center rounded-t-[999px] border-2 border-b-0 border-dashed bg-white/70 p-3 text-center text-xs md:right-[6%] md:w-[24%] dark:bg-black/50"
		>
			<span aria-hidden="true">{workerAlt}</span>
		</div>
	{/if}
</div>

<style>
	.route-draw {
		animation-name: draw-route;
		animation-timing-function: ease-out;
		animation-fill-mode: forwards;
	}
	.route-shimmer {
		stroke-dashoffset: 514;
		animation-name: shimmer-route;
		animation-timing-function: linear;
		animation-iteration-count: infinite;
	}
	.route-dot {
		opacity: 0;
		transform-box: fill-box;
		transform-origin: center;
		animation:
			fade-in 0.3s ease forwards,
			pulse-dot 2s ease-in-out infinite;
	}
	.reduced .route-draw,
	.reduced .route-dot {
		animation: none;
		opacity: 1;
	}

	@keyframes draw-route {
		to {
			stroke-dashoffset: 0;
		}
	}
	@keyframes shimmer-route {
		to {
			stroke-dashoffset: 0;
		}
	}
	@keyframes fade-in {
		to {
			opacity: 1;
		}
	}
	.hotspot:focus-visible {
		outline: 3px solid #ffffff;
		outline-offset: 4px;
	}
	.hotspot-ping {
		opacity: 0.75;
		transform-box: fill-box;
		transform-origin: center;
		animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
	}
	.hotspot-label {
		opacity: 0;
		animation: fade-in 0.3s ease 5s forwards;
	}
	.reduced + svg .hotspot-label {
		animation: none;
		opacity: 1;
	}
	.popup-card {
		position: absolute;
		z-index: 20;
		width: 330px;
		background: #131317;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 18px;
		padding: 30px;
		box-shadow: 0 12px 40px -8px rgba(0, 0, 0, 0.7);
		opacity: 0;
		pointer-events: none;
		transform: scale(0.3);
		transform-origin: var(--origin-x, 50%) var(--origin-y, 50%);
		transition:
			opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
	}
	.popup-card.popup-active {
		opacity: 1;
		pointer-events: auto;
		transform: scale(1);
	}
	.idle-bar-fill {
		width: 0%;
		transition: width 0.8s ease 0.3s;
	}
	.popup-card.popup-active .idle-bar-fill {
		width: 80%;
	}
	@media (max-width: 639px) {
		.hotspot-icon {
			transform: scale(3);
			transform-origin: 0px 0px;
		}
		.popup-card {
			inset: 8px;
			width: auto;
			font-size: clamp(0.65rem, 3.2vw, 0.875rem);
			padding: 16px;
			border-radius: 12px;
			overflow-y: auto;
			word-break: break-word;
			transform-origin: center center;
		}
	}

	@keyframes ping {
		75%,
		100% {
			transform: scale(2);
			opacity: 0;
		}
	}
	@keyframes pulse-dot {
		0%,
		100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.5);
		}
	}
</style>

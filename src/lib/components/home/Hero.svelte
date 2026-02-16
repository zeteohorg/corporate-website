<script lang="ts">
	import { page } from '$app/stores';
	import { translations } from '$lib/i18n/translations';
	import { buttonVariants } from '$lib/components/ui/button';
	import { AlertCircle } from 'lucide-svelte';
	import { onMount } from 'svelte';

	// ── Interfaces ──────────────────────────────────────────────────────────────
	interface OperatorConfig {
		id: string;
		label: string;
		color: string;
		glowColor: string;
		trailAnimColor: string;
		path: string;
		pathLength: number;
		drawDuration: number;
		drawDelay: number;
		animDuration: number;
		dotDelay: number;
		pulseDelay: number;
		filterId: string;
	}
	interface HotspotCard {
		title: string;
		titleColor: string;
		type: 'detour' | 'idle';
	}
	interface HotspotConfig {
		id: string;
		x: number;
		y: number;
		label: string;
		accentColor: string;
		glowColor: string;
		pulseDelay: number;
		filterColor: string;
		card: HotspotCard | null;
	}

	// ── TRAJECTORY CONFIG — edit paths to match your floor plan ─────────────────
	const OPERATORS: OperatorConfig[] = [
		{
			id: 'w1',
			label: 'Operator A',
			color: '#ff3b3b',
			glowColor: 'rgba(255,59,59,0.45)',
			trailAnimColor: '#ff6b6b',
			filterId: 'viz-glow-red',
			path: 'M 155 328 C 173 336, 225 367, 260 376 C 295 385, 336 380, 366 383 C 396 386, 420 388, 439 393 C 458 398, 470 401, 479 414 C 488 427, 491 451, 492 469 C 493 487, 482 510, 487 523 C 492 536, 504 543, 521 549 C 538 555, 563 557, 590 558 C 617 559, 654 555, 681 554 C 708 554, 728 556, 753 555 C 779 554, 811 550, 834 549 C 857 548, 881 556, 890 547 C 899 538, 890 514, 890 493 C 890 472, 891 442, 891 421 C 892 400, 893 383, 893 368 C 893 353, 889 345, 890 333 C 891 321, 895 306, 901 297 C 907 289, 915 286, 926 282 C 937 278, 954 277, 967 275 C 980 274, 990 274, 1002 273 C 1014 273, 1030 272, 1041 272 C 1052 272, 1061 276, 1067 274 C 1073 272, 1076 263, 1078 259 C 1080 255, 1079 254, 1079 249 C 1079 244, 1078 236, 1078 231 C 1078 226, 1077 222, 1077 217 C 1077 213, 1076 207, 1076 204 C 1076 201, 1077 201, 1078 201 C 1079 201, 1082 202, 1082 204 C 1082 206, 1079 210, 1079 215 C 1079 220, 1080 228, 1080 234 C 1080 241, 1077 248, 1079 254 C 1081 260, 1087 264, 1093 268 C 1099 272, 1104 273, 1113 276 C 1122 279, 1135 285, 1147 285 C 1159 285, 1173 280, 1184 277 C 1195 274, 1203 274, 1212 267 C 1221 260, 1233 245, 1237 235 C 1241 225, 1236 215, 1234 209 C 1232 203, 1227 203, 1223 201 C 1219 199, 1211 199, 1209 198',
			pathLength: 1671,
			drawDuration: 3,
			drawDelay: 1,
			animDuration: 9000,
			dotDelay: 3500,
			pulseDelay: 3.5
		},
		{
			id: 'w2',
			label: 'Operator B',
			color: '#3b8eff',
			glowColor: 'rgba(59,142,255,0.4)',
			trailAnimColor: '#6bb3ff',
			filterId: 'viz-glow-blue',
			path: 'M 343 934 C 344 927, 348 910, 347 894 C 346 878, 338 851, 337 836 C 336 821, 338 816, 342 803 C 346 791, 351 768, 362 761 C 373 754, 392 762, 408 761 C 424 760, 447 761, 460 753 C 473 746, 479 731, 485 716 C 491 701, 493 680, 495 664 C 497 648, 493 634, 495 620 C 497 606, 501 588, 506 578 C 512 568, 515 562, 528 558 C 542 555, 566 557, 587 557 C 609 557, 637 556, 657 556 C 677 556, 692 557, 708 557 C 724 557, 733 557, 753 558 C 773 559, 810 559, 829 561 C 848 563, 859 568, 868 571 C 877 574, 878 572, 881 577 C 884 582, 884 593, 885 602 C 886 611, 889 622, 889 630 C 889 638, 888 644, 885 652 C 882 660, 875 669, 871 678 C 868 688, 867 699, 864 709 C 861 720, 860 735, 852 741 C 844 747, 826 745, 815 743 C 804 741, 794 735, 788 729 C 782 723, 784 716, 781 707 C 778 698, 774 682, 772 676 C 771 670, 771 671, 772 671 C 773 671, 774 673, 776 674 C 778 675, 784 681, 782 679 C 780 677, 767 666, 766 664 C 765 662, 773 664, 775 666 C 777 668, 782 674, 780 676 C 779 678, 766 676, 766 679 C 766 682, 777 690, 781 696 C 785 702, 787 709, 790 715 C 793 721, 792 729, 797 734 C 802 739, 812 747, 821 747 C 830 748, 847 747, 853 737 C 859 727, 856 701, 859 689 C 862 677, 868 678, 873 667 C 878 656, 887 637, 888 625 C 889 613, 880 605, 878 594 C 876 583, 875 573, 878 561 C 881 549, 890 532, 897 523 C 904 514, 909 512, 918 508 C 927 504, 935 501, 949 499 C 963 497, 985 495, 1001 495 C 1017 495, 1036 500, 1045 500 C 1054 500, 1053 497, 1054 496 C 1056 495, 1054 494, 1054 494',
			pathLength: 1754,
			drawDuration: 2.8,
			drawDelay: 1.6,
			animDuration: 11000,
			dotDelay: 4000,
			pulseDelay: 4
		},
		{
			id: 'w3',
			label: 'Operator C',
			color: '#2dd4a0',
			glowColor: 'rgba(45,212,160,0.4)',
			trailAnimColor: '#5de8c0',
			filterId: 'viz-glow-green',
			path: 'M 1701 179 C 1697 181, 1686 188, 1677 193 C 1668 198, 1658 202, 1649 207 C 1640 212, 1635 218, 1623 224 C 1611 230, 1587 236, 1578 242 C 1569 248, 1571 251, 1568 258 C 1565 265, 1561 273, 1558 283 C 1555 293, 1553 307, 1549 318 C 1545 329, 1538 342, 1536 350 C 1534 358, 1537 363, 1538 367 C 1539 371, 1540 377, 1540 376 C 1540 375, 1538 363, 1539 361 C 1540 359, 1544 361, 1545 363 C 1546 365, 1547 370, 1547 371 C 1547 372, 1546 369, 1543 371 C 1540 374, 1531 379, 1530 386 C 1530 393, 1539 403, 1540 412 C 1541 422, 1536 434, 1536 443 C 1536 452, 1536 457, 1538 467 C 1540 477, 1539 496, 1547 503 C 1555 510, 1579 507, 1586 507 C 1593 507, 1589 502, 1589 502 C 1589 502, 1585 507, 1584 508 C 1583 509, 1583 509, 1583 508 C 1583 508, 1584 505, 1583 505 C 1582 505, 1582 508, 1578 509 C 1574 510, 1563 510, 1557 510 C 1551 510, 1546 512, 1542 508 C 1538 504, 1533 495, 1531 487 C 1530 479, 1532 468, 1533 458 C 1534 448, 1535 439, 1535 428 C 1535 417, 1533 401, 1534 391 C 1535 381, 1540 372, 1541 368 C 1542 364, 1541 368, 1541 368 C 1541 368, 1541 369, 1541 368 C 1541 367, 1540 369, 1541 360 C 1542 351, 1544 328, 1545 314 C 1546 300, 1548 289, 1545 277 C 1542 265, 1532 255, 1528 244 C 1524 233, 1520 226, 1519 213 C 1518 200, 1523 174, 1523 166 C 1523 158, 1520 164, 1520 164 C 1520 164, 1517 161, 1524 167 C 1531 173, 1553 191, 1563 201 C 1574 211, 1577 222, 1587 227 C 1597 232, 1613 234, 1624 232 C 1636 230, 1645 223, 1656 216 C 1667 209, 1683 195, 1690 190 C 1697 185, 1698 185, 1700 184',
			pathLength: 1147,
			drawDuration: 2.5,
			drawDelay: 2.2,
			animDuration: 13000,
			dotDelay: 4500,
			pulseDelay: 4.5
		}
	];

	const HOTSPOTS: HotspotConfig[] = [
		{
			id: 'detour',
			x: 1078,
			y: 230,
			label: 'Off-standard Routing',
			accentColor: '#f5a623',
			glowColor: 'rgba(245,166,35,0.15)',
			pulseDelay: 4,
			filterColor: 'orange',
			card: { title: 'Off-standard Routing Identified', titleColor: '#f5a623', type: 'detour' }
		},
		{
			id: 'idle',
			x: 787,
			y: 702,
			label: 'Dwell Zone',
			accentColor: '#f5a623',
			glowColor: 'rgba(245,166,35,0.15)',
			pulseDelay: 4.5,
			filterColor: 'orange',
			card: { title: 'Dwell Zone Detected', titleColor: '#f5a623', type: 'idle' }
		}
	];

	// ── Reactive state ───────────────────────────────────────────────────────────
	const currentLanguage = $derived(($page.params.lang ?? 'en') as keyof typeof translations);
	const t = $derived(translations[currentLanguage].home.hero);

	let isContentVisible = $state(false);
	let activeHotspot = $state<string | null>(null);
	let resizeTick = $state(0);
	let containerEl: HTMLDivElement | undefined = $state();
	let pathEls: SVGPathElement[] = [];
	let dotEls: SVGCircleElement[] = [];

	// ── Actions to collect per-operator refs ────────────────────────────────────
	function pathRef(node: SVGPathElement, index: number) {
		pathEls[index] = node;
		return {
			destroy() {
				delete pathEls[index];
			}
		};
	}
	function dotRef(node: SVGCircleElement, index: number) {
		dotEls[index] = node;
		return {
			destroy() {
				delete dotEls[index];
			}
		};
	}

	// ── Animation via $effect ────────────────────────────────────────────────────
	$effect(() => {
		if (!isContentVisible) return;
		const rafHandles: number[] = [];
		const timeoutHandles: ReturnType<typeof setTimeout>[] = [];

		OPERATORS.forEach((operator, i) => {
			const pathEl = pathEls[i];
			const dotEl = dotEls[i];
			if (!pathEl || !dotEl) return;
			const totalLength = pathEl.getTotalLength();
			let startTs: number | null = null;
			const tick = (ts: number) => {
				if (!startTs) startTs = ts;
				const progress = ((ts - startTs) % operator.animDuration) / operator.animDuration;
				const pt = pathEl.getPointAtLength(progress * totalLength);
				dotEl.setAttribute('cx', String(pt.x));
				dotEl.setAttribute('cy', String(pt.y));
				rafHandles[i] = requestAnimationFrame(tick);
			};
			const tid = setTimeout(() => {
				const pt = pathEl.getPointAtLength(0);
				dotEl.setAttribute('cx', String(pt.x));
				dotEl.setAttribute('cy', String(pt.y));
				rafHandles[i] = requestAnimationFrame(tick);
			}, operator.dotDelay);
			timeoutHandles.push(tid);
		});

		return () => {
			rafHandles.forEach((h) => cancelAnimationFrame(h));
			timeoutHandles.forEach((t) => clearTimeout(t));
		};
	});

	// ── Lifecycle ────────────────────────────────────────────────────────────────
	onMount(() => {
		isContentVisible = true;
		const onResize = () => {
			resizeTick++;
		};
		window.addEventListener('resize', onResize);
		return () => {
			window.removeEventListener('resize', onResize);
		};
	});

	// ── Popup positioning ────────────────────────────────────────────────────────
	function getCardPosition(hotspot: HotspotConfig, _tick: number) {
		if (!containerEl) return {};
		if (containerEl.offsetWidth < 640) return {}; // mobile: CSS fills the canvas
		const px = (hotspot.x / 1920) * 100;
		const py = (hotspot.y / 1072) * 100;
		const cardWidth = Math.min(330, containerEl.offsetWidth - 32); // keep 16px margin each side
		const cardWidthPct = (cardWidth / containerEl.offsetWidth) * 100;
		const left =
			px > 55 ? Math.max(2, px - cardWidthPct - 3) : Math.min(px + 3, 100 - cardWidthPct - 2);
		const top = Math.max(2, Math.min(70, py - 5));
		const originX = px > 55 ? '100%' : '0%';
		const originY = top < 5 ? '0%' : top > 65 ? '80%' : '20%';
		return { left: `${left}%`, top: `${top}%`, '--origin-x': originX, '--origin-y': originY };
	}
</script>

<div class="relative min-h-[100vh] sm:min-h-0">
	<!-- Top halo -->
	<div
		class="absolute left-1/2 -z-10 h-[200px] w-[200px] -translate-x-1/2 transform-gpu overflow-hidden blur-[90px] sm:top-[100px]"
		aria-hidden="true"
	>
		<div
			class="relative left-[calc(50%)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[hsl(var(--destructive))] to-[hsl(var(--primary))] opacity-90"
		></div>
	</div>

	<div
		class="container mx-auto px-4 pt-8 pb-16 sm:px-6 sm:pt-10 sm:pb-20 lg:px-8 lg:pt-12 lg:pb-24"
	>
		<!-- Hero Content -->
		<div class="mx-auto max-w-4xl text-center">
			<h1
				class="mt-10 text-4xl font-bold tracking-tight whitespace-pre-line sm:text-4xl md:text-5xl lg:text-6xl"
			>
				{t.title}
			</h1>
			<p class="text-muted-foreground mt-4 text-lg leading-8 sm:mt-6 sm:text-lg sm:leading-9">
				{t.subtitle}
			</p>
		</div>

		<!-- Factory Canvas Visualization -->
		<div class="mt-6 sm:mt-8">
			<div
				bind:this={containerEl}
				class="relative mx-auto w-full max-w-6xl overflow-hidden rounded-2xl"
				style="box-shadow: 0 0 0 1px rgba(255,255,255,0.05), 0 30px 90px -20px rgba(0,0,0,0.7), 0 0 140px -50px rgba(255,59,59,0.25);"
			>
				<!-- Base factory image (always rendered for SSR/LCP) -->
				<picture>
					<source
						srcset="/images/factory_digitaltwin-800.webp 800w,
                /images/factory_digitaltwin-1280.webp 1280w,
                /images/factory_digitaltwin.webp 1920w"
						type="image/webp"
						sizes="(max-width: 800px) 100vw, (max-width: 1280px) 90vw, 1280px"
					/>
					<img
						src="/images/factory_digitaltwin.png"
						alt="Factory digital twin"
						width="1920"
						height="1072"
						class="block h-auto w-full"
						loading="eager"
						fetchpriority="high"
						decoding="async"
					/>
				</picture>

				{#if isContentVisible}
					<!-- SVG trajectory overlay -->
					<svg
						class="absolute inset-0 h-full w-full"
						viewBox="0 0 1920 1072"
						preserveAspectRatio="xMidYMid slice"
						xmlns="http://www.w3.org/2000/svg"
					>
						<defs>
							<filter id="viz-glow" x="-50%" y="-50%" width="200%" height="200%">
								<feGaussianBlur stdDeviation="3" result="blur" />
								<feMerge>
									<feMergeNode in="blur" />
									<feMergeNode in="SourceGraphic" />
								</feMerge>
							</filter>
							<filter id="viz-glow-red" x="-100%" y="-100%" width="300%" height="300%">
								<feGaussianBlur stdDeviation="5" result="blur" />
								<feFlood flood-color="rgba(255,59,59,0.6)" result="color" />
								<feComposite in="color" in2="blur" operator="in" result="coloredBlur" />
								<feMerge>
									<feMergeNode in="coloredBlur" />
									<feMergeNode in="SourceGraphic" />
								</feMerge>
							</filter>
							<filter id="viz-glow-blue" x="-100%" y="-100%" width="300%" height="300%">
								<feGaussianBlur stdDeviation="5" result="blur" />
								<feFlood flood-color="rgba(59,142,255,0.6)" result="color" />
								<feComposite in="color" in2="blur" operator="in" result="coloredBlur" />
								<feMerge>
									<feMergeNode in="coloredBlur" />
									<feMergeNode in="SourceGraphic" />
								</feMerge>
							</filter>
							<filter id="viz-glow-green" x="-100%" y="-100%" width="300%" height="300%">
								<feGaussianBlur stdDeviation="5" result="blur" />
								<feFlood flood-color="rgba(45,212,160,0.6)" result="color" />
								<feComposite in="color" in2="blur" operator="in" result="coloredBlur" />
								<feMerge>
									<feMergeNode in="coloredBlur" />
									<feMergeNode in="SourceGraphic" />
								</feMerge>
							</filter>
							<filter id="hotspot-glow" x="-50%" y="-50%" width="200%" height="200%">
								<feGaussianBlur stdDeviation="1" result="blur" />
								<feMerge>
									<feMergeNode in="blur" />
									<feMergeNode in="SourceGraphic" />
								</feMerge>
							</filter>
							<filter id="hotspot-glow-red" x="-100%" y="-100%" width="300%" height="300%">
								<feGaussianBlur stdDeviation="2" result="blur" />
								<feFlood flood-color="rgba(255,59,59,0.5)" result="color" />
								<feComposite in="color" in2="blur" operator="in" result="coloredBlur" />
								<feMerge>
									<feMergeNode in="coloredBlur" />
									<feMergeNode in="SourceGraphic" />
								</feMerge>
							</filter>
							<filter id="hotspot-glow-orange" x="-100%" y="-100%" width="300%" height="300%">
								<feGaussianBlur stdDeviation="2" result="blur" />
								<feFlood flood-color="rgba(245,166,35,0.5)" result="color" />
								<feComposite in="color" in2="blur" operator="in" result="coloredBlur" />
								<feMerge>
									<feMergeNode in="coloredBlur" />
									<feMergeNode in="SourceGraphic" />
								</feMerge>
							</filter>
						</defs>

						{#each OPERATORS as operator, i}
							<!-- 1. Trail background (thick, translucent) -->
							<path
								d={operator.path}
								fill="none"
								stroke={operator.color}
								stroke-width="3"
								opacity="0.9"
								stroke-linecap="round"
								stroke-linejoin="round"
								vector-effect="non-scaling-stroke"
							/>
							<!-- 2. Trail main (animates drawing via stroke-dashoffset) -->
							<path
								d={operator.path}
								fill="none"
								stroke={operator.color}
								stroke-width="3"
								stroke-linecap="round"
								stroke-linejoin="round"
								filter="url(#viz-glow)"
								stroke-dasharray={operator.pathLength}
								stroke-dashoffset={operator.pathLength}
								vector-effect="non-scaling-stroke"
								style="animation: drawPath {operator.drawDuration}s ease-out {operator.drawDelay}s forwards;"
								use:pathRef={i}
							/>
							<!-- 3. Trail anim (moving dash shimmer) -->
							<path
								d={operator.path}
								fill="none"
								stroke={operator.trailAnimColor}
								stroke-width="3"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-dasharray="14 500"
								opacity="0.85"
								vector-effect="non-scaling-stroke"
								style="animation: moveDash {(operator.animDuration / 1000) *
									0.5}s linear {operator.drawDelay + operator.drawDuration}s infinite;"
							/>
							<!-- 4. Operator dot (positioned by requestAnimationFrame) -->
							<circle
								r="6"
								cx="0"
								cy="0"
								fill={operator.color}
								filter="url(#{operator.filterId})"
								style="opacity:0; animation: fadeIn .3s ease {operator.pulseDelay}s forwards, pulseOperator 2s ease-in-out {operator.pulseDelay}s infinite; transform-box:fill-box; transform-origin:center;"
								use:dotRef={i}
							/>
						{/each}

						{#each HOTSPOTS as hotspot}
							<g
								role={hotspot.card ? 'button' : 'presentation'}
								tabindex={hotspot.card ? 0 : undefined}
								transform="translate({hotspot.x}, {hotspot.y})"
								onclick={() => hotspot.card && (activeHotspot = hotspot.id)}
								style="cursor:{hotspot.card ? 'pointer' : 'default'};"
							>
								<!-- Ping ring (animated) - subtle like Tailwind -->
								<circle class="hotspot-ping" r="21" fill={hotspot.accentColor} />

								<g class="hotspot-icon">
									<!-- Static center circle -->
									<circle r="21" fill={hotspot.accentColor} opacity="0.3" />

									<!-- Icon graphic (clean, minimal blur) - 40% larger -->
									<g filter="url(#hotspot-glow)">
										<circle
											cx="0"
											cy="0"
											r="21"
											fill="none"
											stroke="white"
											stroke-width="4"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
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

									<!-- 8. Label (existing) -->
									<text
										x="24"
										y="4"
										font-size="11"
										font-weight="600"
										fill="white"
										stroke="#08080a"
										stroke-width="3"
										paint-order="stroke"
										style="opacity: 0; animation: fadeIn .3s ease 5s forwards;"
										>{hotspot.label}</text
									>
								</g>
							</g>
						{/each}
					</svg>

					<!-- Popup cards -->
					{#each HOTSPOTS.filter((h) => h.card) as hotspot}
						{@const pos = getCardPosition(hotspot, resizeTick)}
						<div
							class="popup-card"
							class:popup-active={activeHotspot === hotspot.id}
							style:left={pos.left}
							style:top={pos.top}
							style:--origin-x={pos['--origin-x']}
							style:--origin-y={pos['--origin-y']}
						>
							<div class="card-header mb-2 flex items-start justify-between gap-2 sm:mb-4 sm:gap-3">
								<span
									class="flex items-center gap-1 text-lg font-bold sm:gap-2"
									style:color={hotspot.card?.titleColor}
								>
									<AlertCircle size={20} />
									{hotspot.card?.title}
								</span>
								<button
									class="text-muted-foreground ml-auto shrink-0 text-lg hover:text-white"
									onclick={() => (activeHotspot = null)}>✕</button
								>
							</div>
							{#if hotspot.card?.type === 'detour'}
								<p class="text-muted-foreground text-base leading-snug sm:leading-relaxed">
									Operator A traveled <span class="font-semibold text-white">+17 m</span> beyond optimal
									route.
								</p>
								<div class="text-muted-foreground mt-1 text-base sm:mt-3">
									Est. daily loss:
									<span class="font-semibold" style:color={hotspot.card.titleColor}>~7 min</span>
								</div>
							{:else if hotspot.card?.type === 'idle'}
								<p
									class="text-muted-foreground mb-1 text-base leading-snug sm:mb-3 sm:leading-relaxed"
								>
									Avg. dwell time in zone: <span class="font-semibold text-white">8.3 min/hr</span>
								</p>
								<div class="h-2.5 w-full overflow-hidden rounded-full bg-white/10">
									<div
										class="idle-bar-fill h-full rounded-full"
										style:background={hotspot.card.titleColor}
									></div>
								</div>
								<div class="text-muted-foreground mt-2 text-sm">30% of shift affected</div>
							{/if}
						</div>
					{/each}
				{/if}
			</div>
			<!-- CTAs -->
			<div class="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-x-6">
				<a
					href="https://meetings-eu1.hubspot.com/satomi-le-guilly"
					target="_blank"
					class="{buttonVariants({ size: 'lg' })} !h-18 !px-14 !text-xl !text-white"
					style="box-shadow: 0 4px 24px -4px rgba(255,59,59,0.45);"
				>
					{t.getStarted}
				</a>
				<a
					href="https://meetings-eu1.hubspot.com/satomi-le-guilly"
					class="flex items-center justify-center text-xl leading-6 font-semibold"
				>
					{t.learnMore}
					<span aria-hidden="true" class="ml-1">→</span>
				</a>
			</div>
		</div>
	</div>

	<!-- Bottom halo -->
	<div
		class="absolute bottom-[100px] left-1/2 -z-10 hidden h-[100px] w-[300px] -translate-x-1/2 transform-gpu overflow-hidden blur-[64px] sm:bottom-[300px] sm:block"
		aria-hidden="true"
	>
		<div
			class="relative left-[calc(50%)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[hsl(var(--primary))] to-[hsl(var(--destructive))] opacity-50"
		></div>
	</div>
</div>

<style>
	@keyframes drawPath {
		to {
			stroke-dashoffset: 0;
		}
	}
	@keyframes moveDash {
		0% {
			stroke-dashoffset: 514;
		}
		100% {
			stroke-dashoffset: 0;
		}
	}
	@keyframes pulseOperator {
		0%,
		100% {
			transform: scale(1);
			opacity: 1;
		}
		50% {
			transform: scale(1.5);
			opacity: 0.65;
		}
	}
	@keyframes pulseRing {
		0%,
		100% {
			r: 14;
			opacity: 0.6;
		}
		50% {
			r: 22;
			opacity: 0.15;
		}
	}
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	@keyframes fadeInBg {
		from {
			opacity: 0;
		}
		to {
			opacity: 0.2;
		}
	}
	@keyframes ping {
		75%,
		100% {
			transform: scale(2);
			opacity: 0;
		}
	}

	.hotspot-ping {
		opacity: 0.75;
		transform-box: fill-box;
		transform-origin: center;
		animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
	}

	.hotspot-highlight {
		animation: pulseHighlight 2s ease-in-out 0.3s infinite;
	}
	@keyframes pulseHighlight {
		0%,
		100% {
			opacity: 0.6;
		}
		50% {
			opacity: 1;
		}
	}

	.popup-card {
		position: absolute;
		z-index: 20;
		width: 330px;
		background: #131317;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 18px;
		padding: 30px;
		pointer-events: auto;
		box-shadow: 0 12px 40px -8px rgba(0, 0, 0, 0.7);
		opacity: 0;
		transform: scale(0.3);
		transform-origin: var(--origin-x, 50%) var(--origin-y, 50%);
		transition:
			opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
	}
	.popup-card.popup-active {
		opacity: 1;
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
			position: absolute;
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
</style>

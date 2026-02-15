<script lang="ts">
	import { page } from '$app/stores';
	import { translations } from '$lib/i18n/translations';
	import { Download, FileText, Check } from 'lucide-svelte';
	import { onMount } from 'svelte';

	const currentLanguage = $derived($page.params.lang ?? 'en');
	const t = $derived(translations[currentLanguage].export);

	// Calculate dynamic dates
	const today = new Date();
	const oneWeekAgo = new Date(today);
	oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

	const formatDate = (date: Date) => {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	};

	const startDate = formatDate(oneWeekAgo);
	const endDate = formatDate(today);

	let selected = $state<boolean[]>([false, false, false]);
	let buttonState = $state<'idle' | 'downloading' | 'done'>('idle');
	let showToast = $state(false);
	let isAnimating = $state(false);
	let animationInterval: number | undefined;
	let mockupRef: HTMLDivElement;

	const selectedCount = $derived(selected.filter((s) => s).length);

	function runAnimationCycle() {
		// Reset state
		selected = [false, false, false];
		buttonState = 'idle';
		showToast = false;

		// Animation sequence
		setTimeout(() => (selected[0] = true), 600);
		setTimeout(() => (selected[1] = true), 1200);
		setTimeout(() => {
			// Pulse button
			const btn = document.getElementById('exportBtn');
			if (btn) {
				btn.style.animation = 'pulse 0.3s ease-out';
				setTimeout(() => (btn.style.animation = ''), 300);
			}
		}, 2000);
		setTimeout(() => (buttonState = 'downloading'), 2600);
		setTimeout(() => {
			buttonState = 'done';
			showToast = true;
		}, 4200);
		setTimeout(() => {
			selected = [false, false, false];
			buttonState = 'idle';
			showToast = false;
		}, 7000);
	}

	function startAnimation() {
		if (isAnimating) return;
		isAnimating = true;

		// Run first cycle immediately
		runAnimationCycle();

		// Loop every 8 seconds
		animationInterval = window.setInterval(() => {
			runAnimationCycle();
		}, 8000);
	}

	function stopAnimation() {
		isAnimating = false;
		if (animationInterval) {
			clearInterval(animationInterval);
			animationInterval = undefined;
		}
		// Reset to initial state
		selected = [false, false, false];
		buttonState = 'idle';
		showToast = false;
	}

	onMount(() => {
		if (!mockupRef) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					startAnimation();
				} else {
					stopAnimation();
				}
			},
			{ threshold: 0.3 }
		);

		observer.observe(mockupRef);

		return () => {
			observer.disconnect();
			stopAnimation();
		};
	});
</script>

<section class="bg-muted/50 py-20">
	<div class="container mx-auto px-4">
		<div class="grid items-center gap-12 lg:grid-cols-2">
			<!-- Left: Text -->
			<div>
				<div class="text-primary mb-4 flex items-center gap-2">
					<Download class="size-4" />
					<span class="text-sm font-semibold tracking-wider uppercase">
						{t.tag}
					</span>
				</div>
				<h2 class="mb-4 text-3xl font-bold sm:text-4xl">{t.title}</h2>
				<p class="text-muted-foreground mb-6 text-lg">{t.description}</p>
				<ul class="space-y-3">
					{#each t.features as feature}
						<li class="flex items-start gap-3">
							<FileText class="text-primary mt-0.5 size-5 shrink-0" />
							<span class="text-muted-foreground">{feature}</span>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Right: CSV Mockup -->
			<div bind:this={mockupRef} class="relative">
				<div class="csv-mockup">
					<!-- Titlebar -->
					<div class="csv-titlebar">
						<div class="flex items-center gap-1.5">
							<span class="csv-dot bg-red-500"></span>
							<span class="csv-dot bg-yellow-500"></span>
							<span class="csv-dot bg-green-500"></span>
						</div>
						<span class="csv-titlebar-text">{t.mockup.titlebar}</span>
						<div class="w-12"></div>
					</div>

					<!-- Body -->
					<div class="csv-body">
						<!-- Date Range -->
						<div class="csv-daterow">
							<span class="csv-date-input">{startDate}</span>
							<span class="csv-date-sep">→</span>
							<span class="csv-date-input">{endDate}</span>
						</div>

						<!-- Table -->
						<table class="csv-table">
							<thead>
								<tr>
									<th style="width: 36px"></th>
									<th>{t.mockup.columns.trajectory}</th>
									<th>{t.mockup.columns.deviceId}</th>
									<th>{t.mockup.columns.points}</th>
								</tr>
							</thead>
							<tbody>
								{#each t.mockup.workers as worker, i}
									<tr>
										<td>
											<div class="csv-check {selected[i] ? 'checked' : ''}">
												{#if selected[i]}
													<Check class="size-3 text-white" strokeWidth={3} />
												{/if}
											</div>
										</td>
										<td>
											<span class="csv-color {worker.color}"></span>
											{worker.name}
										</td>
										<td class="csv-device">{worker.deviceId}</td>
										<td class="csv-pts">{worker.points}</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>

					<!-- Footer -->
					<div class="csv-footer">
						<span class="csv-count">
							{selectedCount}
							{t.mockup.footer.selected}
						</span>
						<button class="csv-dl-btn" id="exportBtn" disabled>
							{#if buttonState === 'downloading'}
								<div class="spinner"></div>
								{t.mockup.footer.downloading}
							{:else if buttonState === 'done'}
								<Check class="size-4" strokeWidth={2.5} />
								{t.mockup.footer.ready}
							{:else}
								<Download class="size-4" strokeWidth={2.5} />
								{t.mockup.footer.exportButton}
							{/if}
						</button>
					</div>

					<!-- Toast Notification -->
					{#if showToast}
						<div class="csv-toast">
							<div class="csv-toast-icon">
								<FileText class="size-4 text-[#3b8eff]" />
							</div>
							<div>
								<div class="csv-toast-text">{t.mockup.toast.filename}</div>
								<div class="csv-toast-sub">{t.mockup.toast.details}</div>
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.csv-mockup {
		background: #0a0a0a;
		border-radius: 16px;
		border: 1px solid #1a1a1a;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
		overflow: hidden;
		position: relative;
	}

	.csv-titlebar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 16px;
		background: #1a1a1a;
		border-bottom: 1px solid #2a2a2a;
	}

	.csv-dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
	}

	.csv-titlebar-text {
		font-size: 13px;
		font-weight: 500;
		color: #888;
		flex: 1;
		text-align: center;
	}

	.csv-body {
		padding: 20px;
	}

	.csv-daterow {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 16px;
	}

	.csv-date-input {
		flex: 1;
		padding: 8px 12px;
		background: #1a1a1a;
		border: 1px solid #2a2a2a;
		border-radius: 6px;
		font-size: 14px;
		font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
		color: #e0e0e0;
		transition: all 0.2s ease;
	}

	.csv-date-sep {
		color: #666;
		font-size: 16px;
	}

	.csv-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 14px;
	}

	.csv-table th {
		text-align: left;
		padding: 8px 12px;
		font-weight: 600;
		color: #888;
		border-bottom: 2px solid #2a2a2a;
		font-size: 12px;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.csv-table td {
		padding: 12px;
		border-bottom: 1px solid #1a1a1a;
		color: #e0e0e0;
		transition: background 0.15s ease;
	}

	.csv-table tbody tr:hover td {
		background: #151515;
	}

	.csv-table tbody tr:last-child td {
		border-bottom: none;
	}

	.csv-check {
		width: 18px;
		height: 18px;
		border: 2px solid #3a3a3a;
		border-radius: 4px;
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.csv-check.checked {
		background: #3b8eff;
		border-color: #3b8eff;
		box-shadow: 0 0 0 3px rgba(59, 142, 255, 0.3);
		transform: scale(1.1);
	}

	.csv-color {
		display: inline-block;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		margin-right: 8px;
	}

	.csv-color.red {
		background: #ff3b3b;
		box-shadow: 0 0 8px rgba(255, 59, 59, 0.4);
	}

	.csv-color.blue {
		background: #3b8eff;
		box-shadow: 0 0 8px rgba(59, 142, 255, 0.4);
	}

	.csv-color.green {
		background: #2dd4a0;
		box-shadow: 0 0 8px rgba(45, 212, 160, 0.4);
	}

	.csv-device {
		font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
		color: #999;
		font-size: 13px;
	}

	.csv-pts {
		font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
		color: #e0e0e0;
		font-weight: 500;
	}

	.csv-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 16px 20px;
		background: #1a1a1a;
		border-top: 1px solid #2a2a2a;
	}

	.csv-count {
		font-size: 13px;
		color: #888;
	}

	.csv-dl-btn {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px 20px;
		background: #3b8eff;
		color: white;
		border: none;
		border-radius: 8px;
		font-weight: 600;
		font-size: 14px;
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.csv-dl-btn:hover {
		background: #2d7ae6;
		transform: translateY(-2px);
		box-shadow: 0 8px 20px rgba(59, 142, 255, 0.4);
	}

	.csv-toast {
		position: absolute;
		bottom: 80px;
		right: 20px;
		background: #1a1a1a;
		border: 1px solid #2a2a2a;
		border-radius: 12px;
		padding: 12px 16px;
		display: flex;
		align-items: flex-start;
		gap: 12px;
		box-shadow: 0 12px 32px rgba(0, 0, 0, 0.6);
		animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
		max-width: 280px;
	}

	.csv-toast-icon {
		width: 32px;
		height: 32px;
		background: rgba(59, 142, 255, 0.15);
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.csv-toast-text {
		font-size: 13px;
		font-weight: 600;
		color: #e0e0e0;
		margin-bottom: 2px;
	}

	.csv-toast-sub {
		font-size: 12px;
		color: #888;
	}

	.spinner {
		width: 14px;
		height: 14px;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-top-color: white;
		border-radius: 50%;
		animation: spin 0.6s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(20px) scale(0.95);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	@keyframes pulse {
		0%,
		100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.05);
			box-shadow: 0 12px 28px rgba(59, 142, 255, 0.5);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.csv-check,
		.csv-dl-btn,
		.csv-toast {
			animation: none;
			transition: none;
		}
	}
</style>

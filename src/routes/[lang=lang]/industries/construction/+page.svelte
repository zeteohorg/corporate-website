<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { PageData } from './$types';

	export let data: PageData;
	const { translations, lang } = data;
</script>

<div class="container mx-auto px-4 py-12 md:px-6">
	<div class="mb-12 space-y-4 text-center">
		<h1 class="text-4xl font-bold tracking-tight">
			{translations.common.nav.industries.construction}
		</h1>

		<p class="mx-auto max-w-[900px] text-xl text-muted-foreground">
			{#if lang === 'en'}
				Real-time indoor positioning for enhanced safety and efficiency in construction sites
			{:else}
				建設現場の安全性と効率性を向上させるリアルタイム屋内測位
			{/if}
		</p>
	</div>

	<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
		<!-- Safety Solution -->
		<Card.Root>
			<Card.Header>
				<Card.Title>
					{#if lang === 'en'}
						Worker Safety System
					{:else}
						作業員安全システム
					{/if}
				</Card.Title>
				<Card.Description>
					{#if lang === 'en'}
						Real-time tracking and safety monitoring for construction workers
					{:else}
						建設作業員のリアルタイム追跡と安全監視
					{/if}
				</Card.Description>
			</Card.Header>
			<Card.Content>
				<ul class="list-inside list-disc space-y-2 text-sm text-muted-foreground">
					{#if lang === 'en'}
						<li>Real-time personnel location tracking</li>
						<li>Automatic danger zone alerts</li>
						<li>Emergency response coordination</li>
					{:else}
						<li>作業員のリアルタイム位置追跡</li>
						<li>危険区域の自動アラート</li>
						<li>緊急対応の連携</li>
					{/if}
				</ul>
			</Card.Content>
		</Card.Root>

		<!-- Equipment Solution -->
		<Card.Root>
			<Card.Header>
				<Card.Title>
					{#if lang === 'en'}
						Equipment Management
					{:else}
						機器管理
					{/if}
				</Card.Title>
				<Card.Description>
					{#if lang === 'en'}
						Optimize equipment usage and track valuable assets
					{:else}
						機器の使用状況の最適化と重要資産の追跡
					{/if}
				</Card.Description>
			</Card.Header>
			<Card.Content>
				<ul class="list-inside list-disc space-y-2 text-sm text-muted-foreground">
					{#if lang === 'en'}
						<li>Equipment location tracking</li>
						<li>Usage optimization</li>
						<li>Maintenance scheduling</li>
					{:else}
						<li>機器の位置追跡</li>
						<li>使用状況の最適化</li>
						<li>メンテナンススケジュール</li>
					{/if}
				</ul>
			</Card.Content>
		</Card.Root>

		<!-- Progress Solution -->
		<Card.Root>
			<Card.Header>
				<Card.Title>
					{#if lang === 'en'}
						Progress Monitoring
					{:else}
						進捗モニタリング
					{/if}
				</Card.Title>
				<Card.Description>
					{#if lang === 'en'}
						Track and visualize construction progress in real-time
					{:else}
						建設の進捗状況をリアルタイムで追跡・可視化
					{/if}
				</Card.Description>
			</Card.Header>
			<Card.Content>
				<ul class="list-inside list-disc space-y-2 text-sm text-muted-foreground">
					{#if lang === 'en'}
						<li>Real-time progress tracking</li>
						<li>Visual progress reports</li>
						<li>Schedule optimization</li>
					{:else}
						<li>リアルタイムの進捗追跡</li>
						<li>視覚的な進捗レポート</li>
						<li>スケジュールの最適化</li>
					{/if}
				</ul>
			</Card.Content>
		</Card.Root>
	</div>
</div>

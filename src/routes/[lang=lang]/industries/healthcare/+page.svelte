<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { PageData } from './$types';

	export let data: PageData;
	const { translations, lang } = data;
</script>

<div class="container mx-auto px-4 py-12 md:px-6">
	<div class="mb-12 space-y-4 text-center">
		<h1 class="text-4xl font-bold tracking-tight">
			{translations.common.nav.industries.healthcare}
		</h1>
		<p class="mx-auto max-w-[900px] text-xl text-muted-foreground">
			{#if lang === 'en'}
				Real-time indoor positioning for enhanced efficiency in healthcare facilities
			{:else}
				医療施設の効率性を向上させるリアルタイム屋内測位
			{/if}
		</p>
	</div>

	<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
		<!-- Patient Tracking Solution -->
		<Card.Root>
			<Card.Header>
				<Card.Title>
					{#if lang === 'en'}
						Patient Tracking System
					{:else}
						患者追跡システム
					{/if}
				</Card.Title>
				<Card.Description>
					{#if lang === 'en'}
						Real-time tracking and monitoring for patient safety
					{:else}
						患者の安全のためのリアルタイム追跡と監視
					{/if}
				</Card.Description>
			</Card.Header>
			<Card.Content>
				<ul class="list-inside list-disc space-y-2 text-sm text-muted-foreground">
					{#if lang === 'en'}
						<li>Real-time patient location tracking</li>
						<li>Emergency response coordination</li>
						<li>Patient flow optimization</li>
					{:else}
						<li>患者のリアルタイム位置追跡</li>
						<li>緊急対応の連携</li>
						<li>患者フローの最適化</li>
					{/if}
				</ul>
			</Card.Content>
		</Card.Root>

		<!-- Asset Management -->
		<Card.Root>
			<Card.Header>
				<Card.Title>
					{#if lang === 'en'}
						Medical Equipment Management
					{:else}
						医療機器管理
					{/if}
				</Card.Title>
				<Card.Description>
					{#if lang === 'en'}
						Track and manage critical medical equipment
					{:else}
						重要な医療機器の追跡と管理
					{/if}
				</Card.Description>
			</Card.Header>
			<Card.Content>
				<ul class="list-inside list-disc space-y-2 text-sm text-muted-foreground">
					{#if lang === 'en'}
						<li>Equipment location tracking</li>
						<li>Usage monitoring</li>
						<li>Maintenance scheduling</li>
					{:else}
						<li>機器の位置追跡</li>
						<li>使用状況のモニタリング</li>
						<li>メンテナンススケジュール</li>
					{/if}
				</ul>
			</Card.Content>
		</Card.Root>

		<!-- Staff Efficiency -->
		<Card.Root>
			<Card.Header>
				<Card.Title>
					{#if lang === 'en'}
						Staff Workflow Optimization
					{:else}
						スタッフワークフロー最適化
					{/if}
				</Card.Title>
				<Card.Description>
					{#if lang === 'en'}
						Improve staff efficiency and response times
					{:else}
						スタッフの効率と対応時間の改善
					{/if}
				</Card.Description>
			</Card.Header>
			<Card.Content>
				<ul class="list-inside list-disc space-y-2 text-sm text-muted-foreground">
					{#if lang === 'en'}
						<li>Staff location awareness</li>
						<li>Workflow analysis</li>
						<li>Resource optimization</li>
					{:else}
						<li>スタッフの位置把握</li>
						<li>ワークフロー分析</li>
						<li>リソースの最適化</li>
					{/if}
				</ul>
			</Card.Content>
		</Card.Root>
	</div>
</div>

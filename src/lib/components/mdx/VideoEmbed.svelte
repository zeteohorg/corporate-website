<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		url,
		title,
		class: className
	} = $props<{
		url: string;
		title: string;
		class?: string;
	}>();

	// Extract video ID from various video platform URLs
	function getEmbedUrl(url: string): string {
		let videoId: string | null = null;

		// YouTube
		if (url.includes('youtube.com') || url.includes('youtu.be')) {
			const youtubeRegex =
				/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
			videoId = url.match(youtubeRegex)?.[1] ?? null;
			if (videoId) {
				return `https://www.youtube-nocookie.com/embed/${videoId}`;
			}
		}

		// Vimeo
		if (url.includes('vimeo.com')) {
			const vimeoRegex = /vimeo\.com\/(?:.*#|.*\/videos\/)?([0-9]+)/;
			videoId = url.match(vimeoRegex)?.[1] ?? null;
			if (videoId) {
				return `https://player.vimeo.com/video/${videoId}`;
			}
		}

		return url;
	}

	const embedUrl = $derived(getEmbedUrl(url));
</script>

<div class={cn('my-6 overflow-hidden rounded-lg', className)}>
	<div class="relative pb-[56.25%]">
		<iframe
			src={embedUrl}
			{title}
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
			class="absolute left-0 top-0 size-full"
		></iframe>
	</div>
</div>

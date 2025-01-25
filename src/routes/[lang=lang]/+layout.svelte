<script lang="ts">
	import { page } from '$app/stores';
	let { children } = $props();
</script>

{@render children?.()}

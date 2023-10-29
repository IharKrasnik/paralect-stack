<script>
	import { onMount } from 'svelte';
	import currentUser from '$lib/stores/currentUser';
	import LoginButton from '$lib/components/LoginButton.svelte';
</script>

{#if $currentUser}
	Logged In
{:else}
	<LoginButton />
{/if}

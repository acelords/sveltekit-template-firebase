<script lang="ts">
	import { onMount } from 'svelte';
	import { initFirebase } from '$lib/client/firebase';
	import { auth } from '../stores/auth';

	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import '@skeletonlabs/skeleton/themes/theme-sahara.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	onMount(initFirebase);
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="/">
					<strong class="text-xl uppercase">Skeleton</strong>
				</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				{#if $auth?.uid}
					<a class="btn btn-sm variant-ghost-surface" href="/dashboard"> Dashboard </a>
					<form
						action="/logout"
						method="POST"
						use:enhance={() => {
							return async ({ result }) => {
								if (result.type === 'error') {
									await applyAction(result);
								} else {
									await invalidateAll();
								}
							};
						}}
					>
						<button type="submit" class="btn btn-sm variant-ghost-surface"> Logout </button>
					</form>
				{:else}
					<a class="btn btn-sm variant-ghost-surface" href="/login"> Login </a>
					<a class="btn btn-sm variant-ghost-surface" href="/register"> Register </a>
				{/if}

				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://discord.gg/EXqV7W8MtY"
					target="_blank"
					rel="noreferrer"
				>
					Discord
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://twitter.com/SkeletonUI"
					target="_blank"
					rel="noreferrer"
				>
					Twitter
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://github.com/skeletonlabs/skeleton"
					target="_blank"
					rel="noreferrer"
				>
					GitHub
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>

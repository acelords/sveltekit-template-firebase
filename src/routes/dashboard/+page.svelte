<script lang="ts">
	import { auth } from '../../stores/auth';
</script>

<div class="text-center">
	<h1>Hello there. Welcome to your dashboard</h1>
	<p>{$auth?.email}</p>
	<p>{$auth?.uid}</p>
</div>

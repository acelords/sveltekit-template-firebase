<script lang="ts">
	import { goto } from '$app/navigation';
	import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
	import type { ActionData } from '../login/$types';

	export let form: ActionData;
	const auth = getAuth();

	let email: string | null = null;
	let password: string | null = null;
	let confirmPassword: string | null = null;
	let error: string | null = null;

	const validatePassword = () => {
		let isValid = true;
		if (password !== '' && confirmPassword !== '') {
			if (password !== confirmPassword) {
				isValid = false;
				error = 'Passwords do not match';
			}
		}
		return isValid;
	};

	const handleSubmit = async () => {
		error = null;

		if (!email || email.length <= 1) {
			error = 'Provide a valid email!';
			return;
		}

		if (validatePassword()) {
			try {
				const user = await createUserWithEmailAndPassword(auth, email, password);
				email = null;
				password = null;
				confirmPassword = null;
				goto('/login');
			} catch (err) {
				error = err?.toString();
			}
		}
	};
</script>

<div class="container mt-8 mx-auto">
	<div class="w-1/3 mx-auto">
		{#if form && !form.success && form.message}
			<div class="text-red-700">
				{form.message}
			</div>
		{/if}

		{#if error}
			<p>{error}</p>
		{/if}

		<form class="mt-4" method="POST" on:submit|preventDefault={handleSubmit}>
			<div>
				<label>
					Email
					<input
						class="block border border-gray-400 rounded py-1 px-2 mt-2 mb-4 w-full"
						name="email"
						type="email"
						required
						bind:value={email}
					/>
				</label>
			</div>
			<div>
				<label>
					Password
					<input
						class="block border border-gray-400 rounded py-1 px-2 mt-2 mb-4 w-full"
						name="password"
						type="password"
						required
						bind:value={password}
					/>
				</label>
			</div>
			<div>
				<label>
					Confirm Password
					<input
						class="block border border-gray-400 rounded py-1 px-2 mt-2 mb-4 w-full"
						name="confirmPassword"
						type="password"
						required
						bind:value={confirmPassword}
					/>
				</label>
			</div>

			<div>
				<button
					class="block mx-auto bg-indigo-700 hover:bg-indigo-600 text-gray-200 hover:text-white rounded py-2 px-4"
					type="submit"
				>
					Submit
				</button>
			</div>
		</form>
	</div>
</div>

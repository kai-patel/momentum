<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';
</script>

<div
	class="flex flex-col h-screen w-screen items-center place-content-center bg-gradient-to-b from-purple-800 to-red-600 gap-2"
>
	<h1 class="select-none font-extrabold text-white text-6xl text-center drop-shadow-lg">
		Welcome to Momentum
	</h1>
	<p class="select-none overline font-bold text-white text-lg text-center drop-shadow-lg">
		Modern time management
	</p>
	<button
		class="cursor-pointer bg-blue-400 rounded shadow-lg font-semibold text-lg py-2 px-4"
		on:click={() => signIn(undefined, { callbackUrl: '/home' })}
	>
		Login
	</button>
</div>

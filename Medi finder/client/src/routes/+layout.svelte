<script lang="ts">
	import '../app.pcss';
	import { FirebaseApp, SignedIn, SignedOut } from 'sveltefire';
	import { initializeApp } from 'firebase/app';
	import { getFirestore } from 'firebase/firestore';
	import { getAuth } from 'firebase/auth';
	import { app } from '$lib/firebase';
	import { createUser, signIn } from '$lib/firebase';
	import toast, { Toaster } from 'svelte-french-toast';

	let login = true;

	const loginData = {
		email: '',
		password: ''
	};

	const signupData = {
		name: '',
		email: '',
		password: ''
	};

	// Initialize Firebase
	const firestore = getFirestore(app);
	const auth = getAuth(app);

	const handleLogin = async (event: SubmitEvent) => {
		event.preventDefault();
		try {
			await signIn(loginData.email, loginData.password);
			toast.success('Logged in successfully');
		} catch (error) {
			toast.error((error as Error).message);
		}
	};

	const handleSignup = async (event: SubmitEvent) => {
		event.preventDefault();
		try {
			await createUser(signupData.email, signupData.password, signupData.name);
			toast.success('Account created successfully');
		} catch (error) {
			toast.error((error as Error).message);
		}
	};
</script>

<Toaster />
<FirebaseApp {auth} {firestore}>
	<SignedIn let:user>
		<slot />
		<div
			class="fixed bottom-0 left-0 z-50 h-16 w-full border-t border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-700"
		>
			<div class="mx-auto grid h-full max-w-lg grid-cols-3 font-medium">
				<a
					href="/"
					class="group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800"
				>
					<svg
						class="h-6 w-6 text-gray-800 dark:text-white"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-width="2"
							d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
						/>
					</svg>

					<span
						class="group-hover:text-primary-600 dark:group-hover:text-primary-500 text-sm text-gray-500 dark:text-gray-400"
						>Search</span
					>
				</a>
				<a
					href={`/orders/${user.uid}`}
					class="group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800"
				>
					<svg
						class="h-6 w-6 text-gray-800 dark:text-white"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-3 5h3m-6 0h.01M12 16h3m-6 0h.01M10 3v4h4V3h-4Z"
						/>
					</svg>

					<span
						class="group-hover:text-primary-600 dark:group-hover:text-primary-500 text-sm text-gray-500 dark:text-gray-400"
						>Orders</span
					>
				</a>
				<a
					href="/pharmacies"
					class="group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800"
				>
					<svg
						class="h-6 w-6 text-gray-800 dark:text-white"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M7 6H5m2 3H5m2 3H5m2 3H5m2 3H5m11-1a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2M7 3h11a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm8 7a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
						/>
					</svg>

					<span
						class="group-hover:text-primary-600 dark:group-hover:text-primary-500 text-sm text-gray-500 dark:text-gray-400"
						>Pharmacies</span
					>
				</a>
			</div>
		</div>
	</SignedIn>
	<SignedOut>
		{#if login}<div class="flex h-screen items-center justify-center bg-gray-100 p-4">
				<div class="w-full max-w-sm max-w-xl rounded-lg bg-white p-8 shadow-md">
					<img
						src="https://static.vecteezy.com/system/resources/previews/008/927/037/non_2x/illustration-creative-logo-of-the-green-pharmacy-vector.jpg"
						alt="Pharma App"
						class="mx-auto h-24 w-24 object-cover"
					/>
					<h2 class="m-4 text-center text-xl font-bold">Welcome to Pharma App<br />Login</h2>
					<form on:submit={handleLogin}>
						<div class="mb-4">
							<label for="email" class="mb-2 block text-sm font-medium text-gray-600">Email</label>
							<input
								type="email"
								id="email"
								name="email"
								bind:value={loginData.email}
								required
								class="focus:border-primary-500 focus:ring-primary-500 block w-full max-w-xl rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
							/>
						</div>
						<div class="mb-4">
							<label for="password" class="mb-2 block text-sm font-medium text-gray-600"
								>Password</label
							>
							<input
								type="password"
								id="password"
								name="password"
								bind:value={loginData.password}
								required
								class="focus:border-primary-500 focus:ring-primary-500 block w-full max-w-xl rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
							/>
						</div>
						<button
							type="submit"
							class="bg-primary-500 hover:bg-primary-600 w-full max-w-xl rounded-lg px-4 py-2 text-white"
							>Log in</button
						>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<span
							on:click={() => {
								login = !login;
							}}
							class="text-primary-500 mt-4 block text-center text-sm hover:underline"
							>Don't have an Account? Sign up.</span
						>
					</form>
				</div>
			</div>{:else}<div class="flex h-screen items-center justify-center bg-gray-100 p-4">
				<div class="w-full max-w-sm max-w-xl rounded-lg bg-white p-8 shadow-md">
					<img
						src="https://static.vecteezy.com/system/resources/previews/008/927/037/non_2x/illustration-creative-logo-of-the-green-pharmacy-vector.jpg"
						alt="Pharma App"
						class="mx-auto h-24 w-24 object-cover"
					/>
					<h2 class="m-4 text-center text-xl font-bold">Welcome to Pharma App<br />Register</h2>
					<form on:submit={handleSignup}>
						<div class="mb-4">
							<label for="name" class="mb-2 block text-sm font-medium text-gray-600">Name</label>
							<input
								type="text"
								id="name"
								name="name"
								bind:value={signupData.name}
								required
								class="focus:border-primary-500 focus:ring-primary-500 block w-full max-w-xl rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
							/>
						</div>
						<div class="mb-4">
							<label for="email" class="mb-2 block text-sm font-medium text-gray-600">Email</label>
							<input
								type="email"
								id="email"
								name="email"
								bind:value={signupData.email}
								required
								class="focus:border-primary-500 focus:ring-primary-500 block w-full max-w-xl rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
							/>
						</div>
						<div class="mb-4">
							<label for="password" class="mb-2 block text-sm font-medium text-gray-600"
								>Password</label
							>
							<input
								type="password"
								id="password"
								name="password"
								bind:value={signupData.password}
								required
								class="focus:border-primary-500 focus:ring-primary-500 block w-full max-w-xl rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
							/>
						</div>
						<button
							type="submit"
							class="bg-primary-500 hover:bg-primary-600 w-full max-w-xl rounded-lg px-4 py-2 text-white"
							>Sign up</button
						>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<span
							on:click={() => {
								login = !login;
							}}
							class="text-primary-500 mt-4 block text-center text-sm hover:underline"
							>Already Have an Account? Log In.</span
						>
					</form>
				</div>
			</div>
		{/if}
	</SignedOut>
</FirebaseApp>

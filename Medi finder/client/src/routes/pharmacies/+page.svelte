<script lang="ts">
	import { getPharmacies, getPharmaciesByLocation } from '$lib/firebase';
	import { onMount } from 'svelte';

	export let data;

	let pharmacies: any[] = [];

	let search = data.search;

	const runSearch = async () => {
		if (data.search) {
			const byName = await getPharmacies(data.search);
			const byLocation = await getPharmaciesByLocation(data.search);
			pharmacies = [...byName, ...byLocation];
			console.log(pharmacies);
		}
	};

	onMount(runSearch);
	const goto = (e: SubmitEvent) => {
		e.preventDefault();
		search = e.target.search.value;
		window.location.href = `/pharmacies?search=${search}`;
	};
</script>

<div
	class="min-h-screen bg-[url('https://www.randoxtestingservices.com/wp-content/uploads/2019/12/New-report-Highlights-Scale-Causes-of-Prescription-Drug-dependence-in-UK-01-468x468.jpg')] bg-contain bg-fixed bg-center bg-no-repeat p-4"
>
	<!-- Search Card -->
	<div class="mb-6">
		<div class="mx-auto max-w-xl overflow-hidden rounded-lg bg-white shadow-md">
			<div class="p-4">
				<h2 class="text-center text-lg font-semibold">Find a Pharmacy</h2>
				<form on:submit={goto} class="mt-4 space-y-3">
					<div>
						<input
							type="text"
							class="w-full max-w-xl rounded-md border border-gray-300 p-2"
							placeholder="Search by name, location, etc"
							name="search"
							bind:value={search}
						/>
					</div>
					<div class="text-center">
						<button
							type="submit"
							class="bg-primary-500 hover:bg-primary-600 w-full max-w-xl rounded-md px-4 py-2 text-white"
							>Search</button
						>
					</div>
				</form>
			</div>
		</div>
	</div>
	<!-- Pharmacies List -->
	<div class="flex flex-col items-center space-y-4">
		<!-- More pharmacies can be added here -->
		{#each pharmacies as pharmacy}
			<div class="flex w-full max-w-xl flex-row justify-between rounded-lg bg-white p-4 shadow-md">
				<div>
					<h2 class="text-lg font-semibold">{pharmacy.pharmname}</h2>
					<p class="text-gray-600">Location: {pharmacy.location}</p>
				</div>
				<div>
					<a
						href={`tel:${pharmacy.contact}`}
						class="bg-primary-400 hover:bg-primary-600 w-full max-w-xl rounded-md px-4 py-2 text-white"
						>Contact</a
					>
				</div>
			</div>
		{/each}
	</div>
</div>

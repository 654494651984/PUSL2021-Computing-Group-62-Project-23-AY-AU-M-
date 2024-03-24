<script>
	import { getPharmacy, deleteMed } from '$lib/firebase';
	import { collection, getFirestore, query, where } from 'firebase/firestore';
	import { app } from '$lib/firebase';
	import { Collection } from 'sveltefire';

	const db = getFirestore(app);

	export let data;

	let searchTerm = data.search;

	const pharmacyInfo = {
		name: '',
		location: '',
		contactNumber: ''
	};

	getPharmacy().then((pharmacy) => {
		pharmacyInfo.name = pharmacy?.pharmname;
		pharmacyInfo.location = pharmacy?.location;
		pharmacyInfo.contactNumber = pharmacy?.contact;
	});

	$: q = searchTerm
		? query(
				collection(db, 'medications'),
				where('location', '==', pharmacyInfo.location),
				where('pharmname', '==', pharmacyInfo.name),
				where('medname', '==', searchTerm)
			)
		: query(
				collection(db, 'medications'),
				where('location', '==', pharmacyInfo.location),
				where('pharmname', '==', pharmacyInfo.name)
			);
</script>

<div class="flex items-center min-h-screen flex-col gap-4 p-4">
	<!-- Search Card -->
	<div class="mx-auto w-full max-w-md max-w-xl overflow-hidden rounded-lg bg-white shadow-md">
		<div class="p-4">
			<h2 class="text-center text-lg font-semibold">Your Medication</h2>
			<!-- Search Form -->
			<form method="get" class="mt-4 space-y-3">
				<!-- Search Input -->
				<div>
					<input
						type="text"
						name="search"
						class="w-full max-w-xl rounded-md border border-gray-300 p-2"
						placeholder="Search medication, brand, etc"
						bind:value={searchTerm}
					/>
				</div>
				<!-- Search Button -->
				<div class="text-center">
					<button
						type="submit"
						class="bg-primary-500 hover:bg-primary-600 w-full max-w-xl rounded-md px-4 py-2 text-white"
						>Search</button
					>
				</div>
			</form>
			<!-- Medication cards -->
		</div>
	</div>
	{#if pharmacyInfo.location != ''}
		<Collection ref={q} let:data>
			{#each data as med}
				<div
					class="flex w-full max-w-xl flex-row justify-between rounded-lg bg-white p-4 shadow-md"
				>
					<div>
						<h2 class="text-lg font-semibold">{med.medname}</h2>
						<p class="text-gray-600">Dosage: {med.meddose}</p>
					</div>
					<div>
						<button
							on:click={() => {
								deleteMed(med.id);
							}}
							class="bg-primary-500 hover:bg-primary-600 w-full max-w-xl rounded-md px-4 py-2 text-white"
							>Delete</button
						>
					</div>
				</div>
			{/each}
		</Collection>
	{/if}
</div>

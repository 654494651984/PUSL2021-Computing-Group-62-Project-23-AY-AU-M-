<script lang="ts">
	import { collection, getFirestore, query, where } from 'firebase/firestore';
	import { app, getLocations, createOrder, getPharmacies } from '$lib/firebase';
	import { Collection, SignedIn } from 'sveltefire';
	import toast from 'svelte-french-toast';

	const db = getFirestore(app);

	export let data;

	let qty = 1;

	let searchTerm = data.search;
	let location = data.location;
	let locations: string[] = [];

	$: q = searchTerm
		? query(
				collection(db, 'medications'),
				where('location', '==', location),
				where('medname', '==', searchTerm)
			)
		: query(collection(db, 'medications'));

	getLocations().then((locs) => {
		locations = locs;
	});

	const goto = (e: SubmitEvent) => {
		e.preventDefault();
		location = e.target.location.value;
		searchTerm = e.target.search.value;
		window.location.href = `/?search=${searchTerm}&location=${location}`;
	};
</script>

<SignedIn let:user>
	<div
		class="flex min-h-screen flex-col items-center gap-4 bg-[url('https://www.randoxtestingservices.com/wp-content/uploads/2019/12/New-report-Highlights-Scale-Causes-of-Prescription-Drug-dependence-in-UK-01-468x468.jpg')] bg-contain bg-fixed bg-center bg-no-repeat p-4"
	>
		<!-- Search Card -->
		<div class="mx-auto w-full max-w-md max-w-xl overflow-hidden rounded-lg bg-white shadow-md">
			<div class="p-4">
				<h2 class=" text-lg font-semibold">Discover</h2>
				<!-- Search Form -->
				<form on:submit={goto} class="mt-4 space-y-3">
					<!-- Search Input -->
					<div>
						<input
							type="text"
							class="w-full max-w-xl rounded-md border border-gray-300 p-2"
							placeholder="Search medication, brand, etc"
							name="search"
							bind:value={searchTerm}
						/>
					</div>
					<!-- Location Dropdown -->
					<div>
						<select
							name="location"
							bind:value={location}
							class="w-full max-w-xl rounded-md border border-gray-300 p-2"
							required
						>
							<option selected disabled>Choose your location</option>
							{#each locations as loc}
								<option value={loc}>{loc}</option>
							{/each}
						</select>
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
			</div>
		</div>

		<!-- Medication cards -->
		<Collection ref={q} let:data>
			{#if data.length === 0}
				<p class="text-center text-gray-600">No medications found</p>
			{:else}
				{#each data as med}
					<div
						class="flex w-full max-w-xl flex-row justify-between rounded-lg bg-white p-4 shadow-md"
					>
						<div>
							<h2 class="text-lg font-semibold">{med.medname}</h2>
							<p class="text-gray-600">Brand: {med.medman}</p>
							<p class="text-gray-600">Price: Rs.{med.medprice}</p>
							<p class="text-gray-600">Pharmacy: {med.pharmname}</p>
						</div>
						<div class="flex flex-col gap-4">
							<input
								type="number"
								bind:value={qty}
								class="w-20 rounded-md border border-gray-300 p-2"
								placeholder="Qty"
							/>
							<button
								on:click={async () => {
									try {
										await createOrder(
											med.medname,
											med.meddose,
											med.medman,
											med.medprice,
											med.pharmname,
											user.uid,
											user.email ?? '',
											qty
										);
										toast.success('Order placed successfully');
									} catch (e) {
										toast.error(e.message);
									}
								}}
								class="bg-primary-500 hover:bg-primary-600 w-20 rounded-md px-4 py-2 text-white"
								>Order</button
							>
						</div>
					</div>
				{/each}
			{/if}
		</Collection>
	</div>
</SignedIn>

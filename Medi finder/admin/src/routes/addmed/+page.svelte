<script lang="ts">
	import { getPharmacy, addMedication } from '$lib/firebase';
	import toast, { Toaster } from 'svelte-french-toast';

	const medicationInfo = {
		name: '',
		dosage: '',
		manufacturer: '',
		price: 0
	};

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

	const addMedications = async (event: SubmitEvent) => {
		event.preventDefault();
		try {
			await addMedication(
				medicationInfo.name,
				medicationInfo.dosage,
				medicationInfo.manufacturer,
				medicationInfo.price.toString(),
				pharmacyInfo.location,
				pharmacyInfo.name
			);
			toast.success('Medication added successfully');
		} catch (error) {
			toast.error((error as Error).message);
		}
	};
</script>

<Toaster />
<div class="flex h-screen items-center justify-center bg-gray-100 p-4">
	<div class="w-full max-w-md max-w-xl rounded-lg bg-white p-8 shadow-md">
		<h2 class="mb-6 text-center text-xl font-bold">Add Medication</h2>
		<form on:submit={addMedications}>
			<div class="mb-4">
				<label for="name" class="mb-2 block text-sm font-medium text-gray-600"
					>Medication Name</label
				>
				<input
					type="text"
					bind:value={medicationInfo.name}
					id="name"
					name="name"
					required
					class="focus:border-primary-500 focus:ring-primary-500 block w-full max-w-xl rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
					placeholder="e.g., Ibuprofen"
				/>
			</div>
			<div class="mb-4">
				<label for="dosage" class="mb-2 block text-sm font-medium text-gray-600">Dosage</label>
				<input
					type="text"
					id="dosage"
					bind:value={medicationInfo.dosage}
					name="dosage"
					required
					class="focus:border-primary-500 focus:ring-primary-500 block w-full max-w-xl rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
					placeholder="e.g., 200mg"
				/>
			</div>
			<div class="mb-4">
				<label for="manufacturer" class="mb-2 block text-sm font-medium text-gray-600"
					>Manufacturer</label
				>
				<input
					type="text"
					id="manufacturer"
					bind:value={medicationInfo.manufacturer}
					name="manufacturer"
					required
					class="focus:border-primary-500 focus:ring-primary-500 block w-full max-w-xl rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
					placeholder="e.g., Pfizer"
				/>
			</div>
			<div class="mb-4">
				<label for="manufacturer" class="mb-2 block text-sm font-medium text-gray-600">Price</label>
				<input
					type="number"
					id="manufacturer"
					bind:value={medicationInfo.price}
					name="manufacturer"
					required
					class="focus:border-primary-500 focus:ring-primary-500 block w-full max-w-xl rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
					placeholder="e.g., Pfizer"
				/>
			</div>
			<button
				type="submit"
				class="bg-primary-500 hover:bg-primary-600 w-full max-w-xl rounded-lg px-4 py-2 text-white"
				>Add Medication</button
			>
		</form>
	</div>
</div>

<script lang="ts">
	import { getPharmacy, setPharmacy } from '$lib/firebase';
	import { SignedIn } from 'sveltefire';
	import toast, { Toaster } from 'svelte-french-toast';

	const pharmayInfo = {
		name: '',
		location: '',
		contactNumber: ''
	};

	getPharmacy().then((pharmacy) => {
		pharmayInfo.name = pharmacy?.pharmname;
		pharmayInfo.location = pharmacy?.location;
		pharmayInfo.contactNumber = pharmacy?.contact;
	});

	const updatePharmacyProfile = async (event: SubmitEvent) => {
		event.preventDefault();
		try {
			await setPharmacy(pharmayInfo.name, pharmayInfo.location, pharmayInfo.contactNumber);
			toast.success('Pharmacy information updated successfully');
		} catch (error) {
			toast.error((error as Error).message);
		}
	};
</script>

<Toaster />
<SignedIn let:user>
	<div class="flex flex-col items-center p-4">
		<!-- User Card -->
		<div class="mb-6 flex w-full max-w-xl items-center space-x-4 rounded-lg bg-white p-4 shadow">
			<div class="flex-shrink-0">
				<img
					class="h-12 w-12 rounded-full object-cover"
					src={user.photoURL ||
						'https://t3.ftcdn.net/jpg/05/17/79/88/360_F_517798849_WuXhHTpg2djTbfNf0FQAjzFEoluHpnct.jpg'}
					alt="User avatar"
				/>
			</div>
			<div>
				<h2 class="text-lg font-medium">{user.displayName}</h2>
				<p class="text-gray-600">Pharmacy Owner</p>
			</div>
		</div>

		<!-- Pharmacy Information Form -->
		<div class="w-full max-w-xl rounded-lg bg-white p-4 shadow">
			<h2 class="mb-4 text-xl font-medium">Pharmacy Information</h2>
			<form on:submit={updatePharmacyProfile}>
				<div class="mb-4">
					<label for="pharmacy-name" class="mb-2 block text-sm font-medium text-gray-600"
						>Pharmacy Name</label
					>
					<input
						type="text"
						id="pharmacy-name"
						bind:value={pharmayInfo.name}
						name="pharmacy-name"
						required
						class="focus:ring-primary-500 focus:border-primary-500 block w-full max-w-xl rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
					/>
				</div>
				<div class="mb-4">
					<label for="location" class="mb-2 block text-sm font-medium text-gray-600">Location</label
					>
					<input
						type="text"
						id="location"
						name="location"
						bind:value={pharmayInfo.location}
						required
						class="focus:ring-primary-500 focus:border-primary-500 block w-full max-w-xl rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
					/>
				</div>
				<div class="mb-4">
					<label for="contact-number" class="mb-2 block text-sm font-medium text-gray-600"
						>Contact Number</label
					>
					<input
						type="tel"
						id="contact-number"
						name="contact-number"
						bind:value={pharmayInfo.contactNumber}
						required
						class="focus:ring-primary-500 focus:border-primary-500 block w-full max-w-xl rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
						placeholder="123-456-7890"
					/>
				</div>
				<button
					type="submit"
					class="bg-primary-500 hover:bg-primary-600 w-full max-w-xl rounded-lg px-4 py-2 text-white"
					>Update Pharmacy Information</button
				>
			</form>
		</div>
	</div></SignedIn
>

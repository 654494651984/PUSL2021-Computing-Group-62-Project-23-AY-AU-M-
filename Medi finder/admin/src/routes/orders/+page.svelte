<script lang="ts">
	import { getPharmacy, getOrders } from '$lib/firebase';

	let orders: unknown[] = [];

	let pharmacyInfo = {
		name: '',
		location: '',
		contactNumber: ''
	};

	getPharmacy().then((pharmacy) => {
		pharmacyInfo.name = pharmacy?.pharmname;
		pharmacyInfo.location = pharmacy?.location;
		pharmacyInfo.contactNumber = pharmacy?.contact;

		getOrders(pharmacyInfo.name).then((data) => {
			orders = data;
			console.log(orders);
		});
	});
</script>

<div class="p-4">
	<!-- Heading -->
	<div class="mb-4">
		<h1 class="text-center text-2xl font-semibold">Your Orders</h1>
	</div>
	<!-- Orders List -->
	<div class="flex flex-col items-center space-y-4">
		<!-- More orders can be added here -->
		{#each orders as order}
			<div class="w-full max-w-xl rounded-lg bg-white p-4 shadow-md">
				<p class="text-gray-600">Medication: {order.medname}</p>
				<p class="text-gray-600">Pharmacy: {order.pharmname}</p>
				<p class="text-gray-600">QTY: {order.qty}</p>
				<p class="text-gray-600">Price: {parseFloat(order.price) * parseInt(order.qty)}</p>
				<p class="text-gray-600">Contact: {order.email}</p>
			</div>
		{/each}
	</div>
</div>

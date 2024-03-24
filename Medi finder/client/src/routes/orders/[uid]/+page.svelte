<script lang="ts">
	import { SignedIn } from 'sveltefire';

	export let data;

	console.log(data);
</script>

<SignedIn let:user>
	<div
		class="min-h-screen bg-[url('https://www.randoxtestingservices.com/wp-content/uploads/2019/12/New-report-Highlights-Scale-Causes-of-Prescription-Drug-dependence-in-UK-01-468x468.jpg')] bg-contain bg-fixed bg-center bg-no-repeat p-4"
	>
		<!-- Heading -->
		<div class="mb-4">
			<h1 class="text-center text-2xl font-semibold">Your Orders</h1>
		</div>
		<!-- Orders List -->
		<div class="flex flex-col items-center space-y-4">
			<!-- More orders can be added here -->
			{#each data.orders as order}
				<div class="w-full max-w-xl rounded-lg bg-white p-4 shadow-md">
					<p class="text-gray-600">Medication: {order.medname}</p>
					<p class="text-gray-600">Pharmacy: {order.pharmname}</p>
					<p class="text-gray-600">QTY: {order.qty}</p>
					<p class="text-gray-600">Price: {parseFloat(order.price) * parseInt(order.qty)}</p>
				</div>
			{/each}
		</div>
	</div>
</SignedIn>

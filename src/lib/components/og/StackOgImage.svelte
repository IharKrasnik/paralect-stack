<script>
	export let stack;
</script>

<div style="display: flex; flex-direction: column; background-color: #111; color: #fff; ">
	<div style="font-weight: bold; font-size: 32px; background-color: #111; color: #fff; ">
		{stack.name}
	</div>

	<div class="og">
		{#if stack.logo}
			<div class="flex justify-center">
				<img
					src={stack.logo}
					class="object-cover border-white/20 mb-8"
					style="width: 80px; height: 80px;"
				/>
			</div>
		{/if}
		<div
			style="display: flex; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 245px;"
		>
			<div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
				<div
					class="_title underline"
					style="font-size: 58px; font-weight: bold; text-align: center;"
				>
					{stack.name} — Startup Stack
				</div>

				{#if stack.description}
					<div style="font-size: 35px;  text-align: center; margin-top: 32px; max-width: 95%;">
						{stack.description}
					</div>
				{/if}
			</div>
		</div>

		<div style="margin-top: 64px; display: flex;" />
	</div>
</div>

<style>
	* {
		font-family: Inter;
	}

	._title {
		font-family: Archivo;
		font-weight: bold;
	}

	.og {
		background: #111;
		background-image: url('https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1698605334464-image.png');
		color: #fff;
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
		justify-content: center;
		padding: 32px;
	}

	.moment {
		margin-top: 32px;
		padding: 32px;
		border-radius: 32px;
		border: 1px rgba(255, 255, 255, 0.3) solid;
	}
</style>

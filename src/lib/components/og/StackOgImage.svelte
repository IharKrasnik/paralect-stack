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
					class="object-cover border-2 border-white/50 mb-8"
					style="width: 80px; height: 80px;"
				/>
			</div>
		{/if}
		<div
			style="display: flex; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 245px;"
		>
			<div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
				<div
					class="relative _title flex"
					style="font-size: 58px; font-weight: bold; text-align: center;"
				>
					{stack.name}
					<span class="text-yellow-300/90 ml-4"> Startup Stack</span>

					<img
						class="absolute right-[130px] top-12 z-10"
						style="width: 50px; height: 50px;"
						src="https://static.vecteezy.com/system/resources/previews/011/720/952/original/simple-hand-cursor-free-png.png"
					/>
				</div>

				{#if stack.description}
					<div class="mt-4" style="font-size: 45px;  text-align: center; max-width: 90%;">
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

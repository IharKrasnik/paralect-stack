<script>
	export let category;
</script>

<div style="display: flex; flex-direction: column; background-color: #111; color: #fff; ">
	<div class="og">
		<div
			style="display: flex; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 245px;"
		>
			<div class="flex flex-col items-start justify-center h-[285px] w-full">
				<div class="relative _title flex justify-start" style="font-size: 58px; font-weight: bold;">
					Top
					<span class="text-yellow-300/90 ml-3"> {category.name}</span><span class="ml-3"
						>{category.noTools ? '' : 'Startup Tools'}</span
					>

					<img
						class="absolute {category.noTools ? 'right-[160px]' : 'right-[560px]'} top-12 z-10"
						style="width: 50px; height: 50px;"
						src="https://static.vecteezy.com/system/resources/previews/011/720/952/original/simple-hand-cursor-free-png.png"
					/>
				</div>

				{#if category.description}
					<div class="mt-8" style="font-size: 50px;  text-align: left; max-width: 90%;">
						{category.description}
					</div>
				{/if}
			</div>
		</div>
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
		background-image: url('https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1698683476008-og-category-template.png');
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

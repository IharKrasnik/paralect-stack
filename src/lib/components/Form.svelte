<script>
	import { z } from 'zod';
	import Loader from '$lib/components/Loader.svelte';
	import formCache from '$lib/stores/formCache';

	let clazz;
	export { clazz as class };

	export let form = {
		cacheId: '',
		title: ' ',
		description: '',
		fields: [],
		buttonText: 'Continue'
	};

	export let onSubmitted = () => {};

	export let valueObj;

	let isSubmittedOnce = false;

	let getSchema = () => {
		let schema = {};

		form.fields.forEach((f) => {
			schema[f.name] = z.string();

			if (f.type === 'url') {
				schema[f.name] = schema[f.name].url();
			}

			if (f.isRequired) {
				schema[f.name] = schema[f.name].nonempty();
			} else {
				schema[f.name] = schema[f.name].optional().or(z.literal(''));
			}
		});

		return z.object(schema);
	};

	let errors = {};

	let validate = () => {
		errors = {};

		if (!isSubmittedOnce) {
			return;
		}
		try {
			getSchema().parse(valueObj);

			return true;
		} catch (error) {
			error.issues.forEach((issue) => {
				errors[issue.path[0]] = issue.message;
			});

			// If the data is invalid, display an error message
			console.log(errors);
		}

		return false;
	};

	let isLoading = false;
	let isSubmitted = false;

	let submit = async () => {
		isSubmittedOnce = true;
		errors = {};
		isLoading = true;

		if (validate()) {
			await onSubmitted(valueObj);
			isSubmitted = true;

			if (form.cacheId) {
				$formCache[form.cacheId] = null;
			}
		}

		isLoading = false;
	};

	if (form.cacheId) {
		valueObj = $formCache[form.cacheId] || valueObj;
	}

	$: if (valueObj) {
		if (form.cacheId && !isSubmitted) {
			$formCache = {
				...$formCache,
				[form.cacheId]: valueObj
			};
		}
	}
</script>

{#if form.title}
	<h2 class="text-xl font-bold">{form.title}</h2>
{/if}
{#if form.description}
	<h3 class="text-lg mt-2">
		{form.description}
	</h3>
{/if}

<div class="{clazz} w-full max-w-[600px]">
	{#each form.fields as field}
		<div class="mb-8">
			<label>{field.title}</label>

			{#if field.type === 'url'}
				<input
					name={field.name}
					type="url"
					on:blur={validate}
					class:error={errors[field.name]}
					required={field.isRequired}
					placeholder={field.placeholder || 'https://mysite.com'}
					bind:value={valueObj[field.name]}
					class="w-full"
				/>
			{:else if field.type === 'long-text'}
				<textarea
					name={field.name}
					on:blur={validate}
					class:error={errors[field.name]}
					placeholder={field.placeholder || ''}
					rows={field.rows || 4}
					class="w-full"
					bind:value={valueObj[field.name]}
				/>
			{:else if field.type === 'short-text'}
				<input
					name={field.name}
					type="text"
					on:blur={validate}
					class:error={errors[field.name]}
					required={field.isRequired}
					placeholder={field.placeholder || ''}
					bind:value={valueObj[field.name]}
					class="w-full"
				/>
			{/if}

			{#if field.hints}
				{#each field.hints as hint}
					<div class="form-hint">💡 {hint}</div>
				{/each}
			{/if}
		</div>
	{/each}

	<button class="primary" type="submit" on:click={submit} disabled={isLoading}>
		{#if isLoading}
			<Loader />
		{/if}

		{form.buttonText || 'Continue'}</button
	>
</div>

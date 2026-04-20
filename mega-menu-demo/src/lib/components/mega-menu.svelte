<script>
	import Icon from '@iconify/svelte';
	
	let { categories = [] } = $props();
	
	let activeCategory = $state(null);
	let isDropdownOpen = $state(false);
	let closeTimeout;

	$effect(() => {
		if (categories.length > 0 && !activeCategory) {
			activeCategory = categories[0];
		}
	});

	function handleMouseEnter(category) {
		activeCategory = category;
	}

	function openDropdown() {
		clearTimeout(closeTimeout);
		isDropdownOpen = true;
	}

	function scheduleClose() {
		closeTimeout = setTimeout(() => {
			isDropdownOpen = false;
		}, 100);
	}
</script>

<div class="dropdown group" class:dropdown-open={isDropdownOpen}>
	<button
		tabindex="0"
		class="text-gray-600 hover:text-gray-900 cursor-pointer flex items-center bg-transparent border-none font-semibold p-2 rounded-md hover:bg-gray-50 transition-colors gap-1"
		onmouseenter={openDropdown}
		onmouseleave={scheduleClose}
	>
		<Icon icon="hugeicons:grid-view" class="text-xl" />
		Categorías
		<Icon
			icon="hugeicons:arrow-down-01"
			class="text-sm transition-transform group-hover:rotate-180"
		/>
	</button>

	<!-- Mega Menu Container -->
	<div
		tabindex="0"
		class="dropdown-content bg-white rounded-xl z-[100] w-[800px] shadow-2xl border border-gray-100 overflow-hidden flex mt-2 -left-4"
		onmouseenter={openDropdown}
		onmouseleave={scheduleClose}
	>
		<!-- Sidebar (Level 0) -->
		<div class="w-64 bg-gray-50 border-r border-gray-100 flex flex-col max-h-[500px] overflow-y-auto py-2">
			{#each categories as category (category.id)}
				<button
					class="text-left px-4 py-3 text-sm font-medium transition-colors flex items-center justify-between hover:bg-white hover:text-primary {activeCategory?.id === category.id ? 'bg-white text-primary border-l-4 border-primary shadow-sm' : 'text-gray-600 border-l-4 border-transparent'}"
					onmouseenter={() => handleMouseEnter(category)}
				>
					<span class="truncate pr-2">{category.name}</span>
					{#if category.children?.length > 0}
						<Icon icon="hugeicons:arrow-right-01" class="text-xs opacity-50" />
					{/if}
				</button>
			{/each}

			<div class="mt-auto pt-2 px-4 pb-2 border-t border-gray-200/50">
				<a href="/categorias" class="text-xs font-bold text-gray-500 hover:text-primary uppercase tracking-wider flex items-center gap-2 mt-2">
					Ver todas
					<Icon icon="hugeicons:arrow-right-01" />
				</a>
			</div>
		</div>

		<!-- Main Content (Children) -->
		<div class="flex-1 p-6 max-h-[500px] overflow-y-auto bg-white min-h-[400px]">
			{#if activeCategory}
				<div class="mb-6 flex justify-between items-center border-b border-gray-100 pb-4">
					<h3 class="text-xl font-bold text-gray-900 flex items-center gap-2">
						{#if activeCategory.imageUrl}
							<img src={activeCategory.imageUrl} alt={activeCategory.name} class="w-8 h-8 rounded-full object-cover"/>
						{/if}
						{activeCategory.name}
					</h3>
					<a
						href={`/categorias/${activeCategory.slug || activeCategory.id}`}
						class="text-sm text-primary font-medium hover:underline flex items-center gap-1"
					>
						Ver productos
						<Icon icon="hugeicons:arrow-right-01" />
					</a>
				</div>

				{#if activeCategory.children && activeCategory.children.length > 0}
					<div class="grid grid-cols-2 gap-x-8 gap-y-8">
						{#each activeCategory.children as child (child.id)}
							<div class="flex flex-col gap-2">
								<a
									href={`/categorias/${child.slug || child.id}`}
									class="font-bold text-gray-800 hover:text-primary transition-colors flex items-center gap-2"
								>
									<Icon icon="hugeicons:circle" class="w-2 h-2 text-gray-300" />
									{child.name}
								</a>
								{#if child.children && child.children.length > 0}
									<ul class="flex flex-col gap-1 pl-4 border-l border-gray-100 ml-1">
										{#each child.children.slice(0, 5) as subChild (subChild.id)}
											<li>
												<a
													href={`/categorias/${subChild.slug || subChild.id}`}
													class="text-sm text-gray-500 hover:text-primary transition-colors block py-0.5"
												>
													{subChild.name}
												</a>
											</li>
										{/each}
										{#if child.children.length > 5}
											<li>
												<a href={`/categorias/${child.slug || child.id}`} class="text-xs text-primary font-medium mt-1 block">
													+ {child.children.length - 5} más
												</a>
											</li>
										{/if}
									</ul>
								{/if}
							</div>
						{/each}
					</div>
				{:else}
					<div class="flex flex-col items-start justify-start h-full gap-6 mt-4">
						{#if activeCategory.description}
							<div class="text-gray-600 text-base leading-relaxed max-w-2xl prose prose-blue">
								{@html activeCategory.description}
							</div>
						{:else}
							<p class="text-gray-500 italic">
								Explora nuestra colección de {activeCategory.name}.
							</p>
						{/if}

						<div class="mt-4">
							<a href={`/categorias/${activeCategory.slug || activeCategory.id}`} class="btn btn-primary btn-md gap-2 shadow-lg shadow-primary/20">
								Ver Todos los Productos
								<Icon icon="hugeicons:arrow-right-01" class="text-lg" />
							</a>
						</div>
					</div>
				{/if}
			{:else}
				<div class="flex items-center justify-center h-full text-gray-400">
					Selecciona una categoría para ver detalles
				</div>
			{/if}
		</div>
	</div>
</div>

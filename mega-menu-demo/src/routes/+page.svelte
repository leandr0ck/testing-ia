<script>
	import '../app.css';
	import MegaMenu from '$lib/components/mega-menu.svelte';
	import { categories } from '$lib/data/categories.js';
</script>

<!-- Navbar de prueba -->
<nav class="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
	<div class="max-w-7xl mx-auto px-4 flex items-center gap-6 h-14">
		<span class="font-bold text-lg text-primary">DemoShop</span>
		<MegaMenu {categories} />
		<a href="/" class="text-sm text-gray-600 hover:text-gray-900">Inicio</a>
		<a href="/ofertas" class="text-sm text-gray-600 hover:text-gray-900">Ofertas</a>
	</div>
</nav>

<!-- Contenido de fondo para testear que el overlay cierra bien -->
<main class="max-w-7xl mx-auto px-4 py-16">
	<h1 class="text-3xl font-bold text-gray-900 mb-4">Probando el Mega Menu</h1>
	<p class="text-gray-500 mb-8">
		Pasá el cursor sobre <strong>Categorías</strong> en el navbar para ver el mega menu.
		Las últimas dos categorías (<em>Mascotas</em> y <em>Ofertas del Día</em>) no tienen hijos
		para testear el comportamiento con categorías hoja.
	</p>

	<div class="grid grid-cols-3 gap-6">
		{#each categories as cat}
			<div class="card bg-base-100 border border-gray-200 p-4">
				<p class="font-semibold text-gray-800">{cat.name}</p>
				<p class="text-sm text-gray-400 mt-1">
					{cat.children.length} subcategorías
				</p>
			</div>
		{/each}
	</div>
</main>

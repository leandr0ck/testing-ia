export const categories = [
	{
		id: '1',
		name: 'Electrónica',
		slug: 'electronica',
		imageUrl: 'https://api.dicebear.com/7.x/icons/svg?seed=electronics',
		description: '<p>Todo lo que necesitás en tecnología y electrónica.</p>',
		children: [
			{
				id: '1-1',
				name: 'Celulares y Smartphones',
				slug: 'celulares',
				children: [
					{ id: '1-1-1', name: 'iPhone', slug: 'iphone' },
					{ id: '1-1-2', name: 'Samsung Galaxy', slug: 'samsung-galaxy' },
					{ id: '1-1-3', name: 'Xiaomi', slug: 'xiaomi' },
					{ id: '1-1-4', name: 'Motorola', slug: 'motorola' },
					{ id: '1-1-5', name: 'Google Pixel', slug: 'google-pixel' },
					{ id: '1-1-6', name: 'OnePlus', slug: 'oneplus' }
				]
			},
			{
				id: '1-2',
				name: 'Computadoras',
				slug: 'computadoras',
				children: [
					{ id: '1-2-1', name: 'Laptops', slug: 'laptops' },
					{ id: '1-2-2', name: 'PCs de escritorio', slug: 'pcs-escritorio' },
					{ id: '1-2-3', name: 'All-in-One', slug: 'all-in-one' },
					{ id: '1-2-4', name: 'Mini PCs', slug: 'mini-pcs' }
				]
			},
			{
				id: '1-3',
				name: 'Audio',
				slug: 'audio',
				children: [
					{ id: '1-3-1', name: 'Auriculares', slug: 'auriculares' },
					{ id: '1-3-2', name: 'Parlantes Bluetooth', slug: 'parlantes-bt' },
					{ id: '1-3-3', name: 'Soundbars', slug: 'soundbars' },
					{ id: '1-3-4', name: 'Micrófonos', slug: 'microfonos' }
				]
			},
			{
				id: '1-4',
				name: 'TV y Video',
				slug: 'tv-video',
				children: [
					{ id: '1-4-1', name: 'Smart TVs', slug: 'smart-tvs' },
					{ id: '1-4-2', name: 'Proyectores', slug: 'proyectores' },
					{ id: '1-4-3', name: 'Streaming Devices', slug: 'streaming' }
				]
			},
			{
				id: '1-5',
				name: 'Wearables',
				slug: 'wearables',
				children: [
					{ id: '1-5-1', name: 'Smartwatches', slug: 'smartwatches' },
					{ id: '1-5-2', name: 'Fitness Trackers', slug: 'fitness-trackers' },
					{ id: '1-5-3', name: 'Lentes AR/VR', slug: 'ar-vr' }
				]
			}
		]
	},
	{
		id: '2',
		name: 'Ropa y Moda',
		slug: 'ropa-moda',
		imageUrl: 'https://api.dicebear.com/7.x/icons/svg?seed=fashion',
		children: [
			{
				id: '2-1',
				name: 'Hombre',
				slug: 'ropa-hombre',
				children: [
					{ id: '2-1-1', name: 'Remeras y Camisetas', slug: 'remeras-hombre' },
					{ id: '2-1-2', name: 'Pantalones', slug: 'pantalones-hombre' },
					{ id: '2-1-3', name: 'Camperas y Abrigos', slug: 'camperas-hombre' },
					{ id: '2-1-4', name: 'Calzado', slug: 'calzado-hombre' },
					{ id: '2-1-5', name: 'Ropa Interior', slug: 'interior-hombre' }
				]
			},
			{
				id: '2-2',
				name: 'Mujer',
				slug: 'ropa-mujer',
				children: [
					{ id: '2-2-1', name: 'Vestidos', slug: 'vestidos' },
					{ id: '2-2-2', name: 'Blusas y Tops', slug: 'blusas' },
					{ id: '2-2-3', name: 'Pantalones y Jeans', slug: 'pantalones-mujer' },
					{ id: '2-2-4', name: 'Calzado', slug: 'calzado-mujer' },
					{ id: '2-2-5', name: 'Carteras y Bolsos', slug: 'carteras' },
					{ id: '2-2-6', name: 'Accesorios', slug: 'accesorios-mujer' }
				]
			},
			{
				id: '2-3',
				name: 'Niños',
				slug: 'ropa-ninos',
				children: [
					{ id: '2-3-1', name: 'Bebés (0-2 años)', slug: 'ropa-bebes' },
					{ id: '2-3-2', name: 'Niñas (3-12 años)', slug: 'ropa-ninas' },
					{ id: '2-3-3', name: 'Niños (3-12 años)', slug: 'ropa-ninos-3-12' }
				]
			},
			{
				id: '2-4',
				name: 'Ropa Deportiva',
				slug: 'ropa-deportiva',
				children: [
					{ id: '2-4-1', name: 'Running', slug: 'running-ropa' },
					{ id: '2-4-2', name: 'Yoga y Pilates', slug: 'yoga-ropa' },
					{ id: '2-4-3', name: 'Fútbol', slug: 'futbol-ropa' },
					{ id: '2-4-4', name: 'Natación', slug: 'natacion' }
				]
			}
		]
	},
	{
		id: '3',
		name: 'Hogar y Deco',
		slug: 'hogar-deco',
		imageUrl: 'https://api.dicebear.com/7.x/icons/svg?seed=home',
		children: [
			{
				id: '3-1',
				name: 'Muebles',
				slug: 'muebles',
				children: [
					{ id: '3-1-1', name: 'Dormitorio', slug: 'muebles-dormitorio' },
					{ id: '3-1-2', name: 'Living y Comedor', slug: 'muebles-living' },
					{ id: '3-1-3', name: 'Escritorios y Oficina', slug: 'muebles-oficina' },
					{ id: '3-1-4', name: 'Exterior y Jardín', slug: 'muebles-exterior' }
				]
			},
			{
				id: '3-2',
				name: 'Cocina',
				slug: 'cocina',
				children: [
					{ id: '3-2-1', name: 'Electrodomésticos', slug: 'electrodomesticos' },
					{ id: '3-2-2', name: 'Utensilios', slug: 'utensilios' },
					{ id: '3-2-3', name: 'Vajilla y Cristalería', slug: 'vajilla' },
					{ id: '3-2-4', name: 'Almacenamiento', slug: 'almacenamiento-cocina' }
				]
			},
			{
				id: '3-3',
				name: 'Decoración',
				slug: 'decoracion',
				children: [
					{ id: '3-3-1', name: 'Cuadros y Arte', slug: 'cuadros' },
					{ id: '3-3-2', name: 'Plantas y Macetas', slug: 'plantas' },
					{ id: '3-3-3', name: 'Iluminación', slug: 'iluminacion' },
					{ id: '3-3-4', name: 'Textiles del Hogar', slug: 'textiles' }
				]
			}
		]
	},
	{
		id: '4',
		name: 'Deportes',
		slug: 'deportes',
		imageUrl: 'https://api.dicebear.com/7.x/icons/svg?seed=sports',
		children: [
			{
				id: '4-1',
				name: 'Fitness y Gym',
				slug: 'fitness-gym',
				children: [
					{ id: '4-1-1', name: 'Pesas y Mancuernas', slug: 'pesas' },
					{ id: '4-1-2', name: 'Máquinas Cardio', slug: 'cardio' },
					{ id: '4-1-3', name: 'Accesorios Gym', slug: 'accesorios-gym' },
					{ id: '4-1-4', name: 'Suplementos', slug: 'suplementos' }
				]
			},
			{
				id: '4-2',
				name: 'Outdoor y Aventura',
				slug: 'outdoor',
				children: [
					{ id: '4-2-1', name: 'Camping', slug: 'camping' },
					{ id: '4-2-2', name: 'Trekking', slug: 'trekking' },
					{ id: '4-2-3', name: 'Ciclismo', slug: 'ciclismo' },
					{ id: '4-2-4', name: 'Escalada', slug: 'escalada' }
				]
			},
			{
				id: '4-3',
				name: 'Deportes de Equipo',
				slug: 'deportes-equipo',
				children: [
					{ id: '4-3-1', name: 'Fútbol', slug: 'futbol' },
					{ id: '4-3-2', name: 'Básquet', slug: 'basquet' },
					{ id: '4-3-3', name: 'Tenis y Padel', slug: 'tenis-padel' },
					{ id: '4-3-4', name: 'Volleyball', slug: 'volleyball' }
				]
			}
		]
	},
	{
		id: '5',
		name: 'Libros',
		slug: 'libros',
		imageUrl: 'https://api.dicebear.com/7.x/icons/svg?seed=books',
		children: [
			{
				id: '5-1',
				name: 'Ficción',
				slug: 'ficcion',
				children: [
					{ id: '5-1-1', name: 'Novela', slug: 'novela' },
					{ id: '5-1-2', name: 'Ciencia Ficción', slug: 'ciencia-ficcion' },
					{ id: '5-1-3', name: 'Fantasía', slug: 'fantasia' },
					{ id: '5-1-4', name: 'Thriller y Suspenso', slug: 'thriller' }
				]
			},
			{
				id: '5-2',
				name: 'No Ficción',
				slug: 'no-ficcion',
				children: [
					{ id: '5-2-1', name: 'Biografías', slug: 'biografias' },
					{ id: '5-2-2', name: 'Historia', slug: 'historia' },
					{ id: '5-2-3', name: 'Ciencia y Naturaleza', slug: 'ciencia' },
					{ id: '5-2-4', name: 'Autoayuda', slug: 'autoayuda' }
				]
			},
			{
				id: '5-3',
				name: 'Negocios',
				slug: 'libros-negocios',
				children: [
					{ id: '5-3-1', name: 'Emprendimiento', slug: 'emprendimiento' },
					{ id: '5-3-2', name: 'Marketing', slug: 'marketing-libros' },
					{ id: '5-3-3', name: 'Finanzas Personales', slug: 'finanzas-personales' }
				]
			}
		]
	},
	{
		id: '6',
		name: 'Juguetes',
		slug: 'juguetes',
		imageUrl: 'https://api.dicebear.com/7.x/icons/svg?seed=toys',
		description: '<p>Los mejores juguetes para todas las edades.</p>',
		children: [
			{
				id: '6-1',
				name: 'Bebés y Primera Infancia',
				slug: 'juguetes-bebes',
				children: [
					{ id: '6-1-1', name: 'Sonajeros y Mordillos', slug: 'sonajeros' },
					{ id: '6-1-2', name: 'Peluches', slug: 'peluches' },
					{ id: '6-1-3', name: 'Juguetes de Baño', slug: 'juguetes-banio' }
				]
			},
			{
				id: '6-2',
				name: 'Juegos de Mesa',
				slug: 'juegos-mesa',
				children: [
					{ id: '6-2-1', name: 'Estrategia', slug: 'estrategia' },
					{ id: '6-2-2', name: 'Cooperativos', slug: 'cooperativos' },
					{ id: '6-2-3', name: 'Familia', slug: 'juegos-familia' },
					{ id: '6-2-4', name: 'Cartas', slug: 'cartas' }
				]
			},
			{
				id: '6-3',
				name: 'Videojuegos',
				slug: 'videojuegos',
				children: [
					{ id: '6-3-1', name: 'PlayStation', slug: 'playstation' },
					{ id: '6-3-2', name: 'Xbox', slug: 'xbox' },
					{ id: '6-3-3', name: 'Nintendo Switch', slug: 'nintendo' },
					{ id: '6-3-4', name: 'PC Gaming', slug: 'pc-gaming' },
					{ id: '6-3-5', name: 'Accesorios Gaming', slug: 'accesorios-gaming' },
					{ id: '6-3-6', name: 'Juegos Retro', slug: 'retro' }
				]
			}
		]
	},
	{
		id: '7',
		name: 'Mascotas',
		slug: 'mascotas',
		imageUrl: 'https://api.dicebear.com/7.x/icons/svg?seed=pets',
		description: '<p>Todo para el cuidado y bienestar de tu mascota.</p>',
		children: []
	},
	{
		id: '8',
		name: 'Ofertas del Día',
		slug: 'ofertas',
		imageUrl: 'https://api.dicebear.com/7.x/icons/svg?seed=offers',
		description: '<p>Las mejores ofertas renovadas cada 24 horas. ¡No te las pierdas!</p>',
		children: []
	}
];

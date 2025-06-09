import { delay, HttpResponse } from 'msw'
import type { ApiSchemas } from '../../schema'
import { http } from '../http'

// const mockMachines: ApiSchemas['Machine'][] = [
// 	{
// 		id: '1',
// 		name: 'Excavator X-2000',
// 		images: [
// 			'https://cdn.forbes.ru/files/c/1082x683/photo_galleries/1920-02_tcm-3173-1834873.jpg__1582289253__55999.webp'
// 		],
// 		price: 25000.99,
// 		rating: 4.5,
// 		like: true,
// 		createdAt: new Date().toISOString(),
// 		updatedAt: new Date().toISOString()
// 	},
// 	{
// 		id: '2',
// 		name: 'Bulldozer B-350',
// 		images: [
// 			'https://img.freepik.com/free-photo/luxurious-car-parked-highway-with-illuminated-headlight-sunset_181624-60607.jpg?semt=ais_hybrid&w=740'
// 		],
// 		price: 30000.5,
// 		rating: 4.2,
// 		like: false,
// 		createdAt: new Date().toISOString(),
// 		updatedAt: new Date().toISOString()
// 	},
// 	{
// 		id: '3',
// 		name: 'Bulldozer B-300',
// 		images: [
// 			'https://img.freepik.com/free-photo/luxurious-car-parked-highway-with-illuminated-headlight-sunset_181624-60607.jpg?semt=ais_hybrid&w=740'
// 		],
// 		price: 31000.5,
// 		rating: 4.2,
// 		like: false,
// 		createdAt: new Date().toISOString(),
// 		updatedAt: new Date().toISOString()
// 	},
// 	{
// 		id: '4',
// 		name: 'Bulldozer B-400',
// 		images: [
// 			'https://img.freepik.com/free-photo/luxurious-car-parked-highway-with-illuminated-headlight-sunset_181624-60607.jpg?semt=ais_hybrid&w=740'
// 		],
// 		price: 31500.5,
// 		rating: 4.2,
// 		like: false,
// 		createdAt: new Date().toISOString(),
// 		updatedAt: new Date().toISOString()
// 	}
// ]

// const mockMachines: ApiSchemas['Machine'][] = [
// 	{
// 		id: '1',
// 		name: 'Excavator X-2000',
// 		images: [
// 			'https://www.volvoce.com/globalassets/equipment/excavators/ec750e/ec750e_01.jpg?width=1200&height=630&mode=crop'
// 		],
// 		price: 25000.99,
// 		rating: 4.5,
// 		like: true,
// 		createdAt: new Date().toISOString(),
// 		updatedAt: new Date().toISOString()
// 	},
// 	{
// 		id: '2',
// 		name: 'Bulldozer D-350',
// 		images: [
// 			'https://www.cat.com/content/dam/cat/en_us/images/equipment/dozers/large-dozers/140/140_01.jpg'
// 		],
// 		price: 30000.5,
// 		rating: 4.2,
// 		like: false,
// 		createdAt: new Date().toISOString(),
// 		updatedAt: new Date().toISOString()
// 	},
// 	{
// 		id: '3',
// 		name: 'Crane LTM-1100',
// 		images: [
// 			'https://www.liebherr.com/shared/media/components-and-products/mobile-and-crawler-cranes/mobile-cranes/liebherr-ltm-mobile-cranes/images/liebherr-ltm-1100-5.2-mobile-crane-01.jpg'
// 		],
// 		price: 45000.0,
// 		rating: 4.8,
// 		like: true,
// 		createdAt: new Date().toISOString(),
// 		updatedAt: new Date().toISOString()
// 	},
// 	{
// 		id: '4',
// 		name: 'Wheel Loader L-350',
// 		images: [
// 			'https://www.komatsu.com.au/sites/default/files/styles/equipment_hero/public/2021-08/Wheel%20Loaders%20WA600%20-%20WA800%20Hero.jpg'
// 		],
// 		price: 32000.75,
// 		rating: 4.3,
// 		like: false,
// 		createdAt: new Date().toISOString(),
// 		updatedAt: new Date().toISOString()
// 	},
// 	{
// 		id: '5',
// 		name: 'Motor Grader G-200',
// 		images: [
// 			'https://www.deere.com/assets/images/region-4/products/motor-graders/670gp-motor-grader/m670gp-grader-1920x1080.jpg'
// 		],
// 		price: 28000.25,
// 		rating: 4.1,
// 		like: true,
// 		createdAt: new Date().toISOString(),
// 		updatedAt: new Date().toISOString()
// 	},
// 	// Остальные 95 элементов с разными типами техники
// 	...Array.from({ length: 95 }, (_, i) => {
// 		type MachineType =
// 			| 'Excavator'
// 			| 'Bulldozer'
// 			| 'Crane'
// 			| 'Loader'
// 			| 'Grader'
// 			| 'Backhoe'
// 			| 'Dumper'

// 		const types: { name: MachineType; baseImg: string }[] = [
// 			{
// 				name: 'Excavator',
// 				baseImg: 'https://www.volvoce.com/globalassets/equipment/excavators/'
// 			},
// 			{
// 				name: 'Bulldozer',
// 				baseImg:
// 					'https://www.cat.com/content/dam/cat/en_us/images/equipment/dozers/'
// 			},
// 			{
// 				name: 'Crane',
// 				baseImg:
// 					'https://www.liebherr.com/shared/media/components-and-products/mobile-and-crawler-cranes/'
// 			},
// 			{
// 				name: 'Loader',
// 				baseImg:
// 					'https://www.komatsu.com.au/sites/default/files/styles/equipment_hero/public/'
// 			},
// 			{
// 				name: 'Grader',
// 				baseImg:
// 					'https://www.deere.com/assets/images/region-4/products/motor-graders/'
// 			},
// 			{
// 				name: 'Backhoe',
// 				baseImg: 'https://www.jcb.com/-/media/images/products/excavators/'
// 			},
// 			{
// 				name: 'Dumper',
// 				baseImg: 'https://www.hitachicm.com/global/products/rigid-dump-truck/'
// 			}
// 		]

// 		const type = types[Math.floor(Math.random() * types.length)]
// 		const model = String.fromCharCode(65 + Math.floor(Math.random() * 6)) // A-F
// 		const version = Math.floor(100 + Math.random() * 900) // 100-999

// 		// Объект с явно типизированными ключами
// 		const machineImages: Record<MachineType, string[]> = {
// 			Excavator: [
// 				'ec750e/ec750e_01.jpg',
// 				'ec380e/ec380e_01.jpg',
// 				'ec220e/ec220e_01.jpg'
// 			],
// 			Bulldozer: [
// 				'large-dozers/140/140_01.jpg',
// 				'small-dozers/d3/d3_01.jpg',
// 				'medium-dozers/d6/d6_01.jpg'
// 			],
// 			Crane: [
// 				'liebherr-ltm-1100-5.2-mobile-crane-01.jpg',
// 				'liebherr-ltm-1090-5.1-mobile-crane-01.jpg',
// 				'liebherr-ltm-1050-3.1-mobile-crane-01.jpg'
// 			],
// 			Loader: [
// 				'2021-08/Wheel%20Loaders%20WA600%20-%20WA800%20Hero.jpg',
// 				'2021-08/Wheel%20Loaders%20WA475%20-%20WA500%20Hero.jpg'
// 			],
// 			Grader: [
// 				'670gp-motor-grader/m670gp-grader-1920x1080.jpg',
// 				'672gp-motor-grader/m672gp-grader-1920x1080.jpg'
// 			],
// 			Backhoe: ['js220/js220-01.jpg', 'js130/js130-01.jpg'],
// 			Dumper: [
// 				'eh3500ac-3-articulated-dump-truck/images/eh3500ac3-01.jpg',
// 				'eh4000ac-3-articulated-dump-truck/images/eh4000ac3-01.jpg'
// 			]
// 		}

// 		const imgPath =
// 			machineImages[type.name][
// 				Math.floor(Math.random() * machineImages[type.name].length)
// 			]
// 		const imageUrl = type.baseImg + imgPath

// 		return {
// 			id: (i + 6).toString(),
// 			name: `${type.name} ${model}-${version}`,
// 			images: [imageUrl],
// 			price: parseFloat((20000 + Math.random() * 30000).toFixed(2)),
// 			rating: parseFloat((3 + Math.random() * 2).toFixed(1)),
// 			like: Math.random() > 0.7,
// 			createdAt: new Date().toISOString(),
// 			updatedAt: new Date().toISOString()
// 		}
// 	})
// ]

// const mockMachines: ApiSchemas['Machine'][] = [
// 	// Первые 5 уникальных машин с реальными изображениями
// 	{
// 		id: '1',
// 		name: 'Excavator CAT-320',
// 		images: [
// 			'https://www.cat.com/content/dam/cat/en_us/images/equipment/excavators/small-excavators/320/320_01.jpg'
// 		],
// 		price: 125000.99,
// 		rating: 4.7,
// 		like: true,
// 		createdAt: new Date().toISOString(),
// 		updatedAt: new Date().toISOString()
// 	},
// 	{
// 		id: '2',
// 		name: 'Bulldozer Komatsu D65',
// 		images: [
// 			'https://www.komatsu.com.au/sites/default/files/styles/equipment_hero/public/2021-08/Dozers%20D65%20-%20D155%20Hero.jpg'
// 		],
// 		price: 235000.5,
// 		rating: 4.5,
// 		like: false,
// 		createdAt: new Date().toISOString(),
// 		updatedAt: new Date().toISOString()
// 	},
// 	{
// 		id: '3',
// 		name: 'Tower Crane Liebherr 200',
// 		images: [
// 			'https://www.liebherr.com/shared/media/tower-cranes/images/header-bauma-2022.jpg'
// 		],
// 		price: 450000.0,
// 		rating: 4.9,
// 		like: true,
// 		createdAt: new Date().toISOString(),
// 		updatedAt: new Date().toISOString()
// 	},
// 	{
// 		id: '4',
// 		name: 'Wheel Loader Volvo L120',
// 		images: [
// 			'https://www.volvoce.com/globalassets/equipment/wheel-loaders/l120h/l120h_01.jpg'
// 		],
// 		price: 185000.75,
// 		rating: 4.3,
// 		like: false,
// 		createdAt: new Date().toISOString(),
// 		updatedAt: new Date().toISOString()
// 	},
// 	{
// 		id: '5',
// 		name: 'Road Grader John Deere 670',
// 		images: [
// 			'https://www.deere.com/assets/images/region-4/products/motor-graders/670gp-motor-grader/m670gp-grader-1920x1080.jpg'
// 		],
// 		price: 165000.25,
// 		rating: 4.2,
// 		like: true,
// 		createdAt: new Date().toISOString(),
// 		updatedAt: new Date().toISOString()
// 	},

// 	// Генерация остальных 95 машин
// 	...Array.from({ length: 95 }, (_, i) => {
// 		// Доступные типы техники с реальными изображениями
// 		const machineTypes = [
// 			{
// 				type: 'Excavator',
// 				brands: ['CAT', 'Volvo', 'Komatsu', 'Hitachi', 'JCB'],
// 				images: [
// 					'https://www.cat.com/content/dam/cat/en_us/images/equipment/excavators/small-excavators/320/320_01.jpg',
// 					'https://www.volvoce.com/globalassets/equipment/excavators/ec220e/ec220e_01.jpg',
// 					'https://www.komatsu.com.au/sites/default/files/styles/equipment_hero/public/2021-08/Excavators%20PC210LC%20-%20PC360LC%20Hero.jpg',
// 					'https://www.hitachicm.com/global/products/excavators/images/ex1200-7-01.jpg',
// 					'https://www.jcb.com/-/media/images/products/excavators/js220/js220-01.jpg'
// 				]
// 			},
// 			{
// 				type: 'Bulldozer',
// 				brands: ['CAT', 'Komatsu', 'Shantui', 'Liebherr'],
// 				images: [
// 					'https://www.cat.com/content/dam/cat/en_us/images/equipment/dozers/large-dozers/d9/d9_01.jpg',
// 					'https://www.komatsu.com.au/sites/default/files/styles/equipment_hero/public/2021-08/Dozers%20D65%20-%20D155%20Hero.jpg',
// 					'https://www.shantui.com/uploadfile/2022/0221/20220221102047652.jpg',
// 					'https://www.liebherr.com/shared/media/earthmoving/bulldozers/images/pr-736-litronic-pr-756-litronic.jpg'
// 				]
// 			},
// 			{
// 				type: 'Crane',
// 				brands: ['Liebherr', 'Terex', 'XCMG', 'Sany'],
// 				images: [
// 					'https://www.liebherr.com/shared/media/components-and-products/mobile-and-crawler-cranes/liebherr-ltm-mobile-cranes/images/liebherr-ltm-1100-5.2-mobile-crane-01.jpg',
// 					'https://www.terex.com/media/awjqxq0x/ac1000-9t_hero.jpg',
// 					'https://www.xcmg.com/uploadfile/2021/0513/20210513033507767.jpg',
// 					'https://www.sanycranes.com/uploadfile/2021/0510/20210510033507767.jpg'
// 				]
// 			},
// 			{
// 				type: 'Loader',
// 				brands: ['Volvo', 'CAT', 'Komatsu', 'Hyundai'],
// 				images: [
// 					'https://www.volvoce.com/globalassets/equipment/wheel-loaders/l120h/l120h_01.jpg',
// 					'https://www.cat.com/content/dam/cat/en_us/images/equipment/wheel-loaders/950/950_01.jpg',
// 					'https://www.komatsu.com.au/sites/default/files/styles/equipment_hero/public/2021-08/Wheel%20Loaders%20WA475%20-%20WA500%20Hero.jpg',
// 					'https://www.hyundai-ce.com/upload/product/2019/06/20190619151507767.jpg'
// 				]
// 			}
// 		]

// 		const randomType =
// 			machineTypes[Math.floor(Math.random() * machineTypes.length)]
// 		const randomBrand =
// 			randomType.brands[Math.floor(Math.random() * randomType.brands.length)]
// 		const randomImage =
// 			randomType.images[Math.floor(Math.random() * randomType.images.length)]
// 		const modelNumber = Math.floor(100 + Math.random() * 900)

// 		return {
// 			id: (i + 6).toString(),
// 			name: `${randomType.type} ${randomBrand}-${modelNumber}`,
// 			images: [randomImage],
// 			price: parseFloat((50000 + Math.random() * 450000).toFixed(2)),
// 			rating: parseFloat((3.5 + Math.random() * 1.5).toFixed(1)),
// 			like: Math.random() > 0.7,
// 			createdAt: new Date().toISOString(),
// 			updatedAt: new Date().toISOString()
// 		}
// 	})
// ]

// const mockMachines: ApiSchemas['Machine'][] = [
// 	// Первые 5 уникальных машин
// 	{
// 		id: '1',
// 		name: 'Excavator CAT-320',
// 		images: [
// 			'https://m.media-amazon.com/images/I/71fZUm0d5VL._AC_UF1000,1000_QL80_.jpg'
// 		],
// 		price: 125000.99,
// 		rating: 4.7,
// 		like: true,
// 		createdAt: new Date().toISOString(),
// 		updatedAt: new Date().toISOString()
// 	},
// 	{
// 		id: '2',
// 		name: 'Bulldozer Komatsu D65',
// 		images: [
// 			'https://www.ritchiespecs.com/images/large/Komatsu/D65PX-18-332516.jpg'
// 		],
// 		price: 235000.5,
// 		rating: 4.5,
// 		like: false,
// 		createdAt: new Date().toISOString(),
// 		updatedAt: new Date().toISOString()
// 	},
// 	{
// 		id: '3',
// 		name: 'Tower Crane Liebherr',
// 		images: [
// 			'https://www.ritchiespecs.com/images/large/Liebherr/112EC-H8-332517.jpg'
// 		],
// 		price: 450000.0,
// 		rating: 4.9,
// 		like: true,
// 		createdAt: new Date().toISOString(),
// 		updatedAt: new Date().toISOString()
// 	},
// 	{
// 		id: '4',
// 		name: 'Wheel Loader Volvo L120',
// 		images: [
// 			'https://www.ritchiespecs.com/images/large/Volvo/L120H-332518.jpg'
// 		],
// 		price: 185000.75,
// 		rating: 4.3,
// 		like: false,
// 		createdAt: new Date().toISOString(),
// 		updatedAt: new Date().toISOString()
// 	},
// 	{
// 		id: '5',
// 		name: 'Road Grader John Deere',
// 		images: [
// 			'https://www.ritchiespecs.com/images/large/John-Deere/670G-332519.jpg'
// 		],
// 		price: 165000.25,
// 		rating: 4.2,
// 		like: true,
// 		createdAt: new Date().toISOString(),
// 		updatedAt: new Date().toISOString()
// 	},

// 	// Генерация остальных 95 машин
// 	...Array.from({ length: 95 }, (_, i) => {
// 		const machineTypes = [
// 			{
// 				type: 'Excavator',
// 				brands: ['CAT', 'Volvo', 'Komatsu', 'Hitachi', 'JCB'],
// 				images: [
// 					'https://www.ritchiespecs.com/images/large/Caterpillar/320-332520.jpg',
// 					'https://www.ritchiespecs.com/images/large/Volvo/EC220E-332521.jpg',
// 					'https://www.ritchiespecs.com/images/large/Komatsu/PC210LC-11-332522.jpg',
// 					'https://www.ritchiespecs.com/images/large/Hitachi/ZX210LC-6-332523.jpg',
// 					'https://www.ritchiespecs.com/images/large/JCB/JS220-332524.jpg'
// 				]
// 			},
// 			{
// 				type: 'Bulldozer',
// 				brands: ['CAT', 'Komatsu', 'Shantui', 'Liebherr'],
// 				images: [
// 					'https://www.ritchiespecs.com/images/large/Caterpillar/D6-332525.jpg',
// 					'https://www.ritchiespecs.com/images/large/Komatsu/D65PX-18-332526.jpg',
// 					'https://www.ritchiespecs.com/images/large/Shantui/SD16-332527.jpg',
// 					'https://www.ritchiespecs.com/images/large/Liebherr/PR-736-332528.jpg'
// 				]
// 			},
// 			{
// 				type: 'Crane',
// 				brands: ['Liebherr', 'Terex', 'XCMG', 'Sany'],
// 				images: [
// 					'https://www.ritchiespecs.com/images/large/Liebherr/LTM-1100-332529.jpg',
// 					'https://www.ritchiespecs.com/images/large/Terex/AC-1000-332530.jpg',
// 					'https://www.ritchiespecs.com/images/large/XCMG/QAY-200-332531.jpg',
// 					'https://www.ritchiespecs.com/images/large/Sany/SAC-1200-332532.jpg'
// 				]
// 			},
// 			{
// 				type: 'Loader',
// 				brands: ['Volvo', 'CAT', 'Komatsu', 'Hyundai'],
// 				images: [
// 					'https://www.ritchiespecs.com/images/large/Volvo/L120H-332533.jpg',
// 					'https://www.ritchiespecs.com/images/large/Caterpillar/950-332534.jpg',
// 					'https://www.ritchiespecs.com/images/large/Komatsu/WA500-8-332535.jpg',
// 					'https://www.ritchiespecs.com/images/large/Hyundai/HL-770-332536.jpg'
// 				]
// 			}
// 		]

// 		const randomType =
// 			machineTypes[Math.floor(Math.random() * machineTypes.length)]
// 		const randomBrand =
// 			randomType.brands[Math.floor(Math.random() * randomType.brands.length)]
// 		const randomImage =
// 			randomType.images[Math.floor(Math.random() * randomType.images.length)]
// 		const modelNumber = Math.floor(100 + Math.random() * 900)

// 		return {
// 			id: (i + 6).toString(),
// 			name: `${randomType.type} ${randomBrand}-${modelNumber}`,
// 			images: [randomImage],
// 			price: parseFloat((50000 + Math.random() * 450000).toFixed(2)),
// 			rating: parseFloat((3.5 + Math.random() * 1.5).toFixed(1)),
// 			like: Math.random() > 0.7,
// 			createdAt: new Date().toISOString(),
// 			updatedAt: new Date().toISOString()
// 		}
// 	})
// ]

const mockMachines: ApiSchemas['Machine'][] = [
	{
		id: '1',
		name: 'Lexus ES 300h',
		images: [
			'https://upload.wikimedia.org/wikipedia/commons/7/76/0Lexus_ES_300h2.jpg'
		],
		price: 45000.99,
		rating: 4.7,
		like: true,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},
	{
		id: '2',
		name: 'Mercedes GLE 350',
		images: [
			'https://octane.rent/wp-content/uploads/2023/09/mercedes-gle-350-black-5-600x400.webp'
		],
		price: 68500.5,
		rating: 4.8,
		like: false,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},
	{
		id: '3',
		name: 'Mercedes E-Class Coupe',
		images: [
			'https://www.automoli.com/common/vehicles/_assets/img/gallery/f114/mercedes-benz-e-class-coupe-c238.jpg'
		],
		price: 62500.0,
		rating: 4.6,
		like: true,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},
	{
		id: '4',
		name: 'Premium Sedan',
		images: [
			'https://avatars.mds.yandex.net/get-verba/1535139/2a0000018f72dd19977950ae68175db58495/456x342'
		],
		price: 55000.75,
		rating: 4.5,
		like: false,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},
	{
		id: '5',
		name: 'Luxury Concept Car',
		images: [
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNXOehGdVIADOa4uepmoxatYZRjXg-rC8seJ3jHY35EioCra1ilqeRgk5ARFQv0oOXmKU&usqp=CAU'
		],
		price: 120000.25,
		rating: 4.9,
		like: true,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},

	// Генерация остальных 95 машин со случайными изображениями
	...Array.from({ length: 95 }, (_, i) => {
		const carImages = [
			'https://upload.wikimedia.org/wikipedia/commons/7/76/0Lexus_ES_300h2.jpg',
			'https://octane.rent/wp-content/uploads/2023/09/mercedes-gle-350-black-5-600x400.webp',
			'https://www.automoli.com/common/vehicles/_assets/img/gallery/f114/mercedes-benz-e-class-coupe-c238.jpg',
			'https://avatars.mds.yandex.net/get-verba/1535139/2a0000018f72dd19977950ae68175db58495/456x342',
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNXOehGdVIADOa4uepmoxatYZRjXg-rC8seJ3jHY35EioCra1ilqeRgk5ARFQv0oOXmKU&usqp=CAU'
		]

		const carMakes = ['Mercedes', 'BMW', 'Audi', 'Lexus', 'Tesla', 'Porsche']
		const carModels = ['S-Class', '5 Series', 'A6', 'RX', 'Model S', '911']
		const randomImage = carImages[Math.floor(Math.random() * carImages.length)]
		const randomMake = carMakes[Math.floor(Math.random() * carMakes.length)]
		const randomModel = carModels[Math.floor(Math.random() * carModels.length)]
		const year = 2020 + Math.floor(Math.random() * 4)

		return {
			id: (i + 6).toString(),
			name: `${randomMake} ${randomModel} ${year}`,
			images: [randomImage],
			price: parseFloat((30000 + Math.random() * 120000).toFixed(2)),
			rating: parseFloat((3.8 + Math.random() * 1.2).toFixed(1)),
			like: Math.random() > 0.7,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		}
	})
]

export const machinesHandlers = [
	http.get('/machines', async ({ request }) => {
		const url = new URL(request.url)
		const limit = Number(url.searchParams.get('limit')) || 4
		const page = Number(url.searchParams.get('page')) || 1

		const total = mockMachines.length
		const totalPages = Math.ceil(total / limit)
		const startIndex = (page - 1) * limit
		const endIndex = startIndex + limit

		const paginatedMachines = mockMachines.slice(startIndex, endIndex)

		await delay(300)
		return HttpResponse.json({
			list: paginatedMachines,
			total,
			totalPages
		})
	}),

	http.get('/machines/{id}', async ({ params }) => {
		await delay(200)
		const machine = mockMachines.find((m) => m.id === params.id)

		if (!machine) {
			return HttpResponse.json(
				{ message: 'Машина не найдена', code: 'MACHINE_NOT_FOUND' },
				{ status: 404 }
			)
		}

		return HttpResponse.json(machine)
	}),

	http.post('/machines', async ({ request }) => {
		const body = (await request.json()) as ApiSchemas['MachineCreate']
		await delay(400)

		const newMachine: ApiSchemas['Machine'] = {
			id: String(mockMachines.length + 1),
			name: body.name,
			images: body.images || [],
			price: body.price,
			rating: body.rating || 0,
			like: false,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		}

		mockMachines.push(newMachine)
		return HttpResponse.json(newMachine, { status: 201 })
	}),

	http.put('/machines/{id}', async ({ params, request }) => {
		const body = (await request.json()) as ApiSchemas['MachineUpdate']
		await delay(300)

		const index = mockMachines.findIndex((m) => m.id === params.id)

		if (index === -1) {
			return HttpResponse.json(
				{ message: 'Машина не найдена', code: 'MACHINE_NOT_FOUND' },
				{ status: 404 }
			)
		}

		const updatedMachine = {
			...mockMachines[index],
			...body,
			updatedAt: new Date().toISOString()
		}

		mockMachines[index] = updatedMachine
		return HttpResponse.json(updatedMachine)
	}),

	http.delete('/machines/{id}', async ({ params }) => {
		await delay(200)
		const index = mockMachines.findIndex((m) => m.id === params.id)

		if (index === -1) {
			return HttpResponse.json(
				{ message: 'Машина не найдена', code: 'MACHINE_NOT_FOUND' },
				{ status: 404 }
			)
		}

		mockMachines.splice(index, 1)
		return new HttpResponse(null, { status: 204 })
	}),

	http.patch('/machines/{id}/like', async ({ params }) => {
		await delay(150)
		const machine = mockMachines.find((m) => m.id === params.id)

		if (!machine) {
			return HttpResponse.json(
				{ message: 'Машина не найдена', code: 'MACHINE_NOT_FOUND' },
				{ status: 404 }
			)
		}

		machine.like = !machine.like
		machine.updatedAt = new Date().toISOString()

		return HttpResponse.json({ like: machine.like })
	})
]

import { Application, Assets } from 'pixi.js'
import { addBackground } from './addBackground'
import { addFishes, animateFishes } from './addFishes'

// Create a PixiJS application.
const app = new Application()

// массив спрайтов рыб
const fishes = [];

// Asynchronous IIFE
(async () =>
{
	await setup()
	await preload()

	addBackground(app)
	addFishes(app, fishes)

	// анимируем рыб
	app.ticker.maxFPS = 60
	app.ticker.add((time) => animateFishes(app, fishes, time))
})()

async function setup()
{
	// инициализируем приложение
	await app.init({ background: '#1099bb', resizeTo: window })

	// убираем полосы прокрутки
	app.canvas.style.position = 'absolute'

	// добавляем канвас в body
	document.body.appendChild(app.canvas)
}

async function preload()
{
	// создаем массив данных ассетов для последующей загрузки
	const assets = [
		{ alias: 'background', src: '../../assets/images/fish_pond/pond_background.jpg' },
		{ alias: 'fish1', src: '../../assets/images/fish_pond/fish1.png' },
		{ alias: 'fish2', src: '../../assets/images/fish_pond/fish2.png' },
		{ alias: 'fish3', src: '../../assets/images/fish_pond/fish3.png' },
		{ alias: 'fish4', src: '../../assets/images/fish_pond/fish4.png' },
		{ alias: 'fish5', src: '../../assets/images/fish_pond/fish5.png' },
		{ alias: 'overlay', src: '../../assets/images/fish_pond/wave_overlay.png' },
		{ alias: 'displacement', src: '../../assets/images/fish_pond/displacement_map.png' },
	]

	// загружаем ассеты
	await Assets.load(assets)
}
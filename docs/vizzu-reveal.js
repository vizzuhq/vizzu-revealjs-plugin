import VizzuPlayer from 'https://cdn.jsdelivr.net/npm/vizzu-story@0.4/dist/vizzu-story.min.js';

let RevealVizzu = {
	id: "RevealVizzu",
	init: (deck) => initRevealVizzu(deck)
}

const initRevealVizzu = (Reveal) => {

	function _getInnerObj(element)
	{
		return JSON.parse(element.innerText);
	}

	function initialize() {
		const initDataElement = document.querySelectorAll("[data-vizzu-init-data]");
		const initSlideElement = document.querySelectorAll("[data-vizzu-init-slide]");
		const slideElements = [...document.querySelectorAll("[data-vizzu-slide]")];

		const story = {
			data: _getInnerObj(initDataElement[0]),
			slides: [ _getInnerObj(initSlideElement[0]), ...slideElements.map(_getInnerObj) ]
		};

		const vp = document.querySelector('vizzu-player');
		vp.slides = story;
	}

	const vp = document.querySelector('vizzu-player');

	return Reveal.addEventListener('ready', (event) => {

		initialize();

		Reveal.addEventListener( 'fragmentshown', function( event ) {
			const actIndex = Number(event.fragment.dataset.fragmentIndex) + 1;
			console.log('s',actIndex);
			vp.currentSlide = actIndex;
		} );

		Reveal.addEventListener( 'fragmenthidden', function( event ) {
			const actIndex = Number(event.fragment.dataset.fragmentIndex);
			console.log('h',actIndex);
			vp.currentSlide = actIndex;
		} );

		return new Promise( resolve => setTimeout( resolve, 1000 ) )
	});
}

export default () => RevealVizzu;
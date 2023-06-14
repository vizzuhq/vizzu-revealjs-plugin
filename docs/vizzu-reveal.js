import VizzuPlayer from 'https://cdn.jsdelivr.net/npm/vizzu-story@0.4/dist/vizzu-story.min.js';

let RevealVizzu = {
	id: "RevealVizzu",
	init: (deck) => initRevealVizzu(deck)
}

let players = [];

const initRevealVizzu = (Reveal) => {

	function _getInnerObj(element)
	{
		return JSON.parse(element.innerText);
	}

	function _initializeStory(storyElement)
	{
		const vp = storyElement.querySelector('vizzu-player');
		players.push(vp);
		const index = players.length - 1;

		const initDataElement = storyElement.querySelectorAll("[data-vizzu-init-data]");
		const initSlideElement = storyElement.querySelectorAll("[data-vizzu-init-slide]");
		const slideElements = [...storyElement.querySelectorAll("[data-vizzu-slide]")];

		const story = {
			data: _getInnerObj(initDataElement[0]),
			slides: [ _getInnerObj(initSlideElement[0]), ...slideElements.map(_getInnerObj) ]
		};

		slideElements.map((slideElement) => { slideElement.dataset.VizzuPlayer = index; });

		vp.slides = story;
	}

	function _initialize() {
		const storyElement = [...document.querySelectorAll("[data-vizzu]")];
		storyElement.map(_initializeStory);
	}

	function _getInnerObj(element)
	{
		return JSON.parse(element.innerText);
	}

	return Reveal.addEventListener('ready', (event) => {

		_initialize();

		Reveal.addEventListener( 'fragmentshown', function( event ) {
			const actIndex = Number(event.fragment.dataset.fragmentIndex) + 1;
			console.log('s',actIndex);
			const vp = players[event.fragment.dataset.VizzuPlayer];
			vp.currentSlide = actIndex;
		} );

		Reveal.addEventListener( 'fragmenthidden', function( event ) {
			const actIndex = Number(event.fragment.dataset.fragmentIndex);
			console.log('h',actIndex);
			const vp = players[event.fragment.dataset.VizzuPlayer];
			vp.currentSlide = actIndex;
		} );

		return new Promise( resolve => setTimeout( resolve, 1000 ) )
	});
}

export default () => RevealVizzu;
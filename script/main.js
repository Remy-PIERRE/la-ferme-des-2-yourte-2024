import Carrousel from "./classes/Carrousel.js";
import Shop from "./classes/Shop.js";

function initApp() {
	// handle menu mobile opening / closing //
	document.querySelector("#mobileMenuIcon").addEventListener("click", () => {
		document.querySelector("#mobileMenuContainer").classList.toggle("opened");
	});

	// handle header sticky transform //
	window.addEventListener("scroll", () => {
		const header = document.querySelector("#headerContainer");
		const logo = document.querySelector("#headerLogo");
		const mobileMenuIcon = document.querySelector("#mobileMenuIcon");

		if (window.scrollY >= 100 && ![...header.classList].includes("sticky")) {
			header.classList.toggle("sticky");
			mobileMenuIcon.src = "./public/images/menu_white.png";
			logo.src = "./public/images/ferme_logo_white.png";
		} else if (
			window.scrollY < 50 &&
			[...header.classList].includes("sticky")
		) {
			header.classList.toggle("sticky");
			mobileMenuIcon.src = "./public/images/menu.png";
			logo.src = "./public/images/ferme_logo.png";
		}
	});

	// create carrousel, class handling all //
	const carrousel = new Carrousel(carrouselData);

	const shop = new Shop(shopData);
}

// carrousel data, later go to db //
const carrouselData = [
	{
		title: "Titre de test 1",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
		image: "./public/images/mouton_portrait.jpg",
		ctaText: "BOUTIQUE",
		ctaLink: "./boutique.html",
	},
	{
		title: "Titre de test 2",
		description: "Description test 2",
		image: "./public/images/sheep_2.jpg",
		ctaText: "&Agrave; PROPOS",
		ctaLink: "./boutique.html",
	},
	{
		title: "Titre de test 3",
		description: "Description test 3",
		image: "./public/images/sheep_3.jpg",
		ctaText: "&Agrave; PROPOS",
		ctaLink: "./boutique.html",
	},
];

const shopData = [
	{
		id: 1,
		title: "titre 1",
		description: "description 1",
		image: "./public/images/mouton_portrait.jpg",
		fav: true,
	},
	{
		id: 2,
		title: "titre 2",
		description:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis commodi eaque ipsum rem, doloremque ut.",
		image: "./public/images/sheep_2.jpg",
		fav: true,
	},
	{
		id: 3,
		title: "titre 3",
		description: "description 3",
		image: "./public/images/mouton_portrait.jpg",
		fav: true,
	},
	{
		id: 4,
		title: "titre 4",
		description: "description 4",
		image: "./public/images/sheep_3.jpg",
		fav: true,
	},
];

initApp();

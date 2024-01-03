import Carrousel from "./classes/Carrousel.js";
import Shop from "./classes/Shop.js";

// TODO (all) - checkpage before create classes
// (apropos) - check title height and change position and margin of content
// (index) - true shop - limit fav shop size
// (index / shop) - hover on card with mobile
// (index) - prevent multi click - timer - interaction timer && click -- click on button not only image

function initApp() {
	// all pages //
	handleMenuMobile();

	const page = document.querySelector("#page").dataset.page;

	if (page === "accueil") {
		handleCarrousel();
		handleGallery();
	}

	if (page === "boutique") {
		handleMenuFilters();
		handleGallery();
	}
}

function handleMenuMobile() {
	// handle menu mobile opening / closing //
	document.querySelector("#mobileMenuIcon").addEventListener("click", () => {
		document.querySelector("#mobileMenuContainer").classList.toggle("opened");
		handleBodyMenuFilter();
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
}

function handleMenuFilters() {
	const filterIcon = document.querySelector("#galleryFilterIcon");
	const logo = document.querySelector("#headerLogo");
	let inAnimation = false;

	// handle icon and header merging animation //
	window.addEventListener("scroll", () => {
		if (window.scrollY > 230 && ![...filterIcon.classList].includes("merged")) {
			filterIcon.classList.toggle("merged");
			filterIcon.animate([{ top: "48px" }, { top: 0 }], {
				duration: 400,
				easeing: "ease-in-out",
				fill: "forwards",
			});
			filterIcon.querySelector("img").src = "./public/images/filtre_white.png";
			logo.style.opacity = 0;
		}

		if (window.scrollY < 220 && [...filterIcon.classList].includes("merged")) {
			if (inAnimation) return;
			inAnimation = true;

			const animation = filterIcon.animate([{ top: 0 }, { top: "48px" }], {
				duration: 400,
				easeing: "ease-in-out",
				fill: "forwards",
			});

			animation.addEventListener("finish", () => {
				filterIcon.classList.toggle("merged");
				filterIcon.querySelector("img").src = "./public/images/filtre.png";
				inAnimation = false;
			});
			logo.style.opacity = 1;
		}
	});

	// handle openingfilter menu //
	filterIcon.addEventListener("click", () => {
		document.querySelector("#galleryFilterMenu").classList.toggle("opened");
		handleBodyMenuFilter();
	});
}

function handleBodyMenuFilter() {
	const filter = document.querySelector("#bodyMenuFilter");
	const opacity = getComputedStyle(filter).opacity;
	filter.style.opacity = +opacity === 0 ? 1 : 0;
}

function handleCarrousel() {
	const carrousel = new Carrousel(carrouselData);
}

function handleGallery() {
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

export default class ShopArticle {
	node;
	id;
	fav = false;

	constructor(data) {
		this.node = this.createNode();
		this.setElements(data);

		this.id = data.id;
		if (data.fav) this.fav = true;

		this.handleEvents();
	}

	createNode() {
		const template = document
			.querySelector("#shopTemplate")
			.content.cloneNode(true);
		const wrapper = template.querySelector(".shop--template--wrapper");

		return wrapper;
	}

	setElements({ id, title, description, image }) {
		this.node.id = id;

		const titleElem = this.node.querySelector(".shop--content h2");
		titleElem.innerHTML = `${title}`;

		const descriptionElem = this.node.querySelector(".shop--content h3");
		descriptionElem.innerHTML = `${description}`;

		const imageElem = this.node.querySelector(".shop--image img");
		imageElem.src = image;
	}

	getNode() {
		return this.node;
	}

	isFav() {
		return this.fav;
	}

	handleEvents() {
		this.node.addEventListener("click", (event) => {
			event.preventDefault();

			window.localStorage.setItem("produits", this.id);
			window.location.href = "./produits.htlm";
		});
	}
}

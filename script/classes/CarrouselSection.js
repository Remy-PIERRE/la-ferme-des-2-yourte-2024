export default class CarrouselSection {
	node;

	constructor(data) {
		this.node = this.createNode();
		this.setElements(data);
	}

	createNode() {
		const template = document
			.querySelector("#carrouselTemplate")
			.content.cloneNode(true);
		return template.querySelector(".carrousel--template--wrapper");
	}

	setElements({ title, description, image, ctaText, ctaLink }) {
		const imageElem = this.node.querySelector(".carrousel--image img");
		imageElem.src = image;
		imageElem.alt = title;

		const titleElem = this.node.querySelector("h2");
		titleElem.innerHTML = `${title}`;

		const descriptionElem = this.node.querySelector("h3");
		descriptionElem.innerHTML = `${description}`;

		if (ctaText && ctaLink) {
			const ctaElem = this.node.querySelector(".carrousel--cta a");
			ctaElem.innerHTML = `${ctaText}`;
			ctaElem.href = ctaLink;
		}
	}

	getNode() {
		return this.node;
	}

	getWidth() {
		return this.node.getBoundingClientRect().width;
	}
}

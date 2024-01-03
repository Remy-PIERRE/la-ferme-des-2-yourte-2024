import CarrouselSection from "./CarrouselSection.js";

export default class Carrousel {
	node;
	sections = [];
	sectionIndex;
	animationDuration;

	constructor(datas) {
		this.node = document.querySelector("#carrouselSections");

		datas.forEach((data) => {
			const section = new CarrouselSection(data);
			this.sections.push(section);
		});

		this.sectionIndex = 0;
		this.animationDuration = 500;

		this.setSections();
		this.handleEvents();
	}

	setSections() {
		this.resetSections();

		this.node.appendChild(this.sections[this.getPrevSectionIndex()].getNode());
		this.node.appendChild(this.sections[this.sectionIndex].getNode());
		this.node.appendChild(this.sections[this.getNextSectionIndex()].getNode());
	}

	resetSections() {
		[...this.node.querySelectorAll(":scope > *:not(template")].forEach(
			(element) => element.remove()
		);
	}

	handleEvents() {
		document
			.querySelector("#carrouselPrev")
			.addEventListener("click", () => this.goToPrevSection());
		document
			.querySelector("#carrouselNext")
			.addEventListener("click", () => this.goToNextSection());
	}

	getPrevSectionIndex() {
		return this.sectionIndex === 0
			? this.sections.length - 1
			: this.sectionIndex - 1;
	}

	getNextSectionIndex() {
		return this.sectionIndex === this.sections.length - 1
			? 0
			: this.sectionIndex + 1;
	}

	getSectionWidth() {
		return this.sections[0].getWidth();
	}

	goToNextSection() {
		const animation = this.node.animate(
			[
				{ left: "-100%" },
				{ left: `calc(-100% - ${this.getSectionWidth()}px)` },
			],
			{
				duration: this.animationDuration,
				easing: "ease-in-out",
				fill: "forwards",
			}
		);

		this.sectionIndex = this.getNextSectionIndex();
		setTimeout(() => {
			animation.cancel();
			this.setSections();
		}, this.animationDuration);
	}

	goToPrevSection() {
		const animation = this.node.animate(
			[
				{ left: "-100%" },
				{ left: `calc(-100% + ${this.getSectionWidth()}px)` },
			],
			{
				duration: this.animationDuration,
				easing: "ease-in-out",
				fill: "forwards",
			}
		);

		this.sectionIndex = this.getPrevSectionIndex();
		setTimeout(() => {
			animation.cancel();
			this.setSections();
		}, this.animationDuration);
	}
}

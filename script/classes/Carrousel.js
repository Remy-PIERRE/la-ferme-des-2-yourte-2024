import CarrouselSection from "./CarrouselSection.js";

export default class Carrousel {
	node;
	sections = [];
	sectionIndex;
	animationDuration;
	inAnimation = false;
	timer;

	constructor(datas) {
		this.node = document.querySelector("#carrouselSections");

		datas.forEach((data) => {
			const section = new CarrouselSection(data);
			this.sections.push(section);
		});

		this.sectionIndex = 0;
		this.animationDuration = 500;

		this.setSections();
		this.handleTimer();
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
		if (this.inAnimation) return;
		this.inAnimation = true;
		this.resetTimer();

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
		animation.addEventListener("finish", () => {
			animation.cancel();
			this.setSections();
			this.inAnimation = false;
			this.handleTimer();
		});
	}

	goToPrevSection() {
		if (this.inAnimation) return;
		this.inAnimation = true;
		this.resetTimer();

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
		animation.addEventListener("finish", () => {
			animation.cancel();
			this.setSections();
			this.inAnimation = false;
			this.handleTimer();
		});
	}

	handleTimer() {
		this.timer = setTimeout(() => {
			this.goToNextSection();
		}, 7000);
	}

	resetTimer() {
		if (this.timer) {
			clearTimeout(this.timer);
			this.timer = false;
		}
	}
}

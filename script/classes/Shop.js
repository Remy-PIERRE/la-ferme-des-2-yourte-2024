import ShopArticle from "./ShopArticle.js";
// TODO - true shop - limit fav shop size

export default class Shop {
	node;
	page;
	articles = [];

	constructor(datas) {
		if (document.querySelector("#shopGridFav")) {
			this.node = document.querySelector("#shopGridFav");
			this.page = "fav";
		} else {
			this.node = document.querySelector("#shopGridSearch");
			this.page = "search";
		}

		datas.forEach((data) => {
			const article = new ShopArticle(data);
			this.articles.push(article);

			if (this.page === "fav" && article.isFav()) {
				this.setArticle(article);
			}

			if (this.page === "search") {
				console.log("search is not setted up");
			}
		});
	}

	setArticle(article) {
		this.node.appendChild(article.getNode());
	}
}

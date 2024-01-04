import ShopArticle from "./ShopArticle.js";

export default class Shop {
	node;
	page;
	articles = [];
	articleDiplayed = 0;

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
		if (this.articleDiplayed < 8) {
			this.node.appendChild(article.getNode());
			this.articleDiplayed++;
		}
	}
}

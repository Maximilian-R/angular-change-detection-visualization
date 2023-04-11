class RatingsComponent {
  constructor() {
    this._rating = 0;
  }

  set rating(value) {
    this._rating = value;
    this.updateRatings();
  }

  get rating() {
    return this._rating;
  }

  init(container) {
    this.list = document.createElement("ul");
    this.list.classList.add("rating");
    this.list.addEventListener("click", (event) => {
      console.log(event.target.dataset.value);
      this.rating = Number(event.target.dataset.value);
    });

    this.elements = [1, 2, 3, 4, 5].map((value) => {
      const li = document.createElement("li");
      li.classList.add("star");
      li.dataset.value = value;
      return li;
    });

    this.elements.forEach((li) => this.list.appendChild(li));
    container.appendChild(this.list);
  }

  updateRatings() {
    this.elements.forEach((element, index) => {
      element.classList.toggle("filled", this.rating > index);
    });
  }
}

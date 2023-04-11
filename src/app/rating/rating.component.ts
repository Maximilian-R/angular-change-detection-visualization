import { AfterViewInit, Component, NgZone } from "@angular/core";

@Component({
  selector: "cdv-rating",
  templateUrl: "./rating.component.html",
  styles: [
    `
      ul {
        list-style: none;
        padding: 0;
        display: flex;
        gap: 0.5rem;
      }
      li {
        border-radius: 50%;
        border: 1px solid var(--view-color-1);
        cursor: pointer;
        width: 2rem;
        height: 2rem;
      }
      .filled {
        background: var(--view-color-2);
      }
    `,
  ],
})
export class RatingComponent {
  private _rating: number = 0;

  public set rating(value: number) {
    this._rating = value;
  }

  public get rating(): number {
    return this._rating;
  }

  constructor(private zone: NgZone) {}

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      const list: any = document.querySelector("ul");
      list.addEventListener("click", (event: any) => {
        this.rating = Number(event.target.dataset.value);
        console.log("State value was upadted to", this.rating);
      });
    });
  }
}

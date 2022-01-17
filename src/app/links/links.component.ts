import { Component, OnInit } from "@angular/core";

@Component({
  selector: "avr-links",
  templateUrl: "./links.component.html",
  styleUrls: ["./links.component.scss"],
})
export class LinksComponent implements OnInit {
  url =
    "https://raw.githubusercontent.com/avrae/.github/master/community/community-links.md";

  constructor() {}

  ngOnInit(): void {}
}

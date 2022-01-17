import { Component, OnInit } from "@angular/core";

@Component({
  selector: "avr-links",
  templateUrl: "./links.component.html",
  styleUrls: ["./links.component.scss"],
})
export class LinksComponent implements OnInit {
  linkUrl =
    "https://github.com/avrae/.github/blob/master/community/community-links.md";
  rawUrl =
    "https://raw.githubusercontent.com/avrae/.github/master/community/community-links.md";

  constructor() {}

  ngOnInit(): void {}
}

import { Component, OnInit } from "@angular/core";

@Component({
  selector: "avr-community-links",
  templateUrl: "./community-links.component.html",
  styleUrls: ["./community-links.component.scss"],
})
export class CommunityLinksComponent implements OnInit {
  linkUrl =
    "https://github.com/avrae/.github/blob/master/community/community-links.md";
  rawUrl =
    "https://raw.githubusercontent.com/avrae/.github/master/community/community-links.md";

  constructor() {}

  ngOnInit(): void {}
}

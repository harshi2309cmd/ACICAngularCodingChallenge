import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { LineOfBusiness } from '../LineOfBusiness';
import { LineOfBusinessService } from '../lineOfBusiness.service';
import { RecentQuotes } from '../recentQuotes';
import { RecentQuotesService } from '../recentQuotes.service';

@Component({
  selector: 'app-lineOfBusiness-detail',
  templateUrl: './lineOfBusiness-detail.component.html',
  styleUrls: [ './lineOfBusiness-detail.component.css' ]
})
export class LineOfBusinessDetailComponent implements OnInit {
  lineOfBusiness: LineOfBusiness | undefined;
  recentQuotes: RecentQuotes[] = [];

  constructor(
    private route: ActivatedRoute,
    private lineOfBusinessService: LineOfBusinessService,
    private recentQuotesService: RecentQuotesService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getLineOfBusiness();
    this.getRecentQuotes();
  }

  getLineOfBusiness(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.lineOfBusinessService.getLineOfBusiness(id)
      .subscribe(lineOfBusiness => this.lineOfBusiness = lineOfBusiness);
  }

  getRecentQuotes(): void {
    this.recentQuotesService.getRecentQuotes()
    .subscribe(recentQuotes=> (this.recentQuotes = recentQuotes));
  }

  getRecentQuotesCountForCurrentLineOfBusinessId(): number {
    if (!this.lineOfBusiness) {
      return 0; // use this case when lineOfBusiness is undefined
    }
    // Filter quotes that match the current lineOfBusiness ID
    const matchingQuotes = this.recentQuotes.filter(
      (quote) => quote.lineOfBusiness === this.lineOfBusiness?.id
    );
    // Return the count of quotes for the current lineOfBusiness ID
    return matchingQuotes.length;
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.lineOfBusiness) {
      this.lineOfBusinessService.updateLineOfBusiness(this.lineOfBusiness)
        .subscribe(() => this.goBack());
    }
  }
}

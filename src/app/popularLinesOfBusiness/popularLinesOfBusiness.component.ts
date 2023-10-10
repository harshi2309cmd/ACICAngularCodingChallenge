import { Component, OnInit } from '@angular/core';
import { LineOfBusiness } from '../LineOfBusiness';
import { LineOfBusinessService } from '../lineOfBusiness.service';
import { RecentQuotesService } from '../recentQuotes.service';
import { RecentQuotes } from '../recentQuotes';

@Component({
  selector: 'app-popularLinesOfBusiness',
  templateUrl: './popularLinesOfBusiness.component.html',
  styleUrls: ['./popularLinesOfBusiness.component.css']
})
export class PopularLinesOfBusinessComponent implements OnInit {
  linesOfBusiness: LineOfBusiness[] = [];
  recentQuotes: RecentQuotes[] = [];
  mostpopularLines: LineOfBusiness[] = [];

  constructor(
    private lineOfBusinessService: LineOfBusinessService,
    private recentQuotesService: RecentQuotesService,
  ) { }

  ngOnInit() {
    this.getLinesOfBusiness();
    this.getRecentQuotes();
  }

  getLinesOfBusiness(): void {
    this.lineOfBusinessService.getLinesOfBusiness()
      .subscribe(linesOfBusiness => this.linesOfBusiness = linesOfBusiness.slice(1, 4));
  }

  getRecentQuotes(): void {
    this.recentQuotesService.getRecentQuotes()
      .subscribe(recentQuotes => {
        this.recentQuotes = recentQuotes
        this.getPopularLinesOfBusiness();
      });
  }

  getPopularLinesOfBusiness() {
    // get most popular line of business
    let id = this.findMode(this.recentQuotes);
    // get Line of Business from service
    this.lineOfBusinessService.getLineOfBusiness(id)
      .subscribe(lineofBusiness => {
        // push line of business to popularity array
        this.mostpopularLines.push(lineofBusiness);
      })
    // remove all quotes with ID {id} from array
    this.recentQuotes.forEach((quote, index) => {
      if (quote.lineOfBusiness == id) {
        this.recentQuotes.splice(index, 1);
      }
    })
    // get second most popular line of business
    id = this.findMode(this.recentQuotes);
    // get Line of Business from service
    this.lineOfBusinessService.getLineOfBusiness(id)
      .subscribe(lineofBusiness => {
        // push line of business to popularity array
        this.mostpopularLines.push(lineofBusiness);
      })
  }

  //function to find the most frequently occurring value
  private findMode(arr: RecentQuotes[]): number {
    let frequency: any[] = [];
    let maxFreq = 0;
    let mode: number = 0;
    for (let i = 0; i < arr.length; i++) {
      frequency[arr[i].lineOfBusiness] = (frequency[arr[i].lineOfBusiness] || 0) + 1;
      if (frequency[arr[i].lineOfBusiness] > maxFreq) {
        maxFreq = frequency[arr[i].lineOfBusiness]
      }
    }
    for (var i in frequency) {
      if (frequency[i] == maxFreq) {
        mode = +i
      }
    }
    return mode;
  }
}
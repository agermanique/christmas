import { Component, OnInit } from '@angular/core';
import { GiftsService } from './gifts.service';
import { Observable } from 'rxjs/Observable';
import { Gifted } from './gift.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Christmas';
  isFirstRandom = true;
  giftedList: Observable<Gifted[]>;
  constructor(
    private giftsService: GiftsService
  ) { }
  ngOnInit(): void {
    this.giftedList = this.giftsService.giftedList$;
  }
  startRandom() {
    if (this.isFirstRandom) {
      this.isFirstRandom = !this.isFirstRandom;
      this.giftedList = this.giftsService.randomize();
      // this.giftsService.randomize();
    }
  }
}

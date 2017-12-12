import { Injectable } from '@angular/core';
import * as shuffle from 'shuffle-array';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {
  filter, map, flatMap, scan, mergeMap, concat,
  share, merge, reduce, toArray, combineLatest
} from 'rxjs/operators';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import { giftedList, charArray } from './gift.const';
import { Gifted } from './gift.models';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GiftsService {
  // public giftedList$ = new BehaviorSubject(giftedList);
  public giftedList$: Observable<Gifted[]> = Observable.of([]);
  giftsNgBe$ = Observable.from<Gifted[]>([giftedList]);
  giftsOther$ = Observable.from<Gifted[]>([giftedList]);
  temp1$;
  temp2$;
  constructor() {

    this.temp1$ = this.giftsOther$.pipe(
      flatMap(data => data),
      filter(gifted => !gifted.isNgBe),
      scan((_, val, acc) => this.setId(acc, val)),
      reduce(this.concat),
      share()
    )
    this.temp2$ = this.giftsNgBe$.pipe(
      flatMap(data => data),
      filter(gifted => gifted.isNgBe),
      scan((_, val, acc) => this.setCharId(acc, val)),
      reduce(this.concat),
      share()
    )
  }

  randomize() {
    return this.giftedList$.pipe(
      combineLatest(this.temp2$),
      map(([rslt1, rslt2]) => [...rslt1, ...rslt2]),
      combineLatest(this.temp1$),
      map(([rslt1, rslt2]) => [...rslt1, ...rslt2])
    )



  }
  setCharId(id: number, gifted: Gifted) {
    console.log(id)
    return this.setId(charArray[id], gifted)
  }
  setId(id: any, gift: Gifted) {
    gift.id = id.toString();
    return gift;
  }
  private concat(current, next) {
    let temp = current as any;
    temp = temp.length ? shuffle(temp.concat([next])) : [temp, next];
    // console.log(temp);
    return temp;
  }
}

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
import { first } from 'rxjs/operators/first';

@Injectable()
export class GiftsService {
  // public giftedList$ = new BehaviorSubject(giftedList);
  public giftedList$: Observable<Gifted[]> = Observable.of([]);
  private giftedListOriginal$: Observable<Gifted[]> = Observable.from<Gifted[]>([giftedList]);
  private giftsNgBe$: Observable<Gifted[]>;
  private giftsOther$: Observable<Gifted[]>;
  constructor() {

    this.giftsOther$ = this.giftedListOriginal$.pipe(
      map(val => shuffle(val) as Gifted[]),
      flatMap(data => data),
      filter(gifted => !gifted.isNgBe),
      scan((_, val, acc) => this.setId(acc, val)),
      reduce(this.concat),
      map(val => this.setFirstId(val)),
      share()
    )
    this.giftsNgBe$ = this.giftedListOriginal$.pipe(
      map(val => shuffle(val) as Gifted[]),
      flatMap(data => data),
      filter(gifted => gifted.isNgBe),
      scan((_, val, acc) => this.setCharId(acc, val, _)),
      reduce(this.concat),
      map(val => this.setFirstCharId(val)),
      share()
    )
  }

  randomize() {
    return this.giftedList$.pipe(
      combineLatest(this.giftsOther$),
      map(([rslt1, rslt2]) => [...rslt1, ...rslt2]),
      combineLatest(this.giftsNgBe$),
      map(([rslt1, rslt2]) => [...rslt1, ...rslt2]),
      map(val => shuffle(val))
    )



  }
  private setCharId(id: number, gifted: Gifted, test) {
    console.log(test + gifted)
    return this.setId(charArray[id], gifted)
  }
  private setId(id: any, gifted: Gifted) {
    gifted.id = id.toString();
    return gifted;
  }
  private setFirstCharId(gifteds: Gifted[]) {
    gifteds[0].id = 'E';
    return gifteds
  }
  private setFirstId(gifteds: Gifted[]) {
    gifteds[0].id = (24).toString();
    return gifteds
  }
  private concat(current, next) {
    let temp = current as any;
    temp = temp.length ? temp.concat([next]) : [temp, next];
    return temp;
  }
}

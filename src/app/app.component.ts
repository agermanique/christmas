import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { GiftsService } from './gifts.service';
import { Observable } from 'rxjs/Observable';
import { Gifted } from './gift.models';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Christmas';
  isFirstRandom = true;
  formGroup: FormGroup;
  giftedList$: Observable<Gifted[]>;
  constructor(
    private giftsService: GiftsService,
    private formBuilder: FormBuilder
  ) { }
  ngOnInit(): void {
    this.giftedList$ = this.giftsService.giftedList$;
    this.formGroup = this.formBuilder.group({
      gotGift: this.formBuilder.array([])
    });

  }
  startRandom() {
    if (this.isFirstRandom) {
      this.isFirstRandom = !this.isFirstRandom;
      this.giftedList$ = this.giftsService.randomize();
      this.giftedList$.pipe(
        map(val => {
          this.addGotGift(val);
        })
      ).subscribe();
    }
  }
  addGotGift(val: Gifted[]) {
    const control = <FormArray>this.formGroup.get('gotGift');
    val.forEach(() => {
      const formControl = new FormControl();
      formControl.setValue(false);
      formControl.setValidators(Validators.requiredTrue)
      control.push(formControl);
    });
    return val;
  }
}

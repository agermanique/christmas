import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { GiftsService } from './gifts.service';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [GiftsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { GiftsService } from './gifts.service';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [GiftsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

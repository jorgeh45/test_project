import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppHttpService } from './services/app-http.service';
import { ContactsService } from './services/contacts.service';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [AppHttpService,ContactsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

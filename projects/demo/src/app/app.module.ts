import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSimpleQrbtfModule } from '../../../ngx-simple-qrbtf/src/public-api';
// import { NgxSimpleQrbtfModule } from '@carpenter/ngx-simple-qrbtf';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    NgxSimpleQrbtfModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { HTMLPipe } from './pipe/html.pipe';
import { BaseQrComponent } from './components/base.qr.component';
import { CircleQrComponent } from './components/circle.qr.component';
import { DsjQrComponent } from './components/dsj.qr.component';
import { FuncQrComponent } from './components/func.qr.component';
import { ImageFillQrComponent } from './components/image-fill.qr.component';
import { ImageQrComponent } from './components/image.qr.component';
import { LineQrComponent } from './components/line.qr.component';
import { RandRectQrComponent } from './components/rand-rect.qr.component';
import { SolidQrComponent } from './components/solid.qr.component';


@NgModule({
  declarations: [
    HTMLPipe,
    BaseQrComponent,
    CircleQrComponent,
    DsjQrComponent,
    FuncQrComponent,
    ImageFillQrComponent,
    ImageQrComponent,
    LineQrComponent,
    RandRectQrComponent,
    SolidQrComponent,
  ],
  imports: [
  ],
  exports: [
    BaseQrComponent,
    CircleQrComponent,
    DsjQrComponent,
    FuncQrComponent,
    ImageFillQrComponent,
    ImageQrComponent,
    LineQrComponent,
    RandRectQrComponent,
    SolidQrComponent,
  ]
})
export class NgxSimpleQrbtfModule { }

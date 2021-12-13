import { Component, ViewChild } from '@angular/core';
import { toBase64 } from '../../../ngx-simple-qrbtf/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'demo';

  @ViewChild('qrcodeBase') private readonly qrcodeBase: any;
  @ViewChild('qrcodeCircle') private readonly qrcodeCircle: any;

  content = '';
  size = 100;
  margin = 10;
  level = 'L'
  opacity = 100;
  type = 'rect';
  posType = 'rect';
  otherColor = '#000000';
  posColor = '#000000';

  iconEnabledType = '0';
  get iconEnabled() {
    return parseInt(this.iconEnabledType);
  }
  iconScale = 33;
  iconSrc = '';

  ngOnChanges() {
    console.log(this.content)
  }

  onChangeIconSrc = (event: any) => {
    console.log(event)
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      toBase64(file, 1.0).then(res => {
        this.iconSrc = res;
      })
    }
  }

  download = (type: string, dowType: string) => {
    if (type === 'base') {
      this.qrcodeBase.download(dowType, dowType);
    } else if (type === 'circle') {
      this.qrcodeCircle.download(dowType, dowType);
    }
  }
}

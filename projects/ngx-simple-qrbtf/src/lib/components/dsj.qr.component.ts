import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { DsjQR } from './dsj.qr';
import { saveSvg, saveImg } from '../utils';

enum Type {
  Rect = 'rect',
  Dsj = 'dsj',
}

@Component({
  selector: 'ngx-simple-qrbtf-dsj',
  template: `
    <span class="qrcode-box" [innerHtml]="qrcode | html"></span>
  `,
  styles: [`.qrcode-box { display: block; width: 100%; height: 100% } .qrcode-box svg { display: block }`],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false
})
export class DsjQrComponent implements OnInit, OnChanges {

  @Input() content: string = 'http://localhost'; // 二维码内容
  @Input() size: number = 100; // 二维码信息点缩放比例
  @Input() level: 'L' | 'M' | 'Q' | 'H' = 'H'; // 二维码容错率
  @Input('icon-enabled') iconEnabled: number = 0; // 是否启用 icon 图标
  @Input('icon-scale') iconScale: number = 33; // icon 大小
  @Input('icon-src') iconSrc: string = ''; // 自定义 icon 图标 iconEnabled = 1 时生效

  @Input() scale: number = 100; // 信息点缩放
  @Input('cross-width') crossWidth: number = 100; //  x宽度
  @Input('pos-width') posWidth: number = 100; // 定位点宽度
  @Input('pos-type') posType: Type | string = 'rect'; // 定位点样式
  

  qrcode!: string;

  ngOnInit(): void {
    if (this.content) {
      this.getQrCode();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getQrCode();
  }

  getQrCode = () => {
    this.qrcode = DsjQR({
      content: this.content,
      size: this.size,
      level: this.level,
      icon: {
        enabled: this.iconEnabled,
        scale: this.iconScale,
        src: this.iconSrc,
      },
      scale: this.scale,
      crossWidth: this.crossWidth,
      posWidth: this.posWidth,
      posType: this.posType,
    });
  }

  public download(type: string, name: string = '') {
    if (type === 'svg') {
      saveSvg(this.qrcode, name);
      return;
    }
    saveImg(this.qrcode, 1000, 1000, type, name);
  }

}

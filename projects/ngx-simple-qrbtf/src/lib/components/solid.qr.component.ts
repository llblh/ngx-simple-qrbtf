import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { SolidQr } from './solid.qr';
import { saveSvg, saveImg, defaultImage } from '../utils';

@Component({
  selector: 'ngx-simple-qrbtf-solid',
  template: `
    <span class="qrcode-box" [innerHtml]="qrcode | html"></span>
  `,
  styles: [`.qrcode-box { display: block; width: 100%; height: 100% } .qrcode-box svg { display: block }`],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false
})
export class SolidQrComponent implements OnInit, OnChanges {

  @Input() content: string = 'http://localhost'; // 二维码内容
  @Input() size: number = 100; // 二维码信息点缩放比例
  @Input() level: 'L' | 'M' | 'Q' | 'H' = 'H'; // 二维码容错率
  @Input() opacity: number = 100; // 二维码信息点不透明度
  @Input('icon-enabled') iconEnabled: number = 0; // 是否启用 icon 图标
  @Input('icon-scale') iconScale: number = 33; // icon 大小
  @Input('icon-src') iconSrc: string = ''; // 自定义 icon 图标 iconEnabled = 1 时生效
  @Input('up-color') upColor: string = '#333';
  @Input('left-color') leftColor: string = '#666';
  @Input('right-color') rightColor: string = '#999';
  @Input() height: number = 0.5;
  @Input('lp-height') lpHeight: number = 1;

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
    this.qrcode = SolidQr({
      content: this.content,
      size: this.size,
      level: this.level,
      opacity: this.opacity,
      icon: {
        enabled: this.iconEnabled,
        scale: this.iconScale,
        src: this.iconSrc,
      },
      upColor: this.upColor,
      leftColor: this.leftColor,
      rightColor: this.rightColor,
      height: this.height,
      lpHeight: this.lpHeight,
    });
  }

  public download(name: string, type: string) {
    if (type === 'svg') {
      saveSvg(name, this.qrcode);
      return;
    }
    saveImg(name, this.qrcode, 1000, 1000, type);
  }

}

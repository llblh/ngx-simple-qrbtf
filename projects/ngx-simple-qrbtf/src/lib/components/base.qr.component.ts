import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { BaseQr, Type, PosType } from './base.qr';
import { saveSvg, saveImg } from '../utils';

@Component({
  selector: 'ngx-simple-qrbtf-base',
  template: `
    <span class="qrcode-box" [innerHtml]="qrcode | html"></span>
  `,
  styles: [`.qrcode-box { display: block; width: 100%; height: 100% } .qrcode-box svg { display: block }`],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false
})
export class BaseQrComponent implements OnInit, OnChanges {

  @Input() content: string = 'http://localhost'; // 二维码内容
  @Input() size: number = 100; // 二维码信息点缩放比例
  @Input() level: 'L' | 'M' | 'Q' | 'H' = 'H'; // 二维码容错率
  @Input() opacity: number = 100; // 二维码信息点不透明度
  @Input('icon-enabled') iconEnabled: number = 0; // 是否启用 icon 图标
  @Input('icon-scale') iconScale: number = 33; // icon 大小
  @Input('icon-src') iconSrc: string = ''; // 自定义 icon 图标 iconEnabled = 1 时生效
  @Input() type: Type | string = 'rect'; // 二维码定位点样式
  @Input('pos-type') posType: PosType | string = 'rect'; // 二维码信息点样式
  @Input('other-color') otherColor: string = '#000000'; // 二维码定位点颜色
  @Input('pos-color') posColor: string = '#000000'; // 二维码信息点颜色

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
    this.qrcode = BaseQr({
      content: this.content,
      size: this.size,
      level: this.level,
      opacity: this.opacity,
      icon: {
        enabled: this.iconEnabled,
        scale: this.iconScale,
        src: this.iconSrc,
      },
      type: this.type,
      posType: this.posType,
      otherColor: this.otherColor,
      posColor: this.posColor,
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

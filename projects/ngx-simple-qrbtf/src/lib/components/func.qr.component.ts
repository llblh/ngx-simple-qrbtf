import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FuncQr } from './func.qr';
import { saveSvg, saveImg } from '../utils';

enum FuncType {
  FuncA = 'A',
  FuncB = 'B',
}

enum Type {
  Rect = 'rect',
  Round = 'round',
}

enum PosType {
  Rect = 'rect',
  Round = 'round',
  Planet = 'planet',
  RoundRect = 'roundRect',
}

@Component({
  selector: 'ngx-simple-qrbtf-func',
  template: `
    <span class="qrcode-box" [innerHtml]="qrcode | html"></span>
  `,
  styles: [`.qrcode-box { display: block; width: 100%; height: 100% } .qrcode-box svg { display: block }`],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false
})
export class FuncQrComponent implements OnInit, OnChanges {

  @Input() content: string = 'http://localhost'; // 二维码内容
  // @Input() size: number = 100; // 二维码信息点缩放比例
  @Input() level: 'L' | 'M' | 'Q' | 'H' = 'H'; // 二维码容错率
  @Input() opacity: number = 100; // 二维码信息点不透明度
  @Input('icon-enabled') iconEnabled: number = 0; // 是否启用 icon 图标
  @Input('icon-scale') iconScale: number = 33; // icon 大小
  @Input('icon-src') iconSrc: string = ''; // 自定义 icon 图标 iconEnabled = 1 时生效

  @Input('func-type') funcType: FuncType | string = FuncType.FuncA; // 干扰函数
  @Input() type: Type | string = Type.Rect; // 
  @Input('pos-type') posType: PosType | string = PosType.Rect; // 定位码样式
  @Input('other-color1') otherColor1: string = '#000'; // 信息点1颜色
  @Input('other-color2') otherColor2: string = '#999'; // 信息点2颜色
  @Input('pos-color') posColor: string = '#777'; // 定位码颜色

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
    this.qrcode = FuncQr({
      content: this.content,
      // size: this.size,
      level: this.level,
      opacity: this.opacity,
      icon: {
        enabled: this.iconEnabled,
        scale: this.iconScale,
        src: this.iconSrc,
      },
      funcType: this.funcType,
      type: this.type,
      posType: this.posType,
      otherColor1: this.otherColor1,
      otherColor2: this.otherColor2,
      posColor: this.posColor,
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

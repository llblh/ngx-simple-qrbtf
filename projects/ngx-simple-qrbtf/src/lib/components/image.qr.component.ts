import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ImageQr } from './image.qr';
import { saveSvg, saveImg } from '../utils';

enum Type {
  Rect = 'rect',
  Round = 'round',
}

enum PosType {
  Rect = 'rect',
  Round = 'round',
  Planet = 'planet',
}

@Component({
  selector: 'ngx-simple-qrbtf-image',
  template: `
    <span class="qrcode-box" [innerHtml]="qrcode | html"></span>
  `,
  styles: [`.qrcode-box { display: block; width: 100%; height: 100% } .qrcode-box svg { display: block }`],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false
})
export class ImageQrComponent implements OnInit, OnChanges {

  @Input() content: string = 'http://localhost'; // 二维码内容
  @Input() size: number = 100; // 二维码信息点缩放比例
  @Input() level: 'L' | 'M' | 'Q' | 'H' = 'H'; // 二维码容错率
  @Input() opacity: number = 100; // 二维码信息点不透明度
  @Input('icon-enabled') iconEnabled: number = 0; // 是否启用 icon 图标
  @Input('icon-scale') iconScale: number = 33; // icon 大小
  @Input('icon-src') iconSrc: string = ''; // 自定义 icon 图标 iconEnabled = 1 时生效
  @Input() type: Type | string = Type.Rect; // 
  @Input('pos-type') posType: PosType | string = PosType.Rect; // 定位码样式
  @Input('image') image: string = '';
  @Input('dark-color') darkColor: string = '#000000';
  @Input('light-color') lightColor: string = '#FFFFFF';
  @Input('pos-color') posColor: string = '#000000';

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
    this.qrcode = ImageQr({
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
      image: this.image,
      darkColor: this.darkColor,
      lightColor: this.lightColor,
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

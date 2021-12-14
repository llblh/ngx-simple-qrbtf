import { Component, ViewChild } from '@angular/core';
import { toBase64 } from '../../../ngx-simple-qrbtf/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'demo';

  constructor(
    ) {}
  
    @ViewChild('uploadFileInput') private readonly uploadFileInput: any;
    @ViewChild('qrcodeBase') private readonly qrcodeBase: any;
    @ViewChild('qrcodeFunc') private readonly qrcodeFunc: any;
    @ViewChild('qrcodeLine') private readonly qrcodeLine: any;
    @ViewChild('qrcodeCircle') private readonly qrcodeCircle: any;
    @ViewChild('qrcodeDsj') private readonly qrcodeDsj: any;
    @ViewChild('qrcodeImageRandRest') private readonly qrcodeImageRandRest: any;
    @ViewChild('qrcodeImage') private readonly qrcodeImage: any;
    @ViewChild('qrcodeImageFill') private readonly qrcodeImageFill: any;
    @ViewChild('qrcodeSolid') private readonly qrcodeSolid: any;
  
    selectedIndex = 0;
    currentType = 'base';
  
    content = 'http://githun.com';
  
    list = [
      {
        cover: 'http://stor.llblh.com/qrbtf/1.png',
        name: 'base',
      },
      {
        cover: 'http://stor.llblh.com/qrbtf/2.png',
        name: 'func'
      },
      {
        cover: 'http://stor.llblh.com/qrbtf/3.png',
        name: 'line',
      },
      {
        cover: 'http://stor.llblh.com/qrbtf/4.png',
        name: 'circle'
      },
      {
        cover: 'http://stor.llblh.com/qrbtf/5.png',
        name: 'dsj',
      },
      {
        cover: 'http://stor.llblh.com/qrbtf/6.png',
        name: 'rand-rect',
      },
      {
        cover: 'http://stor.llblh.com/qrbtf/7.png',
        name: 'image',
      },
      {
        cover: 'http://stor.llblh.com/qrbtf/8.png',
        name: 'image-fill',
      },
      {
        cover: 'http://stor.llblh.com/qrbtf/9.png',
        name: 'solid',
      },
    ];
  
    // 参数
    iconEnabled = 0; // 图标类型
    iconScale = 23; // 图标规模
    iconSrc = ''; // 图表
  
    baseType = 'rect';
    basePosType = 'rect';
    basePosColor = '#000000';
    baseOtherColor = '#000000';
    baseSize = 100;
    baseOpacity = 100;
  
    funcPosType = 'round';
    funcPosColor = '#000000';
    funcType = 'round';
    funcFuncType = 'B';
    funcOtherColor1 = '#999999';
    funcOtherColor2 = '#000000';
    funcOpacity = 100;
  
    linePosType = 'roundRect';
    linePosColor = '#000000';
    lineDirection = 'h-v';
    lineLineWidth = 50;
    lineLineOpacity = 100;
    lineLineColor = '#000000';
  
    circleOtherColor = '#0693e3';
    circlePosColor = '#0693e3';
  
    dsjPosType: 'dsj' | 'rect' = 'dsj'
    dsjPosWidth = 90;
    dsjScale = 70;
    dsjCrossWidth = 70;
  
    imagePosType = 'rect';
    imagePosColor = '#000000';
    imageType = 'rect';
    imageOpacity = 100;
    imageSize = 100;
    imageDarkColor = '#000000';
    imageLightColor = '#ffffff';
    imageSrc = '';
    imageFillColor = '#000000';
    imageFillOpacity = 10;
  
    solidUpColor = '#FF7F89';
    solidLeftColor = '#FFD7D9';
    solidRightColor = '#FFEBF3';
    solidHeight = 0.5;
    solidLpHeight = 0.5;
  
    ngOnInit(): void {
    }
  
    chooseType = (type: string) => {
      this.currentType = type;
      // this.selectedIndex = 1;
    }
  
    // 点击上传按钮
    uploadFile = () => {
      this.uploadFileInput.nativeElement.click();
    };
  
    // 下载
    downloadData = (type: string) => {
      const name = `Qrcode_${type}`;
      if (this.currentType === 'base') {
        this.qrcodeBase.download(type, name);
      } else if (this.currentType === 'func') {
        this.qrcodeFunc.download(type, name);
      } else if (this.currentType === 'line') {
        this.qrcodeLine.download(type, name);
      } else if (this.currentType === 'circle') {
        this.qrcodeCircle.download(type, name);
      } else if (this.currentType === 'dsj') {
        this.qrcodeDsj.download(type, name);
      } else if (this.currentType === 'rand-rect') {
        this.qrcodeImageRandRest.download(type, name);
      } else if (this.currentType === 'image') {
        this.qrcodeImage.download(type, name);
      } else if (this.currentType === 'image-fill') {
        this.qrcodeImageFill.download(type, name);
      } else if (this.currentType === 'solid') {
        this.qrcodeSolid.download(type, name);
      }
    }
  
    onChangeSrc = (event: any, type: string = 'iconSrc') => {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        toBase64(file, 1.0).then(res => {
          if (type === 'iconSrc') {
            this.iconSrc = res;
          } else {
            this.imageSrc = res;
          }
        })
      }
    }
}

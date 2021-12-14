# ngx-simple-qrbtf
艺术二维码生成器；此项目使用[Angular](https://github.com/angular/angular)
大部分代码来自 [StringKe/simple-qrbtf](https://github.com/StringKe/simple-qrbtf)及[ciaochaos/qrbtf](https://github.com/ciaochaos/qrbtf)。
本项目目前处于开发阶段，文档尚未完善，生产环境谨慎使用

## 预览
[gtihub](https://github.com/)

## 安装
Angular ^13.0.0
```
npm i @carpenter/ngx-simple-qrbtf
```

## 使用
```js
import { NgxSimpleQrbtfModule } from '@carpenter/ngx-simple-qrbtf';

@NgModule({
  imports: [
    NgxSimpleQrbtfModule
  ],
});

<ngx-simple-qrbtf-base
  #qrcodeBase
  class="qrcode"
  content="https://github.com"
></ngx-simple-qrbtf-base>
<ngx-simple-qrbtf-func
  #qrcodeFunc
  class="qrcode"
  content="https://github.com"
></ngx-simple-qrbtf-func>
<ngx-simple-qrbtf-line
  #qrcodeLine
  class="qrcode"
  content="https://github.com"
></ngx-simple-qrbtf-line>
<ngx-simple-qrbtf-circle
  #qrcodeCircle
  class="qrcode"
  content="https://github.com"
></ngx-simple-qrbtf-circle>
<ngx-simple-qrbtf-dsj
  #qrcodeDsj
  class="qrcode"
  content="https://github.com"
></ngx-simple-qrbtf-dsj>
<ngx-simple-qrbtf-rand-rect
  #qrcodeImageRandRest
  class="qrcode"
  content="https://github.com"
></ngx-simple-qrbtf-rand-rect>
<ngx-simple-qrbtf-image
  #qrcodeImage
  class="qrcode"
  content="https://github.com"
></ngx-simple-qrbtf-image>
<ngx-simple-qrbtf-image-fill
  #qrcodeImageFill
  class="qrcode"
  content="https://github.com"
></ngx-simple-qrbtf-image-fill>
<ngx-simple-qrbtf-solid
  #qrcodeSolid
  class="qrcode"
  content="https://github.com"
></ngx-simple-qrbtf-solid>
```

## 文档
公共
| 参数 | 说明 | 类型 | 默认值 | 是否必填 |
| --- | --- | --- | --- | --- |
| `[content]` | 内容 | `string` | `http://localhost` | ✅ |
| `[level]` | 容错率 | `string\|LevelType` | H |
| `[icon-enabled]` | 是否启用 icon 图标 | `number\|IconType` | 0 |
| `[icon-scale]` | icon 大小 `icon-enabled`为 0 时有效 | `number` | 33 |
| `[icon-src]` | 自定义 icon 图标 `icon-enabled`为 1 时有效  | `string` | - |

ngx-simple-qrbtf-base
| 参数 | 说明 | 类型 | 默认值 | 是否必填 |
| --- | --- | --- | --- | --- |
| `[level]` | 容错率 | `string\|LevelType` | H |
| `[size]` | 信息点缩放比例 | `number` | 100 |
| `[opacity]` | 信息点不透明度 | `number` | 100 |
| `[type]` | 信息点样式 | `'rect' \| 'round' \| 'rand'` | `rect` |
| `[pos-type]` | 定位点样式 | `'rect' \| 'round' \| 'planet' \| 'roundRect'` | `rect` |
| `[other-color]` | 信息点颜色 | `string` | `#000000` |
| `[pos-color]` | 定位点颜色 | `string` | `#000000` |

ngx-simple-qrbtf-circle
| 参数 | 说明 | 类型 | 默认值 | 是否必填 |
| --- | --- | --- | --- | --- |
| `[level]` | 容错率 | `string\|LevelType` | H |
| `[size]` | 信息点缩放比例 | `number` | 100 |
| `[opacity]` | 信息点不透明度 | `number` | 100 |
| `[other-color]` | 信息点颜色 | `string` | `#000000` |
| `[pos-color]` | 定位点颜色 | `string` | `#000000` |





LevelType
| 值 | 说明 |
| --- | --- |
| `L` |  |
| `M` |  |
| `Q` |  |
| `H` |  |
IconType
| 参数 | 说明 |
| --- | --- |
| `0` | 无 |
| `1` | 自定义 |
| `2` | 微信-小 |
| `3` | 微信 |
| `4` | 微信支付 |
| `5` | 支付宝 |
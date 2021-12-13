// 25D

import {
  createRenderer,
  getDefaultIcon,
  Renderer,
  RendererOptions,
  sq25
} from '../renderer';
import { getExactValue, getIdNum, getTypeTable, QRPointType } from '../utils';

const X = [Math.sqrt(3) / 2, 1 / 2];
const Y = [-Math.sqrt(3) / 2, 1 / 2];
const Z = [0, 0];

const matrixString =
  'matrix(' +
  String(X[0]) +
  ', ' +
  String(X[1]) +
  ', ' +
  String(Y[0]) +
  ', ' +
  String(Y[1]) +
  ', ' +
  String(Z[0]) +
  ', ' +
  String(Z[1]) +
  ')';

export interface SolidQrOptions {
  upColor?: string;
  leftColor?: string;
  rightColor?: string;
  height?: number;
  lpHeight?: number;
}

const SolidQrRenderer: Renderer<SolidQrOptions> = {
  defaultProps: {
    upColor: '#333',
    leftColor: '#666',
    rightColor: '#999',
    height: 0.5,
    lpHeight: 1,
  },
  listPoints: (props) => {
    const { qrcode } = props;
    if (!qrcode) return [];

    const { upColor, leftColor, rightColor } = props;
    const nCount = qrcode.getModuleCount();
    const typeTable = getTypeTable(qrcode);
    const pointList = [];

    const size = 1.001;
    const size2 = 1.001;
    let height = props.height;
    let height2 = props.lpHeight;

    if (height && height <= 0) height = 1.0;
    if (height2 && height2 <= 0) height2 = 1.0;

    for (let x = 0; x < nCount; x++) {
      for (let y = 0; y < nCount; y++) {
        if (qrcode.isDark(x, y) === false) {
          // do nothing;
        } else if (
          typeTable[x][y] === QRPointType.POS_OTHER ||
          typeTable[x][y] === QRPointType.POS_CENTER
        ) {
          pointList.push(
            `<rect width='${size2}' height='${size2}' fill='${upColor}' x='${x + (1 - size2) / 2}' y='${y + (1 - size2) / 2}' transform='${matrixString}'/>`
          );
          pointList.push(
            `<rect width='${height2}' height='${size2}' fill='${leftColor}' x='${0}' y='${0}' transform='${matrixString +
            'translate(' +
            String(x + (1 - size2) / 2 + size2) + ',' + String(y + (1 - size2) / 2) +
            ') ' +
            'skewY(45) '}'/>`
          );
          pointList.push(
            `<rect width='${size2}' height='${height2}' fill='${rightColor}' x='${0}' y='${0}' transform='${matrixString +
            'translate(' +
            String(x + (1 - size2) / 2) +
            ',' +
            String(y + size2 + (1 - size2) / 2) +
            ') ' +
            'skewX(45) '
            }'/>`
          );
        } else {
          pointList.push(
            `<rect width='${size}' height='${size}' fill='${upColor}' x='${x + (1 - size) / 2
            }' y='${y + (1 - size) / 2}' transform='${matrixString}'/>`
          );
          pointList.push(
            `<rect width='${height}' height='${size}' fill='${leftColor}' x='${0}' y='${0}' transform='${matrixString +
            'translate(' +
            String(x + (1 - size) / 2 + size) +
            ',' +
            String(y + (1 - size) / 2) +
            ') ' +
            'skewY(45) '
            }'/>`
          );
          pointList.push(
            `<rect width='${size}' height='${height}' fill='${rightColor}' x='${0}' y='${0}' transform='${matrixString +
            'translate(' +
            String(x + (1 - size) / 2) +
            ',' +
            String(y + size + (1 - size) / 2) +
            ') ' +
            'skewX(45) '
            }'/>`
          );
        }
      }
    }

    return pointList;
  },
  getViewBox: ({ qrcode }) => {
    if (!qrcode) return '0 0 0 0';

    const nCount = qrcode.getModuleCount();
    return (
      String(-nCount) +
      ' ' +
      String(-nCount / 2) +
      ' ' +
      String(nCount * 2) +
      ' ' +
      String(nCount * 2)
    );
  },
  drawIcon: (props) => {
    const iconMode = getExactValue(props.icon.enabled, 0);
    if (iconMode === 1) {
      return defaultDrawIcon(props);
    } else {
      return builtinDrawIcon(props);
    }
  },
};

function builtinDrawIcon(props: RendererOptions<SolidQrOptions>) {
  const { qrcode, icon } = props;
  if (!qrcode) return [];

  let id = 0;
  const nCount = qrcode.getModuleCount();
  const pointList = [];

  // draw icon
  if (icon) {
    const iconMode = getExactValue(icon.enabled, 0);
    const { scale } = icon;

    const iconSize = Number((nCount * (scale > 33 ? 33 : scale)) / 100);
    const iconXY = (nCount - iconSize) / 2;

    if (icon && iconMode) {
      const randomIdDefs = getIdNum();
      const randomIdClips = getIdNum();
      const builtinIcon = getDefaultIcon(iconMode);
      pointList.push(`
        <g transform='${matrixString}'>
          <path d='${sq25}' stroke='#FFF' stroke-width='${100 / iconSize
        }' fill='#FFF' transform='${'translate(' +
        String(iconXY) +
        ',' +
        String(iconXY) +
        ') ' +
        'scale(' +
        String(iconSize / 100) +
        ',' +
        String(iconSize / 100) +
        ')'
        }'
          />
        </g>
      `);
      pointList.push(`
        <g key='${id++}' transform='${matrixString}'>
          <defs>
            <path id='${'defs-path' + randomIdDefs
        }' d='${sq25}' fill='#FFF' transform='${'translate(' +
        String(iconXY) +
        ',' +
        String(iconXY) +
        ') ' +
        'scale(' +
        String(iconSize / 100) +
        ',' +
        String(iconSize / 100) +
        ')'
        }'
            />
          </defs>
          <clipPath id='${'clip-path' + randomIdClips}'>
            <use xlink:href='${'#defs-path' + randomIdDefs}'  overflow='visible'/>
          </clipPath>
          <g clip-path='${'url(#clip-path' + randomIdClips + ')'}'>
            <g transform='${'translate(' +
        String(iconXY) +
        ',' +
        String(iconXY) +
        ') ' +
        'scale(' +
        String(iconSize / 100) +
        ',' +
        String(iconSize / 100) +
        ')'
        }'
            >
              ${builtinIcon}
            </g>
          </g>
        </g>
      `);
    }
  }

  return pointList;
}

function defaultDrawIcon(props: RendererOptions<SolidQrOptions>) {
  const { qrcode, icon } = props;
  if (!qrcode) return [];

  let id = 0;
  const nCount = qrcode.getModuleCount();
  const pointList = [];

  // draw icon
  if (icon) {
    const iconEnabled = getExactValue(icon.enabled, 0);
    const { src, scale } = icon;

    const iconSize = Number((nCount * (scale > 33 ? 33 : scale)) / 100);
    const iconXY = (nCount - iconSize) / 2;

    if (icon && iconEnabled) {
      const randomIdDefs = getIdNum();
      const randomIdClips = getIdNum();

      pointList.push(
        `<g transform='${matrixString}'>
        <path d='${sq25}' stroke='#FFF' stroke-width='${100 / iconSize
        }' fill='#FFF' transform='${'translate(' +
        String(iconXY) +
        ',' +
        String(iconXY) +
        ') ' +
        'scale(' +
        String(iconSize / 100) +
        ',' +
        String(iconSize / 100) +
        ')'
        }' />
      </g>`
      );
      pointList.push(`
<g key='${id++}' transform='${matrixString}'>
      <defs>
        <path id='${'defs-path' + randomIdDefs
        }' d='${sq25}' fill='#FFF' transform='${'translate(' +
        String(iconXY) +
        ',' +
        String(iconXY) +
        ') ' +
        'scale(' +
        String(iconSize / 100) +
        ',' +
        String(iconSize / 100) +
        ')'
        }' />                    </defs>
      <clipPath id='${'clip-path' + randomIdClips}'>
      <use xlink:href='${'#defs-path' + randomIdDefs}'  overflow='visible'/>
        </clipPath>
        <g clip-path='${'url(#clip-path' + randomIdClips + ')'}'>
      <image overflow='visible' key='${id++}' xlink:href='${src}' width='${iconSize}' x='${iconXY}' y='${iconXY}' />
      </g>
      </g>`);
    }
  }

  return pointList;
}

export const SolidQr = createRenderer(SolidQrRenderer);
export default SolidQr;

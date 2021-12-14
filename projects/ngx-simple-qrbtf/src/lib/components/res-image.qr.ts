import { createRenderer, Renderer, sq25 } from '../renderer';
import { getTypeTable, QRPointType, rand } from '../utils';

export enum Type {
  Rect = 'rect',
  Round = 'round',
  Rand = 'rand',
}

export enum PosType {
  Rect = 'rect',
  Round = 'round',
  Planet = 'planet',
  RoundRect = 'roundRect',
}

export interface ResImageQrOptions {
  type?: Type | string;
  posType?: PosType | string;
  size?: number;
  opacity?: number;
  otherColor?: string;
  posColor?: string;
}

const ResImageQrRenderer: Renderer<ResImageQrOptions> = {
  defaultProps: {
    // alignType: 'center',
    // timingType: '',
    posColor: '',
  },
  listPoints: (props) => {
    const { qrcode, type, posType, otherColor, posColor } = props;
    let { size, opacity } = props;
    if (!qrcode) return [];

    const nCount = qrcode.getModuleCount();
    const typeTable = getTypeTable(qrcode);
    const pointList = [];

    size = size / 100;
    opacity = opacity / 100;

    const vw = [3, -3];
    const vh = [3, -3];

    if (size <= 0) size = 1.0;

    for (let x = 0; x < nCount; x++) {
      for (let y = 0; y < nCount; y++) {
        if (qrcode.isDark(x, y) === false) {
          // do nothing;
        } else if (
          typeTable[x][y] === QRPointType.ALIGN_CENTER ||
          typeTable[x][y] === QRPointType.ALIGN_OTHER ||
          typeTable[x][y] === QRPointType.TIMING
        ) {
          if (type === Type.Rect) {
            pointList.push(
              `<rect opacity='${opacity}' width='${size}' height='${size}' fill='${otherColor}' x='${x + (1 - size) / 2
              }' y='${y + (1 - size) / 2}' />`
            );
          } else if (type === Type.Round) {
            pointList.push(
              `<circle opacity='${opacity}' r='${size / 2
              }' fill='${otherColor}' cx='${x + 0.5}' cy='${y + 0.5}' />`
            );
          } else if (type === Type.Rand) {
            pointList.push(
              `<circle opacity='${opacity}' fill='${otherColor}' cx='${x + 0.5
              }' cy='${y + 0.5}' r='${size / 2}' />`
            );
          }
        } else if (typeTable[x][y] === QRPointType.POS_CENTER) {
          if (posType === PosType.Rect) {
            pointList.push(`
              <rect width='${1}' height='${1}' fill='${posColor}' x='${x}' y='${y}' />
          `);
          } else if (posType === PosType.Round) {
            pointList.push(`
              <circle fill='${posColor}' cx='${x + 0.5}' cy='${y + 0.5
              }' r='${1.5}' />
          `);
            pointList.push(`
              <circle fill='none' stroke-width='1' stroke='${posColor}' cx='${x + 0.5
              }' cy='${y + 0.5}' r='${3}' />
          `);
          } else if (posType === PosType.Planet) {
            pointList.push(`
              <circle fill='${posColor}' cx='${x + 0.5}' cy='${y + 0.5
              }' r='${1.5}' />
          `);
            pointList.push(
              `<circle fill='none' stroke-width='0.15' stroke-dasharray='0.5,0.5' stroke='${posColor}' cx='${x + 0.5
              }' cy='${y + 0.5}' r='${3}' />`
            );
            for (let w = 0; w < vw.length; w++) {
              pointList.push(
                `<circle fill='${posColor}' cx='${x + vw[w] + 0.5}' cy='${y + 0.5
                }' r='${0.5}' />`
              );
            }
            for (let h = 0; h < vh.length; h++) {
              pointList.push(
                `<circle fill='${posColor}' cx='${x + 0.5}' cy='${y + vh[h] + 0.5
                }' r='${0.5}' />`
              );
            }
          } else if (posType === PosType.RoundRect) {
            pointList.push(`
              <circle fill='${posColor}' cx='${x + 0.5}' cy='${y + 0.5
              }' r='${1.5}' /> `);
            pointList.push(`
              <path d='${sq25}' stroke='${posColor}' stroke-width='${(100 / 6) * (1 - (1 - size) * 0.75)
              }' fill='none' transform='${'translate(' +
              String(x - 2.5) +
              ',' +
              String(y - 2.5) +
              ') scale(' +
              String(6 / 100) +
              ',' +
              String(6 / 100) +
              ')'
              }' />
          `);
          }
        } else if (typeTable[x][y] === QRPointType.POS_OTHER) {
          if (posType === PosType.Rect) {
            pointList.push(`
              <rect width='${1}' height='${1}' fill='${posColor}' x='${x}' y='${y}' />
          `);
          }
        } else {
          if (type === Type.Rect) {
            pointList.push(
              `<rect opacity='${opacity}' width='${size}' height='${size}' fill='${otherColor}' x='${x + (1 - size) / 2
              }' y='${y + (1 - size) / 2}' /> `
            );
          } else if (type === Type.Round) {
            pointList.push(
              `<circle opacity='${opacity}' r='${size / 2
              }' fill='${otherColor}' cx='${x + 0.5}' cy='${y + 0.5}' />`
            );
          } else if (type === Type.Rand) {
            pointList.push(
              `<circle opacity='${opacity}' fill='${otherColor}' cx='${x + 0.5
              }' cy='${y + 0.5}' r='${0.5 * rand(0.33, 1.0)}' /> `
            );
          }
        }
      }
    }

    return pointList;
  },
};

export const ResImageQr = createRenderer<ResImageQrOptions>(ResImageQrRenderer);

export default ResImageQr;

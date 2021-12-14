import { createRenderer, Renderer, sq25 } from '../renderer';
import { getTypeTable, QRPointType, rand } from '../utils';

enum PosType {
  Rect = 'rect',
  Round = 'round',
  Planet = 'planet',
  RoundRect = 'roundRect',
}

enum LineDirection {
  LeftToRight = 'left-right',
  UpToDown = 'up-down',
  HAndV = 'h-v',
  Loop = 'loop',
  TopLeftToBottomRight = 'topLeft-bottomRight',
  TopRightToBottomLeft = 'topRight-bottomLeft',
  Cross = 'cross',
}

interface LineQrOptions {
  direction?: LineDirection | string;
  size?: number;
  opacity?: number;
  lineColor?: string;
  posType?: PosType | string;
  posColor?: string;
}

const LineQrRenderer: Renderer<LineQrOptions> = {
  defaultProps: {
    direction: LineDirection.LeftToRight,
    posType: PosType.Rect,
    size: 50,
    opacity: 100,
    lineColor: '#000000',
    posColor: '#000000',
  },
  listPoints: (props) => {
    const { qrcode } = props;
    if (!qrcode) return [];

    const nCount = qrcode.getModuleCount();
    const typeTable = getTypeTable(qrcode);
    const pointList = [];

    const { direction, posType, posColor, lineColor } = props;
    let size = props.size / 100;
    const opacity = props.opacity / 100;

    const vw = [3, -3];
    const vh = [3, -3];

    if (size <= 0) size = 1.0;

    const available: any[] = [];
    const ava2: any[] = [];
    for (let x = 0; x < nCount; x++) {
      available[x] = [];
      ava2[x] = [];
      for (let y = 0; y < nCount; y++) {
        available[x][y] = true;
        ava2[x][y] = true;
      }
    }

    for (let x = 0; x < nCount; x++) {
      for (let y = 0; y < nCount; y++) {
        if (qrcode.isDark(x, y) === false) continue;

        if (typeTable[x][y] === QRPointType.POS_CENTER) {
          if (posType === PosType.Rect) {
            pointList.push(
              `<rect width='${1}' height='${1}'  fill='${posColor}' x='${x}' y='${y}'/>`
            );
          } else if (posType === PosType.Round) {
            pointList.push(
              `<circle  fill='${posColor}' cx='${x + 0.5}' cy='${y + 0.5}' r='${1.5}' />`
            );
            pointList.push(
              `<circle  fill='none' stroke-width='1' stroke='${posColor}'  cx='${x + 0.5}' cy='${y + 0.5}' r='${3}' />`
            );
          } else if (posType === PosType.Planet) {
            pointList.push(
              `<circle  fill='${posColor}' cx='${x + 0.5}' cy='${y + 0.5}' r='${1.5}' />`
            );
            pointList.push(
              `<circle  fill='none' stroke-width='0.15' stroke-dasharray='0.5,0.5' stroke='${posColor}'  cx='${x + 0.5}' cy='${y + 0.5}' r='${3}' />`
            );
            for (let w = 0; w < vw.length; w++) {
              pointList.push(
                `<circle  fill='${posColor}' cx='${x + vw[w] + 0.5}' cy='${y + 0.5}' r='${0.5}' />`
              );
            }
            for (let h = 0; h < vh.length; h++) {
              pointList.push(
                `<circle  fill='${posColor}' cx='${x + 0.5}' cy='${y + vh[h] + 0.5}' r='${0.5}' />`
              );
            }
          } else if (posType === PosType.RoundRect) {
            pointList.push(
              `<circle  fill='${posColor}' cx='${x + 0.5}' cy='${y + 0.5}' r='${1.5}' />`
            );
            pointList.push(
              `<path  d='${sq25}' stroke='${posColor}' stroke-width='${(100 / 6) * (1 - (1 - size) * 0.75)}' fill='none' transform='${'translate(' + String(x - 2.5) + ',' + String(y - 2.5) + ') ' + 'scale(' + String(6 / 100) + ',' + String(6 / 100) + ')' }' />`
            );
          }
        } else if (typeTable[x][y] === QRPointType.POS_OTHER) {
          if (posType === PosType.Rect) {
            pointList.push(
              `<rect width='${1}' height='${1}'  fill='${posColor}' x='${x}' y='${y}'/>`
            );
          }
        } else {
          if (direction === LineDirection.LeftToRight) {
            if (
              x === 0 ||
              (x > 0 && (!qrcode.isDark(x - 1, y) || !ava2[x - 1][y]))
            ) {
              const start = 0;
              let end = 0;
              let ctn = true;
              while (ctn && x + end < nCount) {
                if (qrcode.isDark(x + end, y) && ava2[x + end][y]) {
                  end++;
                } else {
                  ctn = false;
                }
              }
              if (end - start > 1) {
                for (let i = start; i < end; i++) {
                  ava2[x + i][y] = false;
                  available[x + i][y] = false;
                }
                pointList.push(
                  `<line opacity='${opacity}' x1='${x + 0.5}' y1='${y + 0.5}' x2='${x + end - start - 0.5}' y2='${y + 0.5}' stroke-width='${size}' stroke='${lineColor}' stroke-linecap='round' />`
                );
              }
            }
            if (available[x][y]) {
              pointList.push(
                `<circle opacity='${opacity}' r='${size / 2}'  fill='${lineColor}' cx='${x + 0.5}' cy='${y + 0.5}'/>`
              );
            }
          }

          if (direction === LineDirection.UpToDown) {
            if (
              y === 0 ||
              (y > 0 && (!qrcode.isDark(x, y - 1) || !ava2[x][y - 1]))
            ) {
              const start = 0;
              let end = 0;
              let ctn = true;
              while (ctn && y + end < nCount) {
                if (qrcode.isDark(x, y + end) && ava2[x][y + end]) {
                  end++;
                } else {
                  ctn = false;
                }
              }
              if (end - start > 1) {
                for (let i = start; i < end; i++) {
                  ava2[x][y + i] = false;
                  available[x][y + i] = false;
                }
                pointList.push(
                  `<line opacity='${opacity}' x1='${x + 0.5}' y1='${y + 0.5}' x2='${x + 0.5}' y2='${y + end - start - 1 + 0.5}' stroke-width='${size}' stroke='${lineColor}' stroke-linecap='round' />`
                );
              }
            }
            if (available[x][y]) {
              pointList.push(
                `<circle opacity='${opacity}' r='${size / 2
                }'  fill='${lineColor}' cx='${x + 0.5}' cy='${y + 0.5}'/>`
              );
            }
          }
          if (direction === LineDirection.HAndV) {
            if (
              y === 0 ||
              (y > 0 && (!qrcode.isDark(x, y - 1) || !ava2[x][y - 1]))
            ) {
              const start = 0;
              let end = 0;
              let ctn = true;
              while (ctn && y + end < nCount) {
                if (
                  qrcode.isDark(x, y + end) &&
                  ava2[x][y + end] &&
                  end - start <= 3
                ) {
                  end++;
                } else {
                  ctn = false;
                }
              }
              if (end - start > 1) {
                for (let i = start; i < end; i++) {
                  ava2[x][y + i] = false;
                  available[x][y + i] = false;
                }
                pointList.push(
                  `<line opacity='${opacity}' x1='${x + 0.5}' y1='${y + 0.5
                  }' x2='${x + 0.5}' y2='${y + end - start - 1 + 0.5
                  }' stroke-width='${size}' stroke='${lineColor}' stroke-linecap='round' />`
                );
              }
            }
            if (
              x === 0 ||
              (x > 0 && (!qrcode.isDark(x - 1, y) || !ava2[x - 1][y]))
            ) {
              const start = 0;
              let end = 0;
              let ctn = true;
              while (ctn && x + end < nCount) {
                if (
                  qrcode.isDark(x + end, y) &&
                  ava2[x + end][y] &&
                  end - start <= 3
                ) {
                  end++;
                } else {
                  ctn = false;
                }
              }
              if (end - start > 1) {
                for (let i = start; i < end; i++) {
                  ava2[x + i][y] = false;
                  available[x + i][y] = false;
                }
                pointList.push(
                  `<line opacity='${opacity}' x1='${x + 0.5}' y1='${y + 0.5
                  }' x2='${x + end - start - 0.5}' y2='${y + 0.5
                  }' stroke-width='${size}' stroke='${lineColor}' stroke-linecap='round' />`
                );
              }
            }
            if (available[x][y]) {
              pointList.push(
                `<circle opacity='${opacity}' r='${size / 2
                }'  fill='${lineColor}' cx='${x + 0.5}' cy='${y + 0.5}'/>`
              );
            }
          }

          if (direction === LineDirection.Loop) {
            if (Number(x > y) ^ Number(x + y < nCount)) {
              if (
                y === 0 ||
                (y > 0 && (!qrcode.isDark(x, y - 1) || !ava2[x][y - 1]))
              ) {
                const start = 0;
                let end = 0;
                let ctn = true;
                while (ctn && y + end < nCount) {
                  if (
                    qrcode.isDark(x, y + end) &&
                    ava2[x][y + end] &&
                    end - start <= 3
                  ) {
                    end++;
                  } else {
                    ctn = false;
                  }
                }
                if (end - start > 1) {
                  for (let i = start; i < end; i++) {
                    ava2[x][y + i] = false;
                    available[x][y + i] = false;
                  }
                  pointList.push(
                    `<line opacity='${opacity}' x1='${x + 0.5}' y1='${y + 0.5
                    }' x2='${x + 0.5}' y2='${y + end - start - 1 + 0.5
                    }' stroke-width='${size}' stroke='${lineColor}' stroke-linecap='round' />`
                  );
                }
              }
            } else {
              if (
                x === 0 ||
                (x > 0 && (!qrcode.isDark(x - 1, y) || !ava2[x - 1][y]))
              ) {
                const start = 0;
                let end = 0;
                let ctn = true;
                while (ctn && x + end < nCount) {
                  if (
                    qrcode.isDark(x + end, y) &&
                    ava2[x + end][y] &&
                    end - start <= 3
                  ) {
                    end++;
                  } else {
                    ctn = false;
                  }
                }
                if (end - start > 1) {
                  for (let i = start; i < end; i++) {
                    ava2[x + i][y] = false;
                    available[x + i][y] = false;
                  }
                  pointList.push(
                    `<line opacity='${opacity}' x1='${x + 0.5}' y1='${y + 0.5
                    }' x2='${x + end - start - 0.5}' y2='${y + 0.5
                    }' stroke-width='${size}' stroke='${lineColor}' stroke-linecap='round' />`
                  );
                }
              }
            }
            if (available[x][y]) {
              pointList.push(
                `<circle opacity='${opacity}' r='${size / 2
                }'  fill='${lineColor}' cx='${x + 0.5}' cy='${y + 0.5}'/>`
              );
            }
          }
          if (direction === LineDirection.TopLeftToBottomRight) {
            if (
              y === 0 ||
              x === 0 ||
              (y > 0 &&
                x > 0 &&
                (!qrcode.isDark(x - 1, y - 1) || !ava2[x - 1][y - 1]))
            ) {
              const start = 0;
              let end = 0;
              let ctn = true;
              while (ctn && y + end < nCount && x + end < nCount) {
                if (qrcode.isDark(x + end, y + end) && ava2[x + end][y + end]) {
                  end++;
                } else {
                  ctn = false;
                }
              }
              if (end - start > 1) {
                for (let i = start; i < end; i++) {
                  ava2[x + i][y + i] = false;
                  available[x + i][y + i] = false;
                }
                pointList.push(
                  `<line opacity='${opacity}' x1='${x + 0.5}' y1='${y + 0.5
                  }' x2='${x + end - start - 1 + 0.5}' y2='${y + end - start - 1 + 0.5
                  }' stroke-width='${size}' stroke='${lineColor}' stroke-linecap='round' />`
                );
              }
            }
            if (available[x][y]) {
              pointList.push(
                `<circle opacity='${opacity}' r='${size / 2
                }'  fill='${lineColor}' cx='${x + 0.5}' cy='${y + 0.5}'/>`
              );
            }
          }
          if (direction === LineDirection.TopRightToBottomLeft) {
            if (
              x === 0 ||
              y === nCount - 1 ||
              (x > 0 &&
                y < nCount - 1 &&
                (!qrcode.isDark(x - 1, y + 1) || !ava2[x - 1][y + 1]))
            ) {
              const start = 0;
              let end = 0;
              let ctn = true;
              while (ctn && x + end < nCount && y - end >= 0) {
                if (
                  qrcode.isDark(x + end, y - end) &&
                  available[x + end][y - end]
                ) {
                  end++;
                } else {
                  ctn = false;
                }
              }
              if (end - start > 1) {
                for (let i = start; i < end; i++) {
                  ava2[x + i][y - i] = false;
                  available[x + i][y - i] = false;
                }
                pointList.push(
                  `<line opacity='${opacity}' x1='${x + 0.5}' y1='${y + 0.5
                  }' x2='${x + (end - start - 1) + 0.5}' y2='${y - (end - start - 1) + 0.5
                  }' stroke-width='${size}' stroke='${lineColor}' stroke-linecap='round' />`
                );
              }
            }
            if (available[x][y]) {
              pointList.push(
                `<circle opacity='${opacity}' r='${size / 2
                }'  fill='${lineColor}' cx='${x + 0.5}' cy='${y + 0.5}'/>`
              );
            }
          }
          if (direction === LineDirection.Cross) {
            if (
              x === 0 ||
              y === nCount - 1 ||
              (x > 0 &&
                y < nCount - 1 &&
                (!qrcode.isDark(x - 1, y + 1) || !ava2[x - 1][y + 1]))
            ) {
              const start = 0;
              let end = 0;
              let ctn = true;
              while (ctn && x + end < nCount && y - end >= 0) {
                if (qrcode.isDark(x + end, y - end) && ava2[x + end][y - end]) {
                  end++;
                } else {
                  ctn = false;
                }
              }
              if (end - start > 1) {
                for (let i = start; i < end; i++) {
                  ava2[x + i][y - i] = false;
                }
                pointList.push(
                  `<line opacity='${opacity}' x1='${x + 0.5}' y1='${y + 0.5
                  }' x2='${x + (end - start - 1) + 0.5}' y2='${y - (end - start - 1) + 0.5
                  }' stroke-width='${(size / 2) * rand(0.3, 1)
                  }' stroke='${lineColor}' stroke-linecap='round' />`
                );
              }
            }
            if (
              y === 0 ||
              x === 0 ||
              (y > 0 &&
                x > 0 &&
                (!qrcode.isDark(x - 1, y - 1) || !available[x - 1][y - 1]))
            ) {
              const start = 0;
              let end = 0;
              let ctn = true;
              while (ctn && y + end < nCount && x + end < nCount) {
                if (
                  qrcode.isDark(x + end, y + end) &&
                  available[x + end][y + end]
                ) {
                  end++;
                } else {
                  ctn = false;
                }
              }
              if (end - start > 1) {
                for (let i = start; i < end; i++) {
                  available[x + i][y + i] = false;
                }
                pointList.push(
                  `<line opacity='${opacity}' x1='${x + 0.5}' y1='${y + 0.5
                  }' x2='${x + end - start - 1 + 0.5}' y2='${y + end - start - 1 + 0.5
                  }' stroke-width='${(size / 2) * rand(0.3, 1)
                  }' stroke='${lineColor}' stroke-linecap='round' />`
                );
              }
            }
            pointList.push(
              `<circle opacity='${opacity}' r='${0.5 * rand(0.33, 0.9)
              }'  fill='${lineColor}' cx='${x + 0.5}' cy='${y + 0.5}'/>`
            );
          }
        }
      }
    }

    return pointList;
  },
};

export const LineQr = createRenderer<LineQrOptions>(LineQrRenderer);
export default LineQr;

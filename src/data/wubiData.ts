import { parseWubiYamlFile } from '../utils/wubiYamlReader';
import path from 'path';

// 五笔码表文件路径
const WUBI86_FILE_PATH = path.join(process.cwd(), 'data/wubi86.dict.yaml');
const WUBI98_FILE_PATH = path.join(process.cwd(), 'data/wubi98_zhishan.dict.yaml');
const XSJ_WUBI_FILE_PATH = path.join(process.cwd(), 'data/wubi06_gb18030-2000_dz.dict.yaml');

// 预加载的数据类型
export type WubiData = {
  wubi86: Map<string, string[]>;
  wubi98: Map<string, string[]>;
  xsjWubi: Map<string, string[]>;
};

// 在构建时预加载数据
export async function loadWubiData(): Promise<WubiData> {
  const [wubi86Data, wubi98Data, xsjWubiData] = await Promise.all([
    parseWubiYamlFile(WUBI86_FILE_PATH),
    parseWubiYamlFile(WUBI98_FILE_PATH),
    parseWubiYamlFile(XSJ_WUBI_FILE_PATH)
  ]);

  return {
    wubi86: wubi86Data,
    wubi98: wubi98Data,
    xsjWubi: xsjWubiData
  };
}

// 导出预加载的数据
export let preloadedData: WubiData | null = null;

// 初始化函数
export async function initializeWubiData() {
  if (!preloadedData) {
    preloadedData = await loadWubiData();
  }
  return preloadedData;
} 
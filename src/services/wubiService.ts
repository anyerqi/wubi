import { parseWubiYamlFile, getPrimaryCode } from '../utils/wubiYamlReader';
import path from 'path';

// 五笔码表文件路径
const WUBI86_FILE_PATH = path.join(process.cwd(), 'data/wubi86.dict.yaml');
const WUBI98_FILE_PATH = path.join(process.cwd(), 'data/wubi98_zhishan.dict.yaml');
const XSJ_WUBI_FILE_PATH = path.join(process.cwd(), 'data/wubi06_gb18030-2000_dz.dict.yaml');

// 缓存五笔码表数据
let wubi86Cache: Map<string, string[]> | null = null;
let wubi98Cache: Map<string, string[]> | null = null;
let xsjWubiCache: Map<string, string[]> | null = null;

/**
 * 获取86版五笔码表数据
 */
export async function getWubi86Data(): Promise<Map<string, string[]>> {
  if (!wubi86Cache) {
    wubi86Cache = await parseWubiYamlFile(WUBI86_FILE_PATH);
  }
  return wubi86Cache;
}

/**
 * 获取98版五笔码表数据
 */
export async function getWubi98Data(): Promise<Map<string, string[]>> {
  if (!wubi98Cache) {
    wubi98Cache = await parseWubiYamlFile(WUBI98_FILE_PATH);
  }
  return wubi98Cache;
}

/**
 * 获取新世纪五笔码表数据
 */
export async function getXsjWubiData(): Promise<Map<string, string[]>> {
  if (!xsjWubiCache) {
    xsjWubiCache = await parseWubiYamlFile(XSJ_WUBI_FILE_PATH);
  }
  return xsjWubiCache;
}

/**
 * 查询汉字的编码信息
 */
export async function getCharacterInfo(char: string) {
  // 从YAML文件获取所有版本的五笔编码
  const [wubi86Data, wubi98Data, xsjWubiData] = await Promise.all([
    getWubi86Data(),
    getWubi98Data(),
    getXsjWubiData()
  ]);
  
  const wubi86Codes = wubi86Data.get(char) || [];
  const wubi98Codes = wubi98Data.get(char) || [];
  const xsjCodes = xsjWubiData.get(char) || [];
  
  const wubi86PrimaryCode = getPrimaryCode(wubi86Codes);
  const wubi98PrimaryCode = getPrimaryCode(wubi98Codes);
  const xsjPrimaryCode = getPrimaryCode(xsjCodes);
  
  // 构建结果
  const result = {
    char,
    wubi86: wubi86PrimaryCode || "未知",
    wubi98: wubi98PrimaryCode || "未知",
    wubiXSJ: xsjPrimaryCode || "未知"
  };
  
  // 如果所有版本都没有编码，则返回null
  if (result.wubi86 === "未知" && result.wubi98 === "未知" && result.wubiXSJ === "未知") {
    return null;
  }
  
  return result;
} 
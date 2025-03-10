import { getPrimaryCode } from '../utils/wubiYamlReader';
import { preloadedData, initializeWubiData } from '../data/wubiData';

/**
 * 获取86版五笔码表数据
 */
export async function getWubi86Data(): Promise<Map<string, string[]>> {
  if (!preloadedData) {
    await initializeWubiData();
  }
  return preloadedData!.wubi86;
}

/**
 * 获取98版五笔码表数据
 */
export async function getWubi98Data(): Promise<Map<string, string[]>> {
  if (!preloadedData) {
    await initializeWubiData();
  }
  return preloadedData!.wubi98;
}

/**
 * 获取新世纪五笔码表数据
 */
export async function getXsjWubiData(): Promise<Map<string, string[]>> {
  if (!preloadedData) {
    await initializeWubiData();
  }
  return preloadedData!.xsjWubi;
}

/**
 * 查询汉字的编码信息
 */
export async function getCharacterInfo(char: string) {
  // 确保数据已加载
  if (!preloadedData) {
    await initializeWubiData();
  }
  
  const wubi86Codes = preloadedData!.wubi86.get(char) || [];
  const wubi98Codes = preloadedData!.wubi98.get(char) || [];
  const xsjCodes = preloadedData!.xsjWubi.get(char) || [];
  
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
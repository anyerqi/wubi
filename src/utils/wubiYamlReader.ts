import fs from 'fs';
import path from 'path';

// 解析新世纪五笔码表文件
export async function parseWubiYamlFile(filePath: string): Promise<Map<string, string[]>> {
  try {
    // 读取文件内容
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // 分割元数据和词典数据
    const [, dictionaryStr] = fileContent.split('...\n\n');
    
    // 解析词典数据
    const lines = dictionaryStr.split('\n').filter(line => line.trim() !== '');
    
    // 创建一个Map，键是汉字，值是该汉字的所有编码
    const characterCodesMap = new Map<string, string[]>();
    
    // 处理每一行
    for (const line of lines) {
      const parts = line.split('\t');
      if (parts.length >= 2) {
        const character = parts[0].trim();
        const code = parts[1].trim();
        
        // 跳过非汉字条目
        if (!/[\u4e00-\u9fff]/.test(character)) {
          continue;
        }
        
        // 将编码添加到字符的编码列表中
        if (characterCodesMap.has(character)) {
          characterCodesMap.get(character)!.push(code);
        } else {
          characterCodesMap.set(character, [code]);
        }
      }
    }
    
    return characterCodesMap;
  } catch (error) {
    console.error('解析五笔码表文件出错:', error);
    return new Map();
  }
}

// 获取汉字的主要编码（最短的编码）
export function getPrimaryCode(codes: string[]): string {
  if (!codes || codes.length === 0) return '';
  
  // 优先选择四码字
  const fourCharCodes = codes.filter(code => code.length === 4);
  if (fourCharCodes.length > 0) {
    return fourCharCodes[0];
  }
  
  // 如果没有四码字，返回最短的编码
  return codes.sort((a, b) => a.length - b.length)[0];
} 
'use client';

import { useState } from 'react';

interface WubiResult {
  char: string;
  wubi86: string;
  wubi98: string;
  wubiXSJ: string;
}

export default function WubiSearch() {
  const [inputChar, setInputChar] = useState<string>('');
  const [result, setResult] = useState<WubiResult | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    if (!inputChar) {
      setError('请输入一个汉字');
      setResult(null);
      return;
    }

    if (inputChar.length > 1) {
      setError('请只输入一个汉字');
      setResult(null);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/wubi?char=${encodeURIComponent(inputChar)}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '查询失败');
      }
      
      const data = await response.json();
      setResult(data);
      setError('');
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : '查询过程中发生错误');
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">五笔编码查询</h2>
      
      <div className="flex mb-4">
        <input
          type="text"
          value={inputChar}
          onChange={(e) => setInputChar(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="请输入一个汉字"
          maxLength={1}
        />
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
        >
          {isLoading ? '查询中...' : '查询'}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4 text-center">{result.char}</h3>
          
          <div className="space-y-6">
            <WubiVersionInfo 
              title="86版五笔" 
              code={result.wubi86}
            />
            
            <WubiVersionInfo 
              title="98版五笔" 
              code={result.wubi98}
            />
            
            <WubiVersionInfo 
              title="新世纪版五笔" 
              code={result.wubiXSJ}
            />
          </div>
        </div>
      )}
    </div>
  );
}

interface WubiVersionInfoProps {
  title: string;
  code: string;
}

function WubiVersionInfo({ title, code }: WubiVersionInfoProps) {
  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <h4 className="font-medium text-gray-700 mb-2">{title}</h4>
      <div>
        <span className="text-sm text-gray-500">编码：</span>
        <span className="font-mono font-medium">{code}</span>
      </div>
    </div>
  );
} 
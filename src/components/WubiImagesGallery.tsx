'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function WubiImagesGallery() {
  const [selectedVersion, setSelectedVersion] = useState<string>('86');
  
  const wubiVersions = [
    { 
      id: '86', 
      name: '86版', 
      image: '/wubi86.webp',
      alt: '86版五笔字根图 - 王永民五笔字型输入法86版字根表',
      description: '86版五笔字型是最常用的五笔版本，字根数量少，规则简单，适合初学者'
    },
    { 
      id: '98', 
      name: '98版', 
      image: '/wubi98.png',
      alt: '98版五笔字根图 - 五笔字型输入法98版字根表',
      description: '98版五笔是86版的改进版本，扩展了字库，收录更多汉字'
    },
    { 
      id: 'xsj', 
      name: '新世纪版', 
      image: '/wubixsj.jpg',
      alt: '新世纪版五笔字根图 - 五笔新世纪版字根表',
      description: '新世纪版五笔进一步扩充了字库，支持GBK、Unicode等更多字符集'
    },
  ];
  
  const selectedImageInfo = wubiVersions.find(v => v.id === selectedVersion) || wubiVersions[0];
  
  return (
    <div className="mt-12 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4 text-center">五笔字根图</h2>
      
      <div className="flex justify-center mb-4 space-x-2">
        {wubiVersions.map(version => (
          <button
            key={version.id}
            onClick={() => setSelectedVersion(version.id)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedVersion === version.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
            aria-label={`切换到${version.name}五笔字根图`}
          >
            {version.name}
          </button>
        ))}
      </div>
      
      <div className="relative w-full">
        <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
          <div className="flex items-center justify-center w-full h-full">
            <figure>
              <Image
                src={selectedImageInfo.image}
                alt={selectedImageInfo.alt}
                width={800}
                height={600}
                className="object-contain"
                priority
              />
              <figcaption className="text-center text-sm text-gray-500 mt-2">
                {selectedImageInfo.description}
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
} 
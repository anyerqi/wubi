import WubiSearch from "@/components/WubiSearch";
import WubiImagesGallery from "@/components/WubiImagesGallery";
import { JsonLd } from "@/components/JsonLd";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "五笔编码查询系统",
    "description": "查询汉字的86版、98版和新世纪版五笔编码，提供五笔字根图",
    "applicationCategory": "ReferenceApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "CNY"
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <JsonLd data={structuredData} />
      
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            五笔编码查询系统
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            查询汉字的86版、98版和新世纪版五笔编码
          </p>
        </header>

        <section aria-labelledby="search-section">
          <h2 id="search-section" className="sr-only">五笔编码查询</h2>
          <WubiSearch />
        </section>
        
        <section aria-labelledby="gallery-section" className="mt-12">
          <h2 id="gallery-section" className="sr-only">五笔字根图</h2>
          <WubiImagesGallery />
        </section>
        
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>本应用提供常用汉字的五笔编码查询功能</p>
          <p className="mt-1">从官方码表文件获取准确的五笔数据</p>
          <p className="mt-4">
            <a href="/sitemap.xml" className="text-blue-500 hover:text-blue-700">网站地图</a>
          </p>
        </footer>
      </div>
    </main>
  );
}

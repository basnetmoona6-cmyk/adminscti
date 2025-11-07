


import Marquee from './Marquee';


export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-neutral-900">
    

      {/* Main Content */}
      <main className="flex-1 pt-20 px-4 sm:px-6 lg:px-8 md:ml-64">
      <Marquee/>
      </main>
    </div>
  );
}
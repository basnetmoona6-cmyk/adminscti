



import PreResister from './PreResister';


export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-neutral-900">
      {/* Sidebar */}
      

      {/* Main Content */}
      <main className="flex-1 pt-20 px-4 sm:px-6 lg:px-8 md:ml-64">
   <PreResister/>
      </main>
    </div>
  );
}
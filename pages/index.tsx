import Link from 'next/link';

export default function Home() {
  return (
    <main className='max-w-4xl mx-auto'>
      <div className='p-4 flex items-center justify-center w-full h-screen'>
        <div>
          <h1 className='text-2xl font-black'>Hello world!</h1>
          <Link href='/design'>
            <a className='text-blue-600 underline'>Design</a>
          </Link>
        </div>
      </div>
    </main>
  );
}

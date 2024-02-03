import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className='flex flex-col items-center justify-center h-screen text-center'>
      <h1 className='text-3xl font-bold mb-4'>404 - Page Not Found</h1>
      <p className='mb-8'>Oops! The page you are looking for does not exist.</p>
      <Link
        href='/'
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Generate New Link
      </Link>
    </div>
  );
}

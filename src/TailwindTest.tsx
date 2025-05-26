
export function TailwindTest() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          Tailwind Test
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          This is a test to see if Tailwind CSS is working properly.
        </p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="bg-red-500 h-10 rounded"></div>
          <div className="bg-green-500 h-10 rounded"></div>
          <div className="bg-blue-500 h-10 rounded"></div>
        </div>
      </div>
    </div>
  );
}

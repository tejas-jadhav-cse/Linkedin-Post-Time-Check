
export default function SimpleTest() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="p-8 bg-blue-500 rounded-lg text-white text-center">
        <h1 className="text-2xl font-bold">Tailwind Test</h1>
        <p className="mt-2">This is an isolated test component</p>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="h-8 bg-red-500 rounded"></div>
          <div className="h-8 bg-green-500 rounded"></div>
          <div className="h-8 bg-yellow-500 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export function AdPlaceholder({ type }: { type: "sidebar" | "in-article" | "sticky" }) {
  if (type === "sidebar") {
    return (
      <div className="w-full h-[600px] bg-gray-200 dark:bg-white/5 border border-dashed border-gray-400 dark:border-white/20 rounded-xl flex items-center justify-center text-gray-500 dark:text-gray-400">
        <div className="text-center">
          <p className="font-bold">Google AdSense</p>
          <p className="text-sm">Sidebar Ad (300x600)</p>
        </div>
      </div>
    );
  }

  if (type === "sticky") {
    return (
      <div className="fixed bottom-0 left-0 w-full h-[50px] bg-gray-200 dark:bg-gray-800 border-t border-gray-300 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400 z-50">
        <p className="font-bold text-sm">Google AdSense - Sticky Bottom (Mobile)</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[100px] md:h-[250px] my-6 bg-gray-200 dark:bg-white/5 border border-dashed border-gray-400 dark:border-white/20 rounded-xl flex items-center justify-center text-gray-500 dark:text-gray-400">
      <div className="text-center">
        <p className="font-bold">Google AdSense</p>
        <p className="text-sm">In-Article Ad</p>
      </div>
    </div>
  );
}

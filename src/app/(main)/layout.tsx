import Sidebar from "@/components/side-bar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidebar />
      <main className="flex-1 ml-[250px] min-h-screen">
        <header className="bg-white border-b py-4 px-6 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800">
              Policy Management Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center">
                  AD
                </div>
                <span className="text-sm font-medium text-gray-700">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {children}
      </main>
    </>
  );
}

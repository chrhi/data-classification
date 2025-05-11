import Sidebar from "@/components/side-bar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidebar />
      <main className="flex-1 ml-[250px] min-h-screen">{children}</main>
    </>
  );
}

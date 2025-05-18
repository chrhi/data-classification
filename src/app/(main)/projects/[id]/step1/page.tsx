import Step1 from "@/components/forms/step1";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  // get the data of the organization

  return (
    <>
      <div className="w-full h-[100px] bg-white flex  rounded-2xl border">
        <h2>here is gonna be the progress</h2>
      </div>
      <Step1 />
    </>
  );
}

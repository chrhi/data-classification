import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="w-full min-h-screen h-fit flex flex-col  p-8">
      <div className="w-full h-[100px] flex items-center justify-between">
        <h2 className="font-bold text-2xl">Projects</h2>

        <Button>create new project</Button>
      </div>

      <DataTable columns={columns} data={[]} />
    </div>
  );
}

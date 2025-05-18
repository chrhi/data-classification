import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="w-full min-h-screen h-fit flex flex-col  p-8">
      <div className="w-full h-[100px] flex items-center justify-between">
        <h2 className="font-bold text-2xl">Policies</h2>

        <Link href={"/policies/create"}>
          <Button>add policy</Button>
        </Link>
      </div>

      <DataTable columns={columns} data={[]} />
    </div>
  );
}

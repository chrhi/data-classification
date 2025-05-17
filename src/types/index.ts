export type Project = {
  id: string;
  title: string;
  description: string | null;
  status: "ACTIVE" | "ARCHIVED" | "COMPLETED";
  created_at: Date;
  updated_at: Date;
  owner_id: string;
  owner: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
};

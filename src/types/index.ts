export type Organization = {
  id: string;
  title: string;
  description?: string;
  status: "ACTIVE" | "ARCHIVED" | "COMPLETED";
  created_at: string; // ISO string
  updated_at: string; // ISO string
  owner: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
};

interface IDriver {
  id: string;
  companyId: string;
  code: string;
  name: string;
  status: "ACTIVE" | "INACTIVE" | "PENDING";
  userId?: string | null;
  createdAt?: string;
  deletedAt?: string | null;
  updatedAt?: string;
}

export default IDriver;

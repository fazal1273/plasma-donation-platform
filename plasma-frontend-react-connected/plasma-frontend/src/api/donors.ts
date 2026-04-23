import { api } from "./client";
import type { Donor } from "@/data/mockData";

export const donorsApi = {
  list: () => api.get<Donor[]>("/api/donors").then((r) => r.data),
  search: (params: { bloodGroup?: string; location?: string }) =>
    api.get<Donor[]>("/api/donors/search", { params }).then((r) => r.data),
  create: (donor: Omit<Donor, "id" | "available">) =>
    api.post<Donor>("/api/donors", donor).then((r) => r.data),
};

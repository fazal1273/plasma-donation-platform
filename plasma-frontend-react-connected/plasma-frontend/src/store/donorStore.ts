import { useEffect, useState } from "react";
import { Donor } from "@/data/mockData";
import { donorsApi } from "@/api/donors";

const listeners = new Set<(d: Donor[]) => void>();
let donors: Donor[] = [];
let loaded = false;

async function refresh() {
  try {
    donors = await donorsApi.list();
    listeners.forEach((l) => l(donors));
  } catch (e) {
    console.error("Failed to load donors", e);
  }
}

export function useDonors() {
  const [d, setD] = useState<Donor[]>(donors);
  useEffect(() => {
    listeners.add(setD);
    if (!loaded) { loaded = true; refresh(); }
    return () => { listeners.delete(setD); };
  }, []);
  return d;
}

export async function addDonor(donor: Omit<Donor, "id" | "available">) {
  const created = await donorsApi.create(donor);
  donors = [created, ...donors];
  listeners.forEach((l) => l(donors));
}

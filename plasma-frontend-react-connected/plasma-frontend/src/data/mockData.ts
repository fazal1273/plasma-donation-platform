export type Donor = {
  id: number;
  name: string;
  bloodGroup: string;
  location: string;
  contact: string;
  lastDonationDate: string;
  available: boolean;
};

export const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

// Kept for any leftover dashboard placeholders; real data comes from backend.
export const initialDonors: Donor[] = [];

export const stats = {
  totalDonors: 0,
  availableDonors: 0,
  requests: 0,
  donations: 0,
};

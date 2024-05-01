import type { Session } from "next-auth";
import { User } from "@prisma/client";

export type FormState = {
  title: string;
  brand: string;
  variety: string;
  tasting: string | null;
  rate: number;
  note: string | null;
  price: string | null;
  weight: string | null;
  status: boolean;
  imageUrl: string | null;
  imageKey: string | null;
  country: string | null;
  domain: string | null;
  altitude: string | null;
  process: string | null;
  type: string | null;
};

export interface SessionInterface extends Session {
  user: User & {
    id: number;
    name: string;
    email: string;
    avatar: string;
  };
}

export type PostInterface = {
  id: string;
  title: string;
  brand: string;
  variety: string;
  tasting: string | null;
  rate: number;
  note: string | null;
  price: string | null;
  weight: string | null;
  createdAt: Date;
  updatedAt: Date;
  status: boolean | null;
  country: string | null;
  domain: string | null;
  altitude: string | null;
  process: string | null;
  type: string | null;
  imageUrl: string | null;
  imageKey: string | null;
};

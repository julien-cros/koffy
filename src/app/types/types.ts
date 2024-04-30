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
  imageUrl: string;
	imageKey: string;
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
  imageUrl: string;
	imageKey: string;
};
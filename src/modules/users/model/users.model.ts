import { $Enums, Prisma } from "@prisma/client";

export class User implements Prisma.UserCreateInput {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: $Enums.Role;
  cart?: Prisma.CartCreateNestedOneWithoutUserInput;
  created_at?: string | Date;
  updated_at?: string | Date;
}
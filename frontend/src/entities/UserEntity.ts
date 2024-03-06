import { RoleEnum } from "@enums/role_enum";

export type UserEntity = {
  id: string;
  username: string;
  email: string;
  password: string;
  role: RoleEnum;
  balance: number;
  created_at: string;
  updated_at: string;
};

export enum RoleEnum {
  admin = "Administrador",
  customer = "Cliente",
}

export type RoleEnumKeys = keyof typeof RoleEnum;

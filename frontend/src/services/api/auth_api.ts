import { UserEntity } from "@entities/UserEntity";
import { ApiAction } from "../../hooks/api/action";

export class AuthApi extends ApiAction {
  async session(): Promise<UserEntity> {
    const response = await this.http.get<UserEntity>(`/session`);
    return response.data;
  }
}

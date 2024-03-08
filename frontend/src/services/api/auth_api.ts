import { UserEntity } from '@entities/UserEntity'
import { ApiAction } from '../../hooks/api/action'
import { LoginFormType } from '@type/login_form_type'
import { RegisterFormType } from '@type/register_form_type'

export class AuthApi extends ApiAction {
  async register(payload: RegisterFormType): Promise<UserEntity> {
    const response = await this.http.post<UserEntity>(
      `/api/auth/register`,
      payload
    )
    return response.data
  }

  async login(payload: LoginFormType): Promise<UserEntity> {
    const response = await this.http.post<UserEntity>(
      `/api/auth/login`,
      payload
    )
    return response.data
  }

  async logout(): Promise<unknown> {
    const response = await this.http.post<unknown>(`/api/auth/logout`)
    return response.data
  }

  async session(): Promise<UserEntity> {
    const response = await this.http.get<UserEntity>(`/api/auth/me`)
    return response.data
  }
}

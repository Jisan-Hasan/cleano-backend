export type ILoginPayload = {
  email: string;
  password: string;
};

export type IChangePasswordPayload = {
  oldPassword: string;
  newPassword: string;
};

declare global {
  interface TUser {
    accessToken: string;
    exp: number;
    refreshToken: string;
    user: {
      email: string;
      firstname: string;
      id: string;
      lastname: string;
      password: string;
      role: string;
    };
  }
}

export {};

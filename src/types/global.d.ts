declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_URL: string;
      JWT_REFRESH: string;
      JWT_SECRET: string;
    }
  }
}

export {};

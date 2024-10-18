declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_URL: string;
      JWT_SECRET: string;
    }
  }
}

export {};

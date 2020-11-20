interface IConfig {
  env: {
    API: string;
  };
}

declare const process: IConfig;

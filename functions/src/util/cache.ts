export interface Cache {
  get: (key: string, storeFunction: () => Promise<any>) => Promise<any>;
  flush: () => void;
}

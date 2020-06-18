import Vue, { PluginFunction } from 'vue';

interface VueLocalStorage extends PluginFunction<any> {
  install(Vue: Vue): void
  setSession(name: string, value: any): void
  getSession(name: string): any
  setStorage(name: string, value: any, expire: number): void
  getStorage(name: string): any
  removeStorage(name: string): void
  keyStorage(index: number): any
  clearAll(): void
  setCookie(name: string, value: string, expire?: number, domain?: string, path?: string): any
  getCookie(name: string): string
  clearCookie(name: string): void
}


declare const localStroage: VueLocalStorage;

declare module 'vue/types/vue' {
  interface Vue {
    $localStorage: VueLocalStorage;
  }
}
export default localStroage;
export as namespace localStroage;

// import localStroage from './storage';

// export default localStroage;
// export as namespace localStroage;

// export * from './storage.main';

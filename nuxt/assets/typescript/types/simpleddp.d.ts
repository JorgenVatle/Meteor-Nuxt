declare module 'simpleddp' {
  import WebSocket from "isomorphic-ws";

  export interface DocumentChange<T> {
    prev: T,
    next: T,
    fields: {
      [key: string]: 1,
    },
  }

  export interface CollectionChange<T> {
    fieldsChanged?: Partial<T>,
    added: false | T,
    removed: false | T
    changed: false | DocumentChange<T>
  }

  export class Subscription {
    ready(): Promise<void>;
  }

  export interface Cursor<T> {
    onChange(listener: (change: CollectionChange<T> & DocumentChange<T>) => void): void;
  }

  export interface MeteorCursor<T> extends Cursor<T> {
    fetch(): Array<T>,
    filter(matcher: (item: T) => boolean): MeteorCursor<T>,
    reactive(): ReactiveCursor<T>,
  }

  export interface ReactiveCursor<T> extends Cursor<T> {
    one(): ReactiveCursor<T>
    data(): Array<T>,
  }

  export interface UserDetails { id: string, token: string, tokenExpires: any, type: string }

  export default class SimpleDDP {
    constructor(opts: {
      endpoint: string;
      SocketConstructor: typeof WebSocket;
      reconnectInterval?: number;
    }, plugins?: any[]);
    collection<T = any>(name: string): MeteorCursor<T>
    login(options: KeyVal): Promise<UserDetails>
    call(method: string, ...args: any): Promise<any>;
    subscribe(name: string, ...args: any): Subscription;
    on(event: 'connected' | 'disconnected', callback: () => void): void;
    on(event: 'error', callback: (error: Error) => void): void
  }
}

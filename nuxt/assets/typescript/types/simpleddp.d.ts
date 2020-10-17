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

  export class Cursor<T> {
    onChange(listener: (change: CollectionChange<T> & DocumentChange<T>) => void): void;
  }

  export class MeteorCursor<T> extends Cursor<T> {
    constructor(name: string, simpleDDPInstance: SimpleDDP);
    protected _name: string;
    protected _server: SimpleDDP;
    protected _filter: FilterFunction<T>;
    fetch(): Array<T>;
    filter(matcher: (item: T) => boolean): MeteorCursor<T>;
    reactive(settings?: ReactiveCursorSettings): ReactiveCursor<T>;
  }

  export interface ReactiveCursorSettings {
    sort: KeyVal<number>;
    skip: number;
    limit: number;
  }

  type FilterFunction<T> = <O>(data: T) => Partial<O>;

  class ReactiveCursor<T> {
    constructor(collection: MeteorCursor<T>, settings?: Partial<ReactiveCursorSettings>, filter?: FilterFunction<T>);
    one(): ReactiveCursor<T>;
    data(): Array<T>;
  }

  export interface ReactiveCursor<T> extends Omit<Cursor<T>, 'onChange'>{
    onChange(handler: (newValue: Array<T>) => void): void;
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

declare module 'simpleddp/lib/classes/ddpCollection' {
  import {MeteorCursor} from "simpleddp";

  export class ddpCollection<T = any> extends MeteorCursor<T> {}
}

declare module 'simpleddp/lib/classes/ddpReactiveCollection' {
  import {ReactiveCursor} from "simpleddp";

  export class ddpReactiveCollection<T = any> extends ReactiveCursor<T> {}
}

import {ddpCollection} from "simpleddp/lib/classes/ddpCollection";
import SimpleDDP, {MeteorCursor, ReactiveCursor, ReactiveCursorSettings} from "simpleddp";
import {ddpReactiveCollection} from "simpleddp/lib/classes/ddpReactiveCollection";
import {ref} from "@vue/composition-api";

class ReactiveMeteorCursor<T> extends ddpCollection<T> {

  public reactive(settings?: ReactiveCursorSettings): ReactiveCursor<T> {
    return new ddpReactiveCollection(new ddpCollection(this._name, this._server), settings, this._filter);
  }

  public fetch(): Array<T> {
    const reactive = this.reactive();
    const data = ref(reactive.data());

    reactive.onChange((value) => {
      // @ts-ignore
      data.value = value;
    })

    // @ts-ignore
    return data;
  }
}

export class ReactiveMeteor extends SimpleDDP {
  public collection<T = any>(name: string): MeteorCursor<T> {
    return new ReactiveMeteorCursor(name, this);
  }
}

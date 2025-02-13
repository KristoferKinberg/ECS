import {IComponent, ISystem} from "./Types";

export default class System implements ISystem {
  id: string = "";

  constructor(componentType: IComponent["typeId"]) {

  }

  onAdd = (component: IComponent) => {};

  onUpdate = (newComponent: IComponent, oldComponent: IComponent) => {};

  onRemove = (oldComponent: IComponent) => {};
}
import {IComponent, IEntity, ISystem} from "./Types";
import Entity from "./Entity";

export default class System implements ISystem {
  id: string = "System";

  constructor(public readonly componentType: IComponent["typeId"]) {}

  onAdd = (entity: Entity, component: IComponent) => {};

  onUpdate = (entity: Entity, oldComponent: IComponent, newComponent: IComponent) => {};

  onRemove = (entity: Entity, oldComponent: IComponent) => {};
}
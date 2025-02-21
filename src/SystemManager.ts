import {IComponent, IECS, ISystemManager, ISystemSubList} from "./Types";
import System from "./System";
import Entity from "./Entity";

export default class SystemManager implements ISystemManager {
  systemSubsList: ISystemSubList = {};

  constructor(readonly ECS: IECS) {}

  public registerSystem = (system: System) => {
    const newList = this.systemSubsList[system.componentType] || []

    this.systemSubsList = {
      ...this.systemSubsList,
      [system.componentType]: [
        ...newList,
        system,
      ]
    }
  }

  public registerSystems = (systems: System[]) => {
    systems.forEach((system) => this.registerSystem(system));
  }

  get Systems() {
    return Object.values(this.systemSubsList).flatMap(s => s);
  }

  onAddComponent = (entity: Entity, component: IComponent) =>
  {
    this.systemSubsList[`${component.typeId}`]?.forEach(system => system.onAdd(entity, component));
  }

  onUpdateComponent = <T extends IComponent>(entity: Entity, component: IComponent) => {
    const oldComponent = entity.getComponent<T>(component.typeId);
    if (!oldComponent) throw new Error(ERRORS.COMPONENT_DOESNT_EXIST);

    this.systemSubsList[component.typeId]?.forEach(system => system.onUpdate(entity, oldComponent, component));
  }

  onRemoveComponent = (entity: Entity, oldComponent: IComponent) => {
    this.systemSubsList[oldComponent.typeId].forEach(system => system.onRemove(entity, oldComponent));
  }
}
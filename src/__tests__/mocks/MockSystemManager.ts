import System from "../../System";
import {IComponent, IECS, IEntity, ISystemManager, ISystemSubList} from "../../Types";
import Entity from "../../Entity";

export class MockSystemManager implements ISystemManager {
  systemSubsList: ISystemSubList = {};

  constructor(readonly ECS: IECS) {}

  public registerSystem = jest.fn((system: System) => {
    this.systemSubsList[system.componentType] = [
      ...(this.systemSubsList[system.componentType] || []),
      system,
    ];
  });

  public registerSystems = jest.fn((systems: System[]) => {
    systems.forEach((system) => this.registerSystem(system));
  });

  get Systems() {
    return Object.values(this.systemSubsList).flatMap(s => s);
  }

  handleAddedComponent = jest.fn((entity: Entity, component: IComponent) => {
    entity.hasComponent(component.typeId)
      ? this.onUpdateComponent(entity, component)
      : this.onAddComponent(entity, component);
  });

  onAddComponent = jest.fn((entity: Entity, component: IComponent) => {
    this.systemSubsList[component.typeId]?.forEach(system => system.onAdd(entity, component));
  });

  onUpdateComponent = jest.fn(<T extends IComponent>(entity: Entity, component: IComponent) => {
    const oldComponent = entity.getComponent<T>(component.typeId);
    if (!oldComponent) throw new Error("Component doesn't exist");
    this.systemSubsList[component.typeId]?.forEach(system => system.onUpdate(entity, oldComponent, component));
  });

  onRemoveComponent = jest.fn((entity: Entity, oldComponent: IComponent) => {
    this.systemSubsList[oldComponent.typeId]?.forEach(system => system.onRemove(entity, oldComponent));
  });
}
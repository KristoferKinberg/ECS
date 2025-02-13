import {IComponent, IComponentId, IEntity, ISystem, ISystemManager, ISystemSubList} from "./Types";

export default class SystemManager implements ISystemManager {
  systemSubsList: ISystemSubList = {};

  registerSystem = (system: ISystem, componentId: IComponentId) => {
    this.systemSubsList = {
      [componentId]: [
        ...this.systemSubsList[componentId],
        system,
      ]
    }
  }

  handleAddedComponent = (entity: IEntity, component: IComponent) => {
    entity.hasComponent(component.typeId)
      ? this.onUpdateComponent(entity, component)
      : this.onAddComponent(entity, component);
  }

  onAddComponent = (entity: IEntity, component: IComponent) =>
    this.systemSubsList[component.typeId].forEach(system => system.onAdd(entity, component));

  onUpdateComponent = <T extends IComponent>(entity: IEntity, component: IComponent) => {
    const oldComponent = entity.getComponent<T>(component.typeId);
    if (!oldComponent) throw new Error(ERRORS.COMPONENT_DOESNT_EXIST);

    this.systemSubsList[component.typeId].forEach(system => system.onUpdate(entity, oldComponent, component));
  }

  onRemoveComponent = (entity: IEntity, oldComponent: IComponent) => {
    this.systemSubsList[oldComponent.typeId].forEach(system => system.onRemove(entity, oldComponent));
  }
}
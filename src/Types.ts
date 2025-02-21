import System from "./System";
import Entity from "./Entity";

export interface IComponent {
  typeId: number;
  eq: () => boolean;
}

export type IComponentId = IComponent["typeId"];

export interface ISystemManager {
  systemSubsList: ISystemSubList;
  registerSystem: (system: System) => void;
  registerSystems: (systems: System[]) => void;
  onAddComponent: (entity: Entity, newComponent: IComponent) => void;
  onUpdateComponent: (entity: Entity, oldComponent: IComponent, newComponent: IComponent) => void;
  onRemoveComponent: (entity: Entity, oldComponent: IComponent) => void;
}

export interface ISystemSubList {
  [key: IComponentId]: ISystem[];
}

export interface ISystem {
  id: string;
  onAdd: (entity: Entity, component: IComponent) => void;
  onUpdate: (entity: Entity, newComponent: IComponent, oldComponent: IComponent) => void;
  onRemove: (entity: Entity, oldComponent: IComponent) => void;
}

export interface IEntity {
  id: number;
  isDisposed: boolean;
  components: IComponent[];
  getComponent:<T extends IComponent>(componentId: IEntityId) => T | null;
  hasComponent: (componentType: number) => boolean;
  addComponent: <C extends IComponent>(component: IComponent) => IComponent[];
  removeComponent: (componentType: number) => void;
  dispose: () => void;
}

export type IEntityId = IEntity["id"];

export interface IEntityManager {
  entities: IEntityObject;
  getEntities: () => IEntity[];
  getEntity: (entityId: number) => IEntity | null;
  getEntitiesWithComponent: (componentId: number) => IEntity[];
  createEntity: () => IEntity;
}

export type IEntityObject = Record<IEntityId, IEntity>;

export interface SystemManager {
  systems: ISystem[];
  getSystems: () => ISystem[];
  enableSystem: (systemKey: string) => void;
  disableSystem: (systemKey: string) => void;
  enableSystems: (systemsKeys: string[]) => void;
  disableSystems: (systemsKeys: string[]) => void;
  registerSystem: (system: ISystem) => void;
}

export interface IECS {
  entityManager: IEntityManager;
  systemManager: ISystemManager;
}
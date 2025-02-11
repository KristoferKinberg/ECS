export interface Component {
  typeId: number;
  eq: () => boolean;
}

export interface System {
  id: string;
  onAdd: (component: Component) => void;
  onUpdate: (newComponent: Component, oldComponent: Component) => void;
  onRemove: (newComponent: Component, oldComponent: Component) => void;
}

export interface IEntity {
  id: number;
  isDisposed: boolean;
  components: Component[];
  getComponent:<T extends Component>(componentId: IEntityId) => T | null;
  hasComponent: (componentType: number) => boolean;
  addComponent: <C extends Component>(component: Component) => Component[];
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

export interface IEntityObject {
  [key: IEntityId]: IEntity;
}

export interface SystemManager {
  systems: System[];
  getSystems: () => System[];
  enableSystem: (systemKey: string) => void;
  disableSystem: (systemKey: string) => void;
  enableSystems: (systemsKeys: string[]) => void;
  disableSystems: (systemsKeys: string[]) => void;
  registerSystem: (system: System) => void;
}

// const EntityManager = (): EntityManager => {};

export interface Component {
  type: string;
  eq: () => boolean;
}

export interface System {
  id: string;
  onAdd: (component: Component) => void;
  onUpdate: (newComponent: Component, oldComponent: Component) => void;
  onRemove: (newComponent: Component, oldComponent: Component) => void;
}

export interface Entity {
  id: string;
  components: Component[];
  getComponent: <ComponentType>(componentType: string) => ComponentType;
  hasComponent: (componentType: string) => boolean;
  addComponent: <Component>(component: Component) => Component;
  removeComponent: (componentType: string) => void;
}

export interface IEntityManager {
  entities: { [key: string]: Entity };
  getEntities: () => Entity[];
  getEntity: (entityId: string) => Entity;
  getEntitiesWithComponent: (componentId: string) => Entity[];
  createEntity: () => Entity;
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

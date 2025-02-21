import {IComponent, IECS, IEntity, IEntityManager, ISystemManager} from "./Types";
import {EntityManager} from "./EntityManager";
import SystemManager from "./SystemManager";

export class ECS implements IECS {
  readonly entityManager: IEntityManager;
  readonly systemManager: ISystemManager;

  constructor() {
    this.systemManager = new SystemManager(this);
    this.entityManager = new EntityManager(this);
  }

  onComponentAdded = (entity: IEntity, component: IComponent) => {};

  get SystemManager() {
    return this.systemManager;
  }

  get EntityManager() {
    return this.entityManager;
  }
}
import {IECS, IEntityManager, ISystemManager} from "./Types";
import {EntityManager} from "./EntityManager";
import SystemManager from "./SystemManager";

export default class ECS implements IECS {
  readonly entityManager: IEntityManager;
  readonly systemManager: ISystemManager;

  constructor() {
    this.systemManager = new SystemManager();
    this.entityManager = new EntityManager(this.systemManager);
  }
};
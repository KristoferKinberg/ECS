import { Entity, IEntityManager} from "./Types";

class EntityManager implements IEntityManager {
  entities = {};

  constructor() {
  }

  getEntities = () => Object.values(this.entities);

  getEntity = (entityId) => this.entities[entityId];

  getEntity: (entityId: string) => Entity;
  getEntitiesWithComponent: (componentId: string) => Entity[];
  createEntity: () => Entity;
}

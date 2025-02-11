import {IEntity, IEntityId, IEntityManager, IEntityObject} from "./Types";


class EntityManager implements IEntityManager {
  entities: IEntityObject = {};

  constructor() {}

  getEntities = () => Object.values(this.entities);

  getEntity = (entityId: IEntityId) => this.entities[entityId];

  getEntitiesWithComponent: (componentId: string) => ;

  createEntity: () => ;
}

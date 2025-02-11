import {IEntityId, IEntityManager, IEntityObject} from "./Types";
import Entity from "./Entity";

export class EntityManager implements IEntityManager {
  entities: IEntityObject = {};
  protected nextEntityId = 0;

  constructor() {}

  getEntities = () =>
    Object.values(this.entities);

  getEntity = (entityId: IEntityId) =>
    this.entities[entityId] || null;

  getEntitiesWithComponent = (componentId: number) =>
    this.getEntities().filter(entity => entity.hasComponent(componentId));

  createEntity = () => {
    const newEntity = new Entity(this.nextEntityId);
    this.entities = {
      ...this.entities,
      [this.nextEntityId]: newEntity,
    };

    this.nextEntityId++;
    return newEntity;
  };
}

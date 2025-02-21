import {IECS, IEntityId, IEntityManager, IEntityObject, ISystemManager} from "./Types";
import Entity from "./Entity";

export class EntityManager implements IEntityManager {
  entities: IEntityObject = {};
  protected nextEntityId = 0;

  constructor(readonly ECS: IECS) {}

  getEntities = () =>
    Object.values(this.entities).filter(entity => !entity.isDisposed);

  getEntity = (entityId: IEntityId) =>
    this.entities[entityId] || null;

  getEntitiesWithComponent = (componentId: number) =>
    this.getEntities().filter(entity => entity.hasComponent(componentId));

  createEntity = () => {
    const newEntity = new Entity(this.nextEntityId, this.ECS);
    this.entities = {
      ...this.entities,
      [this.nextEntityId]: newEntity,
    };

    this.nextEntityId++;
    return newEntity;
  };
}

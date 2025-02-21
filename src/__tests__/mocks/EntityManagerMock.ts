import {IECS, IEntityId, IEntityManager, IEntityObject} from "../../Types";
import {MockEntity} from "./MockEntity";

export class MockEntityManager implements IEntityManager {
  entities: IEntityObject = {};
  protected nextEntityId = 0;

  constructor(readonly ECS: IECS) {}

  getEntities = jest.fn(() => Object.values(this.entities).filter(entity => !entity.isDisposed));

  getEntity = jest.fn((entityId: IEntityId) => this.entities[entityId] || null);

  getEntitiesWithComponent = jest.fn((componentId: number) =>
    this.getEntities().filter(entity => entity.hasComponent(componentId))
  );

  createEntity = jest.fn(() => {
    const newEntity = new MockEntity(this.nextEntityId);
    this.entities = {
      ...this.entities,
      [this.nextEntityId]: newEntity,
    };
    this.nextEntityId++;
    return newEntity;
  });
}
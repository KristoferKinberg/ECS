import {EntityManager} from "../EntityManager";
import Entity from "../Entity";
import {MockECS} from "./mocks/MockECS";
import {MockComponent1, MockComponent2} from "./mocks/MockComponent";

describe('Test entityManager', () => {
  test('EntityManager.createEntity should create instance of Entity', () => {
    const ecs = new MockECS();
    const entityManager = new EntityManager(ecs);
    const entity = entityManager.createEntity()
    expect(entity).toBeInstanceOf(Entity);
  });

  test('EntityManager.createEntity should increment entityIds upon creation', () => {
    const ecs = new MockECS();
    const entityManager = new EntityManager(ecs);
    const entity1 = entityManager.createEntity()
    const entity2 = entityManager.createEntity()
    const entity3 = entityManager.createEntity()

    expect(entity1.id).toEqual(0);
    expect(entity2.id).toEqual(1);
    expect(entity3.id).toEqual(2);
  });

  test('EntityManager.getEntities should return 0 entities', () => {
    const ecs = new MockECS();
    const entityManager = new EntityManager(ecs);
    expect(entityManager.getEntities()).toEqual([]);
  });

  test('EntityManager.getEntities should return 2 entities', () => {
    const ecs = new MockECS();
    const entityManager = new EntityManager(ecs);
    entityManager.createEntity();
    entityManager.createEntity();

    expect(entityManager.getEntities().length).toEqual(2);
  });

  test('EntityManager.getEntity should return entity by id', () => {
    const ecs = new MockECS();
    const entityManager = new EntityManager(ecs);
    const entity1 = entityManager.createEntity();
    entityManager.createEntity();

    expect(entityManager.getEntity(0)).toEqual(entity1);
  });

  test('EntityManager.getEntity should return null', () => {
    const ecs = new MockECS();
    const entityManager = new EntityManager(ecs);

    expect(entityManager.getEntity(0)).toEqual(null);
  });

  test('EntityManager.getEntitiesWithComponent should return 2 Entities', () => {
    const ecs = new MockECS();
    const entityManager = new EntityManager(ecs);

    const entity1 = entityManager.createEntity();
    const entity2 = entityManager.createEntity();
    const entity3 = entityManager.createEntity();

    entity1.addComponent(new MockComponent1());
    entity2.addComponent(new MockComponent1());
    entity2.addComponent(new MockComponent2());
    entity3.addComponent(new MockComponent2());

    const [e1, e2] = entityManager.getEntitiesWithComponent(0);

    expect(e1).toBe(entity1);
    expect(e2).toBe(entity2);
  });
});

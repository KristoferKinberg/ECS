import {EntityManager} from "../EntityManager";
import {DummyComponent, DummyComponent2} from "./dummyComponents";
import Entity from "../Entity";

test('EntityManager.createEntity should create instance of Entity', () => {
  const entityManager = new EntityManager();
  const entity = entityManager.createEntity()
  expect(entity).toBeInstanceOf(Entity);
});

test('EntityManager.createEntity should increment entityIds upon creation', () => {
  const entityManager = new EntityManager();
  const entity1 = entityManager.createEntity()
  const entity2 = entityManager.createEntity()
  const entity3 = entityManager.createEntity()

  expect(entity1.id).toEqual(0);
  expect(entity2.id).toEqual(1);
  expect(entity3.id).toEqual(2);
});

test('EntityManager.getEntities should return 0 entities', () => {
  const entityManager = new EntityManager();
  expect(entityManager.getEntities()).toEqual([]);
});

test('EntityManager.getEntities should return 2 entities', () => {
  const entityManager = new EntityManager();
  entityManager.createEntity();
  entityManager.createEntity();

  expect(entityManager.getEntities().length).toEqual(2);
});

test('EntityManager.getEntity should return entity by id', () => {
  const entityManager = new EntityManager();
  const entity1 = entityManager.createEntity();
  entityManager.createEntity();

  expect(entityManager.getEntity(0)).toEqual(entity1);
});

test('EntityManager.getEntity should return null', () => {
  const entityManager = new EntityManager();

  expect(entityManager.getEntity(0)).toEqual(null);
});

test('EntityManager.getEntitiesWithComponent should return 2 Entities', () => {
  const entityManager = new EntityManager();

  const entity1 = entityManager.createEntity();
  const entity2 = entityManager.createEntity();
  const entity3 = entityManager.createEntity();

  entity1.addComponent(new DummyComponent());
  entity2.addComponent(new DummyComponent());
  entity2.addComponent(new DummyComponent2());
  entity3.addComponent(new DummyComponent2());

  const [e1, e2] = entityManager.getEntitiesWithComponent(0);

  expect(e1).toBe(entity1);
  expect(e2).toBe(entity2);
});

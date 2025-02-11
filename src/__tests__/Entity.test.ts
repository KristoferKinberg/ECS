import Entity from "../Entity";
import {DummyComponent, DummyComponent2} from "./dummyComponents";

test("Expect entity to be instance of entity", () => {
  const entity = new Entity(0);
  expect(entity).toBeInstanceOf(Entity);
});

test("Expect entity to have id 5", () => {
  const entity = new Entity(5);
  expect(entity.id).toBe(5);
});

test("Expect entity to have 0 components", () => {
  const entity = new Entity(0);
  expect(entity.components.length).toBe(0);
});

test("Expect entity to have one component", () => {
  const entity = new Entity(1);
  const dummyComponent = new DummyComponent();
  entity.addComponent<DummyComponent>(dummyComponent);

  expect(entity.components.length).toBe(1);
});

test("Expect entity to have two components", () => {
  const entity = new Entity(1);
  const dummyComponent = new DummyComponent();
  const dummyComponent2 = new DummyComponent2();
  entity.addComponent<DummyComponent>(dummyComponent);
  entity.addComponent<DummyComponent2>(dummyComponent2);

  expect(entity.components.length).toBe(2);
});

test("Expect entity to have dummyComponent", () => {
  const entity = new Entity(1);
  const dummyComponent = new DummyComponent();
  const dummyComponent2 = new DummyComponent2();
  entity.addComponent<DummyComponent>(dummyComponent);
  entity.addComponent<DummyComponent2>(dummyComponent2);

  expect(entity.hasComponent(0)).toBeTruthy();
});

test("Expect entity to not have dummyComponent2", () => {
  const entity = new Entity(1);
  const dummyComponent = new DummyComponent();
  const dummyComponent2 = new DummyComponent2();
  entity.addComponent<DummyComponent>(dummyComponent);

  expect(entity.hasComponent(1)).toBeFalsy();
});

test("Expect entitys component to be instance of dummyComponent", () => {
  const entity = new Entity(1);
  const dummyComponent = new DummyComponent();
  entity.addComponent<DummyComponent>(dummyComponent);
  const component = entity.getComponent<DummyComponent>(0);

  expect(component).toBeInstanceOf(DummyComponent);
});

test("Expect entitys component to be removed", () => {
  const entity = new Entity(1);
  const dummyComponent = new DummyComponent();
  entity.addComponent<DummyComponent>(dummyComponent);
  entity.removeComponent(0);

  expect(entity.components.length).toBe(0);
});

test("Expect entity to be disposed", () => {
  const entity = new Entity(1);
  const dummyComponent = new DummyComponent();
  entity.addComponent<DummyComponent>(dummyComponent);
  entity.removeComponent(0);

  expect(entity.components.length).toBe(0);
  expect(entity.isDisposed).toBeFalsy();
});

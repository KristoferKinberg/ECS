import Entity from "../Entity";
import {Component} from "../Types";

class DummyComponent implements Component {
  typeId: number = 0;

  eq= () => true;
}

class DummyComponent2 implements Component {
  typeId: number = 1;

  eq= () => true;
}

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

test("Expect entity to have a component", () => {
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

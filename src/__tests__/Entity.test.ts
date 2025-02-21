import Entity from "../Entity";
import { MockComponent1, MockComponent2} from "./mocks/MockComponent";
import {MockECS} from "./mocks/MockECS";

test("Expect entity to be instance of entity", () => {
  const mockECS = new MockECS();
  const entity = new Entity(0, mockECS);
  expect(entity).toBeInstanceOf(Entity);
});

test("Expect entity to have id 5", () => {
  const mockECS = new MockECS();
  const entity = new Entity(5, mockECS);
  expect(entity.id).toBe(5);
});

test("Expect entity to have 0 components", () => {
  const mockECS = new MockECS();
  const entity = new Entity(0, mockECS);
  expect(entity.components.length).toBe(0);
});

test("Expect entity to have one component", () => {
  const mockECS = new MockECS();
  const entity = new Entity(1, mockECS);
  const mockComponent = new MockComponent1();
  entity.addComponent<MockComponent1>(mockComponent);

  expect(entity.components.length).toBe(1);
});

test("Expect entity to have two components", () => {
  const mockECS = new MockECS();
  const entity = new Entity(1, mockECS);
  const mockComponent1 = new MockComponent1();
  const dummyComponent2 = new MockComponent2();
  entity.addComponent<MockComponent1>(mockComponent1);
  entity.addComponent<MockComponent2>(dummyComponent2);

  expect(entity.components.length).toBe(2);
});

test("Expect entity to have mockComponent1", () => {
  const mockECS = new MockECS();
  const entity = new Entity(1, mockECS);
  const mockComponent1 = new MockComponent1();
  const mockComponent2 = new MockComponent2();
  entity.addComponent<MockComponent1>(mockComponent1);
  entity.addComponent<MockComponent2>(mockComponent2);

  expect(entity.hasComponent(0)).toBeTruthy();
});

test("Expect entity to not have dummyComponent2", () => {
  const mockECS = new MockECS();
  const entity = new Entity(1, mockECS);
  const mockComponent1 = new MockComponent1();
  entity.addComponent<MockComponent1>(mockComponent1);

  expect(entity.hasComponent(1)).toBeFalsy();
});

test("Expect entitys component to be instance of mockComponent1", () => {
  const mockECS = new MockECS();
  const entity = new Entity(1, mockECS);
  const mockComponent = new MockComponent1();
  entity.addComponent<MockComponent1>(mockComponent);
  const component = entity.getComponent<MockComponent1>(0);

  expect(component).toBe(mockComponent);
});

test("Expect entitys component to be removed", () => {
  const mockECS = new MockECS();
  const entity = new Entity(1, mockECS);
  const mockComponent = new MockComponent1();
  entity.addComponent<MockComponent1>(mockComponent);
  entity.removeComponent(0);

  expect(entity.components.length).toBe(0);
});

test("Expect entity to be disposed", () => {
  const mockECS = new MockECS();
  const entity = new Entity(1, mockECS);
  const mockComponent = new MockComponent1();
  entity.addComponent<MockComponent1>(mockComponent);
  entity.removeComponent(0);

  expect(entity.components.length).toBe(0);
  expect(entity.isDisposed).toBeFalsy();
});

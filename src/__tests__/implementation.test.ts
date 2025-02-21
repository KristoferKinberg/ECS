import {describe, beforeEach, test} from "@jest/globals";
import {ECS} from "../ECS";
import {IEntity, IEntityManager, ISystemManager} from "../Types";
import System from "../System";
import {System1, System2} from "./dummyImplemenations/Systems";
import {Component1, Component2} from "./dummyImplemenations/Components";

describe('Test implementation', () => {
  let ecs: ECS;
  let entityManager: IEntityManager;
  let systemManager: ISystemManager;

  let system1: System;
  let system2: System;

  let entity1: IEntity;
  let entity2: IEntity;

  let component1 = new Component1();
  let component2 = new Component2();

  beforeEach(() => {
    ecs = new ECS();
    entityManager = ecs.EntityManager;
    systemManager = ecs.SystemManager;

    system1 = new System1();
    system2 = new System2();

    systemManager.registerSystem(system1);
    systemManager.registerSystem(system2);

    entity1 = entityManager.createEntity();
    entity2 = entityManager.createEntity();
  });

  test("On add component", () => {
    const spyOnAddInSystem1 = jest.spyOn(system1, "onAdd");
    const spyOnAddInSystem2 = jest.spyOn(system2, "onAdd");

    entity1.addComponent(component1);

    expect(spyOnAddInSystem1).toHaveBeenCalledTimes(1);
    expect(spyOnAddInSystem2).toHaveBeenCalledTimes(0);
  });

  test("On update component", () => {
    const spyOnUpdateInSystem1 = jest.spyOn(system1, "onUpdate");

    entity1.addComponent(component1);
    entity1.addComponent(component1);

    expect(spyOnUpdateInSystem1).toHaveBeenCalledTimes(1);
  });

  test("On remove component", () => {
    const spyOnRemoveInSystem1 = jest.spyOn(system1, "onRemove");

    entity1.addComponent(component1);
    entity1.removeComponent(component1.typeId);

    expect(spyOnRemoveInSystem1).toHaveBeenCalledTimes(1);
  });
});
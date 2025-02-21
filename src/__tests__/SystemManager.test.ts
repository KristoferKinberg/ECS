import SystemManager from "../SystemManager";
import {MockECS} from "./mocks/MockECS";
import {MockSystem} from "./mocks/MockSystem";
import {beforeEach, describe, test} from "@jest/globals";
import {IComponent, IECS} from "../Types";
import {MockComponent1} from "./mocks/MockComponent";
import Entity from "../Entity";
import {EntityManager} from "../EntityManager";
import {MockEntityManager} from "./mocks/EntityManagerMock";

describe("test SystemManager", () => {
  let mockedEcs: IECS;
  let systemManager: SystemManager;
  let entityManager: EntityManager;
  let system1: MockSystem;
  let component: IComponent;
  let entity: Entity;

  beforeEach(() => {
    mockedEcs = new MockECS();
    systemManager = new SystemManager(mockedEcs);
    system1 = new MockSystem('system1', 0);
    component = new MockComponent1();
    entityManager = new MockEntityManager(mockedEcs);
    entity = entityManager.createEntity();
  });

  test('should register a system', () => {
    systemManager.registerSystem(system1);
    expect(systemManager.Systems).toContain(system1);
  });

  test('should handle added component', () => {
    systemManager.registerSystem(system1);
    systemManager.onAddComponent(entity, component);
    expect(system1.onAdd).toHaveBeenCalledWith(entity, component);
  });
});

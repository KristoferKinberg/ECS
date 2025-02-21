import {ECS} from "../ECS";
import {EntityManager} from "../EntityManager";
import SystemManager from "../SystemManager";

test("Expect ECS to have instance of EntityManager and SystemManager", () => {
  const ecs = new ECS();

  expect(ecs.EntityManager).toBeInstanceOf(EntityManager);
  expect(ecs.SystemManager).toBeInstanceOf(SystemManager);
});
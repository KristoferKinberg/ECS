import {IECS} from "../../Types";
import {MockSystemManager} from "./MockSystemManager";
import {ECS} from "../../ECS";
import {MockEntityManager} from "./EntityManagerMock";

export class MockECS extends ECS {
  entityManager: MockEntityManager;
  systemManager: MockSystemManager;

  constructor() {
    super();
    this.entityManager = new MockEntityManager((this as unknown as IECS));
    this.systemManager = new MockSystemManager(this as unknown as IECS);
  }
}
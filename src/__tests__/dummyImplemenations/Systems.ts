import System from "../../System";
import Entity from "../../Entity";
import {Component1, Component2, ComponentIds} from "./Components";

export class System1 extends System {
  constructor() {
    super(ComponentIds.Component1);
  }

  onAdd = (entity: Entity, component: Component1)=> {}

  onUpdate = (entity: Entity, oldComponent: Component1, newComponent: Component1)=> {}

  onRemove = (entity: Entity, oldComponent: Component1) => {}
}

export class System2 extends System {
  constructor() {
    super(ComponentIds.Component2);
  }

  onAdd = (entity: Entity, component: Component2) => {}

  onUpdate = (entity: Entity, oldComponent: Component2, newComponent: Component2) => {}

  onRemove = (entity: Entity, oldComponent: Component2) => {}
}
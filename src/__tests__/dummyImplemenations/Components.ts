import {IComponent} from "../../Types";

export const ComponentIds = {
  Component1: 1,
  Component2: 2,
}

export class Component1 implements IComponent {
  typeId: number = ComponentIds.Component1;

  eq = () => true;
}

export class Component2 implements IComponent {
  typeId: number = ComponentIds.Component2;

  eq = () => true;
}
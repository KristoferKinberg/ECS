import {IComponent} from "../../Types";

export class MockComponent1 implements IComponent {
  typeId: number = 0;

  eq= () => true;
}

export class MockComponent2 implements IComponent {
  typeId: number = 1;

  eq= () => true;
}

import {IComponent} from "../Types";

export class DummyComponent implements IComponent {
  typeId: number = 0;

  eq= () => true;
}

export class DummyComponent2 implements IComponent {
  typeId: number = 1;

  eq= () => true;
}
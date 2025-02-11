import {Component} from "../Types";

export class DummyComponent implements Component {
  typeId: number = 0;

  eq= () => true;
}

export class DummyComponent2 implements Component {
  typeId: number = 1;

  eq= () => true;
}
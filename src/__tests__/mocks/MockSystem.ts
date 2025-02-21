import {IComponent, IEntity, ISystem} from "../../Types";

export class MockSystem implements ISystem {
  id: string;
  componentType: number;
  constructor(id: string, componentType: number) {
    this.id = id;
    this.componentType = componentType;
  }
  onAdd = jest.fn((entity: IEntity, component: IComponent) => {});
  onUpdate = jest.fn((entity: IEntity, newComponent: IComponent, oldComponent: IComponent) => {});
  onRemove = jest.fn((entity: IEntity, oldComponent: IComponent) => {});
}

import {Component, IEntity} from "./Types";

export default class Entity implements IEntity {
  public components: Component[] = [];
  public isDisposed: boolean = false;
  public id: number;

  constructor(id: number) {
    this.id = id;
  };

  public get Id() {
    return this.id;
  }

  public hasComponent(componentId: number) {
    return !!this.getComponent(componentId);
  }

  public getComponent<T extends Component>(componentId: T["typeId"]): T | null {
    const component = this.components.find(({ typeId }) => componentId === typeId);
    return component ? (component as T) : null;
  }

  public addComponent<T extends Component>(component: T): Component[] {
    if (this.isDisposed) throw new Error("Entity is disposed");

    this.components = [
      ...this.components,
      component
    ];

    return this.components;
  }

  public removeComponent(componentId: number) {
    this.components = this.components.filter(component => component.typeId !== componentId)
  }

  public dispose() {
    this.isDisposed = true;
    this.components = [];
  }
};
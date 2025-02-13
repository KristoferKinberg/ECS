import {IComponent, IEntity, ISystemManager} from "./Types";

export default class Entity implements IEntity {
  public components: IComponent[] = [];
  public isDisposed: boolean = false;
  public id: number;

  private systemManager: ISystemManager;

  constructor(id: number, systemManager: ISystemManager) {
    this.id = id;
    this.systemManager = systemManager;
  };

  public get Id() {
    return this.id;
  }

  public hasComponent(componentId: number) {
    return !!this.getComponent(componentId);
  }

  public getComponent<T extends IComponent>(componentId: T["typeId"]): T | null {
    const component = this.components.find(({ typeId }) => componentId === typeId);
    return component ? (component as T) : null;
  }

  public addComponent<T extends IComponent>(component: T): IComponent[] {
    if (this.isDisposed) throw new Error(ERRORS.ENTITY_IS_DISPOSED);

    this.components = [
      ...this.components,
      component
    ];

    this.systemManager.handleAddedComponent(this, component);
    return this.components;
  }

  public removeComponent(componentId: number) {
    const component = this.getComponent(componentId);
    if (!component) return;

    this.components = this.components.filter(component => component.typeId !== componentId);
    this.systemManager.onRemoveComponent(this, component)
  }

  public dispose() {
    this.isDisposed = true;
    this.components = [];
  }
};
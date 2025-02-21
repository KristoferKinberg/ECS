import {IComponent, IECS, IEntity, ISystemManager} from "./Types";

export default class Entity implements IEntity {
  public components: IComponent[] = [];
  public isDisposed: boolean = false;
  public id: number;

  constructor(id: number, protected readonly ECS: IECS) {
    this.id = id;
  };

  public get Id() {
    return this.id;
  }

  protected handleAddedComponent = (newComponent: IComponent, existingComponent: IComponent | null) => {
    return existingComponent
      ? this.ECS.systemManager.onUpdateComponent(this, existingComponent, newComponent)
      : this.ECS.systemManager.onAddComponent(this, newComponent);
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
    const existingComponent = this.getComponent(component.typeId) || null;

    this.components = [
      ...this.components.filter(c => c.typeId !== component?.typeId),
      component
    ];

    this.handleAddedComponent(component, existingComponent);
    return this.components;
  }

  public removeComponent(componentId: number) {
    const component = this.getComponent(componentId);
    if (!component) return;

    this.components = this.components.filter(component => component.typeId !== componentId);
    this.ECS.systemManager.onRemoveComponent(this, component)
  }

  public dispose() {
    this.isDisposed = true;
    this.components = [];
  }
};
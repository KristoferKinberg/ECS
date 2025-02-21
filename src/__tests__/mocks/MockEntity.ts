import {IComponent, IEntity} from "../../Types";

export class MockEntity implements IEntity {
  id: number;
  isDisposed: boolean = false;
  components: IComponent[] = [];
  constructor(id: number) {
    this.id = id;
  }
  getComponent<T extends IComponent>(componentId: number): T | null {
    return (this.components.find(c => c.typeId === componentId) as T) || null;
  }
  hasComponent(componentType: number): boolean {
    return this.components.some(c => c.typeId === componentType);
  }
  addComponent<C extends IComponent>(component: IComponent): IComponent[] {
    this.components.push(component);
    return this.components;
  }
  removeComponent(componentType: number): void {
    this.components = this.components.filter(c => c.typeId !== componentType);
  }
  dispose(): void {
    this.isDisposed = true;
  }
}

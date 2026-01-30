import { World } from ".";
import { type Group, Matrix4 } from "three";

import { createMeshGroup } from "../components/meshGroup";

class Space extends World {
  protected meshGroup: Group;
  constructor(
    container: HTMLElement,
    sceneSize: string = "1-2",
    matrix: Matrix4,
  ) {
    super(container, sceneSize, matrix);
    this.meshGroup = createMeshGroup();
    this.loop.updateTables.push(this.meshGroup);
    this.scene.add(this.meshGroup);
    this.camera.add(this.light);
  }

  render(): void {
    this.renderer.render(this.scene, this.camera);
  }
}

export { Space };

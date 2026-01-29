import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
} from "three";
import type { Position } from "./light";
const spec = {
  color: "purple",
};
const createCube = (rotation: Position = { x: 1, y: 0.5, z: 0.5 }) => {
  // create a geometry
  const geometry = new BoxGeometry(2, 2, 2);

  // create a default (white) Basic material
  const material = new MeshBasicMaterial();

  // 创建就有物理意义的材质
  const physicallyMaterial = new MeshStandardMaterial(spec);

  // create a Mesh containing the geometry and material
  const cube = new Mesh(geometry, physicallyMaterial);

  //设置旋转
  const { x, y, z } = rotation;
  cube.rotation.set(x, y, z);

  return cube;
};

export { createCube };

import {
  Group,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  SphereGeometry,
} from "three";

function createMeshGroup() {
  const group = new Group();
  //材质
  const material = new MeshStandardMaterial({
    color: "indigo",
  });
  //几何体
  const geometry = new SphereGeometry(0.25, 16, 16);
  //网格对象
  const protoSphere = new Mesh(geometry, material);
  //克隆protoSphere;
  for (let i = 0; i < 1; i += 0.05) {
    const sphere = protoSphere.clone();
    sphere.position.x = Math.cos(2 * Math.PI * i);
    sphere.position.y = Math.sin(2 * Math.PI * i);
    group.add(sphere);
  }
  group.scale.multiplyScalar(2);
  (group as any).tick = (delta: number) => {
    const radiansPerSecond = MathUtils.degToRad(30);
    group.rotation.z -= delta * radiansPerSecond;
  };

  return group;
}

export { createMeshGroup };

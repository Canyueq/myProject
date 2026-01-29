import { DirectionalLight } from "three";

interface Position {
  x: number;
  y: number;
  z: number;
}
const createLights = (position: Position = { x: 10, y: 10, z: 10 }) => {
  // Create a directional light
  //创建定位灯光，传入颜色和光强
  const light = new DirectionalLight("white", 8);

  //设置灯源位置
  const { x, y, z } = position as any;
  light.position.set(x, y, z);
  console.log("position", position);
  return light;
};

export { createLights };
export type { Position };

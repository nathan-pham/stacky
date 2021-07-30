import * as THREE from "https://esm.sh/three"
import Sketch from "./classes/Sketch.js"

const sketch = new Sketch({container: "#webgl__container"})

sketch.scene.background = new THREE.Color(0x006600)

sketch.render()
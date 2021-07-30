import * as THREE from "https://esm.sh/three"
import Sketch from "./classes/Sketch.js"
import Block from "./classes/objects/Block.js"
import AmbientLight from "./classes/objects/lights/AmbientLight.js"
import DirectionalLight from "./classes/objects/lights/DirectionalLight.js"

const sketch = new Sketch({container: "#webgl__container"})

sketch.scene.background = new THREE.Color(0x00000)

sketch.add(
    new Block([3, 1, 3]),
    new AmbientLight(),
    new DirectionalLight()
)

sketch.render()
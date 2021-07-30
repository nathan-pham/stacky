import * as THREE from "https://esm.sh/three"
import Sketch from "./classes/Sketch.js"
import Block from "./classes/objects/Block.js"
import AmbientLight from "./classes/objects/lights/AmbientLight.js"
import DirectionalLight from "./classes/objects/lights/DirectionalLight.js"

const sketch = new Sketch({container: "#webgl__container"})

sketch.scene.background = new THREE.Color(0x00000)

const layer = (x, z, width, depth, direction) => {
    const blocks = sketch.objects.filter(object => object?.type == "block")
    const height = 1
    const y = height * blocks.length

    const color = new THREE.Color(`hsl(${30 + blocks.length * 4}, 100%, 50%)`)
    const block = new Block({size: [width, height, depth], position: [x, y, z], color})
    block.direction = direction

    return block
}

sketch.add(
    new AmbientLight(),
    new DirectionalLight()
)

sketch.add(layer(0, 0, 3, 3, "x"))
sketch.add(layer(0, 0, 3, 3, "z"))

sketch.render()
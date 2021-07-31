import * as THREE from "https://esm.sh/three"
import Sketch from "./classes/Sketch.js"
import DirectionalLight from "./classes/objects/lights/DirectionalLight.js"
import AmbientLight from "./classes/objects/lights/AmbientLight.js"
import Floor from "./classes/objects/Floor.js"
import createOverhang from "./hooks/createOverhang.js"
import createLayer from "./hooks/createLayer.js"
import useCamera from "./hooks/useCamera.js"
import useRemove from "./hooks/useRemove.js"

const sketch = new Sketch({container: "#webgl__container"})
sketch.scene.background = new THREE.Color(0x00000)

sketch.use(useCamera)
sketch.use(useRemove)

sketch.add(new AmbientLight(), new DirectionalLight(), new Floor(), createLayer(sketch.objects, 0, 0, 3, 3, "none"))

sketch.render()

const interaction = () => {
    const blocks = sketch.objects.filter(object => object?.type == "block")
    const newDirection = blocks.length % 2 == 0 ? "z" : "x"
    
    if(blocks.length > 1) {
        const topBlock = blocks[blocks.length - 1]
        const topDirection = topBlock.direction

        const previousBlock = blocks[blocks.length - 2]

        const delta = topBlock.object.position[topDirection] - previousBlock.object.position[topDirection]

        const size = topDirection == "x" 
            ? topBlock.geometry.parameters.width * topBlock.object.scale.x
            : topBlock.geometry.parameters.depth * topBlock.object.scale.z

        const overlap = size - Math.abs(delta)

        if(overlap > 0) {
            topBlock.object.scale[topDirection] = overlap / size
            topBlock.object.position[topDirection] -= delta / 2

            topBlock.cannon.shapes[0].halfExtents[topDirection] *= overlap / size
            topBlock.cannon.position[topDirection] -= delta / 2

            const newWidth = newDirection == "x" ? overlap : topBlock.geometry.parameters.width * topBlock.object.scale.x
            const newDepth = newDirection == "z" ? overlap : topBlock.geometry.parameters.depth * topBlock.object.scale.z
            const x = newDirection == "x" ? topBlock.object.position.x : -10
            const z = newDirection == "z" ? topBlock.object.position.z : -10
            
            const overhangShift = (overlap / 2 + Math.abs(delta) / 2) * Math.sign(delta)
            const overhangX = newDirection == "x" ? topBlock.object.position.x + overhangShift : topBlock.object.position.x
            const overhangZ = newDirection == "z" ? topBlock.object.position.z + overhangShift : topBlock.object.position.z
            const overhangWidth = newDirection == "x" ? Math.abs(delta) : newWidth
            const overhangDepth = newDirection == "z" ? Math.abs(delta) : newDepth

            sketch.add(createOverhang(overhangX, blocks.length - 1, overhangZ, overhangWidth, overhangDepth))
            sketch.add(createLayer(sketch.objects, x, z, newWidth, newDepth, newDirection == "x" ? "z" : "x"))
        }
    } else {
        const x = newDirection == "x" ? 0 : -10
        const z = newDirection == "z" ? 0 : -10
        sketch.add(createLayer(sketch.objects, x, z, 3, 3, newDirection == "x" ? "z" : "x"))
    }
}

document.body.addEventListener("click", interaction)
document.body.addEventListener("keypress", e => {
    if(e.key == " ") {interaction()}
})
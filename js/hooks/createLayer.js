import * as THREE from "https://esm.sh/three"
import Block from "../classes/objects/Block.js"

export default function createLayer(objects, x, z, width, depth, direction) {
    const blocks = objects.filter(object => object?.type == "block")
    const y = 1 * blocks.length

    const color = new THREE.Color(`hsl(${30 + blocks.length * 4}, 100%, 50%)`)
    const block = new Block({size: [width, 1, depth], position: [x, y, z], color})
    block.direction = direction || "none"

    return block
}
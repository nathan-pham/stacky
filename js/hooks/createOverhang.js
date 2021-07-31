import * as THREE from "https://esm.sh/three"
import Block from "../classes/objects/Block.js"

export default function createOverhang(x, y, z, width, depth) {
    const color = new THREE.Color(`hsl(${30 + y * 4}, 100%, 50%)`)
    const block = new Block({size: [width, 1, depth], position: [x, y, z], color, overhang: true})
    return block
}
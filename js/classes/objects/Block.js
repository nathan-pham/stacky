import * as THREE from "https://esm.sh/three"

export default class Block {
    type = "block"
    direction = "x"

    constructor({size=[1, 1, 1], position=[0, 0, 0], color=0xfb8e00}={}) {
        this.geometry = new THREE.BoxGeometry(...size)
        this.material = new THREE.MeshLambertMaterial({color})

        const mesh = new THREE.Mesh(this.geometry, this.material)
        mesh.position.set(...position)
        mesh.receviveShadow = true
        mesh.castShadow = true

        this.object = mesh
    }
}
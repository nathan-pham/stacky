import * as THREE from "https://esm.sh/three"

export default class Block {
    constructor(size=[1, 1, 1]) {
        this.geometry = new THREE.BoxGeometry(...size)
        this.material = new THREE.MeshLambertMaterial({color: 0xfb8e00})

        const mesh = new THREE.Mesh(this.geometry, this.material)
        mesh.receviveShadow = true
        mesh.castShadow = true

        this.object = mesh
    }
}
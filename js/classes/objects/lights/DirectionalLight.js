import * as THREE from "https://esm.sh/three"

export default class DirectionalLight {
    constructor() {
        this.object = new THREE.DirectionalLight(0xffffff, 0.6)
        this.object.position.set(10, 20, 0)
    }
}
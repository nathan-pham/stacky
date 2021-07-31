import * as THREE from "https://esm.sh/three"

export default class Block {
    type = "block"
    direction = "none"

    constructor({size=[1, 1, 1], position=[0, 0, 0], color=0xfb8e00, overhang}={}) {
        this.geometry = new THREE.BoxGeometry(...size)
        this.material = new THREE.MeshLambertMaterial({color})

        const mesh = new THREE.Mesh(this.geometry, this.material)
        mesh.position.set(...position)
        mesh.receviveShadow = true
        mesh.castShadow = true

        this.object = mesh

        if(overhang) {
            this.type = "overhang"
            this.direction = "none"
        }
    }

    update({objects}) {
        if(this.type == "block") {
            if(objects[objects.length - 1] == this) {
                if(["x", "z"].includes(this.direction)) {
                    this.object.position[this.direction] += 0.15
                }
            }
        } else {

        }
    }
}
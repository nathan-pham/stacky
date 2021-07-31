import * as CANNON from "https://esm.sh/cannon"
import * as THREE from "https://esm.sh/three"

export default class Block {
    type = "block"
    direction = "none"

    constructor({size=[1, 1, 1], position=[0, 0, 0], color=0xfb8e00, overhang}={}) {
        if(overhang) {
            this.type = "overhang"
            this.direction = "none"
        }

        this.object = this.createMesh(size, position, color)
        this.cannon = this.createPhysics(overhang)
    }

    createMesh(size, position, color) {
        this.geometry = new THREE.BoxGeometry(...size)
        this.material = new THREE.MeshLambertMaterial({color})

        const mesh = new THREE.Mesh(this.geometry, this.material)
        mesh.position.set(...position)
        mesh.receviveShadow = true
        mesh.castShadow = true

        return mesh
    }

    createPhysics(overhang) {
        const {width, height, depth} = this.geometry.parameters

        const cube = new CANNON.Body({
            mass: overhang ? 100 : 0,
            shape: new CANNON.Box(new CANNON.Vec3(width / 2, height / 2, depth / 2)) 
        })

        cube.position.copy(this.object.position)
        return cube
    }

    update({objects}) {
        if(this.type == "block") {
            if(objects[objects.length - 1] == this) {
                if(["x", "z"].includes(this.direction)) {
                    this.object.position[this.direction] += 0.15
                    this.cannon.position.copy(this.object.position)
                    this.cannon.quaternion.copy(this.object.quaternion)
                }
            }
        } else {
            this.object.position.copy(this.cannon.position)
            this.object.quaternion.copy(this.cannon.quaternion)
        }
    }
}
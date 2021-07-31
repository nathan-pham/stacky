import * as CANNON from "https://esm.sh/cannon"
import * as THREE from "https://esm.sh/three"

export default class Floor {
    constructor() {
        this.object = this.createMesh()
        this.cannon = this.createBody()        
    }

    createMesh() {
        this.geometry = new THREE.PlaneGeometry(200, 200)
        this.material = new THREE.MeshPhongMaterial({color: 0xffffff, opacity: 0, transparent: true})
        // depthWrite: false (x-ray)

        const mesh = new THREE.Mesh(this.geometry, this.material)
        mesh.position.y -= 0.5
        mesh.rotation.x = -Math.PI / 2
        mesh.receiveShadow = true
        mesh.castShadow = true
        return mesh
    }

    createBody() {
        const plane = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Plane(),
        })
    
        plane.position.copy(this.object.position)
        plane.quaternion.setFromEuler(-Math.PI / 2, 0, 0) 
            
        return plane
    }

}
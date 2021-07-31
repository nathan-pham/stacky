import {OrbitControls} from "https://esm.sh/three/examples/jsm/controls/OrbitControls"
import * as CANNON from "https://esm.sh/cannon"
import * as THREE from "https://esm.sh/three"

export default class Sketch {
    clock = new THREE.Clock()
    delta = 0

    objects = []
    hooks = []

    constructor({container=document.body, controls}={}) {
        this.container = typeof container == "string" ? document.querySelector(container) : container
        this.dimensions = {width: this.container.offsetWidth, height: this.container.offsetHeight}

        this.createWorld()
        this.createScene()
        this.createCamera()
        this.createRenderer()

        if(controls) {
            this.createControls()
        }
        
        // if(debug) {
        //     cannonDebugger(this.scene, this.world.bodies)
        // }

        window.addEventListener("resize", this.resize.bind(this))
        this.resize()
    }

    get aspect() {
        return this.dimensions.width / this.dimensions.height
    }

    add(...objects) {
        objects = objects.flat(Infinity)
        
        for(const object of objects) {
            this.objects.push(object)
            this.scene.add(object.object || object)

            if(object.cannon) {
                this.world.addBody(object.cannon)
            }
        }
    }

    remove(object) {
        this.scene.traverse(child => {
            if(child.name == object.object?.name) {
                this.scene.remove(object.object)
            }
        })

        this.world.remove(object.cannon)
    }

    use(updateHook) {
        this.hooks.push(updateHook)
    }
    
    resize() {
        this.dimensions = {width: this.container.offsetWidth, height: this.container.offsetHeight}

        this.camera.aspect = this.aspect
        this.camera.updateProjectionMatrix()

        this.renderer.setSize(this.dimensions.width, this.dimensions.height)
    }

    createWorld() {
        this.world = new CANNON.World()
        this.world.gravity.set(0, -9.87, 0)
    }

    createScene() {
        this.scene = new THREE.Scene()
    }

    createCamera() {
        const width = 10
        const height = width / this.aspect

        this.camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 100)
        this.camera.position.set(4, 4, 4)
        this.camera.lookAt(new THREE.Vector3(0, 0, 0))
    }
    
    createRenderer() {
        this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true})

        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap

        this.renderer.setSize(this.dimensions.width, this.dimensions.height)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        this.container.appendChild(this.renderer.domElement)
    }
    
    createControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.target.set(0, 0, 0)
        this.controls.update()
    }

    render() {
        this.delta = this.clock.getDelta()
        this.world.step(1 / 60, this.delta)
        
        for(const hook of this.hooks) {
            hook(this)
        }

        for(const object of this.objects) {
            if(typeof object.update == "function") {
                object.update(this)
            }
        }

        
        this.renderer.render(this.scene, this.camera)
        window.requestAnimationFrame(this.render.bind(this))
    }
}
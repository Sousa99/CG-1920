var geometry, material, mesh, texture
const RADIUS_BALL = 5
const DISTANCE_BALL = 40

const ACCELARATION = 0.0005
const MAX_VELOCITY = 0.075

class Ball extends THREE.Object3D {
    constructor() {
        super()

        this.changeState = false

        this.accelarating = false
        this.accelaration = 0
        this.velocity = 0
        this.angle = 0

        this.axis = new THREE.AxesHelper(3 * RADIUS_BALL)
        this.add(this.axis)

        texture = new THREE.TextureLoader().load('./assets/Lenna.png')
        //texture.wrapS = texture.wrapT = THREE.RepeatWrapping
        //texture.repeat.set(2, 2)

        material = new THREE.MeshPhongMaterial({ color: 0xFFFFFF,
            map: texture,
            wireframe: false })

        geometry = new THREE.SphereGeometry(RADIUS_BALL, 10, 10)
        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(0, 0, 0)
        mesh.castShadow = true
        mesh.receiveShadow = true
        
        this.add(mesh)
        this.position.set(DISTANCE_BALL * Math.cos(this.angle), RADIUS_BALL, DISTANCE_BALL * Math.sin(this.angle))
    }

    move() {
        'use strict'

        this.changeMovement()

        this.velocity += this.accelaration
        if (this.velocity < 0 && !this.accelarating) {
            this.accelaration = 0
            this.velocity = 0
        } else if (this.velocity > MAX_VELOCITY && this.accelarating) {
            this.accelaration = 0
            this.velocity = MAX_VELOCITY
        }

        this.angle += this.velocity

        this.position.x = DISTANCE_BALL * Math.cos(this.angle)
        this.position.z = DISTANCE_BALL * Math.sin(this.angle)
    }

    changeMovement() {
        'use strict'

        if (!this.changeState)
            return

        if (!this.accelarating) this.accelaration = ACCELARATION
        else this.accelaration = - ACCELARATION

        this.accelarating = !this.accelarating
        this.changeState = false
    }
}
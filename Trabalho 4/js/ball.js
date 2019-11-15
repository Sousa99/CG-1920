var geometry, material, mesh, texture
const RADIUS_BALL = 5
const DISTANCE_BALL = 40

const ACCELARATION = 0.0005
const MAX_VELOCITY = 0.065

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

        material = new THREE.MeshPhongMaterial({ color: 0xFFFFFF,
            map: texture,
            shininess: 70,
            wireframe: false })

        geometry = new THREE.SphereGeometry(RADIUS_BALL, 20, 20)
        this.mesh = new THREE.Mesh(geometry, material)
        this.mesh.position.set(0, 0, 0)
        this.mesh.castShadow = true
        this.mesh.receiveShadow = true
        
        this.add(this.mesh)
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
        this.angle %= 2 * Math.PI
        this.rotateY(-1 * this.velocity)
        this.mesh.rotateX(this.velocity * 5 / RADIUS_BALL);

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
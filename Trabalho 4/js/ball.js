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

        texture = new THREE.TextureLoader().load('./assets/Lenna.png')

        material = { 
            basic: { color: 0xFFFFFF,
                map: texture,
                wireframe: false},
            phong : { color: 0xFFFFFF,
                map: texture,
                wireframe: false,
                shininess: 200,
                specular: 0xFFFFFF}
        }

        geometry = new THREE.SphereGeometry(RADIUS_BALL, 20, 20)
        this.mesh = new Mesh(geometry, material)
        this.mesh.position.set(0, 0, 0)
        this.mesh.castShadow = true
        this.mesh.receiveShadow = true
        
        this.add(this.mesh)
        this.position.set(DISTANCE_BALL * Math.cos(this.angle), RADIUS_BALL, DISTANCE_BALL * Math.sin(this.angle))
    }

    move() {
        'use strict'

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

    changeMovement(paused) {
        'use strict'

        if (!this.changeState || paused) {
            this.changeState = false
            return
        }

        if (!this.accelarating) this.accelaration = ACCELARATION
        else this.accelaration = - ACCELARATION

        this.accelarating = !this.accelarating
        this.changeState = false
    }
}
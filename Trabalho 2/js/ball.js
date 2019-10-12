var geometry, material, mesh

class Ball extends THREE.Object3D {
    constructor(x, y, z, horizontalAngle = 0, verticalAngle = 0) {
        super()

        this.velocity = new THREE.Vector3(0, 0, 0)
        this.verticalAngle = verticalAngle
        this.horizontalAngle = horizontalAngle
        
        this.falling = false
        var axesHelper = new THREE.AxesHelper( 5 );
        axesHelper.position.set(0, 2, 0)
        this.add(axesHelper)

        geometry = new THREE.SphereGeometry(RADIUS_BALL, 10, 10)
        material = new THREE.MeshBasicMaterial({ color: 0x99ff99, wireframe: true })
        this.mesh = new THREE.Mesh(geometry, material)
        this.mesh.position.set(0, 2, 0)
        this.add(this.mesh)

        this.position.set(x, y, z)
    }

    move() {
        'use strict'
        // Updates to velocity
        this.gravity()

        // Check limits
        if (Math.abs(this.position.z) < 25 - RADIUS_BALL && this.position.x > - 21 + RADIUS_BALL && this.position.x < 25 - RADIUS_BALL && this.position.y < 0) {
            this.velocity.y = 0
            this.position.y = 0
        }

        if (Math.abs(this.position.z) > 25 - RADIUS_BALL && !(Math.abs(this.position.z) > 28 + RADIUS_BALL) && this.position.x < 25 - RADIUS_BALL) {
            this.velocity.z = - this.velocity.z
            if (this.position.z > 25 - RADIUS_BALL)
                this.position.z = 25 - RADIUS_BALL
            if (this.position.z < - 25 + RADIUS_BALL)
                this.position.z = - 25 + RADIUS_BALL
        }

        if (this.position.x < - 21 + RADIUS_BALL && Math.abs(this.position.z) < 25 - RADIUS_BALL) {
            this.velocity.x = - this.velocity.x
            this.position.x = - 21 + RADIUS_BALL
        }

        // Move
        this.translateOnAxis(this.velocity, 1)
    }

    gravity() {
        'use strict'
        if (this.falling)
            this.velocity.y += - 9.8 * PROPORTION / FRAMERATE
    }

    changeColor(color) {
        'use strict'

        var toChange = new Array()
            toChange = toChange.concat(this)
            while (toChange.length > 0) {
                var current = toChange.shift()
                
                if (current.type == "Object3D")
                    toChange = toChange.concat(current.children)
                else if (current.type == "Mesh")
                    current.material.color.set(color)
            }
    }
}

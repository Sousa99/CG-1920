var geometry, material, mesh

class Ball extends THREE.Object3D {
    constructor(x, y, z, horizontalAngle = 0, verticalAngle = 0, showAxis = false) {
        super()
        this.matrixAutoUpdate = false
        var transformMatrix = new THREE.Matrix4()
        transformMatrix.set(Math.cos(horizontalAngle + Math.PI),    0, Math.sin(horizontalAngle + Math.PI), x,
                            0,                                      1, 0,                                   y,
                            - Math.sin(horizontalAngle + Math.PI),  0, Math.cos(horizontalAngle + Math.PI), z,
                            0,                                      0, 0,                                   1 )

        this.velocity = new THREE.Vector3(0, 0, 0)
        this.verticalAngle = verticalAngle
        this.horizontalAngle = horizontalAngle

        this.collision = false
        this.collidedBalls = []
        
        this.falling = true
        this.showingAxis = showAxis

        this.axesHelper = new THREE.AxesHelper( 5 )
        this.axesHelper.position.set(0, 2, 0)
        if (this.showingAxis) this.add(this.axesHelper)

        geometry = new THREE.SphereGeometry(RADIUS_BALL, 10, 10)
        material = new THREE.MeshBasicMaterial({ color: 0x00cc99, wireframe: true })
        this.mesh = new THREE.Mesh(geometry, material)
        this.mesh.position.set(0, 2, 0)
        this.add(this.mesh)
        
        this.applyMatrix(transformMatrix)
    }

    move() {
        'use strict'

        // Updates to velocity
        this.collisionBalls()
        this.treatCollisionBalls()
        this.gravity()
        this.collisionWall()
        this.slowDown()

        var m = new THREE.Matrix4()
        m.set(1, 0, 0, this.velocity.x,
       		  0, 1, 0, this.velocity.y,
       		  0, 0, 1, this.velocity.z,
              0, 0, 0, 1 )
        
        this.applyMatrix(m)
    }

    gravity() {
        'use strict'
        if (this.falling)
            this.velocity.y += - 9.8 * PROPORTION / FRAMERATE
    }

    slowDown() {
        'use strict'
        if (this.velocity.x != 0)
            this.velocity.x = 0.995 * this.velocity.x
        if (this.velocity.z != 0)
            this.velocity.z = 0.995 * this.velocity.z
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

    showAxis() {
        if (this.showingAxis) this.remove(this.axesHelper)
        else this.add(this.axesHelper)

        this.showingAxis = !this.showingAxis
    }

    deleteBall() {
        'use strict'

        if (this.position.y >= -50)
            return

        if (this == selectedBall) {
            selectedBall.remove(cameras[2])
            selectedBall = undefined

            lastCanonShot.add(cameras[2])
        }

        scene.remove(this)
    }

    collisionWall() {
        'use strict'

        // Check limits
        if (Math.abs(this.position.z) < 28 + RADIUS_BALL && this.position.x > - 25 + RADIUS_BALL && this.position.x < 35 + RADIUS_BALL && this.position.y <= 0) {
            this.velocity.y = 0
            this.position.y = 0
        }

        if (Math.abs(this.position.z) > 25 - RADIUS_BALL && !(Math.abs(this.position.z) > 28 + RADIUS_BALL) && this.position.x < 25 - RADIUS_BALL) {
            this.velocity.z = - this.velocity.z
            if (this.position.z > 25 - RADIUS_BALL)
                this.position.z = 25 - RADIUS_BALL
            if (this.position.z < - 25 + RADIUS_BALL)
                this.position.z = - 25 + RADIUS_BALL
            this.updateRotation(- this.horizontalAngle)
        } else if (Math.abs(this.position.z) > 25 - RADIUS_BALL && !(Math.abs(this.position.z) > 28 + RADIUS_BALL) && this.position.x < 25) {
            this.velocity.x = - this.velocity.x
            this.position.x = 25 + RADIUS_BALL
            this.updateRotation(- this.horizontalAngle + Math.PI)
        }

        if (this.position.x < - 22 + RADIUS_BALL && Math.abs(this.position.z) < 25 - RADIUS_BALL) {
            this.velocity.x = - this.velocity.x
            this.position.x = - 22 + RADIUS_BALL
            this.updateRotation(- this.horizontalAngle + Math.PI)
        }
    }

    collisionBalls() {
        'use strict'

        var numberBalls = balls.length
        var currentBalli
        for (var i = 0; i < numberBalls; i ++) {
            var distance
            currentBalli = balls[i]
            distance = Math.sqrt(Math.pow(this.position.x - currentBalli.position.x, 2) + Math.pow(this.position.y - currentBalli.position.y, 2) + Math.pow(this.position.z - currentBalli.position.z, 2))
            if (distance < 2 * RADIUS_BALL && this != currentBalli) {
                this.collision = true
                this.collidedBalls.push(currentBalli)
            }
        }
    }

    treatCollisionBalls() {
        'use strict'

        if (!this.collision)
            return

        var numberBalls = this.collidedBalls.length
        for (var x = 0; x < numberBalls; x ++) {
            var ballCollided = this.collidedBalls.pop()

            var tmpVelocity = new THREE.Vector3()
            tmpVelocity.copy(ballCollided.velocity)
            var tmpAngle = ballCollided.horizontalAngle

            ballCollided.velocity.copy(this.velocity)
            ballCollided.updateRotation(this.horizontalAngle)
            ballCollided.horizontalAngle = this.horizontalAngle
            
            this.velocity.copy(tmpVelocity)
            this.updateRotation(tmpAngle)
            this.horizontalAngle = tmpAngle

            for (var i = 0; i < ballCollided.collidedBalls.length; i++) {
                if (this == ballCollided.collidedBalls[i])
                    ballCollided.collidedBalls.splice(i, 1)
            }
        }

        this.collision = false
    }

    updateRotation(angle) {
        'use strict'

        var x = this.position.x
        var y = this.position.y
        var z = this.position.z
        var finalMatrix = new THREE.Matrix4()

        var toOrigin = new THREE.Matrix4()
        toOrigin.set(1, 0, 0, - x,
                    0, 1, 0, - y,
                    0, 0, 1, - z,
                    0, 0, 0, 1 )
        
        var unRotate = new THREE.Matrix4()
        unRotate.set(Math.cos(- this.horizontalAngle), 0, Math.sin(- this.horizontalAngle), 0,
                    0,                                 1, 0,                                0,
                    - Math.sin(- this.horizontalAngle), 0, Math.cos(- this.horizontalAngle), 0,
                    0,                                  0, 0,                                1 )
                    
        var transformMatrix = new THREE.Matrix4()
        transformMatrix.set(Math.cos(angle),    0, Math.sin(angle),  0,
                            0,                   1, 0,                 0,
                            - Math.sin(angle),  0, Math.cos(angle),  0,
                            0,                   0, 0,                 1 )

        var backToPoint = new THREE.Matrix4()
        backToPoint.set(1, 0, 0, x,
                        0, 1, 0, y,
                        0, 0, 1, z,
                        0, 0, 0, 1 )
        
        finalMatrix.multiplyMatrices(unRotate, toOrigin)
        finalMatrix.multiplyMatrices(transformMatrix, finalMatrix)
        finalMatrix.multiplyMatrices(backToPoint, finalMatrix)
        this.applyMatrix(finalMatrix)
        this.horizontalAngle = angle
    }
}
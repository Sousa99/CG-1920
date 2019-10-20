var geometry, material, mesh

class Gun extends THREE.Object3D {
    constructor(x , y, z, rotation) {
        super()
        
        this.angle = rotation
        this.downAngle = - 2 * Math.PI / 40
        this.active = false
        this.cooldown = 0

        this.rotateLeft = false
        this.rotateRight = false
        this.activate = false
        this.deactivate = false
        this.shoot = false

        this.main = new THREE.Object3D()
        this.main.add(this.addMainChamber(0, 0, 0))
        this.main.add(this.addMainChamberBack(0, 0, 0))
        this.main.add(this.addMainChamberHold(0, 0, 0))
        this.main.add(this.addMouthHold(-8, 0, 0))
        this.main.add(this.addMouth(0, 0, 0))
        this.main.position.set(6, 5, 0)

        this.main.rotateZ(this.downAngle)

        this.wheels = new THREE.Object3D()
        this.wheels.add(this.addWheel(0, 0, -5))
        this.wheels.add(this.addWheel(0, 0, 5))
        this.wheels.position.set(-2, 2, 0)

        this.base = new THREE.Object3D()
        this.base.add(this.addFrameDown(0, 0, 0))
        this.base.add(this.addSupport(6, 0, 0))
        this.base.add(this.addSupport(-2, 0, 0))
        this.base.add(this.main)
        this.base.add(this.wheels)
        this.base.position.set(0, 0, 0)

        this.rotateY(rotation)

        this.add(this.base)
        this.position.set(x, y, z)
    }

    addMainChamber(x, y, z) {
        'use strict'

        geometry = new THREE.CylinderGeometry(2, 3, 13)
        material = new THREE.MeshBasicMaterial({ color: 0x006666, wireframe: true })
        mesh = new THREE.Mesh(geometry, material)
        mesh.rotateZ(2 * Math.PI / 4)
        mesh.position.set(x - 6.5, y, z)

        return mesh
    }

    addMainChamberBack(x, y, z) {
        'use strict'

        geometry = new THREE.SphereGeometry(3, 7, 7, 2 * Math.PI / 4, 2 * Math.PI / 2)
        material = new THREE.MeshBasicMaterial({ color: 0x00cc99, wireframe: true })
        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(x, y, z)

        return mesh
    }

    addMainChamberHold(x, y, z) {
        'use strict'

        geometry = new THREE.TorusGeometry(3 + 0.50, 0.50, 5)
        material = new THREE.MeshBasicMaterial({ color: 0x004080, wireframe: true })
        mesh = new THREE.Mesh(geometry, material)
        mesh.rotateY(2 * Math.PI / 4)
        mesh.position.set(x, y, z)

        return mesh
    }

    addMouthHold(x, y, z) {
        'use strict'

        geometry = new THREE.TorusGeometry(3 + 0.50, 0.50, 5)
        material = new THREE.MeshBasicMaterial({ color: 0x004080, wireframe: true })
        mesh = new THREE.Mesh(geometry, material)
        mesh.rotateY(2 * Math.PI / 4)
        mesh.position.set(x, y, z)

        return mesh
    }

    addMouth(x, y, z) {
        'use strict'

        geometry = new THREE.CylinderGeometry(2 + 0.25, 2, 1)
        material = new THREE.MeshBasicMaterial({ color: 0x00cc99, wireframe: true })
        mesh = new THREE.Mesh(geometry, material)
        mesh.rotateZ(2 * Math.PI / 4)
        mesh.position.set(x - 13.5, y, z)

        return mesh
    }

    addFrameDown(x, y, z) {
        'use strict'

        var frame = new THREE.Object3D()
        material = new THREE.MeshBasicMaterial({ color: 0x004080, wireframe: true })

        geometry = new THREE.BoxGeometry(20, 1.75, 1.75)
        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(x, y, z - 4)
        frame.add(mesh)

        geometry = new THREE.BoxGeometry(20, 1.75, 1.75)
        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(x, y, z + 4)
        frame.add(mesh)

        geometry = new THREE.BoxGeometry(1.75, 1.75, 8 - 1.75)
        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(x + 6, y, z)
        frame.add(mesh)

        return frame

    }

    addSupport(x, y, z) {
        'use strict'
        
        var frame = new THREE.Object3D()
        material = new THREE.MeshBasicMaterial({ color: 0x004080, wireframe: true })

        geometry = new THREE.BoxGeometry(1, 8, 1)
        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(x, y + 5, z - 4)
        frame.add(mesh)

        geometry = new THREE.BoxGeometry(1, 8, 1)
        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(x, y + 5, z + 4)
        frame.add(mesh)

        return frame
    }

    addWheel(x,y,z){
        'use strict'

        geometry = new THREE.CylinderGeometry(2 + 1, 3, 2)
        material = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true })
        mesh = new THREE.Mesh(geometry, material)
        mesh.rotateX(2 * Math.PI / 4)
        mesh.position.set(x, y, z)

        return mesh
    }

    rotateCanon() {
        'use strict'

        if (!this.active)
            return
            
        var gunsRotation = 0
        if (this.rotateLeft)
            gunsRotation += 1
        if (this.rotateRight)
            gunsRotation -= 1

        this.angle += ROTATE_VELOCITY_CONSTANT * gunsRotation
        this.rotateY(ROTATE_VELOCITY_CONSTANT * gunsRotation)
        this.wheels.rotateZ(ROTATE_VELOCITY_CONSTANT * gunsRotation)

    }

    activateCanon() {
        'use strict'

        if (this.activate && this.active)
            this.activate = false

        if (this.activate) {
            this.active = true
            this.activate = false

            var toChange = new Array()
            var r, g, b

            toChange = toChange.concat(this.main)
            while (toChange.length > 0) {
                var current = toChange.shift()
                
                if (current.type == "Object3D")
                toChange = toChange.concat(current.children)
                else if (current.type == "Mesh") {
                    r = current.material.color.r
                    g = current.material.color.g
                    b = current.material.color.b

                    current.material.color.set(new THREE.Color(b, g, r))
                }
            }
        }
    }

    deactivateCanon() {
        'use strict'

        if (this.deactivate && !this.active)
            this.deactivate = false

        if (this.deactivate) {
            this.active = false
            this.deactivate = false

            var toChange = new Array()
            var r, g, b

            toChange = toChange.concat(this.main)
            while (toChange.length > 0) {
                var current = toChange.shift()
                
                if (current.type == "Object3D")
                toChange = toChange.concat(current.children)
                else if (current.type == "Mesh") {
                    r = current.material.color.r
                    g = current.material.color.g
                    b = current.material.color.b

                    current.material.color.set(new THREE.Color(b, g, r))
                }
            }
        }
    }

    shootBall() {
        'use strict'

        if (this.shoot) {
            this.shoot = false
            if (this.cooldown == 0 && this.active) {
                this.cooldown = 500

                var coordinateX = this.position.x + (- 8 * Math.cos(this.angle))
                var coordinateY = (this.position.y + 5) * (- 8 * Math.sin(this.downAngle))
                var coordinateZ = this.position.z + (8 * Math.sin(this.angle))
                var newBall = new Ball(coordinateX, coordinateY, coordinateZ, this.angle, this.downAngle, showingBallAxis)

                newBall.angle = this.angle
                newBall.falling = true
                newBall.velocity.x = - Math.cos(this.angle) * VELOCITY_CONSTANT
                newBall.velocity.y = - Math.sin(this.downAngle) * VELOCITY_CONSTANT
                newBall.velocity.z = Math.sin(this.angle) * VELOCITY_CONSTANT
                balls.push(newBall)

                if (lastCanonShot != undefined)
                    lastCanonShot.remove(cameras[2])
                
                newBall.add(cameras[2])
                selectedBall = newBall
                lastCanonShot = this
                
                scene.add(newBall)
                newBall.changeColor(0xffffff)
            }
        }
    }

}
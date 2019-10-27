var geometry, material, mesh

class Gun extends THREE.Object3D {
    constructor(x , y, z, rotation) {
        super()
        this.matrixAutoUpdate = false
        var transformMatrix = new THREE.Matrix4()
        transformMatrix.set(Math.cos(rotation),    0, Math.sin(rotation), x,
                            0,                     1, 0,                  y,
                            - Math.sin(rotation),  0, Math.cos(rotation), z,
                            0,                     0, 0,                  1 )
        
        this.angle = rotation
        this.downAngle = - 2 * Math.PI / 40
        this.active = false
        this.cooldown = 0

        this.rotateLeft = false
        this.rotateRight = false
        this.activate = false
        this.deactivate = false

        this.main = new THREE.Object3D()
        this.main.add(this.addMainChamber(0, 0, 0))
        this.main.add(this.addMainChamberBack(0, 0, 0))
        this.main.add(this.addMainChamberHold(0, 0, 0))
        this.main.add(this.addMouthHold(-8, 0, 0))
        this.main.add(this.addMouth(0, 0, 0))

        var m = new THREE.Matrix4();
        m.set(Math.cos(this.downAngle),-Math.sin(this.downAngle), 0, 6,
              Math.sin(this.downAngle), Math.cos(this.downAngle), 0, 5,
                        0,                        0,              1, 0,
                        0,                        0,              0, 1);
        this.main.applyMatrix(m);
        

        this.spotlight = new THREE.Object3D()
        this.spotlight.add(this.addSpotlight(0, 0, 0))
        this.spotlight.add(this.addMouthSpotlight(0, 0, 0))
        this.spotlight.position.set(0, 0, 0)

        this.add(this.base)
        this.applyMatrix(transformMatrix)
    }

    addSpotlight(x, y, z) {
        'use strict'

        geometry = new THREE.ConeGeometry(2, 3, 13)
        material = new THREE.MeshBasicMaterial({ color: 0x66ffff, wireframe: true })
        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(x - 6.5, y, z)

        return mesh
    }

    addMouthSpotlight(x, y, z) {
        'use strict'

        geometry = new THREE.SphereGeometry(2 + 0.25, 2, 1)
        material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(x - 6.5, y, z)

        return mesh
    }

   

    activateSpotlight() {
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

    deactivateSpotlight() {
        'use strict'

        if (this.deactivate && !this.active)
            this.deactivate = false

        if (this.deactivate) {
            this.active = false
            this.deactivate = false

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



}
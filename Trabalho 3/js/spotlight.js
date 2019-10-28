var geometry, material, mesh

class Spotlight extends THREE.Object3D {
    constructor(x , y, z) {
        super()
        this.matrixAutoUpdate = false
    
        this.active = false
        this.changeActiveState = false

        var matrixPosition = new THREE.Matrix4()
        matrixPosition.set(1, 0, 0, x,
                        0, 1, 0, y,
                        0, 0, 1, z,
                        0, 0, 0, 1)

        this.spotlight = new THREE.Object3D()
        this.spotlight.add(this.addSpotlight(0, 0, 0))
        this.spotlight.add(this.addMouthSpotlight(0, -2.5, 0))
        this.spotlight.position.set(0, 0, 0)

        this.add(this.spotlight)
        this.applyMatrix(matrixPosition)
    }

    addSpotlight(x, y, z) {
        'use strict'

        geometry = new THREE.SphereGeometry(2.5, 7, 7)
        material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(x, y, z)

        return mesh
    }

    addMouthSpotlight(x, y, z) {
        'use strict'

        geometry = new THREE.ConeGeometry(3, 5, 13)
        material = new THREE.MeshBasicMaterial({ color: 0x66ffff, wireframe: true })
        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(x, y, z)

        return mesh
    }

    changeActivation() {
        'use strict'

        if (this.changeActiveState) {
            if (this.active)
                this.activateSpotlight()
            else
                this.deactivateSpotlight()
            
            this.changeActiveState = false
        }
    }

    activateSpotlight() {
        'use strict'

        this.active = true

        var toChange = new Array()
        var r, g, b

        console.log(this)
        toChange = toChange.concat(this)
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

    deactivateSpotlight() {
        'use strict'

        this.active = false

        var toChange = new Array()
        var r, g, b

        console.log(this)
        toChange = toChange.concat(this)
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
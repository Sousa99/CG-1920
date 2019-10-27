var geometry, material, mesh

class Spotlight extends THREE.Object3D {
    constructor(x , y, z, rotation) {
        super()
    
        this.active = false

        this.activate = false
        this.deactivate = false

        

        this.spotlight = new THREE.Object3D()
        this.spotlight.add(this.addSpotlight(0, 0, 0))
        this.spotlight.add(this.addMouthSpotlight(0, 0, 0))
        this.spotlight.position.set(0, 0, 0)

        this.add(this.spotlight)
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
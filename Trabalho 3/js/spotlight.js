var geometry, material, mesh

class Spotlight extends THREE.Object3D {
    constructor(x , y, z, lookAtObject) {
        super()
        var lookAtPosition = lookAtObject.position
        this.up = new THREE.Vector3(0, 1, 0)

        this.active = false
        this.changeActiveState = false

        this.spotlight = new THREE.Object3D()
        this.spotlight.add(this.addSpotlight(0, 0, 0))
        this.spotlight.add(this.addMouthSpotlight(0, 0, 2.5))
        this.spotlight.position.set(0, 0, 0)

        this.actualLight = new THREE.SpotLight( 0xffffff, 0.3)
        this.actualLight.position.set(0, 0, 0)
        this.actualLight.castShadow = true
        this.actualLight.visible = false

        this.position.set(x, y, z)
        this.lookAt(lookAtPosition)
        this.add(this.spotlight)
        this.add(this.actualLight)
    }

    addSpotlight(x, y, z) {
        'use strict'
        
        geometry = new THREE.SphereGeometry(2.5, 7, 7)
        geometry.computeFaceNormals()
        geometry.computeVertexNormals()
        
        material = { color: 0xffffff, wireframe: false }
        mesh = new CustomMesh(geometry, material)
        mesh.receiveShadow = true
        
        mesh.position.set(x, y, z)

        return mesh
    }

    addMouthSpotlight(x, y, z) {
        'use strict'
        
        geometry = new THREE.ConeGeometry(3, 5, 13)
        geometry.computeFaceNormals()
        geometry.computeVertexNormals()

        material = { color: 0x66ffff, wireframe: true }
        mesh = new CustomMesh(geometry, material)
        mesh.receiveShadow = true
        
        mesh.position.set(x, y, z)
        mesh.rotateX(- Math.PI / 2)

        return mesh
    }

    changeActivation() {
        'use strict'

        if (this.changeActiveState) {
            if (!this.active)
                this.activateSpotlight()
            else
                this.deactivateSpotlight()
            
            this.changeActiveState = false
        }
    }

    activateSpotlight() {
        'use strict'

        console.log("Oi")
        this.active = true
        this.actualLight.visible = true


        var toChange = new Array()
        var r, g, b

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
        this.actualLight.visible = false

        var toChange = new Array()
        var r, g, b

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
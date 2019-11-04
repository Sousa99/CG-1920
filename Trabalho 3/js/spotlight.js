var geometry, material, mesh

class Spotlight extends THREE.Object3D {
    constructor(x , y, z, intensity, angle, lookAtObject, lookAtPosition) {
        super()

        if (lookAtPosition == undefined)
            lookAtPosition = lookAtObject.position
        console.log(lookAtPosition)

        this.up = new THREE.Vector3(0, 1, 0)

        this.active = false
        this.changeActiveState = false

        this.spotlight = new THREE.Object3D()
        this.spotlight.add(this.addSpotlight(0, 0, 0))
        this.spotlight.add(this.addMouthSpotlight(0, 0, 2.5))
        this.spotlight.position.set(0, 0, 0)

        this.actualLight = new THREE.SpotLight( 0xffffff, intensity, 0, angle)
        this.actualLight.position.set(0, 0, 0)
        this.actualLight.target = lookAtObject
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
        
        material = { color: 0xff6600, wireframe: false }
        mesh = new CustomMesh(geometry, material, false)
        
        mesh.position.set(x, y, z)

        return mesh
    }

    addMouthSpotlight(x, y, z) {
        'use strict'
        
        geometry = new THREE.ConeGeometry(3, 5, 13)
        geometry.computeFaceNormals()
        geometry.computeVertexNormals()

        material = { color: 0x66ffff, wireframe: true }
        mesh = new CustomMesh(geometry, material, false)
        
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
        
        this.active = true
        this.actualLight.visible = true

        this.changeColor()
    }

    deactivateSpotlight() {
        'use strict'

        this.active = false
        this.actualLight.visible = false

        this.changeColor()
    }

    changeColor() {
        'use strict'

        var toChange = new Array()
        var r, g, b

        toChange = toChange.concat(this)
        while (toChange.length > 0) {
            var current = toChange.shift()
            
            if (current.type == "Object3D")
                toChange = toChange.concat(current.children)
            else if (current.type == "Mesh") {

                for (var i = 0; i < current.materials.length; i++) {
                    var currentMaterial = current.materials[i]
                    r = currentMaterial.color.r
                    g = currentMaterial.color.g
                    b = currentMaterial.color.b
    
                    currentMaterial.color.set(new THREE.Color(b, g, r))
                }
            }
        }
    }
}
var geometry, material, mesh

class Pedestal extends THREE.Object3D {
    constructor(x , y, z) {
        super()

        this.castShadow = true

        this.mainCollumn = this.addCollumn(0, 10, 0)

        this.steps = []
        var step
        var height = 0.5
        for (var i = 0; i < 3; i++) {
            step = this.addStep(0, height, 0, i)
            this.add(step)
            this.steps.push(step)
            height += (1 - (i * 0.25) + (1 - (i + 1) * 0.25)) / 2
        }

        var step
        var height = 20
        for (var i = 0; i < 3; i++) {
            step = this.addInverseStep(0, height, 0, i)
            this.add(step)
            this.steps.push(step)
            height += (1 + (i * 0.25) + (1 + (i + 1) * 0.25)) / 2
        }

        this.object = null

        this.add(this.mainCollumn)
        this.position.set(x, y, z)
    }

    addStep(x, y, z, i) {
        'use strict'

        geometry = new THREE.BoxGeometry(12 - i, 1 - i * 0.25, 12 - i)
        geometry.computeFaceNormals()
        geometry.computeVertexNormals()

        material = { color: 0x888888, wireframe: false }
        mesh = new CustomMesh(geometry, material)
        mesh.receiveShadow = true
        mesh.position.set(x, y, z)
    
        return mesh
    }

    addInverseStep(x, y, z, i) {
        'use strict'

        geometry = new THREE.BoxGeometry(9 + i, 1 + i * 0.25, 9 + i)
        geometry.computeFaceNormals()
        geometry.computeVertexNormals()

        material = { color: 0x888888, wireframe: false }
        mesh = new CustomMesh(geometry, material)
        mesh.receiveShadow = true
        mesh.position.set(x, y, z)
    
        return mesh
    }

    addCollumn(x, y, z) {
        'use strict'

        geometry = new THREE.BoxGeometry(8, 20, 8)
        geometry.computeFaceNormals()
        geometry.computeVertexNormals()

        material = { color: 0x888888, wireframe: false }
        mesh = new CustomMesh(geometry, material)
        mesh.receiveShadow = true
        mesh.position.set(x, y, z)
    
        return mesh
    }
}
class Mesh extends THREE.Mesh {
    constructor(geometry, materialOptions, opaque = true) {
        var predefinedIndex = 1
        var possibilities

        if (Array.isArray(materialOptions)) {
            possibilities = [[], []]
            for (var i = 0; i < materialOptions.length; i++) {
                possibilities[0].push(new THREE.MeshBasicMaterial(materialOptions[i].basic))
                possibilities[1].push(new THREE.MeshPhongMaterial(materialOptions[i].phong))
            }
        } else {
            possibilities = [new THREE.MeshBasicMaterial(materialOptions.basic), new THREE.MeshPhongMaterial(materialOptions.phong)]
        }
        
        super(geometry, possibilities[predefinedIndex])
        this.index = predefinedIndex
        this.materials = possibilities
        this.opaque = opaque

        this.receiveShadow = true
        if (this.opaque)
            this.castShadow = true
    }

    changeLightCalc() {
        'use strict'

        this.index = (this.index + 1) % this.materials.length
        this.material = this.materials[this.index]
    }
    
    changeWireframe() {
        'use strict'

        for (var x = 0; x < this.materials.length; x++) {
            if (Array.isArray(this.materials[x])) {
                for (var i = 0; i < this.materials[x].length; i++)
                    this.materials[x][i].wireframe = !this.materials[x][i].wireframe
            } else this.materials[x].wireframe = !this.materials[x].wireframe
        }
    }
}
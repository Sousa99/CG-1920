class Mesh extends THREE.Mesh {
    constructor(geometry, materialOptions, opaque = true) {
        var predefinedIndex = 1
        var possibilities

        if (Array.isArray(materialOptions)) {
            possibilities = [[], []]
            for (var i = 0; i < materialOptions.length; i++) {
                possibilities[0].push(new THREE.MeshBasicMaterial(materialOptions[i]))
                possibilities[1].push(new THREE.MeshPhongMaterial(materialOptions[i]))
            }
        } else {
            possibilities = [new THREE.MeshBasicMaterial(materialOptions), new THREE.MeshPhongMaterial(materialOptions)]
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
}
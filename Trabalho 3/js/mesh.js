class CustomMesh extends THREE.Mesh {
    constructor(geometry, materialOptions, opaque = true) {
        var predefinedIndex = 2
        var possibilities = [new THREE.MeshBasicMaterial(materialOptions), new THREE.MeshLambertMaterial(materialOptions), new THREE.MeshPhongMaterial(materialOptions)]
        
        super(geometry, possibilities[predefinedIndex])
        this.index = predefinedIndex
        this.materials = possibilities
        this.opaque = opaque

        this.noLightMaterial = 0
        this.lastIndex = predefinedIndex

        this.receiveShadow = true
        if (this.opaque)
            this.castShadow = true
    }

    changeLightCalc() {
        'use strict'

        if (this.index != this.noLightMaterial)
            this.index = this.noLightMaterial
        else
            this.index = this.lastIndex

        this.material = this.materials[this.index]
    }

    changeMaterialLight() {
        'use strict'

        var newIndex = (this.lastIndex + 1) % 3
        if (newIndex == this.noLightMaterial)
            newIndex = newIndex + 1

        this.lastIndex = newIndex
        if (this.index != this.noLightMaterial) {
            this.index = this.lastIndex
            this.material = this.materials[this.index]
        }

        this.receiveShadow = true
        if (this.opaque)
            this.castShadow = true
    }
}
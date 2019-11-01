class CustomMesh extends THREE.Mesh {
    constructor(geometry, materialOptions) {
        var predefinedIndex = 1
        var possibilities = [new THREE.MeshBasicMaterial(materialOptions), new THREE.MeshLambertMaterial(materialOptions), new THREE.MeshPhongMaterial(materialOptions)]

        super(geometry, possibilities[predefinedIndex])
        this.index = predefinedIndex
        this.materials = possibilities
    }
}
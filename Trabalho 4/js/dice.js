var geometry, material, mesh
const DICE_SIZE = 15
const DICE_SPEED = 0.025

class Dice extends THREE.Object3D {
    constructor(x, y, z) {
        super()

        this.moving = true

        this.axis = new THREE.AxesHelper(3 * DICE_SIZE)
        this.add(this.axis)

        material = { color: 0xFFFFFF, 
            wireframe: false }

        geometry = new THREE.BoxGeometry(DICE_SIZE, DICE_SIZE, DICE_SIZE)
        mesh = new Mesh(geometry, material)
        mesh.position.set(0, 0, 0)
        
        var finalMatrix = new THREE.Matrix4()
        var rotateXMatrix = new THREE.Matrix4()
        rotateXMatrix.makeRotationX(Math.PI/4)
        var rotateZMatrix = new THREE.Matrix4()
        rotateZMatrix.makeRotationZ(Math.atan((DICE_SIZE / 2) / (Math.sqrt(2) * DICE_SIZE/2)))
        
        finalMatrix.multiplyMatrices(rotateZMatrix, rotateXMatrix)
        mesh.applyMatrix(finalMatrix)
        
        mesh.castShadow = true
        mesh.receiveShadow = true
        
        this.add(mesh)
        this.position.set(x, y + (Math.sqrt(3) * DICE_SIZE) / 2, z)
    }

    move() {
        if (!this.moving)
            return

        this.rotateY(DICE_SPEED)
    }
}
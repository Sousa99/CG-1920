var geometry, material, mesh
const DICE_SIZE = 15
const DICE_SPEED = 2

class Dice extends THREE.Object3D {
    constructor(x, y, z) {
        super()

        var imagesTextures = ['./assets/dice-face-1.png', 
            './assets/dice-face-2.png',
            './assets/dice-face-3.png',
            './assets/dice-face-4.png',
            './assets/dice-face-5.png',
            './assets/dice-face-6.png']

        var imagesBumpMap = ['./assets/dice-face-1-bumpMap.png', 
        './assets/dice-face-2-bumpMap.png',
        './assets/dice-face-3-bumpMap.png',
        './assets/dice-face-4-bumpMap.png',
        './assets/dice-face-5-bumpMap.png',
        './assets/dice-face-6-bumpMap.png']
        
        var materials = []

        for (var i = 0; i < 6; i++) {
            texture = new THREE.TextureLoader().load(imagesTextures[i])
            bumpmap = new THREE.TextureLoader().load(imagesBumpMap[i])

            material = {
                basic: { color: 0xffffff,
                    map: texture,
                    wireframe: false},
                phong: { color: 0xffffff,
                    map: texture,
                    bumpMap: bumpmap,
                    bumpScale: 0.7,
                    wireframe: false}
            }

            materials.push(material)
        }

        this.moving = true

        geometry = new THREE.BoxGeometry(DICE_SIZE, DICE_SIZE, DICE_SIZE)
        mesh = new Mesh(geometry, materials)
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

    move(timeDiff) {
        if (!this.moving)
            return

        this.rotateY(DICE_SPEED * timeDiff)
    }
}
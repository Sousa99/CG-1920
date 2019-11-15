var geometry, material, mesh, texture, bumpmap
const TABLE_WIDTH = 150
const TABLE_HEIGTH = 1
const TABLE_DEPTH = 150

class Table extends THREE.Object3D {
    constructor(x, y, z) {
        super()

        var imagesTextures = ['./assets/wood_pattern_side.jpg', 
            './assets/wood_pattern_side.jpg',
            './assets/chess_table.jpg',
            './assets/wood_pattern.jpg',
            './assets/wood_pattern_side.jpg',
            './assets/wood_pattern_side.jpg']
        var imagesBumpMap = ['./assets/wood_pattern_side.jpg', 
            './assets/wood_pattern_side.jpg',
            './assets/wood_pattern.jpg',
            './assets/wood_pattern.jpg',
            './assets/wood_pattern_side.jpg',
            './assets/wood_pattern_side.jpg']
        
        var repeat = [false, false, true, false, false, false]
        
        var materials = []

        for (var i = 0; i < 6; i++) {
            texture = new THREE.TextureLoader().load(imagesTextures[i])
            bumpmap = new THREE.TextureLoader().load(imagesBumpMap[i])

            if (repeat[i]) {
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping
                texture.repeat.set(4, 4)
                bumpmap.wrapS = bumpmap.wrapT = THREE.RepeatWrapping
                bumpmap.repeat.set(4, 4)
            }

            material = new THREE.MeshPhongMaterial({ color: 0xffffff,
                map: texture,
                bumpMap: bumpmap,
                bumpScale: 1,
                wireframe: false })

            materials.push(material)
        }

        geometry = new THREE.BoxGeometry(TABLE_WIDTH, TABLE_HEIGTH, TABLE_DEPTH)
        mesh = new THREE.Mesh(geometry, materials)
        mesh.position.set(0, 0, 0)
        mesh.castShadow = true
        mesh.receiveShadow = true

        this.add(mesh)
        this.position.set(x, y - TABLE_HEIGTH / 2, z)
    }
}
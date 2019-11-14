var geometry, material, mesh, texture, bumpmap
const TABLE_WIDTH = 150
const TABLE_HEIGTH = 2
const TABLE_DEPTH = 150

class Table extends THREE.Object3D {
    constructor(x, y, z) {
        super()

        texture = new THREE.TextureLoader().load('./assets/chess_table.jpg')
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping
        texture.repeat.set(4, 4)

        bumpmap = new THREE.TextureLoader().load('./assets/wood_pattern.jpg')
        bumpmap.wrapS = bumpmap.wrapT = THREE.RepeatWrapping
        bumpmap.repeat.set(4, 4)

        material = new THREE.MeshPhongMaterial({ color: 0xffffff,
            map: texture,
            bumpMap: bumpmap,
            bumpScale: 2,
            wireframe: false })

        geometry = new THREE.BoxGeometry(TABLE_WIDTH, TABLE_HEIGTH, TABLE_DEPTH)
        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(0, 0, 0)
        mesh.castShadow = true
        mesh.receiveShadow = true

        this.add(mesh)
        this.position.set(x, y - TABLE_HEIGTH / 2, z)
    }
}
var geometry, material, mesh, texture
const TABLE_WIDTH = 150
const TABLE_HEIGTH = 2
const TABLE_DEPTH = 150

class Table extends THREE.Object3D {
    constructor(x, y, z) {
        super()

        //texture = new THREE.TextureLoader().load('./assets/chess_texture.jpg');
        //texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        //texture.repeat.set(2, 2);

        material = new THREE.MeshPhongMaterial({ color: 0x009999, 
            wireframe: false })

        geometry = new THREE.BoxGeometry(TABLE_WIDTH, TABLE_HEIGTH, TABLE_DEPTH)
        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(0, 0, 0)
        this.add(mesh)

        this.position.set(x, y - TABLE_HEIGTH / 2, z)
    }
}
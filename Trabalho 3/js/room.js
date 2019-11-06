var geometry, material, mesh
const WALL_WIDTH_SEGMENTS = 150
const WALL_HEIGHT_SEGMENTS = 150
const WALL_DEPTH_SEGMENTS = 1
const FLOOR_WIDTH_SEGMENTS = 100
const FLOOR_HEIGHT_SEGMENTS = 1
const FLOOR_DEPTH_SEGMENTS = 100

class Room extends THREE.Object3D {
    constructor(x, y, z) {
        super()

        var rightWall = this.addWall(0, 25, - 37)
        var leftWall = this.addWall(- 37, 25, 0)
        var floor = this.addFloor(0, 0, 0)

        leftWall.rotateY(Math.PI / 2)

        this.add(rightWall)
        this.add(leftWall)
        this.add(floor)

        this.position.set(x, y, z)
    }

	addWall(x, y, z) {
		'use strict'
    
        geometry = new THREE.BoxGeometry(75, 50, 0.5, WALL_WIDTH_SEGMENTS, WALL_HEIGHT_SEGMENTS, WALL_DEPTH_SEGMENTS)
        geometry.computeFaceNormals()
        geometry.computeVertexNormals()

        material = { color: 0x006699, wireframe: false }
        mesh = new CustomMesh(geometry, material, false)
        mesh.receiveShadow = true
        mesh.position.set(x, y, z)
    
        return mesh
    } 

    addFloor(x, y, z) {
        'use strict'
        
        geometry = new THREE.BoxGeometry(75, 1 , 75, FLOOR_WIDTH_SEGMENTS, FLOOR_HEIGHT_SEGMENTS, FLOOR_DEPTH_SEGMENTS)
        geometry.computeFaceNormals()
        geometry.computeVertexNormals()
        
        material = { color: 0x99ffff, wireframe: false }
        mesh = new CustomMesh(geometry, material, false)
        mesh.receiveShadow = true
        mesh.position.set(x, y - 0.5, z)
    
        return mesh
    }
}
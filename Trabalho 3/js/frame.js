var geometry, material, mesh
const WIDTH_FRAME = 34
const HEIGTH_FRAME = 40

class Frame extends THREE.Object3D {
    constructor(x, y, z) {
        super()
        this.castShadow = true

        this.backdrop = this.addBackdrop(0, 0, 0)

        var xPoint, yPoint, circle, square
        var step = 3

        for (var i = 0; i <= (WIDTH_FRAME - 6) / step; i ++) {
            for (var j = 0; j <= (HEIGTH_FRAME - 6) / step; j++) {
                xPoint = - WIDTH_FRAME / 2 + 2 + step / 2 + i * step
                yPoint = HEIGTH_FRAME / 2 - 2 - step / 2 - j * step

                square = this.addSquare(xPoint, yPoint, 0)
                this.add(square)
            }
        }

        for (var i = 0; i <= (WIDTH_FRAME - 4) / step; i ++) {
            for (var j = 0; j <= (HEIGTH_FRAME - 4) / step; j++) {
                xPoint = - WIDTH_FRAME / 2 + 2 + i * step
                yPoint = HEIGTH_FRAME / 2 - 2 - j * step

                circle = this.addPoint(xPoint, yPoint, 0)
                this.add(circle)
            }
        }

        this.add(this.backdrop)
        this.rotateY(Math.PI / 2)
        this.position.set(x, y, z)
    }

    addBackdrop(x, y, z) {
        geometry = new THREE.BoxGeometry(WIDTH_FRAME, HEIGTH_FRAME, 0.5)
        geometry.computeFaceNormals()
        geometry.computeVertexNormals()

        material = { color: 0x4444444, wireframe: false }
        mesh = new CustomMesh(geometry, material)
        mesh.receiveShadow = true
        mesh.position.set(x, y, z)
    
        return mesh
    }

    addPoint(x, y, z) {
        geometry = new THREE.CylinderGeometry(0.5, 0.5, 0.7, 10, 10)
        geometry.computeFaceNormals()
        geometry.computeVertexNormals()

        material = { color: 0xffffff, wireframe: false }
        mesh = new CustomMesh(geometry, material)
        mesh.receiveShadow = true

        mesh.rotateX(Math.PI / 2)
        mesh.position.set(x, y, z)
    
        return mesh
    }

    addSquare(x, y, z) {
        geometry = new THREE.BoxGeometry(2.5, 2.5, 0.7)
        geometry.computeFaceNormals()
        geometry.computeVertexNormals()

        material = { color: 0x000000, wireframe: false }
        mesh = new CustomMesh(geometry, material)
        mesh.receiveShadow = true
        mesh.position.set(x, y, z)
    
        return mesh
    }
}
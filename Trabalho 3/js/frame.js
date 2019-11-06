var geometry, material, mesh
const WIDTH_FRAME = 34
const HEIGTH_FRAME = 40
const BACKDROP_WIDTH_SEGMENTS = 50
const BACKDROP_HEIGHT_SEGMENTS = 50
const BACKDROP_DEPTH_SEGMENTS = 1
const FRAME_SHADOW = false

class Frame extends THREE.Object3D {
    constructor(x, y, z) {
        super()

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

        this.frame = this.addFrame(0, 0, 0)
        this.add(this.frame)

        this.rotateY(Math.PI / 2)
        this.position.set(x, y, z)
    }

    addBackdrop(x, y, z) {
        geometry = new THREE.BoxGeometry(WIDTH_FRAME, HEIGTH_FRAME, 0.5, BACKDROP_WIDTH_SEGMENTS, BACKDROP_HEIGHT_SEGMENTS, BACKDROP_DEPTH_SEGMENTS)
        geometry.computeFaceNormals()
        geometry.computeVertexNormals()

        material = { color: 0x939393, wireframe: false }
        mesh = new CustomMesh(geometry, material, false)
        mesh.receiveShadow = true
        mesh.position.set(x, y, z)
    
        return mesh
    }

    addPoint(x, y, z) {
        geometry = new THREE.CylinderGeometry(0.5, 0.5, 0.7, 10, 10)
        geometry.computeFaceNormals()
        geometry.computeVertexNormals()

        material = { color: 0xffffff, wireframe: false }
        mesh = new CustomMesh(geometry, material, false)
        mesh.receiveShadow = true

        mesh.rotateX(Math.PI / 2)
        mesh.position.set(x, y, z)
    
        return mesh
    }

    addSquare(x, y, z) {
        geometry = new THREE.BoxGeometry(2.5, 2.5, 0.7, 2, 2, 1)
        geometry.computeFaceNormals()
        geometry.computeVertexNormals()

        material = { color: 0x000000, wireframe: false }
        mesh = new CustomMesh(geometry, material, false)
        mesh.receiveShadow = true
        mesh.position.set(x, y, z)
    
        return mesh
    }

    addFrame(x, y, z) {
        material = { color: 0x804000, wireframe: false }
        var object = new THREE.Object3D()

        var extrudeSettings = {
            curveSegments: 12,
            steps: 2,
            depth: 1,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize: 1,
            bevelOffset: 0,
            bevelSegments: 1
        }

        var shape

        // TOP
        shape = new THREE.Shape()
        shape.moveTo(-WIDTH_FRAME / 2 - 0.5, 0.2)
        shape.lineTo(WIDTH_FRAME / 2 + 0.5, 0.2)
        shape.lineTo(WIDTH_FRAME / 2 - 0.2, -0.2)
        shape.lineTo(-WIDTH_FRAME / 2 + 0.2, -0.2)
        shape.lineTo(-WIDTH_FRAME / 2 - 0.5, 0.2)

        geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
        geometry.computeFaceNormals()
        geometry.computeVertexNormals()

        mesh = new CustomMesh(geometry, material, FRAME_SHADOW)
        mesh.receiveShadow = true
        mesh.position.set(x, y + HEIGTH_FRAME / 2, z)
        object.add(mesh)

        // BOTTOM
        shape = new THREE.Shape()
        shape.moveTo(-WIDTH_FRAME / 2 + 0.2, 0.2)
        shape.lineTo(WIDTH_FRAME / 2 - 0.2, 0.2)
        shape.lineTo(WIDTH_FRAME / 2 + 0.5, -0.2)
        shape.lineTo(-WIDTH_FRAME / 2 - 0.5, -0.2)
        shape.lineTo(-WIDTH_FRAME / 2 + 0.2, 0.2)

        geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
        geometry.computeFaceNormals()
        geometry.computeVertexNormals()

        mesh = new CustomMesh(geometry, material, FRAME_SHADOW)
        mesh.receiveShadow = true
        mesh.position.set(x, y - HEIGTH_FRAME / 2, z)
        object.add(mesh)

        // LEFT
        shape = new THREE.Shape()
        shape.moveTo(-0.2, HEIGTH_FRAME / 2 + 0.5)
        shape.lineTo(-0.2, - HEIGTH_FRAME / 2 - 0.5)
        shape.lineTo(0.2, - HEIGTH_FRAME / 2 + 0.5)
        shape.lineTo(0.2, HEIGTH_FRAME / 2 - 0.5)
        shape.lineTo(-0.2, HEIGTH_FRAME / 2 + 0.5)

        geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
        geometry.computeFaceNormals()
        geometry.computeVertexNormals()

        mesh = new CustomMesh(geometry, material, FRAME_SHADOW)
        mesh.receiveShadow = true
        mesh.position.set(x - WIDTH_FRAME / 2, y, z)
        object.add(mesh)

         // RIGHT
         shape = new THREE.Shape()
         shape.moveTo(-0.2, HEIGTH_FRAME / 2 - 0.5)
         shape.lineTo(-0.2, - HEIGTH_FRAME / 2 + 0.5)
         shape.lineTo(0.2, - HEIGTH_FRAME / 2 - 0.5)
         shape.lineTo(0.2, HEIGTH_FRAME / 2 + 0.5)
         shape.lineTo(-0.2, HEIGTH_FRAME / 2 - 0.5)
 
         geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
         geometry.computeFaceNormals()
         geometry.computeVertexNormals()
 
         mesh = new CustomMesh(geometry, material, FRAME_SHADOW)
         mesh.receiveShadow = true
         mesh.position.set(x + WIDTH_FRAME / 2, y, z)
         object.add(mesh)
    
        return object
    }
}
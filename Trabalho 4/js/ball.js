var geometry, material, mesh, texture
const RADIUS_BALL = 5
const DISTANCE_BALL = 40
const SPEED_BALL = 0.025

class Ball extends THREE.Object3D {
    constructor() {
        super()
        this.moving = true
        this.angle = 0

        this.axis = new THREE.AxesHelper(3 * RADIUS_BALL)
        this.add(this.axis)

        texture = new THREE.TextureLoader().load('./assets/Lenna.png');
        //texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        //texture.repeat.set(2, 2);

        material = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, 
            wireframe: false })

        geometry = new THREE.SphereGeometry(RADIUS_BALL, 10, 10)
        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(0, 0, 0)
        
        this.add(mesh)
        this.position.set(DISTANCE_BALL * Math.cos(this.angle), RADIUS_BALL, DISTANCE_BALL * Math.sin(this.angle))
    }

    move() {
        if (!this.moving)
            return

        this.angle += SPEED_BALL

        this.position.x = DISTANCE_BALL * Math.cos(this.angle)
        this.position.z = DISTANCE_BALL * Math.sin(this.angle)
    }
}
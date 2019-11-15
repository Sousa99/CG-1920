class MainScene extends THREE.Scene {
    constructor() {
        super()
        
        this.table = new Table(0, 0, 0)
        this.add(this.table)

        this.dice = new Dice(0, 0, 0)
        this.add(this.dice)

        this.ball = new Ball()
        this.add(this.ball)

        this.directionalLight = new CustomDirectionalLight(1, 1, 1, 0xffffff, 0.30, this)
        this.add(this.directionalLight)

        this.pointLight = new CustomPointLight(- 50, 25, -50, 0xff0000, 0.60)
        this.add(this.pointLight)
    }

    animate() {
        this.ball.move()
        this.dice.move()
    }
}
var texture

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

        this.directionalLight.updateLight()
        this.pointLight.updateLight()
    }

    onKeyDown(e) {
        switch (e.keyCode) {
            case 66: //b
                this.ball.changeState = true
                break
            case 83: //s
                activeScene = (activeScene + 1) % scenes.length
                break
            case 68: //d
                this.directionalLight.changeActiveState = true
                break
            case 80: //p
                this.pointLight.changeActiveState = true
                break
        }
    }
}

class PauseScene extends THREE.Scene {
    constructor() {
        super()

        texture = new THREE.TextureLoader().load('./assets/pause_screen.jpg')
        this.background = texture
    }

    animate() {

    }

    onKeyDown(e) {
        switch (e.keyCode) {
            case 82: //r
                scenes[0] = new MainScene()
            case 83: //s
                activeScene = (activeScene + 1) % scenes.length
                break
        }
    }
}
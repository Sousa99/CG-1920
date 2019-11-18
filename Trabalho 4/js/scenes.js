var texture

class MainScene extends THREE.Scene {
    constructor() {
        super()
        this.MAX_CAMERA_INDEX = 1
        this.MIN_CAMERA_INDEX = 0

        this.camera = 0
        this.changeScene = false
        this.changeCamera = false

        this.changeStateWireframe = false
        this.changeLightCalc = false
        
        this.table = new Table(0, 0, 0)
        this.add(this.table)

        this.dice = new Dice(0, 0, 0)
        this.add(this.dice)

        this.ball = new Ball()
        this.add(this.ball)

        this.directionalLight = new CustomDirectionalLight(1, 1, 1, 0xffffff, 0.30, this)
        this.add(this.directionalLight)

        this.pointLight = new CustomPointLight(- 50, 25, -50, 0x00ffff, 0.60)
        this.add(this.pointLight)
    }

    animate() {
        this.swtichCamera()
        this.switchScene()

        this.ball.move()
        this.dice.move()

        this.directionalLight.updateLight()
        this.pointLight.updateLight()

        this.toggleWireframe()
        this.toggleLightCalc()
    }

    onKeyDown(e) {
        switch (e.keyCode) {
            case 66: //b
                this.ball.changeState = true
                break
            case 76: //l
                this.changeLightCalc = true
                break
            case 83: //s
                this.changeScene = true
                break
            case 68: //d
                this.directionalLight.changeActiveState = true
                break
            case 80: //p
                this.pointLight.changeActiveState = true
                break
            case 87: //w
                this.changeStateWireframe = true
                break
            case 67:
                this.changeCamera = true
                break
        }
    }

    toggleWireframe() {
        'use strict'

        if (!this.changeStateWireframe)
            return

        var toChange = new Array()
        toChange = toChange.concat(this)

        while (toChange.length > 0) {
            var current = toChange.shift()

            if (current.type == "Object3D" || current.type == "Scene")
                toChange = toChange.concat(current.children)
            else if (current.type == "Mesh")
                current.changeWireframe()
        }

        this.changeStateWireframe = false
    }

    toggleLightCalc() {
        'use strict'

        if (!this.changeLightCalc)
            return

        var toChange = new Array()
        toChange = toChange.concat(this)

        while (toChange.length > 0) {
            var current = toChange.shift()

            if (current.type == "Object3D" || current.type == "Scene")
                toChange = toChange.concat(current.children)
            else if (current.type == "Mesh")
                current.changeLightCalc()
        }

        this.changeLightCalc = false
    }

    switchScene() {
        'use strict'

        if (!this.changeScene)
            return

        activeScene = (activeScene + 1) % scenes.length
        this.changeScene = false
    }

    swtichCamera() {
        'use strict'

        if (!this.changeCamera)
            return
        
        this.camera = this.camera + 1
        if (this.camera > this.MAX_CAMERA_INDEX)
        this.camera = this.MIN_CAMERA_INDEX
        
        this.changeCamera = false
    }
}

class PauseScene extends THREE.Scene {
    constructor() {
        super()
        this.camera = 2
        this.changeScene = false
        this.restartScene = false

        texture = new THREE.TextureLoader().load('./assets/pause_screen.jpg')
        texture.wrapS = THREE.ClampToEdgeWrapping
        this.background = texture
    }

    animate() {
        this.restart()
        this.switchScene()
    }

    onKeyDown(e) {
        switch (e.keyCode) {
            case 82: //r
                this.restartScene = true
                break
            case 83: //s
                this.changeScene = true
                break
        }
    }

    switchScene() {
        'use strict'

        if (!this.changeScene)
            return

        activeScene = (activeScene + 1) % scenes.length
        this.changeScene = false
    }

    restart() {
        'use strict'

        if (!this.restartScene)
            return

        scenes[0] = new MainScene()
        this.changeScene = true
        this.restartScene = false
    }
}
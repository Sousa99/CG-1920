class MainScene extends THREE.Scene {
    constructor() {
        super()
        this.MAX_CAMERA_INDEX = 1
        this.MIN_CAMERA_INDEX = 0

        this.changeCamera = false
        this.changePause = false
        this.restartScene = false
        
        this.paused = false
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

        this.pauseText = new PauseText(- 40, 50,  -55)
        this.add(this.pauseText)
    }

    animate() {
        this.switchPause()
        this.restart()
        this.ball.changeMovement(this.paused)

        this.swtichCamera()

        this.directionalLight.updateLight()
        this.pointLight.updateLight()

        this.toggleWireframe()
        this.toggleLightCalc()

        if (!this.paused) {
            this.ball.move()
            this.dice.move()
        }
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
                this.changePause = true
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
            case 67: //c
                this.changeCamera = true
                break
            case 82: //r
                this.restartScene = true
                break
        }
    }

    toggleWireframe() {
        'use strict'

        if (!this.changeStateWireframe || this.paused) {
            this.changeStateWireframe = false
            return
        }

        var toChange = new Array()
        toChange = toChange.concat(this)

        while (toChange.length > 0) {
            var current = toChange.shift()

            if (current.constant)
                continue

            if (current.type == "Object3D" || current.type == "Scene")
                toChange = toChange.concat(current.children)
            else if (current.type == "Mesh")
                current.changeWireframe()
        }

        this.changeStateWireframe = false
    }

    toggleLightCalc() {
        'use strict'

        if (!this.changeLightCalc || this.paused) {
            this.changeLightCalc = false
            return
        }

        var toChange = new Array()
        toChange = toChange.concat(this)

        while (toChange.length > 0) {
            var current = toChange.shift()

            if (current.constant)
                continue

            if (current.type == "Object3D" || current.type == "Scene")
                toChange = toChange.concat(current.children)
            else if (current.type == "Mesh")
                current.changeLightCalc()
        }

        this.changeLightCalc = false
    }

    switchPause() {
        'use strict'

        if (!this.changePause)
            return

        if (!this.paused) {
            previousCamera = camera
            camera = 2
        } else {
            camera = previousCamera
        }

        this.paused = !this.paused
        this.changePause = false
    }

    swtichCamera() {
        'use strict'

        if (!this.changeCamera || this.paused) {
            this.changeCamera = false
            return
        }
        
        camera = camera + 1
        if (camera > this.MAX_CAMERA_INDEX)
            camera = this.MIN_CAMERA_INDEX
        
        this.changeCamera = false
    }

    restart() {
        'use strict'

        if (!this.restartScene || !this.paused)
            return

        this.restartScene = false
        camera = 0
        scene = new MainScene()
    }
}
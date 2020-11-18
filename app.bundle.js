/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/entities/Particle.ts":
/*!**********************************!*\
  !*** ./src/entities/Particle.ts ***!
  \**********************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! export particleMaxRadius [provided] [no usage info] [missing usage info prevents renaming] */
/*! export particleMoveRandomness [provided] [no usage info] [missing usage info prevents renaming] */
/*! export particlePhases [provided] [no usage info] [missing usage info prevents renaming] */
/*! export particleRadiusGrowSpeed [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.particleRadiusGrowSpeed = exports.particleMoveRandomness = exports.particleMaxRadius = exports.particlePhases = void 0;
const array_1 = __webpack_require__(/*! ../utils/array */ "./src/utils/array.ts");
exports.particlePhases = ['grow', 'shrink'];
exports.particleMaxRadius = 10;
exports.particleMoveRandomness = 3;
exports.particleRadiusGrowSpeed = 0.3;
class Particle {
    constructor(x, y, radius, color, phase) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.phase = phase;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
    update(ctx) {
        this.lifeCycle();
        this.randomMove();
        this.draw(ctx);
    }
    lifeCycle() {
        if (this.phase === 'grow') {
            this.radius +=
                exports.particleRadiusGrowSpeed * array_1.randomIntFromRange(0, exports.particleMoveRandomness);
            if (this.radius > exports.particleMaxRadius) {
                this.phase = 'shrink';
            }
        }
        if (this.phase === 'shrink') {
            this.radius -= exports.particleRadiusGrowSpeed;
            if (this.radius < 0) {
                this.radius = 0;
                this.phase = 'grow';
                this.randomPosition();
            }
        }
    }
    randomMove() {
        this.x += array_1.randomIntFromRange(-exports.particleMoveRandomness, exports.particleMoveRandomness);
        this.y += array_1.randomIntFromRange(-exports.particleMoveRandomness, exports.particleMoveRandomness);
    }
    randomPosition() {
        this.x = array_1.randomIntFromRange(0, innerWidth);
        this.y = array_1.randomIntFromRange(0, innerHeight);
    }
}
exports.default = Particle;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/*! CommonJS bailout: this is used directly at 2:23-27 */
/*! CommonJS bailout: this is used directly at 9:26-30 */
/*! CommonJS bailout: this is used directly at 14:20-24 */
/*! CommonJS bailout: this is used directly at 21:23-27 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const array_1 = __webpack_require__(/*! ./utils/array */ "./src/utils/array.ts");
const appLoop_1 = __importDefault(__webpack_require__(/*! ./utils/appLoop */ "./src/utils/appLoop.ts"));
const color_1 = __webpack_require__(/*! ./utils/color */ "./src/utils/color.ts");
const Particle_1 = __importStar(__webpack_require__(/*! ./entities/Particle */ "./src/entities/Particle.ts"));
const appWindow_1 = __webpack_require__(/*! ./utils/appWindow */ "./src/utils/appWindow.ts");
const getTextPrinter_1 = __importDefault(__webpack_require__(/*! ./utils/getTextPrinter */ "./src/utils/getTextPrinter.ts"));
const fps = 24;
const particleCount = Math.hypot(innerWidth, innerHeight);
let particles = createParticles();
appLoop_1.default({ fps, onFrame: logic });
function createParticles() {
    const items = [];
    for (let i = 0; i < particleCount; i++) {
        items.push(new Particle_1.default(array_1.randomIntFromRange(0, innerWidth), array_1.randomIntFromRange(0, innerHeight), array_1.randomIntFromRange(0, Particle_1.particleMaxRadius % i), color_1.randomRgba(), Particle_1.particlePhases[array_1.randomIntFromRange(0, 1)]));
    }
    return items;
}
function randomizeParticles() {
    particles.forEach((particle) => particle.randomPosition());
}
function recreateParticles() {
    particles = createParticles();
}
function logic({ currentFps }) {
    const context = appWindow_1.getDrawingContext();
    const mouse = appWindow_1.getMousePosition();
    const textPrinter = getTextPrinter_1.default(context);
    appWindow_1.clearDrawingArea();
    particles.forEach((object) => {
        object.update(context);
    });
    textPrinter({ text: `FPS: ${currentFps}`, position: { x: 0, y: 10 } });
    textPrinter({
        text: 'HTML CANVAS BOILERPLATE',
        color: color_1.randomRgba(),
        position: { x: mouse.x, y: mouse.y },
    });
}
appWindow_1.registerClickHandler(randomizeParticles);
appWindow_1.registerResizeHandler(recreateParticles);


/***/ }),

/***/ "./src/utils/appLoop.ts":
/*!******************************!*\
  !*** ./src/utils/appLoop.ts ***!
  \******************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
let frameCount = 0;
let fpsInterval, startTime, now, then, elapsed, loop;
function appLoop({ fps, onFrame, }) {
    fpsInterval = 1000 / fps;
    then = window.performance.now();
    startTime = then;
    loop = createLoop(onFrame);
    loop(startTime);
}
exports.default = appLoop;
function createLoop(logic) {
    return (loopTime) => {
        requestAnimationFrame(loop);
        now = loopTime;
        elapsed = now - then;
        if (elapsed > fpsInterval) {
            then = now - (elapsed % fpsInterval);
            const sinceStart = now - startTime;
            const currentFps = Math.round((1000 / (sinceStart / ++frameCount)) * 100) / 100;
            logic({ currentFps });
        }
    };
}


/***/ }),

/***/ "./src/utils/appWindow.ts":
/*!********************************!*\
  !*** ./src/utils/appWindow.ts ***!
  \********************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export clearDrawingArea [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getDrawingContext [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getMousePosition [provided] [no usage info] [missing usage info prevents renaming] */
/*! export registerClickHandler [provided] [no usage info] [missing usage info prevents renaming] */
/*! export registerResizeHandler [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getDrawingContext = exports.clearDrawingArea = exports.getMousePosition = exports.registerResizeHandler = exports.registerClickHandler = void 0;
const canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;
addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2,
};
addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});
function registerClickHandler(handler) {
    addEventListener('click', handler);
}
exports.registerClickHandler = registerClickHandler;
function registerResizeHandler(handler) {
    addEventListener('resize', () => {
        setTimeout(handler, 100);
    });
}
exports.registerResizeHandler = registerResizeHandler;
function getMousePosition() {
    return mouse;
}
exports.getMousePosition = getMousePosition;
function clearDrawingArea() {
    const c = getDrawingContext();
    c.clearRect(0, 0, canvas.width, canvas.height);
}
exports.clearDrawingArea = clearDrawingArea;
function getDrawingContext() {
    const context = canvas.getContext('2d');
    if (context) {
        return context;
    }
    throw new Error('Unable to get canvas drawing 2d context');
}
exports.getDrawingContext = getDrawingContext;


/***/ }),

/***/ "./src/utils/array.ts":
/*!****************************!*\
  !*** ./src/utils/array.ts ***!
  \****************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export randomIntFromRange [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.randomIntFromRange = void 0;
function randomIntFromRange(min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
exports.randomIntFromRange = randomIntFromRange;


/***/ }),

/***/ "./src/utils/color.ts":
/*!****************************!*\
  !*** ./src/utils/color.ts ***!
  \****************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export randomRgba [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.randomRgba = void 0;
function zeroTo256() {
    return Math.round(Math.random() * 255);
}
function zeroTo1() {
    return Math.random().toFixed(1);
}
function randomRgba() {
    return `rgba(${zeroTo256()},${zeroTo256()},${zeroTo256()},${zeroTo1()})`;
}
exports.randomRgba = randomRgba;


/***/ }),

/***/ "./src/utils/getTextPrinter.ts":
/*!*************************************!*\
  !*** ./src/utils/getTextPrinter.ts ***!
  \*************************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
function getTextPrinter(ctx) {
    return (props) => {
        const { text, color = 'black', position } = props;
        ctx.fillStyle = color;
        ctx.fillText(text, position.x, position.y);
    };
}
exports.default = getTextPrinter;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./src/index.ts");
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jYW52YXMtZ2FtZS10ZW1wbGF0ZS8uL3NyYy9lbnRpdGllcy9QYXJ0aWNsZS50cyIsIndlYnBhY2s6Ly9jYW52YXMtZ2FtZS10ZW1wbGF0ZS8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9jYW52YXMtZ2FtZS10ZW1wbGF0ZS8uL3NyYy91dGlscy9hcHBMb29wLnRzIiwid2VicGFjazovL2NhbnZhcy1nYW1lLXRlbXBsYXRlLy4vc3JjL3V0aWxzL2FwcFdpbmRvdy50cyIsIndlYnBhY2s6Ly9jYW52YXMtZ2FtZS10ZW1wbGF0ZS8uL3NyYy91dGlscy9hcnJheS50cyIsIndlYnBhY2s6Ly9jYW52YXMtZ2FtZS10ZW1wbGF0ZS8uL3NyYy91dGlscy9jb2xvci50cyIsIndlYnBhY2s6Ly9jYW52YXMtZ2FtZS10ZW1wbGF0ZS8uL3NyYy91dGlscy9nZXRUZXh0UHJpbnRlci50cyIsIndlYnBhY2s6Ly9jYW52YXMtZ2FtZS10ZW1wbGF0ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jYW52YXMtZ2FtZS10ZW1wbGF0ZS93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFhO0FBQ2IsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELCtCQUErQixHQUFHLDhCQUE4QixHQUFHLHlCQUF5QixHQUFHLHNCQUFzQjtBQUNySCxnQkFBZ0IsbUJBQU8sQ0FBQyw0Q0FBZ0I7QUFDeEMsc0JBQXNCO0FBQ3RCLHlCQUF5QjtBQUN6Qiw4QkFBOEI7QUFDOUIsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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O1VBQ0E7VUFDQSIsImZpbGUiOiJhcHAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnBhcnRpY2xlUmFkaXVzR3Jvd1NwZWVkID0gZXhwb3J0cy5wYXJ0aWNsZU1vdmVSYW5kb21uZXNzID0gZXhwb3J0cy5wYXJ0aWNsZU1heFJhZGl1cyA9IGV4cG9ydHMucGFydGljbGVQaGFzZXMgPSB2b2lkIDA7XG5jb25zdCBhcnJheV8xID0gcmVxdWlyZShcIi4uL3V0aWxzL2FycmF5XCIpO1xuZXhwb3J0cy5wYXJ0aWNsZVBoYXNlcyA9IFsnZ3JvdycsICdzaHJpbmsnXTtcbmV4cG9ydHMucGFydGljbGVNYXhSYWRpdXMgPSAxMDtcbmV4cG9ydHMucGFydGljbGVNb3ZlUmFuZG9tbmVzcyA9IDM7XG5leHBvcnRzLnBhcnRpY2xlUmFkaXVzR3Jvd1NwZWVkID0gMC4zO1xuY2xhc3MgUGFydGljbGUge1xuICAgIGNvbnN0cnVjdG9yKHgsIHksIHJhZGl1cywgY29sb3IsIHBoYXNlKSB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMucmFkaXVzID0gcmFkaXVzO1xuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgICAgIHRoaXMucGhhc2UgPSBwaGFzZTtcbiAgICB9XG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguYXJjKHRoaXMueCwgdGhpcy55LCB0aGlzLnJhZGl1cywgMCwgTWF0aC5QSSAqIDIsIGZhbHNlKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG4gICAgdXBkYXRlKGN0eCkge1xuICAgICAgICB0aGlzLmxpZmVDeWNsZSgpO1xuICAgICAgICB0aGlzLnJhbmRvbU1vdmUoKTtcbiAgICAgICAgdGhpcy5kcmF3KGN0eCk7XG4gICAgfVxuICAgIGxpZmVDeWNsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMucGhhc2UgPT09ICdncm93Jykge1xuICAgICAgICAgICAgdGhpcy5yYWRpdXMgKz1cbiAgICAgICAgICAgICAgICBleHBvcnRzLnBhcnRpY2xlUmFkaXVzR3Jvd1NwZWVkICogYXJyYXlfMS5yYW5kb21JbnRGcm9tUmFuZ2UoMCwgZXhwb3J0cy5wYXJ0aWNsZU1vdmVSYW5kb21uZXNzKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnJhZGl1cyA+IGV4cG9ydHMucGFydGljbGVNYXhSYWRpdXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBoYXNlID0gJ3Nocmluayc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucGhhc2UgPT09ICdzaHJpbmsnKSB7XG4gICAgICAgICAgICB0aGlzLnJhZGl1cyAtPSBleHBvcnRzLnBhcnRpY2xlUmFkaXVzR3Jvd1NwZWVkO1xuICAgICAgICAgICAgaWYgKHRoaXMucmFkaXVzIDwgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmFkaXVzID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLnBoYXNlID0gJ2dyb3cnO1xuICAgICAgICAgICAgICAgIHRoaXMucmFuZG9tUG9zaXRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByYW5kb21Nb3ZlKCkge1xuICAgICAgICB0aGlzLnggKz0gYXJyYXlfMS5yYW5kb21JbnRGcm9tUmFuZ2UoLWV4cG9ydHMucGFydGljbGVNb3ZlUmFuZG9tbmVzcywgZXhwb3J0cy5wYXJ0aWNsZU1vdmVSYW5kb21uZXNzKTtcbiAgICAgICAgdGhpcy55ICs9IGFycmF5XzEucmFuZG9tSW50RnJvbVJhbmdlKC1leHBvcnRzLnBhcnRpY2xlTW92ZVJhbmRvbW5lc3MsIGV4cG9ydHMucGFydGljbGVNb3ZlUmFuZG9tbmVzcyk7XG4gICAgfVxuICAgIHJhbmRvbVBvc2l0aW9uKCkge1xuICAgICAgICB0aGlzLnggPSBhcnJheV8xLnJhbmRvbUludEZyb21SYW5nZSgwLCBpbm5lcldpZHRoKTtcbiAgICAgICAgdGhpcy55ID0gYXJyYXlfMS5yYW5kb21JbnRGcm9tUmFuZ2UoMCwgaW5uZXJIZWlnaHQpO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFBhcnRpY2xlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGFycmF5XzEgPSByZXF1aXJlKFwiLi91dGlscy9hcnJheVwiKTtcbmNvbnN0IGFwcExvb3BfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi91dGlscy9hcHBMb29wXCIpKTtcbmNvbnN0IGNvbG9yXzEgPSByZXF1aXJlKFwiLi91dGlscy9jb2xvclwiKTtcbmNvbnN0IFBhcnRpY2xlXzEgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcIi4vZW50aXRpZXMvUGFydGljbGVcIikpO1xuY29uc3QgYXBwV2luZG93XzEgPSByZXF1aXJlKFwiLi91dGlscy9hcHBXaW5kb3dcIik7XG5jb25zdCBnZXRUZXh0UHJpbnRlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWxzL2dldFRleHRQcmludGVyXCIpKTtcbmNvbnN0IGZwcyA9IDI0O1xuY29uc3QgcGFydGljbGVDb3VudCA9IE1hdGguaHlwb3QoaW5uZXJXaWR0aCwgaW5uZXJIZWlnaHQpO1xubGV0IHBhcnRpY2xlcyA9IGNyZWF0ZVBhcnRpY2xlcygpO1xuYXBwTG9vcF8xLmRlZmF1bHQoeyBmcHMsIG9uRnJhbWU6IGxvZ2ljIH0pO1xuZnVuY3Rpb24gY3JlYXRlUGFydGljbGVzKCkge1xuICAgIGNvbnN0IGl0ZW1zID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJ0aWNsZUNvdW50OyBpKyspIHtcbiAgICAgICAgaXRlbXMucHVzaChuZXcgUGFydGljbGVfMS5kZWZhdWx0KGFycmF5XzEucmFuZG9tSW50RnJvbVJhbmdlKDAsIGlubmVyV2lkdGgpLCBhcnJheV8xLnJhbmRvbUludEZyb21SYW5nZSgwLCBpbm5lckhlaWdodCksIGFycmF5XzEucmFuZG9tSW50RnJvbVJhbmdlKDAsIFBhcnRpY2xlXzEucGFydGljbGVNYXhSYWRpdXMgJSBpKSwgY29sb3JfMS5yYW5kb21SZ2JhKCksIFBhcnRpY2xlXzEucGFydGljbGVQaGFzZXNbYXJyYXlfMS5yYW5kb21JbnRGcm9tUmFuZ2UoMCwgMSldKSk7XG4gICAgfVxuICAgIHJldHVybiBpdGVtcztcbn1cbmZ1bmN0aW9uIHJhbmRvbWl6ZVBhcnRpY2xlcygpIHtcbiAgICBwYXJ0aWNsZXMuZm9yRWFjaCgocGFydGljbGUpID0+IHBhcnRpY2xlLnJhbmRvbVBvc2l0aW9uKCkpO1xufVxuZnVuY3Rpb24gcmVjcmVhdGVQYXJ0aWNsZXMoKSB7XG4gICAgcGFydGljbGVzID0gY3JlYXRlUGFydGljbGVzKCk7XG59XG5mdW5jdGlvbiBsb2dpYyh7IGN1cnJlbnRGcHMgfSkge1xuICAgIGNvbnN0IGNvbnRleHQgPSBhcHBXaW5kb3dfMS5nZXREcmF3aW5nQ29udGV4dCgpO1xuICAgIGNvbnN0IG1vdXNlID0gYXBwV2luZG93XzEuZ2V0TW91c2VQb3NpdGlvbigpO1xuICAgIGNvbnN0IHRleHRQcmludGVyID0gZ2V0VGV4dFByaW50ZXJfMS5kZWZhdWx0KGNvbnRleHQpO1xuICAgIGFwcFdpbmRvd18xLmNsZWFyRHJhd2luZ0FyZWEoKTtcbiAgICBwYXJ0aWNsZXMuZm9yRWFjaCgob2JqZWN0KSA9PiB7XG4gICAgICAgIG9iamVjdC51cGRhdGUoY29udGV4dCk7XG4gICAgfSk7XG4gICAgdGV4dFByaW50ZXIoeyB0ZXh0OiBgRlBTOiAke2N1cnJlbnRGcHN9YCwgcG9zaXRpb246IHsgeDogMCwgeTogMTAgfSB9KTtcbiAgICB0ZXh0UHJpbnRlcih7XG4gICAgICAgIHRleHQ6ICdIVE1MIENBTlZBUyBCT0lMRVJQTEFURScsXG4gICAgICAgIGNvbG9yOiBjb2xvcl8xLnJhbmRvbVJnYmEoKSxcbiAgICAgICAgcG9zaXRpb246IHsgeDogbW91c2UueCwgeTogbW91c2UueSB9LFxuICAgIH0pO1xufVxuYXBwV2luZG93XzEucmVnaXN0ZXJDbGlja0hhbmRsZXIocmFuZG9taXplUGFydGljbGVzKTtcbmFwcFdpbmRvd18xLnJlZ2lzdGVyUmVzaXplSGFuZGxlcihyZWNyZWF0ZVBhcnRpY2xlcyk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmxldCBmcmFtZUNvdW50ID0gMDtcbmxldCBmcHNJbnRlcnZhbCwgc3RhcnRUaW1lLCBub3csIHRoZW4sIGVsYXBzZWQsIGxvb3A7XG5mdW5jdGlvbiBhcHBMb29wKHsgZnBzLCBvbkZyYW1lLCB9KSB7XG4gICAgZnBzSW50ZXJ2YWwgPSAxMDAwIC8gZnBzO1xuICAgIHRoZW4gPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XG4gICAgc3RhcnRUaW1lID0gdGhlbjtcbiAgICBsb29wID0gY3JlYXRlTG9vcChvbkZyYW1lKTtcbiAgICBsb29wKHN0YXJ0VGltZSk7XG59XG5leHBvcnRzLmRlZmF1bHQgPSBhcHBMb29wO1xuZnVuY3Rpb24gY3JlYXRlTG9vcChsb2dpYykge1xuICAgIHJldHVybiAobG9vcFRpbWUpID0+IHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuICAgICAgICBub3cgPSBsb29wVGltZTtcbiAgICAgICAgZWxhcHNlZCA9IG5vdyAtIHRoZW47XG4gICAgICAgIGlmIChlbGFwc2VkID4gZnBzSW50ZXJ2YWwpIHtcbiAgICAgICAgICAgIHRoZW4gPSBub3cgLSAoZWxhcHNlZCAlIGZwc0ludGVydmFsKTtcbiAgICAgICAgICAgIGNvbnN0IHNpbmNlU3RhcnQgPSBub3cgLSBzdGFydFRpbWU7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50RnBzID0gTWF0aC5yb3VuZCgoMTAwMCAvIChzaW5jZVN0YXJ0IC8gKytmcmFtZUNvdW50KSkgKiAxMDApIC8gMTAwO1xuICAgICAgICAgICAgbG9naWMoeyBjdXJyZW50RnBzIH0pO1xuICAgICAgICB9XG4gICAgfTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZXREcmF3aW5nQ29udGV4dCA9IGV4cG9ydHMuY2xlYXJEcmF3aW5nQXJlYSA9IGV4cG9ydHMuZ2V0TW91c2VQb3NpdGlvbiA9IGV4cG9ydHMucmVnaXN0ZXJSZXNpemVIYW5kbGVyID0gZXhwb3J0cy5yZWdpc3RlckNsaWNrSGFuZGxlciA9IHZvaWQgMDtcbmNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NhbnZhcycpO1xuY2FudmFzLndpZHRoID0gaW5uZXJXaWR0aDtcbmNhbnZhcy5oZWlnaHQgPSBpbm5lckhlaWdodDtcbmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcbiAgICBjYW52YXMud2lkdGggPSBpbm5lcldpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBpbm5lckhlaWdodDtcbn0pO1xuY29uc3QgbW91c2UgPSB7XG4gICAgeDogaW5uZXJXaWR0aCAvIDIsXG4gICAgeTogaW5uZXJIZWlnaHQgLyAyLFxufTtcbmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChldmVudCkgPT4ge1xuICAgIG1vdXNlLnggPSBldmVudC5jbGllbnRYO1xuICAgIG1vdXNlLnkgPSBldmVudC5jbGllbnRZO1xufSk7XG5mdW5jdGlvbiByZWdpc3RlckNsaWNrSGFuZGxlcihoYW5kbGVyKSB7XG4gICAgYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVyKTtcbn1cbmV4cG9ydHMucmVnaXN0ZXJDbGlja0hhbmRsZXIgPSByZWdpc3RlckNsaWNrSGFuZGxlcjtcbmZ1bmN0aW9uIHJlZ2lzdGVyUmVzaXplSGFuZGxlcihoYW5kbGVyKSB7XG4gICAgYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KGhhbmRsZXIsIDEwMCk7XG4gICAgfSk7XG59XG5leHBvcnRzLnJlZ2lzdGVyUmVzaXplSGFuZGxlciA9IHJlZ2lzdGVyUmVzaXplSGFuZGxlcjtcbmZ1bmN0aW9uIGdldE1vdXNlUG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIG1vdXNlO1xufVxuZXhwb3J0cy5nZXRNb3VzZVBvc2l0aW9uID0gZ2V0TW91c2VQb3NpdGlvbjtcbmZ1bmN0aW9uIGNsZWFyRHJhd2luZ0FyZWEoKSB7XG4gICAgY29uc3QgYyA9IGdldERyYXdpbmdDb250ZXh0KCk7XG4gICAgYy5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbn1cbmV4cG9ydHMuY2xlYXJEcmF3aW5nQXJlYSA9IGNsZWFyRHJhd2luZ0FyZWE7XG5mdW5jdGlvbiBnZXREcmF3aW5nQ29udGV4dCgpIHtcbiAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgaWYgKGNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIGNvbnRleHQ7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGdldCBjYW52YXMgZHJhd2luZyAyZCBjb250ZXh0Jyk7XG59XG5leHBvcnRzLmdldERyYXdpbmdDb250ZXh0ID0gZ2V0RHJhd2luZ0NvbnRleHQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucmFuZG9tSW50RnJvbVJhbmdlID0gdm9pZCAwO1xuZnVuY3Rpb24gcmFuZG9tSW50RnJvbVJhbmdlKG1pbiA9IE51bWJlci5NSU5fU0FGRV9JTlRFR0VSLCBtYXggPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUikge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pO1xufVxuZXhwb3J0cy5yYW5kb21JbnRGcm9tUmFuZ2UgPSByYW5kb21JbnRGcm9tUmFuZ2U7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucmFuZG9tUmdiYSA9IHZvaWQgMDtcbmZ1bmN0aW9uIHplcm9UbzI1NigpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMjU1KTtcbn1cbmZ1bmN0aW9uIHplcm9UbzEoKSB7XG4gICAgcmV0dXJuIE1hdGgucmFuZG9tKCkudG9GaXhlZCgxKTtcbn1cbmZ1bmN0aW9uIHJhbmRvbVJnYmEoKSB7XG4gICAgcmV0dXJuIGByZ2JhKCR7emVyb1RvMjU2KCl9LCR7emVyb1RvMjU2KCl9LCR7emVyb1RvMjU2KCl9LCR7emVyb1RvMSgpfSlgO1xufVxuZXhwb3J0cy5yYW5kb21SZ2JhID0gcmFuZG9tUmdiYTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gZ2V0VGV4dFByaW50ZXIoY3R4KSB7XG4gICAgcmV0dXJuIChwcm9wcykgPT4ge1xuICAgICAgICBjb25zdCB7IHRleHQsIGNvbG9yID0gJ2JsYWNrJywgcG9zaXRpb24gfSA9IHByb3BzO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gY29sb3I7XG4gICAgICAgIGN0eC5maWxsVGV4dCh0ZXh0LCBwb3NpdGlvbi54LCBwb3NpdGlvbi55KTtcbiAgICB9O1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gZ2V0VGV4dFByaW50ZXI7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LnRzXCIpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==
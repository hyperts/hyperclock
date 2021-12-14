"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.styles = void 0;
const react_1 = __importStar(require("../../../modules/react"));
const dayjs_1 = __importDefault(require("../modules/dayjs"));
class StateComponent extends react_1.Component {
    constructor(props) {
        super(props);
    }
    startClock() {
        const timeFormat = this.props.userConfig.getValue('widgets', 'hyper_clock', 'text');
        const timeContainer = document.querySelector('.hyperclock.wrapper .time');
        timeContainer.textContent = (0, dayjs_1.default)().format(timeFormat);
        setTimeout(() => {
            this.startClock();
        }, 1000);
    }
    componentDidMount() {
        // decided to go with useEffect / didMount
        // don't want the entire react rendering after each sec
        this.startClock();
    }
    render() {
        const showCallendar = this.props.userConfig.getValue('widgets', 'hyper_clock', 'showcallendar');
        return (react_1.default.createElement("div", { className: "hyperclock wrapper" },
            react_1.default.createElement("p", { className: "time" })));
    }
}
// Hyper carries our api & other stuff inside `this` context.
// React contructor doesn't pass the values, so we call it as a function
// Check hyper-menu module for a stateless component example
function default_1() {
    return react_1.default.createElement(StateComponent, Object.assign({ key: 'hyper-clock', userConfig: this.config, ipcRenderer: this.api.ipcRenderer }, this.props));
}
exports.default = default_1;
exports.styles = ['styles/index.css'];

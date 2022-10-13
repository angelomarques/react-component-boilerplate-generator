/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("util");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getComponentIndexFile = exports.getComponentTestFile = exports.getComponentMainFile = void 0;
const getComponentMainFile = (componentName) => `import React from "react";

const ${componentName} = () => {
    return <div>${componentName}</div>
}
    
export default ${componentName};`;
exports.getComponentMainFile = getComponentMainFile;
const getComponentTestFile = (componentName) => `import { render } from "@testing-library/react";
import ${componentName} from ".";

describe("${componentName} Component", () => {
    it("should render the component", () => {
      render(<${componentName} />);
    })
});
`;
exports.getComponentTestFile = getComponentTestFile;
const getComponentIndexFile = (componentName) => `export { default } from "./${componentName}";`;
exports.getComponentIndexFile = getComponentIndexFile;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const util_1 = __webpack_require__(1);
const vscode = __webpack_require__(2);
const component_1 = __webpack_require__(3);
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "react-component-boilerplate-generator" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand("react-component-boilerplate-generator.create-component", async () => {
        if (!vscode.workspace.workspaceFolders) {
            vscode.window.showErrorMessage('You need to have an open folder.');
            return;
        }
        const componentName = await vscode.window.showInputBox({
            title: "Type the name of the component",
        });
        if (!componentName) {
            vscode.window.showErrorMessage('You need to type an valid component name.');
            return;
        }
        if (componentName[0].toUpperCase() !== componentName[0]) {
            vscode.window.showErrorMessage('The first letter of the component name needs to be Uppercase');
            return;
        }
        const mainFileUri = vscode.workspace.workspaceFolders[0].uri +
            `/src/components/${componentName}/${componentName}.tsx`;
        const indexFileUri = vscode.workspace.workspaceFolders[0].uri +
            `/src/components/${componentName}/index.tsx`;
        const testFileUri = vscode.workspace.workspaceFolders[0].uri +
            `/src/components/${componentName}/${componentName}.test.tsx`;
        const stylesFileUri = vscode.workspace.workspaceFolders[0].uri +
            `/src/components/${componentName}/styles.ts`;
        await vscode.workspace.fs.writeFile(vscode.Uri.parse(indexFileUri), new util_1.TextEncoder().encode((0, component_1.getComponentIndexFile)(componentName)));
        await vscode.workspace.fs.writeFile(vscode.Uri.parse(testFileUri), new util_1.TextEncoder().encode((0, component_1.getComponentTestFile)(componentName)));
        await vscode.workspace.fs.writeFile(vscode.Uri.parse(stylesFileUri), new util_1.TextEncoder().encode(""));
        await vscode.workspace.fs.writeFile(vscode.Uri.parse(mainFileUri), new util_1.TextEncoder().encode((0, component_1.getComponentMainFile)(componentName)));
        vscode.window.showTextDocument(vscode.Uri.parse(mainFileUri), {
            preview: false,
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map
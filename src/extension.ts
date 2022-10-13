// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { TextEncoder } from "util";
import * as vscode from "vscode";
import {
  getComponentIndexFile,
  getComponentMainFile,
  getComponentTestFile,
} from "./file_content/component";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "react-component-boilerplate-generator" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "react-component-boilerplate-generator.create-component",
    async () => {
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

      const mainFileUri =
        vscode.workspace.workspaceFolders[0].uri +
        `/src/components/${componentName}/${componentName}.tsx`;
      const indexFileUri =
        vscode.workspace.workspaceFolders[0].uri +
        `/src/components/${componentName}/index.tsx`;
      const testFileUri =
        vscode.workspace.workspaceFolders[0].uri +
        `/src/components/${componentName}/${componentName}.test.tsx`;
      const stylesFileUri =
        vscode.workspace.workspaceFolders[0].uri +
        `/src/components/${componentName}/styles.ts`;

      await vscode.workspace.fs.writeFile(
        vscode.Uri.parse(indexFileUri),
        new TextEncoder().encode(getComponentIndexFile(componentName))
      );

      await vscode.workspace.fs.writeFile(
        vscode.Uri.parse(testFileUri),
        new TextEncoder().encode(getComponentTestFile(componentName))
      );

      await vscode.workspace.fs.writeFile(
        vscode.Uri.parse(stylesFileUri),
        new TextEncoder().encode("")
      );

      await vscode.workspace.fs.writeFile(
        vscode.Uri.parse(mainFileUri),
        new TextEncoder().encode(getComponentMainFile(componentName))
      );
      vscode.window.showTextDocument(vscode.Uri.parse(mainFileUri), {
        preview: false,
      });
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}

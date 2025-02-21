/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { window, env, Uri, workspace, Selection, Range } from 'vscode';

/**
 */
export async function openCodeLink() {
    // get the link string from clipboard
    const link = await env.clipboard.readText(); 
	const result = await window.showInputBox({
		value: link,
		placeHolder: 'codelink://filepath:linenum',
        validateInput: text => {
            const [filepath, linenum] = text.replace('codelink://', '').split(':');
            if (!filepath || !linenum) {
                return 'Invalid codelink';
            }
            return null;
        }
	});
    if (!result) {
        return;
    }
    // parse the link, get filepath and linenum
    const [filepath, linenum] = result.replace('codelink://', '').split(':');
	window.showInformationMessage(`Got: ${result} Filepath: ${filepath} Linenum: ${linenum}`);
    // open the file and locate to the line number
    const uri = Uri.file(filepath);
    const document = await workspace.openTextDocument(uri);
    await window.showTextDocument(document);
    const editor = window.activeTextEditor;
    if (editor) {
        const line = Number(linenum) - 1;
        editor.selection = new Selection(line, 0, line, 0);
        editor.revealRange(new Range(line, 0, line, 0));
    }
}

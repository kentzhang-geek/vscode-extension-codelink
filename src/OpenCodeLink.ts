/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { window, env, Uri, workspace, Selection, Range } from 'vscode';

function parseCodeLink(link: string): { filepath: string; linenum: number } | null {
    const rawLink = link.trim();
    if (!rawLink.startsWith('codelink://')) {
        return null;
    }

    const payload = rawLink.slice('codelink://'.length);
    const separatorIndex = payload.lastIndexOf(':');
    if (separatorIndex <= 0) {
        return null;
    }

    const filepath = payload.slice(0, separatorIndex);
    const linePart = payload.slice(separatorIndex + 1);
    const linenum = Number(linePart);

    if (!filepath || !Number.isInteger(linenum) || linenum <= 0) {
        return null;
    }

    return { filepath, linenum };
}

/**
 */
export async function openCodeLink() {
    // get the link string from clipboard
    const link = await env.clipboard.readText();
    const result = await window.showInputBox({
        value: link,
        placeHolder: 'codelink://filepath:linenum',
        validateInput: text => {
            const parsed = parseCodeLink(text);
            if (!parsed) {
                return 'Invalid codelink';
            }
            return null;
        }
    });

    if (!result) {
        return;
    }

    const parsed = parseCodeLink(result);
    if (!parsed) {
        await window.showErrorMessage('Invalid codelink');
        return;
    }

    // open the file and locate to the line number
    const uri = Uri.file(parsed.filepath);
    const document = await workspace.openTextDocument(uri);
    await window.showTextDocument(document);
    const editor = window.activeTextEditor;
    if (editor) {
        const line = parsed.linenum - 1;
        editor.selection = new Selection(line, 0, line, 0);
        editor.revealRange(new Range(line, 0, line, 0));
    }
}

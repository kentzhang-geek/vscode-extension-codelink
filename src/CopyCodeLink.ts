/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { window, env } from 'vscode';

/**
 * Copy codelink to clipboard
 */
export async function copyCodeLink() {
    // get file path and current line number
    const editor = window.activeTextEditor;
    if (!editor) {
        return;
    }
    const filepath = editor.document.fileName;
    const linenum = editor.selection.active.line + 1;
    const link = `codelink://${filepath}:${linenum}`;

    // copy the link to clipboard
    await env.clipboard.writeText(link);
}

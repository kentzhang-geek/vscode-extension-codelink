/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { commands, ExtensionContext } from 'vscode';
import { openCodeLink } from './OpenCodeLink';
import { copyCodeLink } from './CopyCodeLink';

export function activate(context: ExtensionContext) {
	context.subscriptions.push(commands.registerCommand('codelink.open', async () => {
        await openCodeLink();
	}));
	context.subscriptions.push(commands.registerCommand('codelink.copy', async () => {
        await copyCodeLink();
	}));
}

//
// Copyright © 2024 Hardcore Engineering Inc.
//
// Licensed under the Eclipse Public License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License. You may
// obtain a copy of the License at https://www.eclipse.org/legal/epl-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//
// See the License for the specific language governing permissions and
// limitations under the License.
//

import { type CollaboratorClient, getClient as getCollaborator } from '@hcengineering/collaborator-client'
import { getWorkspaceId, type Class, type Doc, type Markup, type Ref } from '@hcengineering/core'
import { getMetadata } from '@hcengineering/platform'
import { getCurrentLocation } from '@hcengineering/ui'

import { getClient } from '.'
import presentation from './plugin'

/**
 * @public
 */
export function getCollaboratorClient (): CollaboratorClient {
  const workspaceId = getWorkspaceId(getCurrentLocation().path[1] ?? '')
  const hierarchy = getClient().getHierarchy()
  const token = getMetadata(presentation.metadata.Token) ?? ''
  const collaboratorURL = getMetadata(presentation.metadata.CollaboratorUrl) ?? ''

  return getCollaborator(hierarchy, workspaceId, token, collaboratorURL)
}

/**
 * @public
 */
export async function getMarkup (classId: Ref<Class<Doc>>, docId: Ref<Doc>, attribute: string): Promise<Markup> {
  const client = getCollaboratorClient()
  return await client.get(classId, docId, attribute)
}

/**
 * @public
 */
export async function updateMarkup (
  classId: Ref<Class<Doc>>,
  docId: Ref<Doc>,
  attribute: string,
  value: Markup
): Promise<void> {
  const client = getCollaboratorClient()

  await client.update(classId, docId, attribute, value)
}

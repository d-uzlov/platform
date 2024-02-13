//
// Copyright © 2020, 2021 Anticrm Platform Contributors.
// Copyright © 2022 Hardcore Engineering Inc.
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

import {
  formId,
} from '@hcengineering/forms'
import {
  type Client,
  type Doc,
  type IdMap,
  type ObjQueryType,
  type Ref,
  type Timestamp,
  type TxOperations,
  getCurrentAccount,
  toIdMap
} from '@hcengineering/core'
import notification, { type DocNotifyContext, type InboxNotification } from '@hcengineering/notification'
import { getResource } from '@hcengineering/platform'
import { createQuery, getClient } from '@hcengineering/presentation'
import { type TemplateDataProvider } from '@hcengineering/templates'
import {
  type Location,
  type ResolvedLocation,
  type TabItem,
  getCurrentResolvedLocation,
  getPanelURI
} from '@hcengineering/ui'
import view, { type Filter } from '@hcengineering/view'
import { FilterQuery } from '@hcengineering/view-resources'
import { derived, get, writable } from 'svelte/store'
import form from './plugin'
import { Form } from '@hcengineering/forms'

export async function resolveLocation (loc: Location): Promise<ResolvedLocation | undefined> {
  if (loc.path[2] !== formId) {
    return undefined
  }

  const id = loc.path[3] as Ref<Form>
  if (id !== undefined) {
    return await generateLocation(loc, id)
  }
}

async function generateLocation (loc: Location, id: Ref<Form>): Promise<ResolvedLocation | undefined> {
  const client = getClient()
  const doc = await client.findOne(form.class.Form, { _id: id })
  if (doc === undefined) {
    console.error(`Could not find form ${id}.`)
    return undefined
  }
  const appComponent = loc.path[0] ?? ''
  const workspace = loc.path[1] ?? ''
  const special = loc.path[2] ?? ''
  return {
    loc: {
      path: [appComponent, workspace],
      fragment: getPanelURI(view.component.EditDoc, doc._id, doc._class, 'content')
    },
    defaultLocation: {
      path: [appComponent, workspace, formId, special],
      fragment: getPanelURI(view.component.EditDoc, doc._id, doc._class, 'content')
    }
  }
}

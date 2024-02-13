//
// Copyright © 2020 Anticrm Platform Contributors.
// Copyright © 2023 Hardcore Engineering Inc.
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

import { formId } from '@hcengineering/forms'
import form from '@hcengineering/forms-resources/src/plugin'
import type { Client, Doc, Ref } from '@hcengineering/core'
import { type ObjectSearchCategory, type ObjectSearchFactory } from '@hcengineering/model-presentation'
import { type NotificationGroup } from '@hcengineering/notification'
import { type IntlString, mergeIds, type Resource } from '@hcengineering/platform'
import { type TemplateFieldFunc } from '@hcengineering/templates'
import type { AnyComponent } from '@hcengineering/ui/src/types'
import { type Action, type ActionCategory, type ViewAction } from '@hcengineering/view'
import { type ChatMessageViewlet } from '@hcengineering/chunter'

export default mergeIds(formId, form, {
  activity: {
  },
  component: {
  },
  string: {
  },
  completion: {
  },
  category: {
  },
  ids: {
  },
  action: {
  },
  actionImpl: {
  },
  function: {
  }
})

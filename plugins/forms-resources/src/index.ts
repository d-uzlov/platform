//
// Copyright © 2020, 2021 Anticrm Platform Contributors.
// Copyright © 2021 Hardcore Engineering Inc.
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
  type Class,
  type Client,
  type DocumentQuery,
  type Ref,
  type RelatedDocument,
  type WithLookup
} from '@hcengineering/core'
import login from '@hcengineering/login'
import { type IntlString, type Resources, getResource } from '@hcengineering/platform'
import { MessageBox, type ObjectSearchResult, getClient, getFileUrl } from '@hcengineering/presentation'
import {
  type AnyComponent,
  type AnySvelteComponent,
  type IconSize,
  type TooltipAlignment,
  getIconSize2x,
  parseURL,
  showPopup
} from '@hcengineering/ui'
import CreateForm from './components/CreateForm.svelte'
import FormPresenter from './components/FormPresenter.svelte'
import Questions from './components/Questions.svelte'
import QuestionPresenter from './components/QuestionPresenter.svelte'

import form from './plugin'
import {
  resolveLocation
} from './utils'

export * from './utils'
export {
  CreateForm,
  FormPresenter,
  Questions,
  QuestionPresenter,
}

export default async (): Promise<Resources> => ({
  actionImpl: {
  },
  activity: {
  },
  component: {
    CreateForm,
    FormPresenter,
    Questions,
    QuestionPresenter,
  },
  completion: {
  },
  function: {
  },
  resolver: {
    Location: resolveLocation
  }
})

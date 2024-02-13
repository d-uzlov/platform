//
// Copyright © 2020, 2021 Anticrm Platform Contributors.
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

import { Account, AttachedDoc, Class, Doc, Ref, Space, Timestamp, UXObject } from '@hcengineering/core'
import type { Asset, Plugin, Resource } from '@hcengineering/platform'
import { IntlString, plugin } from '@hcengineering/platform'
import { TemplateField, TemplateFieldCategory } from '@hcengineering/templates'
import type { AnyComponent, IconSize, ResolvedLocation } from '@hcengineering/ui'
import { FilterMode, ViewAction, Viewlet } from '@hcengineering/view'

/**
 * @public
 */
export interface Form extends Doc {
  name: string
  description: string
  questions: number
}

/**
 * @public
 */
export enum QuestionType {
  Open = 'Open',
  Number = 'Number',
  Radio = 'Radio',
  CheckBox = 'CheckBox',
}

/**
 * @public
 */
export interface Question extends AttachedDoc<Form> {
  attachedTo: Ref<Form>
  attachedToClass: Ref<Class<Form>>
  content: string
  type: QuestionType
  options: string[]
}

export interface Answer {
  questionRef: Ref<Question>
  value: string
}

export interface FilledForm extends AttachedDoc<Form> {
  attachedTo: Ref<Form>
  attachedToClass: Ref<Class<Form>>
  answers: Answer[]
}

/**
 * @public
 */
export const formId = 'form' as Plugin

/**
 * @public
 */

export const formPlugin = plugin(formId, {
  class: {
    Form: '' as Ref<Class<Form>>,
    Question: '' as Ref<Class<Question>>,
    FilledForm: '' as Ref<Class<FilledForm>>,
  },
  mixin: {
  },
  component: {
    CreateForm: '' as AnyComponent,
    FormPresenter: '' as AnyComponent,
    Questions: '' as AnyComponent,
    QuestionPresenter: '' as AnyComponent,
    OpenQuestionPresenter: '' as AnyComponent,
    NumberQuestionPresenter: '' as AnyComponent,
    RadioQuestionPresenter: '' as AnyComponent,
    CheckBoxQuestionPresenter: '' as AnyComponent,
  },
  function: {
  },
  icon: {
    FormsApplication: '' as Asset,
  },
  space: {
    Forms: '' as Ref<Space>
  },
  app: {
    Forms: '' as Ref<Doc>
  },
  string: {
    FormsApplication: '' as IntlString,
    SpaceHeader: '' as IntlString,
    FormsMainSpace: '' as IntlString,
    Form: '' as IntlString,
    FormName: '' as IntlString,
    FormDescription: '' as IntlString,
    CreateForm: '' as IntlString,
    FormAlreadyExists: '' as IntlString,
    FormQuestions: '' as IntlString,
    Question: '' as IntlString,
    Questions: '' as IntlString,
    NoQuestions: '' as IntlString,
    QuestionContent: '' as IntlString,
    AddQuestion: '' as IntlString,
    CreateQuestion: '' as IntlString,
    QuestionOptions: '' as IntlString,
    QuestionOption: '' as IntlString,
    QuestionNewOption: '' as IntlString,
    QuestionDeleteOption: '' as IntlString,
    QuestionType: '' as IntlString,
    QuestionTypeOpen: '' as IntlString,
    QuestionTypeNumber: '' as IntlString,
    QuestionTypeRadio: '' as IntlString,
    QuestionTypeCheckBox: '' as IntlString,
    ConfigLabel: '' as IntlString,
    ConfigDescription: '' as IntlString,
  },
  viewlet: {
    TableForm: '' as Ref<Viewlet>,
    TableQuestion: '' as Ref<Viewlet>,
  },
  resolver: {
    Location: '' as Resource<(loc: Location) => Promise<ResolvedLocation | undefined>>
  },
  templateFieldCategory: {
  },
  templateField: {
  }
})

export default formPlugin
export * from './types'
export * from './utils'

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

import activity from '@hcengineering/activity'
import {
  type Form,
  type Question,
  // type Answer,
  // type FilledForm,
  formId,
  QuestionType
} from '@hcengineering/forms'
import {
  type Class,
  DOMAIN_MODEL,
  DateRangeMode,
  type Domain,
  IndexKind,
  type Ref,
  type Timestamp
} from '@hcengineering/core'
import {
  type Builder,
  Collection,
  Hidden,
  Index,
  Mixin,
  Model,
  Prop,
  ReadOnly,
  TypeBoolean,
  TypeDate,
  TypeRef,
  TypeString,
  TypeTimestamp,
  TypeAttachment,
  UX,
  TypeAny
} from '@hcengineering/model'
import attachment from '@hcengineering/model-attachment'
import chunter from '@hcengineering/model-chunter'
import core, { TAccount, TAttachedDoc, TDoc, TSpace } from '@hcengineering/model-core'
import presentation from '@hcengineering/model-presentation'
import view, { type ViewAction, type Viewlet, createAction } from '@hcengineering/model-view'
import workbench from '@hcengineering/model-workbench'
import { generateClassNotificationTypes } from '@hcengineering/model-notification'
import notification from '@hcengineering/notification'
import type { Asset, IntlString, Resource } from '@hcengineering/platform'
import setting from '@hcengineering/setting'
import templates from '@hcengineering/templates'
import { type AnyComponent } from '@hcengineering/ui/src/types'
import form from './plugin'

export { formId } from '@hcengineering/forms'
export { formsOperation } from './migration'
export { form as default }

export const DOMAIN_FORMS = 'forms' as Domain

@Model(form.class.Form, core.class.Doc, DOMAIN_FORMS)
@UX(form.string.Form, undefined, 'FORM', 'name')
export class TForm extends TDoc implements Form {
  @Prop(TypeString(), form.string.FormName)
  @Index(IndexKind.FullText)
    name!: string

  @Prop(TypeString(), form.string.FormDescription)
  @Index(IndexKind.FullText)
    description!: string
    
  @Prop(Collection(form.class.Question), form.string.FormQuestions)
    questions!: number
}

@Model(form.class.Question, core.class.AttachedDoc, DOMAIN_FORMS)
@UX(form.string.Question)
export class TQuestion extends TAttachedDoc implements Question {
  declare attachedTo: Ref<Form>
  declare attachedToClass: Ref<Class<Form>>

  @Prop(TypeString(), form.string.QuestionContent)
  @Index(IndexKind.FullText)
  content!: string

  type!: QuestionType
  
  @Prop(TypeString(), form.string.QuestionOptions)
  options!: string[]
}

// export class TFilledForm extends TAttachedDoc implements FilledForm {
//   declare attachedTo: Ref<Form>
//   declare attachedToClass: Ref<Class<Form>>
//   answers!: Answer[]
// }

export function createModel (builder: Builder): void {
  builder.createModel(
    TForm,
    TQuestion,
    // TFilledForm,
  )

  builder.mixin(form.class.Form, core.class.Class, activity.mixin.ActivityDoc, {})
  builder.mixin(form.class.Question, core.class.Class, activity.mixin.ActivityDoc, {})
  builder.mixin(form.class.Form, core.class.Class, core.mixin.FullTextSearchContext, {
    fullTextSummary: true
  })
  builder.mixin(form.class.Question, core.class.Class, core.mixin.FullTextSearchContext, {
    fullTextSummary: true
  })

  builder.createDoc(
    workbench.class.Application,
    core.space.Model,
    {
      label: form.string.FormsApplication,
      icon: form.icon.FormsApplication,
      alias: formId,
      hidden: false,
      // component: contact.component.ContactsTabs,
      locationResolver: form.resolver.Location,
      aside: chunter.component.ThreadView,
      navigatorModel: {
        spaces: [],
        specials: [
          {
            id: 'forms',
            component: workbench.component.SpecialView,
            // icon: contact.icon.Person,
            label: form.string.FormsMainSpace,
            componentProps: {
              _class: form.class.Form,
              // icon: contact.icon.Person,
              label: form.string.FormsMainSpace,
              createLabel: form.string.CreateForm,
              createComponent: form.component.CreateForm
            }
          },
          // {
          //   id: 'questions',
          //   component: workbench.component.SpecialView,
          //   // icon: contact.icon.Person,
          //   label: contact.string.Question,
          //   componentProps: {
          //     _class: contact.class.Question,
          //     // icon: contact.icon.Person,
          //     label: contact.string.Question,
          //     createLabel: contact.string.Question,
          //     // createComponent: contact.component.CreateForm
          //   }
          // },
        ]
      }
    },
    form.app.Forms
  )

  builder.createDoc<Viewlet>(
    view.class.Viewlet,
    core.space.Model,
    {
      attachTo: form.class.Form,
      descriptor: view.viewlet.Table,
      config: [
        '',
        // 'name',
        'description',
        'modifiedOn',
      ],
      configOptions: {
        hiddenKeys: ['name'],
        sortable: true
      }
    },
    form.viewlet.TableForm
  )
  builder.createDoc<Viewlet>(
    view.class.Viewlet,
    core.space.Model,
    {
      attachTo: form.class.Question,
      descriptor: view.viewlet.Table,
      config: [
        '',
        // 'name',
        // 'description',
        'modifiedOn',
      ],
      configOptions: {
        hiddenKeys: ['content'],
        sortable: true
      }
    },
    form.viewlet.TableQuestion
  )

  builder.mixin(form.class.Question, core.class.Class, view.mixin.CollectionEditor, {
    editor: form.component.Questions
  })

  builder.mixin(form.class.Form, core.class.Class, view.mixin.ObjectPresenter, {
    presenter: form.component.FormPresenter
  })
  builder.mixin(form.class.Question, core.class.Class, view.mixin.ObjectPresenter, {
    presenter: form.component.QuestionPresenter
  })
}

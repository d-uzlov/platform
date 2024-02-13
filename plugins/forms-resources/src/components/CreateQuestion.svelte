<!--
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
-->
<script lang="ts">
  import { Form, Question, QuestionType } from '@hcengineering/forms'
  import { AttachedData, Class, Doc, fillDefaults, generateId, Ref, TxOperations, WithLookup } from '@hcengineering/core'
  import { Card, getClient, InlineAttributeBar } from '@hcengineering/presentation'
  import { Button, createFocusManager, EditBox, FocusHandler, IconInfo, Label } from '@hcengineering/ui'
  import { createEventDispatcher } from 'svelte'
  import form from '../plugin'
  import QuestionPresenter from './QuestionPresenter.svelte'
  import QuestionTypeEditor from './QuestionTypeEditor.svelte'
  import CreateQuestionOptions from './CreateQuestionOptions.svelte'

  export let onCreate: ((id: Ref<Question>, client: TxOperations) => Promise<void>) | undefined = undefined

  export function canClose (): boolean {
    return object.content === ''
  }
  
  export let _class: Ref<Class<Doc>>
  console.log('create questions: _class', _class);
  export let myId: Ref<Form>
  console.log('create questions: myId', myId);

  const id: Ref<Question> = generateId()

  const object: Question = {
    content: '',
    type: QuestionType.Open,
    options: [],
  } as unknown as Question
  $: console.log('object.options:', object.options)

  const dispatch = createEventDispatcher()
  const client = getClient()
  const hierarchy = client.getHierarchy()

  fillDefaults(hierarchy, object, form.class.Question)

  async function createQuestion () {
    console.log('createQuestion: object:', object)
    await client.addCollection(
      form.class.Question,
      form.space.Forms,
      myId,
      form.class.Form,
      'questions',
      object
    )
    if (onCreate !== undefined) {
      await onCreate?.(id, client)
    }

    dispatch('close', id)
  }

  const focusManager = createFocusManager()

  let matches: WithLookup<Question>[] = []
  // $: findContacts(client, contact.class.Question, object.name, channels).then((p) => {
  //   matches = p.contacts as Question[]
  //   matchedChannels = p.channels
  // })
</script>

<FocusHandler manager={focusManager} />

<Card
  label={form.string.CreateQuestion}
  okAction={createQuestion}
  canSave={object.content.length > 0}
  on:close={() => {
    dispatch('close')
  }}
  on:changeContent
>
  <QuestionTypeEditor 
    focusIndex={1}
    value={object}
    kind={'regular'}
    size={'large'}
    shouldShowLabel={true}
    short
    on:refocus={() => {
      focusManager.setFocusPos(3)
    }}
    on:change={({ detail }) => {
      if (object.type !== detail) {
        object.type = detail
      }
    }}
  />
  <div class="flex-row-center clear-mins">
    <EditBox
      placeholder={form.string.QuestionContent}
      bind:value={object.content}
      kind={'large-style'}
      autoFocus
      focusIndex={1}
    />
  </div>
  
  {#if object.type == QuestionType.Open}
  {/if}
  {#if object.type == QuestionType.Number}
  {/if}
  {#if object.type == QuestionType.Radio}
  <CreateQuestionOptions {object} />
  {/if}
  {#if object.type == QuestionType.CheckBox}
  <CreateQuestionOptions {object} />
  {/if}
  <svelte:fragment slot="pool">
  </svelte:fragment>
  <svelte:fragment slot="footer">
    {#if matches.length > 0}
      <div class="flex-row-center error-color">
        <IconInfo size={'small'} />
        <span class="text-sm overflow-label ml-2">
          <Label label={form.string.FormAlreadyExists} />
        </span>
        <div class="ml-4"><QuestionPresenter value={matches[0]} /></div>
      </div>
    {/if}
  </svelte:fragment>
</Card>

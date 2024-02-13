<!--
// Copyright © 2022 Anticrm Platform Contributors.
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
  import { Form, Question } from '@hcengineering/forms'
  import type { Class, Doc, Ref, Space } from '@hcengineering/core'
  import { createQuery, getClient } from '@hcengineering/presentation'
  import { Button, IconAdd, Label, Section, showPopup } from '@hcengineering/ui'
  import { Viewlet, ViewletPreference } from '@hcengineering/view'
  import { Table, ViewletSelector, ViewletSettingButton } from '@hcengineering/view-resources'
  import form from '../plugin'
  import CreateQuestion from './CreateQuestion.svelte'

  export let objectId: Ref<Form>
  export let space: Ref<Space>
  export let _class: Ref<Class<Doc>>

  export let questions: number

  $: console.log('questions:', questions)

  let questionItems: Question[] = []

  const questionsQuery = createQuery()
  $: questionsQuery.query(form.class.Question, { attachedTo: objectId }, (result) => {
    questionItems = result
  })
  $: console.log('questionItems', questionItems)

  const client = getClient()
  let loading = true

  const createApp = async (ev: MouseEvent): Promise<void> => {
    showPopup(
      CreateQuestion,
      {
        myId: objectId,
      },
      ev.target as HTMLElement,
      (result) => {
        if (result != null) {
          console.log('result != null', result)
        }
      }
    )
  }

  let viewlet: Viewlet | undefined
  let preference: ViewletPreference | undefined
</script>

<Section label={form.string.Questions}>
  <svelte:fragment slot="header">
    <div class="buttons-group xsmall-gap">
      <ViewletSelector
        hidden
        bind:viewlet
        bind:preference
        bind:loading
        viewletQuery={{ _id: form.viewlet.TableQuestion }}
      />
      <ViewletSettingButton kind={'ghost'} bind:viewlet />
      <Button id={form.string.AddQuestion} icon={IconAdd} kind={'ghost'} on:click={createApp} />
    </div>
  </svelte:fragment>

  <svelte:fragment slot="content">
    {#if questions > 0 && viewlet}
      <Table
        _class={form.class.Question}
        config={preference?.config ?? viewlet.config}
        options={viewlet.options}
        query={{ attachedTo: objectId }}
        loadingProps={{ length: questions }}
      />
    {:else}
      <div class="antiSection-empty solid flex-col mt-3">
        <span class="content-dark-color">
          <Label label={form.string.NoQuestions} />
        </span>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <span class="over-underline content-color" on:click={createApp}>
          <Label label={form.string.AddQuestion} />
        </span>
      </div>
    {/if}
  </svelte:fragment>
</Section>

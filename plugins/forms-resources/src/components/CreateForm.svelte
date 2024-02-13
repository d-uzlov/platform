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
  import { Form } from '@hcengineering/forms'
  import { AttachedData, fillDefaults, generateId, Ref, TxOperations, WithLookup } from '@hcengineering/core'
  import { Card, getClient, InlineAttributeBar } from '@hcengineering/presentation'
  import { Button, createFocusManager, EditBox, FocusHandler, IconInfo, Label } from '@hcengineering/ui'
  import { createEventDispatcher } from 'svelte'
  import form from '../plugin'
  import FormPresenter from './FormPresenter.svelte'

  export let onCreate: ((id: Ref<Form>, client: TxOperations) => Promise<void>) | undefined = undefined

  export function canClose (): boolean {
    return object.name === ''
  }

  const id: Ref<Form> = generateId()

  const object: Form = {
    name: ''
  } as unknown as Form

  const dispatch = createEventDispatcher()
  const client = getClient()
  const hierarchy = client.getHierarchy()

  fillDefaults(hierarchy, object, form.class.Form)

  async function createForm () {
    await client.createDoc(form.class.Form, form.space.Forms, object, id)
    if (onCreate !== undefined) {
      await onCreate?.(id, client)
    }

    dispatch('close', id)
  }

  const manager = createFocusManager()

  let matches: WithLookup<Form>[] = []
</script>

<FocusHandler {manager} />

<Card
  label={form.string.CreateForm}
  okAction={createForm}
  canSave={object.name.length > 0}
  on:close={() => {
    dispatch('close')
  }}
  on:changeContent
>
  <div class="flex-row-center clear-mins">
    <div class="mr-3">
      <Button size={'medium'} kind={'link-bordered'} noFocus />
    </div>
    <EditBox
      placeholder={form.string.FormName}
      bind:value={object.name}
      kind={'large-style'}
      autoFocus
      focusIndex={1}
    />
  </div>
  <div class="flex-row-center clear-mins">
    <EditBox
      placeholder={form.string.FormDescription}
      bind:value={object.description}
      kind={'default-large'}
      focusIndex={1}
      fullSize
    />
  </div>
  <svelte:fragment slot="pool">
  </svelte:fragment>
  <svelte:fragment slot="footer">
    {#if matches.length > 0}
      <div class="flex-row-center error-color">
        <IconInfo size={'small'} />
        <span class="text-sm overflow-label ml-2">
          <Label label={form.string.FormAlreadyExists} />
        </span>
        <div class="ml-4"><FormPresenter value={matches[0]} /></div>
      </div>
    {/if}
  </svelte:fragment>
</Card>

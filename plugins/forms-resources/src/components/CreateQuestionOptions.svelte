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
  import { Question } from '@hcengineering/forms'
  import { Button, EditBox, FocusHandler, FocusManager, createFocusManager } from '@hcengineering/ui'
  import form from '../plugin'

  export let object: Question
  const focusManager = createFocusManager()
  let nextOption = ''
</script>

<FocusHandler manager={focusManager} />

{#each object.options as radioOption, i }
<div class="flex-row-center clear-mins">
  <EditBox
    placeholder={form.string.QuestionOption}
    bind:value={radioOption}
    kind={'default-large'}
    focusIndex={i}
    fullSize
  />
  <Button
    size={'small'}
    icon={undefined}
    label={form.string.QuestionDeleteOption}
    on:click={() => {
      object.options.splice(i, 1)
      object.options = object.options
    }}
  />
</div>
{/each}

{form.string.QuestionOptions}
<EditBox
placeholder={form.string.QuestionNewOption}
bind:value={nextOption}
kind={'default-large'}
focusIndex={object.options.length}
fullSize
on:input={() => {
  object.options = [ ...object.options, nextOption ]
  // TODO this is ugly and probably unreliable
  setTimeout(() => focusManager.setFocus(object.options.length), 1)
  nextOption = ''
}}
/>

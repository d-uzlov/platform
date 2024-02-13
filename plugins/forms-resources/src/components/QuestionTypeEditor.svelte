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
  import { AttachedData, Ref, WithLookup } from '@hcengineering/core'
  import { getClient } from '@hcengineering/presentation'
  import {
    Button,
    ButtonKind,
    ButtonSize,
    IconSize,
    SelectPopup,
    TooltipAlignment,
    eventToHTMLElement,
    SelectPopupValueType,
    showPopup
  } from '@hcengineering/ui'
  import { statusStore } from '@hcengineering/view-resources'
  import { createEventDispatcher } from 'svelte'
  import form from '../plugin'
  import QuestionTypePresenter from './QuestionTypePresenter.svelte'
  import { Question, QuestionType } from '@hcengineering/forms'

  export let value: Question

  let allowedTypes = [
    QuestionType.Open,
    QuestionType.Number,
    QuestionType.Radio,
    QuestionType.CheckBox,
  ]

  export let isEditable: boolean = true
  export let shouldShowLabel: boolean = false
  export let tooltipAlignment: TooltipAlignment | undefined = undefined

  export let kind: ButtonKind = 'link'
  export let size: ButtonSize = 'large'
  export let iconSize: IconSize = 'inline'
  export let justify: 'left' | 'center' = 'left'
  export let width: string | undefined = undefined
  export let defaultValue: QuestionType | undefined = undefined
  export let focusIndex: number | undefined = undefined
  export let short: boolean = false

  const client = getClient()
  const dispatch = createEventDispatcher()

  const changeStatus = async (newType: QuestionType, refocus: boolean = true) => {
    if (!isEditable || newType === undefined || value.type === newType) {
      return
    }

    dispatch('change', newType)
    if (refocus) {
      dispatch('refocus')
    }

    if ('_class' in value) {
      await client.update(value, { type: newType })
    }
  }

  const handleStatusEditorOpened = (event: MouseEvent) => {
    if (!isEditable) {
      return
    }

    showPopup(
      SelectPopup,
      { value: valuesInfo },
      eventToHTMLElement(event),
      changeStatus
    )
  }

  function getSelectedType (
    values: QuestionType[],
    value: Question,
    defaultType: QuestionType | undefined
  ): QuestionType {
    if (value.type !== undefined) {
      const current = values?.find((v) => v === value.type)
      if (current != null) {
        return current
      }
    }
    return defaultType ?? QuestionType.Open
  }

  let valuesInfo: SelectPopupValueType[]

  $: selectedType = getSelectedType(allowedTypes, value, defaultValue)
  $: selectedStatusLabel = shouldShowLabel ? selectedType : undefined
  $: valuesInfo = allowedTypes?.map((s) => {
    return {
      id: s,
      component: QuestionTypePresenter,
      props: { value: s, size: 'small', space: value.space },
      isSelected: selectedType === s ?? false
    }
  })
  $: smallgap = size === 'inline' || size === 'small'
</script>

{#if value}
  {#if kind === 'list' || kind === 'list-header'}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="flex-row-center flex-no-shrink"
      class:fix-margin={kind === 'list'}
      class:cursor-pointer={isEditable}
      on:click={handleStatusEditorOpened}
    >
      <div class="flex-center flex-no-shrink square-4">
        <!-- {#if selectedType}<IssueStatusIcon
            value={selectedType}
            size={kind === 'list' ? 'small' : 'medium'}
            space={value.space}
          />{/if} -->
      </div>
      {#if selectedStatusLabel}
        <span
          class="{kind === 'list' ? 'ml-1 text-md' : 'ml-2 text-base'} overflow-label disabled content-color"
          class:max-w-20={short}
        >
          {selectedStatusLabel}
        </span>
      {/if}
    </div>
  {:else}
    <Button
      showTooltip={isEditable ? { label: form.string.QuestionType, direction: tooltipAlignment } : undefined}
      disabled={!isEditable}
      {justify}
      {size}
      {kind}
      {width}
      {focusIndex}
      {short}
      on:click={handleStatusEditorOpened}
    >
      <svelte:fragment slot="icon">
        <!-- {#if selectedType}
          <IssueStatusIcon value={selectedType} size={iconSize} space={value.space} />
        {/if} -->
      </svelte:fragment>
      <svelte:fragment slot="content">
        {#if selectedStatusLabel}
          <span
            class="overflow-label disabled"
            class:ml-1-5={selectedType && smallgap}
            class:ml-2={selectedType && !smallgap}
          >
            {selectedStatusLabel}
          </span>
        {/if}
      </svelte:fragment>
    </Button>
  {/if}
{/if}

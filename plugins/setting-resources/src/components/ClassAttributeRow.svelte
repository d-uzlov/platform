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
  import core, { AnyAttribute, EnumOf, Type } from '@hcengineering/core'
  import { IntlString } from '@hcengineering/platform'
  import { getClient } from '@hcengineering/presentation'
  import { AnySvelteComponent, Icon, IconMoreV2, Label, IconOpenedArrow } from '@hcengineering/ui'
  import settings from '../plugin'

  export let attribute: AnyAttribute
  export let attributeType: IntlString | undefined = undefined
  export let selected: boolean = false
  export let hovered: boolean = false
  export let clickMore: (event: MouseEvent) => Promise<void>

  export let attributeMapper:
  | {
    component: AnySvelteComponent
    label: IntlString
    props: Record<string, any>
  }
  | undefined = undefined

  const client = getClient()

  async function getEnumName (type: Type<any>): Promise<string | undefined> {
    const ref = (type as EnumOf).of
    const res = await client.findOne(core.class.Enum, { _id: ref })
    return res?.name
  }
</script>

<button class="hulyTableAttr-content__row" class:hovered class:selected on:contextmenu on:click>
  <button class="hulyTableAttr-content__row-dragMenu" on:click|stopPropagation={clickMore}>
    <IconMoreV2 size={'small'} />
  </button>
  {#if attribute.isCustom}
    <div class="hulyChip-item font-medium-12">
      <Label label={settings.string.Custom} />
    </div>
  {/if}
  {#if attribute.icon !== undefined}
    <div class="hulyTableAttr-content__row-icon">
      <Icon icon={attribute.icon} size={'small'} />
    </div>
  {/if}
  <div class="hulyTableAttr-content__row-label font-regular-14 grow" class:accent={!attribute.hidden}>
    <Label label={attribute.label} />
  </div>
  {#if attributeMapper}
    <svelte:component this={attributeMapper.component} {...attributeMapper.props} {attribute} />
  {/if}
  <div class="hulyTableAttr-content__row-type font-medium-12">
    <Label label={attribute.type.label} />
    {#if attributeType !== undefined}
      : <Label label={attributeType} />
    {/if}
    {#if attribute.type._class === core.class.EnumOf}
      {#await getEnumName(attribute.type) then name}
        {#if name}
          : {name}
        {/if}
      {/await}
    {/if}
  </div>
  <div class="hulyTableAttr-content__row-arrow">
    <IconOpenedArrow size={'small'} />
  </div>
</button>

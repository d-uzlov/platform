<!--
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
-->
<script lang="ts">
  import { buildRemovedDoc, checkIsObjectRemoved, DocNavLink, getDocLinkTitle } from '@hcengineering/view-resources'
  import { Component, Icon, IconAdd, IconDelete } from '@hcengineering/ui'
  import { createQuery, getClient } from '@hcengineering/presentation'
  import view, { ObjectPanel, ObjectPresenter } from '@hcengineering/view'
  import { Class, Doc, Ref } from '@hcengineering/core'
  import { DisplayDocUpdateMessage, DocUpdateMessageViewlet } from '@hcengineering/activity'

  export let message: DisplayDocUpdateMessage
  export let viewlet: DocUpdateMessageViewlet | undefined
  export let objectPanel: ObjectPanel | undefined
  export let objectPresenter: ObjectPresenter | undefined
  export let withIcon: boolean = false
  export let hasSeparator: boolean = false

  const client = getClient()
  const objectQuery = createQuery()

  let object: Doc | undefined = undefined

  async function getValue (object: Doc): Promise<string | undefined> {
    if (viewlet?.valueAttr) {
      return (object as any)[viewlet.valueAttr]
    }

    return await getDocLinkTitle(client, object._id, object._class, object)
  }

  async function loadObject (_id: Ref<Doc>, _class: Ref<Class<Doc>>) {
    const isRemoved = await checkIsObjectRemoved(client, _id, _class)

    if (isRemoved) {
      object = await buildRemovedDoc(client, _id, _class)
    } else {
      objectQuery.query(_class, { _id }, (res) => {
        object = res[0]
      })
    }
  }

  $: loadObject(message.objectId, message.objectClass)
</script>

{#if object}
  {#if withIcon && message.action === 'create'}
    <Icon icon={IconAdd} size="x-small" />
  {/if}
  {#if withIcon && message.action === 'remove'}
    <Icon icon={IconDelete} size="x-small" />
  {/if}

  {#if objectPresenter && !viewlet?.valueAttr}
    <Component is={objectPresenter.presenter} props={{ value: object, accent: true, shouldShowAvatar: false }} />
  {:else}
    {#await getValue(object) then value}
      <span class="valueLink">
        <DocNavLink
          {object}
          colorInherit
          disabled={message.action === 'remove'}
          component={objectPanel?.component ?? view.component.EditDoc}
          shrink={0}
        >
          <span class="overflow-label select-text">{value}</span>
        </DocNavLink>
        {#if hasSeparator}
          <span class="separator">,</span>
        {/if}
      </span>
    {/await}
  {/if}
{/if}

<style lang="scss">
  .valueLink {
    font-weight: 500;
    color: var(--theme-link-color);
  }

  .separator {
    font-weight: 500;
    color: var(--theme-link-color);
    margin-left: -0.25rem;
  }
</style>

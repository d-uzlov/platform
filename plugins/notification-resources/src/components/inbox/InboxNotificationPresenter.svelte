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
  import view from '@hcengineering/view'
  import { getClient } from '@hcengineering/presentation'
  import { Component } from '@hcengineering/ui'
  import { Class, Doc, Ref } from '@hcengineering/core'
  import { ActivityNotificationViewlet, DisplayInboxNotification, DocNotifyContext } from '@hcengineering/notification'

  export let value: DisplayInboxNotification
  export let embedded = false
  export let skipLabel = false
  export let showNotify = true
  export let withActions = true
  export let viewlets: ActivityNotificationViewlet[] = []
  export let onClick: (() => void) | undefined = undefined
  export let onCheck: ((isChecked: boolean) => void) | undefined = undefined

  const client = getClient()
  const hierarchy = client.getHierarchy()

  $: objectPresenter = hierarchy.classHierarchyMixin(value._class as Ref<Class<Doc>>, view.mixin.ObjectPresenter)
</script>

{#if objectPresenter}
  <Component
    is={objectPresenter.presenter}
    props={{ value, embedded, skipLabel, viewlets, showNotify, withActions, onClick, onCheck }}
  />
{/if}

//

import { type Class, DOMAIN_TX, type Doc, type Domain, type Ref, TxOperations } from '@hcengineering/core'
import {
  type MigrateOperation,
  type MigrationClient,
  type MigrationUpgradeClient,
  type ModelLogger,
  tryMigrate
} from '@hcengineering/model'
import { DOMAIN_COMMENT } from '@hcengineering/model-chunter'
import core from '@hcengineering/model-core'
import { DOMAIN_VIEW } from '@hcengineering/model-view'
import form, { DOMAIN_FORMS, formId } from './index'

async function createSpace (tx: TxOperations): Promise<void> {
  const current = await tx.findOne(core.class.Space, {
    _id: form.space.Forms
  })
  if (current === undefined) {
    await tx.createDoc(
      core.class.Space,
      core.space.Space,
      {
        name: 'Forms',
        description: 'Forms',
        private: false,
        archived: false,
        members: []
      },
      form.space.Forms
    )
  }
}

export const formsOperation: MigrateOperation = {
  async migrate (client: MigrationClient, logger: ModelLogger): Promise<void> {
    await tryMigrate(client, formId, [
      {
        state: 'employees',
        func: async (client) => {
          // await client.update(
          //   DOMAIN_TX,
          //   {
          //     objectClass: 'contact:class:EmployeeAccount'
          //   },
          //   {
          //     $rename: { 'attributes.employee': 'attributes.person' },
          //     $set: { objectClass: contact.class.PersonAccount }
          //   }
          // )

          // await client.update(
          //   DOMAIN_TX,
          //   {
          //     objectClass: 'contact:class:Employee'
          //   },
          //   {
          //     $set: { objectClass: contact.mixin.Employee }
          //   }
          // )

          // await client.update(
          //   DOMAIN_TX,
          //   {
          //     'tx.attributes.backlinkClass': 'contact:class:Employee'
          //   },
          //   {
          //     $set: { 'tx.attributes.backlinkClass': contact.mixin.Employee }
          //   }
          // )

          // await client.update(
          //   DOMAIN_TX,
          //   {
          //     'tx.attributes.backlinkClass': 'contact:class:Employee'
          //   },
          //   {
          //     $set: { 'tx.attributes.backlinkClass': contact.mixin.Employee }
          //   }
          // )

          // await client.update(
          //   DOMAIN_TX,
          //   {
          //     objectClass: core.class.Attribute,
          //     'attributes.type.to': 'contact:class:Employee'
          //   },
          //   {
          //     $set: { 'attributes.type.to': contact.mixin.Employee }
          //   }
          // )
          // await client.update(
          //   DOMAIN_TX,
          //   {
          //     objectClass: core.class.Attribute,
          //     'operations.type.to': 'contact:class:Employee'
          //   },
          //   {
          //     $set: { 'operations.type.to': contact.mixin.Employee }
          //   }
          // )

          // await client.update(
          //   DOMAIN_TX,
          //   {
          //     'attributes.extends': 'contact:class:Employee'
          //   },
          //   {
          //     $set: { 'attributes.extends': contact.mixin.Employee }
          //   }
          // )

          // for (const d of client.hierarchy.domains()) {
          //   await client.update(
          //     d,
          //     { attachedToClass: 'contact:class:Employee' },
          //     { $set: { attachedToClass: contact.mixin.Employee } }
          //   )
          // }
          // await client.update(
          //   DOMAIN_COMMENT,
          //   { backlinkClass: 'contact:class:Employee' },
          //   { $set: { backlinkClass: contact.mixin.Employee } }
          // )
          // await client.update(
          //   'tags' as Domain,
          //   { targetClass: 'contact:class:Employee' },
          //   { $set: { targetClass: contact.mixin.Employee } }
          // )
          // await client.update(
          //   DOMAIN_VIEW,
          //   { filterClass: 'contact:class:Employee' },
          //   { $set: { filterClass: contact.mixin.Employee } }
          // )
          // await client.update(
          //   DOMAIN_CONTACT,
          //   {
          //     _class: 'contact:class:Employee' as Ref<Class<Doc>>
          //   },
          //   {
          //     $rename: {
          //       active: `${contact.mixin.Employee as string}.active`,
          //       statuses: `${contact.mixin.Employee as string}.statuses`,
          //       displayName: `${contact.mixin.Employee as string}.displayName`,
          //       position: `${contact.mixin.Employee as string}.position`
          //     },
          //     $set: {
          //       _class: contact.class.Person
          //     }
          //   }
          // )
        }
      }
    ])
  },
  async upgrade (client: MigrationUpgradeClient): Promise<void> {
    const tx = new TxOperations(client, core.account.System)
    await createSpace(tx)
  }
}

<script>
import pagedEntriesQuery from './entries-paged.gql'

export default {
  'apollo': {
    'entries': {
      'query':    pagedEntriesQuery,
      'prefetch': true,
    },
  },
  data () {
    return {
      'selected': [],
    }
  },
  'computed': {
    headers () {
      return [
        {
          'text':     'Title',
          'value':    'display',
          'sortable': true,
          'align':    'left',
        },
        {
          'text':     'Status',
          'value':    'published',
          'sortable': true,
          'align':    'left',
        },
        {
          'text':     'Updated by',
          'value':    'updatedBy',
          'sortable': true,
          'align':    'left',
        },
        {
          'text':     'Updated at',
          'value':    'updatedAt',
          'sortable': true,
          'align':    'left',
        },
      ]
    },
  },
}
</script>

<template lang="pug">
  .route-root.is-paddingless
    v-toolbar(dark).elevation-2
      v-layout(row, align-center)
        v-btn(fab, flat, small, color="accent")
          v-icon add
        v-btn(fab, flat, small, color="accent")
          v-icon edit

        v-spacer

        transition(name="zoom")
          v-btn(v-if="selected.length", fab, flat, small, color="error")
            v-icon delete_sweep

    v-data-table(
      :loading="$apolloData.queries.entries.loading"
      :headers="headers"
      :items="entries"
      item-key="id"
      :rows-per-page-items="[25, 50]"
      v-model="selected"
      select-all
    )
      template(slot="items", slot-scope="props")
        tr(@click="props.expanded = !props.expanded")
          td(@click.stop)
            v-checkbox(v-model="props.selected", primary, hide-details)
          td {{props.item.display}}
          td {{props.item.published ? 'Published' : 'Draft'}}
          td {{props.item.updatedBy.display}}
          td {{props.item.updatedAt | moment('from', 'now')}}

      template(slot="expand", slot-scope="props")
        v-toolbar
          v-layout(row, align-center)
            h3 {{props.item.display}}

            v-spacer

            v-tooltip(top)
              v-btn(
                slot="activator", color="primary", flat, fab, small,
                aria-labelledby="entry-table-expand-view"
              )
                v-icon remove_red_eye
              span#entry-table-expand-view
                | View

            v-tooltip(top)
              v-btn(
                slot="activator", color="primary", flat, fab, small
                aria-labelledby="entry-table-expand-edit"
              )
                v-icon edit
              span#entry-table-expand-edit
                | Edit

            v-tooltip(top)
              v-btn(
                slot="activator", color="warning", flat, fab, small,
                aria-labelledby="entry-table-expand-unpublish"
                v-if="props.item.published"
              )
                v-icon archive
              span#entry-table-expand-unpublish
                | Unpublish

            v-tooltip(top)
              v-btn(
                slot="activator", color="success", flat, fab, small,
                aria-labelledby="entry-table-expand-publish"
                v-if="!props.item.published"
              )
                v-icon send
              span#entry-table-expand-publish
                | Publish

            v-tooltip(top)
              v-btn(
                slot="activator", color="error", flat, fab, small
                aria-labelledby="entry-table-expand-delete"
                v-if="!props.item.published"
              )
                v-icon delete
              span#entry-table-expand-delete
                | Trash

        v-card
          v-container
            v-layout(row, wrap)
              v-flex(xs12)
                v-layout(row)
                  b Author
                  v-spacer
                  span {{props.item.createdBy.display}}

              v-flex(xs12)
                v-layout(row)
                  b Created at
                  v-spacer
                  span {{props.item.createdAt}}

              v-flex(xs12)
                v-layout(row)
                  b Published at
                  v-spacer
                  span {{props.item.publishedAt}}
</template>

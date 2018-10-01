<script>
export default {
  'props': {
    'value': {
      'type':    String,
      'default': '',
    },
    'getHeight': {
      'value':    Function,
      'required': true,
    },
  },
  'computed': {
    key () {
      return process.env.TINYCLOUD_KEY
    },
    init () {
      return {
        'default_link_target': '_blank',

        /*
         * Plugin configuration
         */

        'image_caption': true,
        'image_advtab':  true,
        'image_title':   true,

        'insertdatetime_element': true,
        'nonbreaking_force_tab':  true,

        'paste_webkit_styles':           'all',
        'paste_retain_style_properties': 'all',

        /*
         * Menu definition
         */

        'menu': {
          'file': {
            'title': 'File',
            'items': 'preview | print',
          },
          'edit': {
            'title': 'Edit',
            'items': 'undo redo | cut copy paste pasteastext | selectall | searchreplace',
          },
          'insert': {
            'title': 'Insert',
            'items': 'image link media table | hr | pagebreak nonbreaking anchor toc | insertdatetime',
          },
          'view': {
            'title': 'View',
            'items': 'code | visualaid',
          },
          'format': {
            'title': 'Format',
            'items': 'bold italic underline strikethrough superscript subscript | formats | removeformat',
          },
          'tools': {
            'title': 'Tools',
            'items': 'code',
          },
        },

        /*
         * Main config section
         */

        'branding': false,
        'height':   this.getHeight(),
        'skin':     false,

        'plugins': [
          'advlist',
          'anchor',
          'autolink',
          'code',
          'colorpicker',
          'contextmenu',
          'directionality',
          'emoticons',
          'fullscreen',
          'hr',
          'image',
          'insertdatetime',
          'lists',
          'link',
          'media',

          // Table has to be loaded before nonbreaking so that tab navigation
          // works.
          'table',
          'nonbreaking',

          'pagebreak',
          'paste',
          'preview',
          'print',
          'searchreplace',
          'tabfocus',
          // 'table' - see above
          'textcolor',
          'textpattern',
          'toc',
          'wordcount',

          process.env.NODE_ENV === 'development' && 'help',
        ],

        'contextmenu': [
          'bold italic strikethrough',
          'link image',
          'table',
        ].join(' | '),

        'toolbar': [
          [
            'bold italic strikethrough',
            'hr bullist numlist',
            'alignleft aligncenter alignright',
            'pagebreak anchor',
          ].join(' | '),
          [
            'image media link nonbreaking',
            'table insertdatetime toc',
            'paste searchreplace',
            'forecolor backcolor',
            'fullscreen preview',
            // 'emoticons',
            // 'ltr rtl',

            process.env.NODE_ENV === 'development' && 'help',
          ].join(' | '),
        ],
      }
    },
  },
}
</script>

<template lang="pug">
.editor-wrapper
  no-ssr
    v-progress-linear(
      slot="placeholder"
      indeterminate
      :query="true"
    )
    vue-mce-editor(
      :init="init"
      :initial-value="value"
      @input="(value) => $emit('input', value)"
    )
</template>

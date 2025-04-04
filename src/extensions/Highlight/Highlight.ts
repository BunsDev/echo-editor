import type { HighlightOptions as TiptapHighlightOptions } from '@tiptap/extension-highlight'
import { Highlight as TiptapHighlight } from '@tiptap/extension-highlight'
import HighlightActionButton from './components/HighlightActionButton.vue'

import type { GeneralOptions } from '@/type'

export interface HighlightOptions extends TiptapHighlightOptions, GeneralOptions<HighlightOptions> { }

export const Highlight = TiptapHighlight.extend<HighlightOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      multicolor: true,
      button: ({ editor, t }) => ({
        component: HighlightActionButton,
        componentProps: {
          action: (color?: unknown) => {
            if (typeof color === 'string') editor.chain().focus().setHighlight({ color }).run()
            if (typeof color === 'undefined') editor.chain().focus().unsetHighlight().run()
          },
          editor,
          isActive: () => editor.isActive('highlight') || false,
          disabled: !editor?.isEditable || !editor.can().setHighlight(),
          shortcutKeys: ['⇧', 'mod', 'H'],
          tooltip: t('editor.highlight.tooltip'),
        },
      }),
    }
  },
})

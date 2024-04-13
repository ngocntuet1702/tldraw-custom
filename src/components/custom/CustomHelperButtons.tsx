import React from 'react';
import { DefaultHelperButtons } from '@tldraw/tldraw';
import { useEditor, useValue } from '@tldraw/editor';
import { TldrawUiMenuItem, useActions } from '@tldraw/tldraw';

function ExitPenMode() {
  const editor = useEditor();
  const actions = useActions();
  const isPenMode = useValue(
    'is pen mode',
    () => editor.getInstanceState().isPenMode,
    [editor],
  );

  if (!isPenMode) return null;

  return <TldrawUiMenuItem {...actions['exit-pen-mode']} />;
}

export const CustomHelperButton = () => {
  return (
    <DefaultHelperButtons>
      <ExitPenMode />
    </DefaultHelperButtons>
  );
};

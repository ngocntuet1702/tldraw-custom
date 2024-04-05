import {
  DefaultQuickActions,
  useActions,
  TldrawUiMenuItem,
  useEditor,
  useExportAs,
} from '@tldraw/tldraw';

export const CustomQuickAction = () => {
  const actions = useActions();
  // const exportAs = useExportAs();
  console.log('action: ', actions);
  const editor = useEditor();
  const shapes = editor.getRenderingShapes();

  const onDelete = () => {
    editor.deleteShapes(shapes.map(i => i.id));
  };

  const onExportPng = async () => {
    const data = await editor.getSvg(
      shapes.map(i => i.id),
      { background: false },
    );
    console.log('data: ', data);
  };

  return (
    <DefaultQuickActions>
      <TldrawUiMenuItem {...actions['undo']} disabled={false} />
      <TldrawUiMenuItem {...actions['redo']} disabled={false} />
      <TldrawUiMenuItem
        {...actions['delete']}
        disabled={false}
        onSelect={onDelete}
      />
      <TldrawUiMenuItem
        {...actions['export-as-png']}
        disabled={false}
        onSelect={onExportPng}
      />
    </DefaultQuickActions>
  );
};

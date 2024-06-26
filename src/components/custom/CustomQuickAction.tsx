import {
  DefaultQuickActions,
  useActions,
  TldrawUiMenuItem,
  useEditor,
} from '@tldraw/tldraw';

declare var window: any;

export const CustomQuickAction = () => {
  const actions = useActions();
  console.log('action: ', actions);
  const editor = useEditor();

  const onDelete = () => {
    const _shapes = editor.getRenderingShapes();

    if (window.ReactNativeWebView) {
      const data = {
        type: 'delete',
        data: '',
      };
      window.ReactNativeWebView.postMessage(JSON.stringify(data));
    }

    editor.batch(() => {
      editor.deleteShapes(_shapes.map(i => i.id));
      editor.bailToMark('draw');
    });
  };

  const onChangeBackground = () => {
    editor.updateInstanceState({
      isGridMode: !editor.getInstanceState().isGridMode,
    });
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
        id={'fill-pattern'}
        icon="fill-pattern"
        disabled={false}
        onSelect={onChangeBackground}
      />
    </DefaultQuickActions>
  );
};

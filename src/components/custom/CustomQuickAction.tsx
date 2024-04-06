import {
  DefaultQuickActions,
  useActions,
  TldrawUiMenuItem,
  useEditor,
} from '@tldraw/tldraw';
import svg64 from 'svg64';
declare var window: any;

export const CustomQuickAction = () => {
  const actions = useActions();
  console.log('action: ', actions);
  const editor = useEditor();

  const onDelete = () => {
    const _shapes = editor.getRenderingShapes();
    console.log('shapes: ', _shapes);
    editor.batch(() => {
      editor.deleteShapes(_shapes.map(i => i.id));
      editor.bailToMark('draw');
    });
  };

  const onExportPng = async () => {
    const _shapes = editor.getRenderingShapes();
    const svgData = await editor.getSvg(
      _shapes.map(i => i.id),
      { background: false },
    );
    if (window.ReactNativeWebView) {
      const base64Data = svg64(svgData || '');
      window.ReactNativeWebView.postMessage(base64Data);
    }
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
      <TldrawUiMenuItem
        id={'fill-pattern'}
        icon="export-as-png"
        disabled={false}
        onSelect={onExportPng}
      />
    </DefaultQuickActions>
  );
};

import { TLComponents, Tldraw } from 'tldraw';
import { CustomToolbar } from './custom/CustomToolbar';
import { CustomQuickAction } from './custom/CustomQuickAction';

const components: TLComponents = {
  ContextMenu: null,
  ActionsMenu: null,
  HelpMenu: null,
  ZoomMenu: null,
  MainMenu: null,
  Minimap: null,
  // StylePanel: CustomStylePanel,
  PageMenu: null,
  NavigationPanel: null,
  Toolbar: CustomToolbar,
  KeyboardShortcutsDialog: null,
  QuickActions: CustomQuickAction,
  HelperButtons: null,
  DebugMenu: null,
  MenuPanel: null,
  TopPanel: null,
  SharePanel: null,
};

export default function Editor() {
  return (
    <div className="tldraw__editor">
      <Tldraw
        forceMobile={true}
        components={components}
        initialState="draw"
        inferDarkMode={false}
      />
    </div>
  );
}

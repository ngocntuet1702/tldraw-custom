import React from 'react';
import { TLComponents, Tldraw } from 'tldraw';
import {
  CustomHelperButton,
  CustomQuickAction,
  CustomStylePanel,
  CustomToolbar,
} from './custom';
import { CustomUI } from './custom/CustomUI';

const components: TLComponents = {
  ContextMenu: null,
  ActionsMenu: null,
  HelpMenu: null,
  ZoomMenu: null,
  MainMenu: null,
  Minimap: null,
  StylePanel: CustomStylePanel,
  PageMenu: null,
  NavigationPanel: null,
  Toolbar: CustomToolbar,
  KeyboardShortcutsDialog: null,
  QuickActions: CustomQuickAction,
  HelperButtons: CustomHelperButton,
  DebugMenu: null,
  MenuPanel: null,
  TopPanel: null,
  SharePanel: null,
};

export default function MyEditor() {
  // const handleEvent = React.useCallback((data: TLEventInfo, editor: Editor) => {
  //   console.log('event: ', data);
  //   if (data.type === 'pointer') {
  //     if (data.isPen) {
  //     }
  //   }
  // }, []);

  return (
    <div className="tldraw__editor">
      <Tldraw
        forceMobile={true}
        components={components}
        initialState="draw"
        inferDarkMode={false}
        onMount={editor => {
          editor.updateInstanceState({
            isDebugMode: false,
            // canMoveCamera: false,
            isGridMode: true,
          });
          editor.user.updateUserPreferences({
            locale: 'en',
            isDarkMode: false,
          });
          // editor.on('event', event => handleEvent(event, editor));
        }}>
        <CustomUI />
      </Tldraw>
    </div>
  );
}

import {
  TLUiToolbarItem,
  useToolbarSchema,
  useTranslation,
  useReadonly,
  TLUiToolItem,
  TldrawUiButton,
  TldrawUiButtonIcon,
  useBreakpoint,
  useTldrawUiComponents,
  useUiEvents,
} from '@tldraw/tldraw';
import React, { useMemo } from 'react';
import {
  GeoShapeGeoStyle,
  preventDefault,
  track,
  useEditor,
  useValue,
} from '@tldraw/editor';
import classNames from 'classnames';
import { PORTRAIT_BREAKPOINT } from '../../constant';
import { CustomMobileStylePanel } from './CustomMobileStylePanel';

const isActiveTLUiToolItem = (
  item: TLUiToolItem,
  activeToolId: string | undefined,
  geoState: string | null | undefined,
) => {
  return item.meta?.geo
    ? activeToolId === 'geo' && geoState === item.meta?.geo
    : activeToolId === item.id;
};

export function useToolbarItems() {
  const breakpoint = useBreakpoint();
  const allToolbarItems = useToolbarSchema();
  const isReadonlyMode = useReadonly();
  return useMemo(() => {
    const visibleItems = allToolbarItems.filter(
      item => !isReadonlyMode || item.readonlyOk,
    );
    const overflowIndex = Math.min(8, 5 + breakpoint);

    const itemsInPanel = visibleItems.slice(0, overflowIndex);
    const itemsInDropdown = visibleItems.slice(overflowIndex);

    if (itemsInDropdown.length <= 2) {
      return {
        itemsInPanel: visibleItems,
        itemsInDropdown: [],
      };
    }

    return { itemsInPanel, itemsInDropdown };
  }, [allToolbarItems, breakpoint, isReadonlyMode]);
}

export const CustomToolbar = React.memo(function CustomToolbar() {
  console.log('render default toolbar: ');
  const editor = useEditor();
  const msg = useTranslation();
  const breakpoint = useBreakpoint();
  const isReadonlyMode = useReadonly();
  const toolbarItems = useToolbarSchema();
  const trackEvent = useUiEvents();

  const activeToolId = useValue(
    'current tool id',
    () => editor.getCurrentToolId(),
    [editor],
  );

  const geoState = useValue(
    'geo',
    () => editor.getSharedStyles().getAsKnownValue(GeoShapeGeoStyle),
    [editor],
  );

  const activeTLUiToolbarItem = toolbarItems.find(item => {
    return isActiveTLUiToolItem(item.toolItem, activeToolId, geoState);
  });

  const { itemsInPanel } = useToolbarItems();
  console.log('item: ', itemsInPanel);
  const { ActionsMenu, QuickActions, StylePanel } = useTldrawUiComponents();

  const customToolbarItems: TLUiToolbarItem[] = [
    {
      id: 'draw',
      type: 'item',
      toolItem: {
        id: 'draw',
        label: 'tool.draw',
        icon: 'tool-pencil',
        kbd: 'd,b,x',
        onSelect: source => {
          editor.setCurrentTool('draw');
          trackEvent('select-tool', { source, id: 'draw' });
        },
      },
    },
    {
      id: 'eraser',
      type: 'item',
      toolItem: {
        id: 'eraser',
        label: 'tool.eraser',
        icon: 'tool-eraser',
        kbd: 'e',
        onSelect: source => {
          editor.setCurrentTool('eraser');
          trackEvent('select-tool', { source, id: 'eraser' });
        },
      },
    },
  ];

  return (
    <div className="tlui-toolbar">
      <div className="tlui-toolbar__inner">
        <div className="tlui-toolbar__left">
          {!isReadonlyMode && (
            <div className="tlui-toolbar__extras">
              <div className="tlui-toolbar__extras__controls tlui-buttons__horizontal">
                {QuickActions && <QuickActions />}
              </div>
            </div>
          )}
          <div
            className={classNames('tlui-toolbar__tools', {
              'tlui-toolbar__tools__mobile':
                breakpoint < PORTRAIT_BREAKPOINT.TABLET_SM,
            })}>
            {/* Main panel items */}
            {customToolbarItems.map(({ toolItem }) => {
              return (
                <ToolbarButton
                  key={toolItem.id}
                  item={toolItem}
                  title={'Title'}
                  isSelected={isActiveTLUiToolItem(
                    toolItem,
                    activeToolId,
                    geoState,
                  )}
                />
              );
            })}
          </div>
        </div>
        <div className="tlui-toolbar__tools">
          {StylePanel && <CustomMobileStylePanel />}
        </div>
      </div>
    </div>
  );
});

function ToolbarButton({
  item,
  title,
  isSelected,
}: {
  item: TLUiToolItem;
  title: string;
  isSelected: boolean;
}) {
  return (
    <TldrawUiButton
      type="tool"
      data-testid={`tools.${item.id}`}
      data-tool={item.id}
      data-geo={item.meta?.geo ?? ''}
      aria-label={item.label}
      data-state={isSelected ? 'selected' : undefined}
      onClick={() => item.onSelect('toolbar')}
      title={title}
      onTouchStart={e => {
        preventDefault(e);
        item.onSelect('toolbar');
      }}>
      <TldrawUiButtonIcon icon={item.icon} />
    </TldrawUiButton>
  );
}

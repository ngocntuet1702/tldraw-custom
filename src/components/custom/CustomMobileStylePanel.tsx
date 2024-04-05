import {
  DefaultColorStyle,
  TLDefaultColorStyle,
  getDefaultColorTheme,
  useEditor,
  useValue,
} from '@tldraw/editor';
import {
  TldrawUiButton,
  TldrawUiButtonIcon,
  TldrawUiPopover,
  TldrawUiPopoverContent,
  TldrawUiPopoverTrigger,
  useRelevantStyles,
  useTldrawUiComponents,
  useTranslation,
} from '@tldraw/tldraw';
import { useCallback } from 'react';

export const CustomMobileStylePanel = () => {
  const editor = useEditor();
  const msg = useTranslation();

  const relevantStyles = useRelevantStyles();
  const color = relevantStyles?.get(DefaultColorStyle);
  const theme = getDefaultColorTheme({
    isDarkMode: editor.user.getIsDarkMode(),
  });
  const currentColor = (
    color?.type === 'shared'
      ? theme[color.value as TLDefaultColorStyle]
      : theme.black
  ).solid;

  const disableStylePanel = useValue(
    'disable style panel',
    () => editor.isInAny('hand', 'zoom', 'eraser', 'laser'),
    [editor],
  );

  const handleStylesOpenChange = useCallback(
    (isOpen: boolean) => {
      if (!isOpen) {
        editor.updateInstanceState(
          { isChangingStyle: false },
          { ephemeral: true },
        );
      }
    },
    [editor],
  );

  const { StylePanel } = useTldrawUiComponents();
  if (!StylePanel) return null;

  return (
    <TldrawUiPopover
      id="mobile style menu"
      onOpenChange={handleStylesOpenChange}>
      <TldrawUiPopoverTrigger>
        <TldrawUiButton
          type="tool"
          data-testid="mobile-styles.button"
          style={{
            color: disableStylePanel ? 'var(--color-muted-1)' : currentColor,
          }}
          title={msg('style-panel.title')}
          disabled={disableStylePanel}>
          <TldrawUiButtonIcon
            icon={
              disableStylePanel
                ? 'blob'
                : color?.type === 'mixed'
                ? 'mixed'
                : 'blob'
            }
          />
        </TldrawUiButton>
      </TldrawUiPopoverTrigger>
      <TldrawUiPopoverContent side="top" align="end">
        {StylePanel && <StylePanel isMobile />}
      </TldrawUiPopoverContent>
    </TldrawUiPopover>
  );
};

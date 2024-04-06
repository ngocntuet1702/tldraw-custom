import {
  DefaultColorStyle,
  DefaultFillStyle,
  DefaultFontStyle,
  DefaultDashStyle,
  DefaultHorizontalAlignStyle,
  DefaultSizeStyle,
  DefaultVerticalAlignStyle,
  ReadonlySharedStyleMap,
  StyleProp,
  useEditor,
} from '@tldraw/editor';
import {
  TldrawUiButtonPicker,
  useRelevantStyles,
  useTranslation,
  useUiEvents,
} from '@tldraw/tldraw';
import React from 'react';
import { STYLES } from '../../constant';

export type TLUiStylePanelContentProps = {
  styles: ReturnType<typeof useRelevantStyles>;
};

export const CustomStylePanelContent = ({
  styles,
}: TLUiStylePanelContentProps) => {
  if (!styles) return null;

  return (
    <>
      <CommonStylePickerSet styles={styles} />
    </>
  );
};

function useStyleChangeCallback() {
  const editor = useEditor();
  const trackEvent = useUiEvents();

  return React.useMemo(
    () =>
      function handleStyleChange<T>(
        style: StyleProp<T>,
        value: T,
        squashing: boolean,
      ) {
        editor.batch(() => {
          if (editor.isIn('select')) {
            editor.setStyleForSelectedShapes(style, value, { squashing });
          }
          editor.setStyleForNextShapes(style, value, { squashing });
          editor.updateInstanceState(
            { isChangingStyle: true },
            { ephemeral: true },
          );
        });

        trackEvent('set-style', {
          source: 'style-panel',
          id: style.id,
          value: value as string,
        });
      },
    [editor, trackEvent],
  );
}

/** @public */
export function CommonStylePickerSet({
  styles,
}: {
  styles: ReadonlySharedStyleMap;
}) {
  const msg = useTranslation();

  const handleValueChange = useStyleChangeCallback();

  const color = styles.get(DefaultColorStyle);
  const fill = styles.get(DefaultFillStyle);
  const dash = styles.get(DefaultDashStyle);
  const size = styles.get(DefaultSizeStyle);

  const showPickers = fill !== undefined || size !== undefined;

  return (
    <>
      <div
        tabIndex={-1}
        className="tlui-style-panel__section__common"
        aria-label="style panel styles"
        data-testid="style.panel">
        {color === undefined ? null : (
          <TldrawUiButtonPicker
            title={msg('style-panel.color')}
            uiType="color"
            style={DefaultColorStyle}
            items={STYLES.color}
            value={color}
            onValueChange={handleValueChange}
          />
        )}
        {/* <OpacitySlider /> */}
      </div>
      {showPickers && (
        <div
          className="tlui-style-panel__section"
          aria-label="style panel styles">
          {/* {fill === undefined ? null : (
            <TldrawUiButtonPicker
              title={msg('style-panel.fill')}
              uiType="fill"
              style={DefaultFillStyle}
              items={STYLES.fill}
              value={fill}
              onValueChange={handleValueChange}
            />
          )} */}
          {dash === undefined ? null : (
            <TldrawUiButtonPicker
              title={msg('style-panel.dash')}
              uiType="dash"
              style={DefaultDashStyle}
              items={STYLES.dash}
              value={dash}
              onValueChange={handleValueChange}
            />
          )}
          {size === undefined ? null : (
            <TldrawUiButtonPicker
              title={msg('style-panel.size')}
              uiType="size"
              style={DefaultSizeStyle}
              items={STYLES.size}
              value={size}
              onValueChange={handleValueChange}
            />
          )}
        </div>
      )}
    </>
  );
}

/** @public */
export function TextStylePickerSet({
  styles,
}: {
  styles: ReadonlySharedStyleMap;
}) {
  const msg = useTranslation();
  const handleValueChange = useStyleChangeCallback();

  const font = styles.get(DefaultFontStyle);
  const align = styles.get(DefaultHorizontalAlignStyle);
  const verticalAlign = styles.get(DefaultVerticalAlignStyle);
  if (font === undefined && align === undefined) {
    return null;
  }

  return (
    <div className="tlui-style-panel__section" aria-label="style panel text">
      {font === undefined ? null : (
        <TldrawUiButtonPicker
          title={msg('style-panel.font')}
          uiType="font"
          style={DefaultFontStyle}
          items={STYLES.font}
          value={font}
          onValueChange={handleValueChange}
        />
      )}

      {align === undefined ? null : (
        <div className="tlui-style-panel__row">
          <TldrawUiButtonPicker
            title={msg('style-panel.align')}
            uiType="align"
            style={DefaultHorizontalAlignStyle}
            items={STYLES.horizontalAlign}
            value={align}
            onValueChange={handleValueChange}
          />
        </div>
      )}
    </div>
  );
}

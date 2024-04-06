import React from 'react';
import { DefaultStylePanel, useRelevantStyles } from '@tldraw/tldraw';
import { CustomStylePanelContent } from './CustomStylePanelContent';

export const CustomStylePanel = () => {
  const styles = useRelevantStyles();
  return (
    <DefaultStylePanel>
      <CustomStylePanelContent styles={styles} />
    </DefaultStylePanel>
  );
};

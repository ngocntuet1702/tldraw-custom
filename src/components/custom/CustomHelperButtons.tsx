import { DefaultHelperButtons } from '@tldraw/tldraw';
import React from 'react';
import { ExitPenMode } from './ExitPenMode';

export const CustomHelperButton = () => {
  return (
    <DefaultHelperButtons>
      <ExitPenMode />
    </DefaultHelperButtons>
  );
};

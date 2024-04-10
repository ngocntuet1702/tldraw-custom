import { track, useEditor } from '@tldraw/tldraw';
import React from 'react';
import svg64 from 'svg64';
import './custom-ui.css';

declare var window: any;

export const CustomUI = track(() => {
  const editor = useEditor();

  const onSave = async () => {
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

  return (
    <div className="custom-layout">
      <button className="custom-button" onClick={onSave}>
        <svg
          fill="#000000"
          width="35px"
          height="30px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          data-name="Layer 1"
          style={{
            fill: '#186bf1',
          }}>
          <path d="M20.71,9.29l-6-6a1,1,0,0,0-.32-.21A1.09,1.09,0,0,0,14,3H6A3,3,0,0,0,3,6V18a3,3,0,0,0,3,3H18a3,3,0,0,0,3-3V10A1,1,0,0,0,20.71,9.29ZM9,5h4V7H9Zm6,14H9V16a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1Zm4-1a1,1,0,0,1-1,1H17V16a3,3,0,0,0-3-3H10a3,3,0,0,0-3,3v3H6a1,1,0,0,1-1-1V6A1,1,0,0,1,6,5H7V8A1,1,0,0,0,8,9h6a1,1,0,0,0,1-1V6.41l4,4Z" />
        </svg>
      </button>
    </div>
  );
});

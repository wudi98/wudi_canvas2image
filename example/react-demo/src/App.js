import React, { useState, useRef } from 'react';
import html2canvas from "html2canvas";
import Canvas2Image from 'wd-canvas2image';

function App() {
  // 容器
  const boxRef = useRef();
  const canvasBoxRef = useRef();
  const imageBoxRef = useRef();

  // 宽、高、文件名、文件类型
  const [height, setHeight] = useState();
  const [width, setWidth] = useState();
  const [fileName, setFileName] = useState();
  const [fileType, setFileType] = useState();

  // 存储canvas
  const [canvasImage, setCanvasImage] = useState('');

  function toCanvas() {
    html2canvas(boxRef.current).then((canvas) => {
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      canvasBoxRef.current.appendChild(canvas);
      imageBoxRef.current.style.display = 'block';
      setWidth(canvasWidth);
      setHeight(canvasHeight);
      setCanvasImage(canvas);
    })
  }

  function toImage() {
    // 调用Canvas2Image插件
    const img = Canvas2Image.convertToImage(canvasImage, width, height);
    imageBoxRef.current.appendChild(img);
  }

  function onSave() {
    // 调用saveAsImage方法实现下载
    Canvas2Image.saveAsImage(canvasImage, width, height, fileType, fileName || '默认名');
  }

  return (
    <div className="App">
      <h2>原始HTML</h2>
      <div style={{ background: 'red', width: 600 }} className="test" ref={boxRef}>
        <div style={{ background: 'green' }}>
          <div style={{ background: 'blue' }}>
            <div style={{ background: 'yellow' }}>
              <div style={{ background: 'orange' }}>
                6666666666666666666666666666666
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2 className="toCanvas" ref={canvasBoxRef}>
        <a onClick={toCanvas}> 转成canvas </a>
      </h2>
      <h2 className="toPic" ref={imageBoxRef}>
        <a onClick={toImage}> 转成图片 </a>
      </h2>
      <h5>
        <label>宽度:</label>
        <input
          type="number"
          value={width}
          placeholder="默认是原图宽度"
          onChange={(e) => setWidth(e.currentTarget.value)}
        />
        <label>高度:</label>
        <input
          type="number"
          value={height}
          placeholder="默认是原图高度"
          onChange={(e) => setHeight(e.currentTarget.value)}
        />
        <label>文件名:</label>
        <input
          type="text"
          value={fileName}
          placeholder="文件名"
          onChange={(e) => setFileName(e.currentTarget.value)}
        />
        <select value={fileType} onChange={(e) => setFileType(e.currentTarget.value)}>
          <option value="png">png</option>
          <option value="jpeg">jpeg</option>
          <option value="bmp">bmp</option>
        </select>
        <button onClick={onSave}>保存</button>
      </h5>
    </div>
  );
}

export default App;

const test = $(".test").get(0);
// 点击转成canvas
$('.toCanvas').click(function (e) {
  // 调用html2canvas插件
  html2canvas(test).then(function (canvas) {
    // canvas宽度
    const canvasWidth = canvas.width;
    // canvas高度
    const canvasHeight = canvas.height;
    // 渲染canvas
    $('.toCanvas').after(canvas);
    // 显示‘转成图片’按钮
    $('.toPic').show(1000);
    // 点击转成图片
    $('.toPic').click(function (e) {
      // 调用Canvas2Image插件
      const img = Canvas2Image.convertToImage(canvas, canvasWidth, canvasHeight);
      // 渲染图片
      $(".toPic").after(img);
      // 点击保存
      $('#save').click(function (e) {
        let type = $('#sel').val(); //图片类型
        let w = $('#imgW').val(); //图片宽度
        let h = $('#imgH').val(); //图片高度
        let f = $('#imgFileName').val(); //图片文件名
        w = (w === '') ? canvasWidth : w; //判断输入宽高是否为空，为空时保持原来的值
        h = (h === '') ? canvasHeight : h;
        // 调用saveAsImage方法实现下载
        Canvas2Image.saveAsImage(canvas, w, h, type, f);
      });
    });
  });
});

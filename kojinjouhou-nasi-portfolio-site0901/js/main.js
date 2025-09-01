"use strict";
{
  $(function () {
    // ドロワーメニュー
    $(".sp-menu-btn").on("click", function () {
      $(".sp-menu").toggleClass("active");
    });
    $(".sp-menu-close, .sp-menu-item").on("click", function () {
      $(".sp-menu").removeClass("active");
    });

    // Ripples（背景に波紋）
    if ($.fn.ripples) {
      try {
        const $fv = $(".first-view-area");
        $fv.ripples({
          resolution: 256,
          dropRadius: 10,
          perturbance: 0.04,
          interactive: true,
        });

        // マウス移動で明示的に波紋を落とす
        let last = 0;
        $fv.on("mousemove", function (e) {
          const now = Date.now();
          if (now - last > 60) {
            const x = e.offsetX,
              y = e.offsetY;
            $(this).ripples("drop", x, y, 12, 0.04);
            last = now;
          }
        });
      } catch (e) {
        console.warn("Ripplesを初期化できませんでした（WebGL非対応など）", e);
      }
    }
  });

  // リサイズで再生成（任意）
  $(window).on("resize", function () {
    const $fv = $(".first-view-area");
    if ($fv.data("ripples")) {
      $fv.ripples("destroy").ripples();
    }
  });
}

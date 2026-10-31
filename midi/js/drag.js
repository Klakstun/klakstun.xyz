/* ═══════════════════════════════════════════
   拖拽排序 — 侧边栏区块上下拖动重排
   ═══════════════════════════════════════════ */
(function() {
  'use strict';

  var draggedBlock = null;
  var dragGroup = null;

  function initDragAndDrop() {
    var panels = document.querySelectorAll('.sidebar-panel');

    for (var p = 0; p < panels.length; p++) {
      var panel = panels[p];
      var blocks = panel.querySelectorAll('.draggable-block');

      for (var b = 0; b < blocks.length; b++) {
        var block = blocks[b];

        // 设置 draggable 属性
        block.setAttribute('draggable', 'true');

        // 开始拖拽
        block.addEventListener('dragstart', function(e) {
          draggedBlock = this;
          dragGroup = this.parentNode;
          this.classList.add('dragging');
          e.dataTransfer.effectAllowed = 'move';
          // Firefox 需要 setData
          e.dataTransfer.setData('text/plain', '');
          // 延迟降低透明度，让浏览器截图生效
          setTimeout(function() {
            if (draggedBlock) draggedBlock.style.opacity = '0.4';
          }, 0);
        });

        // 拖拽结束
        block.addEventListener('dragend', function() {
          this.classList.remove('dragging');
          this.style.opacity = '';
          draggedBlock = null;
          // 清除所有 drag-over 状态
          if (dragGroup) {
            var all = dragGroup.querySelectorAll('.draggable-block');
            for (var i = 0; i < all.length; i++) {
              all[i].classList.remove('drag-over-top');
              all[i].classList.remove('drag-over-bottom');
            }
          }
          dragGroup = null;
        });

        // 拖拽经过
        block.addEventListener('dragover', function(e) {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
          if (!draggedBlock || draggedBlock === this) return;

          var rect = this.getBoundingClientRect();
          var midY = rect.top + rect.height / 2;
          var isAbove = e.clientY < midY;

          // 清除旧状态
          this.classList.remove('drag-over-top');
          this.classList.remove('drag-over-bottom');

          if (isAbove) {
            this.classList.add('drag-over-top');
          } else {
            this.classList.add('drag-over-bottom');
          }
        });

        // 拖拽离开
        block.addEventListener('dragleave', function() {
          this.classList.remove('drag-over-top');
          this.classList.remove('drag-over-bottom');
        });

        // 放下
        block.addEventListener('drop', function(e) {
          e.preventDefault();
          this.classList.remove('drag-over-top');
          this.classList.remove('drag-over-bottom');

          if (!draggedBlock || draggedBlock === this) return;

          var rect = this.getBoundingClientRect();
          var midY = rect.top + rect.height / 2;
          var parent = this.parentNode;

          if (e.clientY < midY) {
            // 插入到当前元素之前
            parent.insertBefore(draggedBlock, this);
          } else {
            // 插入到当前元素之后
            parent.insertBefore(draggedBlock, this.nextSibling);
          }

          // 保存排序到 localStorage
          saveBlockOrder();
        });
      }
    }
  }

  // 保存当前区块排序到 localStorage
  function saveBlockOrder() {
    var panels = document.querySelectorAll('.sidebar-panel');
    var order = {};

    for (var p = 0; p < panels.length; p++) {
      var panel = panels[p];
      var panelId = panel.id || ('panel' + p);
      var blocks = panel.querySelectorAll('.draggable-block');
      var ids = [];
      for (var b = 0; b < blocks.length; b++) {
        // 使用 data-block-id 或者位置索引
        var bid = blocks[b].getAttribute('data-block-id');
        if (!bid) {
          bid = 'block' + b;
          blocks[b].setAttribute('data-block-id', bid);
        }
        ids.push(bid);
      }
      order[panelId] = ids;
    }

    localStorage.setItem('midi-tools-block-order', JSON.stringify(order));
  }

  // 恢复保存的排序
  function restoreBlockOrder() {
    try {
      var saved = localStorage.getItem('midi-tools-block-order');
      if (!saved) return;
      var order = JSON.parse(saved);

      var panels = document.querySelectorAll('.sidebar-panel');
      for (var p = 0; p < panels.length; p++) {
        var panel = panels[p];
        var panelId = panel.id || ('panel' + p);
        var ids = order[panelId];
        if (!ids || !ids.length) continue;

        var blocks = panel.querySelectorAll('.draggable-block');
        if (blocks.length !== ids.length) continue;

        // 给每个 block 设置 data-block-id
        for (var b = 0; b < blocks.length; b++) {
          if (!blocks[b].getAttribute('data-block-id')) {
            blocks[b].setAttribute('data-block-id', 'block' + b);
          }
        }

        // 按保存的顺序重新排列
        for (var i = ids.length - 1; i >= 0; i--) {
          var target = panel.querySelector('.draggable-block[data-block-id="' + ids[i] + '"]');
          if (target) {
            panel.insertBefore(target, panel.firstChild);
          }
        }
      }
    } catch(e) {
      // 忽略解析错误
    }
  }

  // 初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initDragAndDrop();
      restoreBlockOrder();
    });
  } else {
    initDragAndDrop();
    restoreBlockOrder();
  }
})();
document.addEventListener('DOMContentLoaded', function() {
    const title = document.querySelector('.title');
    const subtitle = document.querySelector('.subtitle');
    
    // クリックイベントでカラーを変更
    title.addEventListener('click', function() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        title.style.color = randomColor;
        
        // 少し拡大アニメーション
        title.style.transform = 'scale(1.1)';
        setTimeout(() => {
            title.style.transform = 'scale(1)';
        }, 200);
    });
    
    // サブタイトルをホバーで光らせる
    subtitle.addEventListener('mouseenter', function() {
        subtitle.style.textShadow = '0 0 20px rgba(255, 255, 255, 0.8)';
    });
    
    subtitle.addEventListener('mouseleave', function() {
        subtitle.style.textShadow = 'none';
    });
    
    // ページロード時にコンソールメッセージ
    console.log('🎉 Hello World サイトが読み込まれました！');
});
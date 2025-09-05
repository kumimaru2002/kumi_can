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

// スクロール誘導機能
function scrollToContent() {
    const profileSection = document.querySelector('.profile-section');
    profileSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// ローディング画面の管理
class LoadingManager {
    constructor() {
        this.loadingScreen = document.querySelector('.loading-screen');
        this.imagesToLoad = ['assets/mini_can_udekumi.png', 'assets/kumi_wink.PNG'];
        this.loadedImages = 0;
        this.minDisplayTime = 2000; // 最低2秒間表示
        this.startTime = Date.now();
        this.allImagesLoaded = false;
        this.disableScroll();
        this.preloadImages();
    }

    disableScroll() {
        document.body.classList.add('loading');
    }

    enableScroll() {
        document.body.classList.remove('loading');
    }

    preloadImages() {
        this.imagesToLoad.forEach((src) => {
            const img = new Image();
            img.onload = () => this.onImageLoaded();
            img.onerror = () => this.onImageLoaded();
            img.src = src;
        });
    }

    onImageLoaded() {
        this.loadedImages++;
        if (this.loadedImages >= this.imagesToLoad.length) {
            this.allImagesLoaded = true;
            this.checkIfCanHide();
        }
    }

    checkIfCanHide() {
        const elapsedTime = Date.now() - this.startTime;
        if (this.allImagesLoaded && elapsedTime >= this.minDisplayTime) {
            this.hideLoading();
        } else {
            const remainingTime = Math.max(0, this.minDisplayTime - elapsedTime);
            setTimeout(() => this.hideLoading(), remainingTime);
        }
    }

    hideLoading() {
        this.loadingScreen.classList.add('fade-out');
        this.enableScroll();
        setTimeout(() => {
            this.loadingScreen.style.display = 'none';
        }, 500);
    }
}

// ページ読み込み時にローディングマネージャーを初期化
document.addEventListener('DOMContentLoaded', function() {
    new LoadingManager();
});
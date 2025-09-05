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

// プロフィールセクションのアニメーション管理
class ProfileAnimationManager {
    constructor() {
        this.profileSection = document.getElementById('profile-section');
        this.animateItems = this.profileSection.querySelectorAll('.animate-item');
        this.hasAnimated = false;
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.3, // 30%表示されたときにアニメーション開始
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 画面に入ったときにアニメーション実行
                    this.startAnimation();
                } else if (this.hasAnimated) {
                    // 画面外に出たときにアニメーションをリセット（再アニメーション用）
                    this.resetAnimation();
                }
            });
        }, observerOptions);

        this.observer.observe(this.profileSection);
    }

    startAnimation() {
        this.hasAnimated = true;
        // DOM順序でアニメーションを実行（上から順番）
        const itemsArray = Array.from(this.animateItems);
        itemsArray.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animate');
            }, index * 300); // 各要素を300msずつ遅延して順次表示
        });
    }

    resetAnimation() {
        this.hasAnimated = false;
        this.animateItems.forEach(item => {
            item.classList.remove('animate');
        });
    }
}

// タイムラインアニメーション管理
class TimelineAnimationManager {
    constructor() {
        this.timelineItems = document.querySelectorAll('.timeline-animate');
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.3, // 30%表示されたときにアニメーション開始
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 画面に入ったときにアニメーション実行
                    entry.target.classList.add('slide-in');
                } else {
                    // 画面外に出たときにアニメーションをリセット（再アニメーション用）
                    entry.target.classList.remove('slide-in');
                }
            });
        }, observerOptions);

        // 各タイムラインアイテムを監視対象に追加
        this.timelineItems.forEach(item => {
            this.observer.observe(item);
        });
    }
}

// 応援メッセージアニメーション管理
class SupportMessageAnimationManager {
    constructor() {
        this.supportSection = document.querySelector('.fan-support-section');
        this.supportMessages = document.querySelectorAll('.support-animate');
        this.hasAnimated = false;
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.2, // 20%表示されたときにアニメーション開始
            rootMargin: '0px 0px -100px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    // 画面に入ったときに順次アニメーション実行
                    this.startFlashAnimation();
                    this.hasAnimated = true;
                } else if (!entry.isIntersecting && this.hasAnimated) {
                    // 画面外に出たときにリセット（再アニメーション用）
                    this.resetAnimation();
                }
            });
        }, observerOptions);

        this.observer.observe(this.supportSection);
    }

    startFlashAnimation() {
        this.supportMessages.forEach((message, index) => {
            setTimeout(() => {
                message.classList.add('flash-in');
            }, index * 200); // 各メッセージを200msずつ遅延して点滅表示
        });
    }

    resetAnimation() {
        this.hasAnimated = false;
        this.supportMessages.forEach(message => {
            message.classList.remove('flash-in');
        });
    }
}

// ページ読み込み時にアニメーションマネージャーを初期化
document.addEventListener('DOMContentLoaded', function() {
    new ProfileAnimationManager();
    new TimelineAnimationManager();
    new SupportMessageAnimationManager();
});
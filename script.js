document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // Toast Notification System
    // ======================
    const toast = document.getElementById('toast');
    const toastContent = toast.querySelector('.toast-content');
    let toastTimeout;

    function showToast(message, type = 'success') {
        // Clear any existing timeout
        clearTimeout(toastTimeout);
        
        // Reset toast classes
        toast.className = 'toast';
        toast.classList.add(type);
        
        // Set message and show
        toastContent.textContent = message;
        toast.classList.add('show');
        
        // Auto-hide after 3 seconds
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
        // ======================
// Background Music System
// ======================
const bgMusic = document.getElementById('bgMusic');
const musicButton = document.createElement('button');
musicButton.className = 'ghost-button small';
musicButton.style.position = 'fixed';
musicButton.style.bottom = '20px';
musicButton.style.left = '20px';
musicButton.style.zIndex = '1000';
document.body.appendChild(musicButton);

// Try to autoplay (may be blocked by browser policies)
function attemptAutoplay() {
  bgMusic.volume = 0.3; // Set volume to 30%
  const playPromise = bgMusic.play();
  
  if (playPromise !== undefined) {
    playPromise.catch(error => {
      musicButton.textContent = 'Play Music (Autoplay blocked)';
    });
  }
}

// Toggle music on button click
musicButton.addEventListener('click', () => {
  if (bgMusic.paused) {
    bgMusic.play();
    musicButton.textContent = 'Pause Music';
  } else {
    bgMusic.pause();
    musicButton.textContent = 'Play Music';
  }
});

// Attempt autoplay after user interaction
document.addEventListener('click', () => {
  attemptAutoplay();
  document.removeEventListener('click', attemptAutoplay);
}, { once: true });

// Initial attempt (will likely fail due to browser policies)
attemptAutoplay();
    }

    // ======================
    // Navigation System
    // ======================
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            
            // Update active nav link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
            
            // Show target section
            contentSections.forEach(section => {
                section.classList.remove('active');
                if(section.id === targetSection) {
                    section.classList.add('active');
                    // Show toast when switching to music or CS2 sections
                    if (targetSection === 'music') {
                        showToast('Music projects loaded', 'success');
                    } else if (targetSection === 'cs') {
                        showToast('CS2 stats loaded', 'success');
                    }
                }
            });
        });
    });

    // ======================
    // Authentication System
    // ======================
    const loginForm = document.getElementById('loginForm');
    const vipSection = document.getElementById('vip');
    const logoutBtn = document.getElementById('logoutBtn');
    const CORRECT_PASSWORD = "flex123"; // Change this to your desired password
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const password = document.getElementById('password').value;
        
        if(password === CORRECT_PASSWORD) {
            // Hide login section and show VIP content
            document.querySelector('#login').classList.remove('active');
            vipSection.classList.add('active');
            
            // Update nav to show VIP is active
            navLinks.forEach(link => link.classList.remove('active'));
            
            showToast('Access granted. Welcome back.', 'success');
        } else {
            showToast('Invalid credentials. Access denied.', 'error');
            document.getElementById('password').value = '';
        }
    });

    // Logout functionality
    logoutBtn.addEventListener('click', function() {
        vipSection.classList.remove('active');
        document.querySelector('#login').classList.add('active');
        document.querySelector('[data-section="login"]').classList.add('active');
        loginForm.reset();
        showToast('Logged out successfully', 'success');
    });

    // ======================
    // VIP Section Interactions
    // ======================
    document.querySelector('.download-btn')?.addEventListener('click', function() {
        showToast('Download started: flex_loader_v3.1.7.exe', 'success');
    });

    document.querySelector('.ghost-button')?.addEventListener('click', function() {
        showToast('Discord invite sent to your device', 'success');
    });

    // ======================
    // Easter Egg - Konami Code
    // ======================
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 
        'ArrowDown', 'ArrowDown', 
        'ArrowLeft', 'ArrowRight', 
        'ArrowLeft', 'ArrowRight', 
        'b', 'a'
    ];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                showToast('Cheat codes activated!', 'success');
                document.body.style.background = 'linear-gradient(135deg, #0a0a0a 0%, #1a0a1a 100%)';
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    // ======================
    // Initialization
    // ======================
    // Show welcome toast after 1 second
    setTimeout(() => {
        showToast('System initialized. Ready for commands.', 'success');
    }, 1000);
});

// System Info Detector
function detectSystem() {
    // Browser Detection
    const userAgent = navigator.userAgent;
    let browserName;
    
    if (userAgent.includes("Firefox")) browserName = "Firefox";
    else if (userAgent.includes("Edg")) browserName = "Edge";
    else if (userAgent.includes("Chrome")) browserName = "Chrome";
    else if (userAgent.includes("Safari")) browserName = "Safari";
    else browserName = "Unknown";
    
    document.getElementById('browserData').textContent = `${browserName} (${navigator.platform})`;
    
    // OS Detection
    let osName = "Unknown OS";
    if (userAgent.includes("Windows")) osName = "Windows";
    if (userAgent.includes("Mac")) osName = "macOS";
    if (userAgent.includes("Linux")) osName = "Linux";
    if (userAgent.includes("Android")) osName = "Android";
    if (userAgent.includes("iOS") || userAgent.includes("iPhone")) osName = "iOS";
    
    document.getElementById('osData').textContent = osName;
    
    // Screen Info
    const screenInfo = `${screen.width}×${screen.height} (${window.devicePixelRatio}x)`;
    document.getElementById('screenData').textContent = screenInfo;
    
    // Online Status
    const onlineStatus = navigator.onLine ? "Online" : "Offline";
    document.getElementById('onlineData').textContent = onlineStatus;
    
    // Listen for network changes
    window.addEventListener('online', () => {
        document.getElementById('onlineData').textContent = "Online";
    });
    
    window.addEventListener('offline', () => {
        document.getElementById('onlineData').textContent = "Offline";
    });
}



// Run detection when VIP section loads
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // ... your existing login code ...
    detectSystem(); // Add this line
});

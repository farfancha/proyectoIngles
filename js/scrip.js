document.addEventListener('DOMContentLoaded', function() {
    // Variables
    let cartCount = 0;
    const cartCountElement = document.querySelector('.cart-count');
    const addToCartButtons = document.querySelectorAll('.btn-cart');
    const cartIcon = document.querySelector('.cart-icon');
    
    // Add to cart event
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-title').textContent;
            
            // Button animation
            this.innerHTML = '<i class="fas fa-check"></i>';
            this.style.backgroundColor = '#5E376D';
            
            // Increase cart count
            cartCount++;
            updateCartCount();
            
            // Show notification
            showNotification(`${productName} added to cart`);
            
            // Restore button after 1.5 seconds
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-cart-plus"></i>';
                this.style.backgroundColor = '#FF85A2';
            }, 1500);
        });
    });
    
    // Update cart counter
    function updateCartCount() {
        cartCountElement.textContent = cartCount;
        
        // Animation
        cartIcon.classList.add('animate-bounce');
        setTimeout(() => {
            cartIcon.classList.remove('animate-bounce');
        }, 500);
    }
    
    // Show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Show
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Hide after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Notification styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-bounce {
            animation: bounce 0.5s;
        }
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }
        
        .notification {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #5E376D;
            color: white;
            padding: 12px 24px;
            border-radius: 30px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.2);
            opacity: 0;
            transition: opacity 0.3s, transform 0.3s;
            z-index: 1000;
            font-size: 0.9rem;
        }
        
        .notification.show {
            opacity: 1;
            transform: translateX(-50%) translateY(-10px);
        }
    `;
    document.head.appendChild(style);
});
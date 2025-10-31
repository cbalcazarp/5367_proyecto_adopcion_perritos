// Dog Adoption Site - Enhanced JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Form submission handlers
    const adoptModal = document.getElementById('adoptModal');
    const volunteerModal = document.getElementById('volunteerModal');
    
    // Toast notification
    const toastElement = document.getElementById('liveToast');
    const toast = new bootstrap.Toast(toastElement);
    
    // Handle adopt form submission
    if (adoptModal) {
        const adoptForm = adoptModal.querySelector('form');
        const submitBtn = adoptModal.querySelector('.btn-primary');
        
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Simple form validation
            if (adoptForm.checkValidity()) {
                // Show loading state
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Enviando...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    // Close modal
                    bootstrap.Modal.getInstance(adoptModal).hide();
                    
                    // Show success toast
                    toastElement.querySelector('.toast-body').textContent = '¡Solicitud de adopción enviada exitosamente! Te contactaremos pronto.';
                    toastElement.querySelector('.toast-header .text-primary').className = 'bi bi-check-circle-fill text-success me-2';
                    toast.show();
                    
                    // Reset form and button
                    adoptForm.reset();
                    submitBtn.innerHTML = '<i class="bi bi-send-fill me-2"></i>Enviar Solicitud';
                    submitBtn.disabled = false;
                }, 2000);
            } else {
                adoptForm.reportValidity();
            }
        });
    }
    
    // Handle volunteer form submission
    if (volunteerModal) {
        const volunteerForm = volunteerModal.querySelector('form');
        const submitBtn = volunteerModal.querySelector('.btn-success');
        
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Simple form validation
            if (volunteerForm.checkValidity()) {
                // Show loading state
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Enviando...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    // Close modal
                    bootstrap.Modal.getInstance(volunteerModal).hide();
                    
                    // Show success toast
                    toastElement.querySelector('.toast-body').textContent = '¡Solicitud de voluntariado recibida! Bienvenido a nuestra familia.';
                    toastElement.querySelector('.toast-header .text-primary').className = 'bi bi-check-circle-fill text-success me-2';
                    toast.show();
                    
                    // Reset form and button
                    volunteerForm.reset();
                    submitBtn.innerHTML = '<i class="bi bi-send-fill me-2"></i>Enviar Solicitud';
                    submitBtn.disabled = false;
                }, 2000);
            } else {
                volunteerForm.reportValidity();
            }
        });
    }
    
    // Animate progress bars when they come into view
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.progress-bar');
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                });
            }
        });
    }, observerOptions);
    
    const statisticsSection = document.querySelector('.statistics');
    if (statisticsSection) {
        progressObserver.observe(statisticsSection);
    }
    
    // Add smooth scrolling to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Counter animation for statistics
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        }
        updateCounter();
    }
    
    // Animate counters when statistics section is visible
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('h3');
                counters.forEach(counter => {
                    const text = counter.textContent;
                    const match = text.match(/[\d,]+/);
                    if (match) {
                        const target = parseInt(match[0].replace(/,/g, ''));
                        const prefix = text.split(match[0])[0];
                        const suffix = text.split(match[0])[1];
                        
                        counter.textContent = prefix + '0' + suffix;
                        setTimeout(() => {
                            animateCounter(counter, target);
                        }, 300);
                    }
                });
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    if (statisticsSection) {
        counterObserver.observe(statisticsSection);
    }
    
    // Phase 3: Advanced Features JavaScript
    
    // Dog Profile Modal Handler
    const dogProfileModal = document.getElementById('dogProfileModal');
    if (dogProfileModal) {
        // Dog data
        const dogData = {
            max: {
                name: 'Max',
                breed: 'Golden Retriever • 3 años • Macho',
                status: 'Disponible',
                statusClass: 'bg-success',
                size: 'Grande',
                energy: 'Alta',
                kids: 'Excelente',
                trained: 'Sí',
                personality: 'Max es un perro increíblemente cariñoso y leal. Le encanta jugar con pelotas y nadar. Es muy inteligente y obediente, perfecto para familias activas con niños. Está completamente vacunado y esterilizado.',
                needs: [
                    'Ejercicio diario (1-2 horas)',
                    'Patio grande o acceso a parque',
                    'Familia activa y comprometida'
                ]
            },
            luna: {
                name: 'Luna',
                breed: 'Border Collie • 2 años • Hembra',
                status: 'Reservado',
                statusClass: 'bg-warning',
                size: 'Mediano',
                energy: 'Muy Alta',
                kids: 'Bueno',
                trained: 'En proceso',
                personality: 'Luna es extremadamente inteligente y necesita estimulación mental constante. Es perfecta para personas activas que disfruten del entrenamiento y los deportes caninos.',
                needs: [
                    'Ejercicio intenso diario',
                    'Estimulación mental',
                    'Experiencia con perros activos'
                ]
            },
            rocky: {
                name: 'Rocky',
                breed: 'Pastor Alemán • 4 años • Macho',
                status: 'Disponible',
                statusClass: 'bg-success',
                size: 'Grande',
                energy: 'Media',
                kids: 'Supervisión',
                trained: 'Sí',
                personality: 'Rocky es un perro leal y protector. Ha sido entrenado como perro guardián pero es gentil con su familia. Necesita un dueño experimentado que pueda manejar su personalidad fuerte.',
                needs: [
                    'Dueño experimentado',
                    'Socialización continua',
                    'Espacio amplio'
                ]
            },
            bella: {
                name: 'Bella',
                breed: 'Labrador • 1 año • Hembra',
                status: 'Disponible',
                statusClass: 'bg-success',
                size: 'Mediano-Grande',
                energy: 'Muy Alta',
                kids: 'Excelente',
                trained: 'Básico',
                personality: 'Bella es una cachorra llena de energía y amor. Le encanta conocer gente nueva y jugar con otros perros. Es muy inteligente y aprende rápidamente.',
                needs: [
                    'Entrenamiento básico continuo',
                    'Mucho ejercicio y juego',
                    'Socialización temprana'
                ]
            },
            toby: {
                name: 'Toby',
                breed: 'Beagle • 5 años • Macho',
                status: 'Especial',
                statusClass: 'bg-info',
                size: 'Mediano',
                energy: 'Baja',
                kids: 'Excelente',
                trained: 'Sí',
                personality: 'Toby es un perro senior muy tranquilo y cariñoso. Es perfecto para personas mayores o familias que buscan un compañero relajado. Le encanta caminar despacio y recibir cariño.',
                needs: [
                    'Ejercicio suave',
                    'Cuidados veterinarios regulares',
                    'Ambiente tranquilo'
                ]
            },
            coco: {
                name: 'Coco',
                breed: 'Cocker Spaniel • 3 años • Hembra',
                status: 'Disponible',
                statusClass: 'bg-success',
                size: 'Mediano',
                energy: 'Media',
                kids: 'Excelente',
                trained: 'Sí',
                personality: 'Coco es dulce y cariñosa. Se lleva muy bien con otros animales y niños. Es una perrita equilibrada que se adapta fácilmente a diferentes estilos de vida.',
                needs: [
                    'Cepillado regular',
                    'Ejercicio moderado',
                    'Compañía familiar'
                ]
            },
            zeus: {
                name: 'Zeus',
                breed: 'Husky Siberiano • 6 años • Macho',
                status: 'Urgente',
                statusClass: 'bg-danger',
                size: 'Grande',
                energy: 'Alta',
                kids: 'Con supervisión',
                trained: 'Sí',
                personality: 'Zeus es un husky majestuoso que necesita urgentemente un hogar. Requiere una familia con experiencia en la raza y espacio amplio. Es leal pero independiente.',
                needs: [
                    'Experiencia con Huskies',
                    'Patio muy grande',
                    'Ejercicio intenso diario'
                ]
            },
            miel: {
                name: 'Miel',
                breed: 'Mestizo • 2 años • Hembra',
                status: 'Disponible',
                statusClass: 'bg-success',
                size: 'Mediano',
                energy: 'Media',
                kids: 'Excelente',
                trained: 'Básico',
                personality: 'Miel fue rescatada de la calle y ha demostrado ser increíblemente agradecida y cariñosa. Es muy adaptable y se lleva bien con todos.',
                needs: [
                    'Paciencia inicial',
                    'Ejercicio regular',
                    'Mucho amor y cariño'
                ]
            }
        };
        
        // Handle dog profile modal
        document.addEventListener('click', function(e) {
            if (e.target.closest('[data-bs-target="#dogProfileModal"]')) {
                const dogId = e.target.closest('[data-bs-target="#dogProfileModal"]').getAttribute('data-dog');
                const dog = dogData[dogId];
                
                if (dog) {
                    // Update modal content
                    document.getElementById('dogName').textContent = dog.name;
                    document.getElementById('dogBreed').textContent = dog.breed;
                    document.getElementById('dogStatus').textContent = dog.status;
                    document.getElementById('dogStatus').className = `badge ${dog.statusClass} fs-6`;
                    document.getElementById('dogSize').textContent = dog.size;
                    document.getElementById('dogEnergy').textContent = dog.energy;
                    document.getElementById('dogKids').textContent = dog.kids;
                    document.getElementById('dogTrained').textContent = dog.trained;
                    document.getElementById('dogPersonality').textContent = dog.personality;
                    
                    // Update needs list
                    const needsList = document.getElementById('dogNeeds');
                    needsList.innerHTML = '';
                    dog.needs.forEach(need => {
                        const li = document.createElement('li');
                        li.innerHTML = `<i class="bi bi-check-circle text-success me-2"></i>${need}`;
                        needsList.appendChild(li);
                    });
                }
            }
        });
    }
    
    // Search and Filter Functionality
    const searchInput = document.getElementById('searchName');
    const breedFilter = document.getElementById('filterBreed');
    const ageFilter = document.getElementById('filterAge');
    const sizeFilter = document.getElementById('filterSize');
    const applyFiltersBtn = document.getElementById('applyFilters');
    const clearFiltersBtn = document.getElementById('clearFilters');
    const searchResults = document.getElementById('searchResults');
    const resultsText = document.getElementById('resultsText');
    
    if (applyFiltersBtn && clearFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            // Show loading state
            this.classList.add('btn-loading');
            this.disabled = true;
            
            setTimeout(() => {
                // Simulate filtering
                const searchTerm = searchInput.value.toLowerCase();
                const breed = breedFilter.value;
                const age = ageFilter.value;
                const size = sizeFilter.value;
                
                // Calculate mock results
                let resultCount = 8;
                if (searchTerm) resultCount = Math.max(1, resultCount - 2);
                if (breed) resultCount = Math.max(1, Math.floor(resultCount / 2));
                if (age) resultCount = Math.max(1, Math.floor(resultCount / 1.5));
                if (size) resultCount = Math.max(1, Math.floor(resultCount / 1.2));
                
                // Show results
                resultsText.textContent = `Se encontraron ${resultCount} perritos`;
                searchResults.style.display = 'block';
                searchResults.classList.add('filter-fade-in');
                
                // Remove loading state
                this.classList.remove('btn-loading');
                this.disabled = false;
            }, 1500);
        });
        
        clearFiltersBtn.addEventListener('click', function() {
            searchInput.value = '';
            breedFilter.value = '';
            ageFilter.value = '';
            sizeFilter.value = '';
            searchResults.style.display = 'none';
        });
    }
    
    // Share Profile Functionality
    const shareProfileBtn = document.getElementById('shareProfile');
    if (shareProfileBtn) {
        shareProfileBtn.addEventListener('click', function() {
            const dogName = document.getElementById('dogName').textContent;
            const url = window.location.href;
            
            if (navigator.share) {
                navigator.share({
                    title: `Adopta a ${dogName}`,
                    text: `¡Conoce a ${dogName}! Este adorable perrito está buscando un hogar lleno de amor.`,
                    url: url
                });
            } else {
                // Fallback - copy to clipboard
                navigator.clipboard.writeText(`¡Conoce a ${dogName}! ${url}`).then(() => {
                    // Show toast
                    toastElement.querySelector('.toast-body').textContent = '¡Enlace copiado al portapapeles!';
                    toastElement.querySelector('.toast-header .text-primary').className = 'bi bi-clipboard-check text-success me-2';
                    toast.show();
                });
            }
        });
    }
    
    // Auto-advance testimonials
    const testimonialsCarousel = document.getElementById('testimonialsCarousel');
    if (testimonialsCarousel) {
        const carousel = new bootstrap.Carousel(testimonialsCarousel, {
            interval: 6000,
            wrap: true
        });
    }
    
    // Intersection Observer for animations
    const animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('card-hover-effect');
                
                // Add staggered animation for dog cards
                if (entry.target.classList.contains('dog-card')) {
                    const cards = entry.target.parentElement.parentElement.querySelectorAll('.dog-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.animation = `fadeIn 0.6s ease forwards`;
                        }, index * 200);
                    });
                }
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all cards for animations
    document.querySelectorAll('.card').forEach(card => {
        animationObserver.observe(card);
    });
    
    // Star rating hover effect
    document.querySelectorAll('.bi-star-fill').forEach((star, index) => {
        star.style.setProperty('--star-index', index);
    });
});
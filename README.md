<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FireSafe | Professional Safety Solutions</title>
    <!-- Tailwind CSS for modern industrial styling -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Lucide Icons for high-fidelity UI -->
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        :root {
            --safety-red: #ef4444;
            --safety-red-hover: #dc2626;
            --dark-bg: #05080f;
            --dark-surface: #0d121f;
            --dark-border: rgba(255, 255, 255, 0.08);
        }

        body {
            font-family: 'Inter', sans-serif;
            background-color: var(--dark-bg);
            color: #f1f5f9;
            scroll-behavior: smooth;
        }

        /* Custom Scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: #0a0f18; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #334155; 
            border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #475569; 
        }

        .text-safety-red { color: var(--safety-red); }
        .bg-safety-red { background-color: var(--safety-red); }
        
        .product-card {
            background-color: var(--dark-surface);
            border: 1px solid var(--dark-border);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .product-card:hover {
            transform: translateY(-8px);
            border-color: rgba(239, 68, 68, 0.4);
            box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.5), 0 18px 36px -18px rgba(239, 68, 68, 0.3);
        }

        /* Tactical Promo Highlight */
        .promo-card-highlight {
            border: 2px solid rgba(239, 68, 68, 0.5);
            box-shadow: 0 0 20px rgba(239, 68, 68, 0.2);
            animation: pulse-border 2s infinite;
        }

        @keyframes pulse-border {
            0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
            70% { box-shadow: 0 0 0 15px rgba(239, 68, 68, 0); }
            100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }

        .sticky-header {
            position: sticky;
            top: 0;
            z-index: 50;
            background: rgba(5, 8, 15, 0.8);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--dark-border);
        }

        /* Modal & Side Panel Transitions */
        #cart-panel, #ai-consultant-panel, #payment-modal, #manage-modal, #auth-modal, #product-detail-modal {
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
        }
        .cart-hidden, .ai-hidden { transform: translateX(100%); }

        /* Beacon Animations */
        .beacon-red { animation: strobe-red 0.6s infinite; }
        .beacon-blue { animation: strobe-blue 0.6s infinite; animation-delay: 0.3s; }

        @keyframes strobe-red {
            0%, 20%, 40% { background-color: #ff0000; box-shadow: 0 0 70px 20px rgba(255, 0, 0, 0.9); }
            10%, 30%, 50%, 100% { background-color: #330000; box-shadow: none; }
        }

        @keyframes strobe-blue {
            0%, 20%, 40% { background-color: #0077ff; box-shadow: 0 0 70px 20px rgba(0, 119, 255, 0.9); }
            10%, 30%, 50%, 100% { background-color: #001a33; box-shadow: none; }
        }

        .nav-link {
            @apply text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-all cursor-pointer px-4 py-2 rounded-xl;
        }
        .nav-link.active {
            @apply text-red-500 bg-red-500/10 border border-red-500/20;
        }

        .hero-fire-bg {
            background-image: linear-gradient(to right, rgba(5, 8, 15, 0.95) 30%, rgba(5, 8, 15, 0.2) 100%), url('https://images.unsplash.com/photo-1540331547168-8b6472b74658?auto=format&fit=crop&q=80&w=1200');
            background-size: cover;
            background-position: center;
        }

        .slogan-gradient {
            @apply bg-gradient-to-r from-white via-white to-red-500 bg-clip-text text-transparent;
        }

        .scan-line {
            height: 2px;
            background: linear-gradient(to right, transparent, var(--safety-red), transparent);
            width: 100%;
            position: absolute;
            top: 0;
            animation: scanning 4s infinite linear;
        }
        @keyframes scanning {
            0% { top: 0; opacity: 0; }
            50% { opacity: 0.8; }
            100% { top: 100%; opacity: 0; }
        }

        /* 3D Payment Card Style */
        .payment-card-3d {
            @apply relative bg-white/5 border border-white/10 p-5 rounded-[2.5rem] transition-all duration-500 cursor-pointer overflow-hidden flex flex-col items-center justify-center text-center h-full min-h-[150px];
            transform-style: preserve-3d;
            perspective: 1000px;
        }

        .payment-card-3d:hover {
            @apply border-white/20 bg-white/10;
            transform: translateY(-10px) rotateX(10deg);
            box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.7);
        }

        .payment-icon-container {
            @apply w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-2xl transition-all duration-500 mb-4 border border-white/20;
            transform: translateZ(30px);
            background: linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02));
        }

        .payment-card-3d:hover .payment-icon-container {
            transform: translateZ(60px) scale(1.1) rotateY(10deg);
        }

        .payment-label {
            @apply text-[9px] font-black text-white tracking-[0.1em] uppercase leading-tight;
            transform: translateZ(20px);
        }

        /* Social Card Style */
        .social-card {
            @apply relative bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all hover:scale-105 hover:bg-white/10 cursor-pointer text-center h-32;
        }

        /* Toast Notification */
        #toast {
            opacity: 0;
            transition: all 0.3s ease;
            bottom: 20px;
        }

        /* NEW: Blinking Text Animation */
        @keyframes urgent-blink {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(0.95); }
        }
        .blink-urgent {
            animation: urgent-blink 1s infinite;
        }
    </style>
</head>
<body class="overflow-x-hidden custom-scrollbar">

    <!-- Toast Notification -->
    <div id="toast" class="fixed left-1/2 -translate-x-1/2 bg-red-600 text-white px-8 py-4 rounded-2xl shadow-2xl z-[200] font-black text-xs uppercase tracking-widest border border-red-400">
        Notification
    </div>

    <!-- Header / Navigation -->
    <header class="sticky-header">
        <!-- Top Operational Bar -->
        <div class="bg-black/40 text-gray-400 text-[10px] py-2 px-6 border-b border-white/5 font-black uppercase tracking-widest">
            <div class="container mx-auto flex justify-between items-center">
                <div class="flex gap-6 items-center">
                    <span>Clearance Level: <span id="status-label" class="text-white">PUBLIC ACCESS</span></span>
                </div>
                <div class="flex gap-6 items-center">
                    <!-- Admin Hub Toggle -->
                    <div id="admin-controls" class="hidden flex items-center gap-4 border-r border-white/10 pr-6">
                        <span class="text-red-500 text-[9px] flex items-center gap-1.5 animate-pulse">
                            <i data-lucide="shield-check" class="w-3.5 h-3.5"></i> Admin Active
                        </span>
                        <button onclick="toggleManageModal()" class="bg-red-500 text-white px-4 py-1.5 rounded-lg text-[9px] hover:bg-red-600 transition-all shadow-lg flex items-center gap-2 uppercase">
                            <i data-lucide="layout-dashboard" class="w-3.5 h-3.5"></i> Command Hub
                        </button>
                    </div>
                    <!-- Identity Controls -->
                    <div id="auth-controls" class="flex gap-6 items-center">
                        <div id="guest-links" class="flex gap-6">
                            <button onclick="openAuthModal('register')" class="hover:text-white transition-colors">Register Account</button>
                            <button onclick="openAuthModal('login')" class="text-white bg-white/10 px-4 py-1.5 rounded-lg hover:bg-white/20 border border-white/10 transition-all uppercase">Login</button>
                        </div>
                        <div id="user-profile" class="hidden items-center gap-4">
                            <span class="flex items-center gap-2 text-gray-200">
                                <div class="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                                <span id="display-username" class="uppercase">User</span>
                            </span>
                            <button onclick="handleLogout()" class="text-red-500 hover:text-red-400 uppercase">Exit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Navigation Bar -->
        <div class="container mx-auto px-6 py-6 flex flex-wrap items-center justify-between gap-6 text-xs uppercase font-black">
            <div class="flex items-center gap-6 cursor-pointer group" onclick="switchPage('home')">
                <div class="relative">
                    <div class="bg-gradient-to-br from-slate-900 to-black p-4 rounded-2xl border border-white/10 shadow-2xl group-hover:border-red-500/50 transition-all">
                        <i data-lucide="shield-alert" class="text-red-500 w-9 h-9"></i>
                    </div>
                    <div class="absolute -top-7 -left-3 -right-3 flex justify-between h-8 bg-black/90 rounded-full p-1.5 border border-white/20 z-20 shadow-2xl backdrop-blur-md">
                        <div class="w-[47%] h-full rounded-full beacon-red"></div>
                        <div class="w-[47%] h-full rounded-full beacon-blue"></div>
                    </div>
                </div>
                <div>
                    <span class="text-4xl font-black text-white tracking-tighter block leading-none">FireSafe<span class="text-red-500">.</span></span>
                    <span class="text-[10px] uppercase tracking-[0.5em] text-gray-600 font-bold italic mt-1 block">Industrial Readiness Solutions</span>
                </div>
            </div>

            <nav class="hidden lg:flex items-center gap-2 font-black uppercase tracking-widest">
                <a onclick="switchPage('home')" class="nav-link active" id="nav-home">Home</a>
                <a onclick="switchPage('guides')" class="nav-link" id="nav-guides">Safety Guides</a>
                <a onclick="switchPage('about')" class="nav-link" id="nav-about">Mission</a>
                <a onclick="switchPage('contact')" class="nav-link" id="nav-contact">Contact</a>
            </nav>

            <div class="flex items-center gap-6">
                <button onclick="toggleAIConsultant()" class="bg-blue-600/5 text-blue-400 border border-blue-500/20 px-5 py-2.5 rounded-2xl text-[10px] hover:bg-blue-500 hover:text-white transition-all flex items-center gap-3 font-black uppercase">
                    <i data-lucide="bot" class="w-4.5 h-4.5"></i> AI Analyst
                </button>
                <div class="relative cursor-pointer group flex items-center gap-4 bg-white/5 p-2.5 px-5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all" onclick="toggleCart()">
                    <div class="relative">
                        <i data-lucide="shopping-cart" class="w-6 h-6 text-gray-400 group-hover:text-red-500 transition-colors"></i>
                        <span id="cart-count" class="absolute -top-3 -right-3 bg-red-500 text-white text-[9px] font-black w-5.5 h-5.5 flex items-center justify-center rounded-full border-2 border-slate-950 shadow-lg">0</span>
                    </div>
                    <span class="text-xs font-black text-gray-400 group-hover:text-white hidden sm:block tracking-widest uppercase">Cart</span>
                </div>
            </div>
        </div>
    </header>

    <!-- Main Viewport -->
    <main id="page-container" class="container mx-auto px-6 py-10 min-h-[75vh]">
    </main>

    <!-- MODAL: IDENTITY REGISTRY -->
    <div id="auth-modal" class="fixed inset-0 z-[120] hidden items-center justify-center p-6 text-xs font-black uppercase">
        <div class="absolute inset-0 bg-black/95 backdrop-blur-3xl" onclick="closeAuthModal()"></div>
        <div class="bg-[#0a0f18] w-full max-w-md rounded-[3.5rem] p-12 border border-white/10 text-center relative z-20 shadow-2xl">
            <h2 class="text-4xl font-black text-white mb-4 tracking-tighter uppercase" id="auth-title">Identity Registry</h2>
            <p class="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-10 italic">Verify operational credentials.</p>
            <div id="auth-view-toggle" class="flex bg-black/40 p-1 rounded-2xl mb-8 border border-white/5">
                <button onclick="switchAuthMode('login')" id="btn-mode-login" class="flex-1 py-3 text-[10px] rounded-xl transition-all bg-red-500 text-white shadow-lg uppercase">Login</button>
                <button onclick="switchAuthMode('register')" id="btn-mode-register" class="flex-1 py-3 text-[10px] rounded-xl transition-all text-gray-500 hover:text-white uppercase">Register</button>
            </div>
            <form id="auth-form" onsubmit="handleAuthSubmit(event)" class="space-y-6">
                <div id="reg-fields" class="hidden space-y-6">
                    <input type="text" id="reg-name" class="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none" placeholder="Full Name">
                </div>
                <input type="email" id="auth-email" required class="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-red-500" placeholder="Identifier Email">
                <input type="password" id="auth-pass" required class="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-red-500" placeholder="Access Passkey">
                <button type="submit" id="auth-submit-btn" class="w-full bg-red-500 text-white py-5 rounded-2xl uppercase shadow-2xl">Authorize Access</button>
            </form>
        </div>
    </div>

    <!-- MODAL: ADMINISTRATOR HUB -->
    <div id="manage-modal" class="fixed inset-0 z-[150] hidden items-center justify-center p-6 text-xs font-black uppercase">
        <div class="absolute inset-0 bg-black/98 backdrop-blur-3xl" onclick="toggleManageModal()"></div>
        <div class="bg-slate-900 w-full max-w-6xl h-[90vh] rounded-[4rem] shadow-2xl relative z-10 border border-white/10 flex flex-col overflow-hidden">
            <div class="flex h-full">
                <!-- Admin Sidebar -->
                <div class="w-72 bg-black/40 border-r border-white/5 flex flex-col p-10 hidden lg:flex">
                    <div class="flex items-center gap-4 mb-12">
                        <div class="bg-red-500 p-3 rounded-2xl text-white shadow-2xl"><i data-lucide="cpu" class="w-6 h-6"></i></div>
                        <span class="text-lg font-black text-white uppercase tracking-tighter italic">Command Hub</span>
                    </div>
                    <nav class="space-y-4 flex-1">
                        <button onclick="switchAdminTab('overview')" class="admin-tab-btn active" id="tab-overview-btn"><i data-lucide="activity" class="w-5 h-5"></i> Dashboard</button>
                        <button onclick="switchAdminTab('inventory')" class="admin-tab-btn" id="tab-inventory-btn"><i data-lucide="package" class="w-5 h-5"></i> Inventory Hub</button>
                        <button onclick="switchAdminTab('categories')" class="admin-tab-btn" id="tab-categories-btn"><i data-lucide="layers" class="w-5 h-5"></i> Category Hub</button>
                        <button onclick="switchAdminTab('homepage')" class="admin-tab-btn" id="tab-homepage-btn"><i data-lucide="home" class="w-5 h-5"></i> Homepage Mgr</button>
                        <button onclick="switchAdminTab('promo')" class="admin-tab-btn" id="tab-promo-btn"><i data-lucide="percent" class="w-5 h-5"></i> Promotion Hub</button>
                        <!-- Social Hub Button -->
                        <button onclick="switchAdminTab('social')" class="admin-tab-btn" id="tab-social-btn"><i data-lucide="share-2" class="w-5 h-5"></i> Social Hub</button>
                        <button onclick="switchAdminTab('content')" class="admin-tab-btn" id="tab-content-btn"><i data-lucide="file-edit" class="w-5 h-5"></i> Content Hub</button>
                    </nav>
                </div>

                <div class="flex-1 flex flex-col bg-slate-900/50">
                    <div class="p-10 border-b border-white/5 flex justify-between items-center bg-black/30 text-white text-xl uppercase">
                        <h2>Control Center</h2>
                        <button onclick="toggleManageModal()"><i data-lucide="x" class="w-8 h-8 text-gray-500 hover:text-white transition-all"></i></button>
                    </div>
                    <div class="flex-1 overflow-y-auto p-12 custom-scrollbar">
                        
                        <!-- Dashboard -->
                        <div id="admin-sector-overview" class="admin-sector">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
                                <div class="bg-white/5 p-12 rounded-[3rem] border border-white/5">
                                    <p class="text-xs text-gray-500 mb-4 uppercase">Total Valuation</p>
                                    <p id="admin-total-val" class="text-5xl text-red-500">RM0.00</p>
                                </div>
                                <div class="bg-white/5 p-12 rounded-[3rem] border border-white/5">
                                    <p class="text-xs text-gray-500 mb-4 uppercase">Operational Units</p>
                                    <p id="admin-total-assets" class="text-5xl text-white">0</p>
                                </div>
                            </div>
                        </div>

                        <!-- Inventory Hub -->
                        <div id="admin-sector-inventory" class="admin-sector hidden space-y-8">
                            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
                                <div class="lg:col-span-4 bg-white/5 p-8 rounded-[3rem] border border-white/10">
                                    <h3 id="admin-form-title" class="text-white mb-6 border-b border-white/5 pb-4 uppercase">New Asset</h3>
                                    <form id="admin-product-form" onsubmit="handleAdminProductSubmit(event)" class="space-y-4">
                                        <input type="hidden" id="admin-edit-id">
                                        <input type="text" id="admin-p-name" required class="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white outline-none" placeholder="Product Label">
                                        
                                        <!-- Stock Input Included -->
                                        <div class="grid grid-cols-2 gap-4">
                                            <input type="number" id="admin-p-price" step="0.01" required class="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white outline-none" placeholder="RM Price">
                                            <input type="number" id="admin-p-stock" required class="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white outline-none" placeholder="Stock Qty">
                                        </div>
                                        
                                        <select id="admin-p-cat" class="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white outline-none uppercase text-[10px]"></select>
                                        
                                        <!-- KEMASKINI: Technical Specs Input -->
                                        <div class="space-y-2">
                                            <label class="text-[10px] text-gray-500 font-bold uppercase tracking-widest block">Technical Specifications (One per line)</label>
                                            <textarea id="admin-p-specs" class="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-blue-500 transition-colors text-xs font-mono h-24 resize-none" placeholder="e.g.&#10;Battery Life: 5 Years&#10;Weight: 2kg&#10;Certified: ISO 9001"></textarea>
                                        </div>

                                        <!-- KEMASKINI: Modul Imej (URL & Upload) -->
                                        <div class="space-y-3 pt-2">
                                            <label class="text-[10px] text-gray-500 font-bold uppercase tracking-widest block">Product Imagery</label>
                                            
                                            <!-- Option 1: URL -->
                                            <input type="url" id="admin-p-img" class="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white outline-none placeholder-gray-600 text-xs" placeholder="Option A: Paste Image URL">
                                            
                                            <div class="text-center text-[9px] text-gray-600 font-black uppercase">- OR -</div>

                                            <!-- Option 2: Upload File -->
                                            <div class="relative">
                                                <input type="file" id="admin-p-file" accept="image/*" class="hidden" onchange="handleFileSelect(this)">
                                                <label for="admin-p-file" class="flex items-center justify-center w-full p-4 border border-dashed border-white/10 rounded-2xl cursor-pointer bg-black/20 hover:bg-white/5 transition-all group">
                                                    <div class="flex items-center gap-3 text-gray-500 group-hover:text-white transition-colors">
                                                        <i data-lucide="upload-cloud" class="w-5 h-5"></i>
                                                        <span id="file-upload-label" class="text-[10px] font-bold uppercase tracking-widest">Option B: Upload From Device</span>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>

                                        <button type="submit" id="admin-submit-btn" class="w-full bg-red-500 text-white py-5 rounded-2xl shadow-xl uppercase mt-2">Commit Changes</button>
                                        <button type="button" onclick="resetAdminForm()" id="admin-cancel-btn" class="hidden w-full text-gray-500 mt-2 uppercase">Abort</button>
                                    </form>
                                </div>
                                <div class="lg:col-span-8 bg-black/30 rounded-[3rem] border border-white/5 overflow-hidden text-[10px]">
                                    <table class="w-full text-left uppercase tracking-widest">
                                        <thead class="text-gray-500 border-b border-white/5">
                                            <tr>
                                                <th class="p-6">Product Name</th>
                                                <th class="p-6">Stock Level</th>
                                                <th class="p-6 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody id="admin-inventory-table"></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <!-- Category Hub -->
                        <div id="admin-sector-categories" class="admin-sector hidden space-y-8">
                            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 text-[10px]">
                                <div class="lg:col-span-4 bg-white/5 p-8 rounded-[3rem] border border-white/10">
                                    <h3 id="admin-cat-form-title" class="text-white mb-8 border-b border-white/5 pb-4">Module Hub</h3>
                                    <form id="admin-category-form" onsubmit="handleAdminCategorySubmit(event)" class="space-y-6">
                                        <input type="hidden" id="admin-edit-cat-id">
                                        <input type="text" id="admin-c-name" required class="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white outline-none" placeholder="Module Name">
                                        <button type="submit" id="admin-cat-submit-btn" class="w-full bg-red-500 text-white py-5 rounded-2xl">Provision Module</button>
                                        <button type="button" onclick="resetAdminCatForm()" id="admin-cat-cancel-btn" class="hidden w-full text-gray-500 mt-2">Abort</button>
                                    </form>
                                </div>
                                <div class="lg:col-span-8 bg-black/30 rounded-[3rem] border border-white/5 overflow-hidden text-[10px]">
                                    <table class="w-full text-left">
                                        <tbody id="admin-category-table"></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <!-- Homepage Manager -->
                        <div id="admin-sector-homepage" class="admin-sector hidden space-y-12">
                            <div class="bg-white/5 p-10 rounded-[3rem] border border-white/10 text-[10px]">
                                <h3 class="text-white text-lg mb-8 border-b border-white/5 pb-4">Hero Node Editor</h3>
                                <form onsubmit="handleAdminHeroSubmit(event)" class="space-y-6">
                                    <input type="text" id="admin-hero-title" class="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white outline-none">
                                    <textarea id="admin-hero-sub" class="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white h-20 outline-none resize-none normal-case font-bold"></textarea>
                                    <button type="submit" class="bg-red-500 text-white px-8 py-4 rounded-2xl">Update Hero node</button>
                                </form>
                            </div>

                            <!-- KEMASKINI: Modul Pengurusan Susun Atur (Layout Manager) -->
                            <div class="bg-white/5 p-10 rounded-[3rem] border border-white/10 text-[10px]">
                                <div class="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                                    <h3 class="text-white text-lg">Homepage Layout Manager</h3>
                                    <span class="text-gray-500 text-[9px] uppercase tracking-widest">Reorder & Toggle Sections</span>
                                </div>
                                
                                <div id="admin-layout-editor" class="space-y-4">
                                    <!-- Layout rows will be injected here via JS -->
                                </div>

                                <button onclick="saveLayoutConfig()" class="w-full bg-blue-600 text-white px-8 py-4 rounded-2xl hover:bg-blue-500 transition-all font-bold uppercase shadow-lg mt-8">Save Layout Configuration</button>
                            </div>

                            <div class="bg-white/5 p-10 rounded-[3rem] border border-white/10">
                                <h3 class="text-white text-lg mb-4">Ad Grid Manager (3 Per Line)</h3>
                                <div id="admin-homepage-ads-grid" class="grid grid-cols-1 md:grid-cols-3 gap-6 uppercase text-[9px]"></div>
                            </div>
                        </div>

                        <!-- Promotion Hub Workspace -->
                        <div id="admin-sector-promo" class="admin-sector hidden space-y-8 uppercase text-[10px]">
                            <div class="bg-white/5 p-10 rounded-[4rem] border border-white/10">
                                <h3 class="text-white text-lg mb-8 border-b border-white/5 pb-4">Tactical Promotion Hub</h3>
                                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="admin-promo-grid">
                                    <!-- Cards with Live Price calculation injected here -->
                                </div>
                            </div>
                        </div>

                        <!-- Social Media Hub -->
                        <div id="admin-sector-social" class="admin-sector hidden space-y-12">
                            <div class="bg-white/5 p-10 rounded-[3rem] border border-white/10">
                                <h3 class="text-white uppercase mb-8 border-b border-white/5 pb-4">Social Media & E-Commerce Link Manager</h3>
                                <div class="space-y-6" id="admin-social-container">
                                    <!-- Inputs will be injected here via JS -->
                                </div>
                                <button onclick="saveSocialLinks()" class="w-full bg-blue-600 text-white py-6 rounded-3xl mt-8 font-black uppercase text-xs shadow-xl hover:bg-blue-500 transition-all">Save Social Configuration</button>
                            </div>
                        </div>

                        <!-- Content Hub -->
                        <div id="admin-sector-content" class="admin-sector hidden space-y-12">
                            <div class="bg-white/5 p-10 rounded-[3rem] border border-white/10">
                                <h3 class="text-white uppercase mb-8 border-b border-white/5 pb-4">Page Content Hub</h3>
                                <form onsubmit="handleAdminContentSubmit(event)" class="space-y-8 uppercase text-[10px]">
                                    <textarea id="admin-content-guides" class="w-full bg-black/40 border border-white/10 rounded-3xl p-6 text-white h-32 outline-none resize-none font-bold normal-case"></textarea>
                                    <textarea id="admin-content-mission" class="w-full bg-black/40 border border-white/10 rounded-3xl p-6 text-white h-32 outline-none resize-none font-bold normal-case"></textarea>
                                    <textarea id="admin-content-contact" class="w-full bg-black/40 border border-white/10 rounded-3xl p-6 text-white h-32 outline-none resize-none font-bold normal-case"></textarea>
                                    <button type="submit" class="w-full bg-red-500 text-white py-6 rounded-3xl">Sync Global Hub</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- SECURE PAYMENT GATEWAY -->
    <div id="payment-modal" class="fixed inset-0 z-[170] hidden items-center justify-center p-6 text-xs font-black uppercase tracking-widest">
        <div class="absolute inset-0 bg-black/95 backdrop-blur-3xl" onclick="togglePaymentModal()"></div>
        <div class="bg-[#0a0f18] w-full max-w-3xl max-h-[90vh] rounded-[4rem] shadow-2xl relative z-10 border border-white/10 flex flex-col overflow-hidden">
            <div class="p-10 border-b border-white/5 flex justify-between items-center bg-black/30 text-white text-xl">
                <h2 class="flex items-center gap-4"><i data-lucide="shield-check" class="w-6 h-6 text-red-500"></i> Tactical Settlement</h2>
                <button onclick="togglePaymentModal()"><i data-lucide="x" class="w-8 h-8 text-gray-500 hover:text-white transition-all"></i></button>
            </div>
            <div id="payment-gateway-container" class="flex-1 overflow-y-auto p-12 custom-scrollbar space-y-10">
                <!-- Injeksi JS -->
            </div>
        </div>
    </div>

    <!-- PRODUCT DETAIL -->
    <div id="product-detail-modal" class="fixed inset-0 z-[160] hidden items-center justify-center p-6 text-xs uppercase font-black">
        <div class="absolute inset-0 bg-black/95 backdrop-blur-3xl" onclick="closeProductDetail()"></div>
        <div class="bg-[#0a0f18] w-full max-w-6xl max-h-[95vh] rounded-[4rem] shadow-2xl relative z-10 border border-white/10 overflow-hidden flex flex-col lg:flex-row">
            <button onclick="closeProductDetail()" class="absolute top-8 right-8 w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white z-30 hover:bg-red-500 transition-all shadow-xl"><i data-lucide="x" class="w-7 h-7"></i></button>
            <div class="w-full lg:w-3/5 bg-black/60 p-10 flex flex-col">
                <div class="aspect-square rounded-[3rem] overflow-hidden mb-8 border border-white/10 shadow-inner bg-slate-900 relative">
                    <img id="detail-main-img" src="" class="w-full h-full object-cover">
                    <div class="scan-line"></div>
                </div>
            </div>
            <div class="w-full lg:w-2/5 p-12 overflow-y-auto custom-scrollbar flex flex-col bg-[#0d121f]">
                <div class="mb-10 text-xs font-black uppercase tracking-widest">
                    <span id="detail-cat" class="text-[10px] text-red-500 uppercase tracking-[0.5em] mb-4 block">CATEGORY</span>
                    <h2 id="detail-name" class="text-4xl text-white uppercase tracking-tighter mb-6 leading-none">PRODUCT</h2>
                    <p id="detail-desc" class="text-gray-400 text-sm leading-relaxed font-bold mb-8 border-l-2 border-red-500 pl-6 normal-case"></p>
                    <div class="text-5xl text-white tracking-tighter" id="detail-price">RM0.00</div>
                </div>
                <div class="space-y-8 flex-1">
                    <h4 class="text-[11px] text-white uppercase tracking-[0.3em] border-b border-white/10 pb-4 flex items-center gap-3"><i data-lucide="file-text" class="w-4 h-4 text-red-500"></i> Technical Specifications</h4>
                    <ul id="detail-spec-list" class="grid grid-cols-1 gap-4 text-[10px] font-bold text-gray-500 uppercase"></ul>
                </div>
                <div class="mt-12 pt-10 border-t border-white/5 flex flex-col sm:flex-row gap-6">
                    <button id="detail-add-btn" class="flex-1 bg-white/5 border border-white/10 text-white py-6 rounded-3xl uppercase text-xs hover:bg-white/20 transition-all">Add to Cart</button>
                    <button id="detail-buy-btn" class="flex-1 bg-red-500 text-white py-6 rounded-3xl uppercase text-xs shadow-2xl shadow-red-500/30 hover:bg-red-600 transition-all">Buy Now</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Side Cart -->
    <div id="cart-panel" class="fixed top-0 right-0 h-full w-full md:w-[480px] z-[70] cart-hidden flex flex-col shadow-2xl bg-[#05080f] border-l border-white/10 font-black uppercase">
        <div class="p-10 border-b border-white/5 flex items-center justify-between bg-black/40 text-white"><h2>Deployment Cart</h2><button onclick="toggleCart()"><i data-lucide="x" class="w-8 h-8"></i></button></div>
        <div id="cart-items-container" class="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar bg-slate-950/30 text-[10px]"></div>
        <div id="cart-footer" class="p-10 border-t border-white/5 hidden bg-black/60 text-xs">
            <div class="flex justify-between items-center mb-8 text-white tracking-widest"><span>TOTAL VALUATION</span><span id="cart-total" class="text-2xl text-red-500 tracking-tighter">RM0.00</span></div>
            <button onclick="authorizeSettlement()" class="w-full bg-red-500 text-white py-6 rounded-3xl shadow-2xl uppercase">Authorize Settlement</button>
        </div>
    </div>
    <div id="cart-overlay" class="fixed inset-0 bg-black/95 z-[60] hidden opacity-0 transition-opacity" onclick="toggleCart()"></div>

    <!-- Footer -->
    <footer class="bg-black/60 border-t border-white/5 py-20 mt-24">
        <div class="container mx-auto px-6 text-center font-black uppercase text-xs tracking-widest">
            <span class="text-3xl text-white tracking-tighter">FireSafe<span class="text-red-500">.</span></span>
            <p class="text-gray-500 mt-6 leading-relaxed">Lot 102, Enstek Industrial Hub, Negeri Sembilan, 71760, Malaysia</p>
        </div>
    </footer>

    <!-- Scripts -->
    <script>
        // --- GLOBAL FUNCTIONS EXPLICITLY BOUND TO WINDOW ---
        window.showToast = function(msg) {
            const t = document.getElementById('toast');
            if (t) {
                t.innerText = msg; t.style.opacity = '1'; t.style.bottom = '50px';
                setTimeout(() => { t.style.opacity = '0'; t.style.bottom = '20px'; }, 3000);
            }
        };

        window.toggleCart = function() {
            const cp = document.getElementById('cart-panel'), co = document.getElementById('cart-overlay');
            if(cp && co) { cp.classList.toggle('cart-hidden'); co.classList.toggle('hidden'); setTimeout(() => co.classList.toggle('opacity-100'), 10); }
        };

        window.openAuthModal = function(mode = 'login') { 
            const modal = document.getElementById('auth-modal');
            if (modal) { modal.classList.remove('hidden'); modal.classList.add('flex'); switchAuthMode(mode); }
        };

        window.closeAuthModal = function() { const m = document.getElementById('auth-modal'); if(m) m.classList.add('hidden'); };

        window.toggleManageModal = function() { 
            const m = document.getElementById('manage-modal');
            if(m) { m.classList.toggle('hidden'); m.classList.toggle('flex'); if(m.classList.contains('flex')) switchAdminTab('overview'); }
        };

        window.togglePaymentModal = function() {
            const m = document.getElementById('payment-modal');
            if(m) { m.classList.toggle('hidden'); m.classList.toggle('flex'); renderPaymentGateway(); lucide.createIcons(); }
        };

        // --- DATA REGISTRY ---
        let pageContents = {
            heroTitle: "Prepared Today. Protected Tomorrow.",
            heroSub: "Professional Industry Readiness Solutions with zero-failure technology.",
            guides: "Tactical Safety Guides: Ensure fire extinguishing devices are inspected every 6 months. Use suppression blankets for kitchen or EV battery fires. Always identify emergency exits in your node.",
            mission: "Our Mission: Providing a zero-failure safety ecosystem through industrial innovation. We believe readiness today determines protection tomorrow.",
            contact: "FireSafe HQ Node\nLot 102, Enstek Industrial Hub,\nNegeri Sembilan, 71760, Malaysia\n\nOperational Link: +60 123 456 789\nSecure Mail: hq@firesafe.global"
        };

        // KEMASKINI: Data Pautan Sosial & E-Dagang
        let socialLinks = [
            { id: 'shopee', name: 'Shopee', url: '#', icon: 'shopping-bag', color: 'bg-orange-500' },
            { id: 'lazada', name: 'Lazada', url: '#', icon: 'shopping-bag', color: 'bg-blue-600' },
            { id: 'temu', name: 'Temu', url: '#', icon: 'shopping-bag', color: 'bg-orange-600' },
            { id: 'tiktok', name: 'TikTok Shop', url: '#', icon: 'video', color: 'bg-black' },
            { id: 'facebook', name: 'Facebook', url: '#', icon: 'facebook', color: 'bg-blue-800' }
        ];

        const paymentMethods = [
            { id: 'fpx', name: 'FPX Online', icon: 'landmark', color: 'from-blue-600 to-blue-900', desc: 'Secure bank transfer.' },
            { id: 'duitnow', name: 'DuitNow', icon: 'send', color: 'from-green-500 to-emerald-800', desc: 'Instant ID transfer.' },
            { id: 'qr', name: 'QR Pay', icon: 'qr-code', color: 'from-pink-500 to-rose-800', desc: 'Scan bank apps.' },
            { id: 'ewallet', name: 'E-Wallets', icon: 'wallet', color: 'from-indigo-500 to-purple-800', desc: 'TNG, Grab, Boost.' },
            { id: 'cards', name: 'Cards', icon: 'credit-card', color: 'from-amber-500 to-orange-800', desc: 'Visa & Mastercard.' },
            { id: 'bnpl', name: 'BNPL', icon: 'calendar', color: 'from-teal-500 to-cyan-800', desc: 'Pay in instalments.' },
            { id: 'cod', name: 'Cash / COD', icon: 'truck', color: 'from-slate-600 to-slate-900', desc: 'Pay on delivery.' }
        ];

        // DEFAULT DATA
        const defaultProducts = [
            { id: 1, name: "Lithium EV Suppression Blanket", price: 1850.00, image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800", cat: "EV Kit", featured: true, discount: 15, stock: 45, specs: ["Thermal Resistance: 2000°C", "Size: 6m x 8m", "Weight: 25kg"] },
            { id: 2, name: "Home Safety Tactical Bundle", price: 340.00, image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800", cat: "Home Kit", featured: true, discount: 0, stock: 120, specs: ["1kg Dry Powder Extinguisher", "Smoke Detector (x2)", "Fire Blanket 1.2m"] },
            { id: 3, name: "Smart WiFi Gas Analyzer", price: 195.00, image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800", cat: "Gas Detector", featured: true, discount: 10, stock: 85, specs: ["WiFi Connection", "App Alert System", "Detects LPG & Natural Gas"] },
            { id: 4, name: "MKAA Industrial PFD Unit", price: 420.00, image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&q=80&w=800", cat: "MKAA Kit", featured: false, discount: 0, stock: 30, specs: ["ISO 12402-4 Certified", "Reflective Tape", "Whistle Included"] },
            { id: 5, name: "Static Rappelling Rope (11mm)", price: 950.00, image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&q=80&w=800", cat: "Ropes", featured: false, discount: 20, stock: 60, specs: ["Diameter: 11mm", "Length: 100m", "Breaking Strength: 32kN"] },
            { id: 6, name: "Professional AED Module", price: 6800.00, image: "https://images.unsplash.com/photo-1516515429572-1b12b5f903e6?auto=format&fit=crop&q=80&w=800", cat: "Life Support", featured: false, discount: 5, stock: 12, specs: ["Fully Automatic", "Voice Prompts", "5-Year Battery Life"] },
            { id: 7, name: "Field Athlete Trauma Station", price: 290.00, image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=800", cat: "Athlete Kit", featured: false, discount: 0, stock: 200, specs: ["Ice Packs", "Elastic Bandages", "Antiseptic Spray"] },
            { id: 8, name: "Hiking Survival Deep-Field Kit", price: 165.00, image: "https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?auto=format&fit=crop&q=80&w=800", cat: "Hiking Kit", featured: false, discount: 0, stock: 150, specs: ["Compass", "Multi-tool", "Emergency Foil Blanket"] },
            { id: 9, name: "Urban Flood Barrier (5m)", price: 820.00, image: "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&q=80&w=800", cat: "Flood Kit", featured: false, discount: 15, stock: 25, specs: ["Length: 5m", "Height: 0.5m", "Rapid Deployment"] },
            { id: 10, name: "Tactical Ops Manual", price: 55.00, image: "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=800", cat: "E-Book", featured: false, discount: 0, stock: 999, specs: ["PDF Format", "200 Pages", "Illustrated Guides"] },
            { id: 11, name: "72-Hour Ration MRE Pack", price: 125.00, image: "https://images.unsplash.com/photo-1584263343923-d4855339c2ce?auto=format&fit=crop&q=80&w=800", cat: "Survival Food", featured: false, discount: 0, stock: 500, specs: ["3000 Calories/Day", "Self-Heating", "5-Year Shelf Life"] },
            { id: 12, name: "Expert Fire Safety Training", price: 1500.00, image: "https://images.unsplash.com/photo-1593115057321-44222097767d?auto=format&fit=crop&q=80&w=800", cat: "Tech Support", featured: false, discount: 0, stock: 5, specs: ["On-Site Training", "Certification Included", "Max 20 Participants"] }
        ];

        const defaultCategories = [
            { id: 1, name: "EV Kit", icon: "zap", color: "bg-orange-500/10" }, 
            { id: 2, name: "Home Kit", icon: "home", color: "bg-blue-500/10" }, 
            { id: 3, name: "Gas Detector", icon: "radar", color: "bg-red-500/10" },
            { id: 4, name: "MKAA Kit", icon: "anchor", color: "bg-cyan-500/10" },
            { id: 5, name: "Ropes", icon: "git-commit", color: "bg-slate-500/10" },
            { id: 6, name: "Life Support", icon: "heart-pulse", color: "bg-pink-500/10" },
            { id: 7, name: "Athlete Kit", icon: "award", color: "bg-green-500/10" },
            { id: 8, name: "Hiking Kit", icon: "mountain", color: "bg-emerald-500/10" },
            { id: 9, name: "Flood Kit", icon: "waves", color: "bg-blue-600/10" },
            { id: 10, name: "E-Book", icon: "book-open", color: "bg-purple-500/10" },
            { id: 11, name: "Survival Food", icon: "utensils-cross-side", color: "bg-amber-500/10" },
            { id: 12, name: "Tech Support", icon: "shield-check", color: "bg-indigo-500/10" }
        ];

        // KEMASKINI: Default Layout Configuration (Order & Visibility)
        const defaultLayoutConfig = [
            { id: 'promo', title: "Tactical Deals", visible: true, label: "Promotions" },
            { id: 'categories', title: "Asset Modules", visible: true, label: "Categories" },
            { id: 'featured', title: "Priority Dispatch", visible: true, label: "Featured" },
            { id: 'inventory', title: "Full Inventory Index", visible: true, label: "Inventory" },
            { id: 'social', title: "Digital Network & Official Stores", visible: true, label: "Social Media" },
            { id: 'payment', title: "Payment Ecosystem", visible: true, label: "Payments" }
        ];

        // LOAD FROM LOCAL STORAGE (OFFLINE CAPABILITY)
        let products = JSON.parse(localStorage.getItem('firesafe_products')) || defaultProducts;
        let categories = JSON.parse(localStorage.getItem('firesafe_categories')) || defaultCategories;
        // Load layout config
        let layoutConfig = JSON.parse(localStorage.getItem('firesafe_layout_config')) || defaultLayoutConfig;

        let cart = [], currentUser = null, currentRole = 'public', authMode = 'login', currentCategoryFilter = 'All';

        // --- HELPER: SAVE TO LOCAL STORAGE ---
        function saveData() {
            localStorage.setItem('firesafe_products', JSON.stringify(products));
            localStorage.setItem('firesafe_categories', JSON.stringify(categories));
            localStorage.setItem('firesafe_layout_config', JSON.stringify(layoutConfig));
        }

        // --- ACCOUNT HANDLERS ---
        window.switchAuthMode = function(mode) {
            authMode = mode;
            const lb = document.getElementById('btn-mode-login'), rb = document.getElementById('btn-mode-register'), rf = document.getElementById('reg-fields'), sb = document.getElementById('auth-submit-btn');
            if(lb) lb.className = mode === 'login' ? 'flex-1 py-3 text-[10px] rounded-xl bg-red-500 text-white shadow-lg font-black uppercase' : 'flex-1 py-3 text-[10px] rounded-xl text-gray-500';
            if(rb) rb.className = mode === 'register' ? 'flex-1 py-3 text-[10px] rounded-xl bg-red-500 text-white shadow-lg font-black uppercase' : 'flex-1 py-3 text-[10px] rounded-xl text-gray-500';
            if(rf) rf.classList.toggle('hidden', mode !== 'register');
            if(sb) sb.innerText = mode === 'login' ? "Authorize Access" : "Provision Identity";
        };

        window.handleAuthSubmit = function(e) {
            e.preventDefault();
            const email = document.getElementById('auth-email').value;
            currentUser = { name: email.split('@')[0], email };
            currentRole = email.toLowerCase().includes('admin') ? 'admin' : 'public';
            if(document.getElementById('admin-controls')) document.getElementById('admin-controls').classList.toggle('hidden', currentRole !== 'admin');
            updateAuthUI(); closeAuthModal(); showToast("Identity Verified");
        };

        window.handleLogout = function() { currentUser = null; if(document.getElementById('admin-controls')) document.getElementById('admin-controls').classList.add('hidden'); updateAuthUI(); switchPage('home'); };

        function updateAuthUI() { 
            const gl = document.getElementById('guest-links'), up = document.getElementById('user-profile'), dn = document.getElementById('display-username'), sl = document.getElementById('status-label'); 
            if (currentUser) { if(gl) gl.classList.add('hidden'); if(up) { up.classList.remove('hidden'); up.classList.add('flex'); } if(dn) dn.textContent = currentUser.name; if(sl) sl.innerText = currentRole === 'admin' ? "SYSTEM ADMINISTRATOR" : "VERIFIED MEMBER"; } 
            else { if(gl) gl.classList.remove('hidden'); if(up) up.classList.add('hidden'); if(sl) sl.innerText = "PUBLIC ACCESS"; } 
        }

        // --- CATEGORY FILTER ENGINE ---
        window.filterByCategory = function(catName) {
            currentCategoryFilter = catName;
            renderCategorizedProducts();
            const el = document.getElementById('categorized-inventory');
            if(el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            showToast(`Filtering: ${catName}`);
        };

        window.resetCategoryFilter = function() {
            currentCategoryFilter = 'All';
            renderCategorizedProducts();
        };

        // --- HOMEPAGE RENDERING ENGINE (DYNAMIC SECTIONS) ---
        
        // Helper untuk menjana HTML bagi setiap seksyen
        function getSectionHTML(sectionId, title) {
            switch(sectionId) {
                case 'promo':
                    return `
                    <section class="mb-24 px-6 lg:px-12 py-20 bg-gradient-to-br from-red-950/30 to-black/40 rounded-[5rem] border border-red-500/10 font-black uppercase tracking-widest">
                        <div class="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
                            <div>
                                <div class="flex items-center gap-3 text-red-500 mb-3"><i data-lucide="zap" class="w-6 h-6 fill-current"></i> <span class="text-[10px] font-black tracking-[0.4em]">Operational Status: ACTIVE</span></div>
                                <h2 class="text-6xl text-white font-black italic tracking-tighter uppercase">${title}</h2>
                            </div>
                            <div class="bg-red-500 text-white px-10 py-5 rounded-full shadow-[0_0_30px_rgba(239,68,68,0.4)] animate-pulse">
                                Emergency Flash Sale
                            </div>
                        </div>
                        <div id="promo-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"></div>
                    </section>`;
                
                case 'categories':
                    return `<section class="mb-24 font-black uppercase tracking-widest"><div class="section-subtitle mb-8 flex items-center gap-2 text-red-500"><i data-lucide="layout-grid" class="w-4 h-4"></i> ${title}</div><div id="category-grid" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 text-center"></div></section>`;
                
                case 'featured':
                    return `<section class="mb-24 font-black uppercase tracking-widest"><div class="section-subtitle mb-8 flex items-center gap-2 text-red-500"><i data-lucide="star" class="w-4 h-4"></i> ${title}</div><div id="advertised-grid" class="grid grid-cols-1 md:grid-cols-3 gap-10"></div></section>`;
                
                case 'inventory':
                    return `<section id="categorized-inventory" class="space-y-32 mb-24 font-black uppercase tracking-widest"></section>`;
                
                case 'social':
                    return `
                    <section class="mb-24 font-black uppercase tracking-widest">
                        <div class="section-subtitle mb-8 flex items-center gap-2 text-red-500"><i data-lucide="globe" class="w-4 h-4"></i> ${title}</div>
                        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            ${socialLinks.map(s => `
                                <a href="${s.url}" target="_blank" class="social-card group">
                                    <div class="w-12 h-12 ${s.color} rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                        <i data-lucide="${s.icon}" class="w-6 h-6 text-white"></i>
                                    </div>
                                    <span class="text-[10px] text-white tracking-widest font-black">${s.name}</span>
                                    <span class="text-[8px] text-gray-500 normal-case group-hover:text-red-500 transition-colors">Visit Now</span>
                                </a>
                            `).join('')}
                        </div>
                    </section>`;
                
                case 'payment':
                    return `
                    <section class="mb-24 py-24 bg-slate-900/30 rounded-[5rem] border border-white/5 font-black uppercase text-center tracking-widest overflow-hidden relative">
                        <div class="mb-16">
                            <div class="section-subtitle justify-center flex items-center gap-2 text-red-500 mb-4"><i data-lucide="shield-check" class="w-4 h-4"></i> Secure Protocols</div>
                            <h2 class="section-title text-4xl text-white tracking-tighter">${title}</h2>
                        </div>
                        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8 px-10 items-stretch">
                            ${paymentMethods.map(m => `
                                <div class="payment-card-3d group">
                                    <div class="payment-icon-container bg-gradient-to-br ${m.color}">
                                        <i data-lucide="${m.icon}" class="w-8 h-8 text-white"></i>
                                    </div>
                                    <span class="payment-label">${m.name}</span>
                                </div>
                            `).join('')}
                        </div>
                    </section>`;
                default: return '';
            }
        }

        window.switchPage = function(pageId) {
            const container = document.getElementById('page-container');
            if (!container) return;
            document.querySelectorAll('.nav-link').forEach(l => l.classList.toggle('active', l.id === `nav-${pageId}`));
            
            if (pageId === 'home') {
                // 1. Render Hero (Fixed)
                let homeHTML = `
                    <section class="relative -mx-6 -mt-10 mb-24 h-[550px] rounded-b-[5rem] overflow-hidden group font-black uppercase tracking-widest">
                        <div class="absolute inset-0 hero-fire-bg transition-transform duration-[3s] group-hover:scale-105"></div>
                        <div class="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
                        <div class="relative z-10 h-full flex flex-col justify-center px-12 max-w-5xl">
                            <h1 class="text-6xl lg:text-8xl tracking-tighter leading-[0.9] mb-6 slogan-gradient italic font-black uppercase">${pageContents.heroTitle}</h1>
                            <div class="flex h-6 w-full max-w-2xl bg-black/60 rounded-full p-1 border border-white/10 shadow-2xl mb-10 relative overflow-hidden">
                                <div class="w-1/2 h-full rounded-l-full beacon-red"></div><div class="w-1/2 h-full rounded-r-full beacon-blue"></div>
                            </div>
                            <p class="text-gray-300 text-sm tracking-widest max-w-xl border-l-2 border-white/20 pl-6 font-black uppercase">${pageContents.heroSub}</p>
                        </div>
                        <div class="scan-line"></div>
                    </section>
                `;

                // 2. Render Dynamic Sections based on layoutConfig order & visibility
                layoutConfig.forEach(section => {
                    if (section.visible) {
                        homeHTML += getSectionHTML(section.id, section.title);
                    }
                });

                container.innerHTML = homeHTML;
                
                // 3. Initialize components after rendering
                renderAll();
            } else if (['guides', 'about', 'contact'].includes(pageId)) {
                const titleMap = { guides: "Safety Guides", about: "Our Mission", contact: "Contact HQ" };
                const contentKey = pageId === 'about' ? 'mission' : pageId;
                container.innerHTML = `
                    <div class="py-20 max-w-4xl mx-auto font-black uppercase">
                        <div class="section-subtitle mb-8 flex items-center gap-2 text-red-500"><i data-lucide="file-text" class="w-4 h-4"></i> Documentation Node</div>
                        <h2 class="text-6xl text-white tracking-tighter mb-12 italic">${titleMap[pageId]}</h2>
                        <div class="bg-white/5 border border-white/10 p-12 rounded-[4rem] shadow-2xl relative overflow-hidden">
                            <p class="text-gray-300 text-lg leading-relaxed normal-case font-bold whitespace-pre-line">${pageContents[contentKey]}</p>
                        </div>
                    </div>
                `;
            }
            lucide.createIcons();
        };

        function renderAll() { 
            const promos = products.filter(p => (p.discount || 0) > 0);
            const pg = document.getElementById('promo-grid');
            // Check if element exists before rendering (because section might be hidden)
            if(pg) pg.innerHTML = promos.length ? promos.map(p => generateProductCard(p)).join('') : '<p class="col-span-3 text-center py-20 italic opacity-20">No Active Deployments Found</p>';
            renderAdvertised(); renderCategories(); renderCategorizedProducts(); 
        }

        function renderCategorizedProducts() {
            const container = document.getElementById('categorized-inventory');
            if(!container) return; // Exit if section is hidden
            
            let displayProducts = products;
            // Find current title from config for inventory
            const inventoryConfig = layoutConfig.find(s => s.id === 'inventory');
            let title = inventoryConfig ? inventoryConfig.title : "Full Inventory Index"; 

            if (currentCategoryFilter !== 'All') {
                displayProducts = products.filter(p => p.cat === currentCategoryFilter);
                title = `${currentCategoryFilter} Sector`;
            }

            const html = `
                <div class="category-block">
                    <div class="category-separator mb-8 flex items-center justify-between gap-4 text-white text-2xl tracking-tighter">
                        <div class="flex items-center gap-4 w-full">
                            <h3 class="text-red-500 whitespace-nowrap">${title}</h3>
                            <div class="h-px bg-white/10 flex-1"></div>
                        </div>
                        ${currentCategoryFilter !== 'All' ? `<button onclick="resetCategoryFilter()" class="text-xs bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-all uppercase font-black tracking-wider whitespace-nowrap">View All</button>` : ''}
                    </div>
                    ${displayProducts.length > 0 ? 
                        `<div class="grid grid-cols-1 md:grid-cols-3 gap-10">
                            ${displayProducts.map(p => generateProductCard(p)).join('')}
                        </div>` : 
                        `<div class="text-center py-20 opacity-30 italic uppercase font-black">No assets found in this sector.</div>`
                    }
                </div>
            `;
            
            container.innerHTML = html;
            lucide.createIcons();
        }

        function generateProductCard(p) {
            const d = p.discount || 0, fp = d > 0 ? p.price * (1 - d/100) : p.price;
            const isPromo = d > 0;
            return `
                <div class="product-card p-6 rounded-[3rem] group border border-white/5 overflow-hidden cursor-pointer flex flex-col h-full shadow-lg transition-all ${isPromo ? 'promo-card-highlight' : ''}" onclick="openProductDetail(${p.id})">
                    <div class="aspect-video overflow-hidden rounded-[2rem] mb-6 relative bg-slate-900 border border-white/5">
                        <img src="${p.image}" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700">
                        ${d > 0 ? `
                            <div class="absolute top-4 right-4 bg-yellow-400 text-black p-3 rounded-xl shadow-[0_0_20px_rgba(250,204,21,0.5)] animate-pulse flex flex-col items-center justify-center leading-none z-10">
                                <span class="text-[8px] font-black tracking-widest uppercase mb-0.5">SAVE</span>
                                <span class="text-lg font-black tracking-tighter blink-urgent">${d}%</span>
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="flex justify-between items-center mb-3 uppercase text-[9px] tracking-widest">
                        <span class="text-red-500 font-bold bg-red-500/10 px-3 py-1 rounded-lg border border-red-500/20">${p.cat}</span>
                        <div class="w-2 h-2 rounded-full ${p.featured ? 'bg-red-500 animate-pulse shadow-[0_0_10px_red]' : 'bg-white/10'}"></div>
                    </div>

                    <h4 class="text-xl font-black text-white uppercase truncate mb-6 tracking-tight group-hover:text-red-500 transition-colors">${p.name}</h4>
                    
                    <div class="mt-auto flex flex-col gap-4 font-black uppercase">
                        <!-- Enhanced Price Section -->
                        <div class="bg-black/40 p-4 rounded-2xl border border-white/5 relative overflow-hidden group-hover:border-white/10 transition-colors">
                             ${d > 0 ? `<div class="absolute top-0 right-0 bg-red-600 text-white text-[8px] px-2 py-1 rounded-bl-lg font-bold tracking-widest blink-urgent">LIMITED DEAL</div>` : ''}
                             <div class="flex flex-col">
                                ${d > 0 ? `<span class="text-[9px] text-gray-500 line-through decoration-red-500 decoration-2 mb-1">RM${p.price.toFixed(2)}</span>` : ''}
                                <div class="flex items-center gap-2">
                                    <span class="text-3xl ${d > 0 ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]' : 'text-white'} font-black tracking-tighter">RM${fp.toFixed(2)}</span>
                                    ${d > 0 ? `<div class="bg-orange-500/20 p-1 rounded-md border border-orange-500/50 shadow-[0_0_10px_rgba(249,115,22,0.3)]"><i data-lucide="star" class="w-4 h-4 text-yellow-400 fill-orange-500"></i></div>` : ''}
                                </div>
                            </div>
                        </div>

                        <div class="flex gap-3 w-full">
                            <button onclick="event.stopPropagation(); addToCart(${p.id})" class="flex-1 bg-white/5 border border-white/10 text-gray-300 py-3.5 rounded-xl text-[10px] hover:bg-white/20 hover:text-white transition-all font-bold tracking-wider">Add</button>
                            <button onclick="event.stopPropagation(); buyNow(${p.id})" class="flex-1 bg-red-600 text-white py-3.5 rounded-xl text-[10px] hover:bg-red-500 transition-all shadow-lg hover:shadow-red-500/40 font-bold tracking-wider">Buy Now</button>
                        </div>
                    </div>
                </div>
            `;
        }

        function renderAdvertised() { const c = document.getElementById('advertised-grid'); if(c) { const f = products.filter(p => p.featured); c.innerHTML = f.length ? f.map(p => generateProductCard(p)).join('') : '<p class="col-span-3 text-center py-20 italic opacity-20">No Priority Assets Configured</p>'; } }
        function renderCategories() { 
            const c = document.getElementById('category-grid'); 
            if(c) c.innerHTML = categories.map(cat => `
                <div class="product-card p-8 flex flex-col items-center justify-center text-center cursor-pointer rounded-[2.5rem] group transition-all font-black uppercase" onclick="filterByCategory('${cat.name}')">
                    <div class="w-16 h-16 ${cat.color} rounded-3xl flex items-center justify-center mb-5 group-hover:scale-110 shadow-2xl transition-transform duration-300">
                        <i data-lucide="${cat.icon}" class="w-7 h-7 text-gray-300 group-hover:text-white transition-colors"></i>
                    </div>
                    <span class="text-[11px] text-gray-500 group-hover:text-red-500 transition-colors duration-300">${cat.name}</span>
                </div>
            `).join(''); 
            lucide.createIcons(); 
        }
        function scrollToCategory(id) { const el = document.getElementById(id); if(el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }

        // --- ADMINISTRATIVE ENGINE ---
        window.switchAdminTab = function(t) { 
            const sectors = ['overview', 'inventory', 'categories', 'homepage', 'promo', 'social', 'content'];
            sectors.forEach(s => {
                const el = document.getElementById(`admin-sector-${s}`); if(el) el.classList.toggle('hidden', t !== s);
                const btn = document.getElementById(`tab-${s}-btn`); if(btn) btn.classList.toggle('active', t === s);
            });
            if(t === 'overview') updateAdminOverview(); if(t === 'inventory') updateAdminInventory(); if(t === 'categories') updateAdminCategories(); if(t === 'homepage') updateAdminHomepage(); if(t === 'promo') updateAdminPromo(); if(t === 'content') updateAdminContent();
            if(t === 'social') updateAdminSocial();
        };

        function updateAdminOverview() { document.getElementById('admin-total-val').innerText = `RM${products.reduce((s, p) => s + p.price, 0).toLocaleString()}`; document.getElementById('admin-total-assets').innerText = products.length; }
        
        function updateAdminInventory() { 
            const target = document.getElementById('admin-inventory-table'); if(!target) return;
            const catSelect = document.getElementById('admin-p-cat'); if(catSelect) catSelect.innerHTML = categories.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
            
            // Stock Level Display with Pulse Animation for Low Stock (<20)
            target.innerHTML = products.map(p => `
                <tr class="border-b border-white/5 text-gray-400 font-black uppercase text-[8px] hover:bg-white/5 transition-colors">
                    <td class="p-6">
                        <div class="flex items-center gap-3">
                            <div class="w-2 h-2 rounded-full ${p.stock < 20 ? 'bg-red-500 animate-pulse' : 'bg-green-500'}"></div>
                            ${p.name}
                        </div>
                    </td>
                    <td class="p-6">
                        <span class="${p.stock < 20 ? 'text-red-500' : 'text-white'} font-bold">${p.stock} Units</span>
                    </td>
                    <td class="p-6 text-right space-x-4">
                        <button onclick="editAdminProduct(${p.id})" class="text-blue-500 mr-3 hover:text-white transition-colors">Edit</button>
                        <button onclick="deleteAdminProduct(${p.id})" class="text-red-500 hover:text-white transition-colors">Delete</button>
                    </td>
                </tr>
            `).join(''); 
            lucide.createIcons(); 
        }

        function updateAdminCategories() { const target = document.getElementById('admin-category-table'); if(target) target.innerHTML = categories.map(c => `<tr class="border-b border-white/5 text-gray-400 uppercase font-black text-[8px]"><td class="p-6">${c.name}</td><td class="p-6 text-right space-x-4"><button onclick="editAdminCategory(${c.id})" class="text-blue-500 mr-3">Edit</button><button onclick="deleteAdminCategory(${c.id})" class="text-red-500">Delete</button></td></tr>`).join(''); lucide.createIcons(); }
        
        function updateAdminHomepage() { 
            // Hero Content
            document.getElementById('admin-hero-title').value = pageContents.heroTitle; 
            document.getElementById('admin-hero-sub').value = pageContents.heroSub; 
            
            // KEMASKINI: Render Layout Manager (Reorder/Toggle/Rename)
            const layoutContainer = document.getElementById('admin-layout-editor');
            if(layoutContainer) {
                layoutContainer.innerHTML = layoutConfig.map((section, index) => `
                    <div class="bg-black/40 border border-white/10 p-4 rounded-2xl flex flex-col md:flex-row items-center gap-4 group">
                        <div class="flex items-center gap-2 text-gray-500">
                            <span class="bg-white/5 w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold">${index + 1}</span>
                        </div>
                        
                        <div class="flex-1 w-full">
                            <label class="text-[8px] uppercase font-bold text-gray-600 block mb-1">${section.label} Title</label>
                            <input type="text" value="${section.title}" onchange="updateSectionTitle(${index}, this.value)" class="w-full bg-transparent border-b border-white/10 text-white text-sm font-bold pb-1 outline-none focus:border-blue-500 transition-colors">
                        </div>

                        <div class="flex items-center gap-2">
                            <!-- Toggle Visibility -->
                            <button onclick="toggleSectionVisibility(${index})" class="w-10 h-10 rounded-xl flex items-center justify-center transition-all ${section.visible ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}">
                                <i data-lucide="${section.visible ? 'eye' : 'eye-off'}" class="w-5 h-5"></i>
                            </button>

                            <!-- Reorder Buttons -->
                            <div class="flex flex-col gap-1">
                                <button onclick="moveSection(${index}, -1)" class="w-8 h-4 bg-white/5 hover:bg-white/20 rounded-md flex items-center justify-center ${index === 0 ? 'opacity-30 pointer-events-none' : ''}">
                                    <i data-lucide="chevron-up" class="w-3 h-3"></i>
                                </button>
                                <button onclick="moveSection(${index}, 1)" class="w-8 h-4 bg-white/5 hover:bg-white/20 rounded-md flex items-center justify-center ${index === layoutConfig.length - 1 ? 'opacity-30 pointer-events-none' : ''}">
                                    <i data-lucide="chevron-down" class="w-3 h-3"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('');
                lucide.createIcons();
            }

            const g = document.getElementById('admin-homepage-ads-grid'); if(g) { g.innerHTML = products.map(p => `<div class="bg-white/5 p-5 rounded-3xl border border-white/10 flex items-center justify-between"><div class="flex items-center gap-3"><img src="${p.image}" class="w-8 h-8 rounded-lg object-cover"><div><p class="text-[10px]">${p.name}</p></div></div><button onclick="toggleAdStatus(${p.id})" class="p-2 rounded-xl ${p.featured ? 'bg-red-500 text-white' : 'bg-white/5 text-gray-500'}"><i data-lucide="${p.featured ? 'eye' : 'eye-off'}" class="w-4 h-4"></i></button></div>`).join(''); lucide.createIcons(); } 
        }
        
        // KEMASKINI: Layout Management Logic
        window.updateSectionTitle = function(index, newTitle) {
            layoutConfig[index].title = newTitle;
        };

        window.toggleSectionVisibility = function(index) {
            layoutConfig[index].visible = !layoutConfig[index].visible;
            updateAdminHomepage(); // Re-render admin list to update icons
        };

        window.moveSection = function(index, direction) {
            const newIndex = index + direction;
            if (newIndex >= 0 && newIndex < layoutConfig.length) {
                // Swap elements
                [layoutConfig[index], layoutConfig[newIndex]] = [layoutConfig[newIndex], layoutConfig[index]];
                updateAdminHomepage(); // Re-render admin list
            }
        };

        window.saveLayoutConfig = function() {
            saveData();
            showToast("Layout Config Saved");
            switchPage('home'); // Refresh homepage
        };

        // KEMASKINI: Social Hub Logic
        function updateAdminSocial() {
            const container = document.getElementById('admin-social-container');
            if (container) {
                container.innerHTML = socialLinks.map(s => `
                    <div class="p-6 bg-black/20 rounded-3xl border border-white/5">
                        <div class="flex items-center gap-4 mb-4">
                            <div class="w-10 h-10 rounded-xl ${s.color} flex items-center justify-center shadow-lg">
                                <i data-lucide="${s.icon}" class="w-5 h-5 text-white"></i>
                            </div>
                            <h4 class="text-white font-black uppercase text-xs tracking-widest">${s.name}</h4>
                        </div>
                        <div class="space-y-4">
                            <div>
                                <label class="text-[9px] text-gray-500 uppercase font-bold mb-2 block">Target URL</label>
                                <input type="text" id="social-url-${s.id}" value="${s.url}" class="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-blue-500 text-xs font-mono" placeholder="https://...">
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="text-[9px] text-gray-500 uppercase font-bold mb-2 block">Icon (Lucide Name)</label>
                                    <input type="text" id="social-icon-${s.id}" value="${s.icon}" class="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-blue-500 text-xs" placeholder="e.g. facebook">
                                </div>
                                <div>
                                    <label class="text-[9px] text-gray-500 uppercase font-bold mb-2 block">Color (Tailwind)</label>
                                    <input type="text" id="social-color-${s.id}" value="${s.color}" class="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-blue-500 text-xs" placeholder="e.g. bg-blue-500">
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('');
                lucide.createIcons();
            }
        }

        window.saveSocialLinks = function() {
            socialLinks.forEach(s => {
                const urlInput = document.getElementById(`social-url-${s.id}`);
                const iconInput = document.getElementById(`social-icon-${s.id}`);
                const colorInput = document.getElementById(`social-color-${s.id}`);
                
                if (urlInput) s.url = urlInput.value;
                if (iconInput) s.icon = iconInput.value;
                if (colorInput) s.color = colorInput.value;
            });
            showToast("Social Configuration Updated");
            switchPage('home'); // Refresh homepage to show changes
        };

        // ENHANCED PROMO MANAGER
        function updateAdminPromo() { 
            const g = document.getElementById('admin-promo-grid'); 
            if(g) { 
                g.innerHTML = products.map(p => {
                    const discount = p.discount || 0;
                    const liveFinal = p.price * (1 - discount/100);
                    const isActive = discount > 0;
                    return `
                        <div class="bg-white/5 border ${isActive ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'border-white/10'} p-6 rounded-[2.5rem] flex flex-col gap-5 transition-all"> 
                            <div class="flex items-center gap-3 font-black">
                                <img src="${p.image}" class="w-12 h-12 rounded-xl object-cover border border-white/5"> 
                                <div class="overflow-hidden">
                                    <p class="text-white truncate font-black text-[10px]">${p.name}</p> 
                                    <p class="text-gray-500 text-[8px]">Base: RM${p.price.toFixed(2)}</p>
                                </div>
                            </div> 
                            <div class="space-y-4">
                                <div class="flex items-center justify-between">
                                    <label class="text-[8px] text-red-500 font-black tracking-widest">Discount (%)</label>
                                    <span class="text-[8px] text-white bg-white/10 px-2 py-0.5 rounded-lg">Final: RM${liveFinal.toFixed(2)}</span>
                                </div>
                                <div class="flex gap-2">
                                    <input type="number" id="promo-val-${p.id}" value="${discount}" class="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-red-500 text-center font-black" placeholder="0"> 
                                    <button onclick="setPromoVal(${p.id})" class="bg-red-500 text-white px-5 rounded-xl hover:bg-red-600 transition-all shadow-lg"><i data-lucide="check" class="w-4 h-4"></i></button>
                                </div>
                                <div class="flex gap-2">
                                    <button onclick="quickSetPromo(${p.id}, 0)" class="flex-1 py-1.5 bg-white/5 text-[7px] rounded-lg hover:bg-white/10 transition-all">Reset</button>
                                    <button onclick="quickSetPromo(${p.id}, 25)" class="flex-1 py-1.5 bg-blue-500/10 text-blue-400 text-[7px] rounded-lg hover:bg-blue-500/20 transition-all">25%</button>
                                    <button onclick="quickSetPromo(${p.id}, 50)" class="flex-1 py-1.5 bg-red-500/10 text-red-400 text-[7px] rounded-lg hover:bg-red-500/20 transition-all">50%</button>
                                </div> 
                            </div> 
                        </div>`;
                }).join(''); 
                lucide.createIcons(); 
            } 
        }

        window.quickSetPromo = function(id, val) {
            const input = document.getElementById(`promo-val-${id}`);
            if(input) { input.value = val; setPromoVal(id); }
        };

        window.setPromoVal = function(id) { 
            const input = document.getElementById(`promo-val-${id}`);
            const v = parseInt(input.value) || 0, p = products.find(x => x.id === id); 
            if(p) { p.discount = v; showToast(`${p.name} promo sync: ${v}%`); renderAll(); updateAdminPromo(); } 
        };

        window.handleAdminHeroSubmit = function(e) { e.preventDefault(); pageContents.heroTitle = document.getElementById('admin-hero-title').value; pageContents.heroSub = document.getElementById('admin-hero-sub').value; showToast("Hero node updated"); switchPage('home'); };
        window.toggleAdStatus = function(id) { const p = products.find(x => x.id === id); if(p) { p.featured = !p.featured; updateAdminHomepage(); renderAdvertised(); showToast("Ad Layout Updated"); } };
        
        // KEMASKINI: Fungsi Pemprosesan Imej
        window.handleFileSelect = function(input) {
            const label = document.getElementById('file-upload-label');
            if (input.files && input.files.length > 0) {
                label.textContent = input.files[0].name; // Papar nama fail
                label.classList.add('text-green-400');
            } else {
                label.textContent = "Option B: Upload From Device";
                label.classList.remove('text-green-400');
            }
        };

        const readFileAsBase64 = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        };

        window.handleAdminProductSubmit = async function(e) { 
            e.preventDefault(); 
            const id = document.getElementById('admin-edit-id').value; 
            const urlInput = document.getElementById('admin-p-img');
            const fileInput = document.getElementById('admin-p-file');
            
            let finalImage = "";

            // Logik Penentuan Imej: Fail Upload > URL Input > Imej Sedia Ada (Edit) > Placeholder
            if (fileInput.files && fileInput.files.length > 0) {
                try {
                    finalImage = await readFileAsBase64(fileInput.files[0]);
                } catch (err) {
                    console.error("Image upload failed", err);
                    showToast("Image Upload Error");
                    return;
                }
            } else if (urlInput.value.trim() !== "") {
                finalImage = urlInput.value.trim();
            } else if (id) {
                const existing = products.find(p => p.id == id);
                finalImage = existing ? existing.image : "";
            }

            // Fallback jika tiada imej langsung
            if (!finalImage) finalImage = "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800";

            // Process Specs (Split by newline)
            const specsRaw = document.getElementById('admin-p-specs').value;
            const specsArray = specsRaw.split('\n').map(s => s.trim()).filter(s => s.length > 0);

            const data = { 
                name: document.getElementById('admin-p-name').value, 
                price: parseFloat(document.getElementById('admin-p-price').value), 
                stock: parseInt(document.getElementById('admin-p-stock').value), 
                cat: document.getElementById('admin-p-cat').value, 
                image: finalImage, 
                specs: specsArray.length > 0 ? specsArray : ["Standard Verified"], // Save specs
                featured: false, 
                discount: 0 
            }; 
            
            if (id) { 
                const idx = products.findIndex(p => p.id == id); 
                products[idx] = { ...products[idx], ...data, featured: products[idx].featured, discount: products[idx].discount }; 
            } else { 
                products.unshift({ id: Date.now(), ...data }); 
            } 
            
            // SIMPAN DATA (KEMASKINI)
            saveData();

            resetAdminForm(); 
            updateAdminInventory(); 
            renderAll(); 
            showToast("Asset & Visuals Updated"); 
        };

        window.editAdminProduct = function(id) { 
            const p = products.find(x => x.id == id); 
            document.getElementById('admin-edit-id').value = p.id; 
            document.getElementById('admin-p-name').value = p.name; 
            document.getElementById('admin-p-price').value = p.price; 
            document.getElementById('admin-p-stock').value = p.stock; 
            document.getElementById('admin-p-cat').value = p.cat; 
            
            // Populate Specs
            document.getElementById('admin-p-specs').value = (p.specs || []).join('\n');

            // Bersihkan input imej
            document.getElementById('admin-p-img').value = "";
            document.getElementById('admin-p-file').value = "";
            document.getElementById('file-upload-label').textContent = "Change Image (Optional)";
            document.getElementById('file-upload-label').classList.remove('text-green-400');

            // Jika imej adalah URL, kita boleh paparkannya di input URL untuk kemudahan edit
            if (!p.image.startsWith('data:')) {
                document.getElementById('admin-p-img').value = p.image;
            }

            document.getElementById('admin-form-title').innerText = "Edit Asset Protocol"; 
            document.getElementById('admin-cancel-btn').classList.remove('hidden'); 
        };

        window.deleteAdminProduct = function(id) { 
            products = products.filter(p => p.id !== id); 
            saveData(); // SIMPAN DATA (DELETE)
            updateAdminInventory(); 
            renderAll(); 
            showToast("Asset Deleted"); 
        };
        
        window.resetAdminForm = function() { 
            document.getElementById('admin-product-form').reset(); 
            document.getElementById('admin-edit-id').value = ""; 
            document.getElementById('file-upload-label').textContent = "Option B: Upload From Device";
            document.getElementById('file-upload-label').classList.remove('text-green-400');
            document.getElementById('admin-form-title').innerText = "Provision Asset"; 
            document.getElementById('admin-cancel-btn').classList.add('hidden'); 
        };

        window.handleAdminCategorySubmit = function(e) { 
            e.preventDefault(); 
            const id = document.getElementById('admin-edit-cat-id').value, name = document.getElementById('admin-c-name').value; 
            if (id) { 
                const idx = categories.findIndex(c => c.id == id), old = categories[idx].name; 
                categories[idx].name = name; 
                products.forEach(p => { if(p.cat === old) p.cat = name; }); 
            } else { 
                categories.push({ id: Date.now(), name, icon: 'layers', color: 'bg-orange-500/10' }); 
            } 
            saveData(); // SIMPAN DATA (CATEGORY UPDATE)
            resetAdminCatForm(); 
            updateAdminCategories(); 
            updateAdminInventory(); 
            renderAll(); 
            showToast("Module Protocol Updated"); 
        };

        window.editAdminCategory = function(id) { const c = categories.find(x => x.id == id); document.getElementById('admin-edit-cat-id').value = c.id; document.getElementById('admin-c-name').value = c.name; document.getElementById('admin-cat-form-title').innerText = "Edit Module Node"; document.getElementById('admin-cat-cancel-btn').classList.remove('hidden'); };
        
        window.deleteAdminCategory = function(id) { 
            const c = categories.find(x => x.id === id); 
            if(c) { 
                categories = categories.filter(x => x.id !== id); 
                products.forEach(p => { if(p.cat === c.name) p.cat = "Uncategorized"; }); 
                saveData(); // SIMPAN DATA (CATEGORY DELETE)
                updateAdminCategories(); 
                updateAdminInventory(); 
                renderAll(); 
                showToast("Module Deleted"); 
            } 
        };

        window.resetAdminCatForm = function() { document.getElementById('admin-category-form').reset(); document.getElementById('admin-edit-cat-id').value = ""; document.getElementById('admin-cat-form-title').innerText = "Provision Module"; document.getElementById('admin-cat-cancel-btn').classList.add('hidden'); };
        function updateAdminContent() { document.getElementById('admin-content-guides').value = pageContents.guides; document.getElementById('admin-content-mission').value = pageContents.mission; document.getElementById('admin-content-contact').value = pageContents.contact; }
        window.handleAdminContentSubmit = function(e) { e.preventDefault(); pageContents.guides = document.getElementById('admin-content-guides').value; pageContents.mission = document.getElementById('admin-content-mission').value; pageContents.contact = document.getElementById('admin-content-contact').value; showToast("Global Hub Content Updated"); };

        // --- PURCHASE ENGINE ---
        window.addToCart = function(id) { const p = products.find(x => x.id === id); if(!p) return; const ex = cart.find(x => x.id === id); if (ex) ex.q++; else cart.push({ ...p, q: 1 }); updateCartUI(); showToast("Asset Stashed in Cart"); };
        window.buyNow = function(id) { addToCart(id); closeProductDetail(); toggleCart(); };
        function updateCartUI() { 
            const cc = document.getElementById('cart-count'), cont = document.getElementById('cart-items-container'), foot = document.getElementById('cart-footer'), tot = document.getElementById('cart-total'); if(!cc || !cont || !foot || !tot) return; 
            cc.innerText = cart.reduce((s, i) => s + i.q, 0); 
            if (!cart.length) { foot.style.display = 'none'; cont.innerHTML = '<p class="py-20 opacity-20 text-center italic font-black uppercase">Empty</p>'; } 
            else { foot.style.display = 'block'; let sum = 0; cont.innerHTML = cart.map(i => { const d = i.discount || 0, dp = d > 0 ? i.price * (1 - d/100) : i.price; sum += dp * i.q; return `<div class="bg-white/5 p-6 rounded-3xl flex justify-between items-center border border-white/5 text-[10px] font-black uppercase"><div><p class="text-white truncate max-w-[150px]">${i.name}</p><p class="text-gray-500 mt-1">RM${dp.toFixed(2)} x ${i.q}</p></div><button onclick="removeFromCart(${i.id})" class="text-red-500 p-2"><i data-lucide="trash-2" class="w-5 h-5"></i></button></div>`; }).join(''); tot.innerText = `RM${sum.toFixed(2)}`; lucide.createIcons(); } 
        }
        window.removeFromCart = function(id) { cart = cart.filter(i => i.id !== id); updateCartUI(); };
        window.authorizeSettlement = function() { if(!currentUser) { toggleCart(); openAuthModal('register'); showToast("Identity Authorization Required"); } else { const total = document.getElementById('cart-total').innerText; document.getElementById('payment-amount').innerText = total; toggleCart(); togglePaymentModal(); } };
        window.selectPayment = function(method) { showToast(`Settling via ${method}...`); setTimeout(() => { showToast("Mission Authorized."); cart = []; updateCartUI(); togglePaymentModal(); }, 2000); };
        window.toggleAIConsultant = function() { const ap = document.getElementById('ai-consultant-panel'); if(ap) ap.classList.toggle('ai-hidden'); };
        
        // --- 3D GATEWAY RENDERER ---
        function renderPaymentGateway() {
            const container = document.getElementById('payment-gateway-container');
            if(!container) return;
            container.innerHTML = `
                <div class="bg-red-500/5 border border-red-500/20 p-8 rounded-3xl flex justify-between items-center font-black">
                    <div><p class="text-gray-500 text-[10px] mb-1 uppercase">Settlement Total</p><p class="text-4xl text-white tracking-tighter" id="payment-amount">${document.getElementById('payment-amount')?.innerText || 'RM0.00'}</p></div>
                    <div class="text-right text-red-500 animate-pulse uppercase">LINK-SECURE-ACTIVE</div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 uppercase tracking-widest">
                    ${paymentMethods.map(m => `
                        <div onclick="selectPayment('${m.name}')" class="payment-card-3d group p-8">
                            <div class="payment-icon-container bg-gradient-to-br ${m.color} w-16 h-16">
                                <i data-lucide="${m.icon}" class="w-8 h-8 text-white"></i>
                            </div>
                            <span class="payment-label">${m.name}</span>
                            <p class="text-[7px] text-gray-500 normal-case opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-2">${m.desc}</p>
                        </div>
                    `).join('')}
                </div>
            `;
            lucide.createIcons();
        }

        window.openProductDetail = function(id) {
            const p = products.find(x => x.id === id), m = document.getElementById('product-detail-modal');
            if(p && m) {
                const d = p.discount || 0, fp = d > 0 ? p.price * (1 - d/100) : p.price;
                document.getElementById('detail-name').innerText = p.name;
                document.getElementById('detail-cat').innerText = p.cat;
                document.getElementById('detail-desc').innerText = p.desc || 'Operational data restricted.';
                document.getElementById('detail-price').innerText = `RM${fp.toFixed(2)}`;
                document.getElementById('detail-main-img').src = p.image;
                document.getElementById('detail-spec-list').innerHTML = (p.specs || ["Standard Verified"]).map(s => `<li class="flex items-center gap-3 border-b border-white/5 pb-3 text-[10px] font-bold uppercase"><i data-lucide="shield-check" class="w-4 h-4 text-red-500"></i> ${s}</li>`).join('');
                m.classList.remove('hidden'); m.classList.add('flex'); lucide.createIcons();
                document.getElementById('detail-add-btn').onclick = () => addToCart(p.id);
                document.getElementById('detail-buy-btn').onclick = () => buyNow(p.id);
            }
        };
        window.closeProductDetail = function() { const m = document.getElementById('product-detail-modal'); if(m) m.classList.add('hidden'); };

        window.onload = () => { switchPage('home'); };
    </script>
</body>
</html>
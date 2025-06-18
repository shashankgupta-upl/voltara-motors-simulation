// VOLTARA MOTORS: PRODUCTION CONFIGURATION & INITIALIZATION
// Complete Firebase setup and game configuration

// FIREBASE CONFIGURATION TEMPLATE
// Replace these values with your actual Firebase project credentials
const FIREBASE_CONFIG = {
    // 🔥 FIREBASE PROJECT SETTINGS
    // Get these from Firebase Console > Project Settings > General > Your apps > Web app
    apiKey: "AIzaSyCmtZFfVfQqCO5UX4WGium5S2KU0w7ylkU",
    authDomain: "crossing-the-chasm.firebaseapp.com", // Your Project ID + .firebaseapp.com
    databaseURL: "https://crossing-the-chasm-default-rtdb.firebaseio.com/", // Your Database URL
    projectId: "crossing-the-chasm", // Your Project ID
    storageBucket: "crossing-the-chasm.firebasestorage.app", // Your Project ID + .appspot.com
    messagingSenderId: "1045107082696", // Your Sender ID
    appId: "1:1045107082696:web:bbb10268de36dc252aecfd" // Your App ID
};

// GAME CONFIGURATION
const GAME_CONFIG = {
    // ⏱️ TIMING SETTINGS
    gameDuration: 1200, // 20 minutes in seconds
    autoSaveInterval: 30000, // 30 seconds
    decisionSaveDelay: 2000, // 2 seconds after decision change
    
    // 💰 BUDGET SETTINGS
    annualBudget: 100, // ₹100 Crores per year
    totalYears: 4,
    minimumCategorySpend: 5, // ₹5 Cr minimum per category
    
    // 👥 TEAM SETTINGS
    maxTeams: 10,
    teamNames: {
        team1: "Alpha Automotive",
        team2: "Beta Motors", 
        team3: "Gamma Vehicles",
        team4: "Delta Drive",
        team5: "Epsilon Electric",
        team6: "Zeta Motors",
        team7: "Eta Engines",
        team8: "Theta Transport",
        team9: "Iota Industries",
        team10: "Kappa Cars"
    },
    
    // 📊 KPI WEIGHTS
    kpiWeights: {
        marketShare: 0.20,        // 20%
        revenue: 0.25,            // 25%
        profitability: 0.25,      // 25%
        customerSatisfaction: 0.15, // 15%
        roic: 0.15               // 15%
    },
    
    // 🎯 VICTORY THRESHOLDS
    victoryThresholds: {
        gold: { percentile: 80, kpisRequired: 5 },
        silver: { percentile: 60, kpisRequired: 4 },
        bronze: { percentile: 40, kpisRequired: 3 }
    },
    
    // 🌍 MARKET EVENT SETTINGS
    marketEvents: {
        majorEventProbability: 0.20,  // 20% chance per major event
        minorEventProbability: 0.60,  // 60% chance per minor event
        guaranteedMajorEvents: [3, 4], // Guaranteed major events in Years 3 & 4
        crisisResponseWindow: 30      // 30 days for reduced correction penalties
    },
    
    // 🔄 COURSE CORRECTION SETTINGS
    courseCorrections: {
        enableFromYear: 2,           // Available from Year 2
        penaltyReduction: 0.40,      // 40% reduction during crisis
        maxCorrectionsPerYear: 3,    // Maximum 3 corrections per year
        integrationRiskChance: 0.20, // 20% chance of integration failure
        executiveRiskChance: 0.30    // 30% chance of CEO resignation (overhaul)
    }
};

// ADVANCED CONFIGURATION OPTIONS
const ADVANCED_CONFIG = {
    // 🔐 SECURITY SETTINGS
    enableTeamIsolation: true,     // Prevent teams from seeing each other's data
    enableAdminOverride: true,     // Allow admin to override game state
    logAllActions: true,           // Log all user actions for analytics
    
    // 📱 UI/UX SETTINGS
    enableMobileOptimization: true, // Optimize for mobile devices
    enableAccessibility: true,     // WCAG compliance features
    enableDarkMode: false,         // Dark mode option
    animationDuration: 300,        // Animation duration in ms
    
    // 📈 ANALYTICS SETTINGS
    trackDecisionTiming: true,     // Track time spent on decisions
    trackTeamCollaboration: true,  // Track team interaction patterns
    enableHeatmaps: false,         // UI interaction heatmaps
    
    // 🎮 GAMEPLAY SETTINGS
    allowDecisionRevision: true,   // Allow changing decisions before submission
    showRealTimeRankings: false,   // Hide rankings until game end
    enableHints: true,             // Show strategic hints
    enableTutorial: false,         // Interactive tutorial mode
    
    // 📊 REPORTING SETTINGS
    generateDetailedReports: true, // Comprehensive post-game reports
    enableExportToExcel: false,    // Excel export functionality
    sendEmailReports: false,       // Email reports to participants
    
    // 🔧 DEVELOPMENT SETTINGS
    enableDebugMode: false,        // Debug console logging
    enableTestMode: false,         // Test mode with accelerated timing
    mockMarketEvents: false,       // Use predictable test events
    skipValidation: false          // Skip validation for testing
};

// FIREBASE DATABASE STRUCTURE TEMPLATE
const DATABASE_STRUCTURE = {
    gameSettings: {
        isActive: true,
        timerStarted: false,
        timerDuration: GAME_CONFIG.gameDuration,
        startTime: null,
        teamNames: GAME_CONFIG.teamNames,
        configuration: {
            ...GAME_CONFIG,
            ...ADVANCED_CONFIG,
            version: "1.0.0",
            createdAt: "timestamp"
        }
    },
    teams: {
        // Dynamic team data structure
        teamX: {
            name: "Team Name",
            currentYear: 1,
            gameCompleted: false,
            totalBudgetUsed: { year1: 0, year2: 0, year3: 0, year4: 0 },
            decisions: {
                year1: {
                    smartFactory: { value: "industry4", cost: 35 },
                    qualitySystem: { value: "automated", cost: 18 },
                    // ... all other decisions
                    timestamp: "ISO timestamp",
                    totalCost: 98
                }
            },
            marketEvents: {
                year1: [
                    {
                        id: "event_id",
                        name: "Event Name",
                        description: "Event description",
                        impacts: {},
                        triggeredAt: "timestamp"
                    }
                ]
            },
            courseCorrections: {
                year2: {
                    corrections: [
                        {
                            category: "smartFactory",
                            from: "legacy",
                            to: "industry4",
                            penalty: 15,
                            cost: 25,
                            timestamp: "timestamp"
                        }
                    ]
                }
            },
            kpiResults: {
                year1: {
                    marketShare: 8.2,
                    revenue: 1200,
                    profitability: -5,
                    customerSatisfaction: 82,
                    roic: 15,
                    calculationDetails: {}
                }
            },
            finalScore: {
                totalScore: 342,
                rank: 3,
                strategy: "Urban Pioneer",
                victoryLevel: "silver",
                completedAt: "timestamp"
            },
            metadata: {
                createdAt: "timestamp",
                lastUpdated: "timestamp",
                participantCount: 4,
                sessionId: "unique_session_id"
            }
        }
    },
    analytics: {
        gameSession: {
            sessionId: "unique_session_id",
            startTime: "timestamp",
            endTime: "timestamp",
            participantCount: 40,
            completionRate: 0.95,
            averageScore: 298,
            topStrategy: "Urban Pioneer"
        },
        teamPerformance: {
            // Aggregated team performance data
        },
        decisionAnalytics: {
            // Popular decision combinations
        }
    }
};

// INITIALIZATION CLASS
class VoltaraInitializer {
    constructor() {
        this.firebase = null;
        this.database = null;
        this.initialized = false;
    }

    // 🚀 MAIN INITIALIZATION FUNCTION
    async initialize() {
        try {
            console.log('🎮 Initializing Voltara Motors Simulation...');
            
            // Initialize Firebase
            await this.initializeFirebase();
            
            // Setup database structure
            await this.setupDatabase();
            
            // Configure game settings
            await this.configureGame();
            
            // Setup error handling
            this.setupErrorHandling();
            
            // Setup analytics
            if (ADVANCED_CONFIG.logAllActions) {
                this.setupAnalytics();
            }
            
            this.initialized = true;
            console.log('✅ Voltara Motors initialized successfully!');
            
            return {
                success: true,
                firebase: this.firebase,
                database: this.database,
                config: GAME_CONFIG
            };
            
        } catch (error) {
            console.error('❌ Initialization failed:', error);
            throw new Error(`Voltara Motors initialization failed: ${error.message}`);
        }
    }

    // 🔥 FIREBASE INITIALIZATION
    async initializeFirebase() {
        try {
            // Validate Firebase config
            this.validateFirebaseConfig();
            
            // Initialize Firebase
            this.firebase = firebase.initializeApp(FIREBASE_CONFIG);
            this.database = firebase.database();
            
            // Test connection
            await this.testFirebaseConnection();
            
            console.log('🔥 Firebase initialized successfully');
            
        } catch (error) {
            throw new Error(`Firebase initialization failed: ${error.message}`);
        }
    }

    validateFirebaseConfig() {
        const requiredFields = ['apiKey', 'authDomain', 'databaseURL', 'projectId'];
        const missingFields = requiredFields.filter(field => 
            !FIREBASE_CONFIG[field] || FIREBASE_CONFIG[field].includes('XXXXX')
        );
        
        if (missingFields.length > 0) {
            throw new Error(`Missing Firebase configuration: ${missingFields.join(', ')}`);
        }
    }

    async testFirebaseConnection() {
        try {
            // Test database connectivity
            await this.database.ref('.info/connected').once('value');
            console.log('🔗 Firebase connection test successful');
        } catch (error) {
            throw new Error(`Firebase connection test failed: ${error.message}`);
        }
    }

    // 🗄️ DATABASE SETUP
    async setupDatabase() {
        try {
            // Check if game already exists
            const gameSettingsSnapshot = await this.database.ref('gameSettings').once('value');
            
            if (!gameSettingsSnapshot.exists()) {
                // Initialize default game settings
                await this.database.ref('gameSettings').set(DATABASE_STRUCTURE.gameSettings);
                console.log('📊 Database structure initialized');
            } else {
                console.log('📊 Existing database found, preserving data');
            }
            
            // Setup database rules validation
            await this.validateDatabaseRules();
            
        } catch (error) {
            throw new Error(`Database setup failed: ${error.message}`);
        }
    }

    async validateDatabaseRules() {
        try {
            // Test read/write permissions
            const testRef = this.database.ref('test');
            await testRef.set({ timestamp: Date.now() });
            await testRef.remove();
            
            console.log('🔐 Database permissions validated');
        } catch (error) {
            console.warn('⚠️ Database permissions issue:', error.message);
            console.warn('Please ensure Firebase database rules allow read/write access');
        }
    }

    // ⚙️ GAME CONFIGURATION
    async configureGame() {
        try {
            // Update game configuration in database
            await this.database.ref('gameSettings/configuration').update({
                ...GAME_CONFIG,
                ...ADVANCED_CONFIG,
                version: "1.0.0",
                lastUpdated: new Date().toISOString()
            });
            
            console.log('⚙️ Game configuration updated');
            
        } catch (error) {
            throw new Error(`Game configuration failed: ${error.message}`);
        }
    }

    // 🛡️ ERROR HANDLING SETUP
    setupErrorHandling() {
        // Global error handler for uncaught errors
        window.addEventListener('error', (event) => {
            this.logError('Global Error', {
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                stack: event.error?.stack
            });
        });

        // Promise rejection handler
        window.addEventListener('unhandledrejection', (event) => {
            this.logError('Unhandled Promise Rejection', {
                reason: event.reason,
                promise: event.promise
            });
        });

        console.log('🛡️ Error handling configured');
    }

    logError(type, details) {
        const errorLog = {
            type,
            details,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };

        // Log to console
        console.error(`Voltara Motors ${type}:`, errorLog);

        // Log to Firebase if available
        if (this.database && ADVANCED_CONFIG.logAllActions) {
            this.database.ref('logs/errors').push(errorLog).catch(() => {
                // Silently fail if logging fails
            });
        }
    }

    // 📈 ANALYTICS SETUP
    setupAnalytics() {
        // Track page views
        this.trackEvent('page_view', {
            page: window.location.pathname,
            timestamp: new Date().toISOString()
        });

        // Track user interactions
        document.addEventListener('click', (event) => {
            if (event.target.matches('button, .decision-option, .team-button')) {
                this.trackEvent('user_interaction', {
                    element: event.target.className,
                    text: event.target.textContent?.substring(0, 50),
                    timestamp: new Date().toISOString()
                });
            }
        });

        console.log('📈 Analytics configured');
    }

    trackEvent(eventType, data) {
        if (this.database && ADVANCED_CONFIG.logAllActions) {
            this.database.ref('analytics/events').push({
                type: eventType,
                data,
                timestamp: new Date().toISOString()
            }).catch(() => {
                // Silently fail if tracking fails
            });
        }
    }

    // 🧪 TESTING UTILITIES
    async runDiagnostics() {
        const diagnostics = {
            firebase: false,
            database: false,
            permissions: false,
            gameSettings: false,
            timestamp: new Date().toISOString()
        };

        try {
            // Test Firebase connection
            if (this.firebase) {
                diagnostics.firebase = true;
            }

            // Test database connection
            if (this.database) {
                await this.database.ref('.info/connected').once('value');
                diagnostics.database = true;
            }

            // Test permissions
            const testRef = this.database.ref('diagnostics/test');
            await testRef.set({ test: true });
            await testRef.remove();
            diagnostics.permissions = true;

            // Test game settings
            const settingsSnapshot = await this.database.ref('gameSettings').once('value');
            if (settingsSnapshot.exists()) {
                diagnostics.gameSettings = true;
            }

        } catch (error) {
            console.error('Diagnostics error:', error);
        }

        return diagnostics;
    }

    // 🔧 UTILITY FUNCTIONS
    async resetGame() {
        if (!confirm('⚠️ This will delete ALL game data. Are you sure?')) {
            return false;
        }

        try {
            // Clear teams data
            await this.database.ref('teams').remove();
            
            // Reset game settings
            await this.database.ref('gameSettings').set(DATABASE_STRUCTURE.gameSettings);
            
            console.log('🔄 Game reset successfully');
            return true;
            
        } catch (error) {
            console.error('Game reset failed:', error);
            return false;
        }
    }

    async exportGameData() {
        try {
            const snapshot = await this.database.ref().once('value');
            const data = snapshot.val();
            
            const exportData = {
                exportedAt: new Date().toISOString(),
                version: "1.0.0",
                data: data
            };
            
            // Create downloadable file
            const dataStr = JSON.stringify(exportData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            
            const link = document.createElement('a');
            link.href = URL.createObjectURL(dataBlob);
            link.download = `voltara-motors-export-${new Date().toISOString().slice(0, 10)}.json`;
            link.click();
            
            console.log('📁 Game data exported successfully');
            return true;
            
        } catch (error) {
            console.error('Export failed:', error);
            return false;
        }
    }

    // 📊 PERFORMANCE MONITORING
    startPerformanceMonitoring() {
        if (!ADVANCED_CONFIG.enableDebugMode) return;

        // Monitor page load time
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            this.trackEvent('performance', {
                metric: 'page_load_time',
                value: loadTime,
                timestamp: new Date().toISOString()
            });
        });

        // Monitor memory usage (if available)
        if (performance.memory) {
            setInterval(() => {
                this.trackEvent('performance', {
                    metric: 'memory_usage',
                    used: performance.memory.usedJSHeapSize,
                    total: performance.memory.totalJSHeapSize,
                    timestamp: new Date().toISOString()
                });
            }, 60000); // Every minute
        }
    }
}

// 🚀 AUTO-INITIALIZATION
// This runs automatically when the script is loaded
let voltaraInitializer = null;

document.addEventListener('DOMContentLoaded', async function() {
    try {
        voltaraInitializer = new VoltaraInitializer();
        
        // Initialize the system
        const result = await voltaraInitializer.initialize();
        
        // Make configuration available globally
        window.VOLTARA_CONFIG = GAME_CONFIG;
        window.VOLTARA_ADVANCED = ADVANCED_CONFIG;
        window.voltaraInitializer = voltaraInitializer;
        
        // Start performance monitoring if enabled
        if (ADVANCED_CONFIG.enableDebugMode) {
            voltaraInitializer.startPerformanceMonitoring();
        }
        
        // Dispatch initialization complete event
        window.dispatchEvent(new CustomEvent('voltaraInitialized', { 
            detail: result 
        }));
        
    } catch (error) {
        console.error('Voltara Motors initialization failed:', error);
        
        // Show user-friendly error message
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
            background: #e74c3c; color: white; padding: 15px 25px;
            border-radius: 8px; z-index: 9999; font-family: Arial, sans-serif;
        `;
        errorDiv.innerHTML = `
            <strong>⚠️ Initialization Failed</strong><br>
            Please check your Firebase configuration and try again.<br>
            <small>Error: ${error.message}</small>
        `;
        document.body.appendChild(errorDiv);
    }
});

// 🔧 GLOBAL UTILITY FUNCTIONS
window.VoltaraUtils = {
    // Quick diagnostics check
    async checkHealth() {
        if (voltaraInitializer) {
            return await voltaraInitializer.runDiagnostics();
        }
        return { error: 'Initializer not available' };
    },

    // Reset game (admin only)
    async resetGame() {
        if (voltaraInitializer) {
            return await voltaraInitializer.resetGame();
        }
        return false;
    },

    // Export game data
    async exportData() {
        if (voltaraInitializer) {
            return await voltaraInitializer.exportGameData();
        }
        return false;
    },

    // Get current configuration
    getConfig() {
        return {
            game: GAME_CONFIG,
            advanced: ADVANCED_CONFIG,
            firebase: FIREBASE_CONFIG
        };
    },

    // Validate team access
    isValidTeam(teamId) {
        return Object.keys(GAME_CONFIG.teamNames).includes(teamId);
    },

    // Format currency
    formatCurrency(amount) {
        return `₹${amount}Cr`;
    },

    // Format percentage
    formatPercentage(value) {
        return `${value}%`;
    },

    // Get team name
    getTeamName(teamId) {
        return GAME_CONFIG.teamNames[teamId] || teamId;
    }
};

// 📝 CONSOLE WELCOME MESSAGE
console.log(`
🎮 Voltara Motors Strategic Simulation
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Version: 1.0.0
Teams: ${GAME_CONFIG.maxTeams}
Duration: ${GAME_CONFIG.gameDuration / 60} minutes
Budget: ${GAME_CONFIG.annualBudget} Crores per year

🔧 Configuration loaded successfully
🔥 Firebase integration ready
📊 Analytics ${ADVANCED_CONFIG.logAllActions ? 'enabled' : 'disabled'}
🛡️ Error handling active

Ready to transform your strategy workshop! 🚀
`);

// Export for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        VoltaraInitializer,
        GAME_CONFIG,
        ADVANCED_CONFIG,
        FIREBASE_CONFIG,
        DATABASE_STRUCTURE
    };
}
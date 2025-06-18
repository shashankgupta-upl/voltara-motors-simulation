// VOLTARA MOTORS: COMPLETE INTEGRATION EXAMPLE
// This file demonstrates how to integrate all components together

// Enhanced Game Page Integration Script
class VoltaraGameController {
    constructor() {
        this.gameEngine = new VoltaraGameEngine();
        this.marketSystem = new VoltaraMarketSystem();
        this.currentTeam = null;
        this.currentYear = 1;
        this.gameData = {};
        this.autoSaveInterval = null;
        
        // Initialize Firebase connection
        this.database = firebase.database();
        
        // Bind methods
        this.initialize = this.initialize.bind(this);
        this.handleDecisionChange = this.handleDecisionChange.bind(this);
        this.submitYear = this.submitYear.bind(this);
    }

    // INITIALIZATION SYSTEM
    async initialize() {
        try {
            // Extract team from URL
            const urlParams = new URLSearchParams(window.location.search);
            this.currentTeam = urlParams.get('team');
            
            if (!this.validateTeamAccess()) {
                this.redirectToLanding();
                return;
            }

            // Setup UI components
            this.setupEventListeners();
            this.setupAutoSave();
            this.setupTimerSync();
            
            // Load existing game data
            await this.loadGameData();
            
            // Initialize game state
            this.updateUI();
            
            console.log(`Voltara Motors initialized for ${this.currentTeam}`);
            
        } catch (error) {
            console.error('Initialization failed:', error);
            this.showError('Failed to initialize game. Please refresh and try again.');
        }
    }

    validateTeamAccess() {
        const validTeams = ['team1', 'team2', 'team3', 'team4', 'team5', 
                           'team6', 'team7', 'team8', 'team9', 'team10'];
        return this.currentTeam && validTeams.includes(this.currentTeam);
    }

    redirectToLanding() {
        alert('Invalid team access. Redirecting to landing page.');
        window.location.href = 'index.html';
    }

    // DATA MANAGEMENT
    async loadGameData() {
        return new Promise((resolve, reject) => {
            this.database.ref(`teams/${this.currentTeam}`).on('value', 
                (snapshot) => {
                    this.gameData = snapshot.val() || this.createDefaultTeamData();
                    this.currentYear = this.gameData.currentYear || 1;
                    
                    // Restore existing decisions
                    this.restoreDecisions();
                    this.updateBudgetDisplay();
                    this.checkForMarketEvents();
                    
                    resolve(this.gameData);
                },
                (error) => {
                    console.error('Failed to load game data:', error);
                    reject(error);
                }
            );
        });
    }

    createDefaultTeamData() {
        const teamNames = {
            team1: "Alpha Automotive", team2: "Beta Motors", team3: "Gamma Vehicles",
            team4: "Delta Drive", team5: "Epsilon Electric", team6: "Zeta Motors",
            team7: "Eta Engines", team8: "Theta Transport", team9: "Iota Industries",
            team10: "Kappa Cars"
        };

        return {
            name: teamNames[this.currentTeam],
            currentYear: 1,
            gameCompleted: false,
            totalBudgetUsed: { year1: 0, year2: 0, year3: 0, year4: 0 },
            decisions: {},
            marketEvents: {},
            courseCorrections: {},
            kpiResults: {},
            finalScore: null
        };
    }

    // DECISION HANDLING SYSTEM
    setupEventListeners() {
        // Decision change listeners
        document.addEventListener('change', this.handleDecisionChange);
        
        // Year tab switching
        document.querySelectorAll('.year-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const year = parseInt(e.target.dataset.year);
                if (year <= this.currentYear) {
                    this.switchToYear(year);
                }
            });
        });

        // Action buttons
        document.getElementById('saveBtn')?.addEventListener('click', () => this.saveProgress());
        document.getElementById('submitBtn')?.addEventListener('click', () => this.submitYear());
        
        // Course correction buttons (setup dynamically)
        this.setupCorrectionListeners();
    }

    handleDecisionChange(event) {
        if (event.target.type === 'radio') {
            // Update visual selection
            this.updateDecisionSelection(event.target);
            
            // Validate budget and dependencies
            this.validateDecisions();
            
            // Auto-save after short delay
            clearTimeout(this.autoSaveTimeout);
            this.autoSaveTimeout = setTimeout(() => {
                this.saveProgress();
            }, 2000);
        }
    }

    updateDecisionSelection(radioElement) {
        const name = radioElement.name;
        
        // Remove selection from all options in this group
        document.querySelectorAll(`input[name="${name}"]`).forEach(radio => {
            radio.closest('.decision-option').classList.remove('selected');
        });
        
        // Add selection to chosen option
        radioElement.closest('.decision-option').classList.add('selected');
    }

    validateDecisions() {
        const decisions = this.getCurrentDecisions();
        const totalCost = this.calculateTotalCost(decisions);
        
        // Budget validation
        this.updateBudgetDisplay(totalCost);
        
        // Dependency validation
        const violations = this.gameEngine.checkDependencies(decisions);
        this.displayDependencyViolations(violations);
        
        // Update submit button state
        const canSubmit = totalCost <= 100 && violations.length === 0;
        this.updateSubmitButton(canSubmit);
    }

    getCurrentDecisions() {
        const decisions = {};
        const currentYearInputs = document.querySelectorAll(`input[name*="year${this.currentYear}"]:checked`);
        
        currentYearInputs.forEach(input => {
            const category = input.name.replace(`_year${this.currentYear}`, '');
            decisions[category] = {
                value: input.value,
                cost: parseInt(input.dataset.cost)
            };
        });
        
        return decisions;
    }

    calculateTotalCost(decisions) {
        return Object.values(decisions).reduce((total, decision) => {
            return total + (decision.cost || 0);
        }, 0);
    }

    updateBudgetDisplay(totalCost = null) {
        if (totalCost === null) {
            totalCost = this.calculateTotalCost(this.getCurrentDecisions());
        }
        
        const remaining = 100 - totalCost;
        
        document.getElementById('budgetUsed').textContent = totalCost;
        document.getElementById('budgetRemaining').textContent = remaining;
        
        // Color coding
        const budgetDisplay = document.querySelector('.budget-display');
        if (totalCost > 100) {
            budgetDisplay.style.background = 'rgba(231, 76, 60, 0.2)';
        } else if (totalCost > 90) {
            budgetDisplay.style.background = 'rgba(243, 156, 18, 0.2)';
        } else {
            budgetDisplay.style.background = 'rgba(255,255,255,0.1)';
        }
    }

    displayDependencyViolations(violations) {
        const warningDiv = document.getElementById('dependencyWarning');
        const messageDiv = document.getElementById('dependencyMessage');
        
        if (violations.length > 0) {
            warningDiv.style.display = 'block';
            messageDiv.innerHTML = violations.join('<br>');
        } else {
            warningDiv.style.display = 'none';
        }
    }

    updateSubmitButton(canSubmit) {
        const submitBtn = document.getElementById('submitBtn');
        if (submitBtn) {
            submitBtn.disabled = !canSubmit;
            submitBtn.style.opacity = canSubmit ? '1' : '0.6';
        }
    }

    // MARKET EVENTS INTEGRATION
    async checkForMarketEvents() {
        if (this.gameData.marketEvents && this.gameData.marketEvents[`year${this.currentYear}`]) {
            const events = this.gameData.marketEvents[`year${this.currentYear}`];
            this.displayMarketEvents(events);
        }
    }

    displayMarketEvents(events) {
        const eventsContainer = document.getElementById(`marketEventsYear${this.currentYear}`);
        const eventsContent = document.getElementById(`eventsYear${this.currentYear}Content`);
        
        if (eventsContainer && eventsContent) {
            eventsContainer.classList.add('show');
            
            eventsContent.innerHTML = events.map(event => `
                <div class="event-item">
                    <div class="event-title">${event.name}</div>
                    <div class="event-description">${event.description}</div>
                    ${event.impacts ? this.formatEventImpacts(event.impacts) : ''}
                </div>
            `).join('');
        }
    }

    formatEventImpacts(impacts) {
        const currentDecisions = this.getCurrentDecisions();
        let impactHTML = '<div class="event-impacts"><strong>Impact on your strategy:</strong><ul>';
        
        Object.keys(impacts).forEach(target => {
            const impact = impacts[target];
            const applies = this.doesImpactApply(target, currentDecisions);
            
            if (applies) {
                impactHTML += `<li style="color: #e74c3c;">${impact.message || 'Affects your current decisions'}</li>`;
            }
        });
        
        impactHTML += '</ul></div>';
        return impactHTML;
    }

    doesImpactApply(target, decisions) {
        if (target === 'all') return true;
        return Object.values(decisions).some(decision => decision.value === target);
    }

    // COURSE CORRECTION SYSTEM
    setupCorrectionListeners() {
        // This will be called when course correction options are dynamically generated
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('correction-option')) {
                this.handleCorrectionSelection(event.target);
            }
        });
    }

    async generateCorrectionOptions() {
        if (this.currentYear <= 1) return;
        
        const previousYear = this.currentYear - 1;
        const previousDecisions = this.gameData.decisions[`year${previousYear}`];
        
        if (!previousDecisions) return;
        
        const corrections = [];
        
        // Analyze each decision category for potential corrections
        Object.keys(previousDecisions).forEach(category => {
            if (category === 'timestamp' || category === 'totalCost') return;
            
            const currentDecision = previousDecisions[category];
            const alternatives = this.getAlternativeOptions(category, currentDecision.value);
            
            alternatives.forEach(alternative => {
                const penalty = this.marketSystem.calculateCorrectionPenalty(
                    currentDecision, 
                    alternative, 
                    this.currentYear,
                    this.gameData.marketEvents
                );
                
                corrections.push({
                    category,
                    from: currentDecision,
                    to: alternative,
                    penalty
                });
            });
        });
        
        this.displayCorrectionOptions(corrections);
    }

    getAlternativeOptions(category, currentValue) {
        // Return available alternatives for each category
        const options = this.gameEngine.decisionCosts[category];
        if (!options) return [];
        
        return Object.keys(options)
            .filter(option => option !== currentValue)
            .map(option => ({
                value: option,
                cost: options[option],
                name: this.formatOptionName(option)
            }));
    }

    formatOptionName(value) {
        const names = {
            industry4: 'Industry 4.0 Smart Factory',
            incremental: 'Incremental Automation',
            legacy: 'Status Quo Legacy',
            // Add more mappings as needed
        };
        return names[value] || value;
    }

    handleCorrectionSelection(correctionElement) {
        const correctionData = JSON.parse(correctionElement.dataset.correction);
        
        const confirmMessage = `
            Apply correction: ${correctionData.from.name} → ${correctionData.to.name}
            
            Cost: ₹${correctionData.penalty.cost}Cr
            KPI Penalty: ${correctionData.penalty.kpiPenalty}% for ${correctionData.penalty.delayMonths} months
            
            Continue?
        `;
        
        if (confirm(confirmMessage)) {
            this.applyCourseCorrection(correctionData);
        }
    }

    async applyCourseCorrection(correctionData) {
        // Store correction in database
        const correctionKey = `courseCorrections/year${this.currentYear}`;
        const corrections = this.gameData.courseCorrections?.[`year${this.currentYear}`]?.corrections || [];
        
        corrections.push({
            category: correctionData.category,
            from: correctionData.from.value,
            to: correctionData.to.value,
            penalty: correctionData.penalty.kpiPenalty,
            cost: correctionData.penalty.cost,
            timestamp: new Date().toISOString()
        });
        
        await this.database.ref(`teams/${this.currentTeam}/${correctionKey}`).set({
            corrections
        });
        
        // Update budget with penalty cost
        const currentBudget = this.gameData.totalBudgetUsed[`year${this.currentYear}`] || 0;
        await this.database.ref(`teams/${this.currentTeam}/totalBudgetUsed/year${this.currentYear}`)
            .set(currentBudget + correctionData.penalty.cost);
        
        // Visual feedback
        this.showCorrectionConfirmation(correctionData);
    }

    showCorrectionConfirmation(correctionData) {
        const notification = document.createElement('div');
        notification.className = 'correction-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <strong>Course Correction Applied</strong><br>
                ${correctionData.penalty.description}<br>
                Cost: ₹${correctionData.penalty.cost}Cr
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    // YEAR SUBMISSION SYSTEM
    async submitYear() {
        try {
            const decisions = this.getCurrentDecisions();
            const totalCost = this.calculateTotalCost(decisions);
            
            // Final validation
            if (!this.validateSubmission(decisions, totalCost)) {
                return;
            }
            
            // Save decisions
            await this.saveDecisions(decisions, totalCost);
            
            // Calculate KPIs
            const kpis = this.gameEngine.calculateKPIs(this.gameData, this.currentYear);
            await this.saveKPIs(kpis);
            
            // Trigger market events for next year
            if (this.currentYear < 4) {
                await this.triggerMarketEventsForNextYear();
            }
            
            // Move to next year or complete game
            await this.progressToNextPhase();
            
        } catch (error) {
            console.error('Year submission failed:', error);
            this.showError('Failed to submit year. Please try again.');
        }
    }

    validateSubmission(decisions, totalCost) {
        // Check budget
        if (totalCost > 100) {
            alert('Budget exceeded! Please reduce selections to stay within ₹100 Cr.');
            return false;
        }
        
        // Check all categories selected
        const requiredCategories = [
            'smartFactory', 'qualitySystem', 'customerJourney', 'serviceNetwork',
            'erpStrategy', 'dataPlatform', 'iotTelemetry', 'businessIntelligence',
            'brandPositioning', 'marketingTech', 'cloudStrategy', 'security'
        ];
        
        const missingCategories = requiredCategories.filter(cat => !decisions[cat]);
        
        if (missingCategories.length > 0) {
            alert(`Please make decisions for all categories. Missing: ${missingCategories.join(', ')}`);
            return false;
        }
        
        // Check dependencies
        const violations = this.gameEngine.checkDependencies(decisions);
        if (violations.length > 0) {
            alert(`Please resolve dependency violations: ${violations.join(', ')}`);
            return false;
        }
        
        return true;
    }

    async saveDecisions(decisions, totalCost) {
        const saveData = {
            ...decisions,
            timestamp: new Date().toISOString(),
            totalCost: totalCost
        };
        
        await this.database.ref(`teams/${this.currentTeam}/decisions/year${this.currentYear}`)
            .set(saveData);
        
        await this.database.ref(`teams/${this.currentTeam}/totalBudgetUsed/year${this.currentYear}`)
            .set(totalCost);
    }

    async saveKPIs(kpis) {
        await this.database.ref(`teams/${this.currentTeam}/kpiResults/year${this.currentYear}`)
            .set(kpis);
    }

    async triggerMarketEventsForNextYear() {
        // Get all teams data for collective decision analysis
        const allTeamsSnapshot = await this.database.ref('teams').once('value');
        const allTeamsData = allTeamsSnapshot.val() || {};
        
        // Trigger events for next year
        const nextYear = this.currentYear + 1;
        const events = this.marketSystem.triggerEventsForYear(nextYear, allTeamsData);
        
        // Save events for the team
        if (events.length > 0) {
            await this.database.ref(`teams/${this.currentTeam}/marketEvents/year${nextYear}`)
                .set(events);
        }
    }

    async progressToNextPhase() {
        if (this.currentYear < 4) {
            // Move to next year
            this.currentYear++;
            await this.database.ref(`teams/${this.currentTeam}/currentYear`)
                .set(this.currentYear);
            
            // Generate course correction options
            await this.generateCorrectionOptions();
            
            // Update UI for new year
            this.switchToYear(this.currentYear);
            
        } else {
            // Complete game
            await this.completeGame();
        }
    }

    async completeGame() {
        // Calculate final score
        const finalScore = this.gameEngine.calculateFinalScore(this.gameData);
        const strategy = this.gameEngine.identifyTeamStrategy(this.gameData);
        
        await this.database.ref(`teams/${this.currentTeam}`).update({
            gameCompleted: true,
            finalScore: {
                totalScore: finalScore,
                strategy: strategy,
                completedAt: new Date().toISOString()
            }
        });
        
        // Show final results
        this.displayFinalResults(finalScore, strategy);
    }

    displayFinalResults(finalScore, strategy) {
        const resultsSection = document.getElementById('finalResults');
        if (resultsSection) {
            resultsSection.classList.add('show');
            
            // Update final KPI displays
            const year4KPIs = this.gameData.kpiResults?.year4;
            if (year4KPIs) {
                document.getElementById('finalMarketShare').textContent = year4KPIs.marketShare;
                document.getElementById('finalRevenue').textContent = year4KPIs.revenue;
                document.getElementById('finalProfitability').textContent = year4KPIs.profitability;
                document.getElementById('finalSatisfaction').textContent = year4KPIs.customerSatisfaction;
                document.getElementById('finalROIC').textContent = year4KPIs.roic;
            }
        }
    }

    // UTILITY FUNCTIONS
    switchToYear(year) {
        // Hide all year sections
        document.querySelectorAll('.year-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show selected year
        const yearSection = document.getElementById(`year${year}`);
        if (yearSection) {
            yearSection.classList.add('active');
        }
        
        // Update active tab
        document.querySelectorAll('.year-tab').forEach(tab => {
            tab.classList.remove('active');
            if (parseInt(tab.dataset.year) === year) {
                tab.classList.add('active');
            }
        });
    }

    setupAutoSave() {
        this.autoSaveInterval = setInterval(() => {
            const decisions = this.getCurrentDecisions();
            if (Object.keys(decisions).length > 0) {
                this.saveProgress();
            }
        }, 30000); // Every 30 seconds
    }

    async saveProgress() {
        try {
            const decisions = this.getCurrentDecisions();
            const totalCost = this.calculateTotalCost(decisions);
            
            await this.saveDecisions(decisions, totalCost);
            
            // Update save indicator
            document.getElementById('lastSaveTime').textContent = new Date().toLocaleTimeString();
            
            // Visual feedback
            const saveBtn = document.getElementById('saveBtn');
            if (saveBtn) {
                const originalText = saveBtn.textContent;
                saveBtn.textContent = '✓ Saved!';
                saveBtn.style.background = '#27ae60';
                
                setTimeout(() => {
                    saveBtn.textContent = originalText;
                    saveBtn.style.background = '#3498db';
                }, 2000);
            }
            
        } catch (error) {
            console.error('Auto-save failed:', error);
        }
    }

    restoreDecisions() {
        const decisions = this.gameData.decisions[`year${this.currentYear}`];
        if (!decisions) return;
        
        Object.keys(decisions).forEach(category => {
            if (category === 'timestamp' || category === 'totalCost') return;
            
            const decision = decisions[category];
            if (decision?.value) {
                const radioName = `${category}_year${this.currentYear}`;
                const radio = document.querySelector(`input[name="${radioName}"][value="${decision.value}"]`);
                
                if (radio) {
                    radio.checked = true;
                    radio.closest('.decision-option').classList.add('selected');
                }
            }
        });
    }

    setupTimerSync() {
        // Listen for timer updates from admin
        this.database.ref('gameSettings').on('value', (snapshot) => {
            const settings = snapshot.val();
            if (settings?.timerStarted === false && settings?.gameEnded) {
                this.handleGameEnd();
            }
        });
    }

    handleGameEnd() {
        if (!this.gameData.gameCompleted) {
            this.autoSubmitGame();
        }
    }

    async autoSubmitGame() {
        try {
            // Submit current state
            const decisions = this.getCurrentDecisions();
            if (Object.keys(decisions).length > 0) {
                await this.saveDecisions(decisions, this.calculateTotalCost(decisions));
            }
            
            // Mark as auto-submitted
            await this.database.ref(`teams/${this.currentTeam}`).update({
                gameCompleted: true,
                autoSubmitted: true,
                completedAt: new Date().toISOString()
            });
            
            alert('Game time has expired. Your current progress has been automatically submitted.');
            
        } catch (error) {
            console.error('Auto-submit failed:', error);
        }
    }

    updateUI() {
        // Update team name
        document.getElementById('teamName').textContent = this.gameData.name;
        
        // Update year tabs
        this.updateYearTabs();
        
        // Update budget display
        this.updateBudgetDisplay();
        
        // Check for market events
        this.checkForMarketEvents();
    }

    updateYearTabs() {
        document.querySelectorAll('.year-tab').forEach(tab => {
            const year = parseInt(tab.dataset.year);
            tab.classList.remove('completed', 'active');
            
            if (year < this.currentYear) {
                tab.classList.add('completed');
            } else if (year === this.currentYear) {
                tab.classList.add('active');
            }
        });
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-notification';
        errorDiv.innerHTML = `
            <div class="error-content">
                <strong>Error:</strong> ${message}
            </div>
        `;
        
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    // Cleanup
    destroy() {
        if (this.autoSaveInterval) {
            clearInterval(this.autoSaveInterval);
        }
        
        if (this.autoSaveTimeout) {
            clearTimeout(this.autoSaveTimeout);
        }
        
        // Remove Firebase listeners
        this.database.ref(`teams/${this.currentTeam}`).off();
        this.database.ref('gameSettings').off();
    }
}

// AUTO-INITIALIZATION
// This ensures the game controller starts when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the game page
    if (window.location.pathname.includes('game.html')) {
        // Initialize the game controller
        window.voltaraGame = new VoltaraGameController();
        window.voltaraGame.initialize().catch(error => {
            console.error('Failed to initialize Voltara Motors:', error);
            alert('Game initialization failed. Please refresh the page and try again.');
        });
    }
});

// GLOBAL FUNCTIONS for HTML onclick handlers
function selectOption(category, value, cost) {
    if (window.voltaraGame) {
        const radioName = `${category}_year${window.voltaraGame.currentYear}`;
        const radio = document.querySelector(`input[name="${radioName}"][value="${value}"]`);
        if (radio) {
            radio.checked = true;
            window.voltaraGame.handleDecisionChange({ target: radio });
        }
    }
}

function saveProgress() {
    if (window.voltaraGame) {
        window.voltaraGame.saveProgress();
    }
}

function submitYear() {
    if (window.voltaraGame) {
        window.voltaraGame.submitYear();
    }
}

function goBack() {
    if (confirm('Are you sure you want to return to the landing page? Any unsaved progress will be lost.')) {
        window.location.href = 'index.html';
    }
}

// Cleanup on page unload
window.addEventListener('beforeunload', function() {
    if (window.voltaraGame) {
        window.voltaraGame.destroy();
    }
});

// ADMIN DASHBOARD INTEGRATION
class VoltaraAdminController {
    constructor() {
        this.database = firebase.database();
        this.gameSettings = {};
        this.teamsData = {};
        this.timerInterval = null;
        
        this.initialize = this.initialize.bind(this);
    }

    async initialize() {
        // Setup Firebase listeners
        this.database.ref('gameSettings').on('value', (snapshot) => {
            this.gameSettings = snapshot.val() || {};
            this.updateGameStatus();
            this.updateTimer();
        });

        this.database.ref('teams').on('value', (snapshot) => {
            this.teamsData = snapshot.val() || {};
            this.updateTeamsDisplay();
            this.updateStatistics();
            this.updateRankings();
        });

        // Initialize default settings
        await this.initializeGameSettings();
        
        // Start timer update
        this.startTimerUpdate();
        
        console.log('Voltara Admin Dashboard initialized');
    }

    async initializeGameSettings() {
        const snapshot = await this.database.ref('gameSettings').once('value');
        if (!snapshot.exists()) {
            const defaultSettings = {
                isActive: true,
                timerStarted: false,
                timerDuration: 1200,
                startTime: null,
                teamNames: {
                    team1: "Alpha Automotive", team2: "Beta Motors", 
                    team3: "Gamma Vehicles", team4: "Delta Drive",
                    team5: "Epsilon Electric", team6: "Zeta Motors",
                    team7: "Eta Engines", team8: "Theta Transport",
                    team9: "Iota Industries", team10: "Kappa Cars"
                }
            };
            await this.database.ref('gameSettings').set(defaultSettings);
        }
    }

    updateGameStatus() {
        const statusElement = document.getElementById('gameStatus');
        if (statusElement) {
            statusElement.textContent = this.gameSettings.timerStarted ? 'Active' : 'Waiting';
        }
    }

    updateTimer() {
        const timerElement = document.getElementById('gameTimer');
        if (!timerElement) return;
        
        if (this.gameSettings.timerStarted && this.gameSettings.startTime) {
            const elapsed = (Date.now() - this.gameSettings.startTime) / 1000;
            const remaining = Math.max(0, this.gameSettings.timerDuration - elapsed);
            
            const minutes = Math.floor(remaining / 60);
            const seconds = Math.floor(remaining % 60);
            
            timerElement.textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            if (remaining <= 0) {
                this.handleGameEnd();
            }
        } else {
            timerElement.textContent = '20:00';
        }
    }

    async handleGameEnd() {
        // Auto-submit all incomplete teams
        const updates = {};
        Object.keys(this.teamsData).forEach(teamId => {
            if (!this.teamsData[teamId].gameCompleted) {
                updates[`teams/${teamId}/gameCompleted`] = true;
                updates[`teams/${teamId}/autoSubmitted`] = true;
            }
        });
        
        await this.database.ref().update(updates);
        alert('Game time has expired! All teams have been auto-submitted.');
    }

    updateTeamsDisplay() {
        // Update both grid and table views
        this.updateTeamsGrid();
        this.updateTeamsTable();
    }

    updateTeamsGrid() {
        const grid = document.getElementById('teamsGrid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        Object.keys(this.gameSettings.teamNames || {}).forEach(teamId => {
            const team = this.teamsData[teamId] || {};
            const card = this.createTeamCard(teamId, team);
            grid.appendChild(card);
        });
    }

    createTeamCard(teamId, teamData) {
        const card = document.createElement('div');
        card.className = 'team-card';
        
        if (teamData.gameCompleted) {
            card.classList.add('completed');
        } else if (teamData.currentYear > 1) {
            card.classList.add('active');
        }
        
        const teamName = this.gameSettings.teamNames?.[teamId] || teamId;
        const currentKPIs = teamData.kpiResults?.[`year${teamData.currentYear || 1}`] || {};
        
        card.innerHTML = `
            <div class="team-header">
                <div class="team-name">${teamName}</div>
                <div class="team-status ${this.getStatusClass(teamData)}">
                    ${this.getStatusText(teamData)}
                </div>
            </div>
            
            <div class="team-metrics">
                <div class="metric">
                    <div class="metric-label">Year</div>
                    <div class="metric-value">${teamData.currentYear || 1}</div>
                </div>
                <div class="metric">
                    <div class="metric-label">Budget</div>
                    <div class="metric-value">₹${teamData.totalBudgetUsed?.[`year${teamData.currentYear || 1}`] || 0}Cr</div>
                </div>
                <div class="metric">
                    <div class="metric-label">Market Share</div>
                    <div class="metric-value">${currentKPIs.marketShare || 0}%</div>
                </div>
                <div class="metric">
                    <div class="metric-label">Revenue</div>
                    <div class="metric-value">₹${currentKPIs.revenue || 0}Cr</div>
                </div>
            </div>
            
            <div class="team-actions">
                <button class="team-btn primary" onclick="viewTeamDetails('${teamId}')">
                    View Details
                </button>
                <button class="team-btn secondary" onclick="monitorTeam('${teamId}')">
                    Monitor Live
                </button>
            </div>
        `;
        
        return card;
    }

    getStatusClass(teamData) {
        if (teamData.gameCompleted) return 'status-completed';
        if (teamData.currentYear > 1) return 'status-active';
        return 'status-waiting';
    }

    getStatusText(teamData) {
        if (teamData.gameCompleted) return 'Completed';
        if (teamData.currentYear > 1) return 'In Progress';
        return 'Waiting';
    }

    updateStatistics() {
        const totalTeams = Object.keys(this.gameSettings.teamNames || {}).length;
        const activeTeams = Object.values(this.teamsData).filter(team => 
            team.currentYear > 1 && !team.gameCompleted).length;
        const completedTeams = Object.values(this.teamsData).filter(team => 
            team.gameCompleted).length;

        document.getElementById('activeTeams').textContent = activeTeams;
        document.getElementById('completedTeams').textContent = completedTeams;
    }

    startTimerUpdate() {
        this.timerInterval = setInterval(() => {
            this.updateTimer();
        }, 1000);
    }
}

// Auto-initialize admin dashboard
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('admin.html')) {
        window.voltaraAdmin = new VoltaraAdminController();
        window.voltaraAdmin.initialize().catch(error => {
            console.error('Failed to initialize admin dashboard:', error);
        });
    }
});

// Admin control functions
async function startGame() {
    if (window.voltaraAdmin) {
        const settings = window.voltaraAdmin.gameSettings;
        if (settings.timerStarted) {
            alert('Game is already running!');
            return;
        }

        const confirmStart = confirm('Start the 20-minute simulation for all teams?');
        if (confirmStart) {
            await window.voltaraAdmin.database.ref('gameSettings').update({
                timerStarted: true,
                startTime: Date.now()
            });
            
            const startBtn = document.getElementById('startBtn');
            if (startBtn) {
                startBtn.style.background = '#95a5a6';
                startBtn.textContent = '⏸ Running';
            }
        }
    }
}

async function pauseGame() {
    if (window.voltaraAdmin) {
        await window.voltaraAdmin.database.ref('gameSettings/timerStarted').set(false);
        
        const startBtn = document.getElementById('startBtn');
        if (startBtn) {
            startBtn.style.background = '#27ae60';
            startBtn.textContent = '▶ Resume';
        }
    }
}

async function resetGame() {
    if (window.voltaraAdmin) {
        const confirmReset = confirm(
            'Are you sure you want to reset the entire game?\n\n' +
            'This will delete all team progress and cannot be undone!'
        );
        
        if (confirmReset) {
            // Reset everything
            await window.voltaraAdmin.database.ref('gameSettings').set({
                isActive: true,
                timerStarted: false,
                timerDuration: 1200,
                startTime: null,
                teamNames: window.voltaraAdmin.gameSettings.teamNames
            });
            
            await window.voltaraAdmin.database.ref('teams').remove();
            
            alert('Game has been reset successfully!');
            location.reload();
        }
    }
}

function viewTeamDetails(teamId) {
    if (window.voltaraAdmin) {
        const team = window.voltaraAdmin.teamsData[teamId] || {};
        const teamName = window.voltaraAdmin.gameSettings.teamNames?.[teamId] || teamId;
        
        // Simple alert for now - could be enhanced with modal
        let details = `Team: ${teamName}\n`;
        details += `Year: ${team.currentYear || 1}\n`;
        details += `Status: ${window.voltaraAdmin.getStatusText(team)}\n`;
        
        if (team.finalScore) {
            details += `Final Score: ${team.finalScore.totalScore}\n`;
            details += `Strategy: ${team.finalScore.strategy}\n`;
        }
        
        alert(details);
    }
}

function monitorTeam(teamId) {
    // Open team's game page in new tab
    window.open(`game.html?team=${teamId}`, '_blank');
}

// Export for external use if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VoltaraGameController, VoltaraAdminController };
}
// VOLTARA MOTORS: CORE GAME LOGIC ENGINE
// Complete KPI calculations, market events, and dependency system

class VoltaraGameEngine {
    constructor() {
        this.kpiWeights = {
            marketShare: 0.20,
            revenue: 0.25,
            profitability: 0.25,
            customerSatisfaction: 0.15,
            roic: 0.15
        };
        
        this.decisionCosts = this.initializeDecisionCosts();
        this.marketEvents = this.initializeMarketEvents();
        this.dependencies = this.initializeDependencies();
    }

    // Initialize decision costs database
    initializeDecisionCosts() {
        return {
            smartFactory: {
                industry4: 35,
                incremental: 20,
                legacy: 8
            },
            qualitySystem: {
                automated: 18,
                hybrid: 12,
                manual: 5
            },
            customerJourney: {
                omnichannel: 25,
                channelSpecific: 15,
                basic: 8
            },
            serviceNetwork: {
                predictive: 20,
                reactive: 12,
                scheduled: 6
            },
            erpStrategy: {
                sapRise: 22,
                sapOnPrem: 28,
                legacy: 10
            },
            dataPlatform: {
                lakehouse: 25,
                warehouse: 15,
                basic: 7
            },
            iotTelemetry: {
                realtime: 30,
                basic: 18,
                none: 3
            },
            businessIntelligence: {
                generative: 20,
                standard: 12,
                manual: 4
            },
            brandPositioning: {
                tesla: 30,
                toyota: 20,
                value: 12
            },
            marketingTech: {
                aiPersonalization: 22,
                traditional: 14,
                wordOfMouth: 8
            },
            cloudStrategy: {
                multiCloud: 18,
                singleCloud: 12,
                hybrid: 15,
                onPremise: 20
            },
            security: {
                zeroTrust: 16,
                perimeter: 10,
                hybrid: 13,
                basic: 6
            }
        };
    }

    // Initialize market events library
    initializeMarketEvents() {
        return {
            year1: {
                major: [
                    {
                        id: "semiconductor_crisis",
                        name: "Global Semiconductor Crisis Intensifies",
                        description: "Chip shortage affects all manufacturing",
                        probability: 0.2,
                        impacts: {
                            industry4: { delayMonths: 6, profitabilityChange: -8 },
                            realtime: { costIncrease: 10 },
                            legacy: { profitabilityBonus: 15 }
                        }
                    },
                    {
                        id: "india_china_tensions",
                        name: "India-China Border Tensions Escalate",
                        description: "Chinese battery imports banned, domestic incentives announced",
                        probability: 0.2,
                        impacts: {
                            all: { batteryCostIncrease: 25 },
                            industry4: { profitabilityBonus: 10 },
                            basic: { revenueDecrease: 20 }
                        }
                    },
                    {
                        id: "global_recession",
                        name: "Global Economic Recession Begins",
                        description: "EV demand drops 30% across all segments",
                        probability: 0.2,
                        impacts: {
                            tesla: { marketShareDecrease: 25 },
                            value: { marketShareIncrease: 20 },
                            highInvestment: { profitabilityDecrease: 15 }
                        }
                    }
                ],
                minor: [
                    {
                        id: "ev_subsidy_extension",
                        name: "Government Announces ₹2L EV Subsidy Extension",
                        description: "All players gain market share boost",
                        probability: 0.6,
                        impacts: {
                            all: { marketShareIncrease: 5 },
                            tesla: { additionalMarketShare: 8 }
                        }
                    },
                    {
                        id: "tata_data_breach",
                        name: "Major Data Breach at Tata Motors",
                        description: "Security becomes visible differentiator",
                        probability: 0.6,
                        impacts: {
                            zeroTrust: { customerSatisfactionIncrease: 15 },
                            basic: { customerSatisfactionDecrease: 20 }
                        }
                    },
                    {
                        id: "charging_infrastructure_boom",
                        name: "Charging Infrastructure Grows 200% in Tier-2 Cities",
                        description: "Validates digital-first strategy",
                        probability: 0.6,
                        impacts: {
                            realtime: { revenueIncrease: 10 },
                            omnichannel: { marketShareIncrease: 5 }
                        }
                    }
                ]
            },
            year2: {
                major: [
                    {
                        id: "lithium_supply_crisis",
                        name: "Russia-Ukraine Conflict Disrupts Lithium Supply",
                        description: "Battery costs increase globally",
                        probability: 0.2,
                        impacts: {
                            all: { batteryCostIncrease: 40 },
                            realtime: { delayMonths: 3 },
                            traditional: { supplyPreference: true }
                        }
                    },
                    {
                        id: "ai_revolution",
                        name: "ChatGPT Breakthrough Creates AI Revolution",
                        description: "AI capabilities get massive boost",
                        probability: 0.2,
                        impacts: {
                            generative: { effectivenessIncrease: 30 },
                            aiPersonalization: { revenueIncrease: 25 },
                            manual: { forcedUpgrade: 15 }
                        }
                    },
                    {
                        id: "fleet_electrification_mandate",
                        name: "Government Mandates 30% Fleet Electrification",
                        description: "B2B market explodes",
                        probability: 0.2,
                        impacts: {
                            channelSpecific: { marketShareIncrease: 20 },
                            omnichannel: { marketShareDecrease: 10 }
                        }
                    }
                ]
            },
            year3: {
                major: [
                    {
                        id: "supply_chain_energy_crisis",
                        name: "Global Supply Chain Crisis + Energy Price Surge",
                        description: "Interconnected impact across all systems",
                        probability: 0.2,
                        impacts: {
                            industry4: { efficiencyAdvantage: 20 },
                            legacy: { costInflation: 35 },
                            multiCloud: { costIncrease: 30 },
                            onPremise: { costAdvantage: true },
                            value: { marketShareIncrease: 25 }
                        }
                    },
                    {
                        id: "cybersecurity_crackdown",
                        name: "Cybersecurity Mega-Breach + Regulatory Crackdown",
                        description: "Security becomes mandatory requirement",
                        probability: 0.2,
                        impacts: {
                            basic: { forcedUpgrade: 40, businessShutdown: true },
                            zeroTrust: { marketShareIncrease: 20 },
                            tesla: { satisfactionDecrease: 30 }
                        }
                    }
                ]
            },
            year4: {
                major: [
                    {
                        id: "autonomous_vehicle_revolution",
                        name: "Autonomous Vehicle Revolution + Insurance Disruption",
                        description: "Connected vehicles become mandatory",
                        probability: 0.2,
                        impacts: {
                            realtime: { legalRequirement: true, revenueIncrease: 500 },
                            connected: { insuranceDiscount: 50 },
                            channelSpecific: { obsolescence: true },
                            omnichannel: { dominance: true }
                        }
                    },
                    {
                        id: "recession_market_maturation",
                        name: "Global Recession + EV Market Maturation",
                        description: "Market bifurcates into premium and ultra-value",
                        probability: 0.2,
                        impacts: {
                            toyota: { marketSqueeze: true },
                            industry4: { survivalNecessity: true },
                            legacy: { marginErosion: 40 }
                        }
                    }
                ]
            }
        };
    }

    // Initialize dependency rules
    initializeDependencies() {
        return {
            hard: [
                {
                    condition: (decisions) => decisions.brandPositioning === 'tesla',
                    requires: (decisions) => decisions.smartFactory === 'industry4' || decisions.iotTelemetry === 'realtime',
                    message: 'Tesla-like Innovation requires Industry 4.0 OR Real-time Vehicle Data'
                },
                {
                    condition: (decisions) => decisions.dataPlatform === 'lakehouse',
                    requires: (decisions) => ['singleCloud', 'multiCloud', 'hybrid'].includes(decisions.cloudStrategy),
                    message: 'Data Lakehouse requires Single/Multi/Hybrid Cloud'
                },
                {
                    condition: (decisions) => decisions.iotTelemetry === 'realtime',
                    requires: (decisions) => decisions.dataPlatform === 'lakehouse' && 
                                          ['zeroTrust', 'hybrid'].includes(decisions.security),
                    message: 'Real-time Vehicle Data requires Data Lakehouse + Zero-trust/Hybrid Security'
                },
                {
                    condition: (decisions) => decisions.businessIntelligence === 'generative',
                    requires: (decisions) => decisions.dataPlatform === 'lakehouse',
                    message: 'Generative BI requires Data Lakehouse'
                },
                {
                    condition: (decisions) => decisions.marketingTech === 'aiPersonalization',
                    requires: (decisions) => decisions.dataPlatform === 'lakehouse',
                    message: 'AI Personalization requires Data Lakehouse'
                },
                {
                    condition: (decisions) => decisions.serviceNetwork === 'predictive',
                    requires: (decisions) => ['lakehouse', 'warehouse'].includes(decisions.dataPlatform),
                    message: 'Predictive Planning requires Data Lakehouse OR Traditional Data Warehouse'
                }
            ],
            soft: [
                {
                    condition: (decisions) => decisions.customerJourney === 'omnichannel' && 
                                            !['singleCloud', 'multiCloud', 'hybrid'].includes(decisions.cloudStrategy),
                    penalty: { customerSatisfaction: -40 },
                    message: 'Omnichannel Experience without Cloud reduces effectiveness by 40%'
                },
                {
                    condition: (decisions) => decisions.smartFactory === 'industry4' && 
                                            decisions.security !== 'zeroTrust',
                    penalty: { all: -30 },
                    message: 'Industry 4.0 without Zero-trust Security creates 30% cyber risk penalty'
                },
                {
                    condition: (decisions) => decisions.qualitySystem === 'automated' && 
                                            decisions.smartFactory !== 'industry4',
                    penalty: { profitability: -25 },
                    message: 'Automated QC without Industry 4.0 reduces efficiency gains by 25%'
                }
            ]
        };
    }

    // CORE KPI CALCULATION ENGINE
    calculateKPIs(teamData, year, marketEvents = []) {
        const decisions = teamData.decisions[`year${year}`];
        if (!decisions) return null;

        const kpis = {
            marketShare: this.calculateMarketShare(decisions, year, marketEvents, teamData),
            revenue: this.calculateRevenue(decisions, year, marketEvents, teamData),
            profitability: this.calculateProfitability(decisions, year, marketEvents, teamData),
            customerSatisfaction: this.calculateCustomerSatisfaction(decisions, year, marketEvents, teamData),
            roic: this.calculateROIC(decisions, year, marketEvents, teamData)
        };

        // Apply market event impacts
        kpis = this.applyMarketEventImpacts(kpis, decisions, marketEvents);
        
        // Apply soft dependency penalties
        kpis = this.applySoftDependencyPenalties(kpis, decisions);

        return this.roundKPIs(kpis);
    }

    calculateMarketShare(decisions, year, marketEvents, teamData) {
        let marketShare = 5; // Base starting position

        // Decision impacts
        if (decisions.qualitySystem?.value === 'automated') {
            marketShare += 1; // Immediate impact
        }

        if (decisions.customerJourney?.value === 'omnichannel') {
            marketShare += 3; // Immediate impact
        }

        if (decisions.brandPositioning?.value === 'tesla' && year > 1) {
            marketShare += 4; // Delayed to Year 2
        }

        if (decisions.iotTelemetry?.value === 'realtime' && year >= 3) {
            marketShare += 2; // Years 3-4 impact
        }

        if (decisions.dataPlatform?.value === 'lakehouse' && year >= 2) {
            marketShare += 1; // Year 2+ impact
        }

        if (decisions.smartFactory?.value === 'industry4' && year >= 2) {
            marketShare += 2; // Delayed impact due to implementation time
        }

        // Brand positioning base effects
        if (decisions.brandPositioning?.value === 'value') {
            marketShare += 2; // Value leadership gains base share
        }

        return Math.max(0, Math.min(50, marketShare)); // Cap between 0-50%
    }

    calculateRevenue(decisions, year, marketEvents, teamData) {
        let revenue = 800; // Base ₹800Cr

        // Calculate market share impact on revenue
        const marketShare = this.calculateMarketShare(decisions, year, marketEvents, teamData);
        revenue = revenue * (1 + marketShare / 100); // Revenue scales with market share

        // Decision-specific revenue impacts
        if (decisions.customerJourney?.value === 'omnichannel') {
            revenue *= 1.08; // 8% increase all years
        }

        if (decisions.brandPositioning?.value === 'tesla' && year >= 3) {
            revenue *= 1.15; // 15% increase Years 3-4
        }

        if (decisions.iotTelemetry?.value === 'realtime' && year >= 3) {
            revenue *= 1.12; // 12% increase Years 3-4 (data monetization)
        }

        if (decisions.serviceNetwork?.value === 'predictive' && year >= 2) {
            revenue *= 1.06; // 6% increase from better service
        }

        if (decisions.marketingTech?.value === 'aiPersonalization' && year >= 2) {
            revenue *= 1.10; // 10% increase from personalization
        }

        return Math.round(revenue);
    }

    calculateProfitability(decisions, year, marketEvents, teamData) {
        let profitability = 0; // Base 0%

        // Decision impacts
        if (decisions.qualitySystem?.value === 'automated') {
            profitability += 8; // All years
        }

        if (decisions.smartFactory?.value === 'industry4') {
            if (year === 1) {
                profitability -= 8; // Initial investment cost
            } else if (year >= 3) {
                profitability += 15; // Benefits in Years 3-4
            }
        }

        if (decisions.dataPlatform?.value === 'lakehouse' && year >= 2) {
            profitability += 7; // Years 2-4 benefits
        }

        if (decisions.customerJourney?.value === 'omnichannel' && year >= 2) {
            profitability += 5; // Years 2-4 efficiency gains
        }

        if (decisions.brandPositioning?.value === 'tesla') {
            if (year <= 2) {
                profitability -= 12; // High initial investment
            } else {
                profitability += 20; // High returns in Years 3-4
            }
        }

        // Cost structure impacts
        if (decisions.erpStrategy?.value === 'sapOnPrem') {
            profitability -= 3; // Higher maintenance costs
        }

        if (decisions.cloudStrategy?.value === 'onPremise') {
            profitability -= 2; // Higher infrastructure costs
        }

        return Math.max(-30, Math.min(25, profitability)); // Cap between -30% to 25%
    }

    calculateCustomerSatisfaction(decisions, year, marketEvents, teamData) {
        let satisfaction = 60; // Base 60%

        // Decision impacts
        if (decisions.qualitySystem?.value === 'automated') {
            satisfaction += 12; // Immediate impact
        }

        if (decisions.customerJourney?.value === 'omnichannel') {
            satisfaction += 18; // Immediate impact
        }

        if (decisions.brandPositioning?.value === 'tesla' && year >= 2) {
            satisfaction += 20; // Years 2-4
        }

        if (decisions.security?.value === 'zeroTrust') {
            satisfaction += 10; // Year 1 trust factor
        }

        if (decisions.iotTelemetry?.value === 'realtime' && year >= 2) {
            satisfaction += 8; // Years 2-4 connected features
        }

        if (decisions.serviceNetwork?.value === 'predictive' && year >= 2) {
            satisfaction += 12; // Years 2-4 better service
        }

        // Brand positioning base effects
        if (decisions.brandPositioning?.value === 'toyota') {
            satisfaction += 10; // Reliability focus
        }

        if (decisions.brandPositioning?.value === 'value') {
            satisfaction += 5; // Affordability appeal
        }

        return Math.max(0, Math.min(100, satisfaction)); // Cap between 0-100%
    }

    calculateROIC(decisions, year, marketEvents, teamData) {
        let roic = 10; // Base 10%

        // Calculate total investment
        let totalInvestment = 0;
        for (let y = 1; y <= year; y++) {
            if (teamData.totalBudgetUsed && teamData.totalBudgetUsed[`year${y}`]) {
                totalInvestment += teamData.totalBudgetUsed[`year${y}`];
            }
        }

        // Decision-specific ROIC impacts
        if (decisions.iotTelemetry?.value === 'realtime' && year >= 4) {
            roic = 55; // Highest ROIC by Year 4
        } else if (decisions.dataPlatform?.value === 'lakehouse' && year >= 3) {
            roic = 45; // High data platform returns
        } else if (decisions.smartFactory?.value === 'industry4' && year >= 3) {
            roic = 40; // Manufacturing efficiency returns
        } else if (decisions.businessIntelligence?.value === 'generative' && year >= 2) {
            roic = 35; // AI-driven insights returns
        } else if (year >= 3) {
            roic = 25; // Basic investments mature
        }

        // Adjust for investment level
        if (totalInvestment > 300) { // High investment strategy
            roic *= 1.2; // Higher returns for bigger bets
        } else if (totalInvestment < 200) { // Conservative strategy
            roic *= 0.8; // Lower returns for conservative approach
        }

        return Math.max(0, Math.min(50, roic)); // Cap between 0-50%
    }

    // MARKET EVENTS SYSTEM
    triggerMarketEvents(year, allTeamsData) {
        const yearEvents = this.marketEvents[`year${year}`];
        if (!yearEvents) return [];

        let triggeredEvents = [];

        // Major events (20% probability each)
        yearEvents.major.forEach(event => {
            if (Math.random() < event.probability) {
                triggeredEvents.push(event);
            }
        });

        // Minor events (60% probability each)
        if (yearEvents.minor) {
            yearEvents.minor.forEach(event => {
                if (Math.random() < event.probability) {
                    triggeredEvents.push(event);
                }
            });
        }

        // Decision-triggered events
        const decisionEvents = this.checkDecisionTriggeredEvents(year, allTeamsData);
        triggeredEvents.push(...decisionEvents);

        return triggeredEvents;
    }

    checkDecisionTriggeredEvents(year, allTeamsData) {
        const triggeredEvents = [];
        const teamChoices = {};

        // Analyze all team decisions
        Object.keys(allTeamsData).forEach(teamId => {
            const team = allTeamsData[teamId];
            if (team.decisions && team.decisions[`year${year}`]) {
                const decisions = team.decisions[`year${year}`];
                Object.keys(decisions).forEach(category => {
                    if (!teamChoices[category]) teamChoices[category] = {};
                    const choice = decisions[category]?.value;
                    if (choice) {
                        teamChoices[category][choice] = (teamChoices[category][choice] || 0) + 1;
                    }
                });
            }
        });

        // Check for decision-triggered events
        const totalTeams = Object.keys(allTeamsData).length;

        // If >50% choose Industry 4.0
        if (teamChoices.smartFactory?.industry4 > totalTeams * 0.5) {
            triggeredEvents.push({
                id: "industry4_talent_war",
                name: "Industry 4.0 Talent War Begins",
                description: "Implementation costs increase due to talent shortage",
                impacts: {
                    industry4: { costIncrease: 5 }
                }
            });
        }

        // If >50% choose Tesla-like Innovation
        if (teamChoices.brandPositioning?.tesla > totalTeams * 0.5) {
            triggeredEvents.push({
                id: "tesla_price_war",
                name: "Tesla Reduces Model Y Price by ₹3L",
                description: "Tesla-like positioning under pressure",
                impacts: {
                    tesla: { marketShareDecrease: 15 },
                    toyota: { marketShareIncrease: 8 },
                    value: { marketShareIncrease: 8 }
                }
            });
        }

        return triggeredEvents;
    }

    applyMarketEventImpacts(kpis, decisions, marketEvents) {
        let modifiedKPIs = { ...kpis };

        marketEvents.forEach(event => {
            if (event.impacts) {
                // Apply impacts based on team's decisions
                Object.keys(event.impacts).forEach(targetDecision => {
                    const impact = event.impacts[targetDecision];
                    
                    // Check if this impact applies to the team
                    const applies = this.doesImpactApply(targetDecision, decisions, impact);
                    
                    if (applies) {
                        modifiedKPIs = this.applyImpact(modifiedKPIs, impact);
                    }
                });
            }
        });

        return modifiedKPIs;
    }

    doesImpactApply(targetDecision, decisions, impact) {
        if (targetDecision === 'all') return true;
        
        // Check if any decision matches the target
        return Object.values(decisions).some(decision => 
            decision?.value === targetDecision
        );
    }

    applyImpact(kpis, impact) {
        const modified = { ...kpis };

        if (impact.marketShareIncrease) {
            modified.marketShare += impact.marketShareIncrease;
        }
        if (impact.marketShareDecrease) {
            modified.marketShare -= impact.marketShareDecrease;
        }
        if (impact.revenueIncrease) {
            modified.revenue *= (1 + impact.revenueIncrease / 100);
        }
        if (impact.revenueDecrease) {
            modified.revenue *= (1 - impact.revenueDecrease / 100);
        }
        if (impact.profitabilityBonus) {
            modified.profitability += impact.profitabilityBonus;
        }
        if (impact.profitabilityDecrease) {
            modified.profitability -= impact.profitabilityDecrease;
        }
        if (impact.customerSatisfactionIncrease) {
            modified.customerSatisfaction += impact.customerSatisfactionIncrease;
        }
        if (impact.customerSatisfactionDecrease) {
            modified.customerSatisfaction -= impact.customerSatisfactionDecrease;
        }

        return modified;
    }

    // DEPENDENCY CHECKING SYSTEM
    checkDependencies(decisions) {
        const violations = [];

        this.dependencies.hard.forEach(rule => {
            if (rule.condition(decisions) && !rule.requires(decisions)) {
                violations.push(rule.message);
            }
        });

        return violations;
    }

    applySoftDependencyPenalties(kpis, decisions) {
        let modified = { ...kpis };

        this.dependencies.soft.forEach(rule => {
            if (rule.condition(decisions)) {
                Object.keys(rule.penalty).forEach(kpi => {
                    if (kpi === 'all') {
                        // Apply to all KPIs
                        Object.keys(modified).forEach(k => {
                            modified[k] *= (1 + rule.penalty[kpi] / 100);
                        });
                    } else if (modified[kpi] !== undefined) {
                        modified[kpi] *= (1 + rule.penalty[kpi] / 100);
                    }
                });
            }
        });

        return modified;
    }

    // COURSE CORRECTION SYSTEM
    calculateCorrectionPenalty(oldDecision, newDecision, year) {
        const oldCost = this.getDecisionCost(oldDecision);
        const newCost = this.getDecisionCost(newDecision);
        
        // Determine correction type based on cost difference
        const costDifference = Math.abs(newCost - oldCost);
        const percentChange = costDifference / oldCost;

        if (percentChange <= 0.25) {
            // Minor adjustment
            return {
                type: 'minor',
                cost: costDifference * 0.5,
                kpiPenalty: 5,
                delayMonths: 6
            };
        } else if (percentChange <= 0.5) {
            // Major pivot
            return {
                type: 'major',
                cost: oldCost * 0.75 + newCost,
                kpiPenalty: 15,
                delayMonths: 12
            };
        } else {
            // Complete overhaul
            return {
                type: 'overhaul',
                cost: oldCost + newCost,
                kpiPenalty: 25,
                delayMonths: 18,
                satisfactionPenalty: 20
            };
        }
    }

    // FINAL SCORING SYSTEM
    calculateFinalScore(teamData) {
        if (!teamData.kpiResults) return 0;

        let totalScore = 0;
        let yearsCompleted = 0;

        // Sum weighted KPIs across all years
        for (let year = 1; year <= 4; year++) {
            const yearKPIs = teamData.kpiResults[`year${year}`];
            if (yearKPIs) {
                const yearScore = 
                    (yearKPIs.marketShare || 0) * this.kpiWeights.marketShare +
                    (yearKPIs.revenue || 0) * 0.001 * this.kpiWeights.revenue + // Scale revenue
                    (yearKPIs.profitability || 0) * this.kpiWeights.profitability +
                    (yearKPIs.customerSatisfaction || 0) * this.kpiWeights.customerSatisfaction +
                    (yearKPIs.roic || 0) * this.kpiWeights.roic;
                
                totalScore += yearScore;
                yearsCompleted++;
            }
        }

        // Apply course correction penalties
        if (teamData.courseCorrections) {
            Object.keys(teamData.courseCorrections).forEach(year => {
                const corrections = teamData.courseCorrections[year];
                if (corrections.corrections) {
                    corrections.corrections.forEach(correction => {
                        totalScore -= correction.penalty;
                    });
                }
            });
        }

        // Normalize by years completed
        if (yearsCompleted > 0) {
            totalScore = totalScore / yearsCompleted * 4; // Scale to 4-year equivalent
        }

        return Math.round(totalScore);
    }

    // UTILITY FUNCTIONS
    getDecisionCost(categoryDecision) {
        const [category, decision] = categoryDecision.split('.');
        return this.decisionCosts[category]?.[decision] || 0;
    }

    roundKPIs(kpis) {
        return {
            marketShare: Math.round(kpis.marketShare * 10) / 10,
            revenue: Math.round(kpis.revenue),
            profitability: Math.round(kpis.profitability * 10) / 10,
            customerSatisfaction: Math.round(kpis.customerSatisfaction),
            roic: Math.round(kpis.roic * 10) / 10
        };
    }

    // STRATEGIC PATH IDENTIFICATION
    identifyTeamStrategy(teamData) {
        if (!teamData.decisions || !teamData.decisions.year1) {
            return 'Unknown Strategy';
        }

        const decisions = teamData.decisions.year1;
        
        // Analyze decision patterns
        const isHighTech = decisions.smartFactory?.value === 'industry4' ||
                          decisions.iotTelemetry?.value === 'realtime' ||
                          decisions.dataPlatform?.value === 'lakehouse';
        
        const isValueFocused = decisions.brandPositioning?.value === 'value' ||
                              decisions.smartFactory?.value === 'legacy';
        
        const isB2BFocused = decisions.brandPositioning?.value === 'toyota' ||
                            decisions.customerJourney?.value === 'channelSpecific';

        // Determine strategy
        if (decisions.brandPositioning?.value === 'tesla' && isHighTech) {
            return 'Urban Pioneer';
        } else if (isB2BFocused && !isValueFocused) {
            return 'B2B Foundation';
        } else if (isValueFocused) {
            return 'Value Leader';
        } else {
            return 'Hybrid Strategy';
        }
    }

    // PERFORMANCE BENCHMARKING
    getBenchmarks(year) {
        const benchmarks = {
            1: {
                marketShare: { min: 5, target: 8, max: 12 },
                revenue: { min: 800, target: 1200, max: 1500 },
                profitability: { min: -5, target: 5, max: 10 },
                customerSatisfaction: { min: 60, target: 75, max: 85 },
                roic: { min: 10, target: 20, max: 30 }
            },
            4: {
                marketShare: { min: 15, target: 25, max: 35 },
                revenue: { min: 2500, target: 3500, max: 4500 },
                profitability: { min: 10, target: 18, max: 25 },
                customerSatisfaction: { min: 65, target: 75, max: 85 },
                roic: { min: 25, target: 35, max: 45 }
            }
        };

        return benchmarks[year] || benchmarks[4];
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VoltaraGameEngine;
} else if (typeof window !== 'undefined') {
    window.VoltaraGameEngine = VoltaraGameEngine;
}
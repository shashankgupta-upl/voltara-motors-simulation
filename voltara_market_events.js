// VOLTARA MOTORS: MARKET EVENTS & COURSE CORRECTION SYSTEM
// Complete implementation of market events, course corrections, and strategic pivots

class VoltaraMarketSystem {
    constructor() {
        this.eventLibrary = this.initializeCompleteEventLibrary();
        this.correctionRules = this.initializeCorrectionRules();
        this.eventHistory = {};
    }

    // COMPREHENSIVE MARKET EVENTS LIBRARY
    initializeCompleteEventLibrary() {
        return {
            year1: {
                major: [
                    {
                        id: "semiconductor_crisis",
                        name: "Global Semiconductor Crisis Intensifies",
                        description: "Global chip shortage reaches critical levels, affecting all manufacturing",
                        category: "supply_chain",
                        probability: 0.20,
                        triggers: ["industry4", "realtime"],
                        impacts: {
                            industry4: {
                                delayMonths: 6,
                                profitabilityChange: -8,
                                message: "Industry 4.0 implementation delayed 6 months, benefits start Year 2"
                            },
                            realtime: {
                                costIncrease: 10,
                                message: "Real-time vehicle data costs increase by ₹10Cr"
                            },
                            legacy: {
                                profitabilityBonus: 15,
                                marketShareBonus: 1.5,
                                message: "Legacy systems gain supply chain advantage"
                            }
                        },
                        globalEffect: {
                            description: "All teams face component shortage risks",
                            adaptationWindow: 30
                        }
                    },
                    {
                        id: "india_china_tensions",
                        name: "India-China Border Tensions Escalate",
                        description: "Geopolitical tensions disrupt supply chains, domestic manufacturing incentivized",
                        category: "geopolitical",
                        probability: 0.20,
                        impacts: {
                            all: {
                                batteryCostIncrease: 25,
                                message: "All players face 25% battery cost increase"
                            },
                            industry4: {
                                profitabilityBonus: 10,
                                message: "Domestic manufacturing incentives benefit advanced factories"
                            },
                            basic: {
                                revenueDecrease: 20,
                                message: "Basic security systems vulnerable to supply disruption"
                            },
                            onPremise: {
                                customerSatisfactionBonus: 10,
                                message: "Data sovereignty becomes competitive advantage"
                            }
                        }
                    },
                    {
                        id: "global_recession",
                        name: "Global Economic Recession Begins",
                        description: "Economic downturn shifts consumer preferences toward value",
                        category: "economic",
                        probability: 0.20,
                        impacts: {
                            tesla: {
                                marketShareDecrease: 25,
                                message: "Premium positioning loses appeal during recession"
                            },
                            value: {
                                marketShareIncrease: 20,
                                revenueIncrease: 15,
                                message: "Value leadership gains significant market share"
                            },
                            highInvestment: {
                                profitabilityDecrease: 15,
                                duration: 2,
                                message: "High-investment strategies face extended payback periods"
                            }
                        }
                    }
                ],
                minor: [
                    {
                        id: "ev_subsidy_extension",
                        name: "Government Announces ₹2L EV Subsidy Extension",
                        description: "Central government extends consumer EV subsidies",
                        probability: 0.60,
                        impacts: {
                            all: { marketShareIncrease: 5 },
                            tesla: { additionalMarketShare: 8 },
                            advancedManufacturing: { qualificationBonus: true }
                        }
                    },
                    {
                        id: "tata_data_breach",
                        name: "Major Data Breach at Tata Motors",
                        description: "High-profile cybersecurity incident raises awareness",
                        probability: 0.60,
                        impacts: {
                            zeroTrust: { customerSatisfactionIncrease: 15 },
                            basic: { customerSatisfactionDecrease: 20 },
                            hybrid: { customerSatisfactionIncrease: 8 }
                        }
                    },
                    {
                        id: "charging_infrastructure_boom",
                        name: "Charging Infrastructure Grows 200% in Tier-2 Cities",
                        description: "Rapid expansion validates connected vehicle strategy",
                        probability: 0.60,
                        impacts: {
                            realtime: { revenueIncrease: 10 },
                            omnichannel: { marketShareIncrease: 5 },
                            basic: { obsolescenceRisk: true }
                        }
                    }
                ]
            },
            year2: {
                major: [
                    {
                        id: "lithium_supply_crisis",
                        name: "Russia-Ukraine Conflict Disrupts Global Lithium Supply",
                        description: "Critical battery materials become scarce and expensive",
                        category: "supply_chain",
                        probability: 0.20,
                        impacts: {
                            all: {
                                batteryCostIncrease: 40,
                                message: "All teams face severe battery cost inflation"
                            },
                            realtime: {
                                delayMonths: 3,
                                message: "Connected vehicle features delayed due to chip shortages"
                            },
                            traditional: {
                                supplyPreference: true,
                                profitabilityBonus: 12,
                                message: "Traditional marketing channels have better supplier relationships"
                            },
                            multiCloud: {
                                restrictionRisk: true,
                                message: "European server restrictions affect multi-cloud strategies"
                            }
                        }
                    },
                    {
                        id: "ai_revolution",
                        name: "ChatGPT Breakthrough Creates AI Revolution",
                        description: "Generative AI transforms business intelligence and personalization",
                        category: "technology",
                        probability: 0.20,
                        impacts: {
                            generative: {
                                effectivenessIncrease: 30,
                                marketAdvantage: true,
                                message: "Generative BI gains massive competitive advantage"
                            },
                            aiPersonalization: {
                                revenueIncrease: 25,
                                customerSatisfactionBonus: 15,
                                message: "AI personalization becomes market differentiator"
                            },
                            manual: {
                                forcedUpgrade: 15,
                                obsolescenceWarning: true,
                                message: "Manual reporting becomes obsolete - forced upgrade required"
                            },
                            standard: {
                                competitiveDisadvantage: 10,
                                message: "Standard BI loses effectiveness compared to AI solutions"
                            }
                        }
                    },
                    {
                        id: "fleet_electrification_mandate",
                        name: "Government Mandates 30% Fleet Electrification by 2026",
                        description: "B2B market explodes as commercial mandates take effect",
                        category: "regulatory",
                        probability: 0.20,
                        impacts: {
                            channelSpecific: {
                                marketShareIncrease: 20,
                                revenueIncrease: 30,
                                message: "B2B-focused strategy captures exploding commercial market"
                            },
                            omnichannel: {
                                marketShareDecrease: 10,
                                message: "Consumer-focused omnichannel loses share to B2B specialists"
                            },
                            toyota: {
                                brandAdvantage: true,
                                marketShareIncrease: 15,
                                message: "Reliability positioning perfect for fleet customers"
                            },
                            predictive: {
                                essentialCapability: true,
                                revenueIncrease: 20,
                                message: "Predictive maintenance becomes essential for fleet management"
                            }
                        }
                    }
                ],
                minor: [
                    {
                        id: "byd_india_entry",
                        name: "BYD Enters Indian Market Aggressively",
                        description: "Chinese EV giant launches competitive pricing strategy",
                        probability: 0.60,
                        impacts: {
                            value: { marketShareDecrease: 15, competitivePressure: true },
                            tesla: { marketShareIncrease: 5, premiumAdvantage: true },
                            toyota: { marketShareIncrease: 5, reliabilityAdvantage: true },
                            traditional: { resistanceBonus: 8 }
                        }
                    },
                    {
                        id: "5g_rollout_acceleration",
                        name: "5G Network Rollout Accelerates Nationwide",
                        description: "Enhanced connectivity enables new vehicle features",
                        probability: 0.60,
                        impacts: {
                            realtime: { effectivenessDoubling: true, costReduction: 50 },
                            basic: { connectivityGap: true },
                            iot: { newFeaturesUnlocked: true }
                        }
                    },
                    {
                        id: "skilled_labor_shortage",
                        name: "Skilled Labor Shortage Hits Automotive Sector",
                        description: "Engineering talent becomes scarce and expensive",
                        probability: 0.60,
                        impacts: {
                            industry4: { implementationDelay: 3, talentPremium: 20 },
                            manual: { costInflation: 20, inefficiencyIncrease: true },
                            automated: { valueProven: true, roicBonus: 15 }
                        }
                    }
                ]
            },
            year3: {
                major: [
                    {
                        id: "supply_chain_energy_crisis",
                        name: "Global Supply Chain Crisis + Energy Price Surge",
                        description: "Compound crisis creates interconnected impacts across all systems",
                        category: "compound_crisis",
                        probability: 0.20,
                        interconnectedImpacts: {
                            manufacturing: {
                                industry4: { efficiencyAdvantage: 20, energySavings: 25 },
                                legacy: { costInflation: 35, energyVulnerability: true }
                            },
                            infrastructure: {
                                multiCloud: { costIncrease: 30, energyPenalty: true },
                                onPremise: { costAdvantage: true, controlBenefit: 15 },
                                singleCloud: { performanceReduction: 40 }
                            },
                            market: {
                                value: { marketShareIncrease: 25, demandSurge: true },
                                tesla: { luxuryPenalty: 20 }
                            },
                            cascadeEffects: {
                                highCostStrategies: { compoundPenalties: true },
                                predictive: { supplyChainAdvantage: 15 }
                            }
                        }
                    },
                    {
                        id: "cybersecurity_crackdown",
                        name: "Mega Cybersecurity Breach + Regulatory Crackdown",
                        description: "Security becomes mandatory, not optional",
                        category: "security_crisis",
                        probability: 0.20,
                        mandatoryUpgrades: {
                            basic: {
                                forcedUpgrade: 40,
                                businessShutdownRisk: true,
                                message: "Basic security insufficient - mandatory upgrade or shutdown"
                            },
                            perimeter: {
                                complianceGap: 25,
                                forcedUpgrade: 20,
                                message: "Perimeter security requires immediate modernization"
                            }
                        },
                        competitiveAdvantages: {
                            zeroTrust: {
                                marketShareCapture: 20,
                                trustPremium: 30,
                                message: "Zero-trust architecture captures market from failed competitors"
                            },
                            hybrid: {
                                moderateAdvantage: 10,
                                complianceMeeting: true
                            }
                        },
                        crossCategoryImpacts: {
                            tesla: {
                                brandDamage: 30,
                                conditionedOn: "inadequateSecurity",
                                message: "Innovation brand damaged if security inadequate"
                            },
                            generative: {
                                complianceRequired: true,
                                effectivenessReduction: 50,
                                message: "AI systems require security certification"
                            }
                        }
                    },
                    {
                        id: "ai_regulation_sovereignty",
                        name: "AI Regulation + Data Sovereignty Laws",
                        description: "Government restricts AI usage and mandates data localization",
                        category: "regulatory_restriction",
                        probability: 0.20,
                        restrictiveImpacts: {
                            dataLocalization: {
                                multiCloud: { forcedMigration: 30, compliance: "onPremise" },
                                singleCloud: { restrictionRisk: true },
                                onPremise: { complianceAdvantage: true }
                            },
                            aiLimitations: {
                                generative: { usageRestriction: 50, complianceRequired: true },
                                aiPersonalization: { 
                                    illegalStatus: true, 
                                    forcedSwitch: "traditional",
                                    penaltyCost: 20
                                }
                            },
                            manufacturingImpacts: {
                                industry4: { aiFeatureRestriction: true, benefitsReduction: 30 }
                            },
                            marketSegmentation: {
                                b2b: { complianceDemand: true },
                                channelSpecific: { advantageOverOmnichannel: 20 }
                            }
                        }
                    }
                ],
                minor: [
                    {
                        id: "talent_automation_convergence",
                        name: "Skilled Labor Crisis Meets Automation Boom",
                        description: "Human resource shortage accelerates automation adoption",
                        probability: 0.60,
                        impacts: {
                            manual: { costIncrease: 60, viabilityThreat: true },
                            automated: { roicIncrease: 200, paybackAcceleration: true },
                            industry4: { licensingOpportunity: true, additionalRevenue: 15 }
                        }
                    },
                    {
                        id: "privacy_awakening",
                        name: "Consumer Data Privacy Awakening",
                        description: "Customers become protective of personal data",
                        probability: 0.60,
                        impacts: {
                            realtime: { adoptionResistance: 20, consentRequired: true },
                            wordOfMouth: { effectivenessIncrease: 30, trustAdvantage: true },
                            aiPersonalization: { targetingReduction: 40 }
                        }
                    }
                ]
            },
            year4: {
                major: [
                    {
                        id: "autonomous_vehicle_revolution",
                        name: "Autonomous Vehicle Revolution + Insurance Industry Disruption",
                        description: "Connected vehicles become legally mandated, insurance transforms",
                        category: "technology_mandate",
                        probability: 0.20,
                        mandatoryRequirements: {
                            realtime: {
                                legalRequirement: true,
                                forcedUpgrade: 60,
                                message: "Real-time vehicle data becomes legal requirement"
                            },
                            none: {
                                marketExit: true,
                                message: "Non-connected vehicles banned from sale"
                            }
                        },
                        massiveAdvantages: {
                            realtime: {
                                revenueIncrease: 500,
                                insuranceDiscount: 50,
                                dataMonetization: true,
                                message: "Connected vehicles enable massive new revenue streams"
                            },
                            zeroTrust: {
                                architectureRequirement: true,
                                securityPremium: 25
                            },
                            multiCloud: {
                                scalingAdvantage: true,
                                autonomousSupport: 30
                            }
                        },
                        industryReshaping: {
                            channelSpecific: {
                                obsolescence: true,
                                dealerElimination: 80,
                                message: "Traditional dealers become obsolete"
                            },
                            omnichannel: {
                                dominance: true,
                                marketCapture: 40,
                                message: "Digital-first strategies dominate new landscape"
                            },
                            tesla: {
                                tableStakes: true,
                                innovationBaseline: true,
                                message: "Tesla-like innovation becomes minimum requirement"
                            }
                        }
                    },
                    {
                        id: "recession_market_maturation",
                        name: "Global Economic Recession + EV Market Maturation",
                        description: "Market consolidates into premium and ultra-value segments",
                        category: "market_bifurcation",
                        probability: 0.20,
                        marketRestructuring: {
                            segmentDominance: {
                                tesla: { premiumSegment: true, marketShare: 35 },
                                value: { ultraValueSegment: true, marketShare: 40 },
                                toyota: { marketSqueeze: true, shareErosion: 60 }
                            },
                            survivalRequirements: {
                                industry4: {
                                    survivalNecessity: true,
                                    message: "Advanced manufacturing becomes survival requirement"
                                },
                                legacy: {
                                    marginErosion: 40,
                                    viabilityThreat: true,
                                    message: "Legacy systems face extinction"
                                }
                            },
                            infrastructureStress: {
                                onPremise: {
                                    fixedCostDisadvantage: true,
                                    scalingInability: 35
                                },
                                cloud: {
                                    flexibilityAdvantage: true,
                                    costOptimization: 25
                                }
                            },
                            winnerTakeAll: {
                                marketLeaders: { shareCapture: 60 },
                                weakPlayers: { forcedMergers: true }
                            }
                        }
                    },
                    {
                        id: "climate_resource_nationalism",
                        name: "Climate Crisis + Resource Wars + Technology Nationalism",
                        description: "Maximum complexity scenario with conflicting forces",
                        category: "maximum_complexity",
                        probability: 0.20,
                        conflictingForces: {
                            resourceScarcity: {
                                lithiumShortage: { domesticAdvantage: true },
                                chipWars: { localManufacturingPremium: 40 }
                            },
                            technologyBorders: {
                                cloudRestrictions: {
                                    multiCloud: { crossBorderBan: true, liability: 50 },
                                    singleCloud: { domesticPreference: true },
                                    hybrid: { complianceAdvantage: 25 }
                                },
                                aiLockdown: {
                                    generative: { capabilityBan: true },
                                    standard: { maximumAllowed: true, advantage: 30 }
                                }
                            },
                            supplyChainNationalism: {
                                localSourcing: { mandatoryRequirement: true },
                                globalClouds: { restrictedAccess: true },
                                onPremise: { sovereigntyAdvantage: 35 }
                            },
                            strategyReversal: {
                                previousWinners: { strandedInvestments: true },
                                adaptableStrategies: { survivalAdvantage: true },
                                balancedApproaches: { resilienceReward: 25 }
                            }
                        }
                    }
                ],
                minor: [
                    {
                        id: "quantum_computing_breakthrough",
                        name: "Quantum Computing Breakthrough Threatens Encryption",
                        description: "All existing security becomes vulnerable overnight",
                        probability: 0.40,
                        impacts: {
                            all: { quantumUpgrade: 30, securityObsolescence: true },
                            generative: { quantumAcceleration: 500, performanceBoost: true },
                            cloud: { serviceDisruption: 6, quantumMigration: true }
                        }
                    },
                    {
                        id: "algorithm_changes",
                        name: "Social Media Algorithm Changes Devastate Digital Marketing",
                        description: "Platform algorithm updates destroy marketing effectiveness",
                        probability: 0.60,
                        impacts: {
                            aiPersonalization: { effectivenessReduction: 60 },
                            wordOfMouth: { organicAdvantage: true, reachIncrease: 150 },
                            traditional: { reliabilityAdvantage: true }
                        }
                    }
                ]
            }
        };
    }

    // COURSE CORRECTION SYSTEM
    initializeCorrectionRules() {
        return {
            penaltyCalculation: {
                minor: {
                    threshold: 0.25, // 25% strategy change
                    costMultiplier: 0.5,
                    kpiPenalty: 5,
                    delayMonths: 6,
                    description: "Minor strategic adjustment"
                },
                major: {
                    threshold: 0.5, // 50% strategy change
                    costMultiplier: 0.75,
                    kpiPenalty: 15,
                    delayMonths: 12,
                    integrationRisk: 0.2, // 20% chance of additional penalty
                    description: "Major strategic pivot"
                },
                overhaul: {
                    threshold: 1.0, // Complete strategy change
                    costMultiplier: 1.0,
                    kpiPenalty: 25,
                    delayMonths: 18,
                    satisfactionPenalty: 20,
                    executiveRisk: 0.3, // 30% chance of CEO resignation penalty
                    description: "Complete strategic overhaul"
                }
            },
            mitigationOpportunities: {
                marketDriven: {
                    penaltyReduction: 0.4, // 40% penalty reduction
                    triggerWindow: 30, // 30 days after major event
                    applicableEvents: ["major", "crisis", "disruption"]
                },
                adaptiveLeadership: {
                    bonusThreshold: 0.6, // >60% successful pivots
                    customerSatisfactionBonus: 5,
                    roicBonus: 5
                }
            }
        };
    }

    // MARKET EVENT TRIGGERING SYSTEM
    triggerEventsForYear(year, allTeamsData) {
        const yearEvents = this.eventLibrary[`year${year}`];
        if (!yearEvents) return [];

        let triggeredEvents = [];

        // Major events (probability-based)
        yearEvents.major.forEach(event => {
            if (Math.random() < event.probability) {
                triggeredEvents.push(this.processEvent(event, allTeamsData));
            }
        });

        // Ensure at least one major event in later years
        if (year >= 3 && triggeredEvents.filter(e => e.category !== 'minor').length === 0) {
            const forcedEvent = yearEvents.major[Math.floor(Math.random() * yearEvents.major.length)];
            triggeredEvents.push(this.processEvent(forcedEvent, allTeamsData));
        }

        // Minor events (higher probability)
        yearEvents.minor.forEach(event => {
            if (Math.random() < event.probability) {
                triggeredEvents.push(this.processEvent(event, allTeamsData));
            }
        });

        // Decision-triggered events
        const decisionEvents = this.checkCollectiveDecisionTriggers(year, allTeamsData);
        triggeredEvents.push(...decisionEvents);

        // Store event history
        this.eventHistory[`year${year}`] = triggeredEvents;

        return triggeredEvents;
    }

    processEvent(event, allTeamsData) {
        // Add contextual information based on current game state
        const processedEvent = {
            ...event,
            triggeredAt: new Date().toISOString(),
            affectedTeams: this.calculateAffectedTeams(event, allTeamsData),
            severity: this.calculateEventSeverity(event, allTeamsData)
        };

        return processedEvent;
    }

    calculateAffectedTeams(event, allTeamsData) {
        const affected = [];
        
        Object.keys(allTeamsData).forEach(teamId => {
            const team = allTeamsData[teamId];
            if (this.isTeamAffected(event, team)) {
                affected.push(teamId);
            }
        });

        return affected;
    }

    isTeamAffected(event, teamData) {
        if (!teamData.decisions) return false;

        // Check if team's decisions make them vulnerable to this event
        const currentDecisions = teamData.decisions[`year${teamData.currentYear || 1}`];
        if (!currentDecisions) return false;

        return Object.keys(event.impacts).some(impactKey => {
            if (impactKey === 'all') return true;
            
            return Object.values(currentDecisions).some(decision => 
                decision?.value === impactKey
            );
        });
    }

    calculateEventSeverity(event, allTeamsData) {
        const affectedCount = this.calculateAffectedTeams(event, allTeamsData).length;
        const totalTeams = Object.keys(allTeamsData).length;
        const affectedPercentage = affectedCount / totalTeams;

        if (affectedPercentage > 0.7) return 'high';
        if (affectedPercentage > 0.3) return 'medium';
        return 'low';
    }

    checkCollectiveDecisionTriggers(year, allTeamsData) {
        const triggeredEvents = [];
        const decisionCounts = this.analyzeCollectiveDecisions(allTeamsData, year);
        const totalTeams = Object.keys(allTeamsData).length;

        // Industry 4.0 Talent War
        if (decisionCounts.smartFactory?.industry4 > totalTeams * 0.5) {
            triggeredEvents.push({
                id: "industry4_talent_war",
                name: "Industry 4.0 Talent War Intensifies",
                description: "High adoption creates engineering talent shortage",
                category: "decision_triggered",
                impacts: {
                    industry4: { costIncrease: 5, implementationDelay: 2 }
                }
            });
        }

        // Tesla Positioning Saturation
        if (decisionCounts.brandPositioning?.tesla > totalTeams * 0.5) {
            triggeredEvents.push({
                id: "tesla_positioning_saturation",
                name: "Tesla-like Positioning Market Saturation",
                description: "Too many players pursuing same strategy",
                category: "decision_triggered",
                impacts: {
                    tesla: { marketShareDecrease: 15, brandDilution: true },
                    toyota: { marketShareIncrease: 8 },
                    value: { marketShareIncrease: 8 }
                }
            });
        }

        // Cloud Vendor Capacity Crisis
        if ((decisionCounts.cloudStrategy?.singleCloud + decisionCounts.cloudStrategy?.multiCloud) > totalTeams * 0.7) {
            triggeredEvents.push({
                id: "cloud_capacity_crisis",
                name: "Cloud Vendor Capacity Crisis",
                description: "High cloud adoption strains vendor capacity",
                category: "decision_triggered",
                impacts: {
                    singleCloud: { serviceDelays: 3, costIncrease: 15 },
                    multiCloud: { complexityIncrease: 25 },
                    onPremise: { competitiveAdvantage: 20 }
                }
            });
        }

        return triggeredEvents;
    }

    analyzeCollectiveDecisions(allTeamsData, year) {
        const counts = {};

        Object.values(allTeamsData).forEach(team => {
            if (team.decisions && team.decisions[`year${year}`]) {
                const decisions = team.decisions[`year${year}`];
                
                Object.keys(decisions).forEach(category => {
                    if (decisions[category]?.value) {
                        if (!counts[category]) counts[category] = {};
                        const choice = decisions[category].value;
                        counts[category][choice] = (counts[category][choice] || 0) + 1;
                    }
                });
            }
        });

        return counts;
    }

    // COURSE CORRECTION SYSTEM
    calculateCorrectionPenalty(fromDecision, toDecision, currentYear, marketContext) {
        const changeIntensity = this.calculateChangeIntensity(fromDecision, toDecision);
        const correctionType = this.determineCorrectionType(changeIntensity);
        const basePenalty = this.correctionRules.penaltyCalculation[correctionType];

        // Calculate costs
        const oldCost = fromDecision.cost || 0;
        const newCost = toDecision.cost || 0;
        const correctionCost = oldCost * basePenalty.costMultiplier + newCost;

        // Apply market-driven mitigation
        const mitigation = this.checkMarketDrivenMitigation(marketContext, currentYear);
        const finalPenalty = this.applyMitigation(basePenalty, mitigation);

        return {
            type: correctionType,
            cost: Math.round(correctionCost),
            kpiPenalty: finalPenalty.kpiPenalty,
            delayMonths: finalPenalty.delayMonths,
            additionalEffects: this.calculateAdditionalEffects(correctionType, basePenalty),
            mitigation: mitigation,
            description: this.generateCorrectionDescription(fromDecision, toDecision, correctionType)
        };
    }

    calculateChangeIntensity(fromDecision, toDecision) {
        // Analyze the magnitude of strategic change
        const costDelta = Math.abs((toDecision.cost || 0) - (fromDecision.cost || 0));
        const oldCost = fromDecision.cost || 1;
        
        return costDelta / oldCost;
    }

    determineCorrectionType(changeIntensity) {
        const rules = this.correctionRules.penaltyCalculation;
        
        if (changeIntensity <= rules.minor.threshold) return 'minor';
        if (changeIntensity <= rules.major.threshold) return 'major';
        return 'overhaul';
    }

    checkMarketDrivenMitigation(marketContext, currentYear) {
        // Check if recent market events justify reduced penalties
        const recentEvents = this.eventHistory[`year${currentYear}`] || [];
        const majorCrises = recentEvents.filter(event => 
            event.category === 'crisis' || event.severity === 'high'
        );

        if (majorCrises.length > 0) {
            return {
                type: 'crisis_response',
                reduction: this.correctionRules.mitigationOpportunities.marketDriven.penaltyReduction,
                reason: `Strategic pivot justified by ${majorCrises[0].name}`
            };
        }

        return null;
    }

    applyMitigation(basePenalty, mitigation) {
        if (!mitigation) return basePenalty;

        return {
            ...basePenalty,
            kpiPenalty: Math.round(basePenalty.kpiPenalty * (1 - mitigation.reduction)),
            delayMonths: Math.round(basePenalty.delayMonths * (1 - mitigation.reduction))
        };
    }

    calculateAdditionalEffects(correctionType, basePenalty) {
        const effects = [];

        if (correctionType === 'major' && basePenalty.integrationRisk) {
            if (Math.random() < basePenalty.integrationRisk) {
                effects.push({
                    type: 'integration_failure',
                    impact: 'Additional 10% KPI penalty for 6 months',
                    kpiPenalty: 10,
                    duration: 6
                });
            }
        }

        if (correctionType === 'overhaul' && basePenalty.executiveRisk) {
            if (Math.random() < basePenalty.executiveRisk) {
                effects.push({
                    type: 'ceo_resignation',
                    impact: 'Leadership change creates additional market uncertainty',
                    customerSatisfactionPenalty: 15,
                    duration: 12
                });
            }
        }

        return effects;
    }

    generateCorrectionDescription(fromDecision, toDecision, correctionType) {
        const descriptions = {
            minor: `Adjusting from ${fromDecision.name} to ${toDecision.name} - minor strategic refinement`,
            major: `Pivoting from ${fromDecision.name} to ${toDecision.name} - significant strategic change`,
            overhaul: `Complete transformation from ${fromDecision.name} to ${toDecision.name} - fundamental business model change`
        };

        return descriptions[correctionType];
    }

    // STRATEGIC ANALYSIS TOOLS
    analyzeTeamResilience(teamData, currentYear) {
        const decisions = teamData.decisions[`year${currentYear}`];
        if (!decisions) return { score: 0, vulnerabilities: [], strengths: [] };

        const vulnerabilities = [];
        const strengths = [];
        let resilienceScore = 50; // Base score

        // Analyze technology stack resilience
        if (decisions.security?.value === 'basic') {
            vulnerabilities.push('Cybersecurity vulnerability');
            resilienceScore -= 15;
        } else if (decisions.security?.value === 'zeroTrust') {
            strengths.push('Strong cybersecurity foundation');
            resilienceScore += 10;
        }

        // Analyze supply chain resilience
        if (decisions.smartFactory?.value === 'legacy') {
            vulnerabilities.push('Supply chain inflexibility');
            resilienceScore -= 10;
        } else if (decisions.smartFactory?.value === 'industry4') {
            strengths.push('Advanced manufacturing resilience');
            resilienceScore += 15;
        }

        // Analyze market positioning resilience
        if (decisions.brandPositioning?.value === 'tesla') {
            vulnerabilities.push('Premium market volatility risk');
            resilienceScore -= 5;
        } else if (decisions.brandPositioning?.value === 'value') {
            strengths.push('Recession-resistant positioning');
            resilienceScore += 8;
        }

        return {
            score: Math.max(0, Math.min(100, resilienceScore)),
            vulnerabilities,
            strengths,
            recommendation: this.generateResilienceRecommendation(resilienceScore, vulnerabilities)
        };
    }

    generateResilienceRecommendation(score, vulnerabilities) {
        if (score >= 70) {
            return "Strong strategic foundation with good crisis resilience";
        } else if (score >= 50) {
            return `Moderate resilience. Consider addressing: ${vulnerabilities.slice(0, 2).join(', ')}`;
        } else {
            return `High vulnerability to market shocks. Priority fixes needed: ${vulnerabilities.join(', ')}`;
        }
    }

    // EVENT IMPACT PREDICTION
    predictEventImpact(event, teamData) {
        const currentDecisions = teamData.decisions[`year${teamData.currentYear || 1}`];
        if (!currentDecisions) return null;

        const predictions = [];

        Object.keys(event.impacts).forEach(impactKey => {
            const impact = event.impacts[impactKey];
            const applies = this.doesImpactApplyToTeam(impactKey, currentDecisions);

            if (applies) {
                predictions.push({
                    category: impactKey,
                    impact: impact,
                    severity: this.categorizeImpactSeverity(impact),
                    recommendations: this.generateImpactRecommendations(impact, currentDecisions)
                });
            }
        });

        return predictions;
    }

    doesImpactApplyToTeam(impactKey, decisions) {
        if (impactKey === 'all') return true;
        
        return Object.values(decisions).some(decision => 
            decision?.value === impactKey
        );
    }

    categorizeImpactSeverity(impact) {
        let severityScore = 0;
        
        if (impact.marketShareDecrease > 15) severityScore += 3;
        if (impact.revenueDecrease > 20) severityScore += 3;
        if (impact.forcedUpgrade) severityScore += 2;
        if (impact.businessShutdownRisk) severityScore += 5;

        if (severityScore >= 5) return 'critical';
        if (severityScore >= 3) return 'high';
        if (severityScore >= 1) return 'medium';
        return 'low';
    }

    generateImpactRecommendations(impact, currentDecisions) {
        const recommendations = [];

        if (impact.forcedUpgrade) {
            recommendations.push(`Prepare budget for mandatory upgrade costs`);
        }

        if (impact.marketShareDecrease > 10) {
            recommendations.push(`Consider defensive marketing strategy`);
        }

        if (impact.obsolescenceRisk) {
            recommendations.push(`Plan technology transition immediately`);
        }

        return recommendations;
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VoltaraMarketSystem;
} else if (typeof window !== 'undefined') {
    window.VoltaraMarketSystem = VoltaraMarketSystem;
}
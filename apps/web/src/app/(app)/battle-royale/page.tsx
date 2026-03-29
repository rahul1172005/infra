'use client';

import React from 'react';
import { DotGrid } from '@/components/ui/DotGrid';
import { PageHeader } from '@/components/ui/PageHeader';
import { ActionCard } from '@/components/ui/ActionCard';
import { StatGrid } from '@/components/ui/StatGrid';
import { SurikenIcon } from '@/components/icons/SurikenIcon';
import { Button } from '@/components/ui/Button';
import { Rocket, Shield, Users, Activity, Trophy } from 'lucide-react';

import { battleRoyaleConfig } from '@/configs/battle-royale';

export default function BattleRoyalePage() {
    return (
        <div className="w-full pb-20 space-y-12 relative">
            <DotGrid opacity="opacity-[0.05]" />

            <PageHeader 
                title={battleRoyaleConfig.header.title}
                accentTitle={battleRoyaleConfig.header.accentTitle}
                topLabel={battleRoyaleConfig.header.topLabel}
                variant="oversight"
            />

            <ActionCard
                title={battleRoyaleConfig.action.title}
                backgroundText={battleRoyaleConfig.action.backgroundText}
                description={battleRoyaleConfig.action.description}
                icon={<SurikenIcon size="xl" className="text-white group-hover/icon:scale-110 transition-transform" />}
                variant="oversight"
                footer={<StatGrid stats={battleRoyaleConfig.metrics} columns={3} variant="oversight" />}
            >
                <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 w-full">
                    <Button
                        variant="primary"
                        size="lg"
                        fullWidth
                        icon={Rocket}
                    >
                        ENTER THE FIELD
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        fullWidth
                        icon={Shield}
                    >
                        THE BATTLE RULES
                    </Button>
                </div>
            </ActionCard>
        </div>
    );
}

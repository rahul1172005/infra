'use client';

import React from 'react';
import { DotGrid } from '@/components/ui/DotGrid';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatGrid } from '@/components/ui/StatGrid';
import { Button } from '@/components/ui/Button';
import { Activity, RefreshCcw } from 'lucide-react';
import { ActionCard } from '@/components/ui/ActionCard';
import { communityConfig } from '@/configs/community';

export default function CommunityPage() {
    return (
        <div className="w-full pb-20 space-y-12 text-black relative">
            <DotGrid opacity="opacity-[0.03]" />

            <PageHeader 
                title={communityConfig.header.title}
                accentTitle={communityConfig.header.accentTitle}
                topLabel={communityConfig.header.topLabel}
                variant="industrial"
            />

            <ActionCard
                title={communityConfig.action.title}
                backgroundText={communityConfig.action.backgroundText}
                description={communityConfig.action.description}
                icon={true}
                variant="industrial"
            >
                <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 w-full max-w-xl mx-auto">
                    <Button
                        variant="primary"
                        size="lg"
                        fullWidth
                        icon={Activity}
                    >
                        VIEW REALM STATUS
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        fullWidth
                        className="bg-white text-black hover:bg-[#F9F9F9]"
                        icon={RefreshCcw}
                    >
                        RETRY RAVEN
                    </Button>
                </div>
            </ActionCard>

            <StatGrid stats={communityConfig.stats} columns={4} variant="industrial" />
        </div>
    );
}

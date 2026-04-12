import React, { useEffect, useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import * as blazeface from '@tensorflow-models/blazeface';
import '@tensorflow/tfjs';
import { Shield, AlertTriangle, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface ProctoringProps {
    onViolation: (type: 'NO_FACE' | 'MULTIPLE_FACES' | 'SUSPICIOUS_MOVEMENT', snapshot: string) => void;
    isActive: boolean;
    status: 'SAFE' | 'WARNING' | 'VIOLATION';
    attempts: number;
    maxAttempts: number;
}

export function Proctoring({ onViolation, isActive, status, attempts, maxAttempts }: ProctoringProps) {
    const webcamRef = useRef<Webcam>(null);
    const [model, setModel] = useState<blazeface.BlazeFaceModel | null>(null);
    const [isModelLoading, setIsModelLoading] = useState(true);
    
    // Violation debounce to avoid spamming
    const lastViolationTime = useRef<number>(0);

    useEffect(() => {
        const loadModel = async () => {
            try {
                const loadedModel = await blazeface.load();
                setModel(loadedModel);
                setIsModelLoading(false);
            } catch (error) {
                console.error("Failed to load face detection model", error);
            }
        };
        loadModel();
    }, []);

    const detect = useCallback(async () => {
        if (!isActive || !model || !webcamRef.current) return;
        
        const video = webcamRef.current.video;
        if (video && video.readyState === 4) { // HAVE_ENOUGH_DATA
            try {
                const returnTensors = false;
                const predictions = await model.estimateFaces(video, returnTensors);
                
                const now = Date.now();
                if (now - lastViolationTime.current > 3000) { // 3 seconds cooldown
                    if (predictions.length === 0) {
                        const snapshot = webcamRef.current.getScreenshot() || '';
                        onViolation('NO_FACE', snapshot);
                        lastViolationTime.current = now;
                    } else if (predictions.length > 1) {
                        const snapshot = webcamRef.current.getScreenshot() || '';
                        onViolation('MULTIPLE_FACES', snapshot);
                        lastViolationTime.current = now;
                    } else {
                        // Single face detected 
                    }
                }
            } catch (error) {
                console.error("Face detection error:", error);
            }
        }
    }, [model, isActive, onViolation]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isActive && !isModelLoading) {
            interval = setInterval(detect, 1000); // Check every second
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, isModelLoading, detect]);

    // Status styling
    const statusConfig = {
        SAFE: { text: 'MONITORING ACTIVE', color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/30', icon: CheckCircle2 },
        WARNING: { text: 'WARNING: VIOLATION DETECTED', color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', icon: AlertTriangle },
        VIOLATION: { text: 'CRITICAL: PENALTY APPLIED', color: 'text-[#E81414]', bg: 'bg-[#E81414]/10', border: 'border-[#E81414]/30', icon: ShieldAlert },
    };

    const currentStatus = statusConfig[status] || statusConfig.SAFE;
    const StatusIcon = currentStatus.icon;

    return (
        <div className="fixed bottom-6 right-6 w-64 flex flex-col space-y-3 z-[100] bg-black/80 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white/10">
            <div className="flex flex-col gap-1 items-center justify-center border-b border-white/5 pb-2">
                <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-white/50">PROCTORING</h4>
                <span className="text-[11px] font-black uppercase tracking-widest text-white/80">
                    ATTEMPTS: <span className={attempts >= maxAttempts ? 'text-[#E81414] animate-pulse' : 'text-white'}>{attempts}/{maxAttempts}</span>
                </span>
            </div>
            
            <div className={`flex items-center justify-between p-2 rounded-lg border ${currentStatus.border} ${currentStatus.bg} transition-colors duration-500`}>
                <div className="flex items-center gap-2">
                    <StatusIcon className={`w-4 h-4 ${currentStatus.color}`} />
                    <span className={`text-[10px] font-black uppercase tracking-widest ${currentStatus.color}`}>
                        {currentStatus.text}
                    </span>
                </div>
                {isModelLoading && (
                    <span className="text-[9px] text-white/40 uppercase tracking-widest animate-pulse">
                        INITIALIZING...
                    </span>
                )}
            </div>
            
            <div className="relative rounded-xl overflow-hidden border border-white/10 aspect-video bg-black/50">
                <Webcam
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat="image/jpeg"
                    videoConstraints={{ facingMode: 'user' }}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 pointer-events-none border border-white/5" />
                <div className="absolute top-2 right-2 flex items-center justify-center w-2 h-2 rounded-full bg-[#E81414] animate-pulse" />
                {attempts >= maxAttempts && (
                    <div className="absolute inset-0 bg-[#E81414]/90 backdrop-blur-md flex items-center justify-center p-4 text-center">
                        <span className="text-white text-[10px] font-black uppercase tracking-widest">
                            LOCKED (MAX ATTEMPTS)
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}

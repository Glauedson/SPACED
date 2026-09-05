import { Section } from "@components/layout/section/section";
import Footer from "@components/layout/footer/footer";
import Header from "@components/layout/header/header";
import Navbar from "@components/layout/navbar/navbar";
import { changePageName } from "@utils/changePageName";
import Badge from "@components/ui/badge/badge";
import { Card } from "@components/ui/card/card";
import { useEffect, useMemo, useState } from "react";
import { getMoonData } from "@/api/cycleCals/api";
import type { MoonData } from "@/api/cycleCals/types";
import { BannerMoon, MoonMap } from "@/assets";
import LoadSkeleton from "@components/ui/load-skeleton/load-skeleton";
import { AnimatedNumber } from "@components/ui/motion-primitives/animed-numbers";
import HorizontalScrollArea from "@components/ui/scroll-horizontal/scroll-horizontal";
import { formatTodayLabel } from "@utils/date";

type MoonInfoCard = {
    title: string;
    value: number;
    suffix: string;
};

export default function Lua() {
    const [moonData, setMoonData] = useState<MoonData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchMoonData() {
            try {
                setLoading(true);
                const data = await getMoonData();
                changePageName(`${data.current.name} - SPACED`);
                setMoonData(data);
            } catch (error) {
                console.error("Erro ao buscar dados da Lua:", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchMoonData();
    }, []);

    const moonDataCards = useMemo<MoonInfoCard[]>(() => [
        {
            title: "ILUMINAÇÃO",
            value: moonData?.current.illuminationPercent ?? 0,
            suffix: "%",
        },
        {
            title: "IDADE LUNAR",
            value: moonData?.current.ageDays
                ? Number(moonData.current.ageDays.toFixed(1))
                : 0,
            suffix: "Dias",
        },
        {
            title: "DISTÂNCIA",
            value: moonData?.current.distanceKm
                ? Number(moonData.current.distanceKm.toFixed(2))
                : 0,
            suffix: "km",
        },
    ], [moonData]);

    if (error) {
        return (
            <>
                <Navbar />
                <Header
                    pill="CycleCals"
                    backgroundImage={BannerMoon}
                    title="FASES DA LUA."
                    description="Monitore o ciclo lunar em tempo real através dos dados de posicionamento orbital da CycleCals. Acesse a iluminação e as próximas efemérides visíveis do nosso satélite natural."
                />
                <Section className="py-6 flex flex-col items-center justify-center text-center gap-4">
                    <h1 className="title text-[28px] leading-none py-4">
                        Ocorreu um erro ao buscar os dados da Lua.
                    </h1>
                    <p className="description">
                        Por favor, tente novamente mais tarde.
                    </p>
                </Section>
                <Footer />
            </>
        );
    };

    return (
        <>
            <Navbar />
            <Header
                pill="CycleCals"
                backgroundImage={BannerMoon}
                title="FASES DA LUA."
                description="Monitore o ciclo lunar em tempo real através dos dados de posicionamento orbital da CycleCals. Acesse a iluminação e as próximas efemérides visíveis do nosso satélite natural."
            />

            {/* Moon data */}
            <Section className="py-6">
                <Badge
                    text={`Hoje - ${formatTodayLabel()} `}
                    className="text-primary"
                />

                <div className="flex flex-col md:flex-row md:justify-between gap-4 mt-2">

                    {/* Left */}
                    <div className="w-full md:w-[60%] space-y-5">
                        <h1 className="title text-[40px] leading-none">
                            {loading 
                                ? <LoadSkeleton className="w-[80%] h-[42px] rounded-2xl" count={1} />
                                : moonData?.current.name}
                        </h1>

                        <p className="description">
                            {loading 
                                ? <LoadSkeleton className="w-[100%] h-[14px]" count={4} />
                                : moonData?.current.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {moonDataCards.map((card, index) => (
                                <Card
                                    className={`py-4 ${
                                        index === 2
                                            ? "col-span-1 md:col-span-2"
                                            : ""
                                    }`}
                                    key={card.title}
                                >
                                    <p className="description text-[11px]">
                                        {card.title}
                                    </p>

                                    <h1 className="title text-primary text-[32px]">
                                        {loading 
                                            ? <LoadSkeleton className={`h-[32px] mt-2 rounded-xl ${index === 2 ? 'w-[80%]' : 'w-[150px]' }`} />
                                            : (
                                                <>
                                                    <AnimatedNumber
                                                        value={card.value}
                                                        start={0}
                                                        once={true}
                                                    />
                                                    {` ${card.suffix}`}
                                                </>
                                            )
                                        }
                                    </h1>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Right */}
                    <Card className="aspect-square flex justify-center items-center w-full md:max-w-[460px] md:aspect-auto overflow-hidden">
                        <div className="h-full relative md:max-h-[250px] aspect-square rounded-[50%] overflow-hidden">
                            {loading 
                                ? <LoadSkeleton className="w-full h-full rounded-[50%]" />
                                : (
                                    <>
                                    <div
                                        className="moon-rotate h-full w-full"
                                        style={{ backgroundImage: `url(${MoonMap})` }}
                                    />

                                    <MoonShadow
                                        phase={moonData?.current.code ?? "full_moon"}
                                        illuminationPercent={moonData?.current.illuminationPercent ?? 100}
                                    />
                                    </>
                                )}
                        </div>
                    </Card>
                </div>
            </Section>

            {/* Lunar forecast */}
            <Section>
                <h1 className="title text-[28px] leading-none py-4">
                    Previsão para os Próximos 7 Dias
                </h1>

                <HorizontalScrollArea>
                    {loading 
                        ? <LoadSkeleton className="w-[130px] h-[250px] md:w-[150px] md:h-[280px] rounded-2xl shrink-0" count={8} />
                        : moonData?.forecast.map((day) => (
                            <Card
                                key={day.date}
                                className=" w-[130px] h-[250px] md:w-[150px] md:h-[280px] mt-5 shrink-0 flex flex-col items-center"
                            >
                                {/* Moon */}
                                <div className="aspect-square rounded-[50%] overflow-hidden relative top-[-40px]">
                                    <img
                                        src={day.image}
                                        alt={day.name}
                                        className="w-full h-full object-cover pointer-events-none"
                                    />
                                </div>

                                {/* Shadow */}
                                <div className="bg-black/50 w-[80%] h-3 rounded-[50%] relative top-[-10px]" />

                                <Badge text={day.label} className="mt-3"
                                           variant="secondary" />

                                <p className="description text-text-primary text-center leading-none">
                                    {day.name}
                                </p>

                                <p className="description text-[12px] mt-1">
                                    {day.illuminationPercent.toFixed(1)}% de Brilho
                                </p>
                            </Card>
                        ))
                    }
                </HorizontalScrollArea>
            </Section>
            <Footer />
        </>
    );
}

{/* ------------ Moon Shadow ---------- */}

const WANING_PHASES = [ "new_moon", "waxing_crescent", "first_quarter",
                       "waxing_gibbous", "full_moon", "waning_gibbous",
                       "last_quarter", "waning_crescent" ];

function getMoonShadowPath(k: number, side: "left" | "right", size = 100) {
    const r = size / 2;
    const sweep = side === "right" ? 1 : 0;
    const innerSweep = k < 0.5 ? sweep : 1 - sweep;
    const rx = Math.abs(1 - 2 * k) * r;

    return `M ${r},0 A ${r},${r} 0 0,${sweep} ${r},${size} A ${rx},${r} 0 0,${innerSweep} ${r},0 Z`;
}

type MoonShadowProps = {
    illuminationPercent: number;
    phase: string; 
};

export function MoonShadow({ illuminationPercent, phase }: MoonShadowProps) {
    if (phase === "full_moon") return null;

    const k = Math.min(Math.max(illuminationPercent / 100, 0), 1);
    const side = WANING_PHASES.includes(phase) ? "right" : "left";
    const d = getMoonShadowPath(k, side);

    return (
        <svg
            viewBox="0 0 100 100"
            className="pointer-events-none absolute inset-0 h-full w-full"
        >
            <path d={d} fill="black" fillOpacity={0.82} style={{ filter: "blur(1px)" }} />
        </svg>
    );
}

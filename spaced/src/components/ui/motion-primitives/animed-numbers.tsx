'use client';
import { cn } from '@utils/utils';
import {
  motion,
  useInView,
  useSpring,
  useTransform,
  type SpringOptions,
  type UseInViewOptions,
} from 'motion/react';
import { useEffect, useRef } from 'react';

export type AnimatedNumberProps = {
  value: number;
  className?: string;
  springOptions?: SpringOptions;
  as?: React.ElementType;
  /**
   * Valor inicial exibido. Se informado, o componente só anima até
   * `value` quando entrar na viewport (ativa o useInView internamente).
   * Se omitido, mantém o comportamento antigo (anima assim que `value` muda).
   */
  start?: number;
  /** Se a animação deve disparar só uma vez ao entrar na tela (default: true) */
  once?: boolean;
  /** Margem usada pelo useInView, útil pra antecipar/atrasar o disparo */
  margin?: UseInViewOptions['margin'];
};

/**
 * ATENÇÃO: se usar `duration` dentro de `springOptions`, o valor é em
 * SEGUNDOS (não ms). Ex: duration: 1.5 = 1,5s. Um valor tipo 10000
 * faz a animação levar ~2h47min, o que parece "travado em 0".
 */

export function AnimatedNumber({
  value,
  className,
  springOptions,
  as = 'span',
  start,
  once = true,
  margin,
}: AnimatedNumberProps) {
  const MotionComponent = motion.create(as) as React.ComponentType<
    React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }
  >;

  const ref = useRef<HTMLElement>(null);
  const hasStart = start !== undefined;

  // só ativa o useInView quando `start` é passado (evita custo desnecessário no uso "antigo")
  const isInView = useInView(ref, { once, margin });

  const spring = useSpring(hasStart ? start : value, springOptions);
  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString()
  );

  useEffect(() => {
    if (!hasStart) {
      // comportamento original: anima sempre que value mudar
      spring.set(value);
      return;
    }

    if (isInView) {
      spring.set(value);
    }
  }, [spring, value, hasStart, isInView]);

  return (
    <MotionComponent ref={ref} className={cn('tabular-nums', className)}>
      {display as unknown as React.ReactNode}
    </MotionComponent>
  );
}
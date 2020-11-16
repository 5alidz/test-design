import cls from '@5alid/cls';
import { Heading } from 'design/Heading';
import { ReactNode, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useClickOutside } from '@5alid/react-hooks';
import { defaultFocus } from 'design/_global';
import { Paragraph } from 'design/Paragraph';

const ColorPicker = dynamic(() => import('components/ColorPicker'), { ssr: false });

const formatRGB = ({ r, g, b, a }: { r: number; g: number; b: number; a?: number }) => {
  return `rgba(${r}, ${g}, ${b}, ${a ?? 0})`;
};

function useCSSValue(cssvar: string) {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (typeof window != 'undefined') {
      const varValue = window.getComputedStyle(document.documentElement).getPropertyValue(cssvar);
      setValue(varValue.trim());
    }
  }, [cssvar]);

  useEffect(() => {
    if (value) {
      document.documentElement.style.setProperty(cssvar, value);
    }
  }, [cssvar, value]);

  return [value, setValue] as const;
}

function Circle({ className, cssvar }: { className?: string; cssvar: string }) {
  const [color, setColor] = useState('');
  const [isPickerHidden, setIsPickerHidden] = useState(true);
  const containerRef = useRef<null | HTMLDivElement>(null);

  useClickOutside(containerRef, () => setIsPickerHidden(true));

  useEffect(() => {
    if (typeof window != 'undefined') {
      const varValue = window.getComputedStyle(document.documentElement).getPropertyValue(cssvar);
      setColor(varValue.trim());
    }
  }, [cssvar]);

  useEffect(() => {
    if (color) {
      document.documentElement.style.setProperty(cssvar, color);
    }
  }, [color, cssvar]);

  return (
    <div ref={containerRef}>
      <div className='rounded-full mr-2 border w-5 h-5 overflow-hidden'>
        <div
          className='w-full h-full z-10 absolute bg-contain'
          style={{
            backgroundColor: '#ffffff',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Cg fill='%23a9a9a9' fill-opacity='0.4'%3E%3Cpath fill-rule='evenodd' d='M0 0h4v4H0V0zm4 4h4v4H4V4z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <button
          className={cls('w-full h-full focus:outline-none z-20')}
          style={{ backgroundColor: `var(${cssvar})` }}
          tabIndex={0}
          onClick={() => setIsPickerHidden(!isPickerHidden)}
        />
      </div>
      {!isPickerHidden && (
        <div className='absolute top-0 mt-6 z-50'>
          <ColorPicker color={color} onChange={(_color) => setColor(formatRGB(_color.rgb))} />
        </div>
      )}
    </div>
  );
}

function Swatch({ className, name, cssvar }: { className?: string; name: string; cssvar: string }) {
  return (
    <div className='flex pr-4 items-center h-full'>
      <Circle className={className} cssvar={cssvar} />
      <div className='ml-2 whitespace-no-wrap'>{name}</div>
    </div>
  );
}

function Section({ children, title }: { children?: ReactNode; title: string }) {
  return (
    <div className='grid gap-4 border-b pb-4 pt-8'>
      <Heading>{title}</Heading>
      {children}
    </div>
  );
}

const theme = {
  mainColors: {
    foreground: '--color-foreground',
    background: '--color-background',
    surface: '--color-surface',
    primary: '--color-primary',
    secondary: '--color-secondary',
    accent: '--color-accent',
    neutral: '--color-neutral',
    success: '--color-success',
    error: '--color-error',
    warning: '--color-warning',
  },
  focusColors: {
    default: {
      shadow: '--focus-shadow-default',
      border: '--focus-border-default',
    },
  },
  borderRadius: {
    default: '--border-radius-default',
  },
  borderColor: {
    default: '--border-color',
  },
} as const;

function MainColorsSection() {
  const { foreground, background, surface, success, error, warning, ...colors } = theme.mainColors;
  return (
    <Section title='Main colors'>
      <div className='grid gap-2'>
        <Heading level={6}>System</Heading>
        <div className='grid gap-4 grid-cols-4'>
          <Swatch cssvar={foreground} name='foreground' />
          <Swatch cssvar={background} name='background' />
          <Swatch cssvar={surface} name='surface' />
          <Swatch cssvar={'--border-color'} name='border' />
        </div>
      </div>
      <div className='grid gap-2'>
        <Heading level={6}>Brand</Heading>
        <div className='grid gap-4 grid-cols-4'>
          {Object.entries(colors).map(([key, value]) => {
            return <Swatch key={key} cssvar={value} name={key} />;
          })}
        </div>
      </div>
      <div className='grid gap-2'>
        <Heading level={6}>States</Heading>
        <div className='grid gap-4 grid-cols-4'>
          <Swatch cssvar={success} name='success' />
          <Swatch cssvar={warning} name='warning' />
          <Swatch cssvar={error} name='error' />
        </div>
      </div>
    </Section>
  );
}

function FocusColorsSection() {
  return (
    <Section title='Focus colors'>
      <Paragraph className='max-w-md'>
        Elements like text inputs, buttons, and any interactive element will make use of some kind of focus, this is the
        default one.
      </Paragraph>
      {Object.entries(theme.focusColors).map(([key, value]) => {
        return (
          <div key={key} className='flex items-center justify-between'>
            <div className='flex items-center'>
              <Circle className='mr-4' cssvar={value.border} />
              <Circle className='mr-4' cssvar={value.shadow} />
              <div className='font-semibold capitalize ml-4'>{key}</div>
            </div>
            <div>
              <div className={cls('px-4 py-1 rounded border shadow-focus border-focus bg-theme-surface')}>Result</div>
            </div>
          </div>
        );
      })}
    </Section>
  );
}

function BorderRadiusSection() {
  const [themeBorderRadius, setThemeBorderRadius] = useCSSValue(theme.borderRadius.default);
  return (
    <Section title='Border Radius'>
      <Paragraph className='max-w-md'>
        The usage of a single border radius across your components will ensure a consistent look in every page of the
        app/website.
      </Paragraph>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <input
            type='number'
            onChange={(e) => {
              setThemeBorderRadius(`${e.target.value}rem`);
            }}
            value={themeBorderRadius.replace(/rem/, '')}
            className={cls(
              defaultFocus,
              'w-20 px-2 rounded border disabled:opacity-50 ml-2 bg-theme-surface text-theme-foreground'
            )}
            step={0.1}
            min={0}
          />
          <div className='font-semibold ml-4'>Default</div>
        </div>
        <div>
          <div className='p-8 border bg-theme-surface' style={{ borderRadius: `var(${theme.borderRadius.default})` }}>
            Result
          </div>
        </div>
      </div>
    </Section>
  );
}

function ShadowInput({ label, cssvar }: { label: string; cssvar: string }) {
  const [cssValue, setCSSValue] = useCSSValue(cssvar);
  return (
    <div className='flex items-center'>
      <div className='mr-2' style={{ width: '6ch' }}>
        {label}
      </div>
      <input
        type='number'
        value={cssValue.replace(/px/, '')}
        onChange={(e) => setCSSValue(`${e.target.value}px`)}
        step={1}
        className={cls(
          defaultFocus,
          'w-20 px-2 rounded border disabled:opacity-50 mr-3 bg-theme-surface text-theme-foreground'
        )}
      />
    </div>
  );
}
function BoxShadowSection() {
  return (
    <Section title='Box shadows'>
      <p className='max-w-md'>Use layers to create smooth shadows on all devices</p>
      <div className='flex justify-between items-center'>
        <div className='flex items-start mb-8'>
          <div className='font-semibold' style={{ width: '10ch' }}>
            Resting
          </div>
          <div className='grid gap-2 mr-4'>
            <div>Layer #1</div>
            <ShadowInput label='x' cssvar='--shadow-rested-layer-1-x' />
            <ShadowInput label='y' cssvar='--shadow-rested-layer-1-y' />
            <ShadowInput label='blur' cssvar='--shadow-rested-layer-1-blur' />
            <ShadowInput label='spread' cssvar='--shadow-rested-layer-1-spread' />
            <Swatch name='color' cssvar='--shadow-rested-layer-1-color' />
          </div>
          <div className='grid gap-2'>
            <div>Layer #2</div>
            <ShadowInput label='x' cssvar='--shadow-rested-layer-2-x' />
            <ShadowInput label='y' cssvar='--shadow-rested-layer-2-y' />
            <ShadowInput label='blur' cssvar='--shadow-rested-layer-2-blur' />
            <ShadowInput label='spread' cssvar='--shadow-rested-layer-2-spread' />
            <Swatch name='color' cssvar='--shadow-rested-layer-2-color' />
          </div>
        </div>
        <div className='w-20 h-20 rounded shadow-rested bg-theme-surface'></div>
      </div>
      <div className='flex justify-between items-center'>
        <div className='flex items-start'>
          <div className='font-semibold' style={{ width: '10ch' }}>
            Elevated
          </div>
          <div className='grid gap-2 mr-4'>
            <div>Layer #1</div>
            <ShadowInput label='x' cssvar='--shadow-elevated-layer-1-x' />
            <ShadowInput label='y' cssvar='--shadow-elevated-layer-1-y' />
            <ShadowInput label='blur' cssvar='--shadow-elevated-layer-1-blur' />
            <ShadowInput label='spread' cssvar='--shadow-elevated-layer-1-spread' />
            <Swatch name='color' cssvar='--shadow-elevated-layer-1-color' />
          </div>
          <div className='grid gap-2'>
            <div>Layer #2</div>
            <ShadowInput label='x' cssvar='--shadow-elevated-layer-2-x' />
            <ShadowInput label='y' cssvar='--shadow-elevated-layer-2-y' />
            <ShadowInput label='blur' cssvar='--shadow-elevated-layer-2-blur' />
            <ShadowInput label='spread' cssvar='--shadow-elevated-layer-2-spread' />
            <Swatch name='color' cssvar='--shadow-elevated-layer-2-color' />
          </div>
        </div>
        <div className='w-20 h-20 rounded shadow-elevated bg-theme-surface'></div>
      </div>
    </Section>
  );
}

function TypographyElement({ level, cssvar }: { cssvar: string; level: 1 | 2 | 3 | 4 | 5 | 6 }) {
  const [cssValue, setCSSValue] = useCSSValue(cssvar);
  return (
    <div className='flex justify-between'>
      <div className='flex items-start'>
        <input
          step={0.1}
          min={0}
          type='number'
          value={cssValue.replace(/rem/, '')}
          onChange={(e) => {
            setCSSValue(`${e.target.value}rem`);
          }}
          className={cls(
            defaultFocus,
            'w-20 px-2 rounded border disabled:opacity-50 mr-3 bg-theme-surface text-theme-foreground'
          )}
        />
        <div className='font-semibold'>Header #{level}</div>
      </div>
      <Heading level={level} className='leading-none'>
        Sample title
      </Heading>
    </div>
  );
}

function TypographySection() {
  const [textBody, setTextBody] = useCSSValue('--text-body');
  const [textSmall, setTextSmall] = useCSSValue('--text-small');
  return (
    <Section title='Typography'>
      <div className='grid gap-4'>
        {([1, 2, 3, 4, 5, 6] as const).map((num) => {
          return <TypographyElement key={num} cssvar={`--text-h${num}`} level={num} />;
        })}
        <div className='flex justify-between'>
          <div className='flex items-start'>
            <input
              step={0.1}
              type='number'
              value={textBody.replace(/rem/, '')}
              onChange={(e) => {
                setTextBody(`${e.target.value}rem`);
              }}
              className={cls(
                defaultFocus,
                'w-20 px-2 rounded border disabled:opacity-50 mr-3 bg-theme-surface text-theme-foreground'
              )}
            />
            <div className='font-semibold'>Body</div>
          </div>
          <Paragraph className='max-w-sm text-body'>Sample text</Paragraph>
        </div>
        <div className='flex justify-between'>
          <div className='flex items-start'>
            <input
              type='number'
              step={0.1}
              value={textSmall.replace(/rem/, '')}
              onChange={(e) => {
                setTextSmall(`${e.target.value}rem`);
              }}
              className={cls(
                defaultFocus,
                'w-20 px-2 rounded border disabled:opacity-50 mr-3 bg-theme-surface text-theme-foreground'
              )}
            />
            <div className='font-semibold'>small</div>
          </div>
          <Paragraph className='max-w-sm text-small'>Sample text</Paragraph>
        </div>
      </div>
    </Section>
  );
}

const gfonts = 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyABYE-y4Sg47Q0U6-SaJFKgBlHwgDt_Ntk';

export default function DesignShowRoom() {
  useEffect(() => {
    fetch(gfonts)
      .then((res) => res.json())
      .then(console.log);
  }, []);
  return (
    <div className='grid gap-8 max-w-4xl mx-auto py-8'>
      <div className='pb-10'>
        <Heading level={2}>Theme</Heading>
        <MainColorsSection />
        <FocusColorsSection />
        <BorderRadiusSection />
        <TypographySection />
        <BoxShadowSection />
      </div>
    </div>
  );
}

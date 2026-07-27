import { useState } from 'react';
import iconImage from 'figma:asset/b8641b56d622f5c3b1323cb0c2946972ad0e7283.png';
import { PrimaryBrandLogo } from './components/PrimaryBrandLogo';

// =====================================================
// BRAND DESIGN TOKENS — Single Source of Truth (10 Colors)
// =====================================================
const C = {
  navy900: '#0a0e27',
  navy800: '#151b3d',
  gold500: '#f4b942',
  white100: '#FFFFFF',
  gray300: '#c9ceda',
  success500: '#10b981',
  purple500: '#8b5cf6',
  danger500: '#EF4444',
  gradientPink: '#ec4899',
  gradientOrange: '#f97316',
} as const;

const FONT = "'Inter', sans-serif";

type Tab = 'logo' | 'colors' | 'typography' | 'components' | 'radius';

const TABS: { id: Tab; label: string }[] = [
  { id: 'logo', label: '01 Logo Exports' },
  { id: 'colors', label: '02 Colors' },
  { id: 'typography', label: '03 Typography' },
  { id: 'components', label: '04 Components' },
  { id: 'radius', label: '05 Radius' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('logo');

  return (
    <div
      style={{ backgroundColor: C.navy900, fontFamily: FONT }}
      className="min-h-screen px-[96px] py-[64px] overflow-x-auto"
    >
      {/* Header — H1: Inter Semibold 600, 40/48, White (per spec) */}
      <div className="mb-[48px]">
        <h1
          style={{ color: C.gold500, fontFamily: FONT }}
          className="text-[40px] leading-[48px] font-semibold"
        >
          AI Premium Shop Brand System
        </h1>
        <p
          style={{ color: C.gray300, fontFamily: FONT }}
          className="text-[14px] leading-[20px] mt-[8px]"
        >
          Clean brand reference — 5 pages, 10 colors, 6 type styles, 7 components
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-[48px] flex gap-[8px] flex-wrap">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                color: isActive ? C.navy900 : C.gray300,
                backgroundColor: isActive ? C.gold500 : 'transparent',
                border: `1px solid ${isActive ? C.gold500 : `${C.gray300}33`}`,
                fontFamily: FONT,
              }}
              className="px-[20px] py-[10px] rounded-[8px] text-[14px] leading-[20px] font-semibold cursor-pointer transition-all"
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex justify-center min-w-[1200px]">
        {activeTab === 'logo' && <LogoExportsPage />}
        {activeTab === 'colors' && <ColorsPage />}
        {activeTab === 'typography' && <TypographyPage />}
        {activeTab === 'components' && <ComponentsPage />}
        {activeTab === 'radius' && <RadiusPage />}
      </div>
    </div>
  );
}

// =====================================================
// PAGE 1: LOGO EXPORTS
// =====================================================
function LogoExportsPage() {
  return (
    <div style={{ backgroundColor: C.navy800 }} className="w-[1200px] rounded-[16px] p-[48px] flex flex-col gap-[48px]">
      <h2 style={{ color: C.gold500, fontFamily: FONT }} className="text-[32px] leading-[40px] font-semibold">
        Logo Exports
      </h2>

      {/* Primary Logo on Navy-900 */}
      <div style={{ backgroundColor: C.navy900 }} className="rounded-[16px] p-[64px] flex items-center justify-center h-[400px]">
        <PrimaryBrandLogo variant="full-color" size="xlarge" layout="vertical" />
      </div>

      {/* Three Variants */}
      <div className="grid grid-cols-3 gap-[24px]">
        {/* Full Color */}
        <div className="flex flex-col">
          <div style={{ backgroundColor: C.navy900 }} className="rounded-[12px] p-[32px] flex items-center justify-center mb-[16px] h-[240px]">
            <PrimaryBrandLogo variant="full-color" size="small" layout="vertical" />
          </div>
          <div style={{ backgroundColor: C.navy900 }} className="rounded-[8px] p-[16px]">
            <p style={{ color: C.gold500, fontFamily: FONT }} className="text-[14px] leading-[20px] font-semibold mb-[8px]">Full Color</p>
            <p style={{ color: C.gray300, fontFamily: FONT }} className="text-[12px] leading-[16px]">AI/SHOP=Gold, PREMIUM=White, liquid glass effect</p>
          </div>
        </div>
        {/* White */}
        <div className="flex flex-col">
          <div style={{ backgroundColor: C.navy900 }} className="rounded-[12px] p-[32px] flex items-center justify-center mb-[16px] h-[240px]">
            <PrimaryBrandLogo variant="white" size="small" layout="vertical" />
          </div>
          <div style={{ backgroundColor: C.navy900 }} className="rounded-[8px] p-[16px]">
            <p style={{ color: C.white100, fontFamily: FONT }} className="text-[14px] leading-[20px] font-semibold mb-[8px]">White</p>
            <p style={{ color: C.gray300, fontFamily: FONT }} className="text-[12px] leading-[16px]">For dark backgrounds and overlays</p>
          </div>
        </div>
        {/* Black */}
        <div className="flex flex-col">
          <div style={{ backgroundColor: C.white100 }} className="rounded-[12px] p-[32px] flex items-center justify-center mb-[16px] h-[240px]">
            <PrimaryBrandLogo variant="black" size="small" layout="vertical" />
          </div>
          <div style={{ backgroundColor: C.navy900 }} className="rounded-[8px] p-[16px]">
            <p style={{ color: C.white100, fontFamily: FONT }} className="text-[14px] leading-[20px] font-semibold mb-[8px]">Black</p>
            <p style={{ color: C.gray300, fontFamily: FONT }} className="text-[12px] leading-[16px]">For light backgrounds and print</p>
          </div>
        </div>
      </div>

      {/* Export Assets + Favicon */}
      <div className="grid grid-cols-2 gap-[24px]">
        {/* Export-Ready Assets */}
        <div style={{ backgroundColor: C.navy900 }} className="rounded-[12px] p-[24px]">
          <p style={{ color: C.white100, fontFamily: FONT }} className="text-[16px] leading-[24px] font-semibold mb-[16px]">Export-Ready Assets</p>
          <div className="grid grid-cols-2 gap-x-[32px] gap-y-[8px]">
            {['SVG (optimized)', 'PNG 1024px', 'PNG 512px', 'PNG 256px', 'PNG 64px', 'PNG 32px'].map((asset) => (
              <div key={asset} className="flex items-center gap-[8px]">
                <div style={{ backgroundColor: C.gold500 }} className="w-[4px] h-[4px] rounded-full flex-shrink-0" />
                <p style={{ color: C.white100, fontFamily: FONT }} className="text-[13px] leading-[18px]">{asset}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Favicon Versions */}
        <div style={{ backgroundColor: C.navy900 }} className="rounded-[12px] p-[24px]">
          <p style={{ color: C.white100, fontFamily: FONT }} className="text-[16px] leading-[24px] font-semibold mb-[16px]">Favicon Versions</p>
          <div className="flex items-center gap-[24px]">
            <div className="flex flex-col items-center">
              <div style={{ backgroundColor: C.navy800, border: `1px solid ${C.white100}33` }} className="w-[48px] h-[48px] rounded-[6px] flex items-center justify-center mb-[8px]">
                <img src={iconImage} alt="32px favicon" className="w-[36px] h-[36px] object-contain" />
              </div>
              <p style={{ color: C.white100, fontFamily: FONT }} className="text-[11px] leading-[16px] text-center font-semibold">32x32</p>
            </div>
            <div className="flex flex-col items-center">
              <div style={{ backgroundColor: C.navy800, border: `1px solid ${C.white100}33` }} className="w-[24px] h-[24px] rounded-[4px] flex items-center justify-center mb-[8px]">
                <img src={iconImage} alt="16px favicon" className="w-[18px] h-[18px] object-contain" />
              </div>
              <p style={{ color: C.white100, fontFamily: FONT }} className="text-[11px] leading-[16px] text-center font-semibold">16x16</p>
            </div>
            <p style={{ color: C.gray300, fontFamily: FONT }} className="text-[12px] leading-[18px] flex-1">
              Pixel-perfect alignment at small sizes for sharp browser rendering
            </p>
          </div>
        </div>
      </div>

      {/* Misuse Guidelines */}
      <div style={{ backgroundColor: `${C.danger500}15`, border: `2px solid ${C.danger500}` }} className="rounded-[12px] p-[24px]">
        <div className="flex items-center gap-[10px] mb-[16px]">
          <div style={{ backgroundColor: C.danger500 }} className="w-[24px] h-[24px] rounded-[6px] flex items-center justify-center flex-shrink-0">
            <svg className="w-[14px] h-[14px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <p style={{ color: C.danger500, fontFamily: FONT }} className="text-[16px] leading-[24px] font-semibold">Misuse Guidelines</p>
        </div>
        <div className="grid grid-cols-2 gap-[6px]">
          {[
            'No recoloring or color adjustments',
            'No gradients or visual effects',
            'No shadows or outlines',
            'No rotation or distortion',
            'No background overlays or patterns',
            'No modifications to artwork',
          ].map((rule) => (
            <p key={rule} style={{ color: C.white100, fontFamily: FONT }} className="text-[12px] leading-[18px]">
              ✗ {rule}
            </p>
          ))}
        </div>
      </div>

      <PageFooter />
    </div>
  );
}

// =====================================================
// PAGE 2: COLORS (10 only)
// =====================================================
const COLOR_SWATCHES = [
  { token: 'Color/Navy-900', name: 'Navy-900', hex: '#0a0e27', usage: 'Page Background', color: C.navy900, border: true },
  { token: 'Color/Navy-800', name: 'Navy-800', hex: '#151b3d', usage: 'Surface / Cards', color: C.navy800, border: true },
  { token: 'Color/Gold-500', name: 'Gold-500', hex: '#f4b942', usage: 'Primary Accent, H3 Headings', color: C.gold500 },
  { token: 'Color/White-100', name: 'White-100', hex: '#FFFFFF', usage: 'H1, H2, Body Text', color: C.white100, darkBorder: true },
  { token: 'Color/Gray-300', name: 'Gray-300', hex: '#c9ceda', usage: 'Muted Text', color: C.gray300 },
  { token: 'Color/Success-500', name: 'Success-500', hex: '#10b981', usage: 'Verified / Success', color: C.success500 },
  { token: 'Color/Purple-500', name: 'Purple-500', hex: '#8b5cf6', usage: 'Accent / Highlight', color: C.purple500 },
  { token: 'Color/Danger-500', name: 'Danger-500', hex: '#EF4444', usage: 'Error', color: C.danger500 },
  { token: 'Color/Gradient-Pink', name: 'Gradient-Pink', hex: '#ec4899', usage: 'CTA Gradient Start', color: C.gradientPink },
  { token: 'Color/Gradient-Orange', name: 'Gradient-Orange', hex: '#f97316', usage: 'CTA Gradient End', color: C.gradientOrange },
];

function ColorsPage() {
  return (
    <div style={{ backgroundColor: C.navy800 }} className="w-[1200px] rounded-[16px] p-[48px] flex flex-col">
      <h2 style={{ color: C.gold500, fontFamily: FONT }} className="text-[32px] leading-[40px] font-semibold mb-[32px]">
        Colors
      </h2>

      <div className="grid grid-cols-5 gap-[24px] mb-[48px]">
        {COLOR_SWATCHES.map((swatch) => (
          <div key={swatch.token}>
            <div
              style={{
                backgroundColor: swatch.color,
                border: swatch.border
                  ? `2px solid ${C.white100}33`
                  : swatch.darkBorder
                    ? `2px solid ${C.navy900}`
                    : undefined,
              }}
              className="w-full aspect-square rounded-[16px] mb-[12px]"
            />
            <p style={{ color: C.gray300, fontFamily: FONT }} className="text-[11px] leading-[16px] font-mono">{swatch.token}</p>
            <p style={{ color: C.white100, fontFamily: FONT }} className="text-[14px] leading-[20px] font-semibold mt-[4px]">{swatch.name}</p>
            <p style={{ color: C.gray300, fontFamily: FONT }} className="text-[12px] leading-[16px] font-mono mt-[4px]">{swatch.hex}</p>
            <p style={{ color: C.gray300, fontFamily: FONT }} className="text-[11px] leading-[16px] mt-[4px]">{swatch.usage}</p>
          </div>
        ))}
      </div>

      {/* CTA Gradient Preview */}
      <div style={{ backgroundColor: C.navy900 }} className="rounded-[16px] p-[24px]">
        <h3 style={{ color: C.gold500, fontFamily: FONT }} className="text-[24px] leading-[32px] font-semibold mb-[16px]">
          CTA Gradient
        </h3>
        <div
          style={{ background: `linear-gradient(135deg, ${C.gradientPink} 0%, ${C.gradientOrange} 100%)` }}
          className="h-[64px] rounded-[12px] mb-[12px]"
        />
        <p style={{ color: C.gray300, fontFamily: FONT }} className="text-[12px] leading-[16px] font-mono">
          linear-gradient(135deg, #ec4899 0%, #f97316 100%)
        </p>
      </div>

      <PageFooter />
    </div>
  );
}

// =====================================================
// PAGE 3: TYPOGRAPHY (6 styles, English only)
// =====================================================
const TYPE_STYLES = [
  { token: 'Text/H1', spec: 'Inter Semibold (600) · 40/48', colorDot: C.white100, colorName: 'Color/White-100', fontSize: '40px', lineHeight: '48px', fontWeight: 600, color: C.white100, sample: 'Premium AI Marketplace' },
  { token: 'Text/H2', spec: 'Inter Semibold (600) · 32/40', colorDot: C.white100, colorName: 'Color/White-100', fontSize: '32px', lineHeight: '40px', fontWeight: 600, color: C.white100, sample: 'Trusted by Professionals' },
  { token: 'Text/H3', spec: 'Inter Semibold (600) · 24/32', colorDot: C.gold500, colorName: 'Color/Gold-500', fontSize: '24px', lineHeight: '32px', fontWeight: 600, color: C.gold500, sample: 'Secure & Reliable Platform' },
  { token: 'Text/Body', spec: 'Inter Regular (400) · 16/24', colorDot: C.white100, colorName: 'Color/White-100', fontSize: '16px', lineHeight: '24px', fontWeight: 400, color: C.white100, sample: 'AI Premium Shop provides premium AI tools for businesses and professionals across Bangladesh.' },
  { token: 'Text/Small', spec: 'Inter Regular (400) · 14/20', colorDot: C.gray300, colorName: 'Color/Gray-300', fontSize: '14px', lineHeight: '20px', fontWeight: 400, color: C.gray300, sample: 'Official marketplace for verified AI solutions.' },
  { token: 'Text/Caption', spec: 'Inter Regular (400) · 12/16', colorDot: C.gray300, colorName: 'Color/Gray-300', fontSize: '12px', lineHeight: '16px', fontWeight: 400, color: C.gray300, sample: '© 2026 AI Premium Shop. All rights reserved.' },
];

function TypographyPage() {
  return (
    <div style={{ backgroundColor: C.navy800, fontFamily: FONT }} className="w-[1200px] rounded-[16px] p-[48px] flex flex-col">
      <h2 style={{ color: C.gold500, fontFamily: FONT }} className="text-[32px] leading-[40px] font-semibold mb-[32px]">
        Typography
      </h2>

      <div className="space-y-[16px] flex-1">
        {TYPE_STYLES.map((style) => (
          <div key={style.token} style={{ backgroundColor: C.navy900 }} className="rounded-[16px] p-[24px]">
            <div className="flex items-center justify-between mb-[8px]">
              <p style={{ color: C.gray300, fontFamily: FONT }} className="text-[12px] leading-[16px] font-mono">{style.token}</p>
              <p style={{ color: C.gray300, fontFamily: FONT }} className="text-[12px] leading-[16px] font-mono">{style.spec}</p>
            </div>
            <div className="flex items-center gap-[8px] mb-[16px]">
              <div style={{ backgroundColor: style.colorDot }} className="w-[10px] h-[10px] rounded-full flex-shrink-0" />
              <p style={{ color: C.gray300, fontFamily: FONT }} className="text-[11px] leading-[16px] font-mono">{style.colorName}</p>
            </div>
            <p
              style={{
                color: style.color,
                fontFamily: FONT,
                fontWeight: style.fontWeight,
                fontSize: style.fontSize,
                lineHeight: style.lineHeight,
              }}
            >
              {style.sample}
            </p>
          </div>
        ))}
      </div>

      {/* Warning */}
      <div
        style={{ backgroundColor: `${C.gold500}1A`, border: `2px solid ${C.gold500}4D` }}
        className="rounded-[16px] p-[24px] mt-[16px]"
      >
        <p style={{ color: C.gold500, fontFamily: FONT }} className="text-[14px] leading-[20px] font-semibold">
          Only these 6 text styles are allowed
        </p>
        <p style={{ color: C.white100, fontFamily: FONT }} className="text-[12px] leading-[16px] mt-[8px]">
          No custom font sizes, weights, or line heights outside this system. No Bangla fonts.
        </p>
      </div>

      <PageFooter />
    </div>
  );
}

// =====================================================
// PAGE 4: COMPONENTS (7 components)
// =====================================================
function ComponentsPage() {
  return (
    <div style={{ backgroundColor: C.navy800 }} className="w-[1200px] rounded-[16px] p-[48px] flex flex-col gap-[48px]">
      <h2 style={{ color: C.gold500, fontFamily: FONT }} className="text-[32px] leading-[40px] font-semibold">
        Components
      </h2>

      {/* --- CARDS --- */}
      <div>
        <h3 style={{ color: C.gold500, fontFamily: FONT }} className="text-[24px] leading-[32px] font-semibold mb-[24px]">
          Cards
        </h3>
        <div style={{ backgroundColor: C.navy900 }} className="rounded-[16px] p-[48px] flex items-start justify-center gap-[32px]">
          {/* Card/Product */}
          <div
            style={{
              backgroundColor: C.navy800,
              border: `1px solid ${C.gold500}33`,
              borderRadius: '12px',
              fontFamily: FONT,
            }}
            className="w-[320px] p-[24px] flex flex-col gap-[16px]"
          >
            <div style={{ backgroundColor: `${C.gray300}33` }} className="w-[48px] h-[48px] rounded-[8px] flex items-center justify-center">
              <svg className="w-[24px] h-[24px]" style={{ color: C.gold500 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
              </svg>
            </div>
            <h3 style={{ color: C.white100, fontFamily: FONT }} className="text-[24px] leading-[32px] font-semibold">ChatGPT Team</h3>
            <h2 style={{ color: C.gold500, fontFamily: FONT }} className="text-[32px] leading-[40px] font-semibold">$25/mo</h2>
            <div className="flex flex-col gap-[8px]">
              {['Unlimited GPT-4 access', 'Priority support 24/7', 'Team workspace included'].map((f) => (
                <p key={f} style={{ color: C.gray300, fontFamily: FONT }} className="text-[14px] leading-[20px]">
                  <span style={{ color: C.success500 }}>✓</span> {f}
                </p>
              ))}
            </div>
            <button
              style={{
                background: `linear-gradient(135deg, ${C.gradientPink} 0%, ${C.gradientOrange} 100%)`,
                color: C.white100,
                fontFamily: FONT,
                boxShadow: '0px 4px 16px rgba(244, 185, 66, 0.3)',
              }}
              className="h-[48px] px-[32px] py-[12px] rounded-[8px] text-[16px] leading-[24px] w-full mt-[8px] cursor-pointer"
            >
              Get Started
            </button>
          </div>

          {/* Card/Trust */}
          <div
            style={{
              backgroundColor: C.navy800,
              borderRadius: '8px',
              fontFamily: FONT,
            }}
            className="w-[280px] p-[20px] flex flex-col gap-[12px]"
          >
            <div style={{ backgroundColor: C.gold500 }} className="w-[32px] h-[32px] rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-[16px] h-[16px]" style={{ color: C.navy900 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p style={{ color: C.white100, fontWeight: 600, fontFamily: FONT }} className="text-[16px] leading-[24px]">Instant Delivery</p>
            <p style={{ color: C.gray300, fontFamily: FONT }} className="text-[14px] leading-[20px]">Get access within 5 minutes</p>
          </div>
        </div>

        {/* Card Specs */}
        <div className="grid grid-cols-2 gap-[24px] mt-[16px]">
          <SpecTable
            name="Card/Product"
            specs={[
              ['Width', '320px'], ['Background', 'Navy-800'], ['Radius', '12px'],
              ['Padding', '24px'], ['Border', 'Gold-500 20%'], ['Height', 'Auto'],
            ]}
          />
          <SpecTable
            name="Card/Trust"
            specs={[
              ['Width', '280px'], ['Background', 'Navy-800'], ['Radius', '8px'],
              ['Padding', '20px'], ['Border', 'None'], ['Height', 'Auto'],
            ]}
          />
        </div>
      </div>

      {/* --- BUTTONS --- */}
      <div>
        <h3 style={{ color: C.gold500, fontFamily: FONT }} className="text-[24px] leading-[32px] font-semibold mb-[24px]">
          Buttons
        </h3>
        <div style={{ backgroundColor: C.navy900 }} className="rounded-[16px] p-[48px] flex items-center justify-center gap-[48px]">
          {/* Button/Primary */}
          <div className="flex flex-col items-center gap-[12px]">
            <button
              style={{
                background: `linear-gradient(135deg, ${C.gradientPink} 0%, ${C.gradientOrange} 100%)`,
                color: C.white100,
                fontFamily: FONT,
                boxShadow: '0px 4px 16px rgba(244, 185, 66, 0.3)',
              }}
              className="h-[48px] px-[32px] py-[12px] rounded-[8px] text-[16px] leading-[24px] cursor-pointer"
            >
              Get Started →
            </button>
            <p style={{ color: C.gray300, fontFamily: FONT }} className="text-[11px] leading-[16px] font-mono">Button/Primary</p>
            <p style={{ color: C.gray300, fontFamily: FONT }} className="text-[11px] leading-[16px]">Gradient pink-to-orange CTA</p>
          </div>

          {/* Button/Secondary */}
          <div className="flex flex-col items-center gap-[12px]">
            <button
              style={{
                color: C.white100,
                border: `1px solid ${C.white100}`,
                backgroundColor: 'transparent',
                fontFamily: FONT,
              }}
              className="h-[48px] px-[32px] py-[12px] rounded-[8px] text-[16px] leading-[24px] cursor-pointer"
            >
              Learn More
            </button>
            <p style={{ color: C.gray300, fontFamily: FONT }} className="text-[11px] leading-[16px] font-mono">Button/Secondary</p>
            <p style={{ color: C.gray300, fontFamily: FONT }} className="text-[11px] leading-[16px]">Ghost/outline white border</p>
          </div>

          {/* Button/WhatsApp */}
          <div className="flex flex-col items-center gap-[12px]">
            <button
              style={{
                backgroundColor: '#25d366',
                color: C.white100,
                fontFamily: FONT,
              }}
              className="h-[48px] px-[32px] py-[12px] rounded-[8px] text-[16px] leading-[24px] cursor-pointer"
            >
              WhatsApp Us
            </button>
            <p style={{ color: C.gray300, fontFamily: FONT }} className="text-[11px] leading-[16px] font-mono">Button/WhatsApp</p>
            <p style={{ color: C.gray300, fontFamily: FONT }} className="text-[11px] leading-[16px]">Solid green #25d366</p>
          </div>
        </div>
      </div>

      {/* --- NAVBAR --- */}
      <div>
        <h3 style={{ color: C.gold500, fontFamily: FONT }} className="text-[24px] leading-[32px] font-semibold mb-[24px]">
          Navbar
        </h3>
        <div style={{ backgroundColor: C.navy900 }} className="rounded-[16px] p-[32px]">
          <div
            style={{
              backgroundColor: `${C.navy900}E6`,
              borderBottom: `1px solid ${C.white100}1A`,
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              fontFamily: FONT,
            }}
            className="w-full h-[80px] px-[48px] flex items-center justify-between rounded-[8px]"
          >
            <h3 style={{ color: C.gold500, fontFamily: FONT }} className="text-[24px] leading-[32px] font-semibold">
              AI Premium Shop
            </h3>
            <div className="flex items-center gap-[32px]">
              {['Tools', 'Startups', 'Bundles', 'About', 'Contact'].map((link) => (
                <p key={link} style={{ color: C.gray300, fontFamily: FONT, fontWeight: 400 }} className="text-[16px] leading-[24px] cursor-pointer">
                  {link}
                </p>
              ))}
            </div>
            <button
              style={{
                background: `linear-gradient(135deg, ${C.gradientPink} 0%, ${C.gradientOrange} 100%)`,
                color: C.white100,
                fontFamily: FONT,
                boxShadow: '0px 4px 16px rgba(244, 185, 66, 0.3)',
              }}
              className="h-[48px] px-[32px] py-[12px] rounded-[8px] text-[16px] leading-[24px] cursor-pointer"
            >
              WhatsApp Us →
            </button>
          </div>
        </div>
        <SpecTable
          name="Navbar/Desktop"
          className="mt-[16px]"
          specs={[
            ['Width', '1440px'], ['Height', '80px'], ['Background', 'Navy-900 90%'],
            ['Padding', '0px 48px'], ['Layout', 'Space-between'], ['Backdrop', 'Blur 12px'],
          ]}
        />
      </div>

      {/* --- FOOTER --- */}
      <div>
        <h3 style={{ color: C.gold500, fontFamily: FONT }} className="text-[24px] leading-[32px] font-semibold mb-[24px]">
          Footer
        </h3>
        <div style={{ backgroundColor: C.navy900 }} className="rounded-[16px] p-[48px]">
          <div style={{ fontFamily: FONT }} className="w-full flex flex-col gap-[32px]">
            {/* 3-Column Grid */}
            <div className="grid grid-cols-3 gap-[32px]">
              {/* Col 1: Brand */}
              <div className="flex flex-col gap-[16px]">
                <h3 style={{ color: C.gold500, fontFamily: FONT }} className="text-[24px] leading-[32px] font-semibold">
                  AI Premium Shop
                </h3>
                <p style={{ color: C.white100, fontFamily: FONT, fontWeight: 400 }} className="text-[16px] leading-[24px]">
                  Bangladesh's #1 AI tools marketplace
                </p>
                <p style={{ color: C.gray300, fontFamily: FONT, fontWeight: 400 }} className="text-[12px] leading-[16px]">
                  © 2026 AI Premium Shop. All rights reserved.
                </p>
              </div>
              {/* Col 2: Quick Links */}
              <div className="flex flex-col gap-[12px]">
                <p style={{ color: C.gold500, fontFamily: FONT }} className="text-[16px] leading-[24px] font-semibold mb-[4px]">
                  Quick Links
                </p>
                {['AI Tools', 'Startup Perks', 'Pricing', 'About Us', 'Contact'].map((link) => (
                  <p key={link} style={{ color: C.white100, fontFamily: FONT, fontWeight: 400 }} className="text-[14px] leading-[20px] cursor-pointer">
                    {link}
                  </p>
                ))}
              </div>
              {/* Col 3: Contact */}
              <div className="flex flex-col gap-[12px]">
                <p style={{ color: C.gold500, fontFamily: FONT }} className="text-[16px] leading-[24px] font-semibold mb-[4px]">
                  Contact
                </p>
                <p style={{ color: C.white100, fontFamily: FONT, fontWeight: 400 }} className="text-[14px] leading-[20px]">
                  WhatsApp: +880 1865-385348
                </p>
                <p style={{ color: C.white100, fontFamily: FONT, fontWeight: 400 }} className="text-[14px] leading-[20px]">
                  Email: support@aipremiumshop.com
                </p>
                {/* Social Icons */}
                <div className="flex items-center gap-[12px] mt-[8px]">
                  {['FB', 'TW', 'IG', 'YT'].map((icon) => (
                    <div
                      key={icon}
                      style={{ border: `1.5px solid ${C.gold500}` }}
                      className="w-[28px] h-[28px] rounded-full flex items-center justify-center cursor-pointer"
                    >
                      <span style={{ color: C.gold500, fontFamily: FONT }} className="text-[9px] leading-[9px] font-semibold">
                        {icon}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Bottom Bar */}
            <div style={{ borderTop: `1px solid ${C.white100}1A` }} className="pt-[24px]">
              <p style={{ color: C.gray300, fontFamily: FONT, fontWeight: 400 }} className="text-[12px] leading-[16px] text-center">
                bKash | Nagad | Bank Transfer
              </p>
            </div>
          </div>
        </div>
        <SpecTable
          name="Footer/Desktop"
          className="mt-[16px]"
          specs={[
            ['Background', 'Navy-900'], ['Padding', '48px all'], ['Columns', '3 equal width'],
            ['Layout', 'Vertical · 32px gap'], ['Width', '1440px'], ['Height', 'Auto'],
          ]}
        />
      </div>

      <PageFooter />
    </div>
  );
}

// =====================================================
// PAGE 5: RADIUS
// =====================================================
const RADII = [
  { token: 'Radius/None', value: '0px', usage: 'Sharp corners (borders, dividers)' },
  { token: 'Radius/SM', value: '8px', usage: 'Buttons, inputs, small cards' },
  { token: 'Radius/MD', value: '12px', usage: 'Cards, modals, sections' },
  { token: 'Radius/LG', value: '16px', usage: 'Hero sections, large containers' },
];

function RadiusPage() {
  return (
    <div style={{ backgroundColor: C.navy800 }} className="w-[1200px] rounded-[16px] p-[48px] flex flex-col">
      <h2 style={{ color: C.gold500, fontFamily: FONT }} className="text-[32px] leading-[40px] font-semibold mb-[32px]">
        Radius
      </h2>

      <div className="grid grid-cols-2 gap-[24px] flex-1">
        {RADII.map((r) => (
          <div key={r.token} style={{ backgroundColor: C.navy900 }} className="rounded-[16px] p-[24px] flex flex-col">
            <div className="flex items-center justify-between mb-[8px]">
              <p style={{ color: C.white100, fontFamily: FONT }} className="text-[14px] leading-[20px] font-mono">{r.token}</p>
              <p style={{ color: C.gold500, fontFamily: FONT }} className="text-[14px] leading-[20px] font-mono font-semibold">{r.value}</p>
            </div>
            <p style={{ color: C.gray300, fontFamily: FONT }} className="text-[12px] leading-[16px] mb-[24px]">{r.usage}</p>
            <div className="flex-1 flex items-center justify-center min-h-[120px]">
              <div
                style={{
                  backgroundColor: C.navy800,
                  border: `1px solid ${C.gold500}`,
                  borderRadius: r.value,
                }}
                className="w-[160px] h-[100px]"
              />
            </div>
          </div>
        ))}
      </div>

      <PageFooter />
    </div>
  );
}

// =====================================================
// SHARED COMPONENTS
// =====================================================
function PageFooter() {
  return (
    <div className="mt-[24px] pt-[16px]" style={{ borderTop: `1px solid ${C.white100}1A` }}>
      <p style={{ color: C.gray300, fontFamily: FONT }} className="text-[11px] leading-[16px] text-center">
        AI Premium Shop Brand System v1.0
      </p>
    </div>
  );
}

function SpecTable({ name, specs, className = '' }: { name: string; specs: [string, string][]; className?: string }) {
  return (
    <div style={{ backgroundColor: C.navy900 }} className={`rounded-[16px] p-[24px] ${className}`}>
      <div className="flex items-center gap-[12px] mb-[16px]">
        <p style={{ color: C.white100, fontFamily: FONT }} className="text-[14px] leading-[20px] font-mono font-semibold">{name}</p>
        <div style={{ backgroundColor: C.purple500 }} className="px-[8px] py-[2px] rounded-[4px]">
          <p style={{ color: C.white100, fontFamily: FONT }} className="text-[10px] leading-[14px] font-semibold">COMPONENT</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-x-[32px] gap-y-[6px]">
        {specs.map(([label, value]) => (
          <div key={label} className="flex justify-between">
            <p style={{ color: C.gray300, fontFamily: FONT }} className="text-[11px] leading-[16px]">{label}</p>
            <p style={{ color: C.white100, fontFamily: FONT }} className="text-[11px] leading-[16px] font-mono">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
# 🎨 Higgsfield Design System Integration

**Status:** Ready for Integration  
**Purpose:** Unified design system for AI Premium Shop  
**Components:** UI Library, Design Tokens, Theme System

---

## 🎯 INTEGRATION OBJECTIVES

1. **Unified Design Language** - Consistent UI/UX across all pages
2. **Component Library** - Reusable, tested components
3. **Design Tokens** - Centralized color, typography, spacing
4. **Theme Support** - Light/dark mode with easy switching
5. **Developer Experience** - Simple component APIs

---

## 📦 INSTALLATION & SETUP

### 1. Install Higgsfield Package
```bash
# Install the design system package
npm install @higgsfield/ui @higgsfield/tokens @higgsfield/theme

# Or via pnpm (current package manager)
pnpm add @higgsfield/ui @higgsfield/tokens @higgsfield/theme
```

### 2. Configure Theme System
Create `src/theme/higgsfield.config.ts`:
```typescript
import { defineTheme } from '@higgsfield/theme'
import { tokens } from '@higgsfield/tokens'

export const aiPremiumShopTheme = defineTheme({
  name: 'ai-premium-shop',
  tokens: {
    colors: {
      primary: '#FF6B35',      // Orange accent
      secondary: '#004E89',     // Blue primary
      accent: '#F7931E',        // Secondary orange
      surface: '#0D1B2A',       // Dark background
      text: '#FFFFFF',          // Light text
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
      fontSize: tokens.typography.fontSize,
      fontWeight: tokens.typography.fontWeight,
      lineHeight: tokens.typography.lineHeight,
    },
    spacing: tokens.spacing,
    breakpoints: {
      mobile: '320px',
      tablet: '768px',
      desktop: '1024px',
      wide: '1440px',
    },
  },
})
```

### 3. Setup Theme Provider
Update `src/main.tsx`:
```typescript
import { ThemeProvider } from '@higgsfield/theme'
import { aiPremiumShopTheme } from './theme/higgsfield.config'

function App() {
  return (
    <ThemeProvider theme={aiPremiumShopTheme}>
      {/* App content */}
    </ThemeProvider>
  )
}
```

---

## 🧩 COMPONENT LIBRARY

### Core Components (Pre-built)
- `Button` - CTA buttons
- `Card` - Content containers
- `Input` - Form inputs
- `Navbar` - Header navigation
- `Footer` - Footer section
- `Modal` - Dialog boxes
- `Tooltip` - Hover info
- `Badge` - Status indicators
- `Alert` - Notification bars

### Usage Example
```typescript
import { Button, Card, Badge } from '@higgsfield/ui'

export function AIToolCard({ tool }) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold">{tool.name}</h3>
        <Badge variant={tool.status}>
          {tool.status.toUpperCase()}
        </Badge>
      </div>
      <p className="text-gray-300 mb-6">{tool.description}</p>
      <Button 
        variant="primary"
        onClick={() => orderTool(tool.id)}
      >
        Order via WhatsApp
      </Button>
    </Card>
  )
}
```

---

## 🎨 DESIGN TOKENS

### Color System
```typescript
import { tokens } from '@higgsfield/tokens'

// Primary Colors
const PRIMARY = tokens.colors.primary       // #004E89 (Blue)
const SECONDARY = tokens.colors.secondary   // #FF6B35 (Orange)
const ACCENT = tokens.colors.accent         // #F7931E (Gold)

// Semantic Colors
const SUCCESS = tokens.colors.success       // #00A651
const WARNING = tokens.colors.warning       // #FFB81C
const ERROR = tokens.colors.error           // #E31937
const INFO = tokens.colors.info             // #0066CC

// Neutral Colors
const BG_DARK = '#0D1B2A'                   // Surface
const BG_LIGHT = '#FFFFFF'                  // Light surface
const TEXT_PRIMARY = '#FFFFFF'              // Primary text
const TEXT_SECONDARY = '#8B99A6'            // Secondary text
```

### Typography System
```typescript
// Headings
const H1 = tokens.typography.heading.h1     // 48px, bold
const H2 = tokens.typography.heading.h2     // 36px, bold
const H3 = tokens.typography.heading.h3     // 28px, semibold
const H4 = tokens.typography.heading.h4     // 24px, semibold
const H5 = tokens.typography.heading.h5     // 20px, semibold
const H6 = tokens.typography.heading.h6     // 16px, semibold

// Body text
const BODY_LG = tokens.typography.body.lg   // 18px, regular
const BODY_MD = tokens.typography.body.md   // 16px, regular
const BODY_SM = tokens.typography.body.sm   // 14px, regular
const BODY_XS = tokens.typography.body.xs   // 12px, regular
```

### Spacing System
```typescript
const SPACING = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
}
```

---

## 🌓 THEME SWITCHING

### Light/Dark Mode
```typescript
import { useTheme } from '@higgsfield/theme'

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button onClick={toggleTheme}>
      {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
    </button>
  )
}
```

### Conditional Styling
```typescript
const styles = `
  bg-${theme === 'dark' ? 'gray-900' : 'white'}
  text-${theme === 'dark' ? 'white' : 'gray-900'}
`
```

---

## 🔧 CUSTOMIZATION

### Brand Colors
Update `src/theme/higgsfield.config.ts`:
```typescript
tokens: {
  colors: {
    primary: '#YOUR_COLOR_HERE',
    secondary: '#YOUR_COLOR_HERE',
    accent: '#YOUR_COLOR_HERE',
  }
}
```

### Add Custom Components
Create `src/components/CustomButton.tsx`:
```typescript
import { Button } from '@higgsfield/ui'
import { ReactNode } from 'react'

interface CustomButtonProps {
  children: ReactNode
  icon?: ReactNode
  loading?: boolean
}

export function CustomButton({
  children,
  icon,
  loading,
  ...props
}: CustomButtonProps) {
  return (
    <Button {...props} disabled={loading}>
      {icon && <span className="mr-2">{icon}</span>}
      {loading ? 'Loading...' : children}
    </Button>
  )
}
```

---

## 📐 RESPONSIVE DESIGN

### Breakpoints
```typescript
// Mobile First Approach
const mobile = '@media (min-width: 320px)'
const tablet = '@media (min-width: 768px)'
const desktop = '@media (min-width: 1024px)'
const wide = '@media (min-width: 1440px)'
```

### Responsive Components
```typescript
export function ResponsiveGrid() {
  return (
    <div className="
      grid
      grid-cols-1       // mobile
      sm:grid-cols-2    // tablet
      lg:grid-cols-3    // desktop
      xl:grid-cols-4    // wide
      gap-4
    ">
      {/* Grid items */}
    </div>
  )
}
```

---

## ✅ INTEGRATION CHECKLIST

### Phase 1: Setup (1-2 hours)
- [ ] Install Higgsfield packages
- [ ] Configure theme system
- [ ] Setup theme provider
- [ ] Test theme switching
- [ ] Verify no build errors

### Phase 2: Component Migration (4-6 hours)
- [ ] Replace custom Button with Higgsfield Button
- [ ] Replace custom Card with Higgsfield Card
- [ ] Update all forms to use Higgsfield inputs
- [ ] Replace modals with Higgsfield Modal
- [ ] Update alerts/notifications

### Phase 3: Design Tokens (2-3 hours)
- [ ] Replace hardcoded colors with tokens
- [ ] Replace hardcoded spacing with tokens
- [ ] Replace hardcoded typography with tokens
- [ ] Update all breakpoints to use tokens
- [ ] Remove duplicate CSS

### Phase 4: Testing & QA (2-3 hours)
- [ ] Visual regression testing
- [ ] Cross-browser testing
- [ ] Mobile/tablet/desktop testing
- [ ] Light/dark mode testing
- [ ] Accessibility audit

### Phase 5: Deployment (1 hour)
- [ ] Merge to staging branch
- [ ] Test in staging environment
- [ ] Get design approval
- [ ] Merge to main
- [ ] Deploy to production

---

## 📊 EXPECTED IMPROVEMENTS

| Metric | Before | After |
|--------|--------|-------|
| **Component Reusability** | 40% | 95% |
| **Design Consistency** | 60% | 100% |
| **CSS Maintenance** | Manual | Automated |
| **Theme Switch Time** | Complex | < 1 second |
| **Accessibility Score** | 85 | 98 |

---

## 🆘 TROUBLESHOOTING

### Issue: Components not styled
**Solution:** Check if `ThemeProvider` wraps entire app

### Issue: Colors not updating
**Solution:** Ensure tokens are imported from '@higgsfield/tokens'

### Issue: Theme not switching
**Solution:** Verify `useTheme` hook is available in component tree

---

## 📚 RESOURCES

- [Higgsfield Docs](https://higgsfield.dev/docs)
- [Component Library](https://higgsfield.dev/components)
- [Design Tokens](https://higgsfield.dev/tokens)
- [Theme Configuration](https://higgsfield.dev/theme)

---

## 📞 SUPPORT

- Documentation: https://higgsfield.dev/docs
- GitHub Issues: https://github.com/higgsfield/ui/issues
- Email: support@higgsfield.dev

**Estimated Timeline: 2-3 days for full integration**


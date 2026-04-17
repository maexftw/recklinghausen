# RLC News Page Simplification Plan

## Context

**Target Audience**: RLC 1952 members and interested visitors
**Primary Goal**: Quickly see the latest club news and achievements
**Current State**: Well-designed but complex with excessive decorative elements and explanatory text
**Design Direction**: Clean, focused, content-first

---

## Core Purpose

Users should be able to see the most recent news story in under 5 seconds, then optionally browse the archive if interested.

---

## Essential Elements (Keep)

1. **Featured Story Section** - The most recent news item with image, title, excerpt, and link
2. **News Grid** - Filterable list of additional news items
3. **Filter System** - Simple category filters (All, Competition, Youth, Club, Honours)
4. **Navigation Links** - Quick access to Training, Membership, Team, Contact pages
5. **Branding** - RLC 1952 identity through typography and color

---

## Nice-to-Have (Remove or Simplify)

### Content Elements
- **Meta row** (lines 37-41) - Explains what the page contains
- **Hero points** (lines 43-56) - Explains benefits of the news archive
- **Stat list** (lines 68-81) - Explains "Aktualität", "Gemeinschaft", "Transparenz"
- **Checklist** (lines 83-87) - Explains how to use the archive
- **Highlight strip** (lines 91-107) - Redundant benefit explanations
- **CTA band** (lines 255-266) - Redundant call-to-action section

### Visual Elements
- **Decorative borders** on intro section (lines 66-79)
- **Gradient overlays** on intro section (lines 67-70, 87-91)
- **Accent line** on aside section (line 137)
- **Multiple shadow layers** on cards and sections
- **Complex background gradients** (radial + linear combinations)

### Interactive Elements
- **Secondary buttons** (3 total) - Reduce to 1 primary action
- **Link with icon** (line 61) - Remove decorative icon
- **Pagination** - Keep but simplify if needed

---

## Simplification Strategy

### Information Architecture

**Before**:
```
Intro Section (content + aside)
  ├─ Meta row (3 items)
  ├─ Hero points (3 items)
  ├─ Lead paragraph
  ├─ Actions (3 buttons)
  └─ Aside (kicker + copy + stat list + checklist)
Highlight Strip (3 items)
Main Grid (toolbar + surface + featured + grid + pagination)
  ├─ Toolbar (title + stats + filters + status)
  ├─ Surface (header + featured + grid + pagination)
  └─ Sidebar (quick links + steps)
CTA Band (content + actions)
```

**After**:
```
Featured Story Section
  ├─ Image
  ├─ Date chip
  ├─ Category
  ├─ Title
  ├─ Excerpt
  └─ Primary CTA button
News Grid Section
  ├─ Filter buttons (horizontal scroll)
  ├─ Featured story (if different from top)
  └─ News cards (grid)
Quick Links Section
  └─ 4-5 essential links
```

### Visual Simplification

**Color Palette**:
- Keep: Primary teal (#0f8f7b), Secondary dark (#1b4353), Neutral grays
- Remove: Accent colors, status colors, decorative color-mix variations

**Typography**:
- Keep: Montserrat (display), Inter (body)
- Reduce: Display size from 5rem to 3.5rem
- Remove: Uppercase labels, tight letter-spacing on body text

**Spacing**:
- Use single spacing scale (4px, 8px, 16px, 24px, 32px)
- Remove arbitrary gaps (0.45rem, 0.7rem, 0.85rem, etc.)
- Increase whitespace between sections

**Borders & Shadows**:
- Remove decorative borders
- Use subtle shadows only on cards
- Remove gradient backgrounds

### Layout Simplification

**Intro Section**:
- Remove aside completely
- Remove meta row
- Remove hero points
- Keep: Title, lead paragraph, primary CTA

**Main Grid**:
- Remove toolbar completely
- Remove sidebar completely
- Keep: Featured story, filter buttons, news grid

**Quick Links**:
- Remove CTA band
- Create simple link list or icon grid

---

## Implementation Steps

### Phase 1: Content Removal
1. Remove meta row from intro section
2. Remove hero points from intro section
3. Remove stat list from aside section
4. Remove checklist from aside section
5. Remove highlight strip section
6. Remove CTA band section

### Phase 2: Visual Simplification
1. Remove decorative borders from intro section
2. Remove gradient overlays from intro section
3. Remove accent line from aside section
4. Simplify card shadows (remove multiple layers)
5. Remove complex background gradients

### Phase 3: Layout Restructuring
1. Consolidate intro section (title + lead + CTA)
2. Remove toolbar from main grid
3. Remove sidebar from main grid
4. Create horizontal filter scroll
5. Simplify pagination

### Phase 4: Refinement
1. Adjust typography hierarchy
2. Optimize spacing
3. Improve button hierarchy (1 primary, 2 secondary)
4. Enhance loading state
5. Test accessibility

---

## Expected Outcomes

**Performance**:
- Reduced HTML size by ~40%
- Reduced CSS by ~30%
- Faster page load time

**Usability**:
- Clearer visual hierarchy
- Faster content discovery
- Reduced cognitive load
- Intuitive navigation

**Aesthetics**:
- Cleaner, more focused design
- Stronger brand identity
- Better content-to-decorations ratio
- Professional, athletic feel

---

## Success Metrics

- Users can identify the featured story in under 3 seconds
- Filter system is discoverable through interaction
- Page feels less cluttered and more purposeful
- No loss of essential functionality
- Accessibility maintained or improved

---

## Questions for Validation

1. Should the featured story always be the first item, or should it be a separate section?
2. How many filter categories are actually used? (4 categories vs 5)
3. Should quick links be inline or in a separate section?
4. Is the date format important enough to display prominently?
5. Should the category be shown on every card or just the featured story?

---

## Notes

- This is a design simplification, not a feature removal
- All existing functionality should be preserved
- Accessibility must be maintained or improved
- The design should still feel distinctive and branded

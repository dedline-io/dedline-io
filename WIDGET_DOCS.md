# Dedline.io Widget Documentation

## Overview

Dedline.io provides embeddable widgets that display voter registration deadlines for any U.S. state. Perfect for news sites, community organizations, campaigns, and any website that wants to help people register to vote!

## Quick Start

### Direct Links

Share state-specific widgets directly:
```
https://dedline.io/widget/ca
https://dedline.io/widget/ny
https://dedline.io/widget/tx
```

Replace the two-letter state code (ca, ny, tx) with any U.S. state or DC.

### Embedding on Your Website

Add this iframe code to your HTML:

```html
<iframe
  src="https://dedline.io/widget/ca"
  width="100%"
  height="500"
  frameborder="0"
  title="California Voter Registration Widget">
</iframe>
```

## Widget Versions

### Standard Widget

**URL Format:** `/widget/{state}`

**Example:** `https://dedline.io/widget/ca`

**Recommended iframe size:** `width="100%" height="500"`

**Features:**
- Full countdown display
- Primary and General election toggle
- Registration deadline information
- Direct link to state's official voter registration site
- State emoji branding

**Best for:**
- Sidebars
- Dedicated widget sections
- Standalone pages
- Mobile-friendly layouts

### Compact Widget

**URL Format:** `/widget/{state}?compact=true`

**Example:** `https://dedline.io/widget/ca?compact=true`

**Recommended iframe size:** `width="100%" height="120"`

**Features:**
- Horizontal layout
- Condensed information display
- Same functionality, smaller footprint
- Responsive design

**Best for:**
- Headers and banners
- Tight spaces
- Horizontal layouts
- Newsletter embeds

## State Codes

Use standard two-letter state abbreviations:

| State | Code | State | Code | State | Code |
|-------|------|-------|------|-------|------|
| Alabama | AL | Kentucky | KY | North Dakota | ND |
| Alaska | AK | Louisiana | LA | Ohio | OH |
| Arizona | AZ | Maine | ME | Oklahoma | OK |
| Arkansas | AR | Maryland | MD | Oregon | OR |
| California | CA | Massachusetts | MA | Pennsylvania | PA |
| Colorado | CO | Michigan | MI | Rhode Island | RI |
| Connecticut | CT | Minnesota | MN | South Carolina | SC |
| Delaware | DE | Mississippi | MS | South Dakota | SD |
| District of Columbia | DC | Missouri | MO | Tennessee | TN |
| Florida | FL | Montana | MT | Texas | TX |
| Georgia | GA | Nebraska | NE | Utah | UT |
| Hawaii | HI | Nevada | NV | Vermont | VT |
| Idaho | ID | New Hampshire | NH | Virginia | VA |
| Illinois | IL | New Jersey | NJ | Washington | WA |
| Indiana | IN | New Mexico | NM | West Virginia | WV |
| Iowa | IA | New York | NY | Wisconsin | WI |
| Kansas | KS | North Carolina | NC | Wyoming | WY |

## Examples

### News Article Sidebar
```html
<div class="sidebar">
  <h3>Register to Vote</h3>
  <iframe
    src="https://dedline.io/widget/ny"
    width="100%"
    height="500"
    frameborder="0"
    title="New York Voter Registration">
  </iframe>
</div>
```

### Campaign Website Banner
```html
<div class="banner">
  <iframe
    src="https://dedline.io/widget/tx?compact=true"
    width="100%"
    height="120"
    frameborder="0"
    title="Texas Voter Registration Deadline">
  </iframe>
</div>
```

### Multi-State Organization
```html
<!-- Show widgets for multiple states -->
<div class="widget-grid">
  <iframe src="https://dedline.io/widget/ca?compact=true" width="100%" height="120"></iframe>
  <iframe src="https://dedline.io/widget/ny?compact=true" width="100%" height="120"></iframe>
  <iframe src="https://dedline.io/widget/fl?compact=true" width="100%" height="120"></iframe>
</div>
```

### Social Media Sharing

Share direct links on social media:
```
📢 California voters! Only X days left to register!
https://dedline.io/widget/ca

🗳️ Check your state's deadline:
https://dedline.io
```

## Features

### Automatic Updates
- Widgets automatically display the current election cycle information
- Countdown updates in real-time
- Data sourced from official state election websites

### Primary & General Elections
- Toggle between primary and general election deadlines
- Displays both registration deadline and election date
- Automatically shows relevant information for upcoming elections

### Mobile Responsive
- All widgets are fully responsive
- Works on desktop, tablet, and mobile devices
- Compact version adapts to small screens

### Accessibility
- Proper ARIA labels for screen readers
- Semantic HTML structure
- High contrast colors for readability

## Customization & Styling

Widgets use iframe embedding, which maintains consistent styling across all implementations. The widgets are designed to work on both light and dark backgrounds.

If you need custom colors or branding, please [open an issue](https://github.com/dedline-io/dedline-io/issues) or reach out to discuss custom solutions.

## API Access

The widget data comes from our open-source API. If you want to build your own custom implementation, check out:

```
https://dedline-api.netlify.app/states.json
```

## Support & Contributing

- **Issues:** Report bugs or request features on [GitHub](https://github.com/dedline-io/dedline-io/issues)
- **Contributing:** We welcome contributions! See our [contributing guidelines](CONTRIBUTING.md)
- **Questions:** Open a discussion on [GitHub Discussions](https://github.com/dedline-io/dedline-io/discussions)

## License

Dedline.io is open source. Please provide attribution when using our widgets:

```html
Powered by <a href="https://dedline.io">Dedline.io</a>
```

## Examples in the Wild

Using Dedline.io widgets on your site? Let us know! We'd love to feature you.

---

Built with ❤️ to help Americans exercise their right to vote.

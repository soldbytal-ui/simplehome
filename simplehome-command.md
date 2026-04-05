Build a complete Toronto pre-construction & resale real estate website called SimpleHome.ca. This is a replication of the PreConstructionMiami platform (~/Desktop/preconstructionmiami) adapted for the Toronto/GTA market. Use that codebase as a reference for architecture and features — but this is a completely separate project with its own repo, Supabase, and Vercel deployment.

STACK:
- Next.js 14 with App Router
- Supabase (I'll provide the URL and anon key after initial setup)
- Mapbox GL JS with 3D map (dark-v11 style for the map only, centered on Toronto)
- Tailwind CSS with a LIGHT theme
- Vercel deployment
- Anthropic API for AI chat and content generation (ANTHROPIC_API_KEY in env)

DESIGN — LIGHT THEME (clean, modern, editorial feel like Fox Marin + strata.ca):
- Background: #FFFFFF
- Surface: #F8F9FA
- Surface2: #F0F2F5
- Text primary: #1A1A2E
- Text muted: #6B7280
- Accent: #0066FF (Toronto blue)
- Secondary accent: #10B981 (green for status badges)
- Border: rgba(0,0,0,0.08)
- Cards: white with subtle shadow (shadow-sm), rounded-xl corners
- Navbar: white/clean with subtle bottom border, sticky, not transparent
- No glass-morphism — use clean white cards with soft shadows instead
- Font: Inter (weights 400, 500, 600, 700)
- Logo text: "SIMPLE" (accent blue #0066FF) + "HOME" (#1A1A2E dark) + ".CA" (#6B7280 muted)
- Buttons: solid accent color, rounded-lg, clean hover states
- Overall feel: clean, bright, professional, editorial — like a premium Toronto real estate magazine
- Map hero still uses dark-v11 style (maps look best dark even on light sites)
- Hover effects: cards lift slightly with shadow-md, images zoom subtly (scale-105)

3D MAP HERO:
- Homepage hero with Mapbox 3D map at 75vh height (not full viewport)
- Center: Toronto downtown [43.6532, -79.3832], zoom 13, pitch 55
- Dark-v11 style with 3D building extrusions from Mapbox composite layer
- Glowing beam markers for pre-construction projects (blue for pre-construction, green for under construction, orange for completed)
- Click marker → slide-in property card (white card with shadow on light background) → "View Listing" link to /properties/[slug]
- Hover tooltip with project name, price, floors
- Subtle animated scroll-down chevron at bottom of map
- Glass-morphism info panel in bottom-left corner (this panel can stay dark/glassmorphic even on light theme since it's over the dark map): "Toronto's Premier Pre-Construction Marketplace" with stats: X+ Projects, X+ Neighborhoods, price range
- Below the map: content sections on white background

PAGES TO BUILD:

/ (HOMEPAGE):
- 3D map hero (75vh)
- "Featured Developments" grid — 6 cards with large photos, editorial feel
- "Explore Toronto's Neighborhoods" — grid of neighborhood cards with real photos
- "Toronto Pre-Construction Market Overview" section (300-400 words SEO content about Toronto market, population growth, transit expansion, investment appeal)
- "Top Pre-Construction Neighborhoods" — brief paragraph per major area with links
- "Why Buy Pre-Construction in Toronto" — 200-300 words on benefits
- "Featured Developers" — top 6 developers with logos
- FAQ section with 8 questions and schema markup:
  "What is a pre-construction condo?", "How much deposit do I need in Toronto?", "Can foreigners buy pre-construction in Ontario?", "What are occupancy fees?", "How long does pre-construction take?", "Can I sell my assignment before closing?", "Do I need a realtor to buy pre-construction?", "What is the HST rebate on new condos?"
- "Latest Market Insights" — latest 3 blog posts with images
- "Ready to Explore" CTA section
- Footer with neighborhoods, resources, legal links, disclaimer

/pre-construction:
- H1: "Pre-Construction Condos & New Developments in Toronto (2026-2032)"
- Intro paragraph (200 words) about the Toronto pre-construction landscape
- Filter bar: search, neighborhood dropdown, status dropdown, price range, building type (condo/townhome/detached), sort
- Grid of project cards (editorial style — large photos, clean typography)
- Below grid: "Toronto Pre-Construction Buying Guide" (400-500 words about the 4 phases, deposit structure, what to look for)
- "Price Guide by Neighborhood" table
- "Most Anticipated Projects" highlight section
- FAQ section with schema

/properties/[slug]:
- Breadcrumbs
- Project name, address, developer (linked to /developers/[slug]), status badge
- Large hero image
- Stats bar: Price, Total Units, Floors, Est. Completion
- Inquiry form (right sidebar, sticky on scroll)
- SINGLE content section (no duplicates) with ## headings:
  - Building overview (unique per project)
  - Location & Neighborhood (mention TTC, GO Transit, local landmarks)
  - Investment Potential
  - About the Developer
  - Schedule a Private Showing CTA
- Gallery section with lightbox
- FAQ accordion with schema markup
- "More in [Neighborhood]" — 3 related projects
- Disclaimers below form
- Price disclaimer note

/areas/[neighborhood]:
- H1: "New Pre-Construction Condos in [Neighborhood]"
- Subtitle with project count and price range
- Embedded mini-map (dark style, zoomed into neighborhood, interactive, clickable markers)
- "About [Neighborhood] Real Estate" — 300-500 word unique description
- All project cards in that neighborhood
- Inquiry form sidebar
- FAQ section specific to that neighborhood
- "Top Developers in [Neighborhood]" section

/developers:
- "Pre-Construction Developers" heading
- Grid of developer cards with: real logo (scraped) or initials fallback, name, project count, bio excerpt, neighborhoods active in
- Click → developer profile page

/developers/[slug]:
- Developer name, logo, bio (200-400 words), website link
- Stats: total projects, neighborhoods, price range
- Grid of all their projects
- "Other Developers" section

/portfolio (INSPIRED BY FOX MARIN):
- Two tabs: "For Sale" and "Sold / Completed"
- Editorial card design: large hero image filling card, property name overlay at bottom with gradient fade
- Status badge: "For Sale" (green), "Sold" (muted red), "Under Contract" (orange)
- Price or "Sold for $X.XM"
- Neighborhood tag
- Brief 1-2 sentence editorial tagline per property (personality-driven, not generic)
- Click opens full listing page
- Hover: subtle image zoom, card lifts with shadow

/portfolio/[slug] (for sold/notable properties):
- "The Story" — narrative editorial section about the property (generated by Anthropic API in Fox Marin's editorial voice)
- Final sale price vs original asking
- Days on market
- Neighborhood context
- Photo gallery
- Related properties

/resale:
- Resale listings page (separate from pre-construction)
- Filter between condos, houses, townhomes
- Each listing: photos, price, address, beds/baths/sqft, neighborhood, MLS number
- Can be manually added via /admin or scraped from public sources

/blog:
- Blog listing with real photos (topic-matched from Unsplash)
- Featured post hero
- Cards with: image, category tag, title, excerpt, date, reading time
- Clean editorial typography

/blog/[slug]:
- Full article with proper heading hierarchy
- Author section
- Sidebar with quick links and CTA
- Related posts at bottom
- Schema markup (BlogPosting)

/about:
- Company story
- Mission/values
- Team section (placeholder)
- Office info

/contact:
- Inquiry form
- Office info
- Embedded Mapbox map showing office location (if applicable, or just Toronto general)
- "What We Can Help With" section

/terms:
- Full Terms of Service
- SimpleHome.ca is an informational platform, NOT a licensed real estate brokerage
- Partners with licensed Ontario real estate professionals (RECO registered agents)
- All information approximate and subject to change
- Ontario-specific legal language
- Users must verify information independently

/privacy:
- PIPEDA compliant privacy policy (Canadian federal privacy law)
- What data collected, how used, user rights
- Cookie usage
- Contact info for privacy inquiries

SCRAPE ALL TORONTO/GTA PRE-CONSTRUCTION PROJECTS:

Use fetch + cheerio to scrape these sources for every pre-construction project in Toronto/GTA targeting 2026-2032:

Aggregator sites:
- precondo.ca (main competitor — project names, prices, developers, neighborhoods, floors, units, completion dates, images)
- buzzbuzzhome.com/ca/city/toronto
- livabl.com/new-condos/toronto
- condosdeal.com/pre-construction-condos-toronto/
- urbantoronto.ca/database/
- strata.ca/new-construction
- platinumvip.com
- newinhomes.com/new-condos/toronto
- condonow.com (public listing data)
- 90days.ca
- nexthome.ca/new-homes/ontario/toronto
- getmyhome.ca

Also search Google for "Toronto pre-construction condos 2027 2028 2029 2030" and scrape additional listing sites from results.

For each project extract:
- Name, address, developer, architect
- Neighborhood, floors, units, price range, price per sqft
- Completion year, status (pre-construction, under construction, completed, selling)
- Description, amenities, images/gallery URLs
- Building type: condo, townhome, detached, stacked townhome

Target 200+ projects. Include projects across all GTA municipalities.

GEOCODE all projects using Mapbox API and generate footprint polygons for 3D map display.

TORONTO NEIGHBORHOODS to include:
Downtown Core, King West, Liberty Village, Queen West, Yorkville, The Annex, Midtown, Yonge & Eglinton, North York, Scarborough, Etobicoke, Leaside, Leslieville, Riverside, Danforth, High Park, Junction, Roncesvalles, Forest Hill, Rosedale, Cabbagetown, St. Lawrence Market, Waterfront/Harbourfront, CityPlace, Fort York, Canary District, Port Lands, East Bayfront, Mississauga, Vaughan, Richmond Hill, Markham, Oakville, Burlington, Hamilton, Brampton, Milton, Pickering, Oshawa, Ajax, Whitby, Newmarket, Aurora, Barrie, Niagara Falls, St. Catharines, Kitchener, Waterloo, Cambridge, Guelph, London

GENERATE SEO CONTENT using Anthropic API:

For each project page:
- Unique 400-600 word description
- Written like a Toronto real estate journalist
- Mention specific local landmarks, TTC subway stations, GO Transit stops, parks, restaurants
- Target keywords: "[project name] Toronto", "[neighborhood] condos", "Toronto pre-construction [year]"
- Meta title (under 60 chars) and description (under 160 chars)
- FAQ section per project (3-5 questions with schema)

20 blog posts about the Toronto market (each 800-1200 words, unique, journalist tone):
1. "Best Pre-Construction Condos in Toronto 2026"
2. "Toronto Condo Market Forecast 2026-2030"
3. "King West vs Liberty Village: Where to Buy Pre-Construction"
4. "Guide to Buying Pre-Construction in Ontario"
5. "Toronto's Most Anticipated Condo Launches"
6. "HST Rebate on Pre-Construction Condos Explained"
7. "Assignment Sales in Toronto: What You Need to Know"
8. "Best Toronto Neighborhoods for First-Time Buyers"
9. "Pre-Construction vs Resale Condos in Toronto"
10. "Downtown Toronto Condo Investment Guide"
11. "Yorkville Pre-Construction: Luxury Living Guide"
12. "North York Condos: Best New Developments"
13. "Mississauga Pre-Construction: The Complete Guide"
14. "Understanding Occupancy Fees in Ontario"
15. "Toronto Condo Maintenance Fees Explained"
16. "Best Transit-Oriented Developments in the GTA"
17. "Investing in Toronto Pre-Construction from Abroad"
18. "Top Toronto Condo Developers Ranked"
19. "Waterfront Toronto: New Developments to Watch"
20. "How to Negotiate Pre-Construction Condo Prices"

Stagger blog dates across the last 3 months (4-5 days apart).
Add real Unsplash photos matched to each topic.

DEVELOPER PAGES:
- Extract all unique developer names from scraped projects
- Generate 200-400 word bios with Anthropic API
- Try to find real logos by searching "[developer name] logo site:[developer website]"
- Major Toronto developers to prioritize: Menkes, Tridel, Daniels, Concord Adex, CentreCourt, Plaza, Pemberton, Lifetime, Lanterra, Great Gulf, Greenland Group, Pinnacle International, Camrost Felcorp, Minto, Mattamy, Canderel, Dream, Oxford Properties, Allied REIT, Hines, Brookfield
- Link projects to developers via developerId foreign key

FULL SEO FROM DAY ONE:
- Unique <title> and <meta description> on every page
- JSON-LD structured data: Organization, RealEstateListing, BreadcrumbList, FAQPage, BlogPosting on relevant pages
- Dynamic sitemap.xml including all pages
- robots.txt allowing all crawlers + AI bots (GPTBot, ClaudeBot, PerplexityBot, GoogleOther)
- llms.txt for AI search discoverability
- Open Graph + Twitter card tags on every page
- Canonical URLs
- Internal linking: projects → neighborhoods → developers → blog
- Image alt tags on everything: "[Project Name] - Pre-Construction in [Neighborhood], Toronto"
- Breadcrumbs on all pages
- Page speed: next/image with lazy loading, font-display swap, minimize unused CSS

AI CHAT ASSISTANT:
- Floating chat button (bottom-right, accent blue circle with chat icon)
- Opens a clean white chat panel (matching light theme)
- Header: "SimpleHome.ca Assistant"
- Powered by Anthropic API via /api/chat route
- System prompt: knows all projects in database, recommends based on user preferences, mentions TTC/GO transit proximity, never gives investment advice, reminds users to consult licensed professionals
- Suggested prompt chips: "What's available in King West under $800K?", "Best condos for 2027 move-in?", "Compare Downtown vs Midtown", "First-time buyer options?"
- Lead capture after 3 messages: "Want personalized help? Leave your info and a licensed agent will reach out."
- Submits to /api/leads
- Rate limit 20 messages per session
- Disclaimer in chat: "SimpleHome.ca partners with licensed Ontario real estate professionals."

LEGAL PAGES (Model A — informational platform):

Terms of Service:
- SimpleHome.ca is an informational technology platform
- NOT a licensed real estate brokerage under RECO (Real Estate Council of Ontario)
- Does not represent buyers or sellers
- Partners with licensed Ontario real estate agents
- All information approximate, based on publicly available data, subject to change
- Users must verify independently and consult licensed professionals
- Standard limitation of liability, indemnification clauses
- Governing law: Province of Ontario, Canada
- Users must be 18+

Privacy Policy:
- PIPEDA (Personal Information Protection and Electronic Documents Act) compliant
- What data collected (name, email, phone from forms)
- How used (connect with licensed agents, improve platform)
- No selling personal data
- Cookie usage for analytics
- User rights: access, correction, deletion
- Data retention policy
- Contact for privacy inquiries

Footer disclaimer (on every page):
"SimpleHome.ca is an informational platform that partners with licensed Ontario real estate professionals. We are not a licensed real estate brokerage. All pricing and project details are approximate and subject to change. Consult a licensed real estate professional before making any decisions."

Form disclaimer (below every inquiry form):
"By submitting this form, you agree to our Terms of Service and Privacy Policy. SimpleHome.ca partners with licensed Ontario real estate professionals to assist you. We are an informational platform and do not directly participate in real estate transactions."

ADMIN PANEL (/admin):
- Basic admin dashboard to manage leads
- See all form submissions with name, email, phone, message, project interested in, date
- Mark leads as contacted/closed
- Simple auth (admin password in env)
- Dark theme for admin (contrast from public site)

DATABASE SCHEMA (Supabase):

projects: id, name, slug, address, neighborhood, neighborhoodSlug, developer, developerId, architect, floors, units, priceMin, priceMax, pricePerSqft, completionYear, status, buildingType, description, longDescription, metaTitle, metaDescription, faqJson, amenities, features, mainImageUrl, galleryImages, latitude, longitude, footprint, modelUrl, website, createdAt, updatedAt

neighborhoods: id, name, slug, description, imageUrl, latitude, longitude, avgPrice, avgPricePerSqft, projectCount, displayOrder

developers: id, name, slug, bio, logoUrl, website, foundedYear, headquarters, projectCount, createdAt

blog_posts: id, title, slug, content, excerpt, imageUrl, category, keywords, publishedAt, readingTime, metaTitle, metaDescription

leads: id, name, email, phone, message, source, projectId, status, createdAt

portfolio_items: id, projectId, status (for_sale, sold, under_contract), storyContent, originalPrice, soldPrice, daysOnMarket, tagline, isFeatured, createdAt

SETUP:
1. Initialize the project: npx create-next-app@14 simplehome --typescript --tailwind --eslint --app --src-dir
2. Install dependencies: mapbox-gl, react-map-gl, @supabase/supabase-js, react-markdown, lucide-react
3. Set up Supabase client
4. Build all pages and components
5. Run scraping scripts
6. Generate SEO content
7. Geocode and generate footprints
8. Initialize git repo
9. Create GitHub repo: gh repo create soldbytal-ui/simplehome --private --source=. --push
   (or: git init && git remote add origin https://github.com/soldbytal-ui/simplehome.git && git push -u origin main)
10. Build and verify zero errors
11. Push to GitHub

Start building now. Begin with the project setup and design system, then the 3D map component, then pages, then scraping, then SEO content generation.

# Properly Inspected Website

This is the official website for **Properly Inspected**, Tampa Bay's most trusted home inspection service. Built with [Next.js](https://nextjs.org) and modern web technologies.

## Features

- **Responsive Design**: Mobile-first, fully responsive across all devices
- **Dynamic Content**: CMS-style content management for services, locations, testimonials, and FAQs
- **SEO Optimized**: Server-side rendering, meta tags, and structured data
- **Contact Form**: Lead capture with database storage and CRM integration
- **Echo Desk Integration**: Automatic webhook delivery to Echo Desk CRM
- **Live Chat Widget**: Real-time chat with Echo Desk integration
- **Admin Dashboard**: Secure authentication with NextAuth.js
- **Database**: PostgreSQL with Prisma ORM

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd properly_inspected_website/nextjs_space
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Copy the `.env.example` file to `.env` and fill in your values:
   ```bash
   cp .env.example .env
   ```
   
   Required variables:
   - `DATABASE_URL`: PostgreSQL connection string
   - `NEXTAUTH_SECRET`: Secret key for authentication (generate with `openssl rand -base64 32`)
   
   Optional variables (for Echo Desk integration):
   - `ECHO_DESK_WEBHOOK_URL`: Your Echo Desk webhook endpoint
   - `ECHO_DESK_API_KEY`: Authentication key (if required)
   - `NEXT_PUBLIC_ECHO_DESK_CHAT_EMBED_CODE`: Chat widget embed code (for live chat)

4. **Set up the database**
   
   Run Prisma migrations:
   ```bash
   npx prisma migrate dev
   ```
   
   Seed the database with initial data:
   ```bash
   npx prisma db seed
   # or
   npm run seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the website.

## Echo Desk Integration

This website integrates with **Echo Desk** (https://goechodesk.com/) to automatically send contact form submissions to your CRM.

### How It Works

When a visitor submits the contact form:
1. **Form data is saved** to the PostgreSQL database (primary storage)
2. **Webhook is triggered** to send data to Echo Desk in the background
3. **User receives confirmation** immediately (webhook runs asynchronously)
4. **Retry logic** handles temporary failures (up to 2 retries with exponential backoff)
5. **Error handling** ensures form submission succeeds even if webhook fails

### Configuration

#### Finding Your Echo Desk Webhook URL

1. Log into your Echo Desk dashboard at https://goechodesk.com/
2. Navigate to **Settings** > **Integrations** > **Webhooks**
3. Create a new webhook or copy an existing webhook URL
4. Add the URL to your `.env` file:
   ```env
   ECHO_DESK_WEBHOOK_URL="https://api.goechodesk.com/webhook/your-unique-id"
   ```

#### Optional: API Key Authentication

If your Echo Desk setup requires API key authentication:

1. Log into your Echo Desk dashboard
2. Navigate to **Settings** > **API Keys** (or **Settings** > **Integrations**)
3. Generate a new API key or copy an existing one
4. Add it to your `.env` file:
   ```env
   ECHO_DESK_API_KEY="your-api-key-here"
   ```

**Note:** The API key may not be required depending on your Echo Desk configuration. Check with Echo Desk support if unsure.

#### Webhook Payload Format

The webhook sends the following JSON payload:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "(727) 555-1234",
  "service": "Pre-Purchase Inspection",
  "subject": "Inspection Inquiry",
  "message": "I'd like to schedule an inspection...",
  "source": "website",
  "timestamp": "2025-12-15T10:30:00.000Z"
}
```

### Testing the Integration

#### Test in Development

1. Set your `ECHO_DESK_WEBHOOK_URL` in `.env`
2. Submit a test form on the contact page
3. Check the server console for webhook logs:
   ```
   [Echo Desk] Sending data to webhook (attempt 1/3)...
   [Echo Desk] Webhook sent successfully
   [Contact Form] Echo Desk webhook sent successfully for submission 123
   ```

#### Test Without Echo Desk

If you don't have Echo Desk configured yet, the form will still work perfectly:
- Simply leave `ECHO_DESK_WEBHOOK_URL` blank in your `.env` file
- Form submissions will be saved to the database
- No webhook will be sent (silent skip)

#### Troubleshooting

**Webhook not sending?**
- Check that `ECHO_DESK_WEBHOOK_URL` is set in `.env`
- Verify the URL is correct and accessible
- Check server logs for error messages

**Authentication errors?**
- Verify your `ECHO_DESK_API_KEY` is correct
- Check if Echo Desk uses a different authentication method (Bearer token vs API key header)
- Adjust the authentication in `lib/echo-desk.ts` if needed

**Webhook timing out?**
- Default timeout is 10 seconds
- Check Echo Desk webhook endpoint status
- Verify network connectivity

## Echo Desk Chat Widget Integration

This website includes a **live chat widget** that integrates with Echo Desk's chat system, allowing visitors to chat with you in real-time.

### Features

- **Bottom-right positioning**: Standard chat widget placement (customizable)
- **Mobile responsive**: Adapts perfectly to all screen sizes
- **Smart visibility**: Automatically hidden on admin pages
- **Professional styling**: Matches Properly Inspected brand colors
- **Smooth animations**: Fade-in effects and hover states
- **Zero configuration needed**: Works out of the box with Echo Desk

### How It Works

The chat widget component dynamically loads the Echo Desk chat embed code on all public pages (homepage, services, locations, contact, etc.) but automatically hides on admin pages (`/admin/*`).

Echo Desk's chat widget handles:
- Real-time messaging with visitors
- Online/offline status
- Chat transcripts and history
- Agent management
- Customization (colors, welcome messages, etc.)

### Configuration

#### Step 1: Set Up Chat Widget in Echo Desk

1. **Log into Echo Desk**
   - Navigate to https://goechodesk.com/ and sign in
   
2. **Access Website Integration Settings**
   - Go to **Admin** > **Websites**
   - Click **"Add Website"** or select an existing website configuration

3. **Configure Chat Widget Settings**
   
   Customize your chat widget appearance and behavior:
   
   - **Chat Client Style**: Choose display mode
     - `Panel`: Hovers on right side (recommended)
     - `Overlay`: Floats over content
     - `Full Screen`: Opens in new window
   
   - **Colors**: Match your brand
     - Accent Color: Background color (try `#1e3a8a` for navy)
     - Button Color: Chat button (try `#22c55e` for green)
     - Font Color: Text color (white for dark backgrounds)
   
   - **Welcome Messages**: Customize greetings
     - Welcome Header: e.g., "Hi! Need help with an inspection?"
     - Welcome Body: e.g., "We typically respond within minutes."
   
   - **Behavior Settings**:
     - ☑️ Hide chat when no agents available (recommended)
     - Set chat timeout (default: 60 seconds)
     - Configure required input fields (Name, Email, Topic)
   
   - **Banner Image**: Upload your logo or photo (optional)

4. **Save and Generate Embed Code**
   - Click **"Save"** to apply your settings
   - Echo Desk will generate an embed code (usually a `<script>` tag)
   - Look for something like:
     ```html
     <script src="https://chat.echoglobal.com/widget.js" data-site-id="your-unique-id"></script>
     ```

5. **Copy the Embed Code**
   - Copy the entire script tag provided by Echo Desk
   - You'll need this in the next step

#### Step 2: Add Embed Code to Your Website

1. **Update Environment Variable**
   
   Open your `.env` file and add the Echo Desk chat embed code:
   
   ```env
   NEXT_PUBLIC_ECHO_DESK_CHAT_EMBED_CODE='<script src="https://chat.echoglobal.com/widget.js" data-site-id="your-unique-id"></script>'
   ```
   
   **Important Notes:**
   - Use single quotes to wrap the embed code
   - Paste the entire `<script>` tag as a single line
   - Remove any line breaks within the script tag
   - Make sure the variable starts with `NEXT_PUBLIC_` so it's accessible in the browser

2. **Restart Development Server**
   
   After updating `.env`, restart your dev server:
   ```bash
   npm run dev
   ```

#### Step 3: Configure Agent Permissions

Back in Echo Desk:

1. **Set Up Agent Permissions**
   - Navigate to **Admin** > **Permissions** (or **Users**)
   - Ensure agents have the "Live Chat" permission enabled
   - Add the new chat website to their permission set

2. **Set Agent Status to Online**
   - Agents must be "online" in Echo Desk to receive chats
   - Configure online/offline hours if desired
   - Test with at least one agent online

### Testing the Chat Widget

#### Visual Testing

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Open Your Website**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - The chat widget should appear in the bottom-right corner

3. **Test on Different Pages**
   - Homepage: ✅ Widget should appear
   - Services: ✅ Widget should appear
   - Contact: ✅ Widget should appear
   - Admin pages: ❌ Widget should NOT appear

4. **Test Responsiveness**
   - Desktop: Full-size chat panel
   - Mobile: Responsive, doesn't block content
   - Tablet: Adapts appropriately

#### Functional Testing

1. **Test Chat Interaction**
   - Click the chat button/icon
   - Fill out the chat form (if required by Echo Desk)
   - Send a test message
   - Verify an Echo Desk agent receives the chat

2. **Check Browser Console**
   - Open browser DevTools (F12)
   - Look for chat widget logs:
     ```
     [Echo Desk Chat] Widget loaded successfully
     ```
   - Check for any JavaScript errors

### Widget Behavior

The chat widget component automatically:

- ✅ **Loads Echo Desk script**: Dynamically injects the embed code
- ✅ **Hides on admin pages**: Uses Next.js `usePathname()` to detect admin routes
- ✅ **Handles missing config**: Gracefully skips rendering if no embed code provided
- ✅ **Responsive styling**: Adjusts size on mobile devices
- ✅ **Z-index management**: Ensures widget appears above other content
- ✅ **Error handling**: Logs errors without breaking the page

### Customization Options

#### Positioning

To change the chat widget position from bottom-right to bottom-left:

1. Open `app/components/chat-widget.tsx`
2. Find the `positionClasses` in the component
3. Change default from `'bottom-right'` to `'bottom-left'`

#### Hiding on Additional Pages

To hide the widget on specific pages (e.g., blog posts):

1. Open `app/components/chat-widget.tsx`
2. Find the `hideOnPaths` default value: `['/admin']`
3. Add additional paths:
   ```typescript
   hideOnPaths = ['/admin', '/blog']
   ```

#### Custom Styling

The chat widget includes CSS in `<style jsx global>` to:
- Set high z-index for Echo Desk elements
- Make widget responsive on mobile
- Handle animations

You can modify these styles in `app/components/chat-widget.tsx`.

### Troubleshooting

#### Chat Widget Not Appearing

**Problem**: Widget doesn't show up on the website

**Solutions**:
1. ✅ Check that `NEXT_PUBLIC_ECHO_DESK_CHAT_EMBED_CODE` is set in `.env`
2. ✅ Ensure the variable name starts with `NEXT_PUBLIC_`
3. ✅ Verify you restarted the dev server after updating `.env`
4. ✅ Check browser console for error messages
5. ✅ Make sure you're not on an admin page (`/admin/*`)

#### Embed Code Format Issues

**Problem**: Script not loading or errors in console

**Solutions**:
1. ✅ Verify the embed code is correctly copied from Echo Desk
2. ✅ Ensure the entire `<script>` tag is on a single line in `.env`
3. ✅ Use single quotes around the embed code (not double quotes)
4. ✅ Check for any special characters that might break the string

#### Chat Not Connecting to Agents

**Problem**: Widget appears but chats don't reach agents

**Solutions**:
1. ✅ Ensure at least one Echo Desk agent is online
2. ✅ Verify agents have "Live Chat" permissions in Echo Desk
3. ✅ Check that the website is added to agent permission sets
4. ✅ Test the widget directly in Echo Desk (use the "Link" icon)

#### Widget Conflicts with Other Elements

**Problem**: Chat widget overlaps with or hides other page elements

**Solutions**:
1. ✅ Adjust z-index in the chat widget CSS
2. ✅ Change widget position (bottom-left instead of bottom-right)
3. ✅ Modify Echo Desk chat style settings (Panel vs Overlay)

#### Mobile Display Issues

**Problem**: Widget too large or unusable on mobile

**Solutions**:
1. ✅ Check Echo Desk chat style setting (use "Panel" mode)
2. ✅ Verify the responsive CSS is applied (in chat-widget.tsx)
3. ✅ Test on actual mobile devices, not just browser resize

### Without Echo Desk Configuration

If you don't configure the chat widget (leave `NEXT_PUBLIC_ECHO_DESK_CHAT_EMBED_CODE` blank):
- ✅ Website will function normally
- ✅ No chat widget will appear
- ✅ No JavaScript errors will occur
- ✅ Page performance unaffected

This allows you to deploy the website before setting up Echo Desk chat, and add it later when ready.

### Advanced: Using Alternative Chat Services

While this component is optimized for Echo Desk, it can work with other chat services:

1. Get the embed code from your chat provider (Tawk.to, Crisp, Intercom, etc.)
2. Add it to `NEXT_PUBLIC_ECHO_DESK_CHAT_EMBED_CODE` in `.env`
3. The component will attempt to inject the script
4. May require CSS adjustments for proper positioning

For best results, we recommend sticking with Echo Desk for seamless CRM integration.

## Project Structure

```
nextjs_space/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── contact/       # Contact form submission
│   │   └── auth/          # Authentication endpoints
│   ├── components/        # React components
│   │   ├── chat-widget.tsx  # Echo Desk chat widget integration
│   ├── about/            # About page
│   ├── contact/          # Contact page
│   ├── services/         # Services pages
│   ├── locations/        # Location pages
│   ├── faq/              # FAQ page
│   └── layout.tsx        # Root layout
├── lib/                   # Utility functions
│   ├── prisma.ts         # Database client
│   ├── auth-options.ts   # NextAuth configuration
│   ├── echo-desk.ts      # Echo Desk webhook integration
│   └── utils.ts          # Helper functions
├── prisma/               # Database schema and migrations
│   ├── schema.prisma     # Database schema
│   └── migrations/       # Migration files
├── public/               # Static assets
└── scripts/              # Database seed scripts
```

## Database Management

### View Database

Use Prisma Studio to view and edit database records:
```bash
npx prisma studio
```

### Create Migrations

After modifying `prisma/schema.prisma`:
```bash
npx prisma migrate dev --name your_migration_name
```

### Reset Database

To reset the database and re-seed:
```bash
npx prisma migrate reset
```

## Building for Production

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

3. **Set production environment variables**
   
   Ensure all environment variables are set in your production environment:
   - Use secure `DATABASE_URL` with SSL
   - Generate a strong `NEXTAUTH_SECRET`
   - Configure `ECHO_DESK_WEBHOOK_URL` and `ECHO_DESK_API_KEY`

## Learn More

### Next.js Resources

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - interactive Next.js tutorial
- [Next.js GitHub repository](https://github.com/vercel/next.js)

### Echo Desk Resources

- [Echo Desk Website](https://goechodesk.com/)
- [Echo Desk Documentation](https://goechodesk.com/docs) (if available)
- [Echo Desk Support](https://goechodesk.com/support)

## Deployment

### Vercel (Recommended)

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new):

1. Push your code to GitHub
2. Import the repository in Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy!

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Other Platforms

This application can also be deployed to:
- AWS (Amplify, EC2, ECS)
- Google Cloud Platform
- DigitalOcean
- Railway
- Render

Ensure your deployment platform supports:
- Node.js 18+
- PostgreSQL database
- Environment variables configuration

## License

Copyright © 2025 Properly Inspected. All rights reserved.

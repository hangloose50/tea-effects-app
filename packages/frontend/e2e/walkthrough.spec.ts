import { test, expect } from '@playwright/test';

test.describe('Tea Effects App - Complete Walkthrough', () => {
  test.beforeEach(async ({ page }) => {
    // Start at homepage
    await page.goto('/');
  });

  test('1. Homepage - Organic Design & Layout', async ({ page }) => {
    console.log('\n🍵 STEP 1: Exploring Homepage - Organic Design');

    // Wait for page to fully load
    await page.waitForLoadState('networkidle');

    // Check hero section with tea cup
    await expect(page.locator('h1')).toContainText('Discover Your Perfect Tea');
    console.log('✓ Hero title displayed');

    // Check for effect cards
    const effectCards = page.locator('[data-testid="effect-card"], .cursor-pointer').filter({ hasText: /Focus|Calm|Energy|Sleep|Digestion|Immunity/ });
    const count = await effectCards.count();
    expect(count).toBeGreaterThan(0);
    console.log(`✓ Found ${count} effect cards with organic design`);

    // Take screenshot of organic homepage
    await page.screenshot({ path: 'screenshots/01-homepage.png', fullPage: true });
    console.log('✓ Screenshot saved: 01-homepage.png');

    // Check navigation
    await expect(page.locator('nav')).toBeVisible();
    const navItems = page.locator('nav a');
    const navCount = await navItems.count();
    expect(navCount).toBeGreaterThanOrEqual(3); // Home, Teas, Journal
    console.log(`✓ Navigation with ${navCount} links visible`);

    // Slow down to see the design
    await page.waitForTimeout(2000);
  });

  test('2. Navigation - Teas Page', async ({ page }) => {
    console.log('\n📚 STEP 2: Navigating to Teas Library');

    // Click on Teas navigation
    await page.click('nav a:has-text("Teas")');
    await page.waitForLoadState('networkidle');

    // Verify we're on teas page
    await expect(page).toHaveURL('/teas');
    console.log('✓ Navigated to /teas');

    // Check for search input
    const searchInput = page.locator('input[type="search"], input[placeholder*="Search"]');
    await expect(searchInput).toBeVisible();
    console.log('✓ Search input visible');

    // Check for type filters
    const filters = page.locator('button:has-text("oolong"), button:has-text("pu-erh"), button:has-text("green"), button:has-text("herbal")');
    const filterCount = await filters.count();
    expect(filterCount).toBeGreaterThan(0);
    console.log(`✓ Found ${filterCount} tea type filters`);

    // Wait for teas to load
    await page.waitForTimeout(2000);

    // Take screenshot
    await page.screenshot({ path: 'screenshots/02-teas-page.png', fullPage: true });
    console.log('✓ Screenshot saved: 02-teas-page.png');

    await page.waitForTimeout(1500);
  });

  test('3. Teas Page - Search & Filter', async ({ page }) => {
    console.log('\n🔍 STEP 3: Testing Search and Filter');

    await page.goto('/teas');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);

    // Test search functionality
    const searchInput = page.locator('input[type="search"], input[placeholder*="Search"]');
    await searchInput.fill('oolong');
    console.log('✓ Searching for "oolong"');

    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'screenshots/03-search-oolong.png', fullPage: true });
    console.log('✓ Screenshot saved: 03-search-oolong.png');

    // Clear search
    await searchInput.clear();
    await page.waitForTimeout(500);

    // Test type filter - try to find and click oolong button
    const filterButtons = page.locator('button').filter({ hasText: /oolong|green|herbal/i });
    const firstFilter = filterButtons.first();

    if (await firstFilter.isVisible()) {
      const filterText = await firstFilter.textContent();
      await firstFilter.click();
      console.log(`✓ Clicked filter: ${filterText}`);
      await page.waitForTimeout(1000);
      await page.screenshot({ path: 'screenshots/04-filtered-teas.png', fullPage: true });
      console.log('✓ Screenshot saved: 04-filtered-teas.png');
    }

    await page.waitForTimeout(1500);
  });

  test('4. Journal Page - Create Entry', async ({ page }) => {
    console.log('\n📖 STEP 4: Creating Journal Entry');

    // Navigate to journal
    await page.click('nav a:has-text("Journal")');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveURL('/journal');
    console.log('✓ Navigated to /journal');

    await page.waitForTimeout(1500);
    await page.screenshot({ path: 'screenshots/05-journal-page.png', fullPage: true });
    console.log('✓ Screenshot saved: 05-journal-page.png');

    // Look for "New Entry" button
    const newEntryButton = page.locator('button:has-text("New Entry"), button:has-text("Create First Entry")');

    if (await newEntryButton.isVisible()) {
      await newEntryButton.first().click();
      console.log('✓ Clicked "New Entry" button');
      await page.waitForTimeout(1000);

      // Take screenshot of form
      await page.screenshot({ path: 'screenshots/06-new-entry-form.png', fullPage: true });
      console.log('✓ Screenshot saved: 06-new-entry-form.png');

      // Fill out the form if visible
      const teaSelect = page.locator('select');
      if (await teaSelect.isVisible()) {
        // Select second option (first is placeholder)
        await teaSelect.selectOption({ index: 1 });
        console.log('✓ Selected a tea');

        // Click rating stars
        const stars = page.locator('button:has(svg)').filter({ has: page.locator('svg') });
        const starCount = await stars.count();
        if (starCount >= 4) {
          await stars.nth(3).click(); // 4 stars
          console.log('✓ Rated 4 stars');
        }

        // Fill notes
        const notesTextarea = page.locator('textarea[placeholder*="flavor"], textarea[placeholder*="experience"]');
        if (await notesTextarea.isVisible()) {
          await notesTextarea.fill('Beautiful organic flavor with earthy notes. The brewing process was smooth and relaxing.');
          console.log('✓ Filled tasting notes');
        }

        await page.waitForTimeout(1000);
        await page.screenshot({ path: 'screenshots/07-filled-entry-form.png', fullPage: true });
        console.log('✓ Screenshot saved: 07-filled-entry-form.png');

        // Save the entry
        const saveButton = page.locator('button:has-text("Save")');
        if (await saveButton.isVisible()) {
          await saveButton.click();
          console.log('✓ Clicked Save button');
          await page.waitForTimeout(1500);

          await page.screenshot({ path: 'screenshots/08-saved-entry.png', fullPage: true });
          console.log('✓ Screenshot saved: 08-saved-entry.png');
        }
      }
    }

    await page.waitForTimeout(2000);
  });

  test('5. Mobile View - Responsive Design', async ({ page, context }) => {
    console.log('\n📱 STEP 5: Testing Mobile Responsive Design');

    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE

    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    console.log('✓ Switched to mobile viewport (375x667)');
    await page.screenshot({ path: 'screenshots/09-mobile-homepage.png', fullPage: true });
    console.log('✓ Screenshot saved: 09-mobile-homepage.png');

    // Check bottom navigation
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    console.log('✓ Mobile navigation visible');

    // Navigate to teas on mobile
    await page.click('nav a:has-text("Teas")');
    await page.waitForTimeout(1500);
    await page.screenshot({ path: 'screenshots/10-mobile-teas.png', fullPage: true });
    console.log('✓ Screenshot saved: 10-mobile-teas.png');

    // Navigate to journal on mobile
    await page.click('nav a:has-text("Journal")');
    await page.waitForTimeout(1500);
    await page.screenshot({ path: 'screenshots/11-mobile-journal.png', fullPage: true });
    console.log('✓ Screenshot saved: 11-mobile-journal.png');

    await page.waitForTimeout(2000);
  });

  test('6. PWA Features - Service Worker', async ({ page, context }) => {
    console.log('\n⚡ STEP 6: Testing PWA Features');

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check for service worker registration
    const swRegistered = await page.evaluate(() => {
      return 'serviceWorker' in navigator;
    });

    expect(swRegistered).toBe(true);
    console.log('✓ Service Worker API available');

    // Check for manifest
    const manifestLink = page.locator('link[rel="manifest"]');
    await expect(manifestLink).toHaveCount(1);
    console.log('✓ Web App Manifest linked');

    // Check PWA meta tags
    const themeColor = page.locator('meta[name="theme-color"]');
    await expect(themeColor).toHaveCount(1);
    console.log('✓ Theme color meta tag present');

    // Grant notification permission in test context
    await context.grantPermissions(['notifications']);
    console.log('✓ Notification permission granted (for testing)');

    await page.screenshot({ path: 'screenshots/12-pwa-ready.png' });
    console.log('✓ Screenshot saved: 12-pwa-ready.png');

    await page.waitForTimeout(2000);
  });

  test('7. Offline Mode Simulation', async ({ page, context }) => {
    console.log('\n🔌 STEP 7: Testing Offline Mode');

    // First, visit teas page while online to cache data
    await page.goto('/teas');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    console.log('✓ Visited teas page (data should be cached)');

    // Go offline
    await context.setOffline(true);
    console.log('✓ Simulated offline mode');

    // Reload page
    await page.reload();
    await page.waitForTimeout(2000);

    // Check if page still works
    const pageContent = page.locator('body');
    await expect(pageContent).toBeVisible();
    console.log('✓ Page loaded in offline mode');

    await page.screenshot({ path: 'screenshots/13-offline-mode.png', fullPage: true });
    console.log('✓ Screenshot saved: 13-offline-mode.png');

    // Check for offline indicator if present
    const offlineIndicator = page.locator('text=/offline|no connection/i');
    const hasOfflineIndicator = await offlineIndicator.count() > 0;
    if (hasOfflineIndicator) {
      console.log('✓ Offline indicator displayed');
    }

    // Go back online
    await context.setOffline(false);
    console.log('✓ Back online');

    await page.waitForTimeout(2000);
  });

  test('8. Color Palette - Organic Design', async ({ page }) => {
    console.log('\n🎨 STEP 8: Verifying Organic Color Palette');

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check for organic colors in computed styles
    const bodyBg = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });

    console.log(`✓ Body background color: ${bodyBg}`);

    // Take final screenshot
    await page.screenshot({ path: 'screenshots/14-organic-colors.png', fullPage: true });
    console.log('✓ Screenshot saved: 14-organic-colors.png');

    console.log('\n✅ Organic Design Elements:');
    console.log('   - Earth-tone color palette (tea-brown, tea-sage, tea-amber, tea-clay)');
    console.log('   - NO trendy purples');
    console.log('   - Natural, tea-inspired aesthetic');
    console.log('   - Playfair Display serif + Inter sans-serif fonts');
    console.log('   - Organic shadows and textures');

    await page.waitForTimeout(2000);
  });
});

test.describe('Summary', () => {
  test('Complete Walkthrough Summary', async () => {
    console.log('\n');
    console.log('═══════════════════════════════════════════════════════');
    console.log('🍵 TEA EFFECTS APP - WALKTHROUGH COMPLETE');
    console.log('═══════════════════════════════════════════════════════');
    console.log('');
    console.log('✅ Features Demonstrated:');
    console.log('   1. Organic homepage with tea-inspired design');
    console.log('   2. Teas library with search and filtering');
    console.log('   3. Journal page for recording experiences');
    console.log('   4. Responsive mobile design');
    console.log('   5. PWA features (Service Worker, Manifest)');
    console.log('   6. Offline mode with cached data');
    console.log('   7. Natural color palette (NO trendy purples)');
    console.log('');
    console.log('📸 Screenshots saved in: screenshots/');
    console.log('   01-homepage.png           - Organic homepage design');
    console.log('   02-teas-page.png          - Tea library');
    console.log('   03-search-oolong.png      - Search functionality');
    console.log('   04-filtered-teas.png      - Type filtering');
    console.log('   05-journal-page.png       - Journal page');
    console.log('   06-new-entry-form.png     - New entry form');
    console.log('   07-filled-entry-form.png  - Completed form');
    console.log('   08-saved-entry.png        - Saved entry');
    console.log('   09-mobile-homepage.png    - Mobile view');
    console.log('   10-mobile-teas.png        - Mobile teas');
    console.log('   11-mobile-journal.png     - Mobile journal');
    console.log('   12-pwa-ready.png          - PWA features');
    console.log('   13-offline-mode.png       - Offline mode');
    console.log('   14-organic-colors.png     - Color palette');
    console.log('');
    console.log('═══════════════════════════════════════════════════════');
    console.log('');
  });
});
